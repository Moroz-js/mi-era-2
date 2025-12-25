# Requirements Document

## Introduction

mi-Era landing page is a brand-focused marketing website for a mobile task-tracking application with AI assistant designed for teenagers aged 13-18. The landing page must strictly follow mi-Era brand identity, communicate the product's value proposition to teenagers (not parents), and collect early access signups through a waitlist form.

## Glossary

- **Landing_Page**: The main marketing website for mi-Era product
- **Waitlist_Form**: Email collection form for early access signups
- **Cookie_Banner**: GDPR-compliant consent management interface
- **Brand_System**: mi-Era's visual identity including colors, typography, and iconography
- **Hero_Section**: Primary above-the-fold content area
- **Email_Service**: Google SMTP integration for sending confirmation emails
- **Database**: PostgreSQL database for storing waitlist emails
- **Analytics_Tags**: Third-party tracking scripts (Google Analytics, etc.)

## Requirements

### Requirement 1: Brand Identity Compliance

**User Story:** As a brand manager, I want the landing page to strictly follow mi-Era brand guidelines, so that the visual identity remains consistent and recognizable.

#### Acceptance Criteria

1. THE Landing_Page SHALL use the exact color palette: Yellow #FFD700, Violet #915AFF, Red #FE2C2B, Blue #3755F0, Green #57BD2D, Orange #FF7B1C, Black #000000, White #FFFFFF
2. THE Landing_Page SHALL use Special Gothic Expanded font for headings via Google Fonts
3. THE Landing_Page SHALL use Lexend font for body text via Google Fonts
4. WHEN brand assets (logo, icons, screenshots) are unavailable, THE Landing_Page SHALL display explicit placeholders with descriptive text
5. THE Landing_Page SHALL NOT use gradient effects, shadows on brand elements, or substitute fonts
6. THE Landing_Page SHALL display the exact slogan "Own your era" without modifications
7. THE Landing_Page SHALL use one dominant background color per section as specified in brand guidelines

### Requirement 2: Page Structure and Navigation

**User Story:** As a visitor, I want to navigate through clear sections of content, so that I can understand what mi-Era offers.

#### Acceptance Criteria

1. THE Landing_Page SHALL include a header with logo, navigation links (Home, About, Blog), and "Join the waitlist" CTA
2. THE Landing_Page SHALL include a footer with CTA, App Store/Google Play placeholders, Privacy Policy, and Terms of Use links
3. THE Landing_Page SHALL include all required sections in order: Hero, Statistics, Benefits, Key Features, How It Works, Testimonials, Pricing, Download CTA, Waitlist Form, FAQ
4. WHEN a user clicks "Join the waitlist" in header, THE Landing_Page SHALL scroll to the Waitlist_Form
5. THE Landing_Page SHALL be responsive and functional on mobile, tablet, and desktop viewports

### Requirement 3: Hero Section

**User Story:** As a teenager visiting the site, I want to immediately understand what mi-Era is, so that I can decide if it's relevant to me.

#### Acceptance Criteria

1. THE Hero_Section SHALL display the heading "A reliable space where teens can grow"
2. THE Hero_Section SHALL display a motivating subheading explaining mi-Era's purpose
3. THE Hero_Section SHALL include a "Get early access" CTA button with Yellow #FFD700 background and Black text
4. THE Hero_Section SHALL display 3-4 app screenshot placeholders showing: task list, AI chat, emotional journal
5. THE Hero_Section SHALL use Violet #915AFF as the dominant background color

### Requirement 4: Statistics Section

**User Story:** As a visitor, I want to see meaningful metrics about mi-Era, so that I can understand its impact.

#### Acceptance Criteria

1. THE Landing_Page SHALL display 4-5 large statistics with emotional meaning (not vanity metrics)
2. THE Statistics_Section SHALL use White #FFFFFF as background color
3. THE Landing_Page SHALL present statistics that emphasize "no pressure", growth, and movement

### Requirement 5: Benefits Section

**User Story:** As a teenager, I want to understand why mi-Era is different from other productivity apps, so that I can see if it addresses my needs.

#### Acceptance Criteria

