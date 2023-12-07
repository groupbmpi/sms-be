import { Request, Response } from "express";
import { IActivitiesDTO, IActivityReportBody, IActivityReportQuery, ResponseBuilder } from "@types";
import { ActivityHandler } from "@handlers";
import { IActivityReportData } from "@types";
import {InternalServerErrorException } from "exceptions";
import { BaseController } from "@controllers";

class ActivityController extends BaseController<ActivityHandler> {
    constructor() {
        super(new ActivityHandler());
    }

    public getReport = async(req: Request<unknown, unknown, unknown, IActivityReportQuery>, res: Response)=>{
        try{
            
            let { limit, page, ...query } = req.query
            
            const activityReport : IActivitiesDTO = await this.handler.getReport(
                query,
                { limit, page }
            )

            res.status(200).json(
                ResponseBuilder.success<IActivitiesDTO>(
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

    public createReport = async (req: Request<unknown, unknown, IActivityReportBody>, res: Response) =>{
        try{
            //TODO: Get user id from middleware
            const id = 1
            const body : IActivityReportBody = req.body

            const newLaporanKegiatan : IActivityReportData = await this.handler.createReport(
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

    public updateReport = async (req: Request<unknown, unknown, IActivityReportBody, number>, res: Response) =>{
        try{
            const id : number = req.query
            const body : IActivityReportBody = req.body

            const updatedLaporanKegiatan : IActivityReportData = await this.handler.updateReport(
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

    public deleteReport = async (req: Request<unknown, unknown, unknown, number>, res: Response) =>{
        try{
            const id : number = req.query

            const deletedLaporanKegiatan : boolean = await this.handler.deleteReport(
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

export default new ActivityController();