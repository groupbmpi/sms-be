import { LAPORAN_KEGIATAN, LEMBAGA, UPDATE, UPDATEOWN, WRITE } from "@constant";
import BaseController from "./baseController";
import {UnauthorizedException } from "@exceptions";
import { ActivityHandler } from "@handlers";
import { IActivitiesDTO, IActivityReportBody, IActivityReportData, IActivityReportQuery, ResponseBuilder } from "@types";
import { checkAccess } from "@utils";
import { Request, Response } from "express";

class ActivityController extends BaseController<ActivityHandler> {
    constructor() {
        super(new ActivityHandler());
    }

    public getReport = async(req: Request<unknown, unknown, unknown, IActivityReportQuery>, res: Response)=>{
        try{
            
            let { limit, page, ...query } = req.query
            
            let userId = req.userID

            let updateOwn = true

            if(!req.isAuthenticated || typeof req.role === "undefined"){
                userId = -1
            }else{
                if(checkAccess(req.role, LAPORAN_KEGIATAN, UPDATE)){
                    updateOwn = false
                }
            }

            const activityReport : IActivitiesDTO = await this.handler.getReport(
                query,
                { limit, page },
                userId as number,
                updateOwn
            )

            res.status(200).json(
                ResponseBuilder.success<IActivitiesDTO>(
                    activityReport,
                    "",
                    200
                )
            )
        }catch(error: any){
            this.handleError(res,error);

        }
    }

    public createReport = async (req: Request<unknown, unknown, IActivityReportBody>, res: Response) =>{
        try{

            if(!req.isAuthenticated || req.role === undefined || req.userID === undefined){
                throw new UnauthorizedException()
            }

            if(!checkAccess(req.role , LAPORAN_KEGIATAN, WRITE)){
                throw new UnauthorizedException()
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
            this.handleError(res,error);

        }
    } 

    public updateReport = async (req: Request<{
        id: number,
    }, unknown, IActivityReportBody, unknown>, res: Response) =>{
        try{
            const id : number = req.params.id
            const body : IActivityReportBody = req.body
            if(!req.isAuthenticated || req.role === undefined || req.userID === undefined){
                throw new UnauthorizedException();
            }

            if(!checkAccess(req.role , LAPORAN_KEGIATAN, UPDATE) && ! checkAccess(req.role, LAPORAN_KEGIATAN, UPDATEOWN)){
                throw new UnauthorizedException()
            }

            const user_id = req.userID

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
            this.handleError(res,error);

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
            this.handleError(res,error);
        }
    }
}

export default new ActivityController();