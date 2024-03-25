-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "service_provider_ids" INTEGER[];

-- CreateTable
CREATE TABLE "BackendPermission" (
    "id" SERIAL NOT NULL,
    "endpoint" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "active_status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "BackendPermission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BackendPermission_endpoint_key" ON "BackendPermission"("endpoint");

-- AddForeignKey
ALTER TABLE "BackendPermission" ADD CONSTRAINT "BackendPermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
