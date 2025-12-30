import { Header, Footer } from "../../src/components/ui";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-white flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Main Content - Article Style */}
        <article className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-lg">
              
              {/* Our Story */}
              <section className="mb-12">
                <h2 
                  className="text-3xl md:text-4xl font-bold mb-6 text-brand-black"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Our Story
                </h2>
                <p 
                  className="text-lg text-gray-700 mb-4 leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  mi-Era was born from a simple observation: most productivity apps aren't built for how teenagers actually think and feel. They're designed for adults, with rigid structures and guilt-inducing notifications that make you feel worse when you can't keep up.
                </p>
                <p 
                  className="text-lg text-gray-700 mb-4 leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  We wanted to create something different. A space that understands that some days you're on fire, and some days you're just trying to get through. A tool that helps you build habits without making you feel like a failure when life gets messy.
                </p>
              </section>

              {/* Image Placeholder 1 */}
              <div className="mb-12 rounded-2xl overflow-hidden bg-gray-100 aspect-video flex items-center justify-center">
                <p className="text-gray-400 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
                  Image: Team collaboration
                </p>
              </div>

              {/* Our Mission */}
              <section className="mb-12">
                <h2 
                  className="text-3xl md:text-4xl font-bold mb-6 text-brand-black"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Our Mission
                </h2>
                <p 
                  className="text-lg text-gray-700 mb-4 leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  We believe every teenager deserves tools that support their growth without adding stress. Our mission is to create technology that adapts to you, not the other way around.
                </p>
                <p 
                  className="text-lg text-gray-700 mb-4 leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  mi-Era combines task management, emotional journaling, and AI support into one cohesive experience. We're not trying to make you more productive—we're trying to help you understand yourself better and build routines that actually work for your brain.
                </p>
              </section>

              {/* Image Placeholder 2 */}
              <div className="mb-12 rounded-2xl overflow-hidden bg-gray-100 aspect-video flex items-center justify-center">
                <p className="text-gray-400 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
                  Image: App interface
                </p>
              </div>

              {/* Our Values */}
              <section className="mb-12">
                <h2 
                  className="text-3xl md:text-4xl font-bold mb-6 text-brand-black"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  What We Stand For
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 
                      className="text-xl font-bold mb-2 text-brand-black"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      Privacy First
                    </h3>
                    <p 
                      className="text-lg text-gray-700 leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      Your thoughts, tasks, and feelings are yours alone. We never share your data, and we never will. No tracking, no surveillance, no exceptions.
                    </p>
                  </div>

                  <div>
                    <h3 
                      className="text-xl font-bold mb-2 text-brand-black"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      No Guilt, No Pressure
                    </h3>
                    <p 
                      className="text-lg text-gray-700 leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      Life happens. We built mi-Era to support you on good days and bad days. There are no streaks to lose, no shame when you miss a task. Just a fresh start whenever you need it.
                    </p>
                  </div>

                  <div>
                    <h3 
                      className="text-xl font-bold mb-2 text-brand-black"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      Built for Real Teens
                    </h3>
                    <p 
                      className="text-lg text-gray-700 leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      We're not here to lecture you or tell you how to live. We're here to give you tools that actually help, designed with input from real teenagers who understand what it's like to navigate school, relationships, and growing up.
                    </p>
                  </div>

                  <div>
                    <h3 
                      className="text-xl font-bold mb-2 text-brand-black"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      Transparency Always
                    </h3>
                    <p 
                      className="text-lg text-gray-700 leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      We're honest about what our AI can and can't do. We're clear about our pricing. We tell you exactly how your data is used. No hidden agendas, no fine print tricks.
                    </p>
                  </div>
                </div>
              </section>

              {/* Image Placeholder 3 */}
              <div className="mb-12 rounded-2xl overflow-hidden bg-gray-100 aspect-video flex items-center justify-center">
                <p className="text-gray-400 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
                  Image: Community
                </p>
              </div>

              {/* Looking Forward */}
              <section className="mb-12">
                <h2 
                  className="text-3xl md:text-4xl font-bold mb-6 text-brand-black"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Looking Forward
                </h2>
                <p 
                  className="text-lg text-gray-700 mb-4 leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  We're just getting started. mi-Era is evolving based on feedback from our community. We're constantly learning what works, what doesn't, and how we can better support the teens who use our app.
                </p>
                <p 
                  className="text-lg text-gray-700 mb-4 leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  This is your era. We're just here to help you own it.
                </p>
              </section>

            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
