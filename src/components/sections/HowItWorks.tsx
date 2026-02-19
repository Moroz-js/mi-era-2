'use client';

import React from 'react';
import { Button } from '../ui/Button';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface HowItWorksProps {
  heading: string;
  steps: Step[];
}

export function HowItWorks({ heading, steps }: HowItWorksProps) {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="bg-brand-violet py-16 md:py-24 relative overflow-hidden">
      {/* Decorative stars */}
      <img src="/assets/star-1.png" alt="" className="absolute top-[12%] left-[7%] w-8 h-8 opacity-35" />
      <img src="/assets/star-3.png" alt="" className="absolute top-[25%] right-[9%] w-12 h-12 opacity-35 hidden md:inline" />
      <img src="/assets/star-2.png" alt="" className="hidden md:block absolute bottom-[15%] left-[4%] opacity-35" style={{ width: '60px', height: '30px' }} />
      <img src="/assets/star-1.png" alt="" className="absolute bottom-[8%] right-[11%] w-6 h-6 opacity-35 hidden md:inline" />
      <img src="/assets/star-3.png" alt="" className="absolute top-[50%] right-[3%] w-8 h-8 opacity-35 hidden md:inline" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-white mb-4"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {heading}
          </h2>
        </div>

        {/* Steps */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            {steps.map((step) => (
              <div 
                key={step.number}
                className="flex flex-col gap-4 items-start h-full"
              >
                {/* Step Number */}
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-yellow flex items-center justify-center mb-2"
                >
                  <span 
                    className="text-2xl font-bold text-brand-black"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <h3 
                    className="text-xl md:text-2xl font-bold text-brand-white mb-2"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className="text-base md:text-lg text-brand-white opacity-90"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button onClick={scrollToWaitlist} className="bg-brand-yellow text-brand-black hover:bg-brand-yellow transition-colors duration-200 hover:text-brand-white focus:ring-brand-violet px-6 py-3 text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer">
              Join the waitlist
          </button>
        </div>
      </div>
    </section>
  );
}
