# Analytics Consent Management

This module handles GDPR-compliant cookie consent management for the mi-Era landing page.

## Features

- **Cookie Banner**: Displays on first visit before any tracking occurs
- **Consent Storage**: Stores user preferences in localStorage
- **Consent Logging**: Logs consent choices to the database via API
- **Analytics Management**: Dynamically loads/removes Google Analytics based on consent
- **Re-open Settings**: Allows users to change their preferences after initial choice

## Components

### CookieBanner Component

Located at: `src/components/ui/CookieBanner.tsx`

A client-side component that:
- Displays on first visit (checks localStorage)
- Provides Accept/Reject buttons
- Stores consent in localStorage
- Logs consent to server via `/api/consent`
- Dispatches custom events for analytics loading/removal
- Exposes `window.openCookieSettings()` to re-open the banner

**Usage:**
```tsx
import { CookieBanner } from '@/components/ui';

<CookieBanner />
```

### AnalyticsProvider Component

Located at: `src/components/AnalyticsProvider.tsx`

A client-side component that:
- Initializes analytics on page load if user has given consent
- Should be included in the root layout

**Usage:**
```tsx
import { AnalyticsProvider } from '@/components/AnalyticsProvider';

<AnalyticsProvider />
```

### Consent Manager

Located at: `src/lib/analytics/consent.ts`

A singleton class that manages analytics scripts:
- `loadScripts()`: Loads Google Analytics scripts
- `removeScripts()`: Removes all analytics scripts from DOM
- `hasConsent()`: Checks if user has given consent

**Functions:**
- `initializeAnalytics()`: Initialize analytics based on stored consent
- `handleConsentAccepted()`: Load analytics scripts
- `handleConsentRejected()`: Remove analytics scripts

## API Routes

### POST /api/consent

Logs consent choices to the database.

**Request Body:**
```json
{
  "analytics": true,
  "sessionId": "optional-session-id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Consent logged successfully"
}
```

## Environment Variables

Add to `.env`:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Database Schema

The `consent_logs` table stores all consent choices:
- `id`: Serial primary key
- `sessionId`: Unique session identifier
- `analytics`: Boolean consent choice
- `timestamp`: When consent was given

## Testing Manually

1. **First Visit:**
   - Clear localStorage: `localStorage.clear()`
   - Refresh page
   - Cookie banner should appear at bottom
   - No analytics scripts should be loaded yet

2. **Accept Consent:**
   - Click "Accept All"
   - Banner should disappear
   - Check localStorage: `localStorage.getItem('mi-era-consent')`
   - Check DOM for analytics scripts: `document.querySelectorAll('script[data-analytics="true"]')`
   - Analytics scripts should be present

3. **Reject Consent:**
   - Clear localStorage and refresh
   - Click "Reject Analytics"
   - Banner should disappear
   - No analytics scripts should be loaded

4. **Re-open Settings:**
   - Call `window.openCookieSettings()`
   - Banner should reappear
   - User can change their choice

## Requirements Validation

This implementation satisfies the following requirements:

- **13.1**: Cookie banner displays on first visit before tracking
- **13.2**: Users can accept or reject analytics cookies
- **13.3**: Analytics tags are NOT loaded when rejected
- **13.4**: Analytics tags ARE loaded when accepted
- **13.5**: Consent is stored in localStorage
- **13.6**: GDPR compliance through explicit consent
- **13.7**: Users can re-open settings via `window.openCookieSettings()`
