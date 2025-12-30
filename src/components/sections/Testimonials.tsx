import React from 'react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

interface TestimonialsProps {
  heading: string;
  testimonials: Testimonial[];
}

export function Testimonials({ heading, testimonials }: TestimonialsProps) {
  return (
    <section className="py-16 md:py-24 bg-brand-white relative overflow-hidden">
      {/* Decorative stars */}
      <img src="/assets/star-3.png" alt="" className="absolute top-[5%] md:top-[10%] left-[6%] w-10 h-10 opacity-35 z-0" />
      <img src="/assets/star-1.png" alt="" className="absolute top-[18%] right-[8%] w-6 h-6 opacity-35 hidden md:inline z-0" />
      <img src="/assets/star-2.png" alt="" className="absolute bottom-[25%] left-[10%] opacity-35 z-0" style={{ width: '60px', height: '30px' }} />
      <img src="/assets/star-3.png" alt="" className="absolute bottom-[12%] right-[5%] w-12 h-12 opacity-35 hidden md:inline z-0" />
      <img src="/assets/star-1.png" alt="" className="absolute top-[55%] left-[4%] w-8 h-8 opacity-35 hidden md:inline z-0" />
      <img src="/assets/star-2.png" alt="" className="absolute top-[70%] right-[7%] opacity-35 hidden md:inline z-0" style={{ width: '60px', height: '30px' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 text-brand-black"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {heading}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="rounded-2xl p-6 md:p-8 flex flex-col"
            >
              {/* Avatar and Author Info */}
              <div className="flex items-center gap-4 mb-4">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
                  {testimonial.avatar ? (
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
                  )}
                </div>
                
                {/* Name and Role */}
                <div>
                  <p 
                    className="font-bold text-brand-black text-lg"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {testimonial.author}
                  </p>
                  <p 
                    className="text-sm text-gray-600"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
              
              {/* Quote */}
              <p 
                className="text-base md:text-lg text-brand-black leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