1. THE Landing_Page SHALL display the heading "Why Mi-Era gets you"
2. THE Landing_Page SHALL display 6 benefit cards with exact titles: "No guilt, no pressure", "Total privacy", "AI that actually helps", "Focus without overwhelm", "Track your emotions", "Celebrate every win"
3. WHEN displaying benefit cards, THE Landing_Page SHALL include a custom icon placeholder, title, and supporting description for each
4. THE Landing_Page SHALL NOT use standard emoji or generic icon sets

### Requirement 6: Key Features Section

**User Story:** As a visitor, I want to see the main features of mi-Era with visual examples, so that I can understand what the app does.

#### Acceptance Criteria

1. THE Landing_Page SHALL display the heading "Everything you need" with supporting description
2. THE Landing_Page SHALL use White #FFFFFF as background color for this section
3. THE Landing_Page SHALL display 3 feature blocks with star icon, heading, description, and app screenshot placeholder
4. THE Landing_Page SHALL display "App is adaptive to your behavior" feature with Green #57BD2D frame on screenshot, positioned on the right
5. THE Landing_Page SHALL display "Emotional Journal" feature with Blue #3755F0 frame on screenshot, positioned on the left
6. THE Landing_Page SHALL display "Progress and Rewards" feature with Red #FE2C2B frame on screenshot, positioned on the right

### Requirement 7: How It Works Section

**User Story:** As a visitor, I want to understand how to use mi-Era in simple steps, so that I know what to expect.

#### Acceptance Criteria

1. THE Landing_Page SHALL display 3-4 numbered steps explaining how mi-Era works
2. THE Landing_Page SHALL present steps with maximum clarity and minimum cognitive load
3. THE Landing_Page SHALL use simple, supportive language without corporate jargon

### Requirement 8: Testimonials Section

**User Story:** As a visitor, I want to read authentic testimonials, so that I can trust that mi-Era works for people like me.

#### Acceptance Criteria

1. THE Landing_Page SHALL display testimonials from teenagers, parents, and educators
2. THE Landing_Page SHALL present testimonials that feel emotional, believable, and authentic
3. THE Landing_Page SHALL NOT use generic or corporate-sounding testimonial language

### Requirement 9: Pricing Section

**User Story:** As a visitor, I want to understand pricing options clearly, so that I can decide which plan suits me.

#### Acceptance Criteria

1. THE Landing_Page SHALL display 3 pricing plans: one free and two paid
2. THE Landing_Page SHALL visually highlight the middle pricing plan
3. THE Landing_Page SHALL use transparent, calm language that builds trust
4. THE Landing_Page SHALL NOT use pressure tactics or urgency language

### Requirement 10: Download CTA Section

**User Story:** As a visitor ready to try mi-Era, I want clear download options, so that I can get the app.

#### Acceptance Criteria

1. THE Landing_Page SHALL display a motivating heading for the download section
2. THE Landing_Page SHALL include "Join the waitlist" CTA button
3. THE Landing_Page SHALL display App Store and Google Play button placeholders
4. THE Landing_Page SHALL scroll to or display the Waitlist_Form when CTA is clicked

### Requirement 11: Waitlist Form and Email Confirmation

**User Story:** As a visitor interested in mi-Era, I want to join the waitlist with my email, so that I can get early access.

#### Acceptance Criteria

1. THE Waitlist_Form SHALL collect only email address
2. WHEN a user submits a valid email, THE Email_Service SHALL send a confirmation email from no-reply@mi-era.org
3. WHEN a user submits a valid email, THE Database SHALL store the email address with timestamp
4. WHEN a user submits an invalid email, THE Waitlist_Form SHALL display a validation error
5. WHEN a user submits a duplicate email, THE Waitlist_Form SHALL handle it gracefully without error
6. THE Email_Service SHALL use Google SMTP for sending emails
7. THE Email_Service SHALL use a pre-existing HTML email template (not generated by the application)
8. THE Email_Service SHALL expose template variables for dynamic content insertion

### Requirement 12: FAQ Section

**User Story:** As a visitor with questions, I want to find answers about mi-Era, so that I can make an informed decision.

#### Acceptance Criteria

