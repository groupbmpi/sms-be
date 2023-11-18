import { Request, Response } from "express";
import NewsHandler from "../handlers/newsHandler";

class NewsController {
    private newsService: NewsHandler;

    constructor() {
        this.newsService = new NewsHandler();
    }

    public async getNewsById(req: Request, res: Response) {
        try {
            const user = req.user;
            
            const newsId: number = parseInt(req.params.newsId);
            const creatorId: number = parseInt(req.params.creatorId);

            if (user.isAdmin == false && user.id !== creatorId) {
                throw new ForbiddenException();                
            }

            const news = await this.newsService.getNewsById(newsId);

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

    public async getUserNews(req: Request, res: Response) {
        try {
            const user = req.user;

            const creatorId: number = parseInt(req.params.creatorId);

            if (user.isAdmin == false && user.id !== creatorId) {
                throw new ForbiddenException();                
            }

            const news = await this.newsService.getNewsByUserId(user.id);

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

    public async storeNews(req: Request, res: Response) {
        try {
            const user = req.user;

            const creatorId: number = parseInt(req.params.creatorId);

            const title: string = req.body.title;
            const detail: string = req.body.detail; 
            const photoLink: string = req.body.photoLink;

            if (user.isAdmin == false && user.id !== creatorId) {
                throw new ForbiddenException();                
            }

            await this.newsService.storeNews(
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

    public async updateNews(req: Request, res: Response) {
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

            const isNewsExist = await this.newsService.isNewsExistById(newsId);

            if (isNewsExist === false) {
                throw new BadRequestException('Berita tidak ditemukan');
            }

            await this.newsService.updateNews(
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

    public async deleteNews(req: Request, res: Response) {
        try {
            const user = req.user;

            const newsId: number = parseInt(req.params.newsId);
            const creatorId: number = parseInt(req.params.creatorId);

            if (user.isAdmin == false && user.id !== creatorId) {
                throw new ForbiddenException();                
            }

            const isNewsExist = await this.newsService.isNewsExistById(newsId);

            if (isNewsExist === false) {
                throw new BadRequestException('Berita tidak ditemukan');
            }

            await this.newsService.deleteNews(newsId);

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