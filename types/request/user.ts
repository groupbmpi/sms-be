import { LaporanKegiatan, User } from "@prisma/client";
import { IPagination } from "./pagination";


type PropsRegisterUserOmitted = "id" | "lembaga_id" | "role_id" | "kabupatenKota_id" | "lembagaOthers" | "createdAt" | "updatedAt"
export interface IRegisterUserBody extends Omit<User,PropsRegisterUserOmitted>{}

export interface IVerifyUserBody{
    userID: number,
    statusAcc: boolean
}

export const LEMBAGA_OTHERS = "Others"