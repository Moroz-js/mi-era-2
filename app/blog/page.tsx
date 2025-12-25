import { Header, Footer } from "../../src/components/ui";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-brand-white flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-16 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
            Blog
          </h1>
          <p className="text-lg mb-4" style={{ fontFamily: 'var(--font-body)' }}>
            Blog content will be added later.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
