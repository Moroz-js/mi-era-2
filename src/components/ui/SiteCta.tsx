'use client';

import { createContext, useContext } from 'react';
import { Button } from './Button';
import { DEFAULT_SITE_CTA, type SiteCta } from '@/lib/site-cta';

const SiteCtaContext = createContext<SiteCta>(DEFAULT_SITE_CTA);

export function SiteCtaProvider({
  cta,
  children,
}: {
  cta: SiteCta;
  children: React.ReactNode;
}) {
  return <SiteCtaContext.Provider value={cta}>{children}</SiteCtaContext.Provider>;
}

export function useSiteCta() {
  return useContext(SiteCtaContext);
}

type ButtonVariant = 'primary' | 'secondary' | 'secondary-filled';
type ButtonSize = 'sm' | 'md' | 'lg';

export function SiteCtaButton({
  variant = 'primary',
  size = 'md',
  className = 'inline-block',
  buttonClassName = '',
  onClick,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  buttonClassName?: string;
  onClick?: () => void;
}) {
  const { ctaText, ctaLink } = useSiteCta();

  return (
    <a
      href={ctaLink}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onClick}
    >
      <Button variant={variant} size={size} className={buttonClassName}>
        {ctaText}
      </Button>
    </a>
  );
}

export function SiteCtaLink({ className }: { className?: string }) {
  const { ctaText, ctaLink } = useSiteCta();

  return (
    <a
      href={ctaLink}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {ctaText}
    </a>
  );
}
