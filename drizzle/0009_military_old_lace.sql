ALTER TABLE "hrm"."Account" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "hrm"."Session" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "hrm"."user" ALTER COLUMN "f_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "hrm"."user" ALTER COLUMN "tenant_id" SET NOT NULL;