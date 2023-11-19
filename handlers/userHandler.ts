import { User } from "@prisma/client";
import BaseHandler from "./baseHandler";

export class UserHandler extends BaseHandler{

    public async addUser(namaLengkap: string, alamat: string, email: string, noHandphone : string, lembagaID : number, linkFoto : string, roleID : number): Promise<void>{
        await this.prisma.user.create({
            data: {
                namaLengkap: namaLengkap,
                alamat: alamat,
                email: email,
                noHandphone: noHandphone,
                lembaga_id: lembagaID,
                linkFoto: linkFoto,
                role_id: roleID,
                is_verified : false,
                is_accepted: false,
            },
        });
    }

    public async verifyUser(userID: number,statusAcc : boolean): Promise<void>{
        await this.prisma.user.update({
            where: {
                id: userID,
            },
            data: {
                is_verified: true,
                is_accepted: statusAcc,
            },
        });
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