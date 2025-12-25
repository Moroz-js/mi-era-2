# Implementation Plan: mi-Era Landing Page

## Overview

This implementation plan breaks down the mi-Era landing page into discrete, incremental coding tasks. Each task builds on previous work, with property-based tests integrated close to implementation to catch errors early. The plan follows a bottom-up approach: infrastructure → core components → page sections → integration → testing.

## Tasks

- [x] 1. Project Setup and Infrastructure
  - Initialize Next.js 14+ project with TypeScript and App Router
  - Configure Tailwind CSS with brand color system and typography
  - Set up Drizzle ORM with PostgreSQL connection
  - Create Docker Compose configuration for PostgreSQL
  - Configure environment variables (.env.example)
  - Set up Google Fonts integration (Special Gothic Expanded, Lexend)
  - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5, 17.7, 1.2, 1.3_

- [x] 2. Database Schema and Migrations
  - [x] 2.1 Define Drizzle schema for waitlist_emails table
    - Create schema with id, email, createdAt, confirmed fields
    - Add unique constraint on email field
    - _Requirements: 11.3_
  
  - [x] 2.2 Define Drizzle schema for consent_logs table
    - Create schema with id, sessionId, analytics, timestamp fields
    - _Requirements: 13.5_
  
  - [x] 2.3 Generate and run initial database migrations
    - Create migration files
    - Test migration execution in Docker environment
    - _Requirements: 17.4_

- [ ]* 2.4 Write property test for database schema
    - **Property 11: Email Persistence with Timestamp**
    - **Validates: Requirements 11.3**

- [x] 3. Core UI Components
  - [x] 3.1 Implement Button component with brand variants
    - Create Button component with primary, secondary, secondary-filled variants
    - Implement size variants (sm, md, lg)
    - Add disabled state styling
    - Apply brand colors: Yellow #FFD700, Violet #915AFF, Red #FE2C2B
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6_
  
  - [ ]* 3.2 Write property tests for Button styling
    - **Property 19: Primary Button Styling**
    - **Property 20: Secondary Button Styling**
    - **Property 21: Disabled Button Styling**
    - **Property 4: Forbidden Visual Effects Absence**
    - **Validates: Requirements 15.1, 15.2, 15.3, 15.4, 15.5, 15.6**
  
  - [x] 3.3 Implement custom StarIcon component
    - Create SVG-based star icon (not emoji)
    - Make icon customizable (size, color)
    - _Requirements: 16.1, 16.3, 5.4_
  
  - [ ]* 3.4 Write property test for custom icon implementation
    - **Property 9: Custom Icon Implementation**
    - **Validates: Requirements 5.4, 16.3**

- [x] 4. Header and Footer Components
  - [x] 4.1 Implement Header component
    - Add logo placeholder with "mi-Era logo here" text
    - Add navigation links (Home, About, Blog)
    - Add "Join the waitlist" CTA button
    - Implement scroll-to-form functionality
    - Make responsive for mobile/tablet/desktop
    - _Requirements: 2.1, 2.4, 2.5_
  
  - [ ]* 4.2 Write property test for scroll-to-form interaction
    - **Property 6: Scroll-to-Form Interaction**
    - **Validates: Requirements 2.4, 10.4**
  
  - [x] 4.3 Implement Footer component
    - Add CTA button
    - Add App Store and Google Play placeholders
    - Add Privacy Policy and Terms of Use links
    - _Requirements: 2.2_

- [x] 5. Waitlist Form and Email Service
  - [x] 5.1 Implement WaitlistForm component
    - Create form with single email input
    - Add client-side email validation (RFC 5322)
    - Implement loading, success, and error states
    - Add form submission handler
    - _Requirements: 11.1, 11.4_
  
  - [ ]* 5.2 Write property test for email validation
    - **Property 10: Email Validation and Error Display**
    - **Validates: Requirements 11.4**
  
  - [x] 5.3 Implement API route /api/waitlist
    - Create POST endpoint for email submission
    - Validate email format server-side
    - Store email in database with timestamp
    - Handle duplicate emails gracefully (idempotent)
    - Return appropriate status codes and messages
    - _Requirements: 11.2, 11.3, 11.5_
  
  - [ ]* 5.4 Write property tests for waitlist API
    - **Property 11: Email Persistence with Timestamp**
    - **Property 13: Duplicate Email Graceful Handling**
    - **Validates: Requirements 11.3, 11.5**
  
  - [x] 5.5 Implement Email Service
    - Configure nodemailer with Google SMTP
    - Create sendConfirmation function
    - Define email template placeholder with variables
    - Expose getEmailVariables function for template injection
    - _Requirements: 11.2, 11.6, 11.7, 11.8_
  
  - [ ]* 5.6 Write property test for email confirmation sending
    - **Property 12: Email Confirmation Sending**
    - **Validates: Requirements 11.2**

