import { Kategori, Lembaga } from "@prisma/client";

//TODO:Continue add other lembaga
export const lembagaData : Omit<Lembaga, 'id'|'createdAt'|'updatedAt'>[] = [
    {
        nama: "Kemenko PMK RI",
        kategori: Kategori.KEMENTRIAN,
    },
    {
        nama: "Kementrian Kesehatan RI",
        kategori: Kategori.KEMENTRIAN,
    },
    {
        nama: "Kementrian Dalam Negeri",
        kategori: Kategori.KEMENTRIAN,
    },
    {
        nama: "Kementerian Ketenagakerjaan",
        kategori: Kategori.KEMENTRIAN,
    },
    {
        nama: "Kementerian Desa PDTT",
        kategori: Kategori.KEMENTRIAN,
    },
    {
        nama: "Kementerian Komunikasi dan Informatika",
        kategori: Kategori.KEMENTRIAN,
    },
    {
        nama: "Kementerian Pendidikan, Kebudayaan, Riset dan Teknologi",
        kategori: Kategori.KEMENTRIAN,
    },
    {
        nama: "Dinas Kesehatan Provinsi",
        kategori: Kategori.PEMERINTAH_DAERAH,
    },
    {
        nama: "Dinas Kesehatan Kabupaten/Kota",
        kategori: Kategori.PEMERINTAH_DAERAH,
    },
    {
        nama: "Dinas Pendidikan Provinsi",
        kategori: Kategori.PEMERINTAH_DAERAH,
    },
    {
        nama: "Dinas Pendidikan Kabupaten/Kota",
        kategori: Kategori.PEMERINTAH_DAERAH,
    },
    {
        nama: "Dinas Komunikasi dan Informatika Provinsi",
        kategori: Kategori.PEMERINTAH_DAERAH,
    },
    {
        nama: "Dinas Komunikasi dan Informatika Kabupaten/Kota",
        kategori: Kategori.PEMERINTAH_DAERAH,
    },
    {
        nama: "Badan Perencanaan Daerah",
        kategori: Kategori.PEMERINTAH_DAERAH,
    },
    {
        nama: "Humas/Protokoler Pemerintah Provinsi",
        kategori: Kategori.PEMERINTAH_DAERAH,
    },
]