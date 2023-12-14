import { PrismaClient } from "@prisma/client";
import { chatData } from "../data/chat";

export default async function seedChat(prisma: PrismaClient) {
    await prisma.$queryRaw`ALTER TABLE Chat AUTO_INCREMENT = 1`

    await prisma.chat.createMany({
        data: chatData,
    });
}