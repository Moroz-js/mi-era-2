import Link from 'next/link';
import { getAdminSession } from '@/lib/admin/auth';
import { redirect } from 'next/navigation';

const sections = [
  { key: 'hero', label: 'Hero Section', description: 'Main landing section with heading and CTA', icon: '🎯' },
  { key: 'statistics', label: 'Statistics', description: 'Key metrics and stats', icon: '📊' },
  { key: 'benefits', label: 'Benefits', description: 'Why Mi-Era exists', icon: '✨' },
  { key: 'key_features', label: 'Key Features', description: 'Everything you need', icon: '🚀' },
  { key: 'how_it_works', label: 'How It Works', description: '4-step process', icon: '⚙️' },
  { key: 'testimonials', label: 'Testimonials', description: 'What people are saying', icon: '💬' },
  { key: 'pricing', label: 'Pricing', description: 'Plans and pricing', icon: '💰' },
  { key: 'download_cta', label: 'Download CTA', description: 'Final call-to-action', icon: '📲' },
  { key: 'faq', label: 'FAQ', description: 'Questions & answers', icon: '❓' },
];

export default async function HomepagePage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Homepage Content</h1>
        <p className="text-gray-600">
          Edit content for each section of the homepage. Changes are saved immediately and will appear on the live site.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link
            key={section.key}
            href={`/admin/homepage/${section.key}`}
            className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-brand-violet transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{section.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {section.label}
                </h3>
                <p className="text-sm text-gray-600">{section.description}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-brand-violet text-sm font-medium">
              <span>Edit section</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
