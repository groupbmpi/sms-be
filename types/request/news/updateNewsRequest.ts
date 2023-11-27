import { Request } from "express";
import { INewsParams } from "@types";

export interface IUpdateNewsRequest extends Request<INewsParams> {
    targetUserId?: number,
}

export interface IUpdateNewsValidatedBody {
    title?: string,
    detail?: string, 
    photoLink?: string,
    creatorId?: number,
}