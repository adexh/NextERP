/*
  Warnings:

  - A unique constraint covering the columns `[path]` on the table `modules` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[icon]` on the table `modules` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `icon` to the `modules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `modules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "modules" ADD COLUMN     "icon" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL,
ALTER COLUMN "parent_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "modules_path_key" ON "modules"("path");

-- CreateIndex
CREATE UNIQUE INDEX "modules_icon_key" ON "modules"("icon");
