ALTER TABLE "hrm"."Session" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "hrm"."role_modules_map" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "hrm"."employees" ADD COLUMN "tenant_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "hrm"."projects" ADD COLUMN "tenant_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."employees" ADD CONSTRAINT "employees_tenant_id_user_tenant_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "hrm"."user"("tenant_id") ON DELETE set null ON UPDATE restrict;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."projects" ADD CONSTRAINT "projects_tenant_id_user_tenant_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "hrm"."user"("tenant_id") ON DELETE set null ON UPDATE restrict;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
