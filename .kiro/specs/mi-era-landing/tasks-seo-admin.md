# Implementation Plan: SEO and Admin Panel

## Overview

This implementation plan covers the SEO optimization and Admin Panel features for the mi-Era landing page. These tasks extend the base landing page with content management capabilities and search engine optimization. The plan follows an incremental approach: database extension → SEO infrastructure → admin authentication → content management → integration.

## Prerequisites

- Base landing page implementation complete (Tasks 1-19 from main tasks.md)
- PostgreSQL database running
- Drizzle ORM configured
- Next.js 14+ with App Router

## Tasks

- [x] 20. Database Schema Extension for Blog and Admin
  - [x] 20.1 Define blog_posts table schema
    - Create schema with id, title, slug, excerpt, content, featuredImage, status, createdAt, updatedAt
    - Add unique constraint on slug
    - _Requirements: 21.4, 21.7_
  
  - [x] 20.2 Define blog_categories and blog_tags tables
    - Create categories table with id, name, slug, createdAt
    - Create tags table with id, name, slug, createdAt
    - Add unique constraints on slugs
    - _Requirements: 21.5, 21.6_
  
  - [x] 20.3 Define blog_post_categories and blog_post_tags junction tables
    - Create junction tables for many-to-many relationships
    - Add foreign key constraints with cascade delete
    - _Requirements: 21.5, 21.6_
  
  - [x] 20.4 Define static_pages table schema
    - Create schema with id, slug, title, content, updatedAt
    - Add unique constraint on slug
    - Seed initial data for 'about', 'privacy', 'terms'
    - _Requirements: 22.1, 22.5_
  
  - [x] 20.5 Define admin_sessions table schema
    - Create schema with id, sessionToken, expiresAt, createdAt
    - Add unique constraint on sessionToken
    - _Requirements: 20.4_
  
  - [x] 20.6 Generate and run database migrations
    - Generate migration files for all new tables
    - Test migration execution
    - _Requirements: 17.4_

- [ ]* 20.7 Write property tests for database schema
    - **Property 34: Blog Slug Uniqueness**
    - **Property 38: Static Page Content Persistence**
    - **Validates: Requirements 21.4, 22.5, 22.6**

- [x] 21. SEO Infrastructure
  - [x] 21.1 Implement metadata generation service
    - Create generatePageMetadata function for static pages
    - Create generateBlogMetadata function for blog posts
    - Include title, description, Open Graph, Twitter Card tags
    - _Requirements: 19.3, 19.9_
  
  - [x] 21.2 Implement structured data service
    - Create generateOrganization function for Organization schema
    - Create generateWebSite function with search action
    - Create generateBlogPosting function for blog posts
    - Create generateFAQPage function for FAQ sections
    - _Requirements: 19.4, 19.5, 19.6, 19.7_
  
  - [x] 21.3 Implement sitemap generation
    - Create dynamic sitemap.xml route
    - Include all public pages and published blog posts
    - Add lastModified, changeFrequency, priority
    - _Requirements: 19.1_
  
  - [x] 21.4 Implement robots.txt
    - Create robots.txt route
    - Allow all crawlers
    - Reference sitemap.xml location
    - _Requirements: 19.2_
  
  - [x] 21.5 Add canonical URLs to all pages
    - Implement canonical URL generation
    - Add to page metadata
    - _Requirements: 19.8_

- [ ]* 21.6 Write property tests for SEO
    - **Property 27: Sitemap Inclusion of Published Content**
    - **Property 28: Meta Tags Presence**
    - **Property 29: Structured Data Validity**
    - **Validates: Requirements 19.1, 19.3, 19.4, 19.5, 19.6, 19.7**

