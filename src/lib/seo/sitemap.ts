import { db } from '@/lib/db/client';
import { blogPosts } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

/**
 * Generate sitemap entries for all public pages and published blog posts
 */
export async function generateSitemapEntries(): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = [];

  // Static pages
  entries.push({
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  entries.push({
    url: `${BASE_URL}/about`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  });

  entries.push({
    url: `${BASE_URL}/privacy`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  });

  entries.push({
    url: `${BASE_URL}/terms`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  });

  entries.push({
    url: `${BASE_URL}/blog`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  });

  // Published blog posts
  try {
    const publishedPosts = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.status, 'published'));

    for (const post of publishedPosts) {
      entries.push({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    // Continue with static pages even if blog posts fail
  }

  return entries;
}

/**
 * Generate sitemap XML string
 */
export async function generateSitemap(): Promise<string> {
  const entries = await generateSitemapEntries();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified.toISOString()}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return xml;
}
