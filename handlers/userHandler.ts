import { BCF_CITY, BCF_PROVINCE, ID_ROLE_ADMIN, ID_ROLE_USER, OTP_LENGTH, SALT_ROUND } from "@constant";
import { BadRequestException, InternalServerErrorException } from "@exceptions";
import { BaseHandler } from "./baseHandler";
import { Kategori, Lembaga, User } from "@prisma/client";
import { ILoginUserBody, IPagination, IRegisterUserBody, IUpdateUnverifiedUserBody, IUserBody, IUserDTO, IUserRoleDTO, IUserStatusDTO, IUserWithPaginationDTO, IUserWithVerifDTO, IVerifyUserBody, IVerifyUserDTO, LEMBAGA_OTHERS } from "@types";
import { countSkipped, generatePassword, generateRandomNumber, sign, checkValidNoHandphone, uppercaseFirstLetter } from "@utils";
import bcrypt from "bcrypt";

export class UserHandler extends BaseHandler{

    private dataToDTO(user : User, url: string, lembaga: string, kabupatenKota: string, provinsi: string) : IUserDTO{
        return {
            id : user.id,
            namaLengkap : user.namaLengkap,
            email : user.email,
            noHandphone : user.noHandphone,
            linkFoto : url,
            lembagaOthers : user.lembagaOthers as string,
            lembaga : lembaga,
            kabupatenKota : kabupatenKota,
            provinsi : provinsi,
            alamat : user.alamat,
            kategori : user.kategori,
            kecamatan : user.kecamatan,
            kelurahan : user.kelurahan,
            kodePos : user.kodePos,
        } as IUserDTO
    }


    public async addUser(
        body: IRegisterUserBody,
        lembagaName : string,
        lembagaOthers : string | null,
        roleID : number,
        kabupatenKota : string,
        provinsi : string
    ): Promise<User>{
        const kabupatenKotaUser = await this.prisma.kabupatenKota.findFirstOrThrow({
            where : {
                nama : kabupatenKota,
                provinsi : {
                    nama : provinsi
                }
            }
        })
        console.log(lembagaName,LEMBAGA_OTHERS)
        if(lembagaName == LEMBAGA_OTHERS){
            const newUser : User = await this.prisma.user.create({
                data: {
                    ...body,
                    lembagaOthers : lembagaOthers,
                    password : "",
                    otp_token : "",
                    linkFoto : "",
                    role : {
                        connect : {
                            id : roleID,
                        }
                    },
                    kabupatenKota : {
                        connect : {
                            id : kabupatenKotaUser.id
                        }
                    }
                },
            });
            return newUser;
        }else{
            const lembagaUser : Lembaga = await this.prisma.lembaga.findFirstOrThrow({
                where : {
                    nama : lembagaName
                }
            })
            const lembagaID = lembagaUser.id;
            const newUser : User = await this.prisma.user.create({
                data: {
                    ...body,
                    lembagaOthers : lembagaOthers,
                    password : "",
                    otp_token : "",
                    linkFoto : "",
                    lembaga: {
                        connect: {
                            id: lembagaID,
                        }
                    },
                    role : {
                        connect : {
                            id : roleID,
                        }
                    },
                    kabupatenKota : {
                        connect : {
                            id : kabupatenKotaUser.id
                        }
                    }
                },
            });
            return newUser;
        }

    }

    public async updateUserById(
        body: IUpdateUnverifiedUserBody,
        lembagaName : string,
        lembagaOthers : string | null,
        kabupatenKota : string,
        provinsi : string,
        id : number
    ) : Promise<User | null>{
        const kabupatenKotaUser = await this.prisma.kabupatenKota.findFirst({
            where : {
                nama : kabupatenKota,
                provinsi : {
                    nama : provinsi
                }
            }
        })
        if(!kabupatenKotaUser){
            return null;
        }
        console.log(lembagaName,LEMBAGA_OTHERS)
        if(lembagaName == LEMBAGA_OTHERS){
            const user : User = await this.prisma.user.update({
                where : {
                    id : id
                },
                data : {
                    ...body,
                    lembagaOthers : lembagaOthers,
                    lembaga : {
                        disconnect : true
                    },
                    kabupatenKota : {
                        connect : {
                            id : kabupatenKotaUser.id
                        }
                    }
                }
            })
            return user;
        }else{
            const lembagaUser : Lembaga | null = await this.prisma.lembaga.findFirst({
                where : {
                    nama : lembagaName
                }
            })
            const user : User = await this.prisma.user.update({
                where : {
                    id : id
                },
                data : {
                    ...body,
                    lembagaOthers : lembagaOthers,
                    lembaga_id : lembagaUser?.id,
                    kabupatenKota_id : kabupatenKotaUser.id
                }
            })
            return user;
        }
    }

