import { db } from './client';
import { staticPages } from './schema';
import { eq } from 'drizzle-orm';

export interface StaticPageData {
  id: number;
  slug: string;
  title: string;
  content: string;
  updatedAt: Date;
}

/**
 * Fetch a static page by slug from the database
 * @param slug - The page slug ('about', 'privacy', or 'terms')
 * @returns The static page data or null if not found
 */
export async function getStaticPage(slug: string): Promise<StaticPageData | null> {
  try {
    const [page] = await db
      .select()
      .from(staticPages)
      .where(eq(staticPages.slug, slug))
      .limit(1);

    return page || null;
  } catch (error) {
    console.error(`Error fetching static page "${slug}":`, error);
    return null;
  }
}

/**
 * Get all static pages from the database
 * @returns Array of all static pages
 */
export async function getAllStaticPages(): Promise<StaticPageData[]> {
  try {
    const pages = await db
      .select()
      .from(staticPages)
      .orderBy(staticPages.slug);

    return pages;
  } catch (error) {
    console.error('Error fetching all static pages:', error);
    return [];
  }
}
