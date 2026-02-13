import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { homepageSections } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { validateSession } from '@/lib/admin/session';
import { cookies } from 'next/headers';

/**
 * GET /api/admin/homepage/[key]
 * Returns content for a specific homepage section
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;
    
    const [section] = await db
      .select()
      .from(homepageSections)
      .where(eq(homepageSections.sectionKey, key));
    
    if (!section) {
      return NextResponse.json(
        { success: false, error: 'Section not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      section: {
        key: section.sectionKey,
        content: section.content,
        updatedAt: section.updatedAt,
      },
    });
  } catch (error) {
    console.error('Error fetching homepage section:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch section' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/homepage/[key]
 * Updates or creates content for a specific homepage section
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('admin_session')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const isValid = await validateSession(sessionToken);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    const { key } = await params;
    const body = await request.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json(
        { success: false, error: 'Content is required' },
        { status: 400 }
      );
    }

    // Check if section exists
    const [existing] = await db
      .select()
      .from(homepageSections)
      .where(eq(homepageSections.sectionKey, key));

    if (existing) {
      // Update existing section
      await db
        .update(homepageSections)
        .set({
          content,
          updatedAt: new Date(),
        })
        .where(eq(homepageSections.sectionKey, key));
    } else {
      // Insert new section
      await db.insert(homepageSections).values({
        sectionKey: key,
        content,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Section updated successfully',
    });
  } catch (error) {
    console.error('Error updating homepage section:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update section' },
      { status: 500 }
    );
  }
}
