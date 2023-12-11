import { BadRequestException } from "exceptions";
import { NextFunction, Request, Response } from "express";
import { ResponseBuilder } from "types/response/builder";
import * as jwt from "../../utils/jwt"
import { convertAccessToMap } from "utils";

export const AuthMiddleware = (req: Request<{id: number}>, res: Response,next :  NextFunction) => {
    const token = req.headers.authorization;

    if(token == undefined){
        req.isAuthenticated = false;
    }else{

        try{
            const { id,role } = jwt.verify(token) as { id: number,role : string };

            req.userID = id;
            req.role = convertAccessToMap(role);
            req.isAuthenticated = true;
        }catch(error){
            console.log(error);
            req.isAuthenticated = false;
        }
    }

    next();
}