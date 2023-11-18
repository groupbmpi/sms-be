import { Request, Response } from "express";
import NewsHandler from "../handlers/newsHandler";
import ForbiddenException from "../exceptions/forbiddenException";
import BadRequestException from "../exceptions/badRequestException";
import HttpException from "../exceptions/httpException";
import ResponseFormatter from "../utils/responseFormatter";
import InternalServerErrorException from "../exceptions/internalServerErrorException";

class NewsController {
    private newsHandler: NewsHandler;

    constructor() {
        this.newsHandler = new NewsHandler();
    }

    public async getNewsById(req: Request, res: Response): Promise<void> {
        try {
            const user = req.user;
            
            const newsId: number = parseInt(req.params.newsId);
            const creatorId: number = parseInt(req.params.creatorId);

            if (user.isAdmin == false && user.id !== creatorId) {
                throw new ForbiddenException();                
            }

            const news = await this.newsHandler.getNewsById(newsId);

            if (news === null) {
                throw new BadRequestException('Berita tidak ditemukan');
            }

            res.json(ResponseFormatter.success(news));
        } catch (error) {
            console.error(error);

            if (error instanceof HttpException) {
                res.json(
                    ResponseFormatter.error(
                        null, 
                        error.getMessage(), 
                        error.getStatusCode()
                    )
                );
            }

            res.json(
                ResponseFormatter.error(
                    null, 
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE
                )
            );
        }
    }

    public async getUserNews(req: Request, res: Response): Promise<void> {
        try {
            const user = req.user;

            const creatorId: number = parseInt(req.params.creatorId);

            if (user.isAdmin == false && user.id !== creatorId) {
                throw new ForbiddenException();                
            }

            const news = await this.newsHandler.getNewsByUserId(user.id);

            res.json(ResponseFormatter.success(news));
        } catch (error) {
            console.error(error);

            res.json(
                ResponseFormatter.error(
                    null, 
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE
                )
            );
        }
    }

    public async storeNews(req: Request, res: Response): Promise<void> {
        try {
            const user = req.user;

            const creatorId: number = parseInt(req.params.creatorId);

            const title: string = req.body.title;
            const detail: string = req.body.detail; 
            const photoLink: string = req.body.photoLink;

            if (user.isAdmin == false && user.id !== creatorId) {
                throw new ForbiddenException();                
            }

            await this.newsHandler.storeNews(
                title,
                detail,
                photoLink,
                creatorId
            );

            res.json(ResponseFormatter.success());
        } catch (error) {
            console.error(error);

            res.json(
                ResponseFormatter.error(
                    null, 
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE
                )
            );
        }
    }

    public async updateNews(req: Request, res: Response): Promise<void> {
        try {
            const user = req.user;

            const newsId: number = parseInt(req.params.newsId);

            const creatorId: number = parseInt(req.params.creatorId);

            const title: string = req.body.title;
            const detail: string = req.body.detail; 
            const photoLink: string = req.body.photoLink;

            if (user.isAdmin == false && user.id !== creatorId) {
                throw new ForbiddenException();                
            }

            const isNewsExist = await this.newsHandler.isNewsExistById(newsId);

            if (isNewsExist === false) {
                throw new BadRequestException('Berita tidak ditemukan');
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

            res.json(ResponseFormatter.success());
        } catch (error) {
            console.error(error);

            if (error instanceof HttpException) {
                res.json(
                    ResponseFormatter.error(
                        null, 
                        error.getMessage(), 
                        error.getStatusCode()
                    )
                );
            }

            res.json(
                ResponseFormatter.error(
                    null, 
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE
                )
            );
        }
    }

    public async deleteNews(req: Request, res: Response): Promise<void> {
        try {
            const user = req.user;

            const newsId: number = parseInt(req.params.newsId);
            const creatorId: number = parseInt(req.params.creatorId);

            if (user.isAdmin == false && user.id !== creatorId) {
                throw new ForbiddenException();                
            }

            const isNewsExist = await this.newsHandler.isNewsExistById(newsId);

            if (isNewsExist === false) {
                throw new BadRequestException('Berita tidak ditemukan');
            }

            await this.newsHandler.deleteNews(newsId);

            res.json(ResponseFormatter.success());
        } catch (error) {
            console.error(error);

            if (error instanceof HttpException) {
                res.json(
                    ResponseFormatter.error(
                        null, 
                        error.getMessage(), 
                        error.getStatusCode()
                    )
                );
            }

            res.json(
                ResponseFormatter.error(
                    null, 
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE
                )
            );
        }
    }
}

export default new NewsController;