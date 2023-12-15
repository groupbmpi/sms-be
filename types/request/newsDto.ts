import { Kategori } from "@prisma/client";

export interface INewsOptionsArgDto {
    institutionCategory?: Kategori,
    institution?: string,
    creatorId?: number,
    startDateAt?: Date,
    endDateAt?: Date,
    take?: number,
    skip?: number,
}

export interface INewsIdArgDto {
    id: number
}

export interface INewsOwnedByUserArgDto {
    newsId: number,
    userId: number,
}

export interface ICreateNewsArgDto {
    creatorId: number,
    title: string,
    detail: string,
    photoLink: string,
    publicationLink?: string,
    createdAt?: Date,
}

export interface IUpdateNewsArgDto {
    id: number,
    data: {
        creatorId?: number,
        title?: string,
        detail?: string,
        photoLink?: string,
        publicationLink?: string,
        updatedAt?: Date,
    },
}