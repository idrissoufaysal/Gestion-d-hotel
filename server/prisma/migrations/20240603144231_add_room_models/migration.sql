/*
  Warnings:

  - Added the required column `desc` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `room` ADD COLUMN `desc` VARCHAR(191) NOT NULL;
