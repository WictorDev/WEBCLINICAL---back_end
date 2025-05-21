/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Type` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Employee` DROP FOREIGN KEY `Employee_employeeTypeId_fkey`;

-- DropIndex
DROP INDEX `Employee_employeeTypeId_fkey` ON `Employee`;

-- AlterTable
ALTER TABLE `Employee` MODIFY `employeeTypeId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Type_name_key` ON `Type`(`name`);

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_employeeTypeId_fkey` FOREIGN KEY (`employeeTypeId`) REFERENCES `EmployeeType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
