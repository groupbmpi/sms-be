import { BaseHandler } from "@handlers";
import { HttpException, InternalServerErrorException } from "@exceptions";
import { ResponseBuilder } from "@types";
import { Response } from "express";

abstract class BaseController<T extends BaseHandler> {
    protected handler: T;

    constructor(handler: T) {
        this.handler = handler;
    }

    protected handleError(res: Response, error: any){
        if(error instanceof HttpException){
            res.status(error.getStatusCode()).json(
                ResponseBuilder.error(
                    null,
                    error.getMessage(),
                    error.getStatusCode()
                )
            )
        }else{
            res.status(InternalServerErrorException.STATUS_CODE).json(
                ResponseBuilder.error(
                    null,
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE
                )
            )
        }
    }
}

export default BaseController;