import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { staticPages } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { validateSession } from '@/lib/admin/session';

const VALID_SLUGS = ['about', 'privacy', 'terms'] as const;
type ValidSlug = typeof VALID_SLUGS[number];

function isValidSlug(slug: string): slug is ValidSlug {
  return VALID_SLUGS.includes(slug as ValidSlug);
}

// GET /api/admin/pages/[slug] - Get static page content
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Validate session
    const sessionToken = request.cookies.get('admin_session')?.value;
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const session = await validateSession(sessionToken);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { slug } = await params;

    // Validate slug
    if (!isValidSlug(slug)) {
      return NextResponse.json(
        { error: 'Invalid page slug. Must be one of: about, privacy, terms' },
        { status: 400 }
      );
    }

    // Fetch page from database
    const [page] = await db
      .select()
      .from(staticPages)
      .where(eq(staticPages.slug, slug))
      .limit(1);

    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      page: {
        id: page.id,
        slug: page.slug,
        title: page.title,
        content: page.content,
        updatedAt: page.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error('Error fetching static page:', error);
    return NextResponse.json(
      { error: 'Failed to fetch page' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/pages/[slug] - Update static page content
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Validate session
    const sessionToken = request.cookies.get('admin_session')?.value;
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const session = await validateSession(sessionToken);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { slug } = await params;

    // Validate slug
    if (!isValidSlug(slug)) {
      return NextResponse.json(
        { error: 'Invalid page slug. Must be one of: about, privacy, terms' },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { title, content } = body;

    // Validate required fields
    if (!title || typeof title !== 'string' || !title.trim()) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    if (!content || typeof content !== 'string' || !content.trim()) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    // Validate title length
    if (title.length > 255) {
      return NextResponse.json(
        { error: 'Title must be 255 characters or less' },
        { status: 400 }
      );
    }

    // Update page in database
    const [updatedPage] = await db
      .update(staticPages)
      .set({
        title: title.trim(),
        content: content.trim(),
        updatedAt: new Date(),
      })
      .where(eq(staticPages.slug, slug))
      .returning();

    if (!updatedPage) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      page: {
        id: updatedPage.id,
        slug: updatedPage.slug,
        title: updatedPage.title,
        content: updatedPage.content,
        updatedAt: updatedPage.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error('Error updating static page:', error);
    return NextResponse.json(
      { error: 'Failed to update page' },
      { status: 500 }
    );
  }
}
