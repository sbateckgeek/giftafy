
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const AboutPage = () => {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const { ref: teamRef, inView: teamInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const { ref: valuesRef, inView: valuesInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const teamMembers = [
    {
      name: "Sophia Chen",
      role: "CEO & Co-Founder",
      bio: "With 10+ years in AI development, Sophia leads Giftafy's vision of making gift-giving meaningful.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      name: "Marcus Taylor",
      role: "CTO & Co-Founder",
      bio: "Marcus brings 15 years of ML expertise to ensure our recommendations are always on point.",
      image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      name: "Elena Rodriguez",
      role: "Chief Product Officer",
      bio: "Elena's background in UX design helps create the seamless gift-finding experience our users love.",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      name: "David Kim",
      role: "Head of Marketing",
      bio: "David leads our marketing strategy, helping us reach gift-givers who need our solution.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200"
    },
  ];

  const values = [
    {
      title: "Thoughtfulness",
      description: "We believe that the best gifts come from understanding the recipient. Our AI is designed to truly get to know the person you're shopping for."
    },
    {
      title: "Innovation",
      description: "We're constantly improving our algorithms and expanding our gift database to provide the most relevant and unique suggestions."
    },
    {
      title: "Quality",
      description: "We curate high-quality gift suggestions that stand the test of time, focusing on meaningful items rather than throwaway presents."
    },
    {
      title: "Privacy",
      description: "We handle personal information with care, using it only to improve gift recommendations and never sharing it with third parties."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />

      <main className="pt-20">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter mb-8">
                About Giftafy
              </h1>
              <p className="text-lg text-white/70 mb-8">
                We're on a mission to revolutionize gift-giving with the power of artificial intelligence.
              </p>
            </div>
          </div>
        </section>

        <section 
          ref={sectionRef} 
          className={cn(
            "py-16 fade-in-section",
            sectionInView && "is-visible"
          )}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 border border-white/10 rounded-lg">
              <h2 className="text-3xl font-light tracking-tighter mb-6">Our Story</h2>
              <p className="text-white/80 mb-6">
                Giftafy was born from a simple frustration: the stress of finding the perfect gift for loved ones. Our founders, Sophia Chen and Marcus Taylor, met at an AI conference in 2018 and discovered they shared this common pain point despite their technical backgrounds.
              </p>
              <p className="text-white/80 mb-6">
                They realized that AI could solve this widespread problem by analyzing preferences, personality traits, and occasions to match people with truly meaningful gifts. After months of development and testing, Giftafy launched in 2020 with a mission to make thoughtful gifting accessible to everyone.
              </p>
              <p className="text-white/80">
                Today, Giftafy has helped thousands of users find perfect gifts for birthdays, anniversaries, holidays, and special occasions. We've grown from a small startup to a team of passionate individuals dedicated to making gift-giving a joyful experience rather than a stressful chore.
              </p>
            </div>
          </div>
        </section>

        <section 
          ref={valuesRef} 
          className={cn(
            "py-16 bg-black/20 fade-in-section",
            valuesInView && "is-visible"
          )}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-light tracking-tighter mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {values.map((value, index) => (
                <div key={index} className="glass-card p-6 border border-white/10 rounded-lg">
                  <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                  <p className="text-white/70 font-light">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section 
          ref={teamRef} 
          className={cn(
            "py-16 fade-in-section",
            teamInView && "is-visible"
          )}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-light tracking-tighter mb-12 text-center">Meet Our Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="glass-card p-6 border border-white/10 rounded-lg text-center">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                  <p className="text-primary mb-3 text-sm">{member.role}</p>
                  <p className="text-white/70 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
