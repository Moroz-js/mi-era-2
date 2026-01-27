import { Header, Footer } from "../../src/components/ui";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { generateBlog } from "@/lib/seo/structured-data";
import type { Metadata } from "next";
import { db } from "@/lib/db/client";
import { blogPosts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

// Force dynamic rendering to avoid DB access during build
export const dynamic = "force-dynamic";

export const metadata: Metadata = generatePageMetadata('blog');

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  featuredImage: string | null;
  createdAt: Date;
}

async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const posts = await db
      .select({
        id: blogPosts.id,
        slug: blogPosts.slug,
        title: blogPosts.title,
        excerpt: blogPosts.excerpt,
        featuredImage: blogPosts.featuredImage,
        createdAt: blogPosts.createdAt,
      })
      .from(blogPosts)
      .where(eq(blogPosts.status, 'published'))
      .orderBy(desc(blogPosts.createdAt));

    return posts;
  } catch (error) {
    console.error('Error fetching published posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const publishedPosts = await getPublishedPosts();

  // Generate structured data for the blog listing page
  const structuredData = generateBlog(
    publishedPosts.map((post) => ({
      slug: post.slug,
      title: post.title,
      createdAt: post.createdAt,
    }))
  );

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
        <section className="bg-brand-violet py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-white mb-6"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Blog
              </h1>
              <p 
                className="text-lg md:text-xl text-brand-white/90"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Insights on motivation, productivity, and mental wellness for teenagers
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            {publishedPosts.length === 0 ? (
              <div className="text-center py-12">
                <p 
                  className="text-xl text-gray-600"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  No blog posts yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {publishedPosts.map((post) => (
                  <Link 
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block"
                  >
                    <article 
                      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col cursor-pointer"
                    >
                      {/* Image */}
                      <div className="relative h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex-shrink-0">
                        {post.featuredImage ? (
                          <img 
                            src={post.featuredImage} 
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <h3 
                              className="text-white text-xl font-bold px-6 text-center"
                              style={{ fontFamily: 'var(--font-body)' }}
                            >
                              {post.title}
                            </h3>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 mb-3">
                          <span 
                            className="text-sm text-gray-500"
                            style={{ fontFamily: 'var(--font-body)' }}
                          >
                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                        </div>

                        <h2 
                          className="text-xl font-bold text-brand-black mb-3"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {post.title}
                        </h2>

                        {post.excerpt && (
                          <p 
                            className="text-gray-600 text-sm mb-4 leading-relaxed"
                            style={{ fontFamily: 'var(--font-body)' }}
                          >
                            {post.excerpt}
                          </p>
                        )}

                        <span 
                          className="text-brand-violet font-semibold text-sm hover:text-brand-yellow transition-colors mt-auto"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          Read More →
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
