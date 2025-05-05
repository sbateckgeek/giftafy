
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

const HeroSection = () => {
  return (
    <section id="hero" className="min-h-[85vh] flex flex-col justify-center items-center py-20 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter mb-6 bg-gradient-to-r from-white via-white/90 to-primary bg-clip-text text-transparent">
            Find the Perfect Gift with AI
          </h1>
          <p className="text-lg md:text-xl font-light text-white/70 max-w-xl mx-auto mb-8">
            Giftafy uses advanced AI to recommend personalized gifts for your loved ones. Say goodbye to gift-giving stress forever.
          </p>
          <Button className="neomorphic-button text-lg">
            Get Started
          </Button>
        </div>

        <div className="mt-16 md:mt-24 animate-fade-in">
          <div className={cn(
            "relative mx-auto max-w-4xl glass-card p-4 md:p-6",
            "border border-white/10",
            "rounded-xl shadow-[0_0_45px_rgba(13,255,139,0.15)]"
          )}>
            <img 
              src="/lovable-uploads/c2fa0368-2ce0-4419-83f7-26e21eda3314.png" 
              alt="Giftafy Interface Mockup" 
              className="w-full h-auto rounded-lg" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
