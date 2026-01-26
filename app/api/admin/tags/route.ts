import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { blogTags } from '@/lib/db/schema';

// GET /api/admin/tags - List all tags
export async function GET() {
  try {
    const tags = await db.select().from(blogTags);

    return NextResponse.json({
      success: true,
      tags,
    });
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}

// POST /api/admin/tags - Create new tag
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Tag name is required' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Create tag
    const [tag] = await db
      .insert(blogTags)
      .values({
        name: name.trim(),
        slug,
      })
      .returning();

    return NextResponse.json({
      success: true,
      tag,
    });
  } catch (error: any) {
    console.error('Failed to create tag:', error);
    
    // Handle unique constraint violation
    if (error.code === '23505') {
      return NextResponse.json(
        { success: false, error: 'Tag with this name already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create tag' },
      { status: 500 }
    );
  }
}
