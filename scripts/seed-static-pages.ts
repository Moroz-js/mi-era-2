import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import { staticPages } from '../src/lib/db/schema';

dotenv.config();

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/mi_era';

async function seedStaticPages() {
  const client = postgres(connectionString);
  const db = drizzle(client);

  console.log('Seeding static pages...');

  try {
    // Insert initial static pages
    await db.insert(staticPages).values([
      {
        slug: 'about',
        title: 'About Us',
        content: '<h1>About mi-Era</h1><p>This is a placeholder for the About Us page content.</p>',
      },
      {
        slug: 'privacy',
        title: 'Privacy Policy',
        content: '<h1>Privacy Policy</h1><p>This is a placeholder for the Privacy Policy content.</p>',
      },
      {
        slug: 'terms',
        title: 'Terms and Conditions',
        content: '<h1>Terms and Conditions</h1><p>This is a placeholder for the Terms and Conditions content.</p>',
      },
    ]).onConflictDoNothing();

    console.log('✓ Static pages seeded successfully');
  } catch (error) {
    console.error('Error seeding static pages:', error);
    throw error;
  } finally {
    await client.end();
  }
}

seedStaticPages()
  .then(() => {
    console.log('Seed completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  });
