DROP TABLE "hrm"."module_group";--> statement-breakpoint
ALTER TABLE "hrm"."modules" DROP CONSTRAINT "modules_group_id_module_group_id_fk";
--> statement-breakpoint
ALTER TABLE "hrm"."modules" DROP COLUMN IF EXISTS "group_id";