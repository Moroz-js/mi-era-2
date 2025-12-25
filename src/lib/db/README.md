# Database Configuration

This directory contains the database schema, client configuration, and migrations for the mi-Era landing page.

## Files

- `schema.ts` - Drizzle ORM schema definitions for all database tables
- `client.ts` - Database client configuration and connection
- `migrations/` - Generated SQL migration files

## Database Schema

### Tables

#### waitlist_emails
Stores email addresses from the waitlist signup form.

| Column | Type | Constraints |
|--------|------|-------------|
| id | serial | PRIMARY KEY |
| email | varchar(255) | NOT NULL, UNIQUE |
| createdAt | timestamp | NOT NULL, DEFAULT NOW() |
| confirmed | boolean | NOT NULL, DEFAULT false |

#### consent_logs
Stores user consent choices for analytics tracking (GDPR compliance).

| Column | Type | Constraints |
|--------|------|-------------|
| id | serial | PRIMARY KEY |
| sessionId | varchar(255) | NOT NULL |
| analytics | boolean | NOT NULL |
| timestamp | timestamp | NOT NULL, DEFAULT NOW() |

## Usage

### Testing Migrations (Recommended First Step)

Before starting development, test that migrations work correctly:

**Windows (PowerShell):**
```powershell
.\scripts\test-db-setup.ps1
```

**Windows (Command Prompt):**
```cmd
scripts\test-db-setup.bat
```

**Manual Testing:**
```bash
# 1. Start PostgreSQL
docker-compose up -d postgres

# 2. Wait for it to be ready (check logs)
docker-compose logs postgres

# 3. Run migration test
npm run db:test-migration
```

See [MIGRATION_TESTING.md](./MIGRATION_TESTING.md) for detailed testing guide.

### Generating Migrations

After modifying `schema.ts`, generate a new migration:

```bash
npm run db:generate
```

### Applying Migrations

Push migrations to the database:

```bash
npm run db:push
```

### Viewing Database

Open Drizzle Studio to browse the database:

```bash
npm run db:studio
```

## Querying the Database

Import the database client in your code:

```typescript
import { db } from '@/lib/db/client';
import { waitlistEmails } from '@/lib/db/schema';

// Insert a new email
await db.insert(waitlistEmails).values({
  email: 'user@example.com',
});

// Query emails
const emails = await db.select().from(waitlistEmails);
```

## Connection String

The database connection is configured via the `DATABASE_URL` environment variable.

Default (Docker Compose):
```
postgresql://postgres:postgres@localhost:5432/mi_era
```

For production, update this in your `.env` file with your actual database credentials.
