# Design Document: mi-Era Landing Page

## Overview

The mi-Era landing page is a Next.js 14+ application using App Router, TypeScript, Tailwind CSS, and Drizzle ORM. It serves as a brand-focused marketing website that strictly adheres to mi-Era's visual identity while collecting early access signups through a waitlist form. The application integrates with PostgreSQL for data storage and Google SMTP for email confirmations.

The design prioritizes:
- Strict brand compliance with no visual improvisation
- Supportive, teen-focused tone of voice
- GDPR-compliant cookie consent management
- Responsive, accessible user experience
- Clean separation of concerns for maintainability

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Browser                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           Next.js App (React Components)               │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │ │
│  │  │ Page Sections│  │ Cookie Banner│  │ Waitlist Form│ │ │
│  │  └──────────────┘  └──────────────┘  └─────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Server (VPS)                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    API Routes                          │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │ │
│  │  │ /api/waitlist│  │ /api/consent │  │ Server Actions│ │ │
│  │  └──────────────┘  └──────────────┘  └─────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
│                              │                               │
│                    ┌─────────┴─────────┐                    │
│                    ▼                   ▼                     │
│         ┌──────────────────┐  ┌──────────────────┐         │
│         │  Drizzle ORM     │  │  Email Service   │         │
│         │  (PostgreSQL)    │  │  (Google SMTP)   │         │
│         └──────────────────┘  └──────────────────┘         │
└─────────────────────────────────────────────────────────────┘
                    │                       │
                    ▼                       ▼
         ┌──────────────────┐    ┌──────────────────┐
         │   PostgreSQL     │    │   Google SMTP    │
         │   (Docker)       │    │   Server         │
         └──────────────────┘    └──────────────────┘
```

### Technology Stack

- **Frontend Framework**: Next.js 14+ (App Router, React Server Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom brand configuration
- **Database**: PostgreSQL (Docker container)
- **ORM**: Drizzle ORM
- **Email**: Google SMTP (nodemailer)
- **Fonts**: Google Fonts API (Special Gothic Expanded, Lexend)
- **Deployment**: Docker Compose on VPS

### Directory Structure

```
mi-era-landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with fonts, metadata
│   │   ├── page.tsx                # Home page (all sections)
│   │   ├── privacy/page.tsx        # Privacy Policy
│   │   ├── terms/page.tsx          # Terms of Use
│   │   └── api/
│   │       ├── waitlist/route.ts   # Waitlist submission endpoint
│   │       └── consent/route.ts    # Cookie consent management
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Statistics.tsx
│   │   │   ├── Benefits.tsx
│   │   │   ├── KeyFeatures.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── DownloadCTA.tsx
│   │   │   └── FAQ.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx          # Brand-compliant button variants
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── WaitlistForm.tsx
│   │   │   └── CookieBanner.tsx
│   │   └── icons/
│   │       ├── StarIcon.tsx        # Custom star symbol
│   │       └── [other-icons].tsx   # Placeholder icons
│   ├── lib/
│   │   ├── db/
│   │   │   ├── schema.ts           # Drizzle schema definitions
│   │   │   ├── client.ts           # Database connection
│   │   │   └── migrations/         # Database migrations
│   │   ├── email/
│   │   │   ├── service.ts          # Email sending logic
│   │   │   └── templates.ts        # Email template variables
│   │   ├── analytics/
│   │   │   └── consent.ts          # Analytics tag management
│   │   └── utils/
│   │       ├── validation.ts       # Email validation
│   │       └── fonts.ts            # Google Fonts configuration
│   └── styles/
│       └── globals.css             # Tailwind imports + custom styles
├── public/
│   ├── placeholders/
│   │   ├── logo.svg                # Logo placeholder
│   │   ├── app-screenshot-*.png   # Screenshot placeholders
│   │   └── icons/                  # Icon placeholders
│   └── fonts/                      # Font fallbacks (if needed)
├── drizzle.config.ts               # Drizzle configuration
├── tailwind.config.ts              # Brand color system
├── docker-compose.yml              # PostgreSQL + App containers
├── Dockerfile                      # Next.js app container
└── .env.example                    # Environment variables template
```

## Components and Interfaces

### Core Components

#### 1. Page Sections

Each section is a self-contained React Server Component that renders static content with brand-compliant styling.

**Hero Section**
```typescript
interface HeroProps {
  heading: string;
  subheading: string;
  ctaText: string;
  screenshots: Array<{
    src: string;
    alt: string;
    aspectRatio: string;
  }>;
}
```

**Statistics Section**
```typescript
interface StatisticsProps {
  stats: Array<{
    value: string;
    label: string;
    description: string;
  }>;
}
```

**Benefits Section**
```typescript
interface BenefitCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface BenefitsProps {
  heading: string;
  benefits: BenefitCard[];
}
```

**Key Features Section**
```typescript
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  screenshot: {
    src: string;
    alt: string;
    frameColor: string; // Tailwind color class
  };
  layout: 'left' | 'right';
}

