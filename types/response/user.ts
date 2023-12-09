import {User} from "@prisma/client";

export interface IUnverifiedUserData extends User{}

export interface ILoginResponse{
    token : string
}

export interface IUserDTO{
    id : number,
    namaLengkap : string,
    email : string,
    noHandphone : string,
    linkFoto : string,
    lembagaOthers : string,
    lembaga : string,
    kabupatenKota : string,
    provinsi : string,
}