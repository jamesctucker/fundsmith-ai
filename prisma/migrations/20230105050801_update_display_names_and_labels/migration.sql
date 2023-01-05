/*
  Warnings:

  - You are about to drop the column `displayName` on the `Parameter` table. All the data in the column will be lost.
  - Added the required column `displayName` to the `ContentModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayLabel` to the `Parameter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContentModel" ADD COLUMN     "displayName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Parameter" DROP COLUMN "displayName",
ADD COLUMN     "displayLabel" TEXT NOT NULL;