interface KeyFeaturesProps {
  heading: string;
  subheading: string;
  features: Feature[];
}
```

**Pricing Section**
```typescript
interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted: boolean;
  ctaText: string;
}

interface PricingProps {
  plans: PricingPlan[];
}
```

**FAQ Section**
```typescript
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}
```

#### 2. UI Components

**Button Component**
```typescript
type ButtonVariant = 'primary' | 'secondary' | 'secondary-filled';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}
```

Button styling follows brand guidelines:
- Primary: Yellow #FFD700 bg, Black text, Violet #915AFF hover
- Secondary: Transparent bg, Black outline, Red #FE2C2B hover
- Disabled: Light Gray #E6E6E6 bg, Light Gray #BDBDBD text

**Waitlist Form Component**
```typescript
interface WaitlistFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

interface WaitlistFormState {
  email: string;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}
```

**Cookie Banner Component**
```typescript
interface CookieBannerProps {
  onAccept: () => void;
  onReject: () => void;
}

interface ConsentState {
  analytics: boolean;
  timestamp: number;
}
```

#### 3. API Routes

**Waitlist API**
```typescript
// POST /api/waitlist
interface WaitlistRequest {
  email: string;
}

interface WaitlistResponse {
  success: boolean;
  message: string;
  error?: string;
}
```

**Consent API**
```typescript
// POST /api/consent
interface ConsentRequest {
  analytics: boolean;
}

interface ConsentResponse {
  success: boolean;
}
```

### Database Schema

```typescript
// Drizzle schema
import { pgTable, serial, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';

export const waitlistEmails = pgTable('waitlist_emails', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  confirmed: boolean('confirmed').default(false).notNull(),
});

export const consentLogs = pgTable('consent_logs', {
  id: serial('id').primaryKey(),
  sessionId: varchar('session_id', { length: 255 }).notNull(),
  analytics: boolean('analytics').notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});
```

### Email Service

```typescript
interface EmailService {
  sendConfirmation(email: string): Promise<void>;
}

interface EmailTemplate {
  subject: string;
  html: string; // Pre-existing template with variables
  variables: {
    email: string;
    confirmationLink?: string;
  };
}
```

Email template is NOT generated by the application. The service exposes a placeholder:

```typescript
// lib/email/templates.ts
export const emailTemplate = `<h1>hello</h1>`; // User will replace with actual HTML

export function getEmailVariables(email: string) {
  return {
    email,
    confirmationLink: `${process.env.BASE_URL}/confirm?email=${encodeURIComponent(email)}`,
  };
}
```

### Analytics Management

```typescript
interface AnalyticsManager {
  loadScripts(): void;
  removeScripts(): void;
  hasConsent(): boolean;
}

