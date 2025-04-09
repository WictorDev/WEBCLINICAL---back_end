-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_companyId_fkey`;

-- DropIndex
DROP INDEX `User_companyId_fkey` ON `User`;

-- AlterTable
ALTER TABLE `User` MODIFY `companyId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`Cnpj`) ON DELETE SET NULL ON UPDATE CASCADE;
