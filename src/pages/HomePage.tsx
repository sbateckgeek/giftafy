
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

const HomePage = () => {
  return (
    <ScrollAnimationWrapper>
      <div className="min-h-screen bg-background text-foreground">
        <NavBar />
        <HeroSection />
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
