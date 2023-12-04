import { Lembaga, User } from "@prisma/client";
import { IRegisterUserBody,IVerifyUserBody, LEMBAGA_OTHERS } from "@types";
import { BaseHandler } from "@handlers";
import { IPagination, IUnverifiedUserData } from "@types";
import { countSkipped } from "@utils";

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

    public async verifyUser(
        body: IVerifyUserBody
    ): Promise<User>{
        const newUser : User = await this.prisma.user.update({
            where: {
                id : body.userID
            },
            data: {
                is_verified: true,
                is_accepted: body.statusAcc,
            },
        });

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