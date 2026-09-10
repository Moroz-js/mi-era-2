'use client';

import React from 'react';
import { SiteCtaButton } from '../ui/SiteCta';
import { StoreBadges } from '../ui/StoreBadges';

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
          
          <div className="mb-12">
            <SiteCtaButton variant="primary" size="lg" />
          </div>
          
          <StoreBadges align="center" />
        </div>
      </div>
    </section>
  );
}
