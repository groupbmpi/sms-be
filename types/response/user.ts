import {User} from "@prisma/client";

export interface IUnverifiedUserData extends User{}

export interface ILoginResponse{
    token : string
}