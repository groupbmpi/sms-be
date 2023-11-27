export interface INewsOptionsArgDto {
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
    title: string,
    detail: string,
    photoLink: string,
    creatorId: number,
}

export interface IUpdateNewsArgDto {
    id: number,
    data: {
        title?: string,
        detail?: string,
        photoLink?: string,
        creatorId?: number,
    },
}