-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaLengkap` VARCHAR(255) NOT NULL,
    `alamat` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `noHandphone` VARCHAR(255) NOT NULL,
    `lembaga_id` INTEGER NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_noHandphone_key`(`noHandphone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lembaga` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(255) NOT NULL,
    `kategori` ENUM('PEMERINTAH', 'LEMBAGASWADAYAMASYARAKAT', 'INSTITUSIPENDIDIKAN', 'DUNIAUSAHA', 'MEDIA', 'MASYARAKATTERDAMPAK') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LaporanKegiatan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tujuan` TEXT NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `statusKegiatan` ENUM('SUDAHTERLAKSANA', 'BELUMTERLAKSANA', 'SEDANGBERJALAN', 'TAHAPKOORDINASI', 'SEDANGTERKENDALA') NOT NULL,
    `indikatorKeberhasilan` TEXT NOT NULL,
    `target` TEXT NOT NULL,
    `jadwal` DATETIME(3) NOT NULL,
    `kebutuhanLogistik` TEXT NOT NULL,
    `linkDokumen` TEXT NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Berita` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` TEXT NOT NULL,
    `detail` TEXT NOT NULL,
    `linkPhoto` TEXT NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LaporanMasalah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `masalah` TEXT NOT NULL,
    `kategoriMasalah` ENUM('MASALAH') NOT NULL,
    `user_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_lembaga_id_fkey` FOREIGN KEY (`lembaga_id`) REFERENCES `Lembaga`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaporanKegiatan` ADD CONSTRAINT `LaporanKegiatan_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Berita` ADD CONSTRAINT `Berita_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaporanMasalah` ADD CONSTRAINT `LaporanMasalah_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
