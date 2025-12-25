# mi-Era Landing Page - Setup Guide

## Prerequisites

- Node.js 20+ installed
- Docker and Docker Compose installed
- npm or yarn package manager

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and update with your credentials:

```bash
cp .env.example .env
```

Edit `.env` and configure:
- Database connection (default works with Docker Compose)
- Google SMTP credentials for email sending
- Base URL for your deployment

### 3. Start PostgreSQL Database

```bash
docker-compose up -d postgres
```

This will start PostgreSQL on `localhost:5432`.

### 4. Generate and Run Database Migrations

```bash
npm run db:generate
npm run db:push
```

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Database Management

### View Database with Drizzle Studio

```bash
npm run db:studio
```

This opens a web interface to browse your database at `https://local.drizzle.studio`.

### Generate New Migrations

After modifying `src/lib/db/schema.ts`:

```bash
npm run db:generate
npm run db:push
```

## Docker Deployment

### Build and Run with Docker Compose

```bash
docker-compose up -d
```

This will:
1. Start PostgreSQL database
2. Build the Next.js application
3. Run the application on port 3000

### Stop Services

```bash
docker-compose down
```

### View Logs

```bash
docker-compose logs -f app
```

## Google Fonts Configuration

The application uses:
- **Special Gothic Expanded** for headings (loaded via Google Fonts link in layout)
- **Lexend** for body text (loaded via Next.js font optimization)

Both fonts are configured with `display=swap` for optimal loading performance.

## Brand Colors

The following brand colors are configured in `app/globals.css`:

**Primary:**
- Yellow: #FFD700
- Violet: #915AFF
- Red: #FE2C2B

**Secondary:**
- Blue: #3755F0
- Green: #57BD2D
- Orange: #FF7B1C

**Neutral:**
- Black: #000000
- White: #FFFFFF
- Light Gray: #E6E6E6
- Gray: #BDBDBD

## Troubleshooting

### Database Connection Issues

If you can't connect to PostgreSQL:
1. Ensure Docker is running: `docker ps`
2. Check PostgreSQL logs: `docker-compose logs postgres`
3. Verify DATABASE_URL in `.env` matches your setup

### Font Loading Issues

If fonts don't load:
1. Check browser console for CORS errors
2. Verify Google Fonts API is accessible
3. Clear browser cache and reload

### Build Errors

If build fails:
1. Delete `.next` folder: `rm -rf .next`
2. Clear node_modules: `rm -rf node_modules && npm install`
3. Check TypeScript errors: `npm run lint`
