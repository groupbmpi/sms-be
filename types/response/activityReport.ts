import { LaporanKegiatan } from "@prisma/client";
import { IActivitiesDTO } from "types/request";

export interface IActivitiesReportData extends IActivitiesDTO{}
export interface IActivityReportData extends LaporanKegiatan{}