
import React from 'react';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import FeaturedInSection from '@/components/FeaturedInSection';
import TestimonialSection from '@/components/TestimonialSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import FeaturesSection from '@/components/FeaturesSection';
import MissionSection from '@/components/MissionSection';
import PricingSection from '@/components/PricingSection';
import FaqSection from '@/components/FaqSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';

const HomePage = () => {
  return (
    <ScrollAnimationWrapper>
      <div className="min-h-screen bg-background text-foreground">
        <NavBar />
        <HeroSection />
        
        {/* Gift Finder Prompt */}
        <div className="relative py-16 bg-black/30 backdrop-blur-lg">
          <div className="container mx-auto px-4">
            <div className="glass-card border border-white/10 p-8 text-center">
              <h2 className="text-3xl font-light mb-4 bg-gradient-to-r from-white via-white/90 to-primary bg-clip-text text-transparent">
                Discover Perfect Gifts
              </h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                Our AI-powered gift finder helps you discover unique, personalized gifts from Etsy for any occasion. Answer a few questions and get customized recommendations.
              </p>
              <Link to="/gift-finder">
                <Button className="neomorphic-button">
                  <Gift className="mr-2 h-5 w-5" />
                  Find the Perfect Gift
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <FeaturedInSection />
        <HowItWorksSection />
        <TestimonialSection />
        <FeaturesSection />
        <MissionSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
        <Footer />
      </div>
    </ScrollAnimationWrapper>
  );
};

export default HomePage;
