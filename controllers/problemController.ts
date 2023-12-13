import BaseController from "./baseController";
import { ProblemHandler } from "@handlers";
import { IProblemReportBody, IProblemReportQuery, IProblemsDTO, ResponseBuilder, IProblemReportData} from "@types";
import { Request, Response } from "express";

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
            this.handleError(res,error);
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
            this.handleError(res,error);
        }
    }
}

export default new ProblemController()