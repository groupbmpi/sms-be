import { Kategori, KategoriMasalah, MetodePelaksanaan, StatusKegiatan } from "@prisma/client";

export function checkValidKategori(toCheck : string) : toCheck is Kategori{
    return Kategori.hasOwnProperty(toCheck)
}

export function checkValidKategoriMasalah(toCheck : string) : toCheck is KategoriMasalah{
    return KategoriMasalah.hasOwnProperty(toCheck)
}

export function checkValidStatusKegiatan(toCheck : string) : toCheck is StatusKegiatan{
    return StatusKegiatan.hasOwnProperty(toCheck)
}

export function checkValidMetodePelaksanaan(toCheck : string) : toCheck is MetodePelaksanaan{
    return MetodePelaksanaan.hasOwnProperty(toCheck)
}

export function checkValidNoHandphone(toCheck : string) : boolean{
    const regex = new RegExp(/^(^\+62\s?|^0|^62)(\d{3,4}-?){2}\d{3,4}$/);
    return regex.test(toCheck);
}

export function checkIntCast(toCheck: unknown): boolean {
    if (typeof toCheck !== 'number' && typeof toCheck !== 'string') {
        return false;
    }

    if (typeof toCheck === 'string') {
        const regex = new RegExp(/^[1-9]\d*$/);

        return regex.test(toCheck);
    }

    return true;
}