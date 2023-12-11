import { PrismaClient } from "@prisma/client";
import { userData } from "../data/user";
import bcrypt from "bcrypt";

export default async function seedUser(prisma: PrismaClient) {

    const modified = await Promise.all(userData.map(async (user) => {
        const newPassword = await bcrypt.hash(user.password, 10);
        
        return  {
            ...user,
            password: newPassword,
        };
    }))

    console.log(modified)

    await prisma.$queryRaw`ALTER Table User AUTO_INCREMENT = 1`

    await prisma.user.createMany({
        data: modified,
    });
}