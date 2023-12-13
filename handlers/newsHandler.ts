import { BaseHandler } from "@handlers";
import { IAllNewsRetDto, ICreateNewsArgDto, INewsByIdRetDto, INewsIdArgDto, INewsOptionsArgDto, INewsOwnedByUserArgDto, IUpdateNewsArgDto } from "@types";

export class NewsHandler extends BaseHandler {
    public async getAllNews(dto: INewsOptionsArgDto): Promise<IAllNewsRetDto> {
        const {  institutionId, creatorId, startDateAt, endDateAt, take, skip } = dto;

        const news = await this.prisma.berita.findMany({
            select: {
                id: true,
                judul: true,
                detail: true,
                linkPhoto: true,
                createdAt: true,
                updatedAt: true,
            },
            where: {
                user: {
                    id: creatorId,
                    lembaga_id: institutionId,
                },
                createdAt: {
                    gte: startDateAt,
                    lte: endDateAt,
                },
            },
            take,
            skip,
        });

        const totalRecords = await this.prisma.berita.count({
            where: {
                user_id: creatorId,
                createdAt: {
                    gte: startDateAt,
                    lte: endDateAt,
                },
            },
        });

        return {
            news: news.map(function (value) {
                return {
                    id: value.id,
                    title: value.judul,
                    detail: value.detail,
                    photoLink: value.linkPhoto,
                    createdAt: value.createdAt,
                    updatedAt: value.updatedAt,
                };
            }),
            totalRecords,
        };
    }

    public async getNewsById(dto: INewsIdArgDto): Promise<INewsByIdRetDto | null> {
        const { id } = dto;

        const news = await this.prisma.berita.findUnique({
            select: {
                id: true,
                judul: true,
                detail: true,
                linkPhoto: true,
                createdAt: true,
                updatedAt: true,
            },
            where: {
                id,
            },
        });

        if (news === null) {
            return null;
        }

        return {
            id: news.id,
            title: news.judul,
            detail: news.detail,
            photoLink: news.linkPhoto,
            createdAt: news.createdAt,
            updatedAt: news.updatedAt
        };
    }

    public async isNewsExistById(dto: INewsIdArgDto): Promise<boolean> {
        const { id } = dto;

        const news = await this.prisma.berita.findUnique({
            select: {
                id: true,
            },
            where: {
                id,
            },
        });

        if (news === null) {
            return false;
        }

        return true;
    }

    public async isNewsOwnedByUser(dto: INewsOwnedByUserArgDto): Promise<boolean> {
        const { newsId, userId } = dto;

        const news = await this.prisma.berita.findUnique({
            select: {
                id: true,
            },
            where: {
                id: newsId,
                user_id: userId,
            },
        });

        if (news === null) {
            return false;
        }

        return true;
    }

    public async createNews(dto: ICreateNewsArgDto): Promise<void> {
        const { title, detail, photoLink, creatorId } = dto;

        await this.prisma.berita.create({
            data: {
                judul: title,
                detail,
                linkPhoto: photoLink,
                user: {
                    connect: {
                        id: creatorId,
                    },
                },
            },
        });
    }

    public async updateNews(dto: IUpdateNewsArgDto): Promise<void> {
        const { id } = dto;
        const { title, detail, photoLink, creatorId } = dto.data;

        if (title === undefined && detail === undefined && photoLink === undefined && creatorId === undefined) {
            throw new Error('title, detail, photoLink, and creatorId arguments cannot all be undefined');
        }

        await this.prisma.berita.update({
            data: {
                judul: title,
                detail,
                linkPhoto: photoLink,
                user: {
                    connect: {
                        id: creatorId,
                    },
                },
            },
            where: {
                id
            },
        });
    }

    public async deleteNews(dto: INewsIdArgDto): Promise<void> {
        const { id } = dto;

        await this.prisma.berita.delete({
            where: {
                id,
            },
        });
    }
}
