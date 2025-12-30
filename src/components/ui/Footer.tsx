'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-brand-white text-brand-black py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo and Description */}
          <div>
            <div 
              className="text-brand-violet text-2xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Mi-Era
            </div>
            <p 
              className="text-gray-600 text-sm leading-relaxed"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              A reliable, calm, guilt-free digital space where teens learn to build structure, focus, and confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 
              className="text-lg font-bold mb-4" 
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-600 hover:text-brand-violet transition-colors text-sm"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-600 hover:text-brand-violet transition-colors text-sm"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="text-gray-600 hover:text-brand-violet transition-colors text-sm"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Blog
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const ctaSection = document.querySelector('section');
                    if (ctaSection) {
                      ctaSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-gray-600 hover:text-brand-violet transition-colors text-sm text-left"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Join Waitlist
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 
              className="text-lg font-bold mb-4" 
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/privacy" 
                  className="text-gray-600 hover:text-brand-violet transition-colors text-sm"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-gray-600 hover:text-brand-violet transition-colors text-sm"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center pt-8 border-t border-gray-200">
          <p 
            className="text-gray-600 text-sm mb-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Own your era
          </p>
          <p 
            className="text-gray-500 text-xs"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            © {new Date().getFullYear()} Mi-Era. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
