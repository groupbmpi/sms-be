import { Lembaga } from "@prisma/client";
import { BaseHandler } from "./baseHandler";

export class LembagaHandler extends BaseHandler{

    public async getLembaga() : Promise<Lembaga[]>{
        const lembaga : Lembaga[] = await this.prisma.lembaga.findMany()

        return lembaga
    }
}