-- DropIndex
DROP INDEX "clients_first_name_last_name_key";

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "employer_id" INTEGER;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
