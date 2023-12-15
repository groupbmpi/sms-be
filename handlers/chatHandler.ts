import { IChatDTO, IChatRequest } from "@types";
import { BaseHandler } from "./baseHandler";
import { Chat, User } from "@prisma/client";
import moment from "moment-timezone";

export class ChatHandler extends BaseHandler{

    private dataToDTO(data : Chat, user: User, userID : number) : IChatDTO{
        return {
            id: data.id,
            pesan: data.pesan,
            user: user.namaLengkap,
            linkFoto: user.linkFoto,
            messageTime: moment(data.createdAt).tz("Asia/Jakarta").format("DD MMM YYYY HH:mm"),
            isSelf: user.id === userID
        }
    }

    public async createChat(
        body: IChatRequest,
        userID: number
    ) : Promise<IChatDTO>{
        const { message } = body

        const chat : Chat = await this.prisma.chat.create({
            data:{
                pesan: message,
                user : {
                    connect:{
                        id: userID
                    }
                }
            }
        })

        const user : User | null = await this.prisma.user.findFirst({
            where:{
                id: userID
            }
        })

        return this.dataToDTO(chat,user!!,userID);
    }

    public async getChat(
        userID : number,
        lowID?: number,
        limit: number = 6,
    ):Promise<IChatDTO[]>{
        let chats : Chat[];
        const count = await this.prisma.chat.count()
        if(!lowID){
            lowID = Math.max(count - limit + 1, 1);
        }
        chats = await this.prisma.chat.findMany({
            where:{
                id:{
                    gte: lowID
                }
            }
        });
        const mapUser : Map<number, User> = new Map<number, User>();
        const listUserID : number[] = [];
        for(let chat of chats){
            if(mapUser.has(chat.user_id))continue;
            listUserID.push(chat.user_id);
        }
        const users : User[] = await this.prisma.user.findMany({
            where:{
                id:{
                    in: listUserID
                }
            }
        });
        for(let user of users){
            let url = ""
            if(user.linkFoto){
                url = await this.getSignedURL(user.linkFoto);
            }
            user.linkFoto = url;
            mapUser.set(user.id, user);
        }
        return chats.map((chat) => this.dataToDTO(chat, mapUser.get(chat.user_id)!!,userID));
    }
}