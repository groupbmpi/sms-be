import { KabupatenKota, Provinsi } from "@prisma/client";
import { IDaerahDTO } from "@types";
import { BaseHandler } from "./baseHandler";

export class DaerahHandler extends BaseHandler{
    public async getProvinsi() : Promise<string[]>{
        const provinsi : Pick<Provinsi, 'nama'>[] = await this.prisma.provinsi.findMany({
            select: {
                nama: true,
            }
        })

        const provinsiParsed : string[] = provinsi.map((prov) => prov.nama)

        return provinsiParsed
    }

    public async getKabupatenKota() : Promise<IDaerahDTO[]>{
        const daerah : IDaerahDTO[] = []

        const provinsi : Pick<Provinsi, 'id' | 'nama'>[] = await this.prisma.provinsi.findMany({
            select: {
                nama: true,
                id: true,
            }
        })

        for(const prov of provinsi){
            const kabupatenKota : Pick<KabupatenKota, 'nama'>[] = await this.prisma.kabupatenKota.findMany({
                where: {
                    provinsi_id: prov.id,
                },
                select: {
                    nama: true,
                }
            })

            const kabupatenKotaParsed : string[] = kabupatenKota.map((kab) => kab.nama)

            daerah.push({
                provinsi: prov.nama,
                kabupatenKota: kabupatenKotaParsed,
            })
        }
    

        return daerah
    }
}