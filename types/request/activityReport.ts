import { LaporanKegiatan, StatusKegiatan } from "@prisma/client";
import { IPagination } from "./pagination";

export interface IActivityReportQuery extends IPagination {
    id? : number,
    user_id? : number
    status? : StatusKegiatan,
    jadwal? : Date
}

type PropsLaporanKegiatanOmitted = "id" | "user_id" | "createdAt" | "updatedAt"
export interface IActivityReportBody extends Omit<LaporanKegiatan, PropsLaporanKegiatanOmitted>{}
