import { Request, Response } from "express";
import { ResponseBuilder } from "../types/response";
import { BadRequestException, HttpException, InternalServerErrorException } from "../exceptions";
import { NewsHandler } from "../handlers";

class NewsController {
    private newsHandler: NewsHandler;

    constructor() {
        this.newsHandler = new NewsHandler();
    }

    /**
     * @Method ('GET')
     * @Route ('/api/v1/news')
     */
    public getAllNews = async (req: Request, res: Response): Promise<void> => {
        try {
            const news = await this.newsHandler.getAllNews();

            res.status(200).json(ResponseBuilder.success(news));
        } catch (error) {
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
     * @Route ('/api/v1/users/:creatorId/news')
     */
    public getUserNews = async (req: Request, res: Response): Promise<void> => {
        try {
            const creatorId: number = parseInt(req.params.creatorId);

            const news = await this.newsHandler.getNewsByUserId(creatorId);

            res.status(200).json(ResponseBuilder.success(news));
        } catch (error) {
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
     * @Method ('POST')
     * @Route ('/api/v1/users/:creatorId/news')
     */
    public storeNews = async(req: Request, res: Response): Promise<void> => {
        try {
            const creatorId: number = parseInt(req.params.creatorId);

            const title: string = req.body.title;
            const detail: string = req.body.detail; 
            const photoLink: string = req.body.photoLink;

            await this.newsHandler.storeNews(
                title,
                detail,
                photoLink,
                creatorId
            );

            res.status(200).json(ResponseBuilder.success());
        } catch (error) {
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
     * @Route ('/api/v1/users/:creatorId/news/:newsId')
     */
    public updateNews = async (req: Request, res: Response): Promise<void> => {
        try {
            const newsId: number = parseInt(req.params.newsId);

            const creatorId: number = parseInt(req.params.creatorId);

            const title: string = req.body.title;
            const detail: string = req.body.detail; 
            const photoLink: string = req.body.photoLink;

            const isNewsExist = await this.newsHandler.isNewsExistById(newsId);

            if (isNewsExist === false) {
                throw new BadRequestException('News was not found');
            }

            await this.newsHandler.updateNews(
                newsId,
                {
                    title,
                    detail,
                    photoLink,
                    creatorId
                }
            );

            res.status(200).json(ResponseBuilder.success());
        } catch (error) {
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
     * @Route ('/api/v1/users/:creatorId/news/:newsId')
     */
    public deleteNews = async (req: Request, res: Response): Promise<void> => {
        try {
            const newsId: number = parseInt(req.params.newsId);

            const isNewsExist = await this.newsHandler.isNewsExistById(newsId);

            if (isNewsExist === false) {
                throw new BadRequestException('News was not found');
            }

            await this.newsHandler.deleteNews(newsId);

            res.status(200).json(ResponseBuilder.success());
        } catch (error) {
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