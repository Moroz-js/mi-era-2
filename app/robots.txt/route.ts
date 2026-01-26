import { NextResponse } from 'next/server';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

export async function GET() {
  const robotsTxt = `# mi-Era robots.txt
User-agent: *
Allow: /

# Disallow admin routes
Disallow: /admin/

# Sitemap location
Sitemap: ${BASE_URL}/sitemap.xml
`;

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
