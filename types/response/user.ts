import {User} from "@prisma/client";

export interface IUnverifiedUserData extends User{}

export interface ILoginResponse{
    token : string
}

type PropsUserDTOOmitted = "password" | "otp_token" | "is_activated" | "is_verified" | "is_accepted" | "createdAt" | "updatedAt" | "kabupatenKota_id" | "lembaga_id" | "role_id"

export interface IUserDTO extends Omit<User,PropsUserDTOOmitted>{
    kabupatenKota : string,
    provinsi : string,
}

export interface IUserRoleDTO{
    id : number,
    email : string,
    role: string,
    akses : string
}

export interface IUserWithPaginationDTO{
    listUser : IUserDTO[],
    countPages : number
}