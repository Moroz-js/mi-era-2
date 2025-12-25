'use client';

import { Header, Footer, WaitlistForm } from "../src/components/ui";
import { Hero, Statistics, Benefits, KeyFeatures, HowItWorks, Testimonials, Pricing, DownloadCTA, FAQ } from "../src/components/sections";
import { StarIcon } from "../src/components/icons/StarIcon";

export default function Home() {
  // Hero section content
  const heroData = {
    heading: "A reliable space where teens can grow",
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
        label: "Guilt trips",
        description: "We don't do pressure here",
      },
      {
        value: "100%",
        label: "Your pace",
        description: "Move at your own speed",
      },
      {
        value: "∞",
        label: "Fresh starts",
        description: "Every day is a new chance",
      },
      {
        value: "1",
        label: "You",
        description: "This is your space",
      },
      {
        value: "24/7",
        label: "Support",
        description: "AI that's always there",
      },
    ],
  };

  // Benefits section content
  const benefitsData = {
    heading: "Why Mi-Era gets you",
    benefits: [
      {
        icon: (
          <div className="w-16 h-16 bg-brand-violet rounded-full flex items-center justify-center text-brand-white text-2xl font-bold">
            ✓
          </div>
        ),
        title: "No guilt, no pressure",
        description: "Missed a task? That's okay. We're here to help you move forward, not make you feel bad.",
      },
      {
        icon: (
          <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center text-brand-white text-2xl font-bold">
            🔒
          </div>
        ),
        title: "Total privacy",
        description: "Your thoughts, your tasks, your emotions—completely private. No one else sees them.",
      },
      {
        icon: (
          <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center text-brand-white text-2xl font-bold">
            🤖
          </div>
        ),
        title: "AI that actually helps",
        description: "Not a chatbot that sounds like a corporate manual. Real support that understands you.",
      },
      {
        icon: (
          <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center text-brand-white text-2xl font-bold">
            🎯
          </div>
        ),
        title: "Focus without overwhelm",
        description: "See what matters today. Not a million things at once.",
      },
      {
        icon: (
          <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center text-brand-white text-2xl font-bold">
            💭
          </div>
        ),
        title: "Track your emotions",
        description: "Understand how you're feeling and what affects your mood. No judgment, just awareness.",
      },
      {
        icon: (
          <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center text-brand-black text-2xl font-bold">
            ⭐
          </div>
        ),
        title: "Celebrate every win",
        description: "Small progress is still progress. We help you see how far you've come.",
      },
    ],
  };

  // Key Features section content
  const keyFeaturesData = {
    heading: "Everything you need",
    subheading: "Simple tools that work together to help you stay on track and feel good about your progress.",
    features: [
      {
        icon: <StarIcon size={48} color="#57BD2D" />,
        title: "App is adaptive to your behavior",
        description: "The more you use mi-Era, the better it understands your patterns. It learns when you work best, what motivates you, and how to support you without being pushy.",
        screenshot: {
          src: "/placeholders/adaptive-behavior.png",
          alt: "Adaptive Behavior Screenshot",
          frameColor: "#57BD2D",
        },
        layout: "right" as const,
      },
      {
        icon: <StarIcon size={48} color="#3755F0" />,
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
        icon: <StarIcon size={48} color="#FE2C2B" />,
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
        description: "Write down what you need to do. No pressure, just get it out of your head.",
      },
      {
        number: 2,
        title: "Check in with yourself",
        description: "Track how you're feeling. The app learns what works for you.",
      },
      {
        number: 3,
        title: "Get AI support",
        description: "Chat with an AI that actually gets it. No judgment, just help when you need it.",
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
        quote: "My daughter has been using mi-Era for two months and I've seen a real change. She's more aware of her emotions and less stressed about school. I'm grateful for this tool.",
        author: "Sarah M.",
        role: "Parent",
      },
      {
        quote: "As an educator, I appreciate how mi-Era supports students without adding pressure. It's a tool that meets them where they are.",
        author: "Mr. Johnson",
        role: "High School Teacher",
      },
      {
        quote: "Finally, an app that doesn't make me feel guilty for being human. Some days I get everything done, some days I don't. Mi-Era helps me either way.",
        author: "Jordan, 17",
        role: "Student",
      },
      {
        quote: "I was skeptical about another 'teen app' but mi-Era surprised me. The AI actually understands what I'm going through. It's like having a supportive friend who's always there.",
        author: "Maya, 15",
        role: "Student",
      },
      {
        quote: "Watching my students use mi-Era has been eye-opening. They're more engaged with their work and better at managing their time without the usual stress.",
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
    subheading: "Join the waitlist and be the first to know when mi-Era launches.",
    ctaText: "Join the waitlist",
    onCtaClick: () => {
      const waitlistForm = document.getElementById('waitlist-form');
      if (waitlistForm) {
        waitlistForm.scrollIntoView({ behavior: 'smooth' });
      }
    },
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
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero {...heroData} />

        {/* Statistics Section */}
        <Statistics {...statisticsData} />

        {/* Benefits Section */}
        <Benefits {...benefitsData} />

        {/* Key Features Section */}
        <KeyFeatures {...keyFeaturesData} />

        {/* How It Works Section */}
        <HowItWorks {...howItWorksData} />

        {/* Testimonials Section */}
        <Testimonials {...testimonialsData} />

        {/* Pricing Section */}
        <Pricing {...pricingData} />

        {/* Download CTA Section */}
        <DownloadCTA {...downloadCTAData} />

        {/* Waitlist Form Section */}
        <section id="waitlist-form" className="py-16 bg-brand-violet">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-heading text-white mb-4">
                Join the Waitlist
              </h2>
              <p className="text-lg font-body text-white/90">
                Be the first to know when mi-Era launches. Get early access and exclusive updates.
              </p>
            </div>
            <WaitlistForm />
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ {...faqData} />
      </main>
      <Footer />
    </div>
  );
}
