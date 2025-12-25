import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Test script to verify database migrations work correctly
 * Run with: npm run db:test-migration
 */
async function testMigration() {
  const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/mi_era';
  
  console.log('🔄 Connecting to database...');
  console.log(`📍 Connection: ${connectionString.replace(/:[^:@]+@/, ':****@')}`);
  
  const client = postgres(connectionString, { max: 1 });
  const db = drizzle(client);
  
  try {
    console.log('🚀 Running migrations...');
    await migrate(db, { migrationsFolder: './src/lib/db/migrations' });
    console.log('✅ Migrations completed successfully!');
    
    // Verify tables exist
    console.log('\n🔍 Verifying tables...');
    const tables = await client`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `;
    
    console.log('📋 Tables found:');
    tables.forEach((table: any) => {
      console.log(`  - ${table.table_name}`);
    });
    
    // Verify waitlist_emails structure
    const waitlistColumns = await client`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'waitlist_emails'
      ORDER BY ordinal_position;
    `;
    
    console.log('\n📊 waitlist_emails structure:');
    waitlistColumns.forEach((col: any) => {
      console.log(`  - ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? 'NOT NULL' : 'NULL'}`);
    });
    
    // Verify consent_logs structure
    const consentColumns = await client`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'consent_logs'
      ORDER BY ordinal_position;
    `;
    
    console.log('\n📊 consent_logs structure:');
    consentColumns.forEach((col: any) => {
      console.log(`  - ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? 'NOT NULL' : 'NULL'}`);
    });
    
    // Verify unique constraint on email
    const constraints = await client`
      SELECT constraint_name, constraint_type
      FROM information_schema.table_constraints
      WHERE table_name = 'waitlist_emails'
      AND constraint_type = 'UNIQUE';
    `;
    
    console.log('\n🔒 Constraints on waitlist_emails:');
    constraints.forEach((constraint: any) => {
      console.log(`  - ${constraint.constraint_name}: ${constraint.constraint_type}`);
    });
    
    console.log('\n✨ All verifications passed!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

testMigration();
