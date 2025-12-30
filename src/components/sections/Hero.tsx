'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { AbstractVisual } from '../ui/AbstractVisual';

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
    <section className="bg-brand-white text-brand-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div>
            {/* Tagline with star */}
            <div className="flex items-center gap-2 mb-6">
              <img src="/assets/star-1.png" alt="star" className="w-6 h-6" />
              <p 
                className="text-sm md:text-base font-medium text-brand-black"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Made for teens, by people who get it
              </p>
            </div>

            {/* Heading */}
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-brand-black"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {heading}
            </h1>

            {/* Subheading */}
            <p 
              className="text-lg md:text-xl mb-8 text-brand-black"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {subheading}
            </p>

            {/* CTA Button */}
            <Button 
              variant="primary" 
              size="lg"
              onClick={handleCTAClick}
            >
              {ctaText}
            </Button>
          </div>

          {/* Right Column - App Screenshots with Abstract Visuals */}
          <div className="relative h-[500px] md:h-[600px]">
            {/* Journal Screenshot - Bottom Left */}
            <div 
              className="absolute bottom-0 left-0 w-[45%] h-[55%] rounded-2xl shadow-lg border-4 border-white overflow-hidden"
            >
              <AbstractVisual variant="emotional" className="w-full h-full" />
            </div>

            {/* App Screenshot - Top Center */}
            <div 
              className="absolute top-0 left-[25%] w-[50%] h-[65%] rounded-2xl shadow-lg border-4 border-white overflow-hidden z-10"
            >
              <AbstractVisual variant="adaptive" className="w-full h-full" />
            </div>

            {/* AI Chat Screenshot - Right */}
            <div 
              className="absolute top-[15%] right-0 w-[48%] h-[70%] rounded-2xl shadow-lg border-4 border-white overflow-hidden"
            >
              <AbstractVisual variant="balance" className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
