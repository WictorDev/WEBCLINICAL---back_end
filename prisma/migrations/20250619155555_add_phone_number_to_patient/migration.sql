/*
  Warnings:

  - Added the required column `phoneNumber` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- Primeiro adicionar a coluna como nullable
ALTER TABLE `Patient` ADD COLUMN `phoneNumber` VARCHAR(11) NULL;

-- Definir valor padrão para registros existentes
UPDATE `Patient` SET `phoneNumber` = '81999999999' WHERE `phoneNumber` IS NULL;

-- Tornar a coluna NOT NULL
ALTER TABLE `Patient` MODIFY COLUMN `phoneNumber` VARCHAR(11) NOT NULL;
