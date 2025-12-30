import React from 'react';

interface AbstractVisualProps {
  variant: 'adaptive' | 'emotional' | 'noJudgment' | 'privacy' | 'growth' | 'balance' | 'step1' | 'step2' | 'step3';
  className?: string;
}

export function AbstractVisual({ variant, className = '' }: AbstractVisualProps) {
  const visuals = {
    adaptive: (
      <div className={`relative w-full h-full bg-gradient-to-br from-brand-violet to-brand-yellow rounded-2xl p-8 ${className}`}>
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-brand-white rounded-full opacity-80"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-brand-black rounded-lg opacity-20 rotate-12"></div>
        <div className="absolute top-1/2 right-1/3 text-6xl opacity-60">⭐</div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 border-4 border-brand-white rounded-full opacity-40"></div>
      </div>
    ),
    emotional: (
      <div className={`relative w-full h-full bg-gradient-to-tr from-brand-yellow to-brand-white rounded-2xl p-8 ${className}`}>
        <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-brand-violet rounded-full opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 text-7xl opacity-50">⭐</div>
        <div className="absolute top-1/4 right-1/3 w-16 h-16 bg-brand-black rounded-lg opacity-10 -rotate-12"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 border-4 border-brand-violet rounded-lg opacity-30 rotate-45"></div>
      </div>
    ),
    noJudgment: (
      <div className={`relative w-full h-full bg-gradient-to-bl from-brand-violet via-brand-violet to-brand-black rounded-2xl p-8 ${className}`}>
        <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-brand-yellow rounded-full opacity-80"></div>
        <div className="absolute bottom-1/3 left-1/3 text-6xl opacity-40">⭐</div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-4 border-brand-yellow rounded-full opacity-60"></div>
        <div className="absolute bottom-1/4 right-1/3 w-28 h-28 bg-brand-white rounded-lg opacity-10 rotate-12"></div>
      </div>
    ),
    privacy: (
      <div className={`relative w-full h-full bg-gradient-to-tr from-brand-black to-brand-violet rounded-2xl p-8 ${className}`}>
        <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-brand-yellow rounded-lg opacity-70 -rotate-6"></div>
        <div className="absolute bottom-1/4 right-1/4 w-20 h-20 border-4 border-brand-yellow rounded-full opacity-50"></div>
        <div className="absolute top-1/4 right-1/3 text-5xl opacity-30">⭐</div>
        <div className="absolute bottom-1/3 left-1/3 w-16 h-16 bg-brand-white rounded-full opacity-20"></div>
      </div>
    ),
    growth: (
      <div className={`relative w-full h-full bg-gradient-to-br from-brand-yellow via-brand-yellow to-brand-white rounded-2xl p-8 ${className}`}>
        <div className="absolute top-1/4 left-1/3 text-8xl opacity-60">⭐</div>
        <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-brand-violet rounded-full opacity-40"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 border-4 border-brand-black rounded-lg opacity-20 rotate-45"></div>
        <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-brand-black rounded-full opacity-10"></div>
      </div>
    ),
    balance: (
      <div className={`relative w-full h-full bg-gradient-to-tl from-brand-violet to-brand-yellow rounded-2xl p-8 ${className}`}>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-brand-white rounded-lg opacity-70 rotate-12"></div>
        <div className="absolute bottom-1/4 left-1/4 text-6xl opacity-50">⭐</div>
        <div className="absolute top-1/4 left-1/3 w-20 h-20 border-4 border-brand-white rounded-full opacity-40"></div>
        <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-brand-black rounded-full opacity-20"></div>
      </div>
    ),
    step1: (
      <div className={`relative w-full h-full bg-gradient-to-br from-brand-violet to-brand-black rounded-2xl p-8 ${className}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-70">⭐</div>
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-brand-yellow rounded-full opacity-60"></div>
        <div className="absolute bottom-1/4 right-1/4 w-20 h-20 border-4 border-brand-yellow rounded-lg opacity-40 rotate-12"></div>
      </div>
    ),
    step2: (
      <div className={`relative w-full h-full bg-gradient-to-tr from-brand-yellow to-brand-white rounded-2xl p-8 ${className}`}>
        <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-brand-violet rounded-full opacity-50"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-brand-black rounded-lg opacity-15 -rotate-12"></div>
        <div className="absolute top-1/4 right-1/4 text-7xl opacity-60">⭐</div>
      </div>
    ),
    step3: (
      <div className={`relative w-full h-full bg-gradient-to-bl from-brand-yellow via-brand-violet to-brand-violet rounded-2xl p-8 ${className}`}>
        <div className="absolute top-1/4 right-1/3 w-28 h-28 bg-brand-white rounded-lg opacity-80 rotate-6"></div>
        <div className="absolute bottom-1/3 left-1/4 text-8xl opacity-50">⭐</div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 border-4 border-brand-white rounded-full opacity-40"></div>
      </div>
    ),
  };

  return visuals[variant] || null;
}
