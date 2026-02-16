import React from 'react';
import { AbstractVisual } from '../ui/AbstractVisual';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  screenshot: {
    src: string;
    alt: string;
    frameColor: string;
  };
  layout: 'left' | 'right';
}

interface KeyFeaturesProps {
  heading: string;
  subheading: string;
  features: Feature[];
}

export function KeyFeatures({ heading, subheading, features }: KeyFeaturesProps) {
  return (
    <section className="bg-brand-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-black mb-4"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {heading}
          </h2>
          <p 
            className="text-lg md:text-xl text-gray-600"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {subheading}
          </p>
        </div>

        {/* Feature Blocks */}
        <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`flex flex-col ${
                feature.layout === 'left' 
                  ? 'md:flex-row-reverse' 
                  : 'md:flex-row'
              } gap-8 md:gap-12 items-center`}
            >
              {/* Text Content */}
              <div className="flex-1 space-y-4">
                {/* Icon and Title - vertical on mobile, horizontal on desktop */}
                <div className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-2">
                  {feature.icon}
                  <h3 
                    className="text-2xl md:text-3xl font-bold text-brand-black text-center md:text-left"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {feature.title}
                  </h3>
                </div>

                {/* Description */}
                <p 
                  className="text-base md:text-lg text-gray-600 text-center md:text-left"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {feature.description}
                </p>
              </div>

              {/* Screenshot */}
              <div className="w-3/5 md:flex-1 flex justify-center">
                <div className="rounded-lg overflow-hidden w-full max-w-xs md:max-w-xs aspect-[9/19.5] shadow-lg">
                  {feature.screenshot.src ? (
                    <img
                      src={feature.screenshot.src}
                      alt={feature.screenshot.alt}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <AbstractVisual 
                      variant={index === 0 ? 'adaptive' : index === 1 ? 'emotional' : 'growth'} 
                      className="w-full h-full"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
