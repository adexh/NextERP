DROP TABLE "hrm"."actions_group";--> statement-breakpoint
DROP TABLE "hrm"."actions";--> statement-breakpoint
DROP TABLE "hrm"."actions_roles_map";--> statement-breakpoint
DROP INDEX IF EXISTS "projects_name_key";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "projects_name_key" ON "hrm"."projects" USING btree ("name","tenant_id");