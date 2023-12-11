/*
  Warnings:

  - Added the required column `kecamatan` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kelurahan` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kodePos` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `kecamatan` VARCHAR(255) NOT NULL,
    ADD COLUMN `kelurahan` VARCHAR(255) NOT NULL,
    ADD COLUMN `kodePos` VARCHAR(255) NOT NULL;
