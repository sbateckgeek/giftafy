
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section className="py-24 bg-gradient-to-b from-black/0 to-black/40">
      <div 
        ref={ref} 
        className={cn(
          "container mx-auto px-4 fade-in-section",
          inView && "is-visible"
        )}
      >
        <div className="glass-card p-10 md:p-16 border border-white/10 rounded-lg text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-6">
            Ready to Take the Stress Out of Gift-Giving?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of happy users who have discovered the perfect gifts for their loved ones using Giftafy's AI-powered recommendations.
          </p>
          <Button className="neomorphic-button text-lg px-8 py-6">
            Get Started for Free
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
