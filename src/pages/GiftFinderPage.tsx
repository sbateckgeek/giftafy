
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
        
        <div className="container mx-auto pt-12">
          {/* Powered by Etsy banner moved to the top */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm text-white/70 uppercase tracking-wider">Powered by Etsy</span>
          </div>
          
          <GiftFinder />
        </div>
        
        <Footer />
      </div>
    </ScrollAnimationWrapper>
  );
};

export default GiftFinderPage;
