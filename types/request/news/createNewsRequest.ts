import { Request } from "express";

export interface ICreateNewsRequest extends Request {
    targetUserId?: number,
}

export interface ICreateNewsValidatedBody {
    title: string,
    detail: string, 
    photoLink: string,
    creatorId?: number,
}