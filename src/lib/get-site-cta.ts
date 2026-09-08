import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/client';
import { homepageSections } from '@/lib/db/schema';
import { DEFAULT_SITE_CTA, SITE_CTA_KEY, normalizeSiteCta, type SiteCta } from '@/lib/site-cta';

export async function getSiteCta(): Promise<SiteCta> {
  if (!process.env.DATABASE_URL) {
    return DEFAULT_SITE_CTA;
  }

  try {
    const [section] = await db
      .select()
      .from(homepageSections)
      .where(eq(homepageSections.sectionKey, SITE_CTA_KEY));

    if (section) {
      return normalizeSiteCta(section.content);
    }
  } catch (error) {
    console.error('Failed to load site CTA settings:', error);
  }

  return DEFAULT_SITE_CTA;
}
