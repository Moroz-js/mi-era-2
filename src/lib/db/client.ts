import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/mi_era';

// Create postgres client with proper configuration for Next.js
// max: 1 prevents connection pooling issues in serverless
// idle_timeout: closes idle connections quickly
// connect_timeout: prevents hanging on connection attempts
const client = postgres(connectionString, {
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10,
});

// Create drizzle instance
export const db = drizzle(client, { schema });
