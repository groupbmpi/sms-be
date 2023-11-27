import { User } from "@prisma/client";
import { IRegisterUserBody,IVerifyUserBody } from "@types";
import { BaseHandler } from "@handlers";
import { IPagination, IUnverifiedUserData } from "@types";
import { countSkipped } from "@utils";

export class UserHandler extends BaseHandler{

    public async addUser(
        body: IRegisterUserBody,
        lembagaID : number,
        roleID : number,
    ): Promise<User>{
        const newUser : User = await this.prisma.user.create({
            data: {
                ...body,
                lembaga: {
                    connect: {
                        id: lembagaID,
                    }
                },
                role : {
                    connect : {
                        id : roleID,
                    }
                }
            },
        });
        return newUser;
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