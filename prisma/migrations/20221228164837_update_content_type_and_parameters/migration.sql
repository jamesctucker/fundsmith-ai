-- AlterTable
ALTER TABLE "ContentType" ALTER COLUMN "rules" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Parameter" ALTER COLUMN "rules" DROP NOT NULL,
ALTER COLUMN "options" SET DEFAULT '[]';
