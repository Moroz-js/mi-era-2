'use client';

import React from 'react';
import { WaitlistForm } from '../ui/WaitlistForm';

interface DownloadCTAProps {
  heading: string;
  subheading?: string;
}

export function DownloadCTA({ heading, subheading }: DownloadCTAProps) {
  return (
    <section id="waitlist-form" className="py-16 md:py-24 bg-brand-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-brand-black"
            style={{ fontFamily: 'var(--font-body)' }}
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
          
          {/* Waitlist Form */}
          <div className="mb-12">
            <WaitlistForm />
          </div>
          
          <div className="grid w-full grid-cols-2 items-center gap-2 sm:flex sm:justify-center sm:gap-4">
            <a 
              href="#" 
              className="flex h-[clamp(2.75rem,13vw,3.5rem)] min-w-0 items-center justify-center transition-opacity hover:opacity-80"
              aria-label="Download on the App Store"
            >
              <img 
                src="/assets/app-store-badge.svg" 
                alt="Download on the App Store"
                className="h-full max-w-full w-auto object-contain"
              />
            </a>
            
            <a 
              href="#" 
              className="flex h-[clamp(2.75rem,13vw,3.5rem)] min-w-0 items-center justify-center transition-opacity hover:opacity-80"
              aria-label="Get it on Google Play"
            >
              <img 
                src="/assets/google-play-badge.svg" 
                alt="Get it on Google Play"
                className="h-full max-w-full w-auto object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
