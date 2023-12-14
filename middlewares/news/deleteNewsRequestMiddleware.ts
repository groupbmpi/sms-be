import { BadRequestException, HttpException, InternalServerErrorException, NotFoundException } from "@exceptions";
import { IDeleteNewsRequest, ResponseBuilder } from "@types";
import { NextFunction, Response } from "express";

export function deleteNewsRequestMiddleware(req: IDeleteNewsRequest, res: Response, next: NextFunction) {
    try {
        const { newsId } = req.params;

        const { creatorId } = req.query;

        const isSuperAdmin: boolean = Math.random() > 0.5;

        validateNewsId(newsId);

        // if (isSuperAdmin === false) {
        //     req.targetUserId = 1;

        //     return next();
        // }

        validateCreatorId(creatorId);

        req.targetUserId = parseInt(creatorId as string);

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

/** @throws BadRequestException */
function validateNewsId(newsId?: string): void {
    if (typeof newsId === 'number' && Number.isInteger(newsId)) {
        return;
    }

    if (typeof newsId !== 'string' || Number.isNaN(parseInt(newsId))) {
        throw new NotFoundException();
    }
}

/** @throws BadRequestException */
function validateCreatorId(creatorId: unknown): void {
    if (typeof creatorId === 'number' && Number.isInteger(creatorId)) {
        return;
    }

    if (typeof creatorId === 'undefined') {
        throw new BadRequestException('creatorId query param must be present');
    }

    if (typeof creatorId !== 'string' || Number.isNaN(parseInt(creatorId))) {
        throw new BadRequestException('creatorId query param data type must be an integer');
    }
}