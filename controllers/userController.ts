import { Request, Response } from "express";
import { IPagination, IRegisterUserBody, IUnverifiedUserData, IVerifyUserBody, ResponseBuilder } from "@types";
import { InternalServerErrorException, HttpException } from "@exceptions";
import { UserHandler } from "@handlers";
import { BaseController } from "@controllers";

class UserController extends BaseController<UserHandler> {
    constructor() {
        super(new UserHandler());
    }

    edit = async (req: Request, res: Response) => {
        try {
            const { id, name, address, institutionId } = req.body

            const user = await this.handler.edit(id, name, address, institutionId)

            res.status(200).json(
                ResponseBuilder.success(
                    user,
                    "Edit user successfully",
                    200
                )
            )
        } catch (error: any) {
            console.log(error)

            if(error instanceof HttpException) {
                res.status(error.getStatusCode()).json(
                    ResponseBuilder.error(
                        null,
                        error.getMessage(),
                        error.getStatusCode()
                    )
                );

                return;
            }
        }
    }
    public registerUser = async (req: Request, res: Response) => {
        try{
            const body : IRegisterUserBody = {
                alamat : req.body.alamat,
                email : req.body.email,
                linkFoto : req.body.linkFoto,
                namaLengkap : req.body.namaLengkap,
                noHandphone : req.body.noHandphone,
                is_accepted : false,
                is_verified : false,
            }
            const lembagaID : number = req.body.lembagaID;
            const roleID : number = 1;
        
            // TODO: add role user to database
            await this.handler.addUser(body, lembagaID,roleID )


            res.status(201).json(
                ResponseBuilder.success(
                    null,
                    "Register user successfully",
                    201
                )
            )
        }catch(error){
            console.error(error)

            res.status(500).json(
                ResponseBuilder.error(
                    null,
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE
                )
            )
        }
    }

    public getUnverifiedUser = async (req: Request, res: Response) => {
        try{
            const pagination : IPagination = req.query
        
            // TODO: add role user to database
            const listUnverifiedUser : IUnverifiedUserData[] = await this.handler.getUnverifiedUser(pagination);


            res.status(201).json(
                ResponseBuilder.success(
                    listUnverifiedUser,
                    "Register user successfully",
                    201
                )
            )
        }catch(error){
            console.error(error)

            res.status(500).json(
                ResponseBuilder.error(
                    null,
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE
                )
            )
        }
    }

    public verifyUser = async (req: Request, res: Response) => {
        try{
            const body : IVerifyUserBody = req.body
        
            await this.handler.verifyUser(body)


            res.status(200).json(
                ResponseBuilder.success(
                    null,
                    "Verify user successfully",
                    200
                )
            )
        }catch(error){
            console.error(error)

            res.status(500).json(
                ResponseBuilder.error(
                    null,
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE
                )
            )
        }
    }
}

export default new UserController();
