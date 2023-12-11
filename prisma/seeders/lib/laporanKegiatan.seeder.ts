import { PrismaClient } from "@prisma/client";
import { laporanKegiatanData } from "../data/laporanKegiatan";

export default async function seedLaporanKegiatan(prisma: PrismaClient) {
    await prisma.$queryRaw`ALTER TABLE LaporanKegiatan AUTO_INCREMENT = 1`

    await prisma.laporanKegiatan.createMany({
        data: laporanKegiatanData,
    });
}