import { PrismaClient } from "@prisma/client";
import { userData } from "../data/user";

export default async function seedUser(prisma: PrismaClient) {
    await prisma.$queryRaw`ALTER Table User AUTO_INCREMENT = 1`

    await prisma.user.createMany({
        data: userData,
    });
}