1. THE Landing_Page SHALL display FAQ section with questions about: Age requirements, Data security and privacy, AI functionality, School usage
2. THE Landing_Page SHALL present FAQ in an accessible, easy-to-scan format
3. THE Landing_Page SHALL use supportive, non-defensive language in answers

### Requirement 13: Cookie Banner and GDPR Compliance

**User Story:** As a visitor from the EU, I want to control my data collection preferences, so that my privacy is respected.

#### Acceptance Criteria

1. THE Cookie_Banner SHALL display on first visit before any tracking occurs
2. THE Cookie_Banner SHALL allow users to accept or reject analytics cookies
3. WHEN a user rejects analytics cookies, THE Landing_Page SHALL NOT load Analytics_Tags
4. WHEN a user accepts analytics cookies, THE Landing_Page SHALL load Analytics_Tags
5. THE Cookie_Banner SHALL store user consent preferences in browser storage
6. THE Cookie_Banner SHALL comply with GDPR requirements for consent management
7. THE Cookie_Banner SHALL allow users to change their preferences after initial choice

### Requirement 14: Tone of Voice and Content

**User Story:** As a teenager reading the site, I want the content to feel supportive and authentic, so that I feel understood and not judged.

#### Acceptance Criteria

1. THE Landing_Page SHALL use supportive, confident, playful, and emotionally supportive tone
2. THE Landing_Page SHALL NOT use corporate SaaS language, productivity clichés, or parental tone
3. THE Landing_Page SHALL NOT use words like "optimize", "boost", "maximize"
4. THE Landing_Page SHALL communicate "I'm with you. You're okay. You're just building your system."
5. THE Landing_Page SHALL speak primarily to teenagers, not parents or investors

### Requirement 15: Button Styling and Interaction

**User Story:** As a user interacting with the site, I want buttons to provide clear visual feedback, so that I understand what actions are available.

#### Acceptance Criteria

1. THE Landing_Page SHALL style primary CTA buttons with Yellow #FFD700 background and Black #000000 text
2. WHEN a user hovers over a primary button, THE Landing_Page SHALL change background to Violet #915AFF
3. THE Landing_Page SHALL style secondary buttons with transparent background and Black #000000 outline
4. WHEN a user hovers over a secondary button, THE Landing_Page SHALL change background to Red #FE2C2B with White text
5. THE Landing_Page SHALL style disabled buttons with Light Gray #E6E6E6 background and Light Gray #BDBDBD text
6. THE Landing_Page SHALL NOT use gradients or shadows on buttons

### Requirement 16: Star Symbol Usage

**User Story:** As a user experiencing the site, I want to see the star symbol used meaningfully, so that it reinforces the brand's message about progress and achievement.

#### Acceptance Criteria

1. THE Landing_Page SHALL use star symbols in progress indicators, achievements, and rewards contexts
2. THE Landing_Page SHALL NOT use star symbols purely as decoration
3. THE Landing_Page SHALL use custom star icon design (not standard emoji)

### Requirement 17: Technical Infrastructure

**User Story:** As a developer, I want the landing page to use modern, maintainable technologies, so that it's easy to update and deploy.

#### Acceptance Criteria

1. THE Landing_Page SHALL be built with Next.js 14+ using App Router
2. THE Landing_Page SHALL use TypeScript for type safety
3. THE Landing_Page SHALL use Tailwind CSS for styling
4. THE Database SHALL use PostgreSQL accessed via Drizzle ORM
5. THE Landing_Page SHALL run in Docker containers for consistent deployment
6. THE Landing_Page SHALL be deployable to a VPS environment
7. THE Landing_Page SHALL store sensitive configuration (SMTP credentials, database connection) in environment variables

### Requirement 18: Performance and Accessibility

**User Story:** As a user on any device or connection speed, I want the site to load quickly and be accessible, so that I can use it without frustration.

#### Acceptance Criteria

1. THE Landing_Page SHALL load fonts asynchronously to prevent render blocking
2. THE Landing_Page SHALL use semantic HTML for screen reader compatibility
3. THE Landing_Page SHALL provide alt text for all images and placeholders
4. THE Landing_Page SHALL maintain color contrast ratios meeting WCAG AA standards
5. THE Landing_Page SHALL be keyboard navigable for all interactive elements
