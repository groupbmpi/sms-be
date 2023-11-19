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
} 