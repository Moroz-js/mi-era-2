export const SITE_CTA_KEY = 'site_cta';

export type SiteCta = {
  ctaText: string;
  ctaLink: string;
};

export const DEFAULT_SITE_CTA: SiteCta = {
  ctaText: 'Check Out Our Webinars',
  ctaLink: 'https://meet.google.com/kcj-jtvn-yyg',
};

export function normalizeSiteCta(content: unknown): SiteCta {
  const data = content && typeof content === 'object' ? (content as Record<string, unknown>) : {};
  const ctaText = typeof data.ctaText === 'string' ? data.ctaText.trim() : '';
  const ctaLink = typeof data.ctaLink === 'string' ? data.ctaLink.trim() : '';

  return {
    ctaText: ctaText || DEFAULT_SITE_CTA.ctaText,
    ctaLink: ctaLink || DEFAULT_SITE_CTA.ctaLink,
  };
}
