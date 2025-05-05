
// Form step enum
export enum FormStep {
  RECIPIENT = 0,
  OCCASION = 1,
  BUDGET = 2
}

// Form data interface
export interface GiftFinderFormData {
  relationship: string;
  age: string;
  occasion: string;
  interests: string;
  budget: string;
}

// Gift result interface
export interface GiftResult {
  title: string;
  price: string;
  originalPrice?: string;
  images: string[];
  rating: number;
  reviews: number;
  retailer: string;
  url: string;
  aiRecommendation: string;
  matchScore: number;
  isTrending: boolean;
  sales: number;
}

// API Configuration
export interface EtsyAPIConfig {
  apiKey: string;
  apiBase: string;
}
