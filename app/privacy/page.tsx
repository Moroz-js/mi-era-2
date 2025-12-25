'use client';

import { Header, Footer } from "../../src/components/ui";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-brand-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-16 bg-brand-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-heading text-brand-black mb-8">
                Privacy Policy
              </h1>
              
              <div className="prose prose-lg max-w-none font-body text-brand-black">
                <p className="text-xl mb-6">
                  [Privacy Policy content will be added here]
                </p>
                
                <p className="mb-6">
                  This is a placeholder for the mi-Era Privacy Policy. The actual privacy policy content will be provided by the legal team and inserted here.
                </p>
                
                <p className="mb-6">
                  The privacy policy will cover:
                </p>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>What data we collect and why</li>
                  <li>How we protect your information</li>
                  <li>Your rights regarding your data</li>
                  <li>Cookie usage and tracking</li>
                  <li>Third-party services</li>
                  <li>Data retention policies</li>
                  <li>GDPR compliance</li>
                  <li>Contact information for privacy concerns</li>
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
