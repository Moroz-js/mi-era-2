'use client';

import { useParams, useRouter } from 'next/navigation';
import { HeroForm } from '../_forms/HeroForm';
import { StatisticsForm } from '../_forms/StatisticsForm';
import { BenefitsForm } from '../_forms/BenefitsForm';
import { KeyFeaturesForm } from '../_forms/KeyFeaturesForm';
import { HowItWorksForm } from '../_forms/HowItWorksForm';
import { TestimonialsForm } from '../_forms/TestimonialsForm';
import { FAQForm } from '../_forms/FAQForm';

const sectionLabels: Record<string, string> = {
  hero: 'Hero Section',
  statistics: 'Statistics',
  benefits: 'Benefits',
  key_features: 'Key Features',
  how_it_works: 'How It Works',
  testimonials: 'Testimonials',
  pricing: 'Pricing (Not Editable)',
  download_cta: 'Download CTA (Not Editable)',
  faq: 'FAQ',
};

export default function EditHomepageSectionPage() {
  const params = useParams();
  const router = useRouter();
  const key = params.key as string;

  // Render the appropriate form based on the section key
  const renderForm = () => {
    switch (key) {
      case 'hero':
        return <HeroForm />;
      case 'statistics':
        return <StatisticsForm />;
      case 'benefits':
        return <BenefitsForm />;
      case 'key_features':
        return <KeyFeaturesForm />;
      case 'how_it_works':
        return <HowItWorksForm />;
      case 'testimonials':
        return <TestimonialsForm />;
      case 'faq':
        return <FAQForm />;
      case 'pricing':
      case 'download_cta':
        return (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">
              {sectionLabels[key]}
            </h3>
            <p className="text-yellow-800">
              This section is not yet editable through the admin panel. Please contact the development team if changes are needed.
            </p>
          </div>
        );
      default:
        return (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Section Not Found</h3>
            <p className="text-red-800">
              The section &quot;{key}&quot; does not have an editor configured.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <button
          onClick={() => router.push('/admin/homepage')}
          className="text-brand-violet hover:underline mb-4 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to homepage sections
        </button>
      </div>

      {renderForm()}
    </div>
  );
}
