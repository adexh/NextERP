/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "role_name" TEXT NOT NULL,
    "active_status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "f_name" VARCHAR(200) NOT NULL,
    "l_name" VARCHAR(200) NOT NULL,
    "username" VARCHAR(200) NOT NULL,
    "contact" VARCHAR(16) NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "org_email" VARCHAR(100) NOT NULL,
    "address" TEXT NOT NULL,
    "active_status" BOOLEAN NOT NULL DEFAULT true,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modules" (
    "id" SERIAL NOT NULL,
    "module_name" TEXT NOT NULL,
    "parent_id" INTEGER NOT NULL,
    "active_status" BOOLEAN NOT NULL,

    CONSTRAINT "modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_modules_map" (
    "id" SERIAL NOT NULL,
    "module_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "active_status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "role_modules_map_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_role_name_key" ON "roles"("role_name");
