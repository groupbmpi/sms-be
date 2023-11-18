import { PrismaClient } from "@prisma/client";
import { PrismaInstance } from "../services/prisma";

class NewsHandler {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = PrismaInstance.getInstance().getClient();
    }

    public async getNewsById(id: number): Promise<{
        id: number, 
        judul: string, 
        detail: string, 
        linkPhoto: string,
        user_id: number,
    } | null> {
        return await this.prisma.berita.findUnique({
            select: {
                id: true,
                judul: true,
                detail: true,
                linkPhoto: true,
                user_id: true,
            },
            where: {
                id: id,
            }
        });
    }

    public async getNewsByUserId(userId: number): Promise<{
        id: number, 
        judul: string, 
        detail: string, 
        linkPhoto: string,
    }[]> {
        return await this.prisma.berita.findMany({
            select: {
                id: true,
                judul: true,
                detail: true,
                linkPhoto: true,
            },
            where: {
                user_id: userId
            }
        })
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
        this.prisma.berita.create({
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
        this.prisma.berita.update({
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
        this.prisma.berita.delete({
            where: {
                id
            }
        });
    }
}

export default NewsHandler;