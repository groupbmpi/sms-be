import { PrismaClient } from "@prisma/client";
import { PrismaInstance } from "../services/prisma"

abstract class BaseHandler {
    protected prisma: PrismaClient;

    constructor() {
        this.prisma = PrismaInstance.getInstance().getClient();
    }
}

export default BaseHandler;