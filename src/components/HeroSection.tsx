
import React, { Suspense, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

const HeroSection = () => {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [isSplineVisible, setIsSplineVisible] = useState(false);
  
  // Check if device has enough memory for 3D
  const [shouldLoad3D, setShouldLoad3D] = useState(true);
  
  useEffect(() => {
    // Simple device capability check
    const isMobile = window.innerWidth < 768;
    // Use optional chaining to avoid TypeScript errors
    const hasLowMemory = 'deviceMemory' in navigator && 
      // @ts-ignore - TypeScript doesn't recognize deviceMemory but it exists in some browsers
      (navigator as any).deviceMemory < 4;
    
    if (isMobile && hasLowMemory) {
      setShouldLoad3D(false);
    }
  }, []);

  const handleSplineLoad = () => {
    setIsSplineLoaded(true);
    setTimeout(() => setIsSplineVisible(true), 100);
  };

  return (
    <section id="hero" className="min-h-[85vh] flex flex-col justify-center items-center py-20 overflow-hidden relative">
      {/* 3D Background */}
      {shouldLoad3D && (
        <div 
          className={cn(
            "absolute inset-0 w-full h-full z-0 transition-opacity duration-1000",
            isSplineVisible ? "opacity-40" : "opacity-0"
          )}
        >
          <Suspense fallback={<div className="w-full h-full bg-background" />}>
            <Spline 
              scene="https://prod.spline.design/Jdbrq1TSpYbs-zZG/scene.splinecode"
              onLoad={handleSplineLoad}
              style={{ width: '100%', height: '100%' }}
            />
          </Suspense>
        </div>
      )}
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter mb-6 bg-gradient-to-r from-white via-white/90 to-primary bg-clip-text text-transparent">
            Find the Perfect Gift with AI
          </h1>
          <p className="text-lg md:text-xl font-light text-white/70 max-w-xl mx-auto mb-8">
            Giftafy uses advanced AI to recommend personalized gifts for your loved ones. Say goodbye to gift-giving stress forever.
          </p>
          <Link to="/gift-finder">
            <Button className="neomorphic-button text-lg">
              Get Started
            </Button>
          </Link>
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
