import { PrismaClient } from "@prisma/client";
import seedDaerah from "./lib/daerah.seeder";
import seedRole from "./lib/role.seeder";
import seedUser from "./lib/user.seeder";
import seedLembaga from "./lib/lembaga.seeder";
import seedLaporanKegiatan from "./lib/laporanKegiatan.seeder";
import seedBerita from "./lib/berita.seeder";
import seedLaporanMasalah from "./lib/laporanMasalah.seeder";
import seedChat from "./lib/chat.seeder";

const prisma = new PrismaClient();

async function clear(){
    await prisma.laporanKegiatan.deleteMany({});
    await prisma.laporanMasalah.deleteMany({});
    await prisma.berita.deleteMany({});
    await prisma.lembaga.deleteMany({});
    await prisma.chat.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.kabupatenKota.deleteMany({});
    await prisma.provinsi.deleteMany({});
    await prisma.role.deleteMany({});
}

async function main(){
    await clear()

    await seedDaerah(prisma);
    await seedRole(prisma);
    await seedLembaga(prisma);
    await seedUser(prisma);
    await seedLaporanKegiatan(prisma);
    await seedBerita(prisma);
    await seedLaporanMasalah(prisma);
    await seedChat(prisma);
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async(e) =>{
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})