- [x] 6. Cookie Banner and Consent Management
  - [x] 6.1 Implement CookieBanner component
    - Create banner UI with accept/reject buttons
    - Display on first visit (check localStorage)
    - Hide after user choice
    - Add mechanism to re-open settings
    - _Requirements: 13.1, 13.2, 13.7_
  
  - [x] 6.2 Implement consent management logic
    - Store consent choice in localStorage
    - Create API route /api/consent for logging
    - Implement analytics tag loading/removal based on consent
    - _Requirements: 13.3, 13.4, 13.5, 13.6_
  
  - [ ]* 6.3 Write property tests for consent management
    - **Property 14: Analytics Blocking on Consent Rejection**
    - **Property 15: Analytics Loading on Consent Acceptance**
    - **Property 16: Consent Persistence in Storage**
    - **Property 17: Cookie Banner Display Before Tracking**
    - **Validates: Requirements 13.1, 13.3, 13.4, 13.5, 13.6**

- [x] 7. Page Sections - Part 1 (Hero, Statistics, Benefits)
  - [x] 7.1 Implement Hero section
    - Add heading "A reliable space where teens can grow"
    - Add motivating subheading
    - Add "Get early access" CTA button
    - Add 3-4 app screenshot placeholders
    - Apply Violet #915AFF background
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  
  - [x] 7.2 Implement Statistics section
    - Display 4-5 large statistics with emotional meaning
    - Apply White #FFFFFF background
    - Make responsive
    - _Requirements: 4.1, 4.2_
  
  - [x] 7.3 Implement Benefits section
    - Add heading "Why Mi-Era gets you"
    - Create 6 benefit cards with exact titles
    - Add custom icon placeholder, title, and description to each card
    - _Requirements: 5.1, 5.2, 5.3_
  
  - [ ]* 7.4 Write property test for benefit card structure
    - **Property 8: Benefit Card Structure Completeness**
    - **Validates: Requirements 5.3**

- [x] 8. Page Sections - Part 2 (Key Features, How It Works)
  - [x] 8.1 Implement Key Features section
    - Add heading "Everything you need" with subheading
    - Apply White #FFFFFF background
    - Create 3 feature blocks with star icon, heading, description, screenshot
    - Add "App is adaptive to your behavior" with Green #57BD2D frame (right)
    - Add "Emotional Journal" with Blue #3755F0 frame (left)
    - Add "Progress and Rewards" with Red #FE2C2B frame (right)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_
  
  - [x] 8.2 Implement How It Works section
    - Display 3-4 numbered steps
    - Use simple, supportive language
    - Make visually clear with minimal cognitive load
    - _Requirements: 7.1_

- [x] 9. Page Sections - Part 3 (Testimonials, Pricing, Download CTA)
  - [x] 9.1 Implement Testimonials section
    - Display testimonials from teenagers, parents, educators
    - Use emotional, believable language
    - _Requirements: 8.1_
  
  - [x] 9.2 Implement Pricing section
    - Display 3 pricing plans (1 free, 2 paid)
    - Visually highlight middle plan
    - Use transparent, calm language
    - _Requirements: 9.1, 9.2_
  
  - [x] 9.3 Implement Download CTA section
    - Add motivating heading
    - Add "Join the waitlist" CTA button
    - Add App Store and Google Play placeholders
    - Link to WaitlistForm
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [x] 10. Page Sections - Part 4 (FAQ)
  - [x] 10.1 Implement FAQ section
    - Add questions about: Age, Data security, AI functionality, School usage
    - Use accessible, easy-to-scan format (accordion or similar)
    - Use supportive, non-defensive language
    - _Requirements: 12.1, 12.2_
  
  - [ ]* 10.2 Write property test for FAQ accessibility
    - **Property 23: Semantic HTML Structure**
    - **Validates: Requirements 18.2**

- [x] 11. Main Page Integration
  - [x] 11.1 Assemble all sections in app/page.tsx
    - Import and render all section components in correct order
    - Ensure proper spacing and layout
    - Verify section background colors
    - _Requirements: 2.3_
  
  - [ ]* 11.2 Write property test for section background colors
    - **Property 5: Section Background Color Uniqueness**
    - **Validates: Requirements 1.7**

- [x] 12. Checkpoint - Core Functionality Complete
  - Ensure all tests pass
  - Verify all sections render correctly
  - Test waitlist form submission end-to-end
  - Test cookie consent flow
  - Ask the user if questions arise

- [ ] 13. Brand Compliance and Content Validation
  - [ ] 13.1 Implement brand color validation utility
    - Create function to extract all colors from stylesheets
    - Create function to validate against brand palette
    - _Requirements: 1.1_
  
  - [ ]* 13.2 Write property test for brand color compliance
    - **Property 1: Brand Color Palette Compliance**
    - **Validates: Requirements 1.1**
  
  - [ ] 13.3 Implement typography validation
    - Verify heading elements use Special Gothic Expanded
    - Verify body text uses Lexend
    - _Requirements: 1.2, 1.3_
  
  - [ ]* 13.4 Write property test for typography compliance
    - **Property 2: Typography Compliance**
    - **Validates: Requirements 1.2, 1.3**
  
  - [ ] 13.5 Implement content validation for forbidden words
    - Create utility to scan text content
    - Check for "optimize", "boost", "maximize"
    - _Requirements: 14.3_
  
  - [ ]* 13.6 Write property test for forbidden word absence
    - **Property 18: Forbidden Word Absence**
    - **Validates: Requirements 14.3**
  
  - [ ] 13.7 Verify exact slogan display
    - Ensure "Own your era" appears exactly as specified
    - _Requirements: 1.6_

