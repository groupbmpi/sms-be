import { NextFunction, Request, Response } from "express";
import { IUpdateNewsRequest, ResponseBuilder } from "@types";
import { BadRequestException, HttpException, InternalServerErrorException, NotFoundException } from "@exceptions";

export function updateNewsRequestMiddleware(req: IUpdateNewsRequest, res: Response, next: NextFunction) {
    try {
        const { newsId } = req.params;

        const { title, detail, photoLink, creatorId } = req.body;

        const isSuperAdmin: boolean = Math.random() > 0.5;

        validateNewsId(newsId);

        if (isSuperAdmin === false) {
            validateTitleDetailPhotoLinkNotUndefined(
                title,
                detail,
                photoLink
            );
            validateUndefinedOrString('title', title);
            validateUndefinedOrString('detail', detail);
            validateUndefinedOrString('photoLink', photoLink);

            req.targetUserId = 1;

            return next();
        }

        validateAllFieldsNotUndefined(
            title,
            detail,
            photoLink,
            creatorId
        );
        validateUndefinedOrString('title', title);
        validateUndefinedOrString('detail', detail);
        validateUndefinedOrString('photoLink', photoLink);
        validateNotUndefinedAndNumber('creatorId', creatorId);

        req.targetUserId = creatorId;

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
    if (typeof newsId !== 'string') {
        throw new NotFoundException();
    }

    if (Number.isNaN(newsId)) {
        throw new NotFoundException();
    }

    if (Number.isInteger(parseFloat(newsId)) === false) {
        throw new NotFoundException();
    }
}

/** @throws BadRequestException */
function validateAllFieldsNotUndefined(
    title?: string,
    detail?: string,
    photoLink?: string,
    creatorId?: number,
): void {
    if (
        typeof title === 'undefined' 
        && typeof detail === 'undefined' 
        && typeof photoLink === 'undefined' 
        && typeof creatorId === 'undefined'
    ) {
        throw new BadRequestException('title, detail, photoLink, or creatorId field must be present');
    }
}

/** @throws BadRequestException */
function validateTitleDetailPhotoLinkNotUndefined(
    title?: string,
    detail?: string,
    photoLink?: string,
): void {
    if (
        typeof title === 'undefined' 
        && typeof detail === 'undefined' 
        && typeof photoLink === 'undefined'
    ) {
        throw new BadRequestException('title, detail, or photoLink field must be present');
    }
}

/** @throws BadRequestException */
function validateUndefinedOrString(fieldName: string, field: unknown): void {
    if (typeof field === 'undefined') {
        return;
    }

    if (typeof field !== 'string') {
        throw new BadRequestException(`${fieldName} data type must be a string`);
    }
}

/** @throws BadRequestException */
function validateNotUndefinedAndNumber(fieldName: string, field: unknown): void {
    if (typeof field === 'undefined') {
        throw new BadRequestException(`${fieldName} field must be present`);
    }

    if (typeof field !== 'number') {
        throw new BadRequestException(`${fieldName} data type must be an integer`);
    }

    if (Number.isInteger(field) === false) {
        throw new BadRequestException(`${fieldName} data type must be an integer`);
    }
}