// Dynamically loads/removes Google Analytics based on consent
```

## Data Models

### Waitlist Email

```typescript
interface WaitlistEmail {
  id: number;
  email: string;
  createdAt: Date;
  confirmed: boolean;
}
```

**Validation Rules:**
- Email must match RFC 5322 format
- Email must be unique in database
- Email length: 5-255 characters

### Consent Log

```typescript
interface ConsentLog {
  id: number;
  sessionId: string;
  analytics: boolean;
  timestamp: Date;
}
```

**Storage:**
- Server-side: PostgreSQL (audit trail)
- Client-side: localStorage (user preference persistence)

### Brand Configuration

```typescript
interface BrandColors {
  primary: {
    yellow: '#FFD700';
    violet: '#915AFF';
    red: '#FE2C2B';
  };
  secondary: {
    blue: '#3755F0';
    green: '#57BD2D';
    orange: '#FF7B1C';
  };
  neutral: {
    black: '#000000';
    white: '#FFFFFF';
    lightGray: '#E6E6E6';
    gray: '#BDBDBD';
  };
}

interface BrandFonts {
  heading: 'Special Gothic Expanded';
  body: 'Lexend';
}
```

Tailwind configuration extends default theme with brand colors:

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#FFD700',
          violet: '#915AFF',
          red: '#FE2C2B',
          blue: '#3755F0',
          green: '#57BD2D',
          orange: '#FF7B1C',
        },
      },
      fontFamily: {
        heading: ['Special Gothic Expanded', 'sans-serif'],
        body: ['Lexend', 'sans-serif'],
      },
    },
  },
};
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, several properties can be consolidated:
- Multiple button styling properties (15.1-15.6) can be combined into comprehensive button styling properties
- Font properties (1.2, 1.3) can be combined into a single typography property
- Email validation and storage properties (11.2-11.5) cover different aspects and should remain separate
- Accessibility properties (18.2-18.5) each test distinct aspects and should remain separate

### Properties

**Property 1: Brand Color Palette Compliance**

*For any* color value used in the application's styles (CSS, Tailwind classes, inline styles), that color value must match one of the approved brand colors: #FFD700, #915AFF, #FE2C2B, #3755F0, #57BD2D, #FF7B1C, #000000, #FFFFFF, #E6E6E6, #BDBDBD.

**Validates: Requirements 1.1**

---

**Property 2: Typography Compliance**

*For any* text element in the application, if it is a heading element (h1-h6) then its font-family must be "Special Gothic Expanded", and if it is body text then its font-family must be "Lexend".

**Validates: Requirements 1.2, 1.3**

---

**Property 3: Missing Asset Placeholder Display**

*For any* brand asset (logo, icon, screenshot) that fails to load or is unavailable, the application must display an explicit placeholder element containing descriptive text identifying the missing asset.

**Validates: Requirements 1.4**

---

**Property 4: Forbidden Visual Effects Absence**

*For any* brand element (buttons, logos, icons), the computed styles must not include CSS gradient properties (linear-gradient, radial-gradient) or box-shadow properties.

**Validates: Requirements 1.5, 15.6**

---

**Property 5: Section Background Color Uniqueness**

*For any* page section component, that section must have exactly one dominant background color applied, and that color must be one of the approved brand colors.

**Validates: Requirements 1.7**

---

**Property 6: Scroll-to-Form Interaction**

*For any* "Join the waitlist" CTA button on the page, clicking that button must trigger a scroll action that brings the Waitlist_Form into the viewport.

**Validates: Requirements 2.4, 10.4**

---

**Property 7: Responsive Layout Integrity**

*For any* viewport width (mobile: 320-767px, tablet: 768-1023px, desktop: 1024px+), all page sections must render without horizontal overflow and maintain readable text sizes.

**Validates: Requirements 2.5**

---

**Property 8: Benefit Card Structure Completeness**

*For any* benefit card in the Benefits section, that card must contain exactly three child elements: an icon element, a title element, and a description element.

**Validates: Requirements 5.3**

---

**Property 9: Custom Icon Implementation**

*For any* icon element in the application, that icon must be implemented as a custom SVG component (not emoji Unicode characters or icon font glyphs).

**Validates: Requirements 5.4, 16.3**

---

**Property 10: Email Validation and Error Display**

*For any* email input submitted to the Waitlist_Form, if the email does not match RFC 5322 format, then the form must display a validation error message and prevent submission.

**Validates: Requirements 11.4**

---

**Property 11: Email Persistence with Timestamp**

*For any* valid email submitted to the Waitlist_Form, the database must contain a record with that email address and a timestamp within 1 second of submission time.

**Validates: Requirements 11.3**

---

**Property 12: Email Confirmation Sending**

*For any* valid email submitted to the Waitlist_Form, the Email_Service must invoke the SMTP send function with sender address "no-reply@mi-era.org" and recipient address matching the submitted email.

**Validates: Requirements 11.2**

---

**Property 13: Duplicate Email Graceful Handling**

*For any* email that already exists in the waitlist database, submitting that email again must not throw an error and must return a success response (idempotent behavior).

**Validates: Requirements 11.5**

---

**Property 14: Analytics Blocking on Consent Rejection**

*For any* page load where the user has rejected analytics consent, the DOM must not contain any Analytics_Tags script elements (Google Analytics, etc.).

**Validates: Requirements 13.3**

---

**Property 15: Analytics Loading on Consent Acceptance**

*For any* page load where the user has accepted analytics consent, the DOM must contain Analytics_Tags script elements with correct tracking IDs.

**Validates: Requirements 13.4**

---

**Property 16: Consent Persistence in Storage**

*For any* consent choice (accept or reject), the browser's localStorage must contain a consent record with the user's choice and timestamp immediately after the choice is made.

**Validates: Requirements 13.5**

---

**Property 17: Cookie Banner Display Before Tracking**

*For any* first-time visitor (no consent record in localStorage), the Cookie_Banner must be visible in the DOM before any Analytics_Tags are loaded.

**Validates: Requirements 13.1, 13.6**

---

**Property 18: Forbidden Word Absence**

*For any* text content in the application, that content must not contain the words "optimize", "boost", or "maximize" (case-insensitive).

**Validates: Requirements 14.3**

---

**Property 19: Primary Button Styling**

*For any* button with variant="primary", the button must have background color #FFD700 and text color #000000 in its default state, and background color #915AFF in its hover state.

**Validates: Requirements 15.1, 15.2**

---

**Property 20: Secondary Button Styling**

*For any* button with variant="secondary", the button must have transparent background and #000000 border in its default state, and background color #FE2C2B with #FFFFFF text in its hover state.

**Validates: Requirements 15.3, 15.4**

---

**Property 21: Disabled Button Styling**

*For any* button with disabled=true, the button must have background color #E6E6E6 and text color #BDBDBD regardless of variant.

**Validates: Requirements 15.5**

---

**Property 22: Environment Variable Security**

*For any* sensitive configuration value (SMTP credentials, database connection strings, API keys), that value must be loaded from environment variables and must not appear as a string literal in the source code.

**Validates: Requirements 17.7**

---

**Property 23: Semantic HTML Structure**

*For any* major page section, that section must use semantic HTML5 elements (header, nav, main, section, article, footer) rather than generic div elements for the primary container.

**Validates: Requirements 18.2**

---

**Property 24: Image Alt Text Presence**

*For any* img element or Image component in the application, that element must have a non-empty alt attribute.

**Validates: Requirements 18.3**

---

**Property 25: Color Contrast Compliance**

*For any* text element with a background, the color contrast ratio between the text color and background color must be at least 4.5:1 for normal text or 3:1 for large text (WCAG AA standard).

**Validates: Requirements 18.4**

---

**Property 26: Keyboard Navigation Completeness**

*For any* interactive element (button, link, form input), that element must be reachable via keyboard Tab navigation and must have a visible focus indicator.

**Validates: Requirements 18.5**

## Error Handling

### Client-Side Error Handling

**Form Validation Errors**
- Email format validation occurs before submission
- Invalid email displays inline error message below input field
- Error message: "Please enter a valid email address"
- Form remains interactive, allowing user to correct input

**Network Errors**
- API request failures display user-friendly error message
- Error message: "Something went wrong. Please try again."
- Form re-enables after error, allowing retry
- No automatic retry to prevent spam

**Asset Loading Errors**
- Missing images trigger placeholder display with descriptive text
- Font loading failures fall back to system fonts
- No error thrown to user; graceful degradation

### Server-Side Error Handling

**Database Errors**
- Connection failures return 500 status with generic error message
- Duplicate email constraint violations return 200 status (idempotent)
- Query errors are logged server-side but not exposed to client

**Email Service Errors**
- SMTP connection failures are logged but don't block waitlist submission
- Email stored in database even if sending fails
- Background retry mechanism for failed emails (implementation detail)

**Validation Errors**
- Invalid email format returns 400 status with validation message
- Missing required fields return 400 status with field-specific errors
- Malformed request body returns 400 status with generic error

### Error Logging

All server-side errors are logged with:
- Timestamp
- Error type and message
- Request context (endpoint, method, IP)
- Stack trace (development only)

Logs are written to stdout for Docker container log aggregation.

## Testing Strategy

### Dual Testing Approach

This project uses both unit tests and property-based tests to ensure comprehensive coverage:

**Unit Tests**: Verify specific examples, edge cases, and error conditions
- Test specific component rendering with known props
- Test specific API responses with known inputs
- Test edge cases like empty states, loading states, error states
- Test integration points between components

**Property-Based Tests**: Verify universal properties across all inputs
- Test that properties hold for randomly generated inputs
- Test that invariants are maintained across operations
- Test that error handling works for any invalid input
- Provide broader coverage than example-based tests

Both approaches are complementary and necessary. Unit tests catch concrete bugs in specific scenarios, while property-based tests verify general correctness across the input space.

### Property-Based Testing Configuration

**Library**: fast-check (JavaScript/TypeScript property-based testing library)

**Configuration**:
- Minimum 100 iterations per property test
- Each property test references its design document property
- Tag format: `// Feature: mi-era-landing, Property {number}: {property_text}`

