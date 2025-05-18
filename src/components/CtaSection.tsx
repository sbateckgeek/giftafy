
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section className="section-padding bg-gradient-subtle">
      <div 
        ref={ref} 
        className={cn(
          "container mx-auto px-4 fade-in-section",
          inView && "is-visible"
        )}
      >
        <div className="glass-card card-padding border border-white/10 rounded-xl text-center max-w-4xl mx-auto overflow-hidden relative">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                <Heart className="text-primary h-6 w-6" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6 text-gradient-primary">
              Ready to Take the Stress Out of Gift-Giving?
            </h2>
            
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of happy users who have discovered the perfect gifts for their loved ones using Giftafy's AI-powered recommendations.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/gift-finder">
                <Button className="neomorphic-button text-lg px-8 py-6 group">
                  Start Finding Gifts
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </Link>
              
              <Link to="/auth?signup=true">
                <Button className="secondary-button text-lg px-8 py-6">
                  Create Free Account
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-white/50 mt-6">No credit card required. Start finding perfect gifts today.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
