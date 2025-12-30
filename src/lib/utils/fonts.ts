/**
 * Local fonts configuration for Mi-Era brand
 * 
 * Fonts:
 * - Special Gothic: H1 headings only (weight 400)
 * - Lexend Bold: Section headings h2, h3 (weight 700)
 * - Lexend Regular: Body text (weight 400)
 * 
 * Fonts are loaded from /public/fonts/ via Next.js localFont in layout.tsx
 */

export const BRAND_FONTS = {
  heading: {
    name: 'Special Gothic',
    fallback: 'sans-serif',
    cssVariable: '--font-heading',
    weight: '400',
  },
  body: {
    name: 'Lexend',
    fallback: 'sans-serif',
    cssVariable: '--font-body',
    weights: {
      regular: '400',
      bold: '700',
    },
  },
} as const;

/**
 * Get font family CSS value for a given font type
 */
export function getFontFamily(type: 'heading' | 'body'): string {
  const font = BRAND_FONTS[type];
  return `var(${font.cssVariable}), ${font.fallback}`;
}

/**
 * Get CSS variable for a given font type
 */
export function getFontVariable(type: 'heading' | 'body'): string {
  return BRAND_FONTS[type].cssVariable;
}
