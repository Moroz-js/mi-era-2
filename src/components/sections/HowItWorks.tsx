import React from 'react';

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
  return (
    <section className="bg-brand-violet py-16 md:py-24 relative overflow-hidden">
      {/* Decorative stars */}
      <span className="absolute top-[12%] left-[7%] text-3xl opacity-35">⭐</span>
      <span className="absolute top-[25%] right-[9%] text-5xl opacity-35 hidden md:inline">⭐</span>
      <span className="absolute bottom-[15%] left-[4%] text-4xl opacity-35">⭐</span>
      <span className="absolute bottom-[8%] right-[11%] text-2xl opacity-35 hidden md:inline">⭐</span>
      <span className="absolute top-[50%] right-[3%] text-3xl opacity-35 hidden md:inline">⭐</span>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
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
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <h3 
                    className="text-xl md:text-2xl font-bold text-brand-white mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
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
      </div>
    </section>
  );
}
