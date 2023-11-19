import { Request, Response } from "express";
import { UserHandler } from "../handlers/userHandler"
import { ResponseBuilder } from "../types"
import { InternalServerErrorException } from "../exceptions";

class UserController {
    private userHandler: UserHandler

    constructor() {
        this.userHandler = new UserHandler()
    }

    public registerUser = async (req: Request, res: Response) => {
        try{
            const { namaLengkap, alamat, email, noHandphone, lembagaID, linkFoto } = req.body
        
            // TODO: add role user to database
            await this.userHandler.addUser(namaLengkap, alamat, email, noHandphone, lembagaID, linkFoto,1)


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

    public verifyUser = async (req: Request, res: Response) => {
        try{
            const {userID, statusAcc} = req.body
        
            await this.userHandler.verifyUser(userID, statusAcc)


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