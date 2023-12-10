import { KategoriMasalah, LaporanMasalah, Provinsi, User } from "@prisma/client";
import { BaseHandler } from "@handlers";
import { IPagination, IProblemDTO, IProblemReportBody, IProblemReportQuery, IProblemsDTO } from "types";
import { countSkipped } from "@utils";
import { BadRequestException } from "exceptions";
import { checkValidKategoriMasalah } from "utils/checker";

export class ProblemHandler extends BaseHandler{
    private dtoToData(dto : IProblemDTO, userId: number, provinsiId: number) : Omit<LaporanMasalah, 'id' | 'createdAt' | 'updatedAt'> | string{
        const {provinsi, ...tempDto} = dto;

        if(userId === -1){
            return {
                ...tempDto,
                user_id: null,
                provinsi_id: provinsiId,
            }
        }

        return {
            ...tempDto,
            user_id: userId,
            provinsi_id: provinsiId,
        }
    }

    private dataToDTO(data : LaporanMasalah, provinsi: string, namaUser: string) : IProblemDTO {
        return {
            ...data,
            provinsi: provinsi,
            namaUser: namaUser,
        }
    }


    public async getReport(
        query : Omit<IProblemReportQuery, "limit" | "page">,
        pagination : IPagination,
    ): Promise<IProblemsDTO> {
        const skipped = countSkipped(pagination.page!!, pagination.limit!!)

        const problemReports = await this.prisma.laporanMasalah.findMany({
            select: {
                id: true,
                masalah: true,
                kategoriMasalah: true,
                provinsi: {
                    select: {
                        nama: true,
                    }
                },
                user: {
                    select: {
                        id: true,
                        namaLengkap: true,
                        email: true,
                    }
                },
                createdAt: true,
                updatedAt: true,
            },
            where: query,
            take: pagination.limit,
            skip: skipped,
            orderBy: {
                createdAt: 'desc',
            }
        })

        const problemReportParsed : IProblemDTO[] = []

        for(const data of problemReports){
            problemReportParsed.push({
                id: data.id,
                masalah: data.masalah,
                kategoriMasalah: data.kategoriMasalah,
                provinsi: data.provinsi.nama,
                namaUser: data.user? data.user.namaLengkap : 'anonymous',
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            })
        }

        return {
            data: problemReportParsed,
            countPages: Math.ceil(problemReportParsed.length / pagination.limit!!),
        }
    }

    public async createReport(
        body: IProblemReportBody,
        userId: number,    
    ) : Promise<IProblemDTO>{
        if(!checkValidKategoriMasalah(body.kategoriMasalah)){
            throw new BadRequestException(`Bidang kegiatan ${body.kategoriMasalah} tidak valid`)
        }

        const provinsi : Pick<Provinsi, 'id'> | null = await this.prisma.provinsi.findFirst({
            where: {
                nama: body.provinsi,
            },
            select:{
                id: true,
            }
        })

        if(provinsi === null){
            throw new BadRequestException(`Provinsi ${body.provinsi} tidak ditemukan`)
        }

        let user: Pick<User, 'namaLengkap'> | null = {
            namaLengkap: 'anonymous',
        }

        if(userId !== -1){
            user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                },
                select: {
                    namaLengkap: true,
                }
            })
        }

        if(user === null){
            throw new BadRequestException(`User dengan id ${userId} tidak ditemukan`)
        }


        const data = this.dtoToData(body, userId, provinsi.id)

        if(typeof data === 'string'){
            throw new BadRequestException(data)
        }

        const newLaporanMasalah : LaporanMasalah = await this.prisma.laporanMasalah.create({
            data: data,
        })

        return this.dataToDTO(newLaporanMasalah, body.provinsi, user.namaLengkap)

    }


}
