
import React from 'react';
import GiftFinderForm from './GiftFinderForm';
import GiftFinderResults from './GiftFinderResults';
import { useGiftFinder } from '@/hooks/useGiftFinder';

const GiftFinder = () => {
  const { 
    currentStep,
    formData, 
    setFormData,
    isSubmitting,
    giftResults,
    goToNextStep,
    goToPrevStep,
    handleFormSubmit,
    isResultsView
  } = useGiftFinder();

  return (
    <div className="py-24 min-h-[90vh]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-light tracking-tighter mb-6 bg-gradient-to-r from-white via-white/90 to-primary bg-clip-text text-transparent">
            Find the Perfect Gift
          </h1>
          <p className="text-lg font-light text-white/70 mb-8">
            Answer a few questions about the recipient and occasion, and our AI will recommend personalized gift ideas that are sure to impress.
          </p>
        </div>

        {!isResultsView ? (
          <GiftFinderForm 
            currentStep={currentStep}
            formData={formData}
            setFormData={setFormData}
            goToNextStep={goToNextStep}
            goToPrevStep={goToPrevStep}
            handleFormSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
          />
        ) : (
          <GiftFinderResults 
            giftResults={giftResults}
            formData={formData}
            isLoading={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};

export default GiftFinder;
