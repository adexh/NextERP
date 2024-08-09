ALTER TABLE "hrm"."user" ALTER COLUMN "tenant_id" DROP NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_tenant_id_key" ON "hrm"."user" USING btree ("tenant_id");