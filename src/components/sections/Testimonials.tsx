import React from 'react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface TestimonialsProps {
  heading: string;
  testimonials: Testimonial[];
}

export function Testimonials({ heading, testimonials }: TestimonialsProps) {
  return (
    <section className="py-16 md:py-24 bg-brand-white">
      <div className="container mx-auto px-4">
        <h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 text-brand-black"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {heading}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-brand-white border-2 border-brand-black rounded-lg p-6 md:p-8 flex flex-col"
            >
              <p 
                className="text-base md:text-lg text-brand-black mb-6 flex-grow"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              
              <div className="border-t-2 border-brand-black pt-4">
                <p 
                  className="font-semibold text-brand-black mb-1"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {testimonial.author}
                </p>
                <p 
                  className="text-sm text-brand-black opacity-70"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
