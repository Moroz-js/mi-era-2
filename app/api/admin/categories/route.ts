import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { blogCategories } from '@/lib/db/schema';

// GET /api/admin/categories - List all categories
export async function GET() {
  try {
    const categories = await db.select().from(blogCategories);

    return NextResponse.json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST /api/admin/categories - Create new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Category name is required' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Create category
    const [category] = await db
      .insert(blogCategories)
      .values({
        name: name.trim(),
        slug,
      })
      .returning();

    return NextResponse.json({
      success: true,
      category,
    });
  } catch (error: any) {
    console.error('Failed to create category:', error);
    
    // Handle unique constraint violation
    if (error.code === '23505') {
      return NextResponse.json(
        { success: false, error: 'Category with this name already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
