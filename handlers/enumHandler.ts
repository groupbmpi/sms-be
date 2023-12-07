import { Kategori, KategoriMasalah, StatusKegiatan, MetodePelaksanaan, Provinsi, KabupatenKota } from "@prisma/client";
import { BaseHandler } from "./baseHandler";
import { IDaerahDTO } from "types";

export class EnumHandler extends BaseHandler{

    public getKategoriEnum() : string[]{
        const kategoriValues : string[] = []

        for(const kategori in Kategori){
            kategoriValues.push(kategori)
        }

        return kategoriValues
    }

    public getStatusKegiatanEnum() : string[]{
        const statusKegiatanValues : string[] = []

        for(const statusKegiatan in StatusKegiatan){
            statusKegiatanValues.push(statusKegiatan)
        }

        return statusKegiatanValues
    }

    public getKategoriMasalahEnum() : string[]{
        const kategoriMasalahValues : string[] = []

        for(const kategoriMasalah in KategoriMasalah){
            kategoriMasalahValues.push(kategoriMasalah)
        }

        return kategoriMasalahValues
    }

    public getMetodePelaksanaanEnum() : string[]{
        const metodePelaksanaanValues : string[] = []

        for(const metodePelaksanaan in MetodePelaksanaan){
            metodePelaksanaanValues.push(metodePelaksanaan)
        }

        return metodePelaksanaanValues
    }
    
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