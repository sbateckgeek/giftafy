
import { useState } from 'react';
import { GiftFinderFormData, FormStep, GiftResult } from '@/types/giftFinder';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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
  const [limitExceeded, setLimitExceeded] = useState(false);

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

  // Save gift to user's collection
  const saveGift = async (gift: GiftResult, isFavorite: boolean = false) => {
    try {
      const { data, error } = await supabase.functions.invoke('save-gift', {
        body: { gift, isFavorite }
      });

      if (error) {
        if (error.message?.includes('upgradeRequired')) {
          toast.error('Upgrade required to favorite gifts', {
            description: 'Please upgrade your subscription to use this feature.'
          });
          return;
        }
        throw error;
      }

      toast.success(isFavorite ? 'Added to favorites!' : 'Gift saved!');
      return data;
    } catch (error) {
      console.error('Error saving gift:', error);
      toast.error('Failed to save gift', {
        description: 'Please try again later.'
      });
    }
  };

  // Submit form and fetch gift recommendations
  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    setLimitExceeded(false);
    
    try {
      // Build search query from form data
      const searchQuery = `${formData.relationship} ${formData.age} ${formData.occasion} ${formData.interests}`;
      const budgetRange = parseBudgetRange(formData.budget);
      
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('search-gifts', {
        body: {
          searchTerms: searchQuery,
          minPrice: budgetRange.min,
          maxPrice: budgetRange.max
        }
      });
      
      if (error) {
        if (error.message?.includes('limitExceeded')) {
          setLimitExceeded(true);
          toast.error('Daily search limit exceeded', {
            description: 'Please upgrade your subscription for more searches.'
          });
          return;
        }
        throw error;
      }
      
      if (!data || !data.gifts || data.gifts.length === 0) {
        toast.error('No gift ideas found', {
          description: 'Please try different search criteria.'
        });
        return;
      }
      
      setGiftResults(data.gifts);
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
    limitExceeded,
    goToNextStep,
    goToPrevStep,
    handleFormSubmit,
    saveGift,
    isResultsView,
  };
};
