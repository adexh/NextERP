/*
  Warnings:

  - You are about to drop the column `client_id` on the `projects` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_client_id_fkey";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "client_id",
ADD COLUMN     "user_id" INTEGER;

-- CreateTable
CREATE TABLE "_ClientProjects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_employeesToprojects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClientProjects_AB_unique" ON "_ClientProjects"("A", "B");

-- CreateIndex
CREATE INDEX "_ClientProjects_B_index" ON "_ClientProjects"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_employeesToprojects_AB_unique" ON "_employeesToprojects"("A", "B");

-- CreateIndex
CREATE INDEX "_employeesToprojects_B_index" ON "_employeesToprojects"("B");

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClientProjects" ADD CONSTRAINT "_ClientProjects_A_fkey" FOREIGN KEY ("A") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClientProjects" ADD CONSTRAINT "_ClientProjects_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_employeesToprojects" ADD CONSTRAINT "_employeesToprojects_A_fkey" FOREIGN KEY ("A") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_employeesToprojects" ADD CONSTRAINT "_employeesToprojects_B_fkey" FOREIGN KEY ("B") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
