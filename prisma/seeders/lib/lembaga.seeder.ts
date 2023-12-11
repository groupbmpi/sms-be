import { PrismaClient } from "@prisma/client";
import { lembagaData } from "../data/lembaga";

export default async function seedLembaga(prisma: PrismaClient) {
    await prisma.$queryRaw`ALTER TABLE Lembaga AUTO_INCREMENT = 1`

    await prisma.lembaga.createMany({
        data: lembagaData,
    });
}