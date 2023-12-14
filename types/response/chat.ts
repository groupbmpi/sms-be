import { Chat } from "@prisma/client";

type PropsChatDTOOmitted = "createdAt" | "updatedAt" | "user_id"
export interface IChatDTO extends Omit<Chat,PropsChatDTOOmitted>{
    user : string
    linkFoto: string
    messageTime: string
    isSelf: boolean
}