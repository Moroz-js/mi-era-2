'use client';

const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GA_ID || '';

interface AnalyticsManager {
  loadScripts(): void;
  removeScripts(): void;
  hasConsent(): boolean;
}

class ConsentManager implements AnalyticsManager {
  private scriptsLoaded = false;

  /**
   * Load Google Analytics scripts
   */
  loadScripts(): void {
    if (this.scriptsLoaded || !GOOGLE_ANALYTICS_ID) {
      return;
    }

    // Create and append Google Analytics script
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
    gaScript.setAttribute('data-analytics', 'true');
    document.head.appendChild(gaScript);

    // Create and append inline script for gtag initialization
    const inlineScript = document.createElement('script');
    inlineScript.setAttribute('data-analytics', 'true');
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GOOGLE_ANALYTICS_ID}');
    `;
    document.head.appendChild(inlineScript);

    this.scriptsLoaded = true;
  }

  /**
   * Remove all analytics scripts from the DOM
   */
  removeScripts(): void {
    // Remove all scripts with data-analytics attribute
    const analyticsScripts = document.querySelectorAll('script[data-analytics="true"]');
    analyticsScripts.forEach((script) => {
      script.remove();
    });

    // Clear dataLayer
    interface WindowWithDataLayer extends Window {
      dataLayer?: unknown[];
    }
    if ((window as WindowWithDataLayer).dataLayer) {
      (window as WindowWithDataLayer).dataLayer = [];
    }

    this.scriptsLoaded = false;
  }

  /**
   * Check if user has given consent for analytics
   */
  hasConsent(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    const storedConsent = localStorage.getItem('mi-era-consent');
    
    if (!storedConsent) {
      return false;
    }

    try {
      const consent = JSON.parse(storedConsent);
      return consent.analytics === true;
    } catch {
      return false;
    }
  }
}

// Singleton instance
const consentManager = new ConsentManager();

export default consentManager;

/**
 * Initialize analytics based on stored consent
 * Should be called on page load
 */
export function initializeAnalytics(): void {
  if (typeof window === 'undefined') {
    return;
  }

  if (consentManager.hasConsent()) {
    consentManager.loadScripts();
  }
}

/**
 * Handle consent acceptance
 */
export function handleConsentAccepted(): void {
  consentManager.loadScripts();
}

/**
 * Handle consent rejection
 */
export function handleConsentRejected(): void {
  consentManager.removeScripts();
}

// Set up event listeners for consent events
if (typeof window !== 'undefined') {
  window.addEventListener('consent-accepted', handleConsentAccepted);
  window.addEventListener('consent-rejected', handleConsentRejected);
}
