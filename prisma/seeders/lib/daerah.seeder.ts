import { KabupatenKota, PrismaClient, Provinsi } from "@prisma/client"
import daerahJSON from "../data/daerah.json"

export default async function seedDaerah(prisma : PrismaClient) {
    await prisma.$queryRaw`ALTER TABLE Provinsi AUTO_INCREMENT = 1`
    await prisma.$queryRaw`ALTER TABLE KabupatenKota AUTO_INCREMENT = 1`
   
    const mapProvKodetoId = new Map<string, number>()

    //Seed provinsi first
    const provinsi : {
        [kode: string]: string
    } = daerahJSON.provinsi
    const provinsiData : Omit<Provinsi, 'id' | 'createdAt' | 'updatedAt'>[] = []

    let id = 1


    for(const kode in provinsi){
        mapProvKodetoId.set(kode, id)
        provinsiData.push({
            nama: provinsi[kode],
        })
        id ++
    }

    const kabupatenKota : {
        [kodeProv : string] : {
            [kode: string]: string
        }
    } = daerahJSON.kabupaten
    const kabupatenKotaData : Omit<KabupatenKota, 'id' | 'createdAt' | 'updatedAt'>[] = []
    
    for(const kodeProv in kabupatenKota){
        for(const kode in kabupatenKota[kodeProv]){
            kabupatenKotaData.push({
                nama: kabupatenKota[kodeProv][kode],
                provinsi_id: mapProvKodetoId.get(kodeProv) as number,
            })
        }
    }

    await prisma.provinsi.createMany({
        data: provinsiData,
    })

    await prisma.kabupatenKota.createMany({
        data: kabupatenKotaData,
    })
}
