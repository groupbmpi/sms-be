import { PrismaClient } from "@prisma/client";
import { roleData } from "../data/role";

export default async function seedRole(prisma: PrismaClient) {
    await prisma.$queryRaw`ALTER TABLE Role AUTO_INCREMENT = 1`

    await prisma.role.createMany({
        data: roleData,
    });
}