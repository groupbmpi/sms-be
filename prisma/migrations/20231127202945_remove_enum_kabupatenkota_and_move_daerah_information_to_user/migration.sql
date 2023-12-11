/*
  Warnings:

  - You are about to drop the column `tipe` on the `kabupatenkota` table. All the data in the column will be lost.
  - You are about to drop the column `daerah_id` on the `lembaga` table. All the data in the column will be lost.
  - Added the required column `kabupatenKota_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `lembaga` DROP FOREIGN KEY `Lembaga_daerah_id_fkey`;

-- AlterTable
ALTER TABLE `kabupatenkota` DROP COLUMN `tipe`;

-- AlterTable
ALTER TABLE `lembaga` DROP COLUMN `daerah_id`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `kabupatenKota_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_kabupatenKota_id_fkey` FOREIGN KEY (`kabupatenKota_id`) REFERENCES `KabupatenKota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