- [ ] 14. Accessibility Implementation
  - [ ] 14.1 Add semantic HTML structure
    - Use header, nav, main, section, footer elements
    - Ensure proper heading hierarchy
    - _Requirements: 18.2_
  
  - [ ] 14.2 Add alt text to all images and placeholders
    - Provide descriptive alt text for screenshots
    - Provide descriptive text for icon placeholders
    - _Requirements: 18.3, 1.4_
  
  - [ ]* 14.3 Write property test for image alt text
    - **Property 24: Image Alt Text Presence**
    - **Validates: Requirements 18.3**
  
  - [ ] 14.4 Implement keyboard navigation
    - Ensure all interactive elements are keyboard accessible
    - Add visible focus indicators
    - Test tab order
    - _Requirements: 18.5_
  
  - [ ]* 14.5 Write property test for keyboard navigation
    - **Property 26: Keyboard Navigation Completeness**
    - **Validates: Requirements 18.5**
  
  - [ ] 14.6 Verify color contrast ratios
    - Check all text/background combinations
    - Ensure WCAG AA compliance (4.5:1 for normal, 3:1 for large)
    - _Requirements: 18.4_
  
  - [ ]* 14.7 Write property test for color contrast
    - **Property 25: Color Contrast Compliance**
    - **Validates: Requirements 18.4**

- [ ] 15. Responsive Design and Performance
  - [ ] 15.1 Implement responsive layouts for all sections
    - Test mobile (320-767px)
    - Test tablet (768-1023px)
    - Test desktop (1024px+)
    - Ensure no horizontal overflow
    - _Requirements: 2.5_
  
  - [ ]* 15.2 Write property test for responsive layout integrity
    - **Property 7: Responsive Layout Integrity**
    - **Validates: Requirements 2.5**
  
  - [ ] 15.3 Optimize font loading
    - Configure Google Fonts with display=swap
    - Add font-display: swap to @font-face rules
    - Test async loading
    - _Requirements: 18.1_
  
  - [ ] 15.4 Implement missing asset placeholders
    - Add error handling for failed image loads
    - Display descriptive placeholder text
    - _Requirements: 1.4_
  
  - [ ]* 15.5 Write property test for missing asset placeholders
    - **Property 3: Missing Asset Placeholder Display**
    - **Validates: Requirements 1.4**

- [ ] 16. Security and Environment Configuration
  - [ ] 16.1 Implement environment variable validation
    - Check for required env vars on startup
    - Validate SMTP credentials format
    - Validate database connection string
    - _Requirements: 17.7_
  
  - [ ]* 16.2 Write property test for environment variable security
    - **Property 22: Environment Variable Security**
    - **Validates: Requirements 17.7**
  
  - [ ] 16.3 Create .env.example file
    - Document all required environment variables
    - Provide example values (not real credentials)
    - _Requirements: 17.7_

- [x] 17. Privacy Policy and Terms of Use Pages
  - [x] 17.1 Create app/privacy/page.tsx
    - Add Privacy Policy content placeholder
    - Use consistent layout with main page
    - _Requirements: 2.2_
  
  - [x] 17.2 Create app/terms/page.tsx
    - Add Terms of Use content placeholder
    - Use consistent layout with main page
    - _Requirements: 2.2_

- [ ] 18. Final Integration and Testing
  - [ ] 18.1 Run all property-based tests
    - Execute all 26 property tests
    - Verify 100+ iterations per test
    - Fix any failing properties
  
  - [ ]* 18.2 Write integration tests for full user flows
    - Test: Visit page → Submit email → Receive confirmation
    - Test: Reject cookies → Verify no analytics
    - Test: Accept cookies → Verify analytics loaded
  
  - [ ] 18.3 Perform manual testing
    - Test on real mobile devices
    - Test on different browsers (Chrome, Firefox, Safari)
    - Verify all links work
    - Verify all CTAs scroll/navigate correctly
  
  - [ ] 18.4 Run accessibility audit
    - Use jest-axe for automated checks
    - Use browser DevTools Lighthouse
    - Fix any accessibility violations

- [ ] 19. Final Checkpoint - Production Ready
  - Ensure all tests pass (unit + property + integration)
  - Verify Docker Compose setup works
  - Test production build (npm run build)
  - Verify environment variables are documented
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties with 100+ iterations
- Unit tests validate specific examples and edge cases
- Checkpoints ensure incremental validation at major milestones
- All sensitive configuration must use environment variables
- Brand compliance is enforced through automated property tests