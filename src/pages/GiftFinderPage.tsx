
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import GiftFinder from '@/components/GiftFinder';
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper';
import { Sparkles } from 'lucide-react';

const GiftFinderPage = () => {
  return (
    <ScrollAnimationWrapper>
      <div className="min-h-screen bg-background text-foreground">
        <NavBar />
        
        <div className="container mx-auto px-4 pt-12 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-sm text-white/70 uppercase tracking-wider">Powered by Etsy</span>
          </div>
        </div>
        
        <GiftFinder />
        <Footer />
      </div>
    </ScrollAnimationWrapper>
  );
};

export default GiftFinderPage;
