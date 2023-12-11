import { HttpException, InternalServerErrorException, NotFoundException } from "@exceptions";
import { ResponseBuilder } from "@types";
import { NextFunction, Request, Response } from "express";

export function paramNewsRequestMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const { newsId } = req.params;
        
        if (Number.isNaN(newsId)) {
            throw new NotFoundException();
        }

        if (Number.isInteger(parseFloat(newsId)) === false) {
            throw new NotFoundException();
        }

        return next();
    } catch (error: any) {
        console.error(error);

        if (error instanceof HttpException) {
            res.status(error.getStatusCode()).json(
                ResponseBuilder.error(
                    null, 
                    error.getMessage(), 
                    error.getStatusCode()
                )
            );

            return;
        }

        res.status(InternalServerErrorException.STATUS_CODE).json(
            ResponseBuilder.error(
                null, 
                InternalServerErrorException.MESSAGE,
                InternalServerErrorException.STATUS_CODE
            )
        );
    }
}