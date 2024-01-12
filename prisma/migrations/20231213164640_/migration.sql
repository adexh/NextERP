-- AlterTable
ALTER TABLE "modules" ADD COLUMN     "group_id" INTEGER;

-- CreateTable
CREATE TABLE "module_group" (
    "id" SERIAL NOT NULL,
    "group_name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "active_status" BOOLEAN NOT NULL,
    "display_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "module_group_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "module_group_icon_key" ON "module_group"("icon");

-- AddForeignKey
ALTER TABLE "modules" ADD CONSTRAINT "modules_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "module_group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
