import { LaporanKegiatan, User } from "@prisma/client";
import { IPagination } from "./pagination";


type PropsRegisterUserOmitted = "id" | "lembaga_id" | "role_id" | "createdAt" | "updatedAt"
export interface IRegisterUserBody extends Omit<User,PropsRegisterUserOmitted>{}

export interface IVerifyUserBody{
    userID?: number,
    statusAcc?: boolean
}