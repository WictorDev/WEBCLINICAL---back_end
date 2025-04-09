-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_typeId_fkey`;

-- DropIndex
DROP INDEX `User_typeId_fkey` ON `User`;

-- AlterTable
ALTER TABLE `User` MODIFY `typeId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `Type`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
