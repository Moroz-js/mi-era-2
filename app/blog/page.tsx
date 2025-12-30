'use client';

import { Header, Footer } from "../../src/components/ui";
import Link from "next/link";

interface BlogPost {
  slug: string;
  category: string;
  categoryColor: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
}

export default function BlogPage() {
  const blogPosts: BlogPost[] = [
    {
      slug: "how-to-build-good-habits",
      category: "Habits",
      categoryColor: "bg-purple-200 text-purple-700",
      date: "February 1, 2024",
      title: "How to Build Good Habits Without Forcing Yourself",
      excerpt: "Discover the science of habit formation and learn how to create lasting positive changes without willpower or force.",
      image: "/placeholders/blog-habits.png",
    },
    {
      slug: "how-to-deal-with-anxiety",
      category: "Mental Health",
      categoryColor: "bg-blue-200 text-blue-700",
      date: "January 25, 2024",
      title: "How to Deal with Anxiety and Pressure as a Teen",
      excerpt: "Practical techniques to manage stress, anxiety, and pressure from school, social situations, and expectations.",
      image: "/placeholders/blog-anxiety.png",
    },
    {
      slug: "how-to-get-everything-done",
      category: "Productivity",
      categoryColor: "bg-pink-200 text-pink-700",
      date: "January 20, 2024",
      title: "How to Get Everything Done Without Feeling Overwhelmed",
      excerpt: "Learn effective time management techniques and prioritization strategies to handle your workload without stress.",
      image: "/placeholders/blog-productivity.png",
    },
    {
      slug: "how-to-stay-motivated",
      category: "Motivation",
      categoryColor: "bg-purple-200 text-purple-700",
      date: "January 15, 2024",
      title: "How to Stay Motivated When You Don't Feel Like Doing Anything",
      excerpt: "Discover practical strategies to overcome lack of motivation and get back on track with your goals.",
      image: "/placeholders/blog-motivation.png",
    },
  ];

  return (
    <div className="min-h-screen bg-brand-white flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-brand-violet py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-white mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {blogPosts.map((post) => (
                <Link 
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block"
                >
                  <article 
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 h-full cursor-pointer"
                  >
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-purple-400 to-purple-600">
                    <div className="absolute top-4 left-4">
                      <span 
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${post.categoryColor}`}
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 
                        className="text-white text-xl font-bold px-6 text-center"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {post.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span 
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${post.categoryColor}`}
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {post.category}
                      </span>
                      <span 
                        className="text-sm text-gray-500"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {post.date}
                      </span>
                    </div>

                    <h2 
                      className="text-xl font-bold text-brand-black mb-3"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {post.title}
                    </h2>

                    <p 
                      className="text-gray-600 text-sm mb-4 leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {post.excerpt}
                    </p>

                    <span 
                      className="text-brand-violet font-semibold text-sm hover:text-brand-yellow transition-colors"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      Read More →
                    </span>
                  </div>
                </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
