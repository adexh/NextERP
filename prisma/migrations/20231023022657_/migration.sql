-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "login_id" INTEGER,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "org_name" TEXT,
    "contact" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "pincode" TEXT,
    "dob" TEXT,
    "gender" TEXT,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "expected_start_date" TIMESTAMP(3) NOT NULL,
    "expected_end_date" TIMESTAMP(3) NOT NULL,
    "completion_status" INTEGER,
    "end_date" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "team_lead" INTEGER,
    "budget" INTEGER NOT NULL,
    "actual_cost" INTEGER NOT NULL,
    "issues" TEXT,
    "notes" TEXT,
    "documents" TEXT[],
    "created_date" TIMESTAMP(3) NOT NULL,
    "last_updated_date" TIMESTAMP(3) NOT NULL,
    "client_id" INTEGER NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "login_id" INTEGER,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "org_email" TEXT NOT NULL,
    "contact" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "doj" TIMESTAMP(3) NOT NULL,
    "dor" TIMESTAMP(3),
    "designation" TEXT NOT NULL,
    "salary_id" INTEGER NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
