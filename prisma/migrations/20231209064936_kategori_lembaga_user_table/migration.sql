/*
  Warnings:

  - Added the required column `kategori` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `otp_token` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `laporankegiatan` ALTER COLUMN `keteranganTambahan` DROP DEFAULT;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `kategori` ENUM('KEMENTRIAN', 'PEMERINTAH_DAERAH', 'LEMBAGA_SWADAYA_MASYARAKAT', 'INSTITUSI_PENDIDIKAN', 'DUNIA_USAHA', 'MEDIA', 'MASYARAKAT_TERDAMPAK') NOT NULL,
    MODIFY `otp_token` TEXT NOT NULL,
    MODIFY `password` TEXT NOT NULL;
