import { BadRequestException } from "exceptions";
import { NextFunction, Request, Response } from "express";
import { ResponseBuilder } from "types/response/builder";
import * as jwt from "../../utils/jwt"
import { convertAccessToMap } from "utils";

export const AuthMiddleware = (req: Request, res: Response,next :  NextFunction) => {
    const token = req.headers.authorization;

    console

    if(token == undefined){
        res.status(401).json(
            ResponseBuilder.error(
                null,
                "User is not authenticated",
                401
            )
        );
        return;
    }

    const { id,role } = jwt.verify(token) as { id: number,role : string };

    req.userID = id;
    req.role = convertAccessToMap(role);

    next();
}