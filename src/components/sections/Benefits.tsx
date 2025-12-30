import React from 'react';

interface BenefitCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface BenefitsProps {
  heading: string;
  subheading?: string;
  benefits: BenefitCard[];
}

export function Benefits({ heading, subheading, benefits }: BenefitsProps) {
  return (
    <section className="bg-brand-violet py-16 md:py-24 relative overflow-hidden">
      {/* Decorative stars */}
      <span className="absolute top-[8%] left-[5%] text-4xl opacity-35">⭐</span>
      <span className="absolute top-[15%] right-[12%] text-3xl opacity-35 hidden md:inline">⭐</span>
      <span className="absolute bottom-[20%] left-[8%] text-5xl opacity-35">⭐</span>
      <span className="absolute bottom-[10%] right-[6%] text-3xl opacity-35 hidden md:inline">⭐</span>
      <span className="absolute top-[45%] left-[3%] text-2xl opacity-35 hidden md:inline">⭐</span>
      <span className="absolute top-[60%] right-[4%] text-4xl opacity-35 hidden md:inline">⭐</span>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 text-brand-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {heading}
          </h2>

          {/* Subheading */}
          {subheading && (
            <p 
              className="text-lg md:text-xl text-center mb-12 text-brand-white max-w-3xl mx-auto"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {subheading}
            </p>
          )}

          {/* Benefit Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex flex-col items-start text-left p-6 rounded-lg"
                style={{ backgroundColor: '#9B6FFF' }}
              >
                {/* Icon */}
                <div className="mb-4">
                  {benefit.icon}
                </div>

                {/* Title */}
                <h3 
                  className="text-xl md:text-2xl font-bold mb-3 text-brand-white"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {benefit.title}
                </h3>

                {/* Description */}
                <p 
                  className="text-base md:text-lg text-brand-white/90"
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
