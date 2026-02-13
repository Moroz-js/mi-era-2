'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-brand-white text-brand-black py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo and Description */}
          <div>
            <img 
              src="/assets/logo.svg" 
              alt="Mi-Era" 
              className="h-10 w-auto mb-4"
            />
            <p 
              className="text-gray-600 text-sm leading-relaxed"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              A reliable, calm, guilt-free digital space where teens learn to build structure, focus, and confidence.
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://www.instagram.com/mi_era.ai/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:opacity-70 transition-opacity"
              >
                <img src="/assets/instagram.svg" alt="Instagram" className="w-6 h-6" />
              </a>
              <a
                href="https://www.youtube.com/@mi-era.ai.founder"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:opacity-70 transition-opacity"
              >
                <img src="/assets/youtube.svg" alt="YouTube" className="w-6 h-6" />
              </a>
              <a
                href="https://www.tiktok.com/@mi_era.ai?lang=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="hover:opacity-70 transition-opacity"
              >
                <img src="/assets/tiktok.svg" alt="TikTok" className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 
              className="text-lg font-bold mb-4" 
              style={{ fontFamily: 'var(--font-body)' }}
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
                    const pathname = window.location.pathname;
                    if (pathname === '/') {
                      // Already on home page, just scroll
                      const waitlistSection = document.getElementById('waitlist-form');
                      if (waitlistSection) {
                        waitlistSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    } else {
                      // Navigate to home page with hash
                      window.location.href = '/#waitlist-form';
                    }
                  }}
                  className="text-gray-600 hover:text-brand-violet transition-colors text-sm text-left cursor-pointer"
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
              style={{ fontFamily: 'var(--font-body)' }}
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-8 border-t border-gray-200">
          <p 
            className="text-gray-500 text-xs"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            © {new Date().getFullYear()} Mi-Era. All rights reserved.
          </p>
          <p 
            className="text-gray-600 text-sm"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Own your era
          </p>
          <a
            href="https://xmethod.de"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span 
              className="text-xs"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Designed & Developed by
            </span>
            <img src="/assets/xmethod.svg" alt="Xmethod" className="h-4 w-auto" />
          </a>
        </div>
      </div>
    </footer>
  );
}
