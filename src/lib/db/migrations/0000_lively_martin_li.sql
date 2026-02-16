CREATE TABLE IF NOT EXISTS "consent_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" varchar(255) NOT NULL,
	"analytics" boolean NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "waitlist_emails" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"confirmed" boolean DEFAULT false NOT NULL,
	CONSTRAINT "waitlist_emails_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$
BEGIN
	IF NOT EXISTS (
		SELECT 1
		FROM pg_constraint
		WHERE conname = 'waitlist_emails_email_unique'
	) THEN
		ALTER TABLE "waitlist_emails"
			ADD CONSTRAINT "waitlist_emails_email_unique" UNIQUE("email");
	END IF;
END $$;
