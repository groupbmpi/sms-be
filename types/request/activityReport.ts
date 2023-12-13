import { LaporanKegiatan } from "@prisma/client";
import { IPagination } from "./pagination";

export interface IActivityReportQuery extends IPagination {
    id?     : number,
    user_id? : number
    lembaga? : string, 
}


type PropsLaporanKegiatanOmitted = "id" | "user_id" | "kabupatenKota_id" | "createdAt" | "updatedAt" | "indikatorKeberhasilan"
export interface IActivityReportBody extends IActivityDTO{}

export interface IActivityDTO extends Omit<LaporanKegiatan, PropsLaporanKegiatanOmitted>{
    id? : number,
    user_id? : number,
    createdAt? : Date,
    updatedAt? : Date,
    kabupatenKota_id? : number,
    provinsi: string,
    kabupatenKota : string,
    indikatorKeberhasilan : IIndikatorKeberhasilanDTO[],
    isEditable? : boolean,
}

export interface IActivitiesDTO {
    data: IActivityDTO[],
    countPages: number,
}
export interface IIndikatorKeberhasilanDTO {
    indicator: string,
    target: number,
}