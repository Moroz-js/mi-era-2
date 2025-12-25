import React from 'react';

interface StatisticsProps {
  stats: Array<{
    value: string;
    label: string;
    description: string;
  }>;
}

export function Statistics({ stats }: StatisticsProps) {
  return (
    <section className="bg-brand-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center"
              >
                {/* Large statistic value */}
                <div 
                  className="text-5xl md:text-6xl font-bold text-brand-violet mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {stat.value}
                </div>
                
                {/* Label */}
                <div 
                  className="text-lg md:text-xl font-semibold text-brand-black mb-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {stat.label}
                </div>
                
                {/* Description */}
                <p 
                  className="text-sm md:text-base text-gray-600"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
