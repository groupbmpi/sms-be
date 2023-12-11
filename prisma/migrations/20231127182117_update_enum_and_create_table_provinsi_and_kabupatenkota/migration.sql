/*
  Warnings:

  - The values [MASALAH] on the enum `LaporanMasalah_kategoriMasalah` will be removed. If these variants are still used in the database, this will fail.
  - The values [PEMERINTAH] on the enum `Lembaga_kategori` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `namaKegiatan` to the `LaporanKegiatan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinsi_id` to the `LaporanMasalah` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alamat` to the `Lembaga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `daerah_id` to the `Lembaga` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `laporankegiatan` ADD COLUMN `namaKegiatan` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `laporanmasalah` ADD COLUMN `provinsi_id` INTEGER NOT NULL,
    MODIFY `kategoriMasalah` ENUM('ADVOKASI', 'EDUKASI') NOT NULL;

-- AlterTable
ALTER TABLE `lembaga` ADD COLUMN `alamat` TEXT NOT NULL,
    ADD COLUMN `daerah_id` INTEGER NOT NULL,
    MODIFY `kategori` ENUM('KEMENTRIAN', 'PEMERINTAHDAERAH', 'LEMBAGASWADAYAMASYARAKAT', 'INSTITUSIPENDIDIKAN', 'DUNIAUSAHA', 'MEDIA', 'MASYARAKATTERDAMPAK') NOT NULL;

-- CreateTable
CREATE TABLE `Provinsi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KabupatenKota` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `tipe` ENUM('KABUPATEN', 'KOTA') NOT NULL,
    `provinsi_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Lembaga` ADD CONSTRAINT `Lembaga_daerah_id_fkey` FOREIGN KEY (`daerah_id`) REFERENCES `KabupatenKota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaporanMasalah` ADD CONSTRAINT `LaporanMasalah_provinsi_id_fkey` FOREIGN KEY (`provinsi_id`) REFERENCES `Provinsi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KabupatenKota` ADD CONSTRAINT `KabupatenKota_provinsi_id_fkey` FOREIGN KEY (`provinsi_id`) REFERENCES `Provinsi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
