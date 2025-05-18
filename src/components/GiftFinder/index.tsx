
import React from 'react';
import GiftFinderForm from './GiftFinderForm';
import GiftFinderResults from './GiftFinderResults';
import { useGiftFinder } from '@/hooks/useGiftFinder';
import { Sparkles } from 'lucide-react';

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
    <div className="section-padding min-h-[90vh]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-white/10 border border-white/20">
            <span className="text-primary text-sm font-medium mr-2">AI Powered</span>
            <span className="text-white/60 text-sm">Personalized Suggestions</span>
          </div>
          
          <h1 className="text-gradient-primary mb-6">
            Find the Perfect Gift
          </h1>
          
          <p className="text-lg font-light text-white/80 mb-8 leading-relaxed">
            Answer a few questions about the recipient and occasion, and our AI will recommend personalized gift ideas that are sure to impress.
          </p>
          
          {/* Progress indicator for multi-step form */}
          {!isResultsView && (
            <div className="flex justify-center items-center mb-8">
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      step === currentStep ? "w-8 bg-primary" : "w-2 bg-white/20",
                      step < currentStep && "bg-primary/50"
                    )}
                  />
                ))}
              </div>
              <span className="ml-3 text-sm text-white/60">Step {currentStep} of 4</span>
            </div>
          )}
        </div>

        {!isResultsView ? (
          <div className="glass-card border border-white/10 rounded-xl shadow-glow-sm overflow-hidden max-w-3xl mx-auto">
            <GiftFinderForm 
              currentStep={currentStep}
              formData={formData}
              setFormData={setFormData}
              goToNextStep={goToNextStep}
              goToPrevStep={goToPrevStep}
              handleFormSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        ) : (
          <GiftFinderResults 
            giftResults={giftResults}
            formData={formData}
            isLoading={isSubmitting}
          />
        )}
        
        <div className="flex items-center justify-center space-x-2 mt-8">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-sm text-white/70 uppercase tracking-wider">Powered by Etsy</span>
        </div>
      </div>
    </div>
  );
};

export default GiftFinder;
