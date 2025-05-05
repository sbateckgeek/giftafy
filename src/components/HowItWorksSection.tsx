
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Gift, MessageSquare, Rocket } from 'lucide-react';

const features = [
  {
    title: "Connect Your Preferences",
    description: "Answer a few questions about your gift recipient and their interests to help our AI understand what they'd love.",
    icon: MessageSquare,
  },
  {
    title: "Set Up Your AI Assistant",
    description: "Our AI processes your information and begins generating personalized gift recommendations tailored to your needs.",
    icon: Gift,
  },
  {
    title: "Get Perfect Recommendations",
    description: "Receive curated gift suggestions complete with where to buy them and why they're perfect for your recipient.",
    icon: Rocket,
  },
];

const HowItWorksSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section id="how-it-works" className="py-24">
      <div 
        ref={ref} 
        className={cn(
          "container mx-auto px-4 fade-in-section",
          inView && "is-visible"
        )}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-4">
            How Giftafy Works
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Finding the perfect gift has never been easier. Our AI-powered platform does all the hard work for you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-6 border border-white/10 rounded-lg transition-all duration-300 hover:shadow-[0_5px_30px_rgba(13,255,139,0.15)]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-gradient-to-br from-black/40 to-black/60 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6 border border-white/10">
                <feature.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-light mb-3">{feature.title}</h3>
              <p className="text-white/70 font-light">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
