
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import GiftFinder from '@/components/GiftFinder';
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper';

const GiftFinderPage = () => {
  return (
    <ScrollAnimationWrapper>
      <div className="min-h-screen bg-background text-foreground">
        <NavBar />
        <GiftFinder />
        <Footer />
      </div>
    </ScrollAnimationWrapper>
  );
};

export default GiftFinderPage;
