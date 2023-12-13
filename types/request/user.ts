import { Kategori, LaporanKegiatan, User } from "@prisma/client";
import { IPagination } from "./pagination";
import { inflate } from "zlib";


type PropsRegisterUserOmitted = "id" | "lembaga_id" | "role_id" | "kabupatenKota_id" | "lembagaOthers" | "password" | "otp_token" | "is_activated" | "createdAt" | "updatedAt" | "linkFoto" ;
export interface IRegisterUserBody extends Omit<User,PropsRegisterUserOmitted>{}
type PropsUpdateUnverifiedUserOmitted = "email" | "is_verified" | "is_accepted";
export interface IUpdateUnverifiedUserBody extends Omit<IRegisterUserBody,PropsUpdateUnverifiedUserOmitted>{}


export interface IVerifyUserBody{
    userID: number,
    statusAcc: boolean
}

export interface IActivateUserBody{
    email : string,
    password : string,
    otp : string
}

export interface ILoginUserBody{
    email : string,
    password : string
}


export interface IUserBody {
    namaLengkap : string,
    noHandphone : string,
    avatar : string
}

type PropsUpdateUserOmitted = "id" | "lembaga_id" | "role_id" | "kabupatenKota_id" | "lembagaOthers" | "password" | "otp_token" | "is_activated" | "createdAt" | "updatedAt" | "linkFoto" ;
export interface IUpdateUserBody extends Omit<User,PropsUpdateUserOmitted>{}

export const LEMBAGA_OTHERS = "Others"

export interface IRegisterAdminBody{
    email : string,
}

export interface IVerifyUserDTO extends User{
    passsword: string
    otp: string
}