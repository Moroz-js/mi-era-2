'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from './Button';

export function Header() {
  const scrollToWaitlist = () => {
    const waitlistForm = document.getElementById('waitlist-form');
    if (waitlistForm) {
      waitlistForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="bg-brand-white border-b border-brand-light-gray sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-xl font-bold text-brand-black" style={{ fontFamily: 'var(--font-heading)' }}>
              mi-Era logo here
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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
            <Button 
              variant="primary" 
              size="sm"
              onClick={scrollToWaitlist}
            >
              Join the waitlist
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-brand-black hover:text-brand-violet transition-colors"
            onClick={() => {
              const mobileMenu = document.getElementById('mobile-menu');
              if (mobileMenu) {
                mobileMenu.classList.toggle('hidden');
              }
            }}
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div id="mobile-menu" className="hidden md:hidden mt-4 pb-4 border-t border-brand-light-gray pt-4">
          <nav className="flex flex-col space-y-4">
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
            <Button 
              variant="primary" 
              size="md"
              onClick={scrollToWaitlist}
              className="w-full"
            >
              Join the waitlist
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
