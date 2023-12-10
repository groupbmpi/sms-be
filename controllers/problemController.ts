import { Request, Response } from "express";
import { IProblemReportBody, IProblemReportQuery, IProblemsDTO, ResponseBuilder } from "@types";
import { HttpException, InternalServerErrorException } from "@exceptions";
import { ProblemHandler } from "@handlers";
import { BaseController } from "@controllers";
import { IProblemReportData, IProblemsReportData } from "types/response/problemReport";

class ProblemController extends BaseController<ProblemHandler> {
    constructor() {
        super(new ProblemHandler());
    }

    getReport = async (req: Request<unknown, unknown, unknown, IProblemReportQuery>, res: Response) => {
        try {

            let { limit, page, ...query } = req.query

            const problemReport: IProblemsDTO = await this.handler.getReport(
                query,
                { limit, page }
            )

            res.status(200).json(
                ResponseBuilder.success<IProblemsDTO>(
                    problemReport,
                    "",
                    200
                )
            )

        } catch (error: any) {
            console.error(error)

            res.status(InternalServerErrorException.STATUS_CODE).json(
                ResponseBuilder.error<IProblemsReportData[]>(
                    [],
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE,    
                )
            )
        }
    }
    

	public createReport = async (req: Request<unknown, unknown, IProblemReportBody>, res: Response) =>{
        try{
            let id = -1
            if(req.isAuthenticated !== false){
                id = req.userID as number
            }
                
            const body : IProblemReportBody = req.body

            const newLaporanMasalah : IProblemReportData = await this.handler.createReport(
                body,
                id,
            )

            res.status(201).json(
                ResponseBuilder.success(
                    newLaporanMasalah,
                    "Create report successfully",
                    201
                )
            )

        } catch (error: any) {
            console.error(error)

            res.status(InternalServerErrorException.STATUS_CODE).json(
                ResponseBuilder.error<IProblemReportData>(
                    null,
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE,    
                )
            )
        }
    }
}

export default new ProblemController()