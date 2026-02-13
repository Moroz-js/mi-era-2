import React from 'react';
import { Button } from '../ui/Button';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted: boolean;
  ctaText: string;
  yearlyPrice?: string;
  yearlySaving?: string;
  footnote?: string;
  isAddon?: boolean;
  addonLabel?: string;
}

interface PricingProps {
  heading: string;
  subheading?: string;
  plans: PricingPlan[];
}

export function Pricing({ heading, subheading, plans }: PricingProps) {
  return (
    <section className="py-16 md:py-24 bg-brand-violet relative overflow-hidden">
      {/* Decorative stars */}
      <img src="/assets/star-2.png" alt="" className="absolute top-[9%] left-[11%] opacity-35" style={{ width: '60px', height: '30px' }} />
      <img src="/assets/star-3.png" alt="" className="absolute top-[20%] right-[6%] w-8 h-8 opacity-35 hidden md:inline" />
      <img src="/assets/star-1.png" alt="" className="absolute bottom-[18%] left-[5%] w-6 h-6 opacity-35" />
      <img src="/assets/star-2.png" alt="" className="absolute bottom-[7%] right-[9%] opacity-35 hidden md:inline" style={{ width: '60px', height: '30px' }} />
      <img src="/assets/star-3.png" alt="" className="absolute top-[48%] left-[3%] w-8 h-8 opacity-35 hidden md:inline" />
      <img src="/assets/star-1.png" alt="" className="absolute top-[65%] right-[12%] w-12 h-12 opacity-35 hidden md:inline" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-brand-white"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {heading}
          </h2>
          {subheading && (
            <p 
              className="text-lg md:text-xl text-brand-white max-w-3xl mx-auto"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {subheading}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-start">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`rounded-lg flex flex-col ${
                plan.highlighted 
                  ? 'bg-brand-yellow border-4 border-brand-black transform md:scale-105 shadow-2xl' 
                  : 'bg-brand-white border-2 border-brand-black'
              }`}
            >
              <div className="p-8 flex flex-col flex-grow">
                {/* "Most Popular" badge */}
                {plan.highlighted && (
                  <div 
                    className="text-center mb-4 text-brand-black font-bold text-sm uppercase tracking-wide"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Most Popular
                  </div>
                )}
                
                {/* Plan name */}
                <h3 
                  className={`text-2xl md:text-3xl font-bold mb-4 text-brand-black ${
                    plan.isAddon ? 'flex items-center gap-2' : ''
                  }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {plan.isAddon && (
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-brand-yellow rounded-full text-base">
                      ⚡
                    </span>
                  )}
                  {plan.name}
                </h3>
                
                {/* Price */}
                <div className="mb-1">
                  <span 
                    className="text-4xl md:text-5xl font-bold text-brand-black"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {plan.price}
                  </span>
                  <span 
                    className="text-lg ml-2 text-brand-black opacity-70"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {plan.period}
                  </span>
                </div>

                {/* Yearly price alternative */}
                {plan.yearlyPrice && (
                  <p 
                    className="text-sm text-brand-black opacity-60 mb-4"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    or {plan.yearlyPrice}/year{plan.yearlySaving && ` (Save ${plan.yearlySaving})`}
                  </p>
                )}

                {/* Add-on label (golden) */}
                {plan.addonLabel && (
                  <p 
                    className="text-sm font-semibold italic text-brand-yellow mb-4"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {plan.addonLabel}
                  </p>
                )}

                {!plan.yearlyPrice && !plan.addonLabel && <div className="mb-4" />}
                
                {/* Features */}
                <ul className="mb-8 flex-grow space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex}
                      className="flex items-start text-brand-black"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      <span className={`mr-2 mt-1 font-bold ${
                        plan.highlighted ? 'text-brand-black' : 'text-brand-yellow'
                      }`}>
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA Button */}
                <Button 
                  variant={plan.highlighted ? 'primary' : plan.isAddon ? 'primary' : 'secondary'}
                  size="lg"
                  className={`w-full ${
                    plan.highlighted 
                      ? '!bg-brand-white !text-brand-black hover:!bg-brand-violet hover:!text-brand-white' 
                      : plan.isAddon
                        ? '!bg-brand-violet !text-brand-white hover:!bg-brand-yellow hover:!text-brand-black'
                        : 'hover:!bg-brand-violet hover:!text-brand-white'
                  }`}
                >
                  {plan.ctaText}
                </Button>

                {/* Footnote */}
                {plan.footnote && (
                  <p 
                    className="text-xs text-brand-black opacity-50 text-center mt-4"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {plan.footnote}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
