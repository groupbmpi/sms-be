import { Kategori, Lembaga } from "@prisma/client";
import { BaseHandler } from "./baseHandler";
import { ILembagaBody, ILembagaByKategoriDTO, ILembagaDTO, ILembagaQuery, ILembagasDTO, IPagination } from "@types";
import { checkValidKategori, countSkipped } from "@utils";
import { BadRequestException } from "@exceptions";

export class LembagaHandler extends BaseHandler{

    private dataToDTO(data : Lembaga) : ILembagaDTO{
        return {
            ...data,
        }
    }

    private dtoToData(dto: ILembagaDTO) : Omit<Lembaga, 'id' | 'createdAt' | 'updatedAt'>{
        return {
            ...dto,
        }
    }

    public async getLembagaByKategory() : Promise<ILembagaByKategoriDTO[]>{
        const data : ILembagaByKategoriDTO[] = []


        for(let kategori in Kategori){
            const lembagaByKategori : Pick<Lembaga, 'nama'>[] = await this.prisma.lembaga.findMany({
                select : {
                    nama : true
                },
                where:{
                    kategori : kategori as Kategori,
                }
            })

            data.push({
                kategori: kategori,
                lembaga: lembagaByKategori.map((lembaga) => lembaga.nama)
            })
        }

        return data
    }

    public async getLembaga(
        query: Omit<ILembagaQuery, "limit" | "page">,
        pagination: IPagination,
    ) : Promise<ILembagasDTO>{
        let { limit, page } = pagination
        let {nama, ...parsedQuery} = query

        if(typeof limit === 'undefined'){
            limit = 0;
        }
        
        if(typeof page === 'undefined'){
            page = 1;
        }

        if(typeof nama !== 'undefined'){
            nama = decodeURIComponent(nama)
        }

        const skipped = countSkipped(page, limit)

        const totalData : number = await this.prisma.lembaga.count({
            where: {
                id: parsedQuery.id,
                nama: {
                    contains: nama,
                }
            }
        })

        const lembaga : Lembaga[] = await this.prisma.lembaga.findMany({
            where: {
                id: parsedQuery.id,
                nama: {
                    contains: nama,
                }
            },
            skip: skipped,
            take: limit,
        })

        return {
            data: lembaga.map((data) => this.dataToDTO(data)),
            countPages: (limit === 0 ? 1 : Math.ceil(totalData / limit)),
        }
    }

    public async createLembaga(
        body: ILembagaBody
    ) : Promise<ILembagaDTO>{
        if(!checkValidKategori(body.kategori)){
            throw new BadRequestException(`Kategori ${body.kategori} tidak valid`)
        }

        const data : Lembaga = await this.prisma.lembaga.create({
            data: this.dtoToData(body),
        })

        return this.dataToDTO(data)
    }


    public async updateLembaga(
        body: ILembagaBody,
        id: number,
    ) : Promise<ILembagaDTO>{
        if(!checkValidKategori(body.kategori)){
            throw new BadRequestException(`Kategori ${body.kategori} tidak valid`)
        }

        const data : Lembaga = await this.prisma.lembaga.update({
            where: {
                id: id,
            },
            data: this.dtoToData(body),
        })

        return this.dataToDTO(data)
    }
}