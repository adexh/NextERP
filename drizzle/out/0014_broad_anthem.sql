CREATE TABLE IF NOT EXISTS "hrm"."auth_code" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "hrm"."auth_code_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"code" integer NOT NULL,
	"expiresAt" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "auth_code_code_unique" UNIQUE("code")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hrm"."auth_code" ADD CONSTRAINT "auth_code_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "hrm"."user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "auth_code_code_key" ON "hrm"."auth_code" USING btree ("code");