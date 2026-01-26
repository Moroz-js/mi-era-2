import { Header, Footer } from "../../src/components/ui";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { getStaticPage } from "@/lib/db/static-pages";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = generatePageMetadata('privacy');

// Force dynamic rendering to avoid DB access during build
export const dynamic = "force-dynamic";

export default async function PrivacyPolicy() {
  // Fetch page content from database
  const page = await getStaticPage('privacy');

  // If page doesn't exist in database, show 404
  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-brand-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-16 bg-brand-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-heading text-brand-black mb-8">
                {page.title}
              </h1>
              
              {/* Render HTML content from database */}
              <div 
                className="prose prose-lg max-w-none font-body text-brand-black"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
              
              <p className="text-sm text-gray-600 mt-8">
                Last updated: {new Date(page.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
