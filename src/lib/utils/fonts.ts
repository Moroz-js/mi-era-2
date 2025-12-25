/**
 * Google Fonts configuration for mi-Era brand
 * 
 * Fonts:
 * - Special Gothic Expanded: Headings (loaded via link in layout)
 * - Lexend: Body text (loaded via Next.js font optimization)
 */

export const BRAND_FONTS = {
  heading: {
    name: 'Special Gothic Expanded',
    fallback: 'sans-serif',
    cssVariable: '--font-heading',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Special+Elite&display=swap',
  },
  body: {
    name: 'Lexend',
    fallback: 'sans-serif',
    cssVariable: '--font-body',
    weights: ['300', '400', '500', '600', '700'],
  },
} as const;

/**
 * Get font family CSS value for a given font type
 */
export function getFontFamily(type: 'heading' | 'body'): string {
  const font = BRAND_FONTS[type];
  return `'${font.name}', ${font.fallback}`;
}

/**
 * Get CSS variable for a given font type
 */
export function getFontVariable(type: 'heading' | 'body'): string {
  return BRAND_FONTS[type].cssVariable;
}
