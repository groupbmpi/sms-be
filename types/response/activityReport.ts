import { IActivitiesDTO, IActivityDTO } from "types/request";

export interface IActivitiesReportData extends IActivitiesDTO{
    isEditable : boolean
}
export interface IActivityReportData extends IActivityDTO{}