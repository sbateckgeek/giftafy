
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { ArrowRight, Gift } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="hero" className="section-padding min-h-[85vh] flex flex-col justify-center items-center py-20 overflow-hidden bg-gradient-subtle">
      <div className="container mx-auto px-4 text-center">
        <div className="animate-fade-in-up max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-white/10 border border-white/20 text-primary text-sm font-medium">
            <span className="mr-2">New</span>
            <span className="opacity-80">AI-Powered Gift Recommendations</span>
          </div>
          
          <h1 className="text-gradient-primary mb-6">
            Find the Perfect Gift with AI
          </h1>
          
          <p className="text-lg md:text-xl font-light text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Giftafy uses advanced AI to recommend personalized gifts for your loved ones. Say goodbye to gift-giving stress forever.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/gift-finder">
              <Button className="neomorphic-button text-lg group">
                Find Perfect Gifts
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </Link>
            
            <Link to="/#how-it-works">
              <Button className="secondary-button text-lg">
                How It Works
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-16 md:mt-20 animate-fade-in">
          <div className={cn(
            "relative mx-auto max-w-4xl glass-card card-padding",
            "border border-white/10",
            "rounded-xl shadow-glow-md overflow-hidden"
          )}>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-60"></div>
            <img 
              src="/lovable-uploads/c2fa0368-2ce0-4419-83f7-26e21eda3314.png" 
              alt="Giftafy Interface Mockup" 
              className="w-full h-auto rounded-lg relative z-10" 
            />
            
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="flex items-center justify-center space-x-2 mt-8">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse-glow"></span>
            <span className="text-sm text-white/60">AI-powered recommendations updated in real-time</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
