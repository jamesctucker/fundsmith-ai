-- CreateEnum
CREATE TYPE "DisplayType" AS ENUM ('TEXT', 'TEXTAREA', 'SELECT', 'RADIO', 'CHECKBOX');

-- CreateTable
CREATE TABLE "ContentType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "position" INTEGER DEFAULT 0,
    "rules" JSONB NOT NULL DEFAULT '{}',
    "isLive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parameter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "displayLabel" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "rules" JSONB NOT NULL DEFAULT '{}',
    "placeholder" TEXT,
    "displayType" "DisplayType" NOT NULL DEFAULT 'TEXT',
    "options" JSONB DEFAULT '{}',
    "position" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Parameter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ContentTypeToParameter" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ContentTypeToParameter_AB_unique" ON "_ContentTypeToParameter"("A", "B");

-- CreateIndex
CREATE INDEX "_ContentTypeToParameter_B_index" ON "_ContentTypeToParameter"("B");

-- AddForeignKey
ALTER TABLE "_ContentTypeToParameter" ADD CONSTRAINT "_ContentTypeToParameter_A_fkey" FOREIGN KEY ("A") REFERENCES "ContentType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentTypeToParameter" ADD CONSTRAINT "_ContentTypeToParameter_B_fkey" FOREIGN KEY ("B") REFERENCES "Parameter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
