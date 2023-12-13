import { BadRequestException, HttpException, InternalServerErrorException } from "@exceptions";
import { ICreateNewsRequest, ResponseBuilder } from "@types";
import { NextFunction, Response } from "express";

export function createNewsRequestMiddleware(req: ICreateNewsRequest, res: Response, next: NextFunction) {
    try {
        const { title, detail, photoLink, creatorId } = req.body;
        
        const isSuperAdmin: boolean = Math.random() > 0.5;

        if (isSuperAdmin === false) {
            validateTitleField(title);
            validateDetailField(detail);
            validatePhotoLinkField(photoLink);

            req.targetUserId = 1;

            return next();
        }

        validateTitleField(title);
        validateDetailField(detail);
        validatePhotoLinkField(photoLink);
        validateCreatorIdField(creatorId);

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
function validateTitleField(title?: string): void {
    validateFieldNotUndefined('title', title);
    validateFieldString('title', title);
}

/** @throws BadRequestException */
function validateDetailField(detail?: string): void {
    validateFieldNotUndefined('detail', detail);
    validateFieldString('detail', detail);
}

/** @throws BadRequestException */
function validatePhotoLinkField(photoLink?: string): void {
    validateFieldNotUndefined('photoLink', photoLink);
    validateFieldString('photoLink', photoLink);
}

/** @throws BadRequestException */
function validateCreatorIdField(creatorId?: number): void {
    validateFieldNotUndefined('creatorId', creatorId);
    validateFieldNumber('creatorId', creatorId);
}


/** @throws BadRequestException */
function validateFieldNotUndefined(fieldName: string, field?: unknown): void {
    if (typeof field === 'undefined') {
        throw new BadRequestException(`${fieldName} field must be present`);
    }
}

/** @throws BadRequestException */
function validateFieldString(fieldName: string, field: unknown): void {
    if (typeof field !== 'string') {
        throw new BadRequestException(`${fieldName} data type must be a string`);
    }
}

/** @throws BadRequestException */
function validateFieldNumber(fieldName: string, field: unknown): void {
    if (typeof field !== 'number') {
        throw new BadRequestException(`${fieldName} data type must be an integer`);
    }

    if (Number.isInteger(field) === false) {
        throw new BadRequestException(`${fieldName} data type must be an integer`);
    }
}