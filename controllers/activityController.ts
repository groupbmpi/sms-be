import { Request, Response } from "express";
import { IActivityReportBody, IActivityReportQuery, ResponseBuilder } from "@types";
import { ActivityHandler } from "@handlers";
import { IActivityReportData } from "types/response/activityReport";
import { HttpException, InternalServerErrorException } from "exceptions";

class ActivityController{
    private activityHandler: ActivityHandler

    constructor(){
        this.activityHandler = new ActivityHandler()
    }

    public async getReport(req: Request<unknown, unknown, unknown, IActivityReportQuery>, res: Response){
        try{
            const { limit, page, ...query } = req.query

            const activityReport : IActivityReportData[] = await this.activityHandler.getReport(
                query,
                { limit, page }
            )

            res.status(200).json(
                ResponseBuilder.success<IActivityReportData[]>(
                    activityReport,
                    "",
                    20
                )
            )
        }catch(error: any){
            console.error(error)

            res.status(InternalServerErrorException.STATUS_CODE).json(
                ResponseBuilder.error<IActivityReportData[]>(
                    [],
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE,    
                )
            )
        }
    }

    public async createReport(req: Request<unknown, unknown, IActivityReportBody>, res: Response){
        try{
            //TODO: Get user id from middleware
            const id = 1
            const body : IActivityReportBody = req.body

            const newLaporanKegiatan : IActivityReportData = await this.activityHandler.createReport(
                body,
                id,
            )

            res.status(201).json(
                ResponseBuilder.success<IActivityReportData>(
                    newLaporanKegiatan,
                    "",
                    201
                )
            )
        }catch(error: any){
            console.error(error)

            res.status(InternalServerErrorException.STATUS_CODE).json(
                ResponseBuilder.error<IActivityReportData>(
                    null,
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE,    
                )
            )
        }
    } 

    public async updateReport(req: Request<unknown, unknown, IActivityReportBody, number>, res: Response){
        try{
            const id : number = req.query
            const body : IActivityReportBody = req.body

            const updatedLaporanKegiatan : IActivityReportData = await this.activityHandler.updateReport(
                body,
                id,
            )

            res.status(200).json(
                ResponseBuilder.success<IActivityReportData>(
                    updatedLaporanKegiatan,
                    "",
                    200
                )
            )
        }catch(error: any){
            console.error(error)

            res.status(InternalServerErrorException.STATUS_CODE).json(
                ResponseBuilder.error<IActivityReportData>(
                    null,
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE,    
                )
            )
        }
    }

    public async deleteReport(req: Request<unknown, unknown, unknown, number>, res: Response){
        try{
            const id : number = req.query

            const deletedLaporanKegiatan : boolean = await this.activityHandler.deleteReport(
                id,
            )

            res.status(200).json(
                ResponseBuilder.success<boolean>(
                    deletedLaporanKegiatan,
                    "",
                    200
                )
            )
        }catch(error: any){
            console.error(error)

            res.status(InternalServerErrorException.STATUS_CODE).json(
                ResponseBuilder.error<boolean>(
                    null,
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE,    
                )
            )
        }
    }
}