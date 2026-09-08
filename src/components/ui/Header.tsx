'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './Button';
import { NAV_LINKS, WEBINAR_CTA_TEXT, WEBINAR_URL } from '@/lib/site-links';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') {
      return;
    }

    const hash = window.location.hash.replace('#', '');
    if (!hash) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);

    return () => window.clearTimeout(timeoutId);
  }, [pathname]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);

    if (!href.startsWith('/#')) {
      return;
    }

    const id = href.slice(2);
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header className="bg-brand-white border-b border-brand-light-gray sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img 
                src="/assets/logo.svg" 
                alt="Mi-Era" 
                className="h-8 w-auto cursor-pointer transition-opacity hover:opacity-80"
              />
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 absolute left-1/2 transform -translate-x-1/2">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="text-brand-black hover:text-brand-violet transition-colors font-medium"
                  style={{ fontFamily: 'var(--font-body)' }}
                  onClick={() => handleNavClick(link.href)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a
                href={WEBINAR_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  variant="primary" 
                  size="sm"
                >
                  {WEBINAR_CTA_TEXT}
                </Button>
              </a>
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
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className="text-brand-black hover:text-brand-violet transition-colors font-medium"
              style={{ fontFamily: 'var(--font-body)' }}
              onClick={() => handleNavClick(link.href)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={WEBINAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Button 
              variant="primary" 
              size="md"
              className="w-full"
            >
              {WEBINAR_CTA_TEXT}
            </Button>
          </a>
        </div>
      </nav>
    </>
  );
}
