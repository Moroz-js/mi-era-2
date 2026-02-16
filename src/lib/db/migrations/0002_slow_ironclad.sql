CREATE TABLE IF NOT EXISTS "homepage_sections" (
	"id" serial PRIMARY KEY NOT NULL,
	"section_key" varchar(50) NOT NULL,
	"content" jsonb NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "homepage_sections_section_key_unique" UNIQUE("section_key")
);
--> statement-breakpoint
DO $$ BEGIN
	IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'homepage_sections_section_key_unique') THEN
		ALTER TABLE "homepage_sections"
			ADD CONSTRAINT "homepage_sections_section_key_unique" UNIQUE("section_key");
	END IF;
END $$;
