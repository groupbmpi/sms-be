import { PrismaClient } from "@prisma/client";
import { PrismaInstance } from "@services"

abstract class BaseHandler {
    protected prisma: PrismaClient;

    constructor() {
        this.prisma = PrismaInstance.getInstance().getClient();
    }
}

export default BaseHandler;