'use client';

import React from 'react';
import { Button } from '../ui/Button';

interface DownloadCTAProps {
  heading: string;
  subheading?: string;
  ctaText: string;
  onCtaClick: () => void;
}

export function DownloadCTA({ heading, subheading, ctaText, onCtaClick }: DownloadCTAProps) {
  return (
    <section className="py-16 md:py-24 bg-brand-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-brand-black"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {heading}
          </h2>
          
          {subheading && (
            <p 
              className="text-lg md:text-xl text-brand-black mb-8 max-w-2xl mx-auto"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {subheading}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              variant="primary"
              size="lg"
              onClick={onCtaClick}
            >
              {ctaText}
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-brand-white border-2 border-brand-black rounded-lg px-6 py-3 min-w-[200px]">
              <p 
                className="text-brand-black font-semibold"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                App Store placeholder
              </p>
            </div>
            
            <div className="bg-brand-white border-2 border-brand-black rounded-lg px-6 py-3 min-w-[200px]">
              <p 
                className="text-brand-black font-semibold"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Google Play placeholder
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
