/*
  Warnings:

  - You are about to drop the `Adimin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Adimin` DROP FOREIGN KEY `Adimin_typeId_fkey`;

-- DropTable
DROP TABLE `Adimin`;

-- CreateTable
CREATE TABLE `Admin` (
    `Cpf` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `typeId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_Cpf_key`(`Cpf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
