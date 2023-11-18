import { Request, Response } from "express";
import  { NewsHandler } from "../handlers/newsHandler";
import { ResponseBuilder } from "../types/response";
import { BadRequestException, ForbiddenException, InternalServerErrorException } from "../exceptions";
import HttpException from "../exceptions/httpException";

class NewsController {
    private newsHandler: NewsHandler;

    constructor() {
        this.newsHandler = new NewsHandler();
    }

    public async getNewsById(req: Request, res: Response): Promise<void> {
        try {

            const user = req.body
            
            const newsId: number = parseInt(req.params.newsId);
            const creatorId: number = parseInt(req.params.creatorId);

            if (user.isAdmin == false && user.id !== creatorId) {
                throw new ForbiddenException();            
            }

            const news = await this.newsHandler.getNewsById(newsId);

            if (news === null) {
                throw new BadRequestException('Berita tidak ditemukan');
            }

            res.json(ResponseBuilder.success(news));
        } catch (error: any) {
            console.error(error);

            if (error instanceof HttpException) {
                res.json(
                    ResponseBuilder.error(
                        null, 
                        error.getMessage(), 
                        error.getStatusCode()
                    )
                );
            }

            res.json(
                ResponseBuilder.error(
                    null, 
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE
                )
            );
        }
    }

    public async getUserNews(req: Request, res: Response): Promise<void> {
        try {
            const user = req.body;

            const creatorId: number = parseInt(req.params.creatorId);

            if (user.isAdmin == false && user.id !== creatorId) {
                throw new ForbiddenException();                
            }

            const news = await this.newsHandler.getNewsByUserId(user.id);

            res.json(ResponseBuilder.success(news));
        } catch (error) {
            console.error(error);

            res.json(
                ResponseBuilder.error(
                    null, 
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE
                )
            );
        }
    }

    public async storeNews(req: Request, res: Response): Promise<void> {
        try {
            const user = req.body;

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

            res.json(ResponseBuilder.success());
        } catch (error) {
            console.error(error);

            res.json(
                ResponseBuilder.error(
                    null, 
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE
                )
            );
        }
    }

    public async updateNews(req: Request, res: Response): Promise<void> {
        try {
            const user = req.body;

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

            res.json(ResponseBuilder.success());
        } catch (error) {
            console.error(error);

            if (error instanceof HttpException) {
                res.json(
                    ResponseBuilder.error(
                        null, 
                        error.getMessage(), 
                        error.getStatusCode()
                    )
                );
            }

            res.json(
                ResponseBuilder.error(
                    null, 
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE
                )
            );
        }
    }

    public async deleteNews(req: Request, res: Response): Promise<void> {
        try {
            const user = req.body;

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

            res.json(ResponseBuilder.success());
        } catch (error) {
            console.error(error);

            if (error instanceof HttpException) {
                res.json(
                    ResponseBuilder.error(
                        null, 
                        error.getMessage(), 
                        error.getStatusCode()
                    )
                );
            }

            res.json(
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
