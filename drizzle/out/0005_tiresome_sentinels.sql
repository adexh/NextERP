DROP TABLE "hrm"."tenants";--> statement-breakpoint
ALTER TABLE "hrm"."user" DROP CONSTRAINT "user_tenant_id_tenants_id_fk";
--> statement-breakpoint
ALTER TABLE "hrm"."user" ALTER COLUMN "tenant_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "hrm"."user" ALTER COLUMN "tenant_id" SET DEFAULT 'uuid_generate_v4()';--> statement-breakpoint
ALTER TABLE "hrm"."user" ALTER COLUMN "tenant_id" SET NOT NULL;