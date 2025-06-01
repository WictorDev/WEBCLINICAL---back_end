/*
  Warnings:

  - You are about to drop the column `availableSlots` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `totalSlots` on the `Schedule` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[scheduleId]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appointmentId]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `Appointment_scheduleId_fkey`;

-- DropIndex
DROP INDEX `Appointment_scheduleId_fkey` ON `Appointment`;

-- AlterTable
ALTER TABLE `Appointment` MODIFY `scheduleId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Schedule` DROP COLUMN `availableSlots`,
    DROP COLUMN `totalSlots`,
    ADD COLUMN `appointmentId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Appointment_scheduleId_key` ON `Appointment`(`scheduleId`);

-- CreateIndex
CREATE UNIQUE INDEX `Schedule_appointmentId_key` ON `Schedule`(`appointmentId`);

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_scheduleId_fkey` FOREIGN KEY (`scheduleId`) REFERENCES `Schedule`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
