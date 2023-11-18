import { KategoriMasalah, LaporanMasalah } from "@prisma/client";
import BaseHandler from "./baseHandler";

export class ProblemHandler extends BaseHandler{
    public async getAllProblems(sortBy?: string): Promise<{
        id: number,
        problem: string,
        category: KategoriMasalah,
        user: {
            id: number,
            name: string,
            email?: string,
        }
    }[]> {
        const reports = await this.prisma.laporanMasalah.findMany({
            select: {
                id: true,
                masalah: true,
                kategoriMasalah: true,
                user: {
                    select: {
                        id: true,
                        namaLengkap: true,
                        email: true,
                    }
                }
            },
        });


        return reports.map(function (value) {
            return {
                id: value.id,
                problem: value.masalah,
                category: value.kategoriMasalah,
                user: {
                    id: value.user? value.user.id : -1,
                    name: value.user? value.user.namaLengkap : 'anonymous',
                    email: value.user? value.user.email : undefined,
                }
            };
        });
    }

    public async createProblem(
        problem: string,
        category: KategoriMasalah,
        creatorId: number
    ): Promise<LaporanMasalah> {

        if(creatorId === -1) {
            return await this.prisma.laporanMasalah.create({
                data: {
                    masalah: problem,
                    kategoriMasalah: category,
                }
            });
        } else {
            return await this.prisma.laporanMasalah.create({
                data: {
                    masalah: problem,
                    kategoriMasalah: category,
                    user: {
                        connect: {
                            id: creatorId,
                        }
                    }
                }
            });
        }
    }


}
