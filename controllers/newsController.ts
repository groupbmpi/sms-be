import BaseController from "./baseController";
import { BadRequestException, NotFoundException, UnauthorizedException} from "@exceptions";
import { NewsHandler } from "@handlers";
import { Kategori } from "@prisma/client";
import { IAllNewsRetDto, ICreateNewsArgDto, ICreateNewsRequest, ICreateNewsValidatedBody, IDeleteNewsRequest, INewsByIdRetDto, INewsIdArgDto, INewsOptimumDatesRetDto, INewsOptionsArgDto, INewsOwnedByUserArgDto, INewsParams, INewsValidatedParams, IUpdateNewsArgDto, IUpdateNewsRequest, IUpdateNewsValidatedBody, IValidatedTargetUserId, ResponseBuilder } from "@types";
import { checkAccess, checkIntCast, countSkipped, getDate, getInt } from "@utils";
import { BERITA, DELETE, UPDATE, UPDATEOWN, WRITE } from "constant";
import { Request, Response } from "express";

class NewsController extends BaseController<NewsHandler> {
    constructor() {
        super(new NewsHandler());
    }

    /**
     * @Method ('GET')
     * @Route ('/api/v1/news')
     */
    public getAllNews = async (req: Request<unknown, unknown, unknown, any>, res: Response): Promise<void> => {
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
     */
    public getNewsById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            if (checkIntCast(id) === false) {
                throw new NotFoundException();
            }

            const newsArgDto: INewsIdArgDto = {
                id: parseInt(id),
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
     */
    public createNews = async(req: Request<{id: number}, unknown, any>, res: Response): Promise<void> => {
        try {
            const { 
                title, 
                detail, 
                photoLink, 
                publicationLink, 
                createdAt,
                creatorId
            } = req.body;

            const {
                isAuthenticated,
                userID,
                role
            } = req;

            if (isAuthenticated === false) {
                throw new UnauthorizedException();
            }

            if (checkAccess(role as Map<string, string[]>, BERITA, WRITE) === true) {
                if (typeof creatorId === 'undefined') {
                    throw new BadRequestException(`creatorId field must be present`);
                }

                if (checkIntCast(creatorId) === false) {
                    throw new BadRequestException(`creatorId data type must be an integer`);
                }
            }

            if (typeof title === 'undefined') {
                throw new BadRequestException(`title field must be present`);
            }

            if (typeof title !== 'string') {
                throw new BadRequestException(`title data type must be a string`);
            }

            if (typeof detail === 'undefined') {
                throw new BadRequestException(`detail field must be present`);
            }

            if (typeof detail !== 'string') {
                throw new BadRequestException(`detail data type must be a string`);
            }

            if (typeof photoLink === 'undefined') {
                throw new BadRequestException(`photoLink field must be present`);
            }

            if (typeof photoLink !== 'string') {
                throw new BadRequestException(`photoLink data type must be a string`);
            }

            if (typeof publicationLink !== 'undefined' && typeof publicationLink !== 'string') {
                throw new BadRequestException(`publicationLink data type must be a string`);
            }

            if (typeof createdAt !== 'undefined' && typeof createdAt !== 'string') {
                throw new BadRequestException(`createdAt data type must be a string`);
            }

            const newsArgDto: ICreateNewsArgDto = {
                title,
                detail,
                photoLink,
                publicationLink,
                createdAt: getDate(createdAt),
                creatorId: checkAccess(role as Map<string, string[]>, BERITA, WRITE)
                    ? creatorId as number
                    : userID as number,
            };

            await this.handler.createNews(newsArgDto);

            res.status(201).json(ResponseBuilder.success());
        } catch (error: any) {
            this.handleError(res, error);
        }
    }

    /**
     * @Method ('PUT')
     * @Route ('/api/v1/news/:newsId')
     * @Middleware ([AuthMiddleware])
     */
    public updateNews = async (req: Request<{id: number}, unknown, any>, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            const { 
                title, 
                detail, 
                photoLink, 
                publicationLink, 
                updatedAt, 
                creatorId 
            } = req.body;

            const {
                isAuthenticated,
                userID,
                role
            } = req;

            if (isAuthenticated === false) {
                throw new UnauthorizedException();
            }

            if (checkAccess(role as Map<string, string[]>, BERITA, UPDATE) === true) {
                if (
                    typeof title === 'undefined' &&
                    typeof detail === 'undefined' &&
                    typeof photoLink === 'undefined' &&
                    typeof publicationLink === 'undefined' &&
                    typeof updatedAt === 'undefined' &&
                    typeof creatorId === 'undefined'
                ) {
                    throw new BadRequestException('title, detail, photoLink, publicationLink, updatedAt, or creatorId field must be present');
                }

                if (typeof creatorId !== 'undefined' && checkIntCast(creatorId) === false) {
                    throw new BadRequestException('creatorId field must be an integer');
                }
            } else {
                if (
                    typeof title === 'undefined' &&
                    typeof detail === 'undefined' &&
                    typeof photoLink === 'undefined' &&
                    typeof publicationLink === 'undefined' &&
                    typeof updatedAt === 'undefined'
                ) {
                    throw new BadRequestException('title, detail, photoLink, publicationLink, updatedAt field must be present');
                }
            }

            if (typeof title !== 'undefined' && typeof title !== 'string') {
                throw new BadRequestException('title field must be a string');
            }

            if (typeof detail !== 'undefined' && typeof detail !== 'string') {
                throw new BadRequestException('detail field must be a string');
            }

            if (typeof photoLink !== 'undefined' && typeof photoLink !== 'string') {
                throw new BadRequestException('photoLink field must be a string');
            }

            if (typeof publicationLink !== 'undefined' && typeof publicationLink !== 'string') {
                throw new BadRequestException('publicationLink field must be a string');
            }

            if (typeof updatedAt !== 'undefined' && typeof updatedAt !== 'string') {
                throw new BadRequestException('updatedAt field must be a string');
            }

            const newsOwnArgDto: INewsOwnedByUserArgDto = {
                newsId: id,
                userId: checkAccess(role as Map<string, string[]>, BERITA, UPDATE) === true
                    ? getInt(creatorId) as number
                    : userID as number
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
                    updatedAt: updatedAt !== undefined
                        ? new Date(updatedAt)
                        : undefined,
                    creatorId: newsOwnArgDto.userId
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
     * @Middleware ([AuthMiddleware])
     */
    public deleteNews = async (req: Request<{id: number}, unknown, unknown, qs.ParsedQs>, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            const { creatorId } = req.query;

            const {
                isAuthenticated,
                userID,
                role
            } = req;

            if (isAuthenticated === false) {
                throw new UnauthorizedException();
            }

            if (checkAccess(role as Map<string, string[]>, BERITA, DELETE) === true) {
                if (typeof creatorId === 'undefined') {
                    throw new BadRequestException('creatorId query param must be present');
                }

                if (checkIntCast(creatorId) === false) {
                    throw new BadRequestException('creatorId query param data type must be an integer');
                }
            }

            const newsOwnArgDto: INewsOwnedByUserArgDto = {
                newsId: id,
                userId: checkAccess(role as Map<string, string[]>, BERITA, DELETE) === true
                    ? getInt(creatorId) as number
                    : userID as number
            };

            const isNewsOwnedByUser: boolean = await this.handler.isNewsOwnedByUser(newsOwnArgDto);

            if (isNewsOwnedByUser === false) {
                throw new BadRequestException('News was not found');
            }

            const newsIdArgDto: INewsIdArgDto = {
                id: newsOwnArgDto.newsId,
            };

            await this.handler.deleteNews(newsIdArgDto);

            res.status(204).json(ResponseBuilder.success());
        } catch (error: any) {
            this.handleError(res, error);
        }
    }
}

export default new NewsController();