- [x] 22. Admin Authentication System
  - [x] 22.1 Implement session management
    - Create session token generation (32-byte random, base64)
    - Create session storage in database
    - Create session validation function
    - Implement 24-hour expiration
    - _Requirements: 20.4_
  
  - [x] 22.2 Implement admin login API
    - Create POST /api/admin/auth endpoint
    - Validate credentials against hardcoded values (admin:mi-era-admin)
    - Create session on success
    - Set HTTP-only cookie
    - _Requirements: 20.3, 20.4_
  
  - [x] 22.3 Implement admin logout API
    - Create POST /api/admin/logout endpoint
    - Delete session from database
    - Clear cookie
    - _Requirements: 20.7_
  
  - [x] 22.4 Implement auth middleware
    - Create middleware to protect /admin/* routes
    - Check session validity
    - Redirect to login if unauthenticated
    - _Requirements: 20.2, 20.6_
  
  - [x] 22.5 Implement admin login page
    - Create /admin/login page with form
    - Add username and password inputs
    - Handle form submission
    - Display error messages
    - Redirect to dashboard on success
    - _Requirements: 20.2, 20.5_

- [ ]* 22.6 Write property tests for admin authentication
    - **Property 30: Admin Route Protection**
    - **Property 31: Admin Authentication Validation**
    - **Validates: Requirements 20.2, 20.3, 20.5, 20.6**

- [x] 23. Image Upload System
  - [x] 23.1 Implement image upload API
    - Create POST /api/admin/upload endpoint
    - Validate file type (jpg, jpeg, png, gif, webp)
    - Validate file size (max 5MB)
    - Generate unique filename (timestamp-random-sanitized)
    - Save to /public/uploads directory
    - Return public URL
    - _Requirements: 24.3, 24.4, 24.5, 24.7_
  
  - [x] 23.2 Implement image upload component
    - Create ImageUpload component with file input
    - Add drag-and-drop support
    - Show upload progress
    - Display error messages
    - _Requirements: 24.1, 24.2_
  
  - [x] 23.3 Create /public/uploads directory
    - Ensure directory exists
    - Add .gitkeep file
    - Configure Next.js to serve static files
    - _Requirements: 24.8_

 - [ ]* 23.4 Write property tests for image upload
    - **Property 35: Image Upload Validation**
    - **Property 36: Uploaded Image Accessibility**
    - **Validates: Requirements 24.3, 24.4, 24.8**

- [x] 24. TipTap Editor Integration
  - [x] 24.1 Install and configure TipTap
    - Install @tiptap/react, @tiptap/starter-kit, @tiptap/extension-image
    - Create base editor configuration
    - Add toolbar with formatting options
    - _Requirements: 21.3, 22.3_
  
  - [x] 24.2 Implement BlogEditor component
    - Create editor with TipTap
    - Add title, slug, excerpt inputs
    - Add featured image upload
    - Add status selector (draft/published)
    - Add category multi-select with create option
    - Add tag multi-select with create option
    - Add save and cancel buttons
    - _Requirements: 21.3, 21.4, 21.5, 21.6_
  
  - [x] 24.3 Implement PageEditor component
    - Create editor with TipTap
    - Add title input
    - Add save and cancel buttons
    - _Requirements: 22.3, 22.4_
  
  - [x] 24.4 Integrate image upload into TipTap
    - Add image upload button to toolbar
    - Handle image insertion at cursor position
    - _Requirements: 21.12, 22.7_

- [x] 25. Blog Management System
  - [x] 25.1 Implement blog CRUD API
    - Create GET /api/admin/blog endpoint (list all posts)
    - Create POST /api/admin/blog endpoint (create post)
    - Create PUT /api/admin/blog/[id] endpoint (update post)
    - Create DELETE /api/admin/blog/[id] endpoint (delete post)
    - Handle categories and tags relationships
    - _Requirements: 21.7, 21.8, 21.9_
  
  - [x] 25.2 Implement blog list page
    - Create /admin/blog page
    - Display table with title, status, date
    - Add "Create New Post" button
    - Add edit and delete actions
    - Add confirmation dialog for delete
    - _Requirements: 21.1, 21.2, 21.9_
  
  - [x] 25.3 Implement create post page
    - Create /admin/blog/new page
    - Integrate BlogEditor component
    - Handle form submission
    - Redirect to blog list on success
    - _Requirements: 21.2, 21.3_
  
  - [x] 25.4 Implement edit post page
    - Create /admin/blog/[id] page
    - Load existing post data
    - Integrate BlogEditor component
    - Handle form submission
    - _Requirements: 21.8_
  
  - [x] 25.5 Implement public blog listing page
    - Update /blog page to fetch published posts from database
    - Filter out draft posts
    - Display posts with title, excerpt, date
    - Add pagination if needed
    - _Requirements: 21.10, 21.11_
  
  - [x] 25.6 Implement public blog post page
    - Update /blog/[slug] page to fetch post from database
    - Return 404 for draft posts
    - Display full post content
    - Add SEO metadata
    - Add structured data
    - _Requirements: 21.10, 21.11_

- [ ]* 25.7 Write property tests for blog management
    - **Property 32: Draft Post Exclusion**
    - **Property 33: Published Post Inclusion**
    - **Property 34: Blog Slug Uniqueness**
    - **Validates: Requirements 21.4, 21.10, 21.11**

- [x] 26. Static Pages Management
  - [x] 26.1 Implement static pages API
    - Create GET /api/admin/pages/[slug] endpoint
    - Create PUT /api/admin/pages/[slug] endpoint
    - Validate slug is one of: about, privacy, terms
    - _Requirements: 22.5_
  
  - [x] 26.2 Implement page edit interface
    - Create /admin/pages/[slug] page
    - Load existing page content
    - Integrate PageEditor component
    - Handle form submission
    - _Requirements: 22.2, 22.3, 22.4_
  
  - [x] 26.3 Update public static pages
    - Update /about page to fetch content from database
    - Update /privacy page to fetch content from database
    - Update /terms page to fetch content from database
    - _Requirements: 22.6_

- [ ]* 26.4 Write property test for static page persistence
    - **Property 38: Static Page Content Persistence**
    - **Validates: Requirements 22.5, 22.6**

- [x] 27. Waitlist Management in Admin
  - [x] 27.1 Implement waitlist view page
    - Create /admin/waitlist page
    - Fetch all waitlist emails from database
    - Display table with email, date, confirmed status
    - Sort by newest first
    - Display total count
    - _Requirements: 23.1, 23.2, 23.3, 23.7_
  
  - [x] 27.2 Implement CSV export
    - Create GET /api/admin/export endpoint
    - Generate CSV with headers: email,signup_date,confirmed
    - Set appropriate Content-Type and Content-Disposition headers
    - Trigger file download
    - _Requirements: 23.4, 23.5, 23.6_

- [ ]* 27.3 Write property test for CSV export
    - **Property 37: CSV Export Format**
    - **Validates: Requirements 23.5**

- [x] 28. Admin Dashboard and Navigation
  - [x] 28.1 Implement admin layout
    - Create /admin/layout.tsx with auth check
    - Add AdminHeader component with logout button
    - Add AdminNav sidebar with menu links
    - Apply brand colors
    - Make responsive for desktop
    - _Requirements: 25.1, 25.3, 25.4, 25.5_
  
  - [x] 28.2 Implement admin dashboard
    - Create /admin/dashboard page
    - Display summary statistics: total posts, drafts, published, waitlist count
    - Add quick links to main sections
    - _Requirements: 25.2_
  
  - [x] 28.3 Add success/error notifications
    - Create toast notification system
    - Display success messages after operations
    - Display error messages on failures
    - _Requirements: 25.6, 25.7_

- [ ] 29. Checkpoint - Admin and SEO Complete
  - Ensure all admin routes are protected
  - Test blog CRUD operations end-to-end
  - Test static page editing
  - Verify sitemap includes all published content
  - Test image uploads
  - Verify CSV export works
  - Ask the user if questions arise

- [ ] 30. Integration Testing and Final Polish
  - [ ] 30.1 Write integration tests for admin flows
    - Test: Login → Create post → Publish → Verify on public site
    - Test: Edit static page → Verify on public site
    - Test: Upload image → Insert in post → Verify on public site
    - Test: Export waitlist → Verify CSV format
  
  - [ ] 30.2 Test SEO implementation
    - Verify sitemap.xml is accessible and valid
    - Verify robots.txt is accessible
    - Verify meta tags on all pages
    - Verify structured data with Google Rich Results Test
    - Verify canonical URLs
  
  - [ ] 30.3 Security audit
    - Verify admin routes are protected
    - Verify session expiration works
    - Verify file upload validation
    - Verify SQL injection protection (Drizzle ORM)
    - Verify XSS protection in TipTap content
  
  - [ ] 30.4 Performance optimization
    - Optimize image loading
    - Add database indexes for common queries
    - Test page load times
    - Optimize bundle size

- [ ] 31. Final Production Checkpoint
  - Ensure all tests pass (unit + property + integration)
  - Verify all admin features work
  - Verify all SEO features work
  - Test production build
  - Update environment variables documentation
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties with 100+ iterations
- Unit tests validate specific examples and edge cases
- Checkpoints ensure incremental validation at major milestones
- All sensitive configuration must use environment variables
- Admin credentials are hardcoded for simplicity (admin:mi-era-admin)
- Image uploads are stored locally in /public/uploads
- TipTap is used for WYSIWYG editing
- SEO implementation follows Next.js 14+ best practices

## Dependencies

### NPM Packages to Install

```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image
```

### Environment Variables to Add

```env
# Admin session secret (for signing cookies)
ADMIN_SESSION_SECRET=your-secret-key-here

# Base URL for canonical URLs and sitemap
BASE_URL=https://mi-era.org
```

## Testing Strategy

- **Unit Tests**: Test individual components and API endpoints
- **Property Tests**: Validate universal properties (slug uniqueness, auth protection, etc.)
- **Integration Tests**: Test complete user flows (login → create → publish)
- **Manual Testing**: Verify SEO with Google Rich Results Test, test admin UI

## Deployment Checklist

- [ ] Run all database migrations
- [ ] Create /public/uploads directory
- [ ] Set environment variables
- [ ] Test admin login
- [ ] Verify sitemap.xml is accessible
- [ ] Verify robots.txt is accessible
- [ ] Test image uploads
- [ ] Test blog post creation and publishing
- [ ] Test static page editing
- [ ] Test waitlist CSV export
