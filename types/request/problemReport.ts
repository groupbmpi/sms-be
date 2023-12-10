import { LaporanMasalah } from "@prisma/client";
import { IPagination } from "./pagination";

export interface IProblemReportQuery extends IPagination{
    user_id?: number,
}


type PropsLaporanMasalahOmitted = "id" | "user_id" | "createdAt" | "updatedAt" | "provinsi_id"
export interface IProblemReportBody extends IProblemDTO{}

export interface IProblemDTO extends Omit<LaporanMasalah, PropsLaporanMasalahOmitted> {
    id? : number,
    user_id? : number | null,
    createdAt? : Date,
    updatedAt? : Date,
    provinsi_id? : number,
    provinsi: string,
    namaUser: string,
}

export interface IProblemsDTO {
    data: IProblemDTO[],
    countPages: number,
}
