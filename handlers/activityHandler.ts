import { LaporanKegiatan } from "@prisma/client";
import BaseHandler from "./baseHandler";
import { IActivityReportBody, IActivityReportQuery } from "types/request/activityReport";
import { IPagination } from "types/request";
import { countSkipped } from "utils";
import { IActivityReportData } from "types/response/activityReport";

export class ActivityHandler extends BaseHandler{

    public async getReport(
        query : Omit<IActivityReportQuery, "limit" | "offset">,
        pagination : IPagination,
    ): Promise<IActivityReportData[]>{
        const skipped = countSkipped(pagination.page!!, pagination.limit!!)

        const activityReport : LaporanKegiatan[] = await this.prisma.laporanKegiatan.findMany({
            where: query,
            take: pagination.limit,
            skip: skipped,
        })

        return activityReport
    }

    public async createReport(
        body: IActivityReportBody,
        userId: number,    
    ) : Promise<LaporanKegiatan>{
        const newLaporanKegiatan : LaporanKegiatan = await this.prisma.laporanKegiatan.create({
            data:{
                ...body,
                user: {
                    connect: {
                        id: userId,
                    }
                }
            }
        })

        return newLaporanKegiatan
    }

    public async updateReport(
        body: IActivityReportBody,
        id: number,
    ) : Promise<LaporanKegiatan>{
        const updatedLaporanKegiatan : LaporanKegiatan = await this.prisma.laporanKegiatan.update({
            where: {
                id: id,
            },
            data: {
                ...body,
            }
        })

        return updatedLaporanKegiatan
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