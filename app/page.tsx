'use client';

import { Header, Footer } from "../src/components/ui";
import { Hero, Statistics, Benefits, KeyFeatures, HowItWorks, Testimonials, Pricing, DownloadCTA, FAQ } from "../src/components/sections";
import { CheckCircleIcon, ShieldIcon, TargetIcon, HeartIcon, LightbulbIcon, TrophyIcon } from "../src/components/icons/BenefitIcons";
import Script from "next/script";

export default function Home() {
  // Hero section content
  const heroData = {
    heading: "A reliable space where teens can grow2",
    subheading: "Track your tasks, understand your emotions, and build habits that actually work for you. No pressure, no judgment—just support.",
    ctaText: "Get early access",
    screenshots: [
      { src: "/placeholders/task-list.png", alt: "Task List Screenshot", aspectRatio: "9/16" },
      { src: "/placeholders/ai-chat.png", alt: "AI Chat Screenshot", aspectRatio: "9/16" },
      { src: "/placeholders/emotional-journal.png", alt: "Emotional Journal Screenshot", aspectRatio: "9/16" },
      { src: "/placeholders/progress.png", alt: "Progress Screenshot", aspectRatio: "9/16" },
    ],
  };

  // Statistics section content
  const statisticsData = {
    stats: [
      {
        value: "0",
        label: "pressure",
        description: "Just a calm space to build your routine",
      },
      {
        value: "100%",
        label: "yours",
        description: "Your tasks, your way, your privacy",
      },
      {
        value: "24/7",
        label: "support",
        description: "AI assistant ready when you need it",
      },
      {
        value: "∞",
        label: "chances",
        description: "Every day is a fresh start",
      },
      {
        value: "1",
        label: "you",
        description: "Built for your unique brain and pace",
      },
    ],
  };

  // Benefits section content
  const benefitsData = {
    heading: "Why Mi-Era works",
    subheading: "Because it's designed for how you actually think and feel, not how productivity apps think you should.",
    benefits: [
      {
        icon: (
          <div className="w-16 h-16 bg-brand-yellow rounded-lg flex items-center justify-center">
            <CheckCircleIcon size={32} color="#000000" />
          </div>
        ),
        title: "Structure without stress",
        description: "Build routines that actually work for your brain. No guilt if things don't go perfectly.",
      },
      {
        icon: (
          <div className="w-16 h-16 bg-brand-yellow rounded-lg flex items-center justify-center">
            <LightbulbIcon size={32} color="#000000" />
          </div>
        ),
        title: "AI that gets you",
        description: "Your assistant learns how you think and helps you plan in a way that feels natural, not forced.",
      },
      {
        icon: (
          <div className="w-16 h-16 bg-brand-yellow rounded-lg flex items-center justify-center">
            <ShieldIcon size={32} color="#000000" />
          </div>
        ),
        title: "Total privacy",
        description: "Your space. Your thoughts. No parents peeking. No tracking. No surveillance.",
      },
      {
        icon: (
          <div className="w-16 h-16 bg-brand-yellow rounded-lg flex items-center justify-center">
            <TrophyIcon size={32} color="#000000" />
          </div>
        ),
        title: "Progress that feels good",
        description: "Celebrate small wins with rewards that remind you: you're building something real.",
      },
      {
        icon: (
          <div className="w-16 h-16 bg-brand-yellow rounded-lg flex items-center justify-center">
            <TargetIcon size={32} color="#000000" />
          </div>
        ),
        title: "Focus without overwhelm",
        description: "Break down big tasks into doable steps. One thing at a time. You've got this.",
      },
      {
        icon: (
          <div className="w-16 h-16 bg-brand-yellow rounded-lg flex items-center justify-center">
            <HeartIcon size={32} color="#000000" />
          </div>
        ),
        title: "Emotional balance",
        description: "Journal your feelings, track your mood, understand yourself better. All in one place.",
      },
    ],
  };

  // Key Features section content
  const keyFeaturesData = {
    heading: "Everything you need",
    subheading: "Simple tools that work together to help you stay on track and feel good about your progress.",
    features: [
      {
        icon: <img src="/assets/star-1.png" alt="star" className="w-6 h-6" />,
        title: "App is adaptive to your behavior",
        description: "The more you use Mi-Era, the better it understands your patterns. It learns when you work best, what motivates you, and how to support you without being pushy.",
        screenshot: {
          src: "/placeholders/adaptive-behavior.png",
          alt: "Adaptive Behavior Screenshot",
          frameColor: "#57BD2D",
        },
        layout: "right" as const,
      },
      {
        icon: <img src="/assets/star-1.png" alt="star" className="w-6 h-6" />,
        title: "Emotional Journal",
        description: "Track how you're feeling alongside your tasks. See patterns, understand what affects your mood, and learn what helps you feel better.",
        screenshot: {
          src: "/placeholders/emotional-journal-feature.png",
          alt: "Emotional Journal Screenshot",
          frameColor: "#3755F0",
        },
        layout: "left" as const,
      },
      {
        icon: <img src="/assets/star-1.png" alt="star" className="w-6 h-6" />,
        title: "Progress and Rewards",
        description: "Celebrate every step forward. See your streaks, track your wins, and feel good about what you've accomplished—no matter how small.",
        screenshot: {
          src: "/placeholders/progress-rewards.png",
          alt: "Progress and Rewards Screenshot",
          frameColor: "#FE2C2B",
        },
        layout: "right" as const,
      },
    ],
  };

  // How It Works section content
  const howItWorksData = {
    heading: "How it works",
    steps: [
      {
        number: 1,
        title: "Add your tasks",
        description: "Write down what you need to do. No pressure, just clarity.",
      },
      {
        number: 2,
        title: "Check in with yourself",
        description: "Track how you're feeling. The app learns what works for you.",
      },
      {
        number: 3,
        title: "Get AI support",
        description: "Chat with an AI that gets it. No judgment, just help.",
      },
      {
        number: 4,
        title: "Celebrate your progress",
        description: "See how far you've come. Every small win counts.",
      },
    ],
  };

  // Testimonials section content
  const testimonialsData = {
    heading: "What people are saying",
    testimonials: [
      {
        quote: "I've tried so many productivity apps and they all made me feel worse when I couldn't keep up. Mi-Era is different. It actually helps me understand myself better.",
        author: "Alex, 16",
        role: "Student",
      },
      {
        quote: "My daughter has been using Mi-Era for two months and I've seen a real change. She's more aware of her emotions and less stressed about school. I'm grateful for this tool.",
        author: "Sarah M.",
        role: "Parent",
      },
      {
        quote: "As an educator, I appreciate how Mi-Era supports students without adding pressure. It's a tool that meets them where they are.",
        author: "Mr. Johnson",
        role: "High School Teacher",
      },
      {
        quote: "Finally, an app that doesn't make me feel guilty for being human. Some days I get everything done, some days I don't. Mi-Era helps me either way.",
        author: "Jordan, 17",
        role: "Student",
      },
      {
        quote: "I was skeptical about another 'teen app' but Mi-Era surprised me. The AI actually understands what I'm going through. It's like having a supportive friend who's always there.",
        author: "Maya, 15",
        role: "Student",
      },
      {
        quote: "Watching my students use Mi-Era has been eye-opening. They're more engaged with their work and better at managing their time without the usual stress.",
        author: "Dr. Chen",
        role: "School Counselor",
      },
    ],
  };

  // Pricing section content
  const pricingData = {
    heading: "Choose what works for you",
    subheading: "Start free, upgrade when you're ready. No pressure, no tricks.",
    plans: [
      {
        name: "Free",
        price: "$0",
        period: "forever",
        features: [
          "Basic task tracking",
          "Daily emotional check-ins",
          "Limited AI chat (10 messages/day)",
          "Progress tracking",
        ],
        highlighted: false,
        ctaText: "Get started",
      },
      {
        name: "Plus",
        price: "$4.99",
        period: "/month",
        features: [
          "Everything in Free",
          "Unlimited AI chat",
          "Advanced emotional insights",
          "Custom habit tracking",
          "Priority support",
          "Ad-free experience",
        ],
        highlighted: true,
        ctaText: "Start free trial",
      },
      {
        name: "Family",
        price: "$9.99",
        period: "/month",
        features: [
          "Everything in Plus",
          "Up to 4 family members",
          "Parent dashboard (optional)",
          "Shared family goals",
          "Family insights",
        ],
        highlighted: false,
        ctaText: "Start free trial",
      },
    ],
  };

  // Download CTA section content
  const downloadCTAData = {
    heading: "Ready to own your era?",
    subheading: "Join the waitlist and be the first to know when Mi-Era launches.",
  };

  // FAQ section content
  const faqData = {
    heading: "Questions? We've got answers",
    items: [
      {
        question: "What age is mi-Era designed for?",
        answer: "Mi-Era is built specifically for teenagers aged 13-18. We designed every feature with your needs in mind—from the way the AI talks to you, to how we handle your privacy. If you're in this age range and looking for a supportive way to manage your tasks and emotions, mi-Era is for you.",
      },
      {
        question: "How do you keep my data secure and private?",
        answer: "Your privacy is non-negotiable. Everything you write—your tasks, journal entries, and conversations with the AI—is encrypted and stored securely. We never share your personal information with anyone. Your parents can't see your private entries unless you choose to share them. We're GDPR compliant and take data protection seriously because we know how important your privacy is.",
      },
      {
        question: "How does the AI actually work? Is it just a chatbot?",
        answer: "Our AI is designed to understand you, not just respond to keywords. It learns your patterns—when you're most productive, what helps you feel better, and how to support you without being pushy. It's not here to lecture you or sound like a textbook. Think of it as a supportive friend who's always available, remembers what you've talked about, and actually gets what you're going through.",
      },
      {
        question: "Can I use mi-Era for school work?",
        answer: "Absolutely. Many students use mi-Era to manage homework, track assignments, and prepare for exams. The app helps you break down big projects into manageable steps and reminds you of deadlines without overwhelming you. Some teachers even recommend it to their students. Just remember—mi-Era is a tool to support your learning, not to do the work for you.",
      },
      {
        question: "What if I miss a day or fall behind?",
        answer: "That's completely okay. Life happens, and mi-Era is built around that reality. There's no guilt-tripping, no red alerts, no shame. When you come back, the app helps you figure out what matters most right now and how to move forward. Every day is a fresh start, and we're here to support you wherever you are.",
      },
      {
        question: "Do my parents have access to what I write?",
        answer: "No. Your private journal entries and AI conversations are yours alone. If you're using the Family plan, parents can see shared family goals and general progress stats (like how many tasks you completed), but they can't read your private thoughts or messages. You're in control of what you share.",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-brand-white flex flex-col">
      {/* Structured Data for SEO */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'mi-Era',
            url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
            logo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/assets/logo.png`,
            description: 'A mobile task-tracking app with AI assistant designed for teenagers aged 13-18. Own your era with no guilt, no pressure - just growth.',
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'no-reply@mi-era.org',
              contactType: 'Customer Service',
            },
          }),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'mi-Era',
            url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
            description: 'A reliable space where teens can grow',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/blog?search={search_term_string}`,
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqData.items.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        

        {/* FAQ Section */}
        <FAQ {...faqData} />
      </main>
      <Footer />
    </div>
  );
}
