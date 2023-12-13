import { Lembaga } from "@prisma/client";
import { IPagination } from "./pagination";

export interface ILembagaQuery extends IPagination {
    id?     : number,
    nama?   : string,
}

type PropsLembagaOmitted = "id" | "createdAt" | "updatedAt"

export interface ILembagaDTO extends Omit<Lembaga, PropsLembagaOmitted>{
    id? : number,
    createdAt? : Date,
    updatedAt? : Date,
}

export interface ILembagaByKategoriDTO {
    kategori: string,
    lembaga: string[],
}

export interface ILembagaBody extends ILembagaDTO{}

export interface ILembagasDTO {
    data: ILembagaDTO[],
    countPages: number,
}
