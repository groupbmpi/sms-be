import BaseHandler from "./baseHandler";

export class NewsHandler extends BaseHandler {
    public async getAllNews(): Promise<{
        title: string, 
        detail: string, 
        photoLink: string,
        createdAt: Date,
        updatedAt: Date,
    }[]> {
        const news = await this.prisma.berita.findMany({
            select: {
                judul: true,
                detail: true,
                linkPhoto: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        return news.map(function (value) {
            return {
                title: value.judul,
                detail: value.detail,
                photoLink: value.linkPhoto,
                createdAt: value.createdAt,
                updatedAt: value.updatedAt
            };
        });
    }

    public async getNewsByUserId(userId: number): Promise<{
        title: string, 
        detail: string, 
        photoLink: string,
        createdAt: Date,
        updatedAt: Date,
    }[]> {
        const news = await this.prisma.berita.findMany({
            select: {
                judul: true,
                detail: true,
                linkPhoto: true,
                createdAt: true,
                updatedAt: true,
            },
            where: {
                user_id: userId,
            },
        });

        return news.map(function (value) {
            return {
                title: value.judul,
                detail: value.detail,
                photoLink: value.linkPhoto,
                createdAt: value.createdAt,
                updatedAt: value.updatedAt
            };
        });
    }

    public async isNewsExistById(id: number): Promise<boolean> {
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

    public async isNewsOwnedByUser(newsId: number, creatorId: number): Promise<boolean> {
        const news = await this.prisma.berita.findUnique({
            select: {
                id: true,
            },
            where: {
                id: newsId,
                user_id: creatorId,
            },
        });

        if (news === null) {
            return false;
        }

        return true;
    }

    public async storeNews(
        title: string,
        detail: string,
        photoLink: string,
        creatorId: number,
    ): Promise<void> {
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

    public async updateNews(
        id: number,
        data: {
            title: string,
            detail: string,
            photoLink: string,
            creatorId: number,
        }
    ): Promise<void> {
        await this.prisma.berita.update({
            data: {
                judul: data.title,
                detail: data.detail,
                linkPhoto: data.photoLink,
                user: {
                    connect: {
                        id: data.creatorId,
                    },
                },
            },
            where: {
                id,
            },
        });
    }

    public async deleteNews(id: number): Promise<void> {
        await this.prisma.berita.delete({
            where: {
                id,
            },
        });
    }
}
