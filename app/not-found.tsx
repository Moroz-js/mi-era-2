import Link from "next/link";
import { Header, Footer } from "../src/components/ui";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-white flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h1 
            className="text-8xl md:text-9xl font-bold text-brand-violet mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            404
          </h1>
          
          <h2 
            className="text-3xl md:text-4xl font-bold text-brand-black mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Page Not Found
          </h2>
          
          <p 
            className="text-lg text-gray-600 mb-8"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Sorry, we couldn't find the page you're looking for. 
            It might have been moved or doesn't exist.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-brand-violet text-white font-semibold rounded-lg hover:bg-brand-blue transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Go to Homepage
            </Link>
            
            <Link
              href="/blog"
              className="inline-block px-8 py-3 border-2 border-brand-violet text-brand-violet font-semibold rounded-lg hover:bg-brand-violet hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Read Our Blog
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
