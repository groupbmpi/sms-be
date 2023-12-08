import { Lembaga, User } from "@prisma/client";
import { ILoginUserBody, IRegisterUserBody,IVerifyUserBody, LEMBAGA_OTHERS } from "@types";
import { BaseHandler } from "@handlers";
import { IPagination, IUnverifiedUserData } from "@types";
import { countSkipped } from "@utils";
import { generatePassword, generateRandomNumber } from "utils/user";
import { OTP_LENGTH, SALT_ROUND } from "constant";
import bcrypt from "bcrypt";
import * as jwt from "../utils/jwt";

export class UserHandler extends BaseHandler{

    public async addUser(
        body: IRegisterUserBody,
        lembagaName : string,
        lembagaOthers : string | null,
        roleID : number,
        kabupatenKotaID : number
    ): Promise<User>{
        if(lembagaName == LEMBAGA_OTHERS){
            const lembagaID = undefined;

            const newUser : User = await this.prisma.user.create({
                data: {
                    ...body,
                    lembagaOthers : lembagaOthers,
                    role : {
                        connect : {
                            id : roleID,
                        }
                    },
                    kabupatenKota : {
                        connect : {
                            id : kabupatenKotaID
                        }
                    }
                },
            });
            return newUser;
        }else{
            const lembagaUser : Lembaga = await this.prisma.lembaga.findFirstOrThrow({
                where : {
                    nama : lembagaName
                }
            })
            const lembagaID = lembagaUser.id;
            const newUser : User = await this.prisma.user.create({
                data: {
                    ...body,
                    lembagaOthers : lembagaOthers,
                    lembaga: {
                        connect: {
                            id: lembagaID,
                        }
                    },
                    role : {
                        connect : {
                            id : roleID,
                        }
                    },
                    kabupatenKota : {
                        connect : {
                            id : kabupatenKotaID
                        }
                    }
                },
            });
            return newUser;
        }

    }

    public async login(
        body : ILoginUserBody
    ) : Promise<string>{
        const user = await this.prisma.user.findFirst({
            where : {
                email : body.email
            },
            include : {
                role : true
            }
        })

        if(!user){
            return "";
        }

        if(!user.is_activated || !user.is_verified || !user.is_accepted){
            return "";
        }

        const isPassCorrect : boolean = await bcrypt.compare(body.password,user.password as string);

        if(isPassCorrect){
            const token = jwt.sign({
                id : user.id,
                role : user.role.akses
            });
            return token;
        }else{
            return "";
        }
    }

    public async verifyUser(
        body: IVerifyUserBody
    ): Promise<User>{

        let newUser : User;

        if(body.statusAcc){
            const pass : string = generatePassword();
            const otp : string = generateRandomNumber(OTP_LENGTH);

            const currentUser : User = await this.prisma.user.findFirstOrThrow({
                where : {
                    id : body.userID
                }
            });

            // create new lembaga
            if(currentUser.lembaga_id == null){
                const newLembaga : Lembaga = await this.prisma.lembaga.create({
                    data : {
                        nama : currentUser.lembagaOthers as string,
                        alamat : currentUser.alamat,
                        kategori : body.kategoriLembaga
                    }
                })
                currentUser.lembaga_id = newLembaga.id;
            }

            newUser = await this.prisma.user.update({
                where: {
                    id : body.userID
                },
                data: {
                    is_verified: true,
                    is_accepted: body.statusAcc,
                    password : await bcrypt.hash(pass,SALT_ROUND),
                    otp_token : await bcrypt.hash(otp, SALT_ROUND),
                    lembaga : {
                        connect : {
                            id : currentUser.lembaga_id
                        }
                    }
                },
            });
        }else{
            newUser = await this.prisma.user.update({
                where: {
                    id : body.userID
                },
                data: {
                    is_verified: true,
                    is_accepted: body.statusAcc,
                },
            });
        }

        return newUser;
    }

    public async getUnverifiedUser(
        pagination : IPagination
    ): Promise<IUnverifiedUserData[]>{
        const skipped = countSkipped(pagination.page!!, pagination.limit!!)

        const users : User[] = await this.prisma.user.findMany({
            where : {
                is_verified : false
            },
            take: pagination.limit,
            skip: skipped,
        })

        return users;
    }

    public async getUser(
        userID : number
    ) : Promise<User>{
        const user : User = await this.prisma.user.findFirstOrThrow({
            where : {
                id : userID
            }
        });
        return user;
    }

    public async getUserByEmail(
        email : string
    ) : Promise<User | null>{
        const user : User | null = await this.prisma.user.findFirst({
            where : {
                email : email
            }
        });

        return user;
    }

    public async activateUser(
        userID : number
    ) : Promise<void>{
        await this.prisma.user.update({
            where : {
                id : userID
            },
            data : {
                is_activated : true
            }
        })
    }

    public async edit(userId: number, name?: string, address?:string, institutionId?:number): Promise<User> {
        const payload: any = {}
        if (name) {
            payload.namaLengkap = name;
        }
        if (address) {
            payload.alamat = address;
        }
        if (institutionId) {
            payload.lembaga = {
                connect: {
                    id: institutionId,
                }
            }
        }

        return await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                ...payload,
            }
        });
    }
}