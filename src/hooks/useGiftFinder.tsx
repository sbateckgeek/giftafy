
import { useState } from 'react';
import { GiftFinderFormData, FormStep, GiftResult } from '@/types/giftFinder';
import { toast } from 'sonner';
import { searchEtsyGifts, buildEtsySearchQuery } from '@/services/etsyApiService';

// Initial form data
const initialFormData: GiftFinderFormData = {
  relationship: 'Friend',
  age: '26-35',
  occasion: 'Birthday',
  interests: '',
  budget: '$50-$100',
};

// Helper to parse budget range
const parseBudgetRange = (budget: string): { min?: number, max?: number } => {
  if (budget.includes('-')) {
    const [minStr, maxStr] = budget.split('-');
    const min = parseInt(minStr.replace(/\D/g, ''));
    const max = parseInt(maxStr.replace(/\D/g, ''));
    return { min, max };
  }
  
  if (budget.includes('+')) {
    const min = parseInt(budget.replace(/\D/g, ''));
    return { min };
  }
  
  if (budget.toLowerCase().includes('under')) {
    const max = parseInt(budget.replace(/\D/g, ''));
    return { max };
  }
  
  return {};
};

export const useGiftFinder = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.RECIPIENT);
  const [formData, setFormData] = useState<GiftFinderFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [giftResults, setGiftResults] = useState<GiftResult[]>([]);
  const [isResultsView, setIsResultsView] = useState(false);

  // Handle navigation between form steps
  const goToNextStep = () => {
    if (currentStep < FormStep.BUDGET) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > FormStep.RECIPIENT) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Submit form and fetch gift recommendations
  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Build search parameters from form data
      const searchQuery = buildEtsySearchQuery(formData);
      const budgetRange = parseBudgetRange(formData.budget);
      
      // Fetch gift recommendations from Etsy
      const results = await searchEtsyGifts({
        keywords: searchQuery,
        minPrice: budgetRange.min,
        maxPrice: budgetRange.max,
      });
      
      setGiftResults(results);
      setIsResultsView(true);
      // Scroll to top when results are shown
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error fetching gift recommendations:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentStep,
    formData,
    setFormData,
    isSubmitting,
    giftResults,
    goToNextStep,
    goToPrevStep,
    handleFormSubmit,
    isResultsView,
  };
};
