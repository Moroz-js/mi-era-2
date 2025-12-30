'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './Button';

const CONSENT_STORAGE_KEY = 'mi-era-consent';

interface ConsentState {
  analytics: boolean;
  timestamp: number;
}

interface CookieBannerProps {
  onAccept?: () => void;
  onReject?: () => void;
}

export function CookieBanner({ onAccept, onReject }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
    
    if (!storedConsent) {
      // First visit - show banner
      setIsVisible(true);
    }
  }, []);

  const handleAccept = async () => {
    const timestamp = Date.now();
    const consentState: ConsentState = {
      analytics: true,
      timestamp,
    };
    
    // Store in localStorage
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentState));
    
    // Log to server
    try {
      await fetch('/api/consent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          analytics: true,
        }),
      });
    } catch (error) {
      console.error('Failed to log consent:', error);
    }
    
    setIsVisible(false);
    
    // Call optional callback
    if (onAccept) {
      onAccept();
    }
    
    // Load analytics tags
    loadAnalytics();
  };

  const handleReject = async () => {
    const timestamp = Date.now();
    const consentState: ConsentState = {
      analytics: false,
      timestamp,
    };
    
    // Store in localStorage
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentState));
    
    // Log to server
    try {
      await fetch('/api/consent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          analytics: false,
        }),
      });
    } catch (error) {
      console.error('Failed to log consent:', error);
    }
    
    setIsVisible(false);
    
    // Call optional callback
    if (onReject) {
      onReject();
    }
    
    // Ensure analytics are not loaded
    removeAnalytics();
  };

  const loadAnalytics = () => {
    // Dispatch custom event for analytics loading
    window.dispatchEvent(new CustomEvent('consent-accepted'));
  };

  const removeAnalytics = () => {
    // Dispatch custom event for analytics removal
    window.dispatchEvent(new CustomEvent('consent-rejected'));
  };

  const handleOpenSettings = () => {
    setIsVisible(true);
  };

  // Expose method to re-open settings
  useEffect(() => {
    // Add global function to re-open cookie settings
    interface WindowWithCookieSettings extends Window {
      openCookieSettings?: () => void;
    }
    (window as WindowWithCookieSettings).openCookieSettings = handleOpenSettings;
    
    return () => {
      delete (window as WindowWithCookieSettings).openCookieSettings;
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-brand-white border-t-2 border-brand-black shadow-lg"
      role="dialog"
      aria-label="Cookie consent banner"
      aria-describedby="cookie-banner-description"
    >
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h2 className="font-heading text-lg font-bold mb-2">
              Your Privacy Matters
            </h2>
            <p id="cookie-banner-description" className="font-body text-sm text-brand-black">
              We use cookies to understand how you use our site and to improve your experience. 
              You can choose to accept or reject analytics cookies. Essential cookies are always enabled.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleReject}
              className="w-full sm:w-auto"
            >
              Decline
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleAccept}
              className="w-full sm:w-auto"
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export helper function to check consent status
export function getConsentStatus(): ConsentState | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
  
  if (!storedConsent) {
    return null;
  }
  
  try {
    return JSON.parse(storedConsent) as ConsentState;
  } catch {
    return null;
  }
}

// Export helper function to clear consent (for testing)
export function clearConsent(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
  }
}
