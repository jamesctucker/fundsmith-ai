/*
  Warnings:

  - Added the required column `promptName` to the `ContentModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContentModel" ADD COLUMN     "promptName" TEXT;
