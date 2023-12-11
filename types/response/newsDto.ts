export interface IAllNewsRetDto {
    news: INewsByIdRetDto[],
    totalRecords: number,
}

export interface INewsByIdRetDto {
    id: number,
    title: string, 
    detail: string, 
    photoLink: string,
    createdAt: Date,
    updatedAt: Date,
}