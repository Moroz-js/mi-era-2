interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface FAQItem {
  question: string;
  answer: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

/**
 * Generate Organization structured data (schema.org)
 * Used on the home page to identify the organization
 */
export function generateOrganization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'mi-Era',
    url: BASE_URL,
    logo: `${BASE_URL}/assets/logo.png`,
    description: 'A mobile task-tracking app with AI assistant designed for teenagers aged 13-18. Own your era with no guilt, no pressure - just growth.',
    sameAs: [
      // Add social media links when available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'no-reply@mi-era.org',
      contactType: 'Customer Service',
    },
  };
}

/**
 * Generate WebSite structured data with search action
 * Used on the home page to enable site search in search engines
 */
export function generateWebSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'mi-Era',
    url: BASE_URL,
    description: 'A reliable space where teens can grow',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate BlogPosting structured data
 * Used on individual blog post pages
 * @param post - The blog post data
 */
export function generateBlogPosting(post: BlogPost) {
  const description = post.excerpt || post.content.substring(0, 160).replace(/<[^>]*>/g, '');
  const imageUrl = post.featuredImage || `${BASE_URL}/assets/logo.png`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    image: imageUrl,
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      '@type': 'Organization',
      name: 'mi-Era',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'mi-Era',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/assets/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`,
    },
    url: `${BASE_URL}/blog/${post.slug}`,
  };
}

/**
 * Generate FAQPage structured data
 * Used on pages with FAQ sections
 * @param faqs - Array of FAQ items
 */
export function generateFAQPage(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Blog structured data
 * Used on the blog listing page
 * @param posts - Array of published blog posts
 */
export function generateBlog(posts: Array<{ slug: string; title: string; createdAt: Date }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'mi-Era Blog',
    description: 'Insights on motivation, productivity, and mental wellness for teenagers',
    url: `${BASE_URL}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'mi-Era',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/assets/logo.png`,
      },
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${BASE_URL}/blog/${post.slug}`,
      datePublished: post.createdAt.toISOString(),
    })),
  };
}
