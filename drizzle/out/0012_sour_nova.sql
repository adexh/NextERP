CREATE TABLE IF NOT EXISTS "hrm"."actions_group" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "hrm"."actions_group_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"group_name" varchar(300) NOT NULL,
	CONSTRAINT "actions_group_group_name_unique" UNIQUE("group_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hrm"."actions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "hrm"."actions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"action_name" varchar(200) NOT NULL,
	"group_id" integer,
	"active_status" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hrm"."actions_roles_map" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "hrm"."actions_roles_map_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"action_id" integer NOT NULL,
	"role_id" integer NOT NULL,
	"tenant_id" text NOT NULL,
	"active_status" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
ALTER TABLE "hrm"."Account" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "hrm"."Account_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "hrm"."Session" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "hrm"."Session_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."actions" ADD CONSTRAINT "actions_group_id_actions_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "hrm"."actions_group"("id") ON DELETE set null ON UPDATE restrict;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."actions_roles_map" ADD CONSTRAINT "actions_roles_map_action_id_actions_id_fk" FOREIGN KEY ("action_id") REFERENCES "hrm"."actions"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."actions_roles_map" ADD CONSTRAINT "actions_roles_map_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "hrm"."roles"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."actions_roles_map" ADD CONSTRAINT "actions_roles_map_tenant_id_user_tenant_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "hrm"."user"("tenant_id") ON DELETE set null ON UPDATE restrict;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "action_name_key" ON "hrm"."actions" USING btree ("action_name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "actions_roles_unique_key" ON "hrm"."actions_roles_map" USING btree ("action_id","role_id","tenant_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "role_modules_unique_key" ON "hrm"."role_modules_map" USING btree ("module_id","role_id","tenant_id");