import { User } from "@prisma/client";
import BaseHandler from "./baseHandler";

export class UserHandler extends BaseHandler{
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
