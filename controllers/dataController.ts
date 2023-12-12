import { DaerahHandler, EnumHandler, LembagaHandler } from "@handlers";
import { Kategori, KategoriMasalah, Lembaga, MetodePelaksanaan, StatusKegiatan } from "@prisma/client";
import { IDaerahDTO, IFormActivityReportData, IFormProblemReportData, IFormUserData, ResponseBuilder } from "@types";
import { Request, Response } from "express";
import BaseController from "./baseController";

class DataController extends BaseController<EnumHandler>{
    private lembagaHandler : LembagaHandler
    private daerahHandler : DaerahHandler
    
    constructor(){
        super(new EnumHandler())
        this.lembagaHandler = new LembagaHandler()
        this.daerahHandler = new DaerahHandler()
    }

    public getDataFormActivityReport = async (_: Request, res: Response)=>{
        try{
            const [kategori, kategoriMasalah, statusKegiatan, metodePelaksanaan] = await Promise.all([
                this.handler.getEnum(Kategori),
                this.handler.getEnum(KategoriMasalah),
                this.handler.getEnum(StatusKegiatan),
                this.handler.getEnum(MetodePelaksanaan),
            ])

            const daerah : IDaerahDTO[] = await this.daerahHandler.getKabupatenKota()

            res.status(200).json(
                ResponseBuilder.success<IFormActivityReportData>(
                    {
                        kategori,
                        kategoriMasalah,
                        statusKegiatan,
                        metodePelaksanaan,
                        daerah,
                    },
                    "",
                    200
                )
            )
        }catch(error: any){
            this.handleError(res,error);
        }
    }

    public getDataFormProblemReport = async (_: Request, res: Response)=>{
        try{
            const kategoriMasalah : string[] = this.handler.getEnum(KategoriMasalah)

            const provinsi : string[] = await this.daerahHandler.getProvinsi()

            res.status(200).json(
                ResponseBuilder.success<IFormProblemReportData>(
                    {
                        kategoriMasalah,
                        provinsi,
                    },
                    "",
                    200
                )
            )
        }catch(error: any){
            this.handleError(res,error);
        }
    }

    public getDataFormUser = async (_: Request, res: Response)=>{
        try{
            const daerah : IDaerahDTO[] = await this.daerahHandler.getKabupatenKota()

            const lembaga : Lembaga[] = await this.lembagaHandler.getLembaga()

            const lembagaParsed : string[] = lembaga.map((lembaga) => lembaga.nama)

            const kategori : string[] = this.handler.getEnum(Kategori)

            res.status(200).json(
                ResponseBuilder.success<IFormUserData>(
                    {
                        daerah: daerah,
                        lembaga: lembagaParsed,
                        kategori : kategori
                    },
                    "",
                    200
                )
            )
        }catch(error: any){
            this.handleError(res,error);
        }
    }
}

export default new DataController();