import { LembagaHandler } from "@handlers";
import BaseController from "./baseController";
import { ILembagaBody, ILembagaDTO, ILembagaData, ILembagaQuery, ILembagasDTO, ILembagasData, ResponseBuilder } from "@types";
import { UnauthorizedException } from "@exceptions";
import { checkAccess } from "@utils";
import { LEMBAGA, UPDATE, WRITE } from "@constant";
import { Request, Response } from "express";

class LembagaController extends BaseController<LembagaHandler>{
    constructor(){
        super(new LembagaHandler())
    }

    public getLembaga = async (req: Request<unknown, unknown, unknown, ILembagaQuery>, res: Response)=>{
        try{
            if(!req.isAuthenticated || req.role === undefined){
                throw new UnauthorizedException()
            }

            if(!checkAccess(req.role, LEMBAGA, WRITE)){
                throw new UnauthorizedException()
            }

            const { limit, page, ...query } = req.query

            const lembaga : ILembagasDTO = await this.handler.getLembaga(
                query,
                { limit, page }
            )

            res.status(200).json(
                ResponseBuilder.success<ILembagasData>(
                    lembaga,
                    "",
                    200
                )
            )
        }catch(error: any){
            this.handleError(res, error);
        }
    }

    public createLembaga = async (req: Request<unknown, unknown, ILembagaBody>, res: Response)=>{
        try{
            if(!req.isAuthenticated || req.role === undefined){
                throw new UnauthorizedException()
            }

            if(!checkAccess(req.role, LEMBAGA, WRITE)){
                throw new UnauthorizedException()
            }

            const body : ILembagaBody = req.body
            
            const newLembaga : ILembagaDTO = await this.handler.createLembaga(body)

            res.status(201).json(
                ResponseBuilder.success<ILembagaData>(
                    newLembaga,
                    "",
                    201
                )
            )
        }catch(error: any){
            this.handleError(res, error);
        }
    }

    public updateLembaga = async (req: Request<{
        id: number,
    }, unknown, ILembagaBody>, res: Response)=>{
        try{  
            if(!req.isAuthenticated || req.role === undefined){
                throw new UnauthorizedException()
            }
            
            if(!checkAccess(req.role, LEMBAGA, UPDATE)){
                throw new UnauthorizedException()
            }
            
            const id : number = req.params.id
            const body : ILembagaBody = req.body

            const updatedLembaga : ILembagaDTO = await this.handler.updateLembaga(body, id)


            res.status(200).json(
                ResponseBuilder.success<ILembagaData>(
                    updatedLembaga,
                    "",
                    200
                )
            )
        }catch(error: any){
            this.handleError(res, error);
        }
    }
}

export default new LembagaController()