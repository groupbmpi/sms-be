import { NextFunction, Request, Response } from "express";
import { ResponseBuilder } from "@types";
import { BadRequestException, HttpException, InternalServerErrorException } from "@exceptions";

export const updateNewsRequestMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, detail, photoLink } = req.body;

        if (title === undefined && detail === undefined && photoLink === undefined) {
            throw new BadRequestException('title, detail, or photoLink field must be present');
        }

        if (title !== undefined && typeof title !== 'string') {
            throw new BadRequestException('title data type must be a string');
        }

        if (detail !== undefined && typeof detail !== 'string') {
            throw new BadRequestException('detail data type must be a string');
        }

        if (photoLink !== undefined && typeof photoLink !== 'string') {
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