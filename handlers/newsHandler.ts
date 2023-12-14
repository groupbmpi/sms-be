import { BaseHandler } from "./baseHandler";
import { IAllNewsRetDto, ICreateNewsArgDto, INewsByIdRetDto, INewsIdArgDto, INewsOptimumDatesRetDto, INewsOptionsArgDto, INewsOwnedByUserArgDto, IUpdateNewsArgDto } from "@types";

export class NewsHandler extends BaseHandler {
    public async getAllNews(dto: INewsOptionsArgDto): Promise<IAllNewsRetDto> {
        const {  
            institutionCategory, 
            institution, 
            creatorId, 
            startDateAt, 
            endDateAt, 
            take, 
            skip 
        } = dto;

        const news = await this.prisma.berita.findMany({
            select: {
                id: true,
                judul: true,
                detail: true,
                linkPhoto: true,
                linkPublication: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        id: true,
                        namaLengkap: true,
                    },
                },
            },
            where: {
                user: {
                    id: creatorId,
                    lembaga: {
                        kategori: institutionCategory,
                        nama: institution,
                    },
                },
                updatedAt: {
                    gte: startDateAt,
                    lte: endDateAt,
                },
            },
            orderBy: {
                updatedAt: "desc",
            },
            take,
            skip,
        });

        const totalRecords = await this.prisma.berita.count({
            where: {
                user: {
                    id: creatorId,
                    lembaga: {
                        kategori: institutionCategory,
                        nama: institution,
                    },
                },
                updatedAt: {
                    gte: startDateAt,
                    lte: endDateAt,
                },
            },
        });

        return {
            news: news.map(function (value) {
                return {
                    owner: {
                        id: value.user.id,
                        name: value.user.namaLengkap,
                    },
                    news: {
                        id: value.id,
                        title: value.judul,
                        detail: value.detail,
                        photoLink: value.linkPhoto,
                        publicationLink: value.linkPublication,
                        createdAt: value.createdAt,
                        updatedAt: value.updatedAt,
                    }
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
                linkPublication: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        id: true,
                        namaLengkap: true,
                    },
                },
            },
            where: {
                id,
            },
        });

        if (news === null) {
            return null;
        }

        return {
            owner: {
                id: news.user.id,
                name: news.user.namaLengkap,
            },
            news: {
                id: news.id,
                title: news.judul,
                detail: news.detail,
                photoLink: news.linkPhoto,
                publicationLink: news.linkPublication,
                createdAt: news.createdAt,
                updatedAt: news.updatedAt,
            }
        };
    }

    public async getNewsOptimumDates(): Promise<INewsOptimumDatesRetDto> {
        const optimumDates = await this.prisma.berita.aggregate({
            _max: {
                createdAt: true,
                updatedAt: true,
            },
            _min: {
                createdAt: true,
                updatedAt: true,
            },
        });

        return {
            minDates: optimumDates._min,
            maxDates: optimumDates._max,
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
        const { title, detail, photoLink, publicationLink, date, creatorId } = dto;

        await this.prisma.berita.create({
            data: {
                judul: title,
                detail,
                linkPhoto: photoLink,
                linkPublication: publicationLink,
                createdAt: date,
                updatedAt: date,
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
        const { title, detail, photoLink, publicationLink, date, creatorId } = dto.data;

        if (
            title === undefined && 
            detail === undefined && 
            photoLink === undefined && 
            publicationLink === undefined &&
            creatorId === undefined
        ) {
            throw new Error('title, detail, photoLink, publicationLink, and creatorId arguments cannot all be undefined');
        }

        await this.prisma.berita.update({
            data: {
                judul: title,
                detail,
                linkPhoto: photoLink,
                linkPublication: publicationLink,
                updatedAt: date,
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
