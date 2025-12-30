'use client';

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  heading: string;
  items: FAQItem[];
}

export function FAQ({ heading, items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-brand-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-brand-black"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {heading}
          </h2>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {items.map((item, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full text-left px-6 py-4 bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between gap-4"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 
                    className="text-lg md:text-xl font-bold text-brand-black"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.question}
                  </h3>
                  
                  {/* Expand/Collapse Icon */}
                  <svg
                    className="flex-shrink-0 w-4 h-4 text-brand-violet transition-transform duration-200"
                    style={{ 
                      transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Answer */}
                {openIndex === index && (
                  <div 
                    id={`faq-answer-${index}`}
                    className="px-6 py-4 bg-gray-50 border-t border-gray-200"
                  >
                    <p 
                      className="text-base md:text-lg text-gray-700 leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
