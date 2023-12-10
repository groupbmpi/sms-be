import { KabupatenKota, LaporanKegiatan, Provinsi } from "@prisma/client";
import { BaseHandler } from "@handlers";
import { IActivitiesDTO, IActivityDTO, IActivityReportBody, IActivityReportQuery, IIndikatorKeberhasilanDTO } from "@types";
import { IPagination } from "@types";
import { countSkipped, getDateFromString } from "@utils";
import { checkValidKategoriMasalah, checkValidMetodePelaksanaan, checkValidStatusKegiatan } from "utils/checker";
import { BadRequestException } from "exceptions";

export class ActivityHandler extends BaseHandler{

    private indikatorKeberhasilanToString(rawData: IIndikatorKeberhasilanDTO[]) : string {
        let result = ""

        for(const data of rawData){
            console.log(data.indicator)
            result = result.concat(`${data.indicator} : ${data.target}\n`)
        }
        console.log(result)
        return result
    }

    private stringToIndikatorKeberhasilan(rawData: string) : IIndikatorKeberhasilanDTO[] {
        const result : IIndikatorKeberhasilanDTO[] = []

        const splittedData = rawData.split("\n")

        for(const data of splittedData){
            const splittedData = data.split(" : ")

            result.push({
                indicator: splittedData[0],
                target: parseInt(splittedData[1]),
            })
        }

        return result
    }

    private dataToDTO(data : LaporanKegiatan, kabupatenKota : string, provinsi: string) : IActivityDTO{
        return {
            ...data,
            kabupatenKota: kabupatenKota,
            provinsi: provinsi,
            indikatorKeberhasilan: this.stringToIndikatorKeberhasilan(data.indikatorKeberhasilan),
        }
    }

    private dtoToData(dto : IActivityDTO, userId: number, kabupatenKotaId: number) : Omit<LaporanKegiatan, 'id' | 'createdAt' | 'updatedAt'> | string{
        const {provinsi, kabupatenKota, jadwalMulai, jadwalSelesai, ...tempDto} = dto;
        
        const jadwalMulaiConverted = getDateFromString(jadwalMulai)
        const jadwalSelesaiConverted = getDateFromString(jadwalSelesai)

        if(typeof jadwalMulaiConverted  === 'undefined' || typeof jadwalSelesaiConverted === 'undefined'){
            return "Format tanggal tidak valid"
        }

        return {
            ...tempDto,
            jadwalMulai: jadwalMulaiConverted,
            jadwalSelesai: jadwalSelesaiConverted,
            user_id: userId,
            kabupatenKota_id: kabupatenKotaId,
            indikatorKeberhasilan: this.indikatorKeberhasilanToString(dto.indikatorKeberhasilan),
        }
    }

    public async getReport(
        query : Omit<IActivityReportQuery, "limit" | "page">,
        pagination : IPagination,
    ): Promise<IActivitiesDTO>{
        const skipped = countSkipped(pagination.page!!, pagination.limit!!)

        const activityReport : LaporanKegiatan[] = await this.prisma.laporanKegiatan.findMany({
            where: query,
            take: pagination.limit,
            skip: skipped,
        })

        const activityReportParsed : IActivityDTO[] = []

        for(const data of activityReport){
            const kabupatenKota : Pick<KabupatenKota, 'nama' | 'provinsi_id'> | null = await this.prisma.kabupatenKota.findUnique({
                where: {
                    id: data.kabupatenKota_id,
                },
                select: {
                    nama: true,
                    provinsi_id: true,
                }
            })

            if(kabupatenKota === null){
                throw new BadRequestException(`Kabupaten/Kota dengan id ${data.kabupatenKota_id} tidak ditemukan`)
            }

            const provinsi : Pick<Provinsi, 'nama'> | null = await this.prisma.provinsi.findUnique({
                where: {
                    id: kabupatenKota.provinsi_id,
                },
                select: {
                    nama: true,
                }
            })

            if(provinsi === null){
                throw new BadRequestException(`Provinsi dengan id ${kabupatenKota.provinsi_id} tidak ditemukan`)
            }

            activityReportParsed.push(this.dataToDTO(data, kabupatenKota.nama, provinsi.nama))
        }

        const totalData : number = await this.prisma.laporanKegiatan.count()

        return {
            data: activityReportParsed,
            countPages: Math.ceil(totalData / pagination.limit!!),
        }
    }

    public async createReport(
        body: IActivityReportBody,
        userId: number,    
    ) : Promise<IActivityDTO>{

        if(!checkValidStatusKegiatan(body.statusKegiatan)){
            throw new BadRequestException(`Status kegiatan ${body.statusKegiatan} tidak valid`)
        }

        if(!checkValidMetodePelaksanaan(body.metodePelaksanaan)){
            throw new BadRequestException(`Metode pelaksanaan ${body.metodePelaksanaan} tidak valid`)
        }

        if(!checkValidKategoriMasalah(body.bidangKegiatan)){
            throw new BadRequestException(`Bidang kegiatan ${body.bidangKegiatan} tidak valid`)
        }

        const kabupatenKota : Pick<KabupatenKota, 'id'> | null = await this.prisma.kabupatenKota.findFirst({
            where: {
                provinsi: {
                    is:{
                        nama: body.provinsi,
                    }
                },
                nama: body.kabupatenKota,
            },
            select:{
                id: true,
            }
        })

        if(kabupatenKota === null){
            throw new BadRequestException(`Kabupaten/Kota ${body.kabupatenKota} tidak ditemukan`)
        }

        const data = this.dtoToData(body, userId, kabupatenKota.id)

        if(typeof data === 'string'){
            throw new BadRequestException(data)
        }

        const newLaporanKegiatan : LaporanKegiatan = await this.prisma.laporanKegiatan.create({
            data: data,
        })

        return this.dataToDTO(newLaporanKegiatan, body.kabupatenKota, body.provinsi)
    }

    public async updateReport(
        body: IActivityReportBody,
        userId: number,
        id: number,
    ) : Promise<IActivityDTO>{
        if(!checkValidStatusKegiatan(body.statusKegiatan)){
            throw new BadRequestException(`Status kegiatan ${body.statusKegiatan} tidak valid`)
        }

        if(!checkValidMetodePelaksanaan(body.metodePelaksanaan)){
            throw new BadRequestException(`Metode pelaksanaan ${body.metodePelaksanaan} tidak valid`)
        }

        const kabupatenKota : Pick<KabupatenKota, 'id'> | null = await this.prisma.kabupatenKota.findFirst({
            where: {
                provinsi: {
                    is:{
                        nama: body.provinsi,
                    }
                },
                nama: body.kabupatenKota,
            },
            select:{
                id: true,
            }
        })

        if(kabupatenKota === null){
            throw new BadRequestException(`Kabupaten/Kota ${body.kabupatenKota} tidak ditemukan`)
        }

        const data = this.dtoToData(body, userId, kabupatenKota.id)

        if(typeof data === 'string'){
            throw new BadRequestException(data)
        }

        console.log(body.indikatorKeberhasilan)

        const updatedLaporanKegiatan : LaporanKegiatan = await this.prisma.laporanKegiatan.update({
            where: {
                id: id,
            },
            data: data,
        })

        return this.dataToDTO(updatedLaporanKegiatan, body.kabupatenKota, body.provinsi)
    }

    public async deleteReport(id : number) : Promise<boolean>{
        const deletedLaporanKegiatan : LaporanKegiatan | null = await this.prisma.laporanKegiatan.delete({  
            where: {
                id: id,
            }
        })

        return deletedLaporanKegiatan !== null
    }
}