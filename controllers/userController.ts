import BaseController from "./baseController";
import { BadRequestException, UnauthorizedException } from "@exceptions";
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
            this.handleError(res, error)
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
            this.handleError(res,error);

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
            this.handleError(res,error);

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
            this.handleError(res,error);

        }
    }

    public verifyUser = async (req: Request, res: Response) => {
        try{
            const body : IVerifyUserBody = req.body;
        
            const newUser : User | null = await this.handler.verifyUser(body);

            if(!newUser){
                throw new BadRequestException("User not found");
            }

            res.status(200).json(
                ResponseBuilder.success(
                    null,
                    "Verify user successfully",
                    200
                )
            )
        }catch(error){
            this.handleError(res,error);

        }
    }

    public loginUser = async (req: Request, res: Response) => {
        try{
            const body : ILoginUserBody = req.body;
            
            const token = await this.handler.login(body);

            if(token == ""){
                throw new BadRequestException("Login fail");
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
            this.handleError(res,error);

        }
    }

    public getRoleUser = async (req: Request<unknown>, res: Response) => {
        try{
            if(!req.isAuthenticated){
                throw new BadRequestException("User not authenticated")
            }

            const userID : number = req.userID as number;

            const roleUser : IUserRoleDTO | null = await this.handler.getUserRole(userID);

            if(!roleUser){
                throw new BadRequestException("User not found")
            }

            res.status(200).json(
                ResponseBuilder.success<IUserRoleDTO>(
                    roleUser,
                    "Get role user successfully",
                    200
                )
            )
        }catch(error){
            this.handleError(res,error);

        }
    }

    public activateUser = async (req: Request, res: Response) => {
        try{
            const body : IActivateUserBody = req.body;
            const user : User | null = await this.handler.getUserByEmail(body.email);

            if(!user){
                throw new BadRequestException("User not found")
            }

            
            if(!user.is_verified){
                throw new BadRequestException("User is not verified yet")
            }

            if(!user.is_accepted){
                throw new BadRequestException("User is not accepted")
            }

            if(user.is_activated){
                throw new BadRequestException("User already activated")
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
                throw new BadRequestException("Password or otp is incorrect")
            }


        }catch(error){
            this.handleError(res,error);
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
            this.handleError(res,error);
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
            this.handleError(res,error);
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
            this.handleError(res,error);
        }
    }
}

export default new UserController();
