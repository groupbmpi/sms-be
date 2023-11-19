import { Request, Response } from "express";
import { ResponseBuilder } from "@types";
import { HttpException, InternalServerErrorException } from "@exceptions";
import { ProblemHandler } from "@handlers";

class ProblemController {
    private problemHandler: ProblemHandler

    constructor() {
        this.problemHandler = new ProblemHandler()
    }

    getAll = async (req: Request, res: Response) => {
        try {

            const problems = await this.problemHandler.getAll();

            res.status(200).json(
                ResponseBuilder.success(
                    problems,
                    "Get problems successfully"
                )
            )

        } catch (error: any) {
            console.log(error)

            if(error instanceof HttpException) {
                res.status(error.getStatusCode()).json(
                    ResponseBuilder.error(
                        null,
                        error.getMessage(),
                        error.getStatusCode()
                    )
                );

                return;
            }

            res.status(500).json(
                ResponseBuilder.error(
                    null,
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE
                )
            )
        }
    }

    getByCreatorId = async (req: Request, res: Response) => {
        try { 
            const creatorId = parseInt(req.params.creatorId)

            const problems = await this.problemHandler.getByCreatorId(creatorId);

            res.status(200).json(
                ResponseBuilder.success(
                    problems,
                    "Get problems successfully"
                )
            )
        } catch (error: any) {
            console.log(error)

            if(error instanceof HttpException) {
                res.status(error.getStatusCode()).json(
                    ResponseBuilder.error(
                        null,
                        error.getMessage(),
                        error.getStatusCode()
                    )
                );

                return;
            }

            res.status(500).json(
                ResponseBuilder.error(
                    null,
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE
                )
            )
        }
    }

    

	create = async (req: Request, res: Response) => {
        try {
            const { description, category, creatorId } = req.body

            const problem = await this.problemHandler.create(description, category, creatorId)

            res.status(201).json(
                ResponseBuilder.success(
                    problem,
                    "Create report successfully",
                    201
                )
            )

        } catch (error: any) {
            console.log(error)

            if(error instanceof HttpException) {
                res.status(error.getStatusCode()).json(
                    ResponseBuilder.error(
                        null,
                        error.getMessage(),
                        error.getStatusCode()
                    )
                );

                return;
            }

            res.status(500).json(
                ResponseBuilder.error(
                    null,
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE
                )
            )
        }
    }
}

export default new ProblemController()