import { Header, Footer } from "../src/components/ui";
import { Hero, Statistics, Benefits, KeyFeatures, HowItWorks, Testimonials, Pricing, DownloadCTA, FAQ } from "../src/components/sections";
import { CheckCircleIcon, ShieldIcon, TargetIcon, HeartIcon, LightbulbIcon, TrophyIcon } from "../src/components/icons/BenefitIcons";
import { StructuredDataScripts } from "../src/components/StructuredDataScripts";
import { db } from '@/lib/db/client';
import { homepageSections } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { defaultHomepageData } from '@/lib/homepage-defaults';

// This page uses DB-backed content; avoid build-time static prerendering in CI image builds.
export const dynamic = 'force-dynamic';

// Icon mapping for Benefits section
const iconMap = {
  CheckCircle: CheckCircleIcon,
  Lightbulb: LightbulbIcon,
  Shield: ShieldIcon,
  Trophy: TrophyIcon,
  Target: TargetIcon,
  Heart: HeartIcon,
};

/**
 * Fetch a section's content from DB, fallback to defaults
 */
async function getSectionContent(key: string) {
  try {
    const [section] = await db
      .select()
      .from(homepageSections)
      .where(eq(homepageSections.sectionKey, key));
    
    if (section) {
      return section.content;
    }
  } catch (error) {
    console.error(`Error fetching section ${key}:`, error);
  }
  
  // Fallback to defaults
  return (defaultHomepageData as any)[key];
}

export default async function Home() {
  // Fetch all sections from DB (with fallback to defaults)
  const hero = await getSectionContent('hero');
  const statistics = await getSectionContent('statistics');
  const benefitsRaw = await getSectionContent('benefits');
  const keyFeaturesRaw = await getSectionContent('key_features');
  const howItWorks = await getSectionContent('how_it_works');
  const testimonials = await getSectionContent('testimonials');
  const pricing = await getSectionContent('pricing');
  const downloadCTA = await getSectionContent('download_cta');
  const faq = await getSectionContent('faq');

  // Transform Benefits data - add JSX icons
  const benefits = {
    ...benefitsRaw,
    benefits: benefitsRaw.benefits.map((benefit: any) => {
      const IconComponent = iconMap[benefit.iconType as keyof typeof iconMap];
      return {
        ...benefit,
        icon: (
          <div className="w-16 h-16 bg-brand-yellow rounded-lg flex items-center justify-center">
            <IconComponent size={32} color="#000000" />
          </div>
        ),
      };
    }),
  };

  // Transform KeyFeatures data - add JSX icons
  const keyFeatures = {
    ...keyFeaturesRaw,
    features: keyFeaturesRaw.features.map((feature: any) => ({
      ...feature,
      icon: <img src={feature.iconSrc} alt="star" className="w-6 h-6" />,
    })),
  };

  return (
    <div className="min-h-screen bg-brand-white flex flex-col">
      {/* Structured Data for SEO */}
      <StructuredDataScripts faqItems={faq.items} />
      
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero {...hero} />

        {/* Statistics Section */}
        <Statistics {...statistics} />

        {/* Benefits Section */}
        <Benefits {...benefits} />

        {/* Key Features Section */}
        <KeyFeatures {...keyFeatures} />

        {/* How It Works Section */}
        <HowItWorks {...howItWorks} />

        {/* Testimonials Section */}
        <Testimonials {...testimonials} />

        {/* Pricing Section */}
        <Pricing {...pricing} />

        {/* Download CTA Section */}
        <DownloadCTA {...downloadCTA} />

        {/* FAQ Section */}
        <FAQ {...faq} />
      </main>
      <Footer />
    </div>
  );
}
