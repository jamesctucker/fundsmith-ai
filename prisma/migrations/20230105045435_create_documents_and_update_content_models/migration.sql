/*
  Warnings:

  - You are about to drop the column `displayLabel` on the `Parameter` table. All the data in the column will be lost.
  - You are about to drop the column `isRequired` on the `Parameter` table. All the data in the column will be lost.
  - You are about to drop the `ContentType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ContentTypeToParameter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ContentTypeToParameter" DROP CONSTRAINT "_ContentTypeToParameter_A_fkey";

-- DropForeignKey
ALTER TABLE "_ContentTypeToParameter" DROP CONSTRAINT "_ContentTypeToParameter_B_fkey";

-- AlterTable
ALTER TABLE "Parameter" DROP COLUMN "displayLabel",
DROP COLUMN "isRequired",
ADD COLUMN     "required" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "ContentType";

-- DropTable
DROP TABLE "_ContentTypeToParameter";

-- CreateTable
CREATE TABLE "ContentModel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "position" INTEGER DEFAULT 0,
    "rules" JSONB DEFAULT '{}',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContentModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "savedVariants" JSONB DEFAULT '[]',
    "savedResponses" JSONB DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contentModelId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ContentModelToParameter" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ContentModelToParameter_AB_unique" ON "_ContentModelToParameter"("A", "B");

-- CreateIndex
CREATE INDEX "_ContentModelToParameter_B_index" ON "_ContentModelToParameter"("B");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_contentModelId_fkey" FOREIGN KEY ("contentModelId") REFERENCES "ContentModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentModelToParameter" ADD CONSTRAINT "_ContentModelToParameter_A_fkey" FOREIGN KEY ("A") REFERENCES "ContentModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentModelToParameter" ADD CONSTRAINT "_ContentModelToParameter_B_fkey" FOREIGN KEY ("B") REFERENCES "Parameter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
