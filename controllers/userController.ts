import { Request, Response } from "express";
import { IActivateUserBody, ILoginUserBody, IPagination, IRegisterUserBody, IUnverifiedUserData, IUserDTO, IVerifyUserBody, ResponseBuilder } from "@types";
import { InternalServerErrorException, HttpException, BadRequestException } from "@exceptions";
import { UserHandler } from "@handlers";
import { BaseController } from "@controllers";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { ILoginResponse } from "@types";

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
                kecamatan: req.body.kecamatan,
                kelurahan: req.body.kelurahan,
                kodePos: req.body.kodePos,
                is_accepted : false,
                is_verified : false,
                kategori : req.body.kategori,
            }
            const lembagaName : string = req.body.lembagaName;
            const lembagaOthers : string | null = req.body.lembagaOthers;
            const kabupatenKota : string = req.body.kabupatenKota;
            const provinsi : string = req.body.provinsi;
            const roleID : number = 1;
        
            // TODO: add role user to database
            await this.handler.addUser(body,lembagaName,lembagaOthers,roleID,kabupatenKota,provinsi);


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
            const listUnverifiedUser : IUserDTO[] = await this.handler.getUnverifiedUser(pagination);


            res.status(200).json(
                ResponseBuilder.success(
                    {
                        user:listUnverifiedUser
                    },
                    "Get list user successfully",
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

    public loginUser = async (req: Request, res: Response) => {
        try{
            const body : ILoginUserBody = req.body;
            
            const token = await this.handler.login(body);

            if(token == ""){
                res.status(400).json(
                    ResponseBuilder.error(
                        null,
                        "Login fail",
                        BadRequestException.STATUS_CODE
                    )
                );
                return;
            }else{
                const response : ILoginResponse = {
                    token : token
                }
                res.status(200).json(
                    ResponseBuilder.success(
                        token,
                        "Login successful",
                        200
                    )
                )
            }
        }catch(error){
            console.log(error);

            res.status(500).json(
                ResponseBuilder.error(
                    null,
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE
                )
            );
        }
    }

    public activateUser = async (req: Request, res: Response) => {
        try{
            const body : IActivateUserBody = req.body;
            const user : User | null = await this.handler.getUserByEmail(body.email);

            if(!user){
                res.status(400).json(
                    ResponseBuilder.error(
                        null,
                        "User not found",
                        BadRequestException.STATUS_CODE
                    )
                );
                return;
            }

            
            if(!user.is_verified){
                res.status(400).json(
                    ResponseBuilder.error(
                        null,
                        "User is not verified yet",
                        BadRequestException.STATUS_CODE
                    )
                );
                return;
            }

            if(!user.is_accepted){
                res.status(400).json(
                    ResponseBuilder.error(
                        null,
                        "User is not accepted",
                        BadRequestException.STATUS_CODE
                    )
                );
                return;
            }

            if(user.is_activated){
                res.status(400).json(
                    ResponseBuilder.error(
                        null,
                        "User already activated",
                        BadRequestException.STATUS_CODE
                    )
                );
                return;
            }

            const isPassCorrect : boolean = await bcrypt.compare(body.password,user.password as string);
            const isOtpCorrect : boolean = await bcrypt.compare(body.otp, user.otp_token as string);

            if(isPassCorrect && isOtpCorrect){

                await this.handler.activateUser(user.id);
    
                res.status(200).json(
                    ResponseBuilder.success(
                        null,
                        "User is activated successfully",
                        200
                    )
                )
            }else{
                res.status(400).json(
                    ResponseBuilder.success(
                        null,
                        "Password or otp is incorrect",
                        BadRequestException.STATUS_CODE
                    )
                )
            }


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
