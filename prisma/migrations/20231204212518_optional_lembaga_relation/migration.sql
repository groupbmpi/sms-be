-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_lembaga_id_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `lembaga_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_lembaga_id_fkey` FOREIGN KEY (`lembaga_id`) REFERENCES `Lembaga`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
