/**
 * mi-Era Brand Color System
 * 
 * All colors used in the application must come from this palette
 * to ensure brand compliance.
 */

export const BRAND_COLORS = {
  primary: {
    yellow: '#FFD700',
    violet: '#915AFF',
    red: '#FE2C2B',
  },
  secondary: {
    blue: '#3755F0',
    green: '#57BD2D',
    orange: '#FF7B1C',
  },
  neutral: {
    black: '#000000',
    white: '#FFFFFF',
    lightGray: '#E6E6E6',
    gray: '#BDBDBD',
  },
} as const;

/**
 * Get all brand colors as a flat array
 */
export function getAllBrandColors(): string[] {
  return [
    ...Object.values(BRAND_COLORS.primary),
    ...Object.values(BRAND_COLORS.secondary),
    ...Object.values(BRAND_COLORS.neutral),
  ];
}

/**
 * Check if a color is part of the brand palette
 */
export function isBrandColor(color: string): boolean {
  const normalizedColor = color.toUpperCase();
  return getAllBrandColors().some(
    (brandColor) => brandColor.toUpperCase() === normalizedColor
  );
}

/**
 * Validate that a color is part of the brand palette
 * Throws an error if the color is not approved
 */
export function validateBrandColor(color: string): void {
  if (!isBrandColor(color)) {
    throw new Error(
      `Color ${color} is not part of the mi-Era brand palette. ` +
      `Approved colors: ${getAllBrandColors().join(', ')}`
    );
  }
}
