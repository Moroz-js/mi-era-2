'use client';

import { useEffect } from 'react';
import { initializeAnalytics } from '@/lib/analytics/consent';

/**
 * Client component that initializes analytics based on stored consent
 * Should be included in the root layout
 */
export function AnalyticsProvider() {
  useEffect(() => {
    // Initialize analytics on mount if user has given consent
    initializeAnalytics();
  }, []);

  return null;
}
