'use client';

import { Header, Footer } from "../../src/components/ui";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-brand-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-16 bg-brand-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-heading text-brand-black mb-8">
                Terms of Use
              </h1>
              
              <div className="prose prose-lg max-w-none font-body text-brand-black">
                <p className="text-xl mb-6">
                  [Terms of Use content will be added here]
                </p>
                
                <p className="mb-6">
                  This is a placeholder for the mi-Era Terms of Use. The actual terms of use content will be provided by the legal team and inserted here.
                </p>
                
                <p className="mb-6">
                  The terms of use will cover:
                </p>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Acceptance of terms</li>
                  <li>User eligibility and age requirements</li>
                  <li>Account registration and security</li>
                  <li>Acceptable use policy</li>
                  <li>Intellectual property rights</li>
                  <li>User-generated content</li>
                  <li>Limitation of liability</li>
                  <li>Termination of service</li>
                  <li>Dispute resolution</li>
                  <li>Changes to terms</li>
                </ul>
                
                <p className="text-sm text-gray-600 mt-8">
                  Last updated: [Date to be added]
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
