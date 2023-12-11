import BaseController from "./baseController";
import { BadRequestException, HttpException, InternalServerErrorException, UnauthorizedException } from "@exceptions";
import { UserHandler } from "@handlers";
import { User } from "@prisma/client";
import { IActivateUserBody, ILoginUserBody, IPagination, IRegisterAdminBody, IRegisterUserBody, IUpdateUnverifiedUserBody, IUserBody, IUserDTO, IUserRoleDTO, IVerifyUserBody, ResponseBuilder } from "@types";
import bcrypt from "bcrypt";
import { ID_ROLE_USER } from "@constant";
import { Request, Response } from "express";
import { checkSuffixBcfEmail } from "@utils";

class UserController extends BaseController<UserHandler> {
    constructor() {
        super(new UserHandler());
    }

    public updateUser = async (req: Request<unknown, unknown, IUserBody, unknown>, res: Response) =>{
        try {
            const body : IUserBody = req.body

            if(!req.isAuthenticated){
                throw new UnauthorizedException()
            }

            const user_id: number = req.userID as number

            const updatedUser: User = await this.handler.updateUser(
                body,
                user_id
            )

            res.status(200).json(
                ResponseBuilder.success<User>(
                    updatedUser,
                    "",
                    200
                )
            )
        } catch (error: any) {
            console.error(error)

            res.status(InternalServerErrorException.STATUS_CODE).json(
                ResponseBuilder.error<User>(
                    null,
                    InternalServerErrorException.MESSAGE,
                    InternalServerErrorException.STATUS_CODE,    
                )
            )
        }
    }
    public registerUser = async (req: Request, res: Response) => {
        try{
            const body : IRegisterUserBody = {
                alamat : req.body.alamat,
                email : req.body.email,
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
            const roleID : number = ID_ROLE_USER;
        
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

    public updateUnverifiedUser = async (req: Request<{
        id: number,
    },unknown>, res: Response) => {
        try{
            const body : IUpdateUnverifiedUserBody = {
                alamat : req.body.alamat,
                namaLengkap : req.body.namaLengkap,
                noHandphone : req.body.noHandphone,
                kecamatan: req.body.kecamatan,
                kelurahan: req.body.kelurahan,
                kodePos: req.body.kodePos,
                kategori : req.body.kategori,
            }
            const lembagaName : string = req.body.lembagaName;
            const lembagaOthers : string | null = req.body.lembagaOthers;
            const kabupatenKota : string = req.body.kabupatenKota;
            const provinsi : string = req.body.provinsi;
        
            const newUser : User | null = await this.handler.updateUserById(body,lembagaName,lembagaOthers,kabupatenKota,provinsi,req.params.id);

            if(!newUser){
                throw new BadRequestException("User not found");
            }

            res.status(200).json(
                ResponseBuilder.success(
                    null,
                    "Update user successfully",
                    200
                )
            )
        }catch(error : any){
            console.error(error)

            res.status(error.getStatusCode()).json(
                ResponseBuilder.error(
                    null,
                    error.getMessage(),
                    error.getStatusCode()
                )
            )
        }
    }

    public verifyUser = async (req: Request, res: Response) => {
        try{
            const body : IVerifyUserBody = req.body;
        
            const newUser : User | null = await this.handler.verifyUser(body);

            if(!newUser){
                res.status(400).json(
                    ResponseBuilder.error(
                        null,
                        "User not found",
                        BadRequestException.STATUS_CODE
                    )
                );
                return;
            }

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
                res.status(200).json(
                    ResponseBuilder.success<string>(
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

    public getRoleUser = async (req: Request<unknown>, res: Response) => {
        try{
            if(!req.isAuthenticated){
                res.status(400).json(
                    ResponseBuilder.error(
                        null,
                        "User not authenticated",
                        BadRequestException.STATUS_CODE
                    )
                );
                return;
            }

            const userID : number = req.userID as number;

            const roleUser : IUserRoleDTO | null = await this.handler.getUserRole(userID);

            if(!roleUser){
                res.status(400).json(
                    ResponseBuilder.error(
                        null,
                        "User not found",
                        BadRequestException.STATUS_CODE
                    )
                );
                return;
            }

            res.status(200).json(
                ResponseBuilder.success<IUserRoleDTO>(
                    roleUser,
                    "Get role user successfully",
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

    public getUser = async (req: Request<unknown>, res: Response) => {
        try{
            const userID : number = req.userID as number;


            const user : IUserDTO | null = await this.handler.getUser(userID);


            if(!user){
                throw new UnauthorizedException("Anda tidak memiliki akses untuk melihat data ini");
            }

            res.status(200).json(
                ResponseBuilder.success<IUserDTO>(
                    user,
                    "Get user successfully",
                    200
                )
            )
        }catch(error : any){
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

    public getUserById = async (req: Request<{
        id: number,
    },unknown,unknown, unknown>, res: Response) => {
        try{
            const userID : number = req.params.id;


            const user : IUserDTO | null = await this.handler.getUser(userID);


            if(!user){
                throw new BadRequestException("User tidak ditemukan");
            }

            res.status(200).json(
                ResponseBuilder.success<IUserDTO>(
                    user,
                    "Get user successfully",
                    200
                )
            )
        }catch(error : any){
            console.error(error)

            if(error instanceof HttpException){
                res.status(error.getStatusCode()).json(
                    ResponseBuilder.error(
                        null,
                        error.getMessage(),
                        error.getStatusCode()
                    )
                )
            }else{
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

    public registerAdmin = async (req: Request<unknown>, res: Response) =>{
        try{
            const body : IRegisterAdminBody = req.body;

            if (!checkSuffixBcfEmail(body.email)) {
                throw new BadRequestException("Email harus menggunakan domain bcf.or.id");
            }

            const admin = await this.handler.addAdmin(body.email);

            res.status(201).json(
                ResponseBuilder.success<IUserDTO>(
                    admin,
                    "Admin successfully created",
                    201
                )
            )
        }catch(error : any){
            console.error(error)

            if(error instanceof HttpException){
                res.status(error.getStatusCode()).json(
                    ResponseBuilder.error(
                        null,
                        error.getMessage(),
                        error.getStatusCode()
                    )
                )
            }else{
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
}

export default new UserController();
