'use client';

import Script from "next/script";

interface StructuredDataScriptsProps {
  faqItems: Array<{ question: string; answer: string }>;
}

export function StructuredDataScripts({ faqItems }: StructuredDataScriptsProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return (
    <>
      {/* Organization Schema */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'mi-Era',
            url: baseUrl,
            logo: `${baseUrl}/assets/logo.png`,
            description: 'A mobile task-tracking app with AI assistant designed for teenagers aged 13-18. Own your era with no guilt, no pressure - just growth.',
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'no-reply@mi-era.org',
              contactType: 'Customer Service',
            },
          }),
        }}
      />
      
      {/* Website Schema */}
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'mi-Era',
            url: baseUrl,
            description: 'A reliable space where teens can grow',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${baseUrl}/blog?search={search_term_string}`,
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      
      {/* FAQ Schema */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </>
  );
}
