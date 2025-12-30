'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from './Button';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToWaitlist = () => {
    const waitlistForm = document.getElementById('waitlist-form');
    if (waitlistForm) {
      waitlistForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-brand-white border-b border-brand-light-gray sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="text-brand-violet text-xl font-bold cursor-pointer hover:text-brand-yellow transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                Mi-Era
              </div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <Link 
                href="/" 
                className="text-brand-black hover:text-brand-violet transition-colors font-medium"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-brand-black hover:text-brand-violet transition-colors font-medium"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                About
              </Link>
              <Link 
                href="/blog" 
                className="text-brand-black hover:text-brand-violet transition-colors font-medium"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Blog
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button 
                variant="primary" 
                size="sm"
                onClick={scrollToWaitlist}
              >
                Join the waitlist
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-brand-black hover:text-brand-violet transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation - Outside header, positioned below it */}
      <nav 
        className={`
          md:hidden fixed left-0 right-0 bg-brand-white border-b border-brand-light-gray
          transition-transform duration-300 ease-in-out z-40
          ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}
        `}
        style={{ top: '73px' }}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <Link 
            href="/" 
            className="text-brand-black hover:text-brand-violet transition-colors font-medium"
            style={{ fontFamily: 'var(--font-body)' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className="text-brand-black hover:text-brand-violet transition-colors font-medium"
            style={{ fontFamily: 'var(--font-body)' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/blog" 
            className="text-brand-black hover:text-brand-violet transition-colors font-medium"
            style={{ fontFamily: 'var(--font-body)' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Blog
          </Link>
          <Button 
            variant="primary" 
            size="md"
            onClick={scrollToWaitlist}
            className="w-full"
          >
            Join the waitlist
          </Button>
        </div>
      </nav>
    </>
  );
}
