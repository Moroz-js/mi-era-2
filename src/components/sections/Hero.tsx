'use client';

import React from 'react';
import { Button } from '../ui/Button';

interface HeroProps {
  heading: string;
  subheading: string;
  ctaText: string;
  screenshots: Array<{
    src: string;
    alt: string;
    aspectRatio: string;
  }>;
}

export function Hero({ heading, subheading, ctaText, screenshots }: HeroProps) {
  const handleCTAClick = () => {
    const waitlistForm = document.getElementById('waitlist-form');
    if (waitlistForm) {
      waitlistForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="bg-brand-violet text-brand-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {heading}
          </h1>

          {/* Subheading */}
          <p 
            className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {subheading}
          </p>

          {/* CTA Button */}
          <div className="mb-12">
            <Button 
              variant="primary" 
              size="lg"
              onClick={handleCTAClick}
              className="hover:!bg-brand-white hover:!text-brand-black"
            >
              {ctaText}
            </Button>
          </div>

          {/* App Screenshots */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {screenshots.map((screenshot, index) => (
              <div 
                key={index}
                className="bg-brand-white rounded-lg p-4 flex items-center justify-center"
                style={{ aspectRatio: screenshot.aspectRatio }}
              >
                <div className="text-brand-black text-center">
                  <p className="text-sm font-medium" style={{ fontFamily: 'var(--font-body)' }}>
                    {screenshot.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
