import { PrismaClient } from "@prisma/client";
import { laporanMasalahData } from "../data/laporanMasalah";

export default async function seedLaporanMasalah(prisma: PrismaClient) {
    await prisma.$queryRaw`ALTER TABLE LaporanMasalah AUTO_INCREMENT = 1`

    await prisma.laporanMasalah.createMany({
        data: laporanMasalahData,
    });
}