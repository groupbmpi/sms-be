import { Kategori, KategoriMasalah, StatusKegiatan, MetodePelaksanaan, Provinsi, KabupatenKota, Lembaga } from "@prisma/client";
import { BaseHandler } from "./baseHandler";
import { IDaerahDTO } from "types";

export class LembagaHandler extends BaseHandler{

    public async getLembaga() : Promise<Lembaga[]>{
        const lembaga : Lembaga[] = await this.prisma.lembaga.findMany()

        return lembaga
    }
}