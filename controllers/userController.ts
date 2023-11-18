import { Request, Response } from "express";
import { ResponseBuilder } from "../types/response";
import { InternalServerErrorException } from "../exceptions";
import HttpException from "../exceptions/httpException";
import { UserHandler } from "../handlers";

class ProblemController {
    private userHandler: UserHandler

    constructor() {
        this.userHandler = new UserHandler()
    }

    edit = async (req: Request, res: Response) => {
        try {
            const { id, name, address, institutionId } = req.body

            const user = await this.userHandler.edit(id, name, address, institutionId)

            res.status(200).json(
                ResponseBuilder.success(
                    user,
                    "Edit user successfully",
                    200
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
                )
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