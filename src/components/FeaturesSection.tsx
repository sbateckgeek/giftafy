
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Lightbulb, Search, Heart, Lock } from 'lucide-react';

const features = [
  {
    title: "Smart Recommendations",
    description: "Our AI analyzes preferences and occasion to suggest truly personalized gifts that your recipients will love.",
    icon: Lightbulb,
  },
  {
    title: "Occasion-Based Search",
    description: "Filter gift recommendations by occasion, budget, and relationship to find the perfect match every time.",
    icon: Search,
  },
  {
    title: "Personality Analysis",
    description: "The AI considers personality traits and interests to recommend gifts that resonate on a personal level.",
    icon: Heart,
  },
  {
    title: "Data Privacy",
    description: "Your personal information is secure. We use it only for recommendations and never share it with third parties.",
    icon: Lock,
  },
];

const FeaturesSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section id="features" className="py-24 bg-black/20">
      <div 
        ref={ref} 
        className={cn(
          "container mx-auto px-4 fade-in-section",
          inView && "is-visible"
        )}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-4">
            Features That Make Gift-Giving Easy
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Discover how our advanced features take the guesswork out of finding the perfect gift.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-6 border border-white/10 rounded-lg transition-all duration-300 hover:shadow-[0_5px_30px_rgba(13,255,139,0.15)]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <feature.icon size={24} className="text-primary mb-4" />
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-white/70 font-light text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
