
import { useState } from 'react';
import { GiftFinderFormData, FormStep, GiftResult } from '@/types/giftFinder';
import { toast } from 'sonner';

// Initial form data
const initialFormData: GiftFinderFormData = {
  relationship: 'Friend',
  age: '26-35',
  occasion: 'Birthday',
  interests: '',
  budget: '$50-$100',
};

// Mock API call to get gift results
const fetchGiftRecommendations = async (formData: GiftFinderFormData): Promise<GiftResult[]> => {
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would be an API call to a backend service
      // that would fetch data from various e-commerce sites
      const mockGifts: GiftResult[] = [
        {
          title: "Wireless Noise Cancelling Headphones",
          price: "$199.99",
          originalPrice: "$249.99",
          images: [
            "https://placehold.co/600x400/333/FFF?text=Headphones+1",
            "https://placehold.co/600x400/222/FFF?text=Headphones+2"
          ],
          rating: 4.8,
          reviews: 1243,
          retailer: "Amazon",
          url: "https://amazon.com",
          aiRecommendation: "Perfect for music lovers who appreciate high-quality sound and modern design. The noise cancellation feature makes these ideal for commuters.",
          matchScore: 95,
          isTrending: true,
          sales: 5000
        },
        {
          title: "Personalized Star Map - Night Sky Print",
          price: "$59.99",
          images: [
            "https://placehold.co/600x400/333/FFF?text=Star+Map+1",
            "https://placehold.co/600x400/222/FFF?text=Star+Map+2"
          ],
          rating: 4.9,
          reviews: 876,
          retailer: "Etsy",
          url: "https://etsy.com",
          aiRecommendation: "A thoughtful, personalized gift showing the night sky exactly as it appeared on a special date. Perfect for commemorating birthdays or anniversaries.",
          matchScore: 92,
          isTrending: false,
          sales: 3200
        },
        {
          title: "Smart Indoor Herb Garden",
          price: "$89.99",
          originalPrice: "$109.99",
          images: [
            "https://placehold.co/600x400/333/FFF?text=Herb+Garden+1"
          ],
          rating: 4.6,
          reviews: 543,
          retailer: "Amazon",
          url: "https://amazon.com",
          aiRecommendation: "For someone who enjoys cooking with fresh ingredients but may not have outdoor garden space. Self-watering and includes LED grow lights.",
          matchScore: 88,
          isTrending: true,
          sales: 2800
        },
        {
          title: "Premium Leather Messenger Bag",
          price: "$149.99",
          images: [
            "https://placehold.co/600x400/333/FFF?text=Leather+Bag+1",
            "https://placehold.co/600x400/222/FFF?text=Leather+Bag+2",
            "https://placehold.co/600x400/444/FFF?text=Leather+Bag+3"
          ],
          rating: 4.7,
          reviews: 329,
          retailer: "Etsy",
          url: "https://etsy.com",
          aiRecommendation: "Handcrafted from full-grain leather that will age beautifully. Perfect for professionals who appreciate quality craftsmanship and classic style.",
          matchScore: 85,
          isTrending: false,
          sales: 1200
        },
        {
          title: "Virtual Cooking Class with Professional Chef",
          price: "$75.00",
          images: [
            "https://placehold.co/600x400/333/FFF?text=Cooking+Class+1"
          ],
          rating: 4.9,
          reviews: 156,
          retailer: "Walmart",
          url: "https://walmart.com",
          aiRecommendation: "An experience gift that's perfect for foodies. They'll learn to make gourmet dishes with a live professional chef guiding them every step of the way.",
          matchScore: 87,
          isTrending: false,
          sales: 950
        },
        {
          title: "Custom Portrait from Photo",
          price: "$129.99",
          images: [
            "https://placehold.co/600x400/333/FFF?text=Portrait+1",
            "https://placehold.co/600x400/222/FFF?text=Portrait+2"
          ],
          rating: 4.8,
          reviews: 210,
          retailer: "Etsy",
          url: "https://etsy.com",
          aiRecommendation: "A hand-painted custom portrait created from a favorite photo. A truly personal gift that will be treasured for years to come.",
          matchScore: 90,
          isTrending: false,
          sales: 800
        },
        {
          title: "Premium Coffee Subscription Box",
          price: "$45.00",
          originalPrice: "$60.00",
          images: [
            "https://placehold.co/600x400/333/FFF?text=Coffee+Box+1"
          ],
          rating: 4.7,
          reviews: 890,
          retailer: "Amazon",
          url: "https://amazon.com",
          aiRecommendation: "Perfect for coffee enthusiasts who enjoy discovering new flavors. Each month they'll receive freshly roasted beans from around the world.",
          matchScore: 89,
          isTrending: true,
          sales: 4500
        },
        {
          title: "Luxury Scented Candle Set",
          price: "$49.99",
          images: [
            "https://placehold.co/600x400/333/FFF?text=Candle+Set+1",
            "https://placehold.co/600x400/222/FFF?text=Candle+Set+2"
          ],
          rating: 4.5,
          reviews: 678,
          retailer: "Walmart",
          url: "https://walmart.com",
          aiRecommendation: "A set of hand-poured soy candles with unique scent combinations. Perfect for creating a cozy atmosphere at home.",
          matchScore: 82,
          isTrending: false,
          sales: 3100
        },
        {
          title: "Fitness Tracker with Heart Rate Monitor",
          price: "$129.99",
          originalPrice: "$159.99",
          images: [
            "https://placehold.co/600x400/333/FFF?text=Fitness+Tracker+1"
          ],
          rating: 4.6,
          reviews: 1543,
          retailer: "Amazon",
          url: "https://amazon.com",
          aiRecommendation: "Great for fitness enthusiasts who like to track their activity. Monitors steps, heart rate, sleep patterns, and more.",
          matchScore: 84,
          isTrending: true,
          sales: 6800
        }
      ];

      resolve(mockGifts);
    }, 2000);
  });
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
      const results = await fetchGiftRecommendations(formData);
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
