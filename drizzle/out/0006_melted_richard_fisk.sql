ALTER TABLE "hrm"."user" ALTER COLUMN "tenant_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "hrm"."user" ALTER COLUMN "tenant_id" DROP DEFAULT;