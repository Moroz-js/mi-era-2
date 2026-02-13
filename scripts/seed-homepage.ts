import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import { homepageSections } from '../src/lib/db/schema';
import { defaultHomepageData } from '../src/lib/homepage-defaults';

dotenv.config();

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/mi_era';

async function seedHomepage() {
  const client = postgres(connectionString);
  const db = drizzle(client);

  console.log('Seeding homepage sections...');

  try {
    // Insert all default sections
    const sections = Object.entries(defaultHomepageData).map(([key, content]) => ({
      sectionKey: key,
      content: content as any, // JSONB content
    }));

    await db.insert(homepageSections).values(sections).onConflictDoNothing();

    console.log('✓ Homepage sections seeded successfully');
    console.log(`  Inserted sections: ${sections.map(s => s.sectionKey).join(', ')}`);
  } catch (error) {
    console.error('Error seeding homepage sections:', error);
    throw error;
  } finally {
    await client.end();
  }
}

seedHomepage()
  .then(() => {
    console.log('Homepage seed completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Homepage seed failed:', error);
    process.exit(1);
  });
