'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from './Button';

export function Footer() {
  const scrollToWaitlist = () => {
    const waitlistForm = document.getElementById('waitlist-form');
    if (waitlistForm) {
      waitlistForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-brand-black text-brand-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* CTA Section */}
          <div className="md:col-span-2">
            <h3 
              className="text-2xl font-bold mb-4" 
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Ready to own your era?
            </h3>
            <p 
              className="text-brand-light-gray mb-6"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Join the waitlist and be among the first to experience mi-Era.
            </p>
            <Button 
              variant="primary" 
              size="md"
              onClick={scrollToWaitlist}
            >
              Join the waitlist
            </Button>
          </div>

          {/* App Store Links */}
          <div>
            <h4 
              className="text-lg font-semibold mb-4" 
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Download the app
            </h4>
            <div className="space-y-3">
              <div className="bg-brand-light-gray text-brand-black px-4 py-3 rounded-lg text-center">
                App Store placeholder
              </div>
              <div className="bg-brand-light-gray text-brand-black px-4 py-3 rounded-lg text-center">
                Google Play placeholder
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-brand-gray pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Logo */}
            <div 
              className="text-xl font-bold" 
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              mi-Era
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6">
              <Link 
                href="/privacy" 
                className="text-brand-light-gray hover:text-brand-yellow transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-brand-light-gray hover:text-brand-yellow transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Terms of Use
              </Link>
            </div>

            {/* Copyright */}
            <div 
              className="text-brand-gray text-sm"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              © {new Date().getFullYear()} mi-Era. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
