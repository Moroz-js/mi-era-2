import { Header, Footer } from "../../src/components/ui";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { getStaticPage } from "@/lib/db/static-pages";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = generatePageMetadata('about');

// Force dynamic rendering to avoid DB access during build
export const dynamic = "force-dynamic";

export default async function AboutPage() {
  // Fetch page content from database
  const page = await getStaticPage('about');

  // If page doesn't exist in database, show 404
  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-brand-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <article className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Render HTML content from database */}
              <div 
                className="prose prose-lg max-w-none"
                style={{ fontFamily: 'var(--font-body)' }}
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
              
              <p className="text-sm text-gray-500 mt-12 pt-8 border-t border-gray-200">
                Last updated: {new Date(page.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
