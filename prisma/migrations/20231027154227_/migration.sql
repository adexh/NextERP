/*
  Warnings:

  - A unique constraint covering the columns `[login_id]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[first_name,last_name]` on the table `clients` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "clients_login_id_key" ON "clients"("login_id");

-- CreateIndex
CREATE UNIQUE INDEX "clients_first_name_last_name_key" ON "clients"("first_name", "last_name");
