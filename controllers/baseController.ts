import { PrismaClient } from "@prisma/client";
import { PrismaInstance } from "../services/prisma"


abstract class BaseController {
    protected prisma: PrismaClient;
    constructor() {
        this.prisma = PrismaInstance.getInstance().getClient();
    }
}

export default BaseController;