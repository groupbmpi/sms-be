import { BadRequestException } from "@exceptions";
import { BaseHandler } from "./baseHandler";
import { KabupatenKota, LaporanMasalah, Provinsi, User } from "@prisma/client";
import { IPagination, IProblemDTO, IProblemReportBody, IProblemReportQuery, IProblemsDTO } from "@types";
import { countSkipped, checkValidKategoriMasalah } from "@utils";

export class ProblemHandler extends BaseHandler{
    private dtoToData(dto : IProblemDTO, userId: number, kabupatenKota_id: number) : Omit<LaporanMasalah, 'id' | 'createdAt' | 'updatedAt'> | string{
        const {kabupatenKota, provinsi, ...tempDto} = dto;

        if(userId === -1){
            return {
                ...tempDto,
                user_id: null,
                kabupatenKota_id: kabupatenKota_id,
            }
        }

        return {
            ...tempDto,
            user_id: userId,
            kabupatenKota_id: kabupatenKota_id,
        }
    }

    private dataToDTO(data : LaporanMasalah, provinsi: string, kabupatenKota: string, namaUser: string) : IProblemDTO {
        return {
            ...data,
            provinsi: provinsi,
            kabupatenKota: kabupatenKota,
            namaUser: namaUser,
        }
    }


    public async getReport(
        query : Omit<IProblemReportQuery, "limit" | "page">,
        pagination : IPagination,
    ): Promise<IProblemsDTO> {
        const skipped = countSkipped(pagination.page!!, pagination.limit!!)

        if(!query.user_id){
            delete query.user_id
        }

        if(pagination.limit){
            pagination.limit = parseInt(pagination.limit.toString())
        }

        const problemReports = await this.prisma.laporanMasalah.findMany({
            select: {
                id: true,
                masalah: true,
                kategoriMasalah: true,
                kabupatenKota: {
                    select: {
                        nama: true,
                        provinsi: {
                            select: {
                                nama: true,
                            }
                        }
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
                provinsi: data.kabupatenKota.provinsi.nama,
                kabupatenKota: data.kabupatenKota.nama,
                namaUser: data.user? data.user.namaLengkap : 'Anonimus',
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            })
        }

        const count = await this.prisma.laporanMasalah.count({
            where: query,
        })


        return {
            data: problemReportParsed,
            countPages: Math.ceil(count / pagination.limit!!),
        }
    }

    public async createReport(
        body: IProblemReportBody,
        userId: number,    
    ) : Promise<IProblemDTO>{
        if(!checkValidKategoriMasalah(body.kategoriMasalah)){
            throw new BadRequestException(`Bidang kegiatan ${body.kategoriMasalah} tidak valid`)
        }

        if(!body.masalah){
            throw new BadRequestException('Masalah tidak boleh kosong')
        }

        const kabupatenKota : Pick<KabupatenKota, 'id'> | null = await this.prisma.kabupatenKota.findFirst({
            where: {
                nama: body.kabupatenKota,
                provinsi: {
                    nama: body.provinsi,
                }
            },
            select:{
                id: true,
            }
        })

        if(kabupatenKota === null){
            throw new BadRequestException(`Provinsi ${body.provinsi} tidak ditemukan`)
        }

        let user: Pick<User, 'namaLengkap'> | null = {
            namaLengkap: 'Anonimus',
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


        const data = this.dtoToData(body, userId, kabupatenKota.id)

        if(typeof data === 'string'){
            throw new BadRequestException(data)
        }

        const newLaporanMasalah : LaporanMasalah = await this.prisma.laporanMasalah.create({
            data: data,
        })

        return this.dataToDTO(newLaporanMasalah, body.provinsi, body.kabupatenKota, user.namaLengkap)

    }


}