    public async login(
        body : ILoginUserBody
    ) : Promise<string>{
        const user = await this.prisma.user.findFirst({
            where : {
                email : body.email
            },
            include : {
                role : true
            }
        })

        if(!user){
            return "";
        }

        if(!user.is_activated || !user.is_verified || !user.is_accepted){
            return "";
        }

        const isPassCorrect : boolean = await bcrypt.compare(body.password,user.password as string);

        if(isPassCorrect){
            const token = sign({
                id : user.id,
                role : user.role.akses
            });
            return token;
        }else{
            return "";
        }
    }

    public async verifyUser(
        body: IVerifyUserBody
    ): Promise<IVerifyUserDTO | null>{

        let newUser : User;

        const pass : string = generatePassword();
        const otp : string = generateRandomNumber(OTP_LENGTH);
        if(body.statusAcc){

            const currentUser : User | null = await this.prisma.user.findFirst({
                where : {
                    id : body.userID
                }
            });

            if(!currentUser){
                return null;
            }

            // create new lembaga
            if(currentUser.lembaga_id == null){
                const newLembaga : Lembaga = await this.prisma.lembaga.create({
                    data : {
                        nama : uppercaseFirstLetter(currentUser.lembagaOthers!!),
                        kategori : currentUser.kategori,
                    }
                })
                currentUser.lembaga_id = newLembaga.id;
            }

            newUser = await this.prisma.user.update({
                where: {
                    id : body.userID
                },
                data: {
                    is_verified: true,
                    is_accepted: body.statusAcc,
                    password : await bcrypt.hash(pass,SALT_ROUND),
                    otp_token : await bcrypt.hash(otp, SALT_ROUND),
                    lembaga : {
                        connect : {
                            id : currentUser.lembaga_id
                        }
                    }
                },
            });
        }else{
            newUser = await this.prisma.user.update({
                where: {
                    id : body.userID
                },
                data: {
                    is_verified: true,
                    is_accepted: body.statusAcc,
                },
            });
        }
        const response : IVerifyUserDTO = {
            ...newUser,
            realPassword : pass,
            realOtp :otp
        }
        return response;
    }

    public async getUserBasedOnVerifStatus(
        pagination : IPagination,
        isVerified? : boolean
    ): Promise<IUserWithPaginationDTO>{
        let { limit, page } = pagination
        if(!limit){
            limit = 100;
        }
        if(!page){
            page = 1;
        }
        const skipped = countSkipped(page, limit)
        let totalData : number;
        let users : any[];
        if(isVerified == undefined){
            totalData = await this.prisma.user.count({
                where : {
                    role_id : ID_ROLE_USER
                }
            });
            users = await this.prisma.user.findMany({
                where : {
                    role_id : ID_ROLE_USER
                },
                include : {
                    lembaga : true,
                    kabupatenKota : {
                        include : {
                            provinsi : true
                        }
                    }
                },
                take: pagination.limit,
                skip: skipped,
            })
        }else{
            totalData = await this.prisma.user.count({
                where : {
                    role_id : ID_ROLE_USER,
                    is_verified : isVerified
                }
            })
            users = await this.prisma.user.findMany({
                where : {
                    role_id : ID_ROLE_USER,
                    is_verified : isVerified
                },
                include : {
                    lembaga : true,
                    kabupatenKota : {
                        include : {
                            provinsi : true
                        }
                    }
                },
                take: pagination.limit,
                skip: skipped,
            })
        }
        

        const userDto : IUserWithVerifDTO[] = []
        for(const user of users){
            let url = ""
            if(user.linkFoto){
                url = await this.getSignedURL(user.linkFoto);
            }
            const lembaga = user.lembaga? user.lembaga.nama : "";
            const kabupatenKota = user.kabupatenKota? user.kabupatenKota.nama : "";
            const provinsi = user.kabupatenKota? user.kabupatenKota.provinsi.nama : "";
            const data : IUserDTO = this.dataToDTO(user, url, lembaga, kabupatenKota, provinsi)
            const dataDTO : IUserWithVerifDTO = {
                ...data,
                is_verified : user.is_verified
            }
            userDto.push(dataDTO);
        }
        const response : IUserWithPaginationDTO = {
            listUser : userDto,
            countPages : Math.ceil(totalData/limit)
        }
        return response;
    }

