import { PrismaClient } from "@prisma/client";
import { beritaData } from "../data/berita";

export default async function seedBerita(prisma: PrismaClient) {
    await prisma.$queryRaw`ALTER TABLE Berita AUTO_INCREMENT = 1`

    await prisma.berita.createMany({
        data: beritaData,
    });
}