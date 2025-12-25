# Database Migration Testing Guide

This guide explains how to test database migrations for the mi-Era landing page.

## Prerequisites

1. Docker Desktop installed and running
2. Node.js and npm installed
3. `.env` file configured with `DATABASE_URL`

## Quick Start

### 1. Start PostgreSQL with Docker Compose

```bash
docker-compose up -d postgres
```

This will:
- Start PostgreSQL 16 on port 5432
- Create database `mi_era`
- Use credentials: `postgres/postgres`

### 2. Verify PostgreSQL is Running

```bash
docker ps
```

You should see `mi-era-postgres` container running.

### 3. Run Migration Test Script

```bash
npm install
npm run db:test-migration
```

This script will:
- Connect to the database
- Run all migrations
- Verify table structures
- Check constraints
- Display results

## Expected Output

```
🔄 Connecting to database...
📍 Connection: postgresql://postgres:****@localhost:5432/mi_era
🚀 Running migrations...
✅ Migrations completed successfully!

🔍 Verifying tables...
📋 Tables found:
  - consent_logs
  - waitlist_emails

📊 waitlist_emails structure:
  - id: integer NOT NULL
  - email: character varying NOT NULL
  - created_at: timestamp without time zone NOT NULL
  - confirmed: boolean NOT NULL

📊 consent_logs structure:
  - id: integer NOT NULL
  - session_id: character varying NOT NULL
  - analytics: boolean NOT NULL
  - timestamp: timestamp without time zone NOT NULL

🔒 Constraints on waitlist_emails:
  - waitlist_emails_email_unique: UNIQUE

✨ All verifications passed!
```

## Manual Migration Commands

### Generate New Migration (after schema changes)

```bash
npm run db:generate
```

### Push Schema to Database (development only)

```bash
npm run db:push
```

### Open Drizzle Studio (database GUI)

```bash
npm run db:studio
```

## Verification Checklist

- [x] `waitlist_emails` table exists
- [x] `waitlist_emails` has fields: id, email, createdAt, confirmed
- [x] `waitlist_emails.email` has UNIQUE constraint
- [x] `consent_logs` table exists
- [x] `consent_logs` has fields: id, sessionId, analytics, timestamp
- [x] All timestamp fields have default NOW()
- [x] All NOT NULL constraints are applied

## Troubleshooting

### Docker not running

**Error**: `error during connect: ... dockerDesktopLinuxEngine`

**Solution**: Start Docker Desktop application

### Port 5432 already in use

**Error**: `port is already allocated`

**Solution**: 
```bash
# Stop existing PostgreSQL
docker-compose down

# Or use different port in docker-compose.yml
ports:
  - "5433:5432"
```

### Connection refused

**Error**: `ECONNREFUSED`

**Solution**: Wait for PostgreSQL to be ready
```bash
docker-compose logs postgres
```

Look for: `database system is ready to accept connections`

### Migration already applied

**Error**: Migration already exists

**Solution**: This is normal. Drizzle tracks applied migrations and skips them.

## Database Schema

### waitlist_emails

| Column     | Type                        | Constraints           |
|------------|-----------------------------|-----------------------|
| id         | serial                      | PRIMARY KEY           |
| email      | varchar(255)                | NOT NULL, UNIQUE      |
| created_at | timestamp                   | NOT NULL, DEFAULT NOW |
| confirmed  | boolean                     | NOT NULL, DEFAULT false |

**Purpose**: Store email addresses for early access waitlist

**Requirements**: 11.3

### consent_logs

| Column     | Type                        | Constraints           |
|------------|-----------------------------|-----------------------|
| id         | serial                      | PRIMARY KEY           |
| session_id | varchar(255)                | NOT NULL              |
| analytics  | boolean                     | NOT NULL              |
| timestamp  | timestamp                   | NOT NULL, DEFAULT NOW |

**Purpose**: Log user consent choices for GDPR compliance

**Requirements**: 13.5

## Production Deployment

For production deployment on VPS:

1. Ensure PostgreSQL is running in Docker
2. Set `DATABASE_URL` in production `.env`
3. Run migrations:
   ```bash
   npm run db:test-migration
   ```
4. Verify tables exist before starting the app

## Next Steps

After successful migration testing:
- Proceed to Task 3: Core UI Components
- Implement API routes that use these tables
- Write property-based tests for database operations
