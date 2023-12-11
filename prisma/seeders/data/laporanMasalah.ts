import { KategoriMasalah, LaporanMasalah } from "@prisma/client";

export const laporanMasalahData : Omit<LaporanMasalah, 'id'|'createdAt'|'updatedAt'>[] = [
    {
        masalah: "Laporan Masalah 1",
        kategoriMasalah: KategoriMasalah.ADVOKASI,
        provinsi_id: 1,
        user_id: 1,
    },
    {
        masalah: "Laporan Masalah 2",
        kategoriMasalah: KategoriMasalah.ADVOKASI,
        provinsi_id: 2,
        user_id: 2,
    },
    {
        masalah: "Laporan Masalah 3",
        kategoriMasalah: KategoriMasalah.ADVOKASI,
        provinsi_id: 3,
        user_id: 3,
    },
    {
        masalah: "Laporan Masalah 4",
        kategoriMasalah: KategoriMasalah.EDUKASI,
        provinsi_id: 4,
        user_id: 4,
    },
    {
        masalah: "Laporan Masalah 5",
        kategoriMasalah: KategoriMasalah.EDUKASI,
        provinsi_id: 5,
        user_id: 5,
    }
]