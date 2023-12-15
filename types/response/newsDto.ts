export interface IAllNewsRetDto {
    news: INewsByIdRetDto[],
    totalRecords: number,
}

export interface INewsByIdRetDto {
    owner: {
        id: number,
        name: string,
    },
    news: {
        id: number,
        title: string, 
        detail: string, 
        photoLink: string,
        publicationLink: string | null,
        createdAt: Date,
        updatedAt: Date,
        canModify: boolean,
    }
}

export interface INewsOptimumDatesRetDto {
    minDates: OptimumDates,
    maxDates: OptimumDates,
}

interface OptimumDates {
    createdAt: Date | null,
    updatedAt: Date | null,
}