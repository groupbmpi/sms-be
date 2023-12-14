import BaseController from "./baseController";
import { ProblemHandler } from "@handlers";
import { IProblemReportBody, IProblemReportQuery, IProblemsDTO, ResponseBuilder, IProblemReportData} from "@types";
import { LAPORAN_MASALAH, READ } from "constant";
import { UnauthorizedException } from "exceptions";
import { Request, Response } from "express";
import { checkAccess } from "utils";

class ProblemController extends BaseController<ProblemHandler> {
    constructor() {
        super(new ProblemHandler());
    }

    getReport = async (req: Request<unknown, unknown, unknown, IProblemReportQuery>, res: Response) => {
        try {

            if(!req.isAuthenticated){
                throw new UnauthorizedException("Anda tidak memiliki akses untuk melihat laporan masalah")
            }

            if(!checkAccess(req.role!!, LAPORAN_MASALAH, READ)){
                throw new UnauthorizedException("Anda tidak memiliki akses untuk melihat laporan masalah")
            }

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
            console.log(error)
            this.handleError(res,error);
        }
    }
}

export default new ProblemController()