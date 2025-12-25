import { pgTable, serial, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';

export const waitlistEmails = pgTable('waitlist_emails', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  confirmed: boolean('confirmed').default(false).notNull(),
});

export const consentLogs = pgTable('consent_logs', {
  id: serial('id').primaryKey(),
  sessionId: varchar('session_id', { length: 255 }).notNull(),
  analytics: boolean('analytics').notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});
