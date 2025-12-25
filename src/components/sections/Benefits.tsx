import React from 'react';

interface BenefitCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface BenefitsProps {
  heading: string;
  benefits: BenefitCard[];
}

export function Benefits({ heading, benefits }: BenefitsProps) {
  return (
    <section className="bg-brand-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-brand-black"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {heading}
          </h2>

          {/* Benefit Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-brand-light-gray transition-colors duration-200"
              >
                {/* Icon */}
                <div className="mb-4 text-brand-violet">
                  {benefit.icon}
                </div>

                {/* Title */}
                <h3 
                  className="text-xl md:text-2xl font-bold mb-3 text-brand-black"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {benefit.title}
                </h3>

                {/* Description */}
                <p 
                  className="text-base md:text-lg text-gray-600"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
