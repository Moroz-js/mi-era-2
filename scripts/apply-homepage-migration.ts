import postgres from 'postgres';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';

dotenv.config();

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/mi_era';

async function applyMigration() {
  const client = postgres(connectionString);

  console.log('Applying homepage_sections migration...');

  try {
    // Read the SQL from migration file
    const sql = readFileSync(
      join(__dirname, '../src/lib/db/migrations/0002_slow_ironclad.sql'),
      'utf-8'
    );

    // Execute the SQL (CREATE TABLE IF NOT EXISTS would be better but drizzle generates without it)
    try {
      await client.unsafe(sql);
      console.log('✓ Migration applied successfully');
    } catch (error: any) {
      if (error.message?.includes('already exists')) {
        console.log('✓ Table already exists, skipping');
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error('Error applying migration:', error);
    throw error;
  } finally {
    await client.end();
  }
}

applyMigration()
  .then(() => {
    console.log('Migration complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
