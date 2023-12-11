/*
  Warnings:

  - Added the required column `metodePelaksanaan` to the `LaporanKegiatan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `laporankegiatan` ADD COLUMN `metodePelaksanaan` ENUM('DARING', 'LURING', 'HYBRID', 'FOCUS_GROUP_DISCUSSION', 'TALKSHOW') NOT NULL;
