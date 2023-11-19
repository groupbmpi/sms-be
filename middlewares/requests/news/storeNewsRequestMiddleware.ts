import { NextFunction, Request, Response } from "express";
import { ResponseBuilder } from "../../../types";
import { BadRequestException, HttpException, InternalServerErrorException } from "../../../exceptions";

export const storeNewsRequestMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, detail, photoLink } = req.body;

        if (title === undefined) {
            throw new BadRequestException('title field must be present');
        }

        if (typeof title !== 'string') {
            throw new BadRequestException('title data type must be a string');
        }

        if (detail === undefined) {
            throw new BadRequestException('detail field must be present');
        }

        if (typeof detail !== 'string') {
            throw new BadRequestException('detail data type must be a string');
        }

        if (photoLink === undefined) {
            throw new BadRequestException('photoLink field must be present');
        }

        if (typeof photoLink !== 'string') {
            throw new BadRequestException('photoLink data type must be a string');
        }

        return next();
    } catch (error) {
        console.error(error);

        if (error instanceof HttpException) {
            res.status(error.getStatusCode()).json(
                ResponseBuilder.error(
                    null, 
                    error.getMessage(), 
                    error.getStatusCode()
                )
            );
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