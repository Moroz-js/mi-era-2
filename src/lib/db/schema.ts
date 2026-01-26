import { pgTable, serial, varchar, timestamp, boolean, text, integer } from 'drizzle-orm/pg-core';

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

// Blog Posts table
export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  featuredImage: varchar('featured_image', { length: 500 }),
  status: varchar('status', { length: 20 }).notNull().default('draft'), // 'draft' | 'published'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Blog Categories table
export const blogCategories = pgTable('blog_categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Blog Tags table
export const blogTags = pgTable('blog_tags', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Blog Post Categories junction table (many-to-many)
export const blogPostCategories = pgTable('blog_post_categories', {
  id: serial('id').primaryKey(),
  postId: integer('post_id').notNull().references(() => blogPosts.id, { onDelete: 'cascade' }),
  categoryId: integer('category_id').notNull().references(() => blogCategories.id, { onDelete: 'cascade' }),
});

// Blog Post Tags junction table (many-to-many)
export const blogPostTags = pgTable('blog_post_tags', {
  id: serial('id').primaryKey(),
  postId: integer('post_id').notNull().references(() => blogPosts.id, { onDelete: 'cascade' }),
  tagId: integer('tag_id').notNull().references(() => blogTags.id, { onDelete: 'cascade' }),
});

// Static Pages table
export const staticPages = pgTable('static_pages', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 100 }).notNull().unique(), // 'about', 'privacy', 'terms'
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Admin Sessions table
export const adminSessions = pgTable('admin_sessions', {
  id: serial('id').primaryKey(),
  sessionToken: varchar('session_token', { length: 255 }).notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
