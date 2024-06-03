/*
  Warnings:

  - Added the required column `address` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `distance` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxPeople` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `hotel` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `cheapesPrice` DOUBLE NULL,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `desc` VARCHAR(191) NULL,
    ADD COLUMN `distance` VARCHAR(191) NOT NULL,
    ADD COLUMN `featured` BOOLEAN NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `rating` DOUBLE NULL DEFAULT 0,
    ADD COLUMN `title` VARCHAR(191) NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `photo` ADD COLUMN `url` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `room` ADD COLUMN `maxPeople` INTEGER NOT NULL,
    ADD COLUMN `price` DOUBLE NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `RoomNumber` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `roomId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UnavailableDate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `roomNumberId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RoomNumber` ADD CONSTRAINT `RoomNumber_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UnavailableDate` ADD CONSTRAINT `UnavailableDate_roomNumberId_fkey` FOREIGN KEY (`roomNumberId`) REFERENCES `RoomNumber`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
