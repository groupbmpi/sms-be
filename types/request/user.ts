import { LaporanKegiatan, User } from "@prisma/client";
import { IPagination } from "./pagination";


type PropsRegisterUserOmitted = "id" | "lembaga_id" | "role_id" | "kabupatenKota_id" | "lembagaOthers" | "password" | "otp_token" | "is_activated" | "createdAt" | "updatedAt"
export interface IRegisterUserBody extends Omit<User,PropsRegisterUserOmitted>{}

export interface IVerifyUserBody{
    userID: number,
    statusAcc: boolean
}

export interface IActivateUserBody{
    email : string,
    password : string,
    otp : string
}

export const LEMBAGA_OTHERS = "Others"