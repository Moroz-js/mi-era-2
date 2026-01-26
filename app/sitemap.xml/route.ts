import { generateSitemap } from '@/lib/seo/sitemap';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const sitemap = await generateSitemap();

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
