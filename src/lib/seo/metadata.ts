import { Metadata } from 'next';

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

interface StaticPage {
  id: number;
  slug: string;
  title: string;
  content: string;
  updatedAt: Date;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

/**
 * Generate metadata for static pages
 * @param page - The page identifier (home, about, privacy, terms)
 * @param data - Optional page data for dynamic content
 */
export function generatePageMetadata(page: string, data?: StaticPage): Metadata {
  const baseMetadata = {
    metadataBase: new URL(BASE_URL),
  };

  switch (page) {
    case 'home':
      return {
        ...baseMetadata,
        title: 'mi-Era - A reliable space where teens can grow',
        description: 'mi-Era is a mobile task-tracking app with AI assistant designed for teenagers aged 13-18. Own your era with no guilt, no pressure - just growth.',
        keywords: ['teen productivity', 'task tracking', 'AI assistant', 'emotional journal', 'teen mental health'],
        openGraph: {
          title: 'mi-Era - A reliable space where teens can grow',
          description: 'mi-Era is a mobile task-tracking app with AI assistant designed for teenagers aged 13-18. Own your era with no guilt, no pressure - just growth.',
          url: BASE_URL,
          siteName: 'mi-Era',
          images: [
            {
              url: `${BASE_URL}/assets/logo.png`,
              width: 1200,
              height: 630,
              alt: 'mi-Era logo',
            },
          ],
          locale: 'en_US',
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title: 'mi-Era - A reliable space where teens can grow',
          description: 'mi-Era is a mobile task-tracking app with AI assistant designed for teenagers aged 13-18. Own your era with no guilt, no pressure - just growth.',
          images: [`${BASE_URL}/assets/logo.png`],
        },
        alternates: {
          canonical: BASE_URL,
        },
      };

    case 'about':
      return {
        ...baseMetadata,
        title: data?.title || 'About Us - mi-Era',
        description: 'Learn more about mi-Era, the task-tracking app designed specifically for teenagers to grow without pressure.',
        openGraph: {
          title: data?.title || 'About Us - mi-Era',
          description: 'Learn more about mi-Era, the task-tracking app designed specifically for teenagers to grow without pressure.',
          url: `${BASE_URL}/about`,
          siteName: 'mi-Era',
          images: [
            {
              url: `${BASE_URL}/assets/logo.png`,
              width: 1200,
              height: 630,
              alt: 'mi-Era logo',
            },
          ],
          locale: 'en_US',
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title: data?.title || 'About Us - mi-Era',
          description: 'Learn more about mi-Era, the task-tracking app designed specifically for teenagers to grow without pressure.',
          images: [`${BASE_URL}/assets/logo.png`],
        },
        alternates: {
          canonical: `${BASE_URL}/about`,
        },
      };

    case 'privacy':
      return {
        ...baseMetadata,
        title: data?.title || 'Privacy Policy - mi-Era',
        description: 'Read our privacy policy to understand how we protect your data and respect your privacy.',
        openGraph: {
          title: data?.title || 'Privacy Policy - mi-Era',
          description: 'Read our privacy policy to understand how we protect your data and respect your privacy.',
          url: `${BASE_URL}/privacy`,
          siteName: 'mi-Era',
          images: [
            {
              url: `${BASE_URL}/assets/logo.png`,
              width: 1200,
              height: 630,
              alt: 'mi-Era logo',
            },
          ],
          locale: 'en_US',
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title: data?.title || 'Privacy Policy - mi-Era',
          description: 'Read our privacy policy to understand how we protect your data and respect your privacy.',
          images: [`${BASE_URL}/assets/logo.png`],
        },
        alternates: {
          canonical: `${BASE_URL}/privacy`,
        },
      };

    case 'terms':
      return {
        ...baseMetadata,
        title: data?.title || 'Terms of Use - mi-Era',
        description: 'Read our terms of use to understand the rules and guidelines for using mi-Era.',
        openGraph: {
          title: data?.title || 'Terms of Use - mi-Era',
          description: 'Read our terms of use to understand the rules and guidelines for using mi-Era.',
          url: `${BASE_URL}/terms`,
          siteName: 'mi-Era',
          images: [
            {
              url: `${BASE_URL}/assets/logo.png`,
              width: 1200,
              height: 630,
              alt: 'mi-Era logo',
            },
          ],
          locale: 'en_US',
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title: data?.title || 'Terms of Use - mi-Era',
          description: 'Read our terms of use to understand the rules and guidelines for using mi-Era.',
          images: [`${BASE_URL}/assets/logo.png`],
        },
        alternates: {
          canonical: `${BASE_URL}/terms`,
        },
      };

    case 'blog':
      return {
        ...baseMetadata,
        title: 'Blog - mi-Era',
        description: 'Read the latest articles and insights about teen productivity, mental health, and personal growth.',
        openGraph: {
          title: 'Blog - mi-Era',
          description: 'Read the latest articles and insights about teen productivity, mental health, and personal growth.',
          url: `${BASE_URL}/blog`,
          siteName: 'mi-Era',
          images: [
            {
              url: `${BASE_URL}/assets/logo.png`,
              width: 1200,
              height: 630,
              alt: 'mi-Era logo',
            },
          ],
          locale: 'en_US',
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title: 'Blog - mi-Era',
          description: 'Read the latest articles and insights about teen productivity, mental health, and personal growth.',
          images: [`${BASE_URL}/assets/logo.png`],
        },
        alternates: {
          canonical: `${BASE_URL}/blog`,
        },
      };

    default:
      return {
        ...baseMetadata,
        title: 'mi-Era',
        description: 'A reliable space where teens can grow',
        alternates: {
          canonical: BASE_URL,
        },
      };
  }
}

/**
 * Generate metadata for blog posts
 * @param post - The blog post data
 */
export function generateBlogMetadata(post: BlogPost): Metadata {
  const baseMetadata = {
    metadataBase: new URL(BASE_URL),
  };

  const description = post.excerpt || post.content.substring(0, 160).replace(/<[^>]*>/g, '');
  const imageUrl = post.featuredImage || `${BASE_URL}/assets/logo.png`;

  return {
    ...baseMetadata,
    title: `${post.title} - mi-Era Blog`,
    description,
    openGraph: {
      title: post.title,
      description,
      url: `${BASE_URL}/blog/${post.slug}`,
      siteName: 'mi-Era',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${BASE_URL}/blog/${post.slug}`,
    },
  };
}
