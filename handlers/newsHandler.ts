import BaseHandler from "./baseHandler";

export class NewsHandler extends BaseHandler{
    public async getNewsById(id: number): Promise<{
        title: string, 
        detail: string, 
        photoLink: string,
    } | null> {
        const news = await this.prisma.berita.findUnique({
            select: {
                judul: true,
                detail: true,
                linkPhoto: true,
            },
            where: {
                id: id,
            }
        });

        if (news === null) {
            return null;
        }

        return {
            title: news.judul,
            detail: news.detail,
            photoLink: news.linkPhoto,
        };
    }

    public async getNewsByUserId(userId: number): Promise<{
        title: string, 
        detail: string, 
        photoLink: string,
    }[]> {
        const news = await this.prisma.berita.findMany({
            select: {
                id: true,
                judul: true,
                detail: true,
                linkPhoto: true,
            },
            where: {
                user_id: userId
            }
        });

        return news.map(function (value) {
            return {
                title: value.judul,
                detail: value.detail,
                photoLink: value.linkPhoto,
            };
        });
    }

    public async isNewsExistById(id: number): Promise<boolean> {
        const news = await this.prisma.berita.findUnique({
            select: {
                id: true,
            },
            where: {
                id
            }
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
                user_id: creatorId
            }
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
                user_id: creatorId
            }
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
                user_id: data.creatorId
            },
            where: {
                id
            }
        });
    }

    public async deleteNews(id: number): Promise<void> {
        await this.prisma.berita.delete({
            where: {
                id
            }
        });
    }
}
