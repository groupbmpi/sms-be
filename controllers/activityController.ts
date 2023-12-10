import { Request, Response } from "express";
import { IActivitiesDTO, IActivityDTO, IActivityReportBody, IActivityReportQuery, ResponseBuilder } from "@types";
import { ActivityHandler } from "@handlers";
import { IActivityReportData } from "@types";
import {InternalServerErrorException, UnauthorizedException } from "exceptions";
import { BaseController } from "@controllers";
import { checkAccess } from "utils";
import { LAPORAN_KEGIATAN, WRITE } from "constant";

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
                    200
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

            if(!req.isAuthenticated || req.role === undefined || req.userID === undefined){
                res.status(UnauthorizedException.STATUS_CODE).json(
                    ResponseBuilder.error<IActivityReportData>(
                        null,
                        UnauthorizedException.MESSAGE,
                        UnauthorizedException.STATUS_CODE,    
                    )
                )

                return
            }

            //TODO:Check access matrix

            if(!checkAccess(req.role , LAPORAN_KEGIATAN, WRITE)){
                
            }

            const id = req.userID
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

    public updateReport = async (req: Request<{
        id: number,
    }, unknown, IActivityReportBody, unknown>, res: Response) =>{
        try{
            const id : number = req.params.id
            const body : IActivityReportBody = req.body
            //TODO: Get user id from middleware
            const user_id = 1

            const updatedLaporanKegiatan : IActivityReportData = await this.handler.updateReport(
                body,
                user_id,
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

    public deleteReport = async (req: Request<{
        id: number,
    }, unknown, unknown, unknown>, res: Response) =>{
        try{
            const id : number = req.params.id
            
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