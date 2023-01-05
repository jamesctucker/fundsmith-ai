/*
  Warnings:

  - Added the required column `displayName` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayName` to the `Parameter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "displayName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Parameter" ADD COLUMN     "displayName" TEXT NOT NULL;
