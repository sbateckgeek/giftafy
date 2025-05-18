
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Lightbulb, Search, Heart, Lock } from 'lucide-react';

const features = [
  {
    title: "Smart Recommendations",
    description: "Our AI analyzes preferences and occasion to suggest truly personalized gifts that your recipients will love.",
    icon: Lightbulb,
    color: "primary",
  },
  {
    title: "Occasion-Based Search",
    description: "Filter gift recommendations by occasion, budget, and relationship to find the perfect match every time.",
    icon: Search,
    color: "secondary",
  },
  {
    title: "Personality Analysis",
    description: "The AI considers personality traits and interests to recommend gifts that resonate on a personal level.",
    icon: Heart,
    color: "primary",
  },
  {
    title: "Data Privacy",
    description: "Your personal information is secure. We use it only for recommendations and never share it with third parties.",
    icon: Lock,
    color: "secondary",
  },
];

const FeaturesSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section id="features" className="section-padding bg-gradient-subtle-2">
      <div 
        ref={ref} 
        className={cn(
          "container mx-auto px-4 fade-in-section",
          inView && "is-visible"
        )}
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-white/10 border border-white/20">
            <span className="text-primary text-sm font-medium">Features</span>
          </div>
          
          <h2 className="text-gradient-primary text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Features That Make Gift-Giving Easy
          </h2>
          
          <p className="text-white/80 max-w-2xl mx-auto leading-relaxed">
            Discover how our advanced features take the guesswork out of finding the perfect gift.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card card-padding border border-white/10 rounded-lg transition-all duration-300 hover:shadow-[0_5px_30px_rgba(13,255,139,0.15)] hover-lift group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn(
                "bg-gradient-to-br from-black/40 to-black/60 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6 border border-white/10",
                feature.color === "primary" ? "group-hover:shadow-glow-sm" : "group-hover:shadow-secondary-glow-sm",
              )}>
                <feature.icon 
                  size={24} 
                  className={feature.color === "primary" ? "text-primary" : "text-secondary"} 
                />
              </div>
              <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
              <p className="text-white/70 font-light">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
