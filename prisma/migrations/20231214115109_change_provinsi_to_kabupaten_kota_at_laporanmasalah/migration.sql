/*
  Warnings:

  - You are about to drop the column `provinsi_id` on the `laporanmasalah` table. All the data in the column will be lost.
  - Added the required column `kabupatenKota_id` to the `LaporanMasalah` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `laporanmasalah` DROP FOREIGN KEY `LaporanMasalah_provinsi_id_fkey`;

-- AlterTable
ALTER TABLE `laporanmasalah` DROP COLUMN `provinsi_id`,
    ADD COLUMN `kabupatenKota_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `LaporanMasalah` ADD CONSTRAINT `LaporanMasalah_kabupatenKota_id_fkey` FOREIGN KEY (`kabupatenKota_id`) REFERENCES `KabupatenKota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
