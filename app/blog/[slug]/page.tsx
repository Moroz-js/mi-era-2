'use client';

import { Header, Footer } from "../../../src/components/ui";
import Link from "next/link";
import { use, useEffect, useState } from "react";

interface BlogPostData {
  slug: string;
  category: string;
  categoryColor: string;
  date: string;
  title: string;
  excerpt: string;
  content: {
    intro: string;
    sections: {
      id: string;
      title: string;
      content: string;
      subsections?: {
        id: string;
        title: string;
        content: string;
      }[];
    }[];
  };
}

const blogPostsData: Record<string, BlogPostData> = {
  "how-to-build-good-habits": {
    slug: "how-to-build-good-habits",
    category: "Habits",
    categoryColor: "bg-purple-200 text-purple-700",
    date: "February 1, 2024",
    title: "How to Build Good Habits Without Forcing Yourself",
    excerpt: "Discover the science of habit formation and learn how to create lasting positive changes without willpower or force.",
    content: {
      intro: "Building good habits doesn't have to feel like a constant battle with yourself. The key is understanding how habits actually form and working with your brain, not against it.",
      sections: [
        {
          id: "understanding-habits",
          title: "Understanding How Habits Work",
          content: "Every habit follows a simple loop: cue, routine, reward. Understanding this loop is the first step to building habits that stick without relying on willpower alone."
        },
        {
          id: "start-small",
          title: "Start Ridiculously Small",
          content: "Want to read more? Start with one page. Want to exercise? Do one push-up. The goal is to make it so easy you can't say no. Once the habit is established, you can gradually increase."
        },
        {
          id: "habit-stacking",
          title: "Use Habit Stacking",
          content: "Attach new habits to existing ones. After I brush my teeth, I'll do 10 squats. After I sit down for breakfast, I'll write one sentence in my journal. This makes new habits easier to remember and execute."
        },
        {
          id: "environment-design",
          title: "Design Your Environment",
          content: "Make good habits obvious and bad habits invisible. Want to drink more water? Put a water bottle on your desk. Want to stop scrolling social media? Delete the apps from your phone."
        }
      ]
    }
  },
  "how-to-deal-with-anxiety": {
    slug: "how-to-deal-with-anxiety",
    category: "Mental Health",
    categoryColor: "bg-blue-200 text-blue-700",
    date: "January 25, 2024",
    title: "How to Deal with Anxiety and Pressure as a Teen",
    excerpt: "Practical techniques to manage stress, anxiety, and pressure from school, social situations, and expectations.",
    content: {
      intro: "Anxiety isn't just feeling nervous before a test. It's that constant worry in the back of your mind, the pressure to be perfect, the fear of letting people down. If you're feeling this way, you're not alone - and there are real ways to cope.",
      sections: [
        {
          id: "understanding-teen-anxiety",
          title: "Understanding Teen Anxiety",
          content: "Your teen years come with unique pressures:",
          subsections: [
            {
              id: "academic-expectations",
              title: "Academic expectations",
              content: "The pressure to perform well in school, get good grades, and prepare for college can be overwhelming."
            },
            {
              id: "social-dynamics",
              title: "Social dynamics and fitting in",
              content: "Navigating friendships, peer pressure, and social hierarchies adds another layer of stress."
            },
            {
              id: "future-planning",
              title: "College and future planning",
              content: "Decisions about your future can feel heavy when you're still figuring out who you are."
            }
          ]
        },
        {
          id: "recognizing-anxiety",
          title: "Recognizing Anxiety",
          content: "Anxiety shows up differently for everyone. You might experience physical symptoms like racing heart, sweating, or difficulty breathing. Mentally, you might have constant worry, difficulty concentrating, or fear of worst-case scenarios. Understanding your anxiety is the first step to managing it."
        },
        {
          id: "practical-techniques",
          title: "Practical Techniques to Manage Anxiety",
          content: "Here are evidence-based strategies that actually work:",
          subsections: [
            {
              id: "breathing-exercises",
              title: "Breathing exercises",
              content: "Simple breathing techniques can calm your nervous system in minutes. Try the 4-7-8 technique: breathe in for 4 counts, hold for 7, exhale for 8."
            },
            {
              id: "grounding-techniques",
              title: "Grounding techniques",
              content: "Use the 5-4-3-2-1 method: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you taste."
            },
            {
              id: "journaling",
              title: "Journaling",
              content: "Writing down your worries helps externalize them and often makes them feel more manageable."
            }
          ]
        },
        {
          id: "when-to-seek-help",
          title: "When to Seek Help",
          content: "If anxiety is interfering with your daily life, school performance, or relationships, it's time to talk to someone. This could be a parent, school counselor, or mental health professional. Seeking help is a sign of strength, not weakness."
        }
      ]
    }
  },
  "how-to-get-everything-done": {
    slug: "how-to-get-everything-done",
    category: "Productivity",
    categoryColor: "bg-pink-200 text-pink-700",
    date: "January 20, 2024",
    title: "How to Get Everything Done Without Feeling Overwhelmed",
    excerpt: "Learn effective time management techniques and prioritization strategies to handle your workload without stress.",
    content: {
      intro: "Feeling overwhelmed by everything on your plate? You're not alone. The key isn't doing more - it's doing the right things in the right order.",
      sections: [
        {
          id: "brain-dump",
          title: "Start with a Brain Dump",
          content: "Write down everything you need to do. Everything. Getting it out of your head and onto paper immediately reduces mental load and helps you see what you're actually dealing with."
        },
        {
          id: "prioritization",
          title: "Prioritize Ruthlessly",
          content: "Not everything is equally important. Use the Eisenhower Matrix: Important and Urgent (do first), Important but Not Urgent (schedule), Urgent but Not Important (delegate or minimize), Neither (eliminate)."
        },
        {
          id: "time-blocking",
          title: "Time Blocking",
          content: "Instead of a to-do list, assign specific time blocks to tasks. This makes your day more realistic and helps you see if you're overcommitting."
        },
        {
          id: "breaks-matter",
          title: "Breaks Are Not Optional",
          content: "Your brain needs rest to function. Use the Pomodoro Technique: 25 minutes of focused work, 5-minute break. After 4 cycles, take a longer 15-30 minute break."
        }
      ]
    }
  },
  "how-to-stay-motivated": {
    slug: "how-to-stay-motivated",
    category: "Motivation",
    categoryColor: "bg-purple-200 text-purple-700",
    date: "January 15, 2024",
    title: "How to Stay Motivated When You Don't Feel Like Doing Anything",
    excerpt: "Discover practical strategies to overcome lack of motivation and get back on track with your goals.",
    content: {
      intro: "Motivation isn't something you have or don't have. It's something you create. And when it's gone, there are specific strategies to get it back.",
      sections: [
        {
          id: "motivation-myth",
          title: "The Motivation Myth",
          content: "Here's the truth: you don't need to feel motivated to start. Action creates motivation, not the other way around. Start with just 2 minutes of the task, and motivation often follows."
        },
        {
          id: "connect-to-why",
          title: "Connect to Your Why",
          content: "Why does this task matter? Not the surface reason (I need good grades), but the deeper one (I want to have options for my future, I want to prove to myself I can do hard things). Write it down."
        },
        {
          id: "lower-the-bar",
          title: "Lower the Bar",
          content: "Can't write an essay? Write one sentence. Can't study for an hour? Study for 5 minutes. Can't clean your room? Put away one thing. Starting is the hardest part."
        },
        {
          id: "accountability",
          title: "Use Accountability",
          content: "Tell someone what you're going to do. Study with a friend. Join a group working toward similar goals. External accountability often works when internal motivation doesn't."
        }
      ]
    }
  }
};

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [activeSection, setActiveSection] = useState<string>("");
  const post = blogPostsData[slug];

  useEffect(() => {
    const handleScroll = () => {
      const sections = post?.content.sections || [];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-brand-white flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16">
          <p>Post not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-white flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-brand-violet py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <span 
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 ${post.categoryColor}`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {post.category}
              </span>
              
              <h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-white mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {post.title}
              </h1>
              
              <p 
                className="text-lg md:text-xl text-brand-white/90 mb-6"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {post.excerpt}
              </p>

              <p 
                className="text-sm text-brand-white/80"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {post.date}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section with TOC */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto flex gap-12">
              {/* Sticky Table of Contents */}
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24">
                  <h3 
                    className="text-lg font-bold text-brand-black mb-4"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Table of Contents
                  </h3>
                  <nav>
                    <ul className="space-y-2">
                      {post.content.sections.map((section) => (
                        <li key={section.id}>
                          <a
                            href={`#${section.id}`}
                            className={`block text-sm py-1 border-l-2 pl-3 transition-colors ${
                              activeSection === section.id
                                ? 'border-brand-violet text-brand-violet font-semibold'
                                : 'border-gray-200 text-gray-600 hover:text-brand-violet hover:border-brand-violet'
                            }`}
                            style={{ fontFamily: 'var(--font-body)' }}
                          >
                            {section.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </aside>

              {/* Article Content */}
              <article className="flex-1 max-w-3xl">
                <div 
                  className="prose prose-lg max-w-none"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    {post.content.intro}
                  </p>

                  {post.content.sections.map((section) => (
                    <div key={section.id} id={section.id} className="mb-12 scroll-mt-24">
                      <h2 
                        className="text-2xl md:text-3xl font-bold text-brand-black mb-4"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {section.title}
                      </h2>
                      
                      <p className="text-base text-gray-700 leading-relaxed mb-6">
                        {section.content}
                      </p>

                      {section.subsections && (
                        <ul className="space-y-4 ml-4">
                          {section.subsections.map((subsection) => (
                            <li key={subsection.id} id={subsection.id}>
                              <h3 
                                className="text-xl font-bold text-brand-black mb-2"
                                style={{ fontFamily: 'var(--font-body)' }}
                              >
                                {subsection.title}
                              </h3>
                              <p className="text-base text-gray-700 leading-relaxed">
                                {subsection.content}
                              </p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {/* Back to Blog */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <Link 
                    href="/blog"
                    className="inline-flex items-center text-brand-violet font-semibold hover:text-brand-yellow transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    ← Back to Blog
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
