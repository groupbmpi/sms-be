import { Request } from "express";
import { INewsParams } from "@types";

export interface IDeleteNewsRequest extends Request<INewsParams> {
    targetUserId?: number,
}