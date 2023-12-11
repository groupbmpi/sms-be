import { Kategori, Lembaga } from "@prisma/client";

//TODO:Continue add other lembaga
export const lembagaData : Omit<Lembaga, 'id'|'createdAt'|'updatedAt'>[] = [
    {
        nama: "Kemenko PMK RI",
        kategori: Kategori.KEMENTRIAN,
        alamat: ""
    },
    {
        nama: "Kementrian Kesehatan RI",
        kategori: Kategori.KEMENTRIAN,
        alamat: ""
    },
    {
        nama: "Kementrian Dalam Negeri",
        kategori: Kategori.KEMENTRIAN,
        alamat: ""
    },
    {
        nama: "Kementerian Ketenagakerjaan",
        kategori: Kategori.KEMENTRIAN,
        alamat: ""
    },
    {
        nama: "Kementerian Desa PDTT",
        kategori: Kategori.KEMENTRIAN,
        alamat: ""
    },
    {
        nama: "Kementerian Komunikasi dan Informatika",
        kategori: Kategori.KEMENTRIAN,
        alamat: ""
    },
    {
        nama: "Kementerian Pendidikan, Kebudayaan, Riset dan Teknologi",
        kategori: Kategori.KEMENTRIAN,
        alamat: ""
    },
    {
        nama: "Dinas Kesehatan Provinsi",
        kategori: Kategori.PEMERINTAH_DAERAH,
        alamat: ""
    },
    {
        nama: "Dinas Kesehatan Kabupaten/Kota",
        kategori: Kategori.PEMERINTAH_DAERAH,
        alamat: ""
    },
    {
        nama: "Dinas Pendidikan Provinsi",
        kategori: Kategori.PEMERINTAH_DAERAH,
        alamat: ""
    },
    {
        nama: "Dinas Pendidikan Kabupaten/Kota",
        kategori: Kategori.PEMERINTAH_DAERAH,
        alamat: ""
    },
    {
        nama: "Dinas Komunikasi dan Informatika Provinsi",
        kategori: Kategori.PEMERINTAH_DAERAH,
        alamat: ""
    },
    {
        nama: "Dinas Komunikasi dan Informatika Kabupaten/Kota",
        kategori: Kategori.PEMERINTAH_DAERAH,
        alamat: ""
    },
    {
        nama: "Badan Perencanaan Daerah",
        kategori: Kategori.PEMERINTAH_DAERAH,
        alamat: ""
    },
    {
        nama: "Humas/Protokoler Pemerintah Provinsi",
        kategori: Kategori.PEMERINTAH_DAERAH,
        alamat: ""
    },
]