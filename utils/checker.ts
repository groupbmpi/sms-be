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