    public async getUserRole(
        userID : number
    ) : Promise<IUserRoleDTO | null>{
        const user = await this.prisma.user.findFirst({
            where : {
                id : userID
            },
            include : {
                role : true
            }
        });
        if(!user){
            return null;
        }
        const res : IUserRoleDTO = {
            id : user.id,
            email : user.email,
            role : user.role.role,
            akses : user.role.akses
        }
        return res;
    }

    public async getUserByEmail(
        email : string
    ) : Promise<User | null>{
        const user : User | null = await this.prisma.user.findFirst({
            where : {
                email : email
            }
        });

        return user;
    }

    public async activateUser(
        userID : number
    ) : Promise<void>{
        await this.prisma.user.update({
            where : {
                id : userID
            },
            data : {
                is_activated : true
            }
        })
    }

    public async updateUser(
        body: IUserBody,
        userId: number
    ): Promise<User> {
        if(!body.namaLengkap){
            throw new BadRequestException(`Nama Lengkap ${body.namaLengkap} tidak valid`)
        }

        if(!body.noHandphone || !checkValidNoHandphone(body.noHandphone)){
            throw new BadRequestException(`No Handphone ${body.noHandphone} tidak valid`)
        }

        let payload: any = {
            namaLengkap : body.namaLengkap,
            noHandphone : body.noHandphone,
        }

        let pictureUploaded = false;
        let oldFilePath = "";
        let newFilePath = "";
        if (body.avatar) {
            newFilePath = await this.uploadPictureFile(`profile/${userId}`, body.avatar);

            if (newFilePath === "") {
                throw new InternalServerErrorException("Gagal menyimpan foto");
            }

            pictureUploaded = true;

            const user = await this.prisma.user.findFirst({
                select: {
                    linkFoto: true
                },
                where: {
                    id: userId
                }
            })
            if (user?.linkFoto) oldFilePath = user.linkFoto;
            payload = {
                ...payload,
                linkFoto: newFilePath
            }
        }


        try {
            const user =  await this.prisma.user.update({
                where: {
                    id: userId,
                },
                data: payload
            });
            
            if(pictureUploaded && newFilePath !== ""){
                user.linkFoto = await this.getSignedURL(newFilePath);
                this.deletePictureFile(oldFilePath);
            }

            return user;
        } catch(err: any) {
            if (pictureUploaded) {
                await this.deletePictureFile(newFilePath);
            }
            throw err;
        }
    }
  
    public async getUser(
        userID : number
    ) : Promise<IUserDTO | null>{
        const user = await this.prisma.user.findFirst({
            where : {
                id : userID
            },
            include : {
                lembaga : true,
                kabupatenKota : {
                    include : {
                        provinsi : true
                    }
                }
            }
        });
        if(!user){
            return null;
        }
        let url = ""
        if(user.linkFoto){
            url = await this.getSignedURL(user.linkFoto);
        }
        const lembaga = user.lembaga? user.lembaga.nama : "";
        const kabupatenKota = user.kabupatenKota? user.kabupatenKota.nama : "";
        const provinsi = user.kabupatenKota? user.kabupatenKota.provinsi.nama : "";
        return this.dataToDTO(user, url, lembaga, kabupatenKota, provinsi)
    }

    public async addAdmin(
        email : string
    ) : Promise<IVerifyUserDTO>{
        const kabupatenKotaUser = await this.prisma.kabupatenKota.findFirst({
            where : {
                nama : BCF_CITY,
                provinsi : {
                    nama : BCF_PROVINCE
                }
            }
        })
        const pass : string = generatePassword();
        const admin : User =  await this.prisma.user.create({
            data : {
                email : email,
                is_activated : true,
                is_accepted : true,
                is_verified : true,
                password : await bcrypt.hash(pass,SALT_ROUND),
                otp_token : "",
                linkFoto : "",
                alamat : "",
                kategori : Kategori.DUNIA_USAHA,
                kecamatan : "",
                kelurahan : "",
                kodePos : "",
                namaLengkap : "",
                noHandphone : "",
                kabupatenKota : {
                    connect : {
                        id : kabupatenKotaUser?.id
                    }
                },
                role : {
                    connect : {
                        id : ID_ROLE_ADMIN
                    }
                }
            }
        })
        const response : IVerifyUserDTO = {
            ...admin,
            realPassword : pass,
        }
        return response;
    }

    public async getStatusByID(
        userID : number
    ) : Promise<IUserStatusDTO | null>{
        const user = await this.prisma.user.findFirst({
            where : {
                id : userID
            }
        })
        if(!user){
            return null;
        }
        const response : IUserStatusDTO = {
            is_verified : user?.is_verified as boolean,
            is_accepted : user?.is_accepted as boolean,
            is_activated : user?.is_activated as boolean
        }

        return response;
    }
}

