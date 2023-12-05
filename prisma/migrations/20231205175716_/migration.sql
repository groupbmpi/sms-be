/*
  Warnings:

  - Made the column `otp_token` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `otp_token` TEXT NOT NULL DEFAULT '',
    MODIFY `password` TEXT NOT NULL DEFAULT '';
