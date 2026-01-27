import { Header, Footer } from "../../../src/components/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db/client";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { generateBlogMetadata } from "@/lib/seo/metadata";
import { generateBlogPosting } from "@/lib/seo/structured-data";
import type { Metadata } from "next";

// Force dynamic rendering to avoid DB access during build
export const dynamic = "force-dynamic";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (posts.length === 0) {
      return null;
    }

    const post = posts[0];

    // Return 404 for draft posts
    if (post.status !== 'published') {
      return null;
    }

    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return generateBlogMetadata(post);
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Generate structured data for the blog post
  const structuredData = generateBlogPosting(post);

  return (
    <div className="min-h-screen bg-brand-white flex flex-col">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-brand-violet py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-white mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {post.title}
              </h1>
              
              {post.excerpt && (
                <p 
                  className="text-lg md:text-xl text-brand-white/90 mb-6"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {post.excerpt}
                </p>
              )}

              <p 
                className="text-sm text-brand-white/80"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Featured Image */}
              {post.featuredImage && (
                <div className="mb-8">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full rounded-lg"
                  />
                </div>
              )}

              {/* Article Content */}
              <article 
                className="prose prose-lg max-w-none"
                style={{ fontFamily: 'var(--font-body)' }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Back to Blog */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <Link 
                  href="/blog"
                  className="inline-flex items-center text-brand-violet font-semibold hover:text-brand-yellow transition-colors"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  ← Back to Blog
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
