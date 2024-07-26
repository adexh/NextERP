CREATE TABLE IF NOT EXISTS "hrm"."tenants" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(50),
	"name" varchar(200),
	"active_status" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
DROP TABLE "hrm"."_ClientProjects";--> statement-breakpoint
ALTER TABLE "hrm"."user" DROP CONSTRAINT "user_role_id_fkey";
--> statement-breakpoint
ALTER TABLE "hrm"."role_modules_map" DROP CONSTRAINT "role_modules_map_module_id_fkey";
--> statement-breakpoint
ALTER TABLE "hrm"."role_modules_map" DROP CONSTRAINT "role_modules_map_role_id_fkey";
--> statement-breakpoint
ALTER TABLE "hrm"."modules" DROP CONSTRAINT "modules_group_id_fkey";
--> statement-breakpoint
ALTER TABLE "hrm"."projects" DROP CONSTRAINT "projects_user_id_fkey";
--> statement-breakpoint
ALTER TABLE "hrm"."clients" DROP CONSTRAINT "clients_user_id_fkey";
--> statement-breakpoint
ALTER TABLE "hrm"."employees" DROP CONSTRAINT "employees_employer_id_fkey";
--> statement-breakpoint
ALTER TABLE "hrm"."Account" DROP CONSTRAINT "Account_userId_fkey";
--> statement-breakpoint
ALTER TABLE "hrm"."Session" DROP CONSTRAINT "Session_userId_fkey";
--> statement-breakpoint
ALTER TABLE "hrm"."_UserClients" DROP CONSTRAINT "_UserClients_A_fkey";
--> statement-breakpoint
ALTER TABLE "hrm"."_UserClients" DROP CONSTRAINT "_UserClients_B_fkey";
--> statement-breakpoint
ALTER TABLE "hrm"."BackendPermission" DROP CONSTRAINT "BackendPermission_roleId_fkey";
--> statement-breakpoint
ALTER TABLE "hrm"."_employeesToprojects" DROP CONSTRAINT "_employeesToprojects_A_fkey";
--> statement-breakpoint
ALTER TABLE "hrm"."_employeesToprojects" DROP CONSTRAINT "_employeesToprojects_B_fkey";
--> statement-breakpoint
DROP INDEX IF EXISTS "user_as_client_id_key";--> statement-breakpoint
DROP INDEX IF EXISTS "user_email_key";--> statement-breakpoint
DROP INDEX IF EXISTS "roles_role_name_key";--> statement-breakpoint
DROP INDEX IF EXISTS "modules_icon_key";--> statement-breakpoint
DROP INDEX IF EXISTS "modules_path_key";--> statement-breakpoint
DROP INDEX IF EXISTS "projects_name_key";--> statement-breakpoint
DROP INDEX IF EXISTS "clients_login_id_key";--> statement-breakpoint
DROP INDEX IF EXISTS "clients_user_id_key";--> statement-breakpoint
DROP INDEX IF EXISTS "module_group_icon_key";--> statement-breakpoint
DROP INDEX IF EXISTS "VerificationToken_identifier_token_key";--> statement-breakpoint
DROP INDEX IF EXISTS "VerificationToken_token_key";--> statement-breakpoint
DROP INDEX IF EXISTS "Account_provider_providerAccountId_key";--> statement-breakpoint
DROP INDEX IF EXISTS "Session_sessionToken_key";--> statement-breakpoint
DROP INDEX IF EXISTS "_UserClients_AB_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "_UserClients_B_index";--> statement-breakpoint
DROP INDEX IF EXISTS "BackendPermission_endpoint_key";--> statement-breakpoint
DROP INDEX IF EXISTS "_employeesToprojects_AB_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "_employeesToprojects_B_index";--> statement-breakpoint
ALTER TABLE "hrm"."user" ADD COLUMN "tenant_id" integer;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "tenants_name_key" ON "hrm"."tenants" USING btree ("name");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."user" ADD CONSTRAINT "user_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "hrm"."roles"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."user" ADD CONSTRAINT "user_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "hrm"."tenants"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."role_modules_map" ADD CONSTRAINT "role_modules_map_module_id_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "hrm"."modules"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."role_modules_map" ADD CONSTRAINT "role_modules_map_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "hrm"."roles"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."modules" ADD CONSTRAINT "modules_group_id_module_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "hrm"."module_group"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."projects" ADD CONSTRAINT "projects_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "hrm"."user"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."clients" ADD CONSTRAINT "clients_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "hrm"."user"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."employees" ADD CONSTRAINT "employees_employer_id_user_id_fk" FOREIGN KEY ("employer_id") REFERENCES "hrm"."user"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."Account" ADD CONSTRAINT "Account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "hrm"."user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."Session" ADD CONSTRAINT "Session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "hrm"."user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."_UserClients" ADD CONSTRAINT "_UserClients_A_clients_id_fk" FOREIGN KEY ("A") REFERENCES "hrm"."clients"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."_UserClients" ADD CONSTRAINT "_UserClients_B_user_id_fk" FOREIGN KEY ("B") REFERENCES "hrm"."user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."BackendPermission" ADD CONSTRAINT "BackendPermission_roleId_roles_id_fk" FOREIGN KEY ("roleId") REFERENCES "hrm"."roles"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."_employeesToprojects" ADD CONSTRAINT "_employeesToprojects_A_employees_id_fk" FOREIGN KEY ("A") REFERENCES "hrm"."employees"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."_employeesToprojects" ADD CONSTRAINT "_employeesToprojects_B_projects_id_fk" FOREIGN KEY ("B") REFERENCES "hrm"."projects"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_as_client_id_key" ON "hrm"."user" USING btree ("as_client_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_email_key" ON "hrm"."user" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "roles_role_name_key" ON "hrm"."roles" USING btree ("role_name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "modules_icon_key" ON "hrm"."modules" USING btree ("icon");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "modules_path_key" ON "hrm"."modules" USING btree ("path");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "projects_name_key" ON "hrm"."projects" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "clients_login_id_key" ON "hrm"."clients" USING btree ("login_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "clients_user_id_key" ON "hrm"."clients" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "module_group_icon_key" ON "hrm"."module_group" USING btree ("icon");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_identifier_token_key" ON "hrm"."VerificationToken" USING btree ("identifier","token");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_token_key" ON "hrm"."VerificationToken" USING btree ("token");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Account_provider_providerAccountId_key" ON "hrm"."Account" USING btree ("provider","providerAccountId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Session_sessionToken_key" ON "hrm"."Session" USING btree ("sessionToken");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "_UserClients_AB_unique" ON "hrm"."_UserClients" USING btree ("A","B");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "_UserClients_B_index" ON "hrm"."_UserClients" USING btree ("B");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "BackendPermission_endpoint_key" ON "hrm"."BackendPermission" USING btree ("endpoint");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "_employeesToprojects_AB_unique" ON "hrm"."_employeesToprojects" USING btree ("A","B");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "_employeesToprojects_B_index" ON "hrm"."_employeesToprojects" USING btree ("B");