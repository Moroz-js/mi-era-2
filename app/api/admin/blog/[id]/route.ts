import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { blogPosts, blogPostCategories, blogPostTags, blogCategories, blogTags } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// PUT /api/admin/blog/[id] - Update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = parseInt(id);
    if (isNaN(postId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid post ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, slug, excerpt, content, featuredImage, status, categoryIds, tagIds } = body;

    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json(
        { success: false, error: 'Title, slug, and content are required' },
        { status: 400 }
      );
    }

    // Validate status
    if (status && status !== 'draft' && status !== 'published') {
      return NextResponse.json(
        { success: false, error: 'Status must be either "draft" or "published"' },
        { status: 400 }
      );
    }

    // Check if post exists
    const existingPost = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, postId))
      .limit(1);

    if (existingPost.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    // Check if slug is taken by another post
    if (slug !== existingPost[0].slug) {
      const slugCheck = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.slug, slug))
        .limit(1);

      if (slugCheck.length > 0) {
        return NextResponse.json(
          { success: false, error: 'A post with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Update the blog post
    const [updatedPost] = await db
      .update(blogPosts)
      .set({
        title,
        slug,
        excerpt: excerpt || null,
        content,
        featuredImage: featuredImage || null,
        status: status || 'draft',
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, postId))
      .returning();

    // Update categories - delete existing and insert new
    await db.delete(blogPostCategories).where(eq(blogPostCategories.postId, postId));
    if (categoryIds && Array.isArray(categoryIds) && categoryIds.length > 0) {
      await db.insert(blogPostCategories).values(
        categoryIds.map((categoryId: number) => ({
          postId,
          categoryId,
        }))
      );
    }

    // Update tags - delete existing and insert new
    await db.delete(blogPostTags).where(eq(blogPostTags.postId, postId));
    if (tagIds && Array.isArray(tagIds) && tagIds.length > 0) {
      await db.insert(blogPostTags).values(
        tagIds.map((tagId: number) => ({
          postId,
          tagId,
        }))
      );
    }

    return NextResponse.json({
      success: true,
      post: updatedPost,
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/blog/[id] - Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = parseInt(id);
    if (isNaN(postId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid post ID' },
        { status: 400 }
      );
    }

    // Check if post exists
    const existingPost = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, postId))
      .limit(1);

    if (existingPost.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    // Delete the post (cascade will handle categories and tags)
    await db.delete(blogPosts).where(eq(blogPosts.id, postId));

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
