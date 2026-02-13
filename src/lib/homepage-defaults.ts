// Default homepage content - used as fallback when no DB content exists
// Note: Benefits icons stored as type strings, mapped to JSX components in page.tsx

export const defaultHomepageData = {
  hero: {
    heading: "A reliable space where teens can grow",
    subheading: "Track your tasks, understand your emotions, and build habits that actually work for you. No pressure, no judgment—just support.",
    ctaText: "Get early access",
    screenshots: [
      { src: "/placeholders/task-list.png", alt: "Task List Screenshot", aspectRatio: "9/16" },
      { src: "/placeholders/ai-chat.png", alt: "AI Chat Screenshot", aspectRatio: "9/16" },
      { src: "/placeholders/emotional-journal.png", alt: "Emotional Journal Screenshot", aspectRatio: "9/16" },
      { src: "/placeholders/progress.png", alt: "Progress Screenshot", aspectRatio: "9/16" },
    ],
  },

  statistics: {
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
  },

  benefits: {
    heading: "Why Mi-Era exists",
    subheading: "Because it's designed for how you actually think and feel, not how productivity apps think you should.",
    benefits: [
      {
        iconType: "CheckCircle",
        title: "Structure without stress",
        description: "Build routines that actually work for your brain. No guilt if things don't go perfectly.",
      },
      {
        iconType: "Lightbulb",
        title: "AI that gets you",
        description: "Your assistant learns how you think and helps you plan in a way that feels natural, not forced.",
      },
      {
        iconType: "Shield",
        title: "Total privacy",
        description: "Your space. Your thoughts. No parents peeking. No tracking. No surveillance.",
      },
      {
        iconType: "Trophy",
        title: "Progress that feels good",
        description: "Celebrate small wins with rewards that remind you: you're building something real.",
      },
      {
        iconType: "Target",
        title: "Focus without overwhelm",
        description: "Break down big tasks into doable steps. One thing at a time. You've got this.",
      },
      {
        iconType: "Heart",
        title: "Emotional balance",
        description: "Journal your feelings, track your mood, understand yourself better. All in one place.",
      },
    ],
  },

  key_features: {
    heading: "Everything you need",
    subheading: "Simple tools that work together to help you stay on track and feel good about your progress.",
    features: [
      {
        iconSrc: "/assets/star-1.png",
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
        iconSrc: "/assets/star-1.png",
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
        iconSrc: "/assets/star-1.png",
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
  },

  how_it_works: {
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
  },

  testimonials: {
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
  },

  pricing: {
    heading: "Choose what works for you",
    subheading: "Start free, upgrade when you're ready. No pressure, no tricks.",
    plans: [
      {
        name: "Start",
        price: "$0",
        period: "Forever free",
        features: [
          "Tasks & projects",
          "Pomodoro focus timer",
          "Daily emotional check-ins",
          "AI chat: 10 messages/day",
          "AI-powered project breakdown: 2 times/month",
        ],
        highlighted: false,
        ctaText: "Get started",
      },
      {
        name: "Study",
        price: "$7.99",
        period: "/month",
        yearlyPrice: "$59.99",
        yearlySaving: "37%",
        features: [
          "Everything in Start",
          "More AI chat (high limits)",
          "Unlimited projects",
          "Smart re-planning",
          "Advanced emotional insights",
          "Ad-free",
        ],
        highlighted: true,
        ctaText: "Start 7-day free trial",
        footnote: "AI chat and project breaks are subject to fair use limits.",
      },
      {
        name: "AI Boost",
        price: "+ $2.99",
        period: "/month",
        addonLabel: "Optional ⚡",
        features: [
          "Doubled AI limits",
          "Even more project Help",
          "Deeper AI support",
        ],
        highlighted: false,
        ctaText: "Add to Study plan",
        isAddon: true,
        footnote: "AI chat and project breaks are subject to fair use limits.",
      },
    ],
  },

  download_cta: {
    heading: "Ready to own your era?",
    subheading: "Join the waitlist and be the first to know when Mi-Era launches.",
  },

  faq: {
    heading: "Questions? We've got answers",
    items: [
      {
        question: "What is Mi-Era, in simple terms?",
        answer: "Mi-Era is a teen-first focus and self-regulation training app. It helps teens learn how to start work, stay focused, and finish tasks on their own. Instead of managing assignments for them, Mi-Era builds focus like a skill through short sessions, guided support, and reflection.",
      },
      {
        question: "Who is Mi-Era for?",
        answer: "Mi-Era is designed for teens ages 13–18. It's especially helpful for students who procrastinate, get distracted easily, feel overwhelmed by schoolwork, or struggle to follow through — even when they care and want to do well.",
      },
      {
        question: "How is Mi-Era different from a homework planner or productivity app?",
        answer: "Most productivity apps organize tasks. Mi-Era trains the ability to focus. It builds self-regulation through short, repeatable focus sessions, structured focus support, and reflection. Over time, teens develop cognitive stamina, confidence, and ownership — not just better to-do lists.",
      },
      {
        question: "How does the AI in Mi-Era work?",
        answer: "Mi-Era's AI provides guided, structured focus support — not open-ended chat or answers. It helps teens move through a proven focus loop: decide what to work on, prepare, focus, reflect, and share progress. The support adapts based on effort and patterns over time. The teen stays in control at all times.",
      },
      {
        question: "Does Mi-Era help with ADHD or focus challenges?",
        answer: "Mi-Era is not a medical treatment, but it is designed to support teens who struggle with attention, distraction, or motivation. Its short sessions, clear structure, and non-judgmental support are especially helpful for teens who don't do well with rigid planners or pressure-based systems.",
      },
      {
        question: "What can parents see, and how does privacy work?",
        answer: "Mi-Era is privacy-first. Parents can see high-level indicators of effort and consistency, but not private reflections or emotional content. The goal is to support independence while giving parents peace of mind — without increasing conflict or surveillance.",
      },
      {
        question: "What if my teen misses days or loses motivation?",
        answer: "Nothing bad happens. Mi-Era is built around progress, not punishment. Teens can always restart with a new focus session. The system encourages consistency but never penalizes setbacks, helping teens rebuild momentum instead of giving up.",
      },
      {
        question: "Is Mi-Era worth paying for?",
        answer: "Mi-Era is best for families who want their teen to build lifelong focus and self-regulation skills — not just finish tonight's homework. It's an investment in confidence, independence, and mental endurance that extends beyond school.",
      },
    ],
  },
};
