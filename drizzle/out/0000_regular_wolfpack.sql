-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE SCHEMA "hrm";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hrm"."_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hrm"."user" (
	"id" serial PRIMARY KEY NOT NULL,
	"f_name" varchar(200),
	"l_name" varchar(200),
	"username" varchar(200),
	"contact" varchar(16),
	"email" text NOT NULL,
	"password" varchar(50),
	"org_email" varchar(100),
	"address" text,
	"active_status" boolean DEFAULT true NOT NULL,
	"role_id" integer,
	"emailVerified" timestamp(3),
	"profileComplete" boolean DEFAULT false NOT NULL,
	"as_client_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hrm"."role_modules_map" (
	"id" serial PRIMARY KEY NOT NULL,
	"module_id" integer NOT NULL,
	"role_id" integer NOT NULL,
	"active_status" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hrm"."roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"role_name" text NOT NULL,
	"active_status" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hrm"."modules" (
	"id" serial PRIMARY KEY NOT NULL,
	"module_name" text NOT NULL,
	"parent_id" integer,
	"active_status" boolean NOT NULL,
	"icon" text,
	"path" text,
	"display_order" integer DEFAULT 0 NOT NULL,
	"group_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hrm"."projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"start_date" timestamp(3),
	"expected_start_date" timestamp(3) NOT NULL,
	"expected_end_date" timestamp(3) NOT NULL,
	"completion_status" integer,
	"end_date" timestamp(3),
	"status" text DEFAULT 'Pending' NOT NULL,
	"team_lead" integer,
	"budget" integer NOT NULL,
	"actual_cost" integer NOT NULL,
	"issues" text,
	"notes" text,
	"documents" text[],
	"created_date" timestamp(3) NOT NULL,
	"last_updated_date" timestamp(3) NOT NULL,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hrm"."clients" (
	"id" serial PRIMARY KEY NOT NULL,
	"login_id" integer,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"org_name" text,
	"contact" text NOT NULL,
	"email" text,
	"address" text,
	"city" text,
	"state" text,
	"country" text,
	"pincode" text,
	"dob" text,
	"gender" text,
	"user_id" integer,
	"service_provider_ids" integer[]
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hrm"."employees" (
	"id" serial PRIMARY KEY NOT NULL,
	"login_id" integer,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"org_email" text NOT NULL,
	"contact" integer NOT NULL,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"country" text NOT NULL,
	"pincode" text NOT NULL,
	"dob" timestamp(3) NOT NULL,
	"gender" text NOT NULL,
	"doj" timestamp(3) NOT NULL,
	"dor" timestamp(3),
	"designation" text NOT NULL,
	"salary_id" integer NOT NULL,
	"employer_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hrm"."module_group" (
	"id" serial PRIMARY KEY NOT NULL,
	"group_name" text NOT NULL,
	"icon" text NOT NULL,
	"active_status" boolean NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hrm"."VerificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hrm"."Account" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hrm"."Session" (
	"id" text PRIMARY KEY NOT NULL,
	"sessionToken" text NOT NULL,
	"userId" integer NOT NULL,
	"expires" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hrm"."_UserClients" (
	"A" integer NOT NULL,
	"B" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hrm"."BackendPermission" (
	"id" serial PRIMARY KEY NOT NULL,
	"endpoint" text NOT NULL,
	"method" text NOT NULL,
	"roleId" integer NOT NULL,
	"active_status" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hrm"."_ClientProjects" (
	"A" integer NOT NULL,
	"B" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hrm"."_employeesToprojects" (
	"A" integer NOT NULL,
	"B" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "hrm"."roles"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."role_modules_map" ADD CONSTRAINT "role_modules_map_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "hrm"."modules"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."role_modules_map" ADD CONSTRAINT "role_modules_map_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "hrm"."roles"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."modules" ADD CONSTRAINT "modules_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "hrm"."modules"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."modules" ADD CONSTRAINT "modules_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "hrm"."module_group"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."projects" ADD CONSTRAINT "projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "hrm"."user"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."clients" ADD CONSTRAINT "clients_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "hrm"."user"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."employees" ADD CONSTRAINT "employees_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "hrm"."user"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "hrm"."user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "hrm"."user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."_UserClients" ADD CONSTRAINT "_UserClients_A_fkey" FOREIGN KEY ("A") REFERENCES "hrm"."clients"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."_UserClients" ADD CONSTRAINT "_UserClients_B_fkey" FOREIGN KEY ("B") REFERENCES "hrm"."user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."BackendPermission" ADD CONSTRAINT "BackendPermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "hrm"."roles"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."_ClientProjects" ADD CONSTRAINT "_ClientProjects_A_fkey" FOREIGN KEY ("A") REFERENCES "hrm"."projects"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."_ClientProjects" ADD CONSTRAINT "_ClientProjects_B_fkey" FOREIGN KEY ("B") REFERENCES "hrm"."user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."_employeesToprojects" ADD CONSTRAINT "_employeesToprojects_A_fkey" FOREIGN KEY ("A") REFERENCES "hrm"."employees"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."_employeesToprojects" ADD CONSTRAINT "_employeesToprojects_B_fkey" FOREIGN KEY ("B") REFERENCES "hrm"."projects"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_as_client_id_key" ON "hrm"."user" USING btree ("as_client_id" int4_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_email_key" ON "hrm"."user" USING btree ("email" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "roles_role_name_key" ON "hrm"."roles" USING btree ("role_name" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "modules_icon_key" ON "hrm"."modules" USING btree ("icon" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "modules_path_key" ON "hrm"."modules" USING btree ("path" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "projects_name_key" ON "hrm"."projects" USING btree ("name" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "clients_login_id_key" ON "hrm"."clients" USING btree ("login_id" int4_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "clients_user_id_key" ON "hrm"."clients" USING btree ("user_id" int4_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "module_group_icon_key" ON "hrm"."module_group" USING btree ("icon" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_identifier_token_key" ON "hrm"."VerificationToken" USING btree ("identifier" text_ops,"token" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_token_key" ON "hrm"."VerificationToken" USING btree ("token" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Account_provider_providerAccountId_key" ON "hrm"."Account" USING btree ("provider" text_ops,"providerAccountId" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Session_sessionToken_key" ON "hrm"."Session" USING btree ("sessionToken" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "_UserClients_AB_unique" ON "hrm"."_UserClients" USING btree ("A" int4_ops,"B" int4_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "_UserClients_B_index" ON "hrm"."_UserClients" USING btree ("B" int4_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "BackendPermission_endpoint_key" ON "hrm"."BackendPermission" USING btree ("endpoint" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "_ClientProjects_AB_unique" ON "hrm"."_ClientProjects" USING btree ("A" int4_ops,"B" int4_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "_ClientProjects_B_index" ON "hrm"."_ClientProjects" USING btree ("B" int4_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "_employeesToprojects_AB_unique" ON "hrm"."_employeesToprojects" USING btree ("A" int4_ops,"B" int4_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "_employeesToprojects_B_index" ON "hrm"."_employeesToprojects" USING btree ("B" int4_ops);
*/