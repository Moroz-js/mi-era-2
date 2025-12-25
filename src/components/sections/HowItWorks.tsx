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
    <section className="bg-brand-violet py-16 md:py-24">
      <div className="container mx-auto px-4">
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
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {steps.map((step) => (
              <div 
                key={step.number}
                className="flex gap-4 items-start"
              >
                {/* Step Number */}
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-yellow flex items-center justify-center"
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
