/*
  Warnings:

  - You are about to drop the column `jadwal` on the `laporankegiatan` table. All the data in the column will be lost.
  - You are about to drop the column `kebutuhanLogistik` on the `laporankegiatan` table. All the data in the column will be lost.
  - The values [SUDAHTERLAKSANA,BELUMTERLAKSANA,SEDANGBERJALAN,TAHAPKOORDINASI,SEDANGTERKENDALA] on the enum `LaporanKegiatan_statusKegiatan` will be removed. If these variants are still used in the database, this will fail.
  - The values [PEMERINTAHDAERAH,LEMBAGASWADAYAMASYARAKAT,INSTITUSIPENDIDIKAN,DUNIAUSAHA,MASYARAKATTERDAMPAK] on the enum `Lembaga_kategori` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `jadwalMulai` to the `LaporanKegiatan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jadwalSelesai` to the `LaporanKegiatan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kebutuhanLogistikDibutuhkan` to the `LaporanKegiatan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kebutuhanLogistikTerpenuhi` to the `LaporanKegiatan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `laporankegiatan` DROP COLUMN `jadwal`,
    DROP COLUMN `kebutuhanLogistik`,
    ADD COLUMN `jadwalMulai` DATETIME(3) NOT NULL,
    ADD COLUMN `jadwalSelesai` DATETIME(3) NOT NULL,
    ADD COLUMN `kebutuhanLogistikDibutuhkan` TEXT NOT NULL,
    ADD COLUMN `kebutuhanLogistikTerpenuhi` TEXT NOT NULL,
    ADD COLUMN `keteranganTambahan` TEXT,
    MODIFY `statusKegiatan` ENUM('BELUM_TERLAKSANA', 'TAHAP_KOORDINASI', 'SEDANG_BERJALAN', 'SUDAH_TERLAKSANA', 'SEDANG_TERKENDALA') NOT NULL;

-- AlterTable
ALTER TABLE `laporanmasalah` MODIFY `kategoriMasalah` ENUM('ADVOKASI', 'EDUKASI', 'PEMBERDAYAAN_MASYARAKAT') NOT NULL;

-- AlterTable
ALTER TABLE `lembaga` MODIFY `kategori` ENUM('KEMENTRIAN', 'PEMERINTAH_DAERAH', 'LEMBAGA_SWADAYA_MASYARAKAT', 'INSTITUSI_PENDIDIKAN', 'DUNIA_USAHA', 'MEDIA', 'MASYARAKAT_TERDAMPAK') NOT NULL;
