import React from 'react';
import { StarIcon } from '../icons/StarIcon';

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
            style={{ fontFamily: 'var(--font-heading)' }}
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
                {/* Icon */}
                <div className="flex justify-center md:justify-start">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 
                  className="text-2xl md:text-3xl font-bold text-brand-black text-center md:text-left"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p 
                  className="text-base md:text-lg text-gray-600 text-center md:text-left"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {feature.description}
                </p>
              </div>

              {/* Screenshot with Frame */}
              <div className="flex-1 flex justify-center">
                <div 
                  className={`border-4 rounded-lg p-6 bg-gray-50 max-w-sm w-full`}
                  style={{ borderColor: feature.screenshot.frameColor }}
                >
                  <div className="bg-brand-white rounded-lg p-8 flex items-center justify-center aspect-[9/16]">
                    <p 
                      className="text-brand-black text-center text-sm"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {feature.screenshot.alt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
