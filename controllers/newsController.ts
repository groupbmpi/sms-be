import BaseController from "./baseController";
import { BadRequestException} from "@exceptions";
import { NewsHandler } from "@handlers";
import { Kategori } from "@prisma/client";
import { IAllNewsRetDto, ICreateNewsArgDto, ICreateNewsRequest, ICreateNewsValidatedBody, IDeleteNewsRequest, INewsByIdRetDto, INewsIdArgDto, INewsOptimumDatesRetDto, INewsOptionsArgDto, INewsOwnedByUserArgDto, INewsParams, INewsValidatedParams, IUpdateNewsArgDto, IUpdateNewsRequest, IUpdateNewsValidatedBody, IValidatedTargetUserId, ResponseBuilder } from "@types";
import { countSkipped, getDate, getInt } from "@utils";
import { Request, Response } from "express";

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
            const { 
                institutionCategory, 
                institution, 
                creatorId, 
                startDateAt, 
                endDateAt, 
                page, 
                limit 
            } = req.query;

            const newsArgDto: INewsOptionsArgDto = {
                institutionCategory: institutionCategory as Kategori,
                institution: institution as string,
                creatorId: getInt(creatorId),
                startDateAt: getDate(startDateAt),
                endDateAt: getDate(endDateAt),
                take: getInt(limit),
                skip: countSkipped(
                    getInt(page),
                    getInt(limit)
                ),
            };

            const newsRetDto: IAllNewsRetDto = await this.handler.getAllNews(newsArgDto);

            res.status(200).json(ResponseBuilder.success<IAllNewsRetDto>(newsRetDto));
        } catch (error: any) {
            this.handleError(res, error);
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
            this.handleError(res, error);
        }
    }

    /**
     * @Method ('GET')
     * @Route ('/api/v1/news/optimum-dates')
     */
    public getNewsOptimumDates = async (req: Request, res: Response): Promise<void> => {
        try {
            const newsRetDto: INewsOptimumDatesRetDto = await this.handler.getNewsOptimumDates();

            res.status(200).json(ResponseBuilder.success<INewsOptimumDatesRetDto>(newsRetDto));
        } catch (error: any) {
            this.handleError(res, error);
        }
    }

    /**
     * @Method ('POST')
     * @Route ('/api/v1/news')
     * @Middleware ([createNewsRequestMiddleware])
     */
    public createNews = async(req: ICreateNewsRequest, res: Response): Promise<void> => {
        try {
            const { title, detail, photoLink, date, publicationLink } = req.body as ICreateNewsValidatedBody;
            
            const { targetUserId } = req as IValidatedTargetUserId;

            const newsArgDto: ICreateNewsArgDto = {
                title,
                detail,
                photoLink,
                publicationLink,
                date: new Date(date),
                creatorId: targetUserId,
            };

            console.log(newsArgDto);

            await this.handler.createNews(newsArgDto);

            res.status(201).json(ResponseBuilder.success());
        } catch (error: any) {
            this.handleError(res, error);
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
            
            const { title, detail, photoLink, publicationLink, date } = req.body as IUpdateNewsValidatedBody;

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
                    publicationLink,
                    date: date !== undefined
                        ? new Date(date)
                        : undefined,
                    creatorId: targetUserId
                }
            };

            await this.handler.updateNews(newsUpdateArgDto);

            res.status(204).json(ResponseBuilder.success());
        } catch (error: any) {
            this.handleError(res, error);
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


            console.log(newsOwnArgDto);

            await this.handler.deleteNews(newsIdArgDto);

            res.status(204).json(ResponseBuilder.success());
        } catch (error: any) {
            this.handleError(res, error);
        }
    }
}

export default new NewsController();