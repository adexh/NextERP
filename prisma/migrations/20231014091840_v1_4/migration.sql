-- AlterTable
ALTER TABLE "modules" ADD COLUMN     "display_order" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "role_modules_map" ADD CONSTRAINT "role_modules_map_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_modules_map" ADD CONSTRAINT "role_modules_map_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
