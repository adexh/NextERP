-- AlterTable
ALTER TABLE "user" ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "contact" DROP NOT NULL,
ALTER COLUMN "org_email" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;
