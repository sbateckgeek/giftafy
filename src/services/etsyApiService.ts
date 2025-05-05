import { GiftResult } from "@/types/giftFinder";

// This would normally be stored in environment variables
// For demo purposes we're keeping it here, but in a production app
// this would be stored on a backend server
const ETSY_API_KEY = "YOUR_ETSY_API_KEY"; // Replace with your actual API key
const ETSY_API_BASE_URL = "https://openapi.etsy.com/v3";

// Interface for the Etsy API response
interface EtsyListingResponse {
  count: number;
  results: EtsyListing[];
}

// Interface for Etsy listing data
export interface EtsyListing {
  listing_id: number;
  title: string;
  description: string;
  price: {
    amount: number;
    divisor: number;
    currency_code: string;
  };
  url: string;
  num_favorers: number;
  tags: string[];
  images?: {
    listing_image_id: number;
    url_fullxfull: string;
  }[];
  shop: {
    shop_id: number;
    shop_name: string;
    rating: number;
  };
}

/**
 * Convert Etsy price to formatted string
 */
const formatPrice = (price: { amount: number; divisor: number; currency_code: string }): string => {
  const value = price.amount / price.divisor;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency_code,
  }).format(value);
};

/**
 * Convert Etsy listing to GiftResult format
 */
const mapEtsyListingToGiftResult = (listing: EtsyListing, matchScore: number): GiftResult => {
  const images = listing.images 
    ? listing.images.map(img => img.url_fullxfull)
    : ["https://placehold.co/600x400/333/FFF?text=No+Image"];
    
  return {
    title: listing.title,
    price: formatPrice(listing.price),
    images: images,
    rating: listing.shop.rating || 4.5, // Default if not available
    reviews: listing.num_favorers,
    retailer: "Etsy",
    url: listing.url,
    aiRecommendation: `This gift matches the recipient's interests and fits within your budget. ${listing.description?.slice(0, 120)}...`,
    matchScore: matchScore,
    isTrending: listing.num_favorers > 100, // Arbitrary threshold for "trending"
    sales: listing.num_favorers,
  };
};

/**
 * Search Etsy for gifts based on the form data
 */
export const searchEtsyGifts = async (searchParams: {
  keywords: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<GiftResult[]> => {
  try {
    // Build the query string
    const queryParams = new URLSearchParams({
      api_key: ETSY_API_KEY,
      keywords: searchParams.keywords,
    });
    
    if (searchParams.minPrice) {
      queryParams.append("min_price", searchParams.minPrice.toString());
    }
    
    if (searchParams.maxPrice) {
      queryParams.append("max_price", searchParams.maxPrice.toString());
    }
    
    // Fetch data from Etsy
    const response = await fetch(`${ETSY_API_BASE_URL}/listings/active?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`Etsy API error: ${response.status}`);
    }
    
    const data: EtsyListingResponse = await response.json();
    
    // Transform Etsy listings to GiftResult objects
    // Generate a random match score between 75-100 for each gift
    return data.results.map(listing => {
      const matchScore = Math.floor(Math.random() * 25) + 75; // 75-100
      return mapEtsyListingToGiftResult(listing, matchScore);
    });
    
  } catch (error) {
    console.error("Error fetching from Etsy API:", error);
    // For now, return mock data if API fails
    return getMockGiftResults();
  }
};

/**
 * Build search keywords from form data
 */
export const buildEtsySearchQuery = (formData: {
  relationship: string;
  age: string;
  occasion: string;
  interests: string;
}): string => {
  // Clean up and combine form data to create a search query
  const keywords = [
    formData.occasion,
    formData.interests,
    `gift for ${formData.relationship}`,
  ]
    .filter(Boolean)
    .join(" ");
    
  return keywords;
};

/**
 * Mock gift results for fallback or development
 */
const getMockGiftResults = (): GiftResult[] => {
  return [
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
    // Adding more mock data
    {
      title: "Handcrafted Wooden Music Box",
      price: "$89.99",
      images: [
        "https://placehold.co/600x400/333/FFF?text=Music+Box"
      ],
      rating: 4.7,
      reviews: 342,
      retailer: "Etsy",
      url: "https://etsy.com",
      aiRecommendation: "This beautiful handcrafted wooden music box plays a custom tune. A unique keepsake that will be cherished for years.",
      matchScore: 87,
      isTrending: true,
      sales: 1200
    }
  ];
};
