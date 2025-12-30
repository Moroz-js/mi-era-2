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
      {/* Decorative stars */}
      <span className="absolute top-[14%] left-[8%] text-3xl opacity-35">⭐</span>
      <span className="absolute top-[22%] right-[10%] text-4xl opacity-35 hidden md:inline">⭐</span>
      <span className="absolute bottom-[20%] left-[6%] text-5xl opacity-35">⭐</span>
      <span className="absolute bottom-[11%] right-[7%] text-2xl opacity-35 hidden md:inline">⭐</span>
      <span className="absolute top-[52%] right-[4%] text-3xl opacity-35 hidden md:inline">⭐</span>
      
      <div className="container mx-auto px-4 relative z-10">
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
          
          {/* Waitlist Form */}
          <div className="mb-12">
            <WaitlistForm />
          </div>
          
          <div className="flex flex-row gap-2 sm:gap-4 justify-center items-center flex-wrap">
            <a 
              href="#" 
              className="inline-block transition-opacity hover:opacity-80 h-10 sm:h-14"
              aria-label="Download on the App Store"
            >
              <img 
                src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83" 
                alt="Download on the App Store"
                className="h-full w-auto"
              />
            </a>
            
            <a 
              href="#" 
              className="inline-block transition-opacity hover:opacity-80 h-[62px] sm:h-auto"
              aria-label="Get it on Google Play"
            >
              <img 
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                alt="Get it on Google Play"
                className="h-full w-auto sm:hidden"
              />
              <img 
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                alt="Get it on Google Play"
                className="h-full w-auto hidden sm:block"
                style={{ height: '85px' }}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
