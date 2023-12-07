import { Request, Response } from "express";
import { DaerahHandler, EnumHandler, LembagaHandler } from "handlers";
import BaseController from "./baseController";
import { IDaerahDTO, IFormActivityReportData, IFormProblemReportData, IFormUserData, ResponseBuilder } from "@types";
import { InternalServerErrorException } from "exceptions";
import { Lembaga } from "@prisma/client";

class DataController extends BaseController<EnumHandler>{
    private lembagaHandler : LembagaHandler
    private daerahHandler : DaerahHandler
    
    constructor(){
        super(new EnumHandler())
        this.lembagaHandler = new LembagaHandler()
        this.daerahHandler = new DaerahHandler()
    }

    public getDataFormActivityReport = async (req: Request, res: Response)=>{
        try{
            const [kategori, kategoriMasalah, statusKegiatan, metodePelaksanaan] = await Promise.all([
                this.handler.getKategoriEnum(),
                this.handler.getKategoriMasalahEnum(),
                this.handler.getStatusKegiatanEnum(),
                this.handler.getMetodePelaksanaanEnum()
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
            console.error(error)

            res.status(InternalServerErrorException.STATUS_CODE).json(
                ResponseBuilder.error(
                    [],
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE,    
                )
            )
        }
    }

    public getDataFormProblemReport = async (req: Request, res: Response)=>{
        try{
            const kategoriMasalah : string[] = await this.handler.getKategoriMasalahEnum()

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
            console.error(error)

            res.status(InternalServerErrorException.STATUS_CODE).json(
                ResponseBuilder.error(
                    [],
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE,    
                )
            )
        }
    }

    public getDataFormUser = async (req: Request, res: Response)=>{
        try{
            const daerah : IDaerahDTO[] = await this.daerahHandler.getKabupatenKota()

            const lembaga : Lembaga[] = await this.lembagaHandler.getLembaga()

            const lembagaParsed : string[] = lembaga.map((lembaga) => lembaga.nama)

            res.status(200).json(
                ResponseBuilder.success<IFormUserData>(
                    {
                        daerah: daerah,
                        lembaga: lembagaParsed,
                    },
                    "",
                    200
                )
            )
        }catch(error: any){
            console.error(error)

            res.status(InternalServerErrorException.STATUS_CODE).json(
                ResponseBuilder.error(
                    [],
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE,    
                )
            )
        }
    }
}