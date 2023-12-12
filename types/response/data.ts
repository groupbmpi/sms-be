import { ILembagaByKategoriDTO } from "types/request/lembaga";
import { IDaerahDTO } from "../request";

export interface IFormActivityReportData {
    kategori: string[],
    kategoriMasalah : string[],
    statusKegiatan : string[],
    metodePelaksanaan : string[],
    daerah : IDaerahDTO[],
}

export interface IFormProblemReportData {
    kategoriMasalah : string[],
    provinsi : string[],
}

export interface IFormUserData{
    daerah : IDaerahDTO[],
    lembaga : ILembagaByKategoriDTO[],
    kategori : string[],
}

export interface IFormLembagaData{
    lembaga: ILembagaByKategoriDTO[],
}