import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { blogPosts, blogPostCategories, blogPostTags, blogCategories, blogTags } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

// GET /api/admin/blog - List all blog posts
export async function GET() {
  try {
    const posts = await db
      .select()
      .from(blogPosts)
      .orderBy(desc(blogPosts.createdAt));

    // Fetch categories and tags for each post
    const postsWithRelations = await Promise.all(
      posts.map(async (post) => {
        // Get categories
        const postCategories = await db
          .select({
            id: blogCategories.id,
            name: blogCategories.name,
            slug: blogCategories.slug,
          })
          .from(blogPostCategories)
          .innerJoin(blogCategories, eq(blogPostCategories.categoryId, blogCategories.id))
          .where(eq(blogPostCategories.postId, post.id));

        // Get tags
        const postTags = await db
          .select({
            id: blogTags.id,
            name: blogTags.name,
            slug: blogTags.slug,
          })
          .from(blogPostTags)
          .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
          .where(eq(blogPostTags.postId, post.id));

        return {
          ...post,
          categories: postCategories,
          tags: postTags,
        };
      })
    );

    return NextResponse.json({
      success: true,
      posts: postsWithRelations,
      total: postsWithRelations.length,
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST /api/admin/blog - Create new blog post
export async function POST(request: NextRequest) {
  try {
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

    // Check if slug already exists
    const existingPost = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (existingPost.length > 0) {
      return NextResponse.json(
        { success: false, error: 'A post with this slug already exists' },
        { status: 400 }
      );
    }

    // Create the blog post
    const [newPost] = await db
      .insert(blogPosts)
      .values({
        title,
        slug,
        excerpt: excerpt || null,
        content,
        featuredImage: featuredImage || null,
        status: status || 'draft',
      })
      .returning();

    // Handle categories
    if (categoryIds && Array.isArray(categoryIds) && categoryIds.length > 0) {
      await db.insert(blogPostCategories).values(
        categoryIds.map((categoryId: number) => ({
          postId: newPost.id,
          categoryId,
        }))
      );
    }

    // Handle tags
    if (tagIds && Array.isArray(tagIds) && tagIds.length > 0) {
      await db.insert(blogPostTags).values(
        tagIds.map((tagId: number) => ({
          postId: newPost.id,
          tagId,
        }))
      );
    }

    return NextResponse.json({
      success: true,
      post: newPost,
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
