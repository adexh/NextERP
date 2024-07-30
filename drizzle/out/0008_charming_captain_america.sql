ALTER TABLE "hrm"."role_modules_map" ADD COLUMN "tenant_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."role_modules_map" ADD CONSTRAINT "role_modules_map_tenant_id_user_tenant_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "hrm"."user"("tenant_id") ON DELETE set null ON UPDATE restrict;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
