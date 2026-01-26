'use client';

import Link from 'next/link';

const STATIC_PAGES = [
  { slug: 'about', title: 'About Us', description: 'Company information and mission' },
  { slug: 'privacy', title: 'Privacy Policy', description: 'Privacy and data protection policy' },
  { slug: 'terms', title: 'Terms of Service', description: 'Terms and conditions of use' },
];

export default function PagesListPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Static Pages</h1>
        <p className="text-gray-600 mt-2">
          Manage content for static pages on your website
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {STATIC_PAGES.map((page) => (
            <div
              key={page.slug}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {page.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {page.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Route: /{page.slug}
                  </p>
                </div>
                <Link
                  href={`/admin/pages/${page.slug}`}
                  className="ml-4 bg-brand-violet hover:bg-brand-violet/90 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
