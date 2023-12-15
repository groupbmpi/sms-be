import { NextFunction, Request, Response } from "express";
import { convertAccessToMap, verify } from "@utils";

export const AuthMiddleware = (req: Request<{id: number}>, res: Response,next :  NextFunction) => {
    const token = req.headers.authorization;

    req.params.id = Number(req.params.id);

    if(token == undefined){
        req.isAuthenticated = false;
    }else{

        try{
            const { id,role } = verify(token) as { id: number,role : string };

            req.userID = id;
            req.role = convertAccessToMap(role);
            req.isAuthenticated = true;
        }catch(error){
            req.isAuthenticated = false;
        }
    }

    next();
}