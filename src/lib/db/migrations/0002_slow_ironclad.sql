CREATE TABLE "homepage_sections" (
	"id" serial PRIMARY KEY NOT NULL,
	"section_key" varchar(50) NOT NULL,
	"content" jsonb NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "homepage_sections_section_key_unique" UNIQUE("section_key")
);
