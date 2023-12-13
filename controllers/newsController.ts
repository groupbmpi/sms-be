import { Request, Response } from "express";
import { IAllNewsRetDto, ICreateNewsArgDto, ICreateNewsRequest, ICreateNewsValidatedBody, IDeleteNewsRequest, INewsByIdRetDto, INewsIdArgDto, INewsOptionsArgDto, INewsOwnedByUserArgDto, INewsParams, INewsValidatedParams, IUpdateNewsArgDto, IUpdateNewsRequest, IUpdateNewsValidatedBody, IValidatedTargetUserId, ResponseBuilder } from "@types";
import { BadRequestException, HttpException, InternalServerErrorException, NotFoundException } from "@exceptions";
import { NewsHandler } from "@handlers";
import { BaseController } from "@controllers";
import { countSkipped, getDateFromString, getNumberFromString } from "@utils";

class NewsController extends BaseController<NewsHandler> {
    constructor() {
        super(new NewsHandler());
    }

    /**
     * @Method ('GET')
     * @Route ('/api/v1/news')
     */
    public getAllNews = async (req: Request, res: Response): Promise<void> => {
        try {
            const { institutionId, creatorId, startDateAt, endDateAt, page, limit } = req.query;

            const newsArgDto: INewsOptionsArgDto = {
                institutionId: getNumberFromString(institutionId),
                creatorId: getNumberFromString(creatorId),
                startDateAt: getDateFromString(startDateAt),
                endDateAt: getDateFromString(endDateAt),
                take: getNumberFromString(limit),
                skip: countSkipped(
                    getNumberFromString(page),
                    getNumberFromString(limit)
                ),
            };

            const newsRetDto: IAllNewsRetDto = await this.handler.getAllNews(newsArgDto);

            res.status(200).json(ResponseBuilder.success<IAllNewsRetDto>(newsRetDto));
        } catch (error: any) {
            console.error(error);

            res.status(InternalServerErrorException.STATUS_CODE).json(
                ResponseBuilder.error(
                    null, 
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE
                )
            );
        }
    }

    /**
     * @Method ('GET')
     * @Route ('/api/v1/news/:newsId')
     * @Middleware ([paramNewsRequestMiddleware])
     */
    public getNewsById = async (req: Request<INewsParams>, res: Response): Promise<void> => {
        try {
            const { newsId } = req.params as INewsValidatedParams;

            const newsArgDto: INewsIdArgDto = {
                id: parseInt(newsId),
            };

            const newsRetDto: INewsByIdRetDto | null = await this.handler.getNewsById(newsArgDto);

            if (newsRetDto === null) {
                throw new BadRequestException('News was not found');
            }

            res.status(200).json(ResponseBuilder.success<INewsByIdRetDto>(newsRetDto));
        } catch (error: any) {
            console.error(error);

            if (error instanceof HttpException) {
                res.status(error.getStatusCode()).json(
                    ResponseBuilder.error(
                        null, 
                        error.getMessage(), 
                        error.getStatusCode()
                    )
                );

                return;
            }

            res.status(InternalServerErrorException.STATUS_CODE).json(
                ResponseBuilder.error(
                    null, 
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE
                )
            );
        }
    }

    /**
     * @Method ('POST')
     * @Route ('/api/v1/news')
     * @Middleware ([createNewsRequestMiddleware])
     */
    public createNews = async(req: ICreateNewsRequest, res: Response): Promise<void> => {
        try {
            const { title, detail, photoLink } = req.body as ICreateNewsValidatedBody;
            
            const { targetUserId } = req as IValidatedTargetUserId;

            const newsArgDto: ICreateNewsArgDto = {
                title,
                detail,
                photoLink,
                creatorId: targetUserId,
            };

            await this.handler.createNews(newsArgDto);

            res.status(200).json(ResponseBuilder.success());
        } catch (error: any) {
            console.error(error);

            res.status(InternalServerErrorException.STATUS_CODE).json(
                ResponseBuilder.error(
                    null, 
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE
                )
            );
        }
    }

    /**
     * @Method ('PUT')
     * @Route ('/api/v1/news/:newsId')
     * @Middleware ([updateNewsRequestMiddleware])
     */
    public updateNews = async (req: IUpdateNewsRequest, res: Response): Promise<void> => {
        try {
            const { newsId } = req.params as INewsValidatedParams;
            
            const { title, detail, photoLink } = req.body as IUpdateNewsValidatedBody;

            const { targetUserId } = req as IValidatedTargetUserId;

            const newsOwnArgDto: INewsOwnedByUserArgDto = {
                newsId: parseInt(newsId),
                userId: targetUserId
            };

            const isNewsOwnedByUser: boolean = await this.handler.isNewsOwnedByUser(newsOwnArgDto);

            if (isNewsOwnedByUser === false) {
                throw new BadRequestException('News was not found');
            }

            const newsUpdateArgDto: IUpdateNewsArgDto = {
                id: newsOwnArgDto.newsId,
                data: {
                    title,
                    detail,
                    photoLink,
                    creatorId: targetUserId
                }
            };

            await this.handler.updateNews(newsUpdateArgDto);

            res.status(200).json(ResponseBuilder.success());
        } catch (error: any) {
            console.error(error);

            if (error instanceof HttpException) {
                res.status(error.getStatusCode()).json(
                    ResponseBuilder.error(
                        null, 
                        error.getMessage(), 
                        error.getStatusCode()
                    )
                );

                return;
            }

            res.status(InternalServerErrorException.STATUS_CODE).json(
                ResponseBuilder.error(
                    null, 
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE
                )
            );
        }
    }

    /**
     * @Method ('DELETE')
     * @Route ('/api/v1/news/:newsId')
     * @Middleware ([deleteNewsRequestMiddleware])
     */
    public deleteNews = async (req: IDeleteNewsRequest, res: Response): Promise<void> => {
        try {
            const { newsId } = req.params as INewsValidatedParams;

            const { targetUserId } = req as IValidatedTargetUserId;

            const newsOwnArgDto: INewsOwnedByUserArgDto = {
                newsId: parseInt(newsId),
                userId: targetUserId
            };

            const isNewsOwnedByUser: boolean = await this.handler.isNewsOwnedByUser(newsOwnArgDto);

            if (isNewsOwnedByUser === false) {
                throw new BadRequestException('News was not found');
            }

            const newsIdArgDto: INewsIdArgDto = {
                id: newsOwnArgDto.newsId,
            };

            await this.handler.deleteNews(newsIdArgDto);

            res.status(200).json(ResponseBuilder.success());
        } catch (error: any) {
            console.error(error);

            if (error instanceof HttpException) {
                res.status(error.getStatusCode()).json(
                    ResponseBuilder.error(
                        null, 
                        error.getMessage(), 
                        error.getStatusCode()
                    )
                );
                
                return;
            }

            res.status(InternalServerErrorException.STATUS_CODE).json(
                ResponseBuilder.error(
                    null, 
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE
                )
            );
        }
    }
}

export default new NewsController();