**Example Property Test Structure**:
```typescript
import fc from 'fast-check';

// Feature: mi-era-landing, Property 1: Brand Color Palette Compliance
test('all colors used in application match brand palette', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...allStylesheetColors()),
      (color) => {
        const brandColors = ['#FFD700', '#915AFF', '#FE2C2B', '#3755F0', '#57BD2D', '#FF7B1C', '#000000', '#FFFFFF', '#E6E6E6', '#BDBDBD'];
        expect(brandColors).toContain(color.toUpperCase());
      }
    ),
    { numRuns: 100 }
  );
});
```

### Unit Testing Strategy

**Component Tests** (React Testing Library):
- Test component rendering with specific props
- Test user interactions (clicks, form submissions)
- Test conditional rendering (loading, error, success states)
- Test accessibility (ARIA labels, keyboard navigation)

**API Route Tests**:
- Test successful requests with valid data
- Test error responses with invalid data
- Test database integration (using test database)
- Test email service integration (using mock SMTP)

**Integration Tests**:
- Test full user flows (visit page → submit email → receive confirmation)
- Test cookie consent flow (reject → no analytics, accept → analytics loaded)
- Test responsive behavior at different viewport sizes

### Test Organization

```
__tests__/
├── unit/
│   ├── components/
│   │   ├── Button.test.tsx
│   │   ├── WaitlistForm.test.tsx
│   │   └── CookieBanner.test.tsx
│   ├── api/
│   │   ├── waitlist.test.ts
│   │   └── consent.test.ts
│   └── lib/
│       ├── validation.test.ts
│       └── email.test.ts
├── properties/
│   ├── brand-compliance.test.ts
│   ├── button-styling.test.ts
│   ├── email-handling.test.ts
│   ├── consent-management.test.ts
│   └── accessibility.test.ts
└── integration/
    ├── waitlist-flow.test.tsx
    └── consent-flow.test.tsx
```

### Testing Tools

- **Test Runner**: Vitest (fast, ESM-native, TypeScript support)
- **Component Testing**: React Testing Library
- **Property Testing**: fast-check
- **API Testing**: Supertest (for API route testing)
- **Database Testing**: Drizzle with test database
- **Accessibility Testing**: jest-axe (automated a11y checks)

### Continuous Integration

Tests run on every commit:
1. Lint check (ESLint, TypeScript)
2. Unit tests (all components, API routes, utilities)
3. Property tests (all correctness properties)
4. Integration tests (full user flows)
5. Build verification (Next.js production build)

All tests must pass before merge to main branch.
