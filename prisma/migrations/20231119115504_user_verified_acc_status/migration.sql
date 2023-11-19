-- AlterTable
ALTER TABLE `user` ADD COLUMN `is_accepted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_verified` BOOLEAN NOT NULL DEFAULT false;
