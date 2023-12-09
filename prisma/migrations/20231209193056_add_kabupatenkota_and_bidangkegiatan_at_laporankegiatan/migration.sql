/*
  Warnings:

  - Added the required column `bidangKegiatan` to the `LaporanKegiatan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kabupatenKota_id` to the `LaporanKegiatan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `laporankegiatan` ADD COLUMN `bidangKegiatan` ENUM('ADVOKASI', 'EDUKASI', 'PEMBERDAYAAN_MASYARAKAT') NOT NULL,
    ADD COLUMN `kabupatenKota_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `LaporanKegiatan` ADD CONSTRAINT `LaporanKegiatan_kabupatenKota_id_fkey` FOREIGN KEY (`kabupatenKota_id`) REFERENCES `KabupatenKota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
