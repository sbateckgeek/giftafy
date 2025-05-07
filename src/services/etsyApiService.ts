
import { GiftResult } from "@/types/giftFinder";

// This would normally be stored in environment variables
// For demo purposes we're keeping it here, but in a production app
// this would be stored on a backend server
const ETSY_API_KEY = "ybscq5vw520vsy28i5fvohgz";
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
 * Note: Due to CORS restrictions when using the Etsy API directly from the browser,
 * we're using a proxy server approach.
 */
export const searchEtsyGifts = async (searchParams: {
  keywords: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<GiftResult[]> => {
  console.log("Searching Etsy with parameters:", searchParams);
  
  try {
    // In a real application, you would make a request to your backend that handles Etsy API
    // For this demo, we're handling CORS limitations by using mock data that resembles Etsy results
    // const response = await fetch(`${ETSY_API_BASE_URL}/application/listings/active`, {
    //   headers: {
    //     'x-api-key': ETSY_API_KEY,
    //   },
    //   params: {
    //     keywords: searchParams.keywords,
    //     min_price: searchParams.minPrice,
    //     max_price: searchParams.maxPrice,
    //   }
    // });
    
    // In a production environment, you should:
    // 1. Set up a proxy server (e.g., Express.js, Next.js API routes)
    // 2. Handle OAuth 2.0 authentication with Etsy
    // 3. Make API requests from your server, not the client
    
    // Since we can't directly call the Etsy API due to CORS, 
    // we're using targeted mock data that's more relevant to the search
    return getRelevantMockGiftResults(searchParams.keywords, searchParams.minPrice, searchParams.maxPrice);
    
  } catch (error) {
    console.error("Error fetching from Etsy API:", error);
    throw error;
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
    formData.age !== "60+" ? formData.age : "senior"
  ]
    .filter(Boolean)
    .join(" ");
    
  return keywords;
};

/**
 * Generate more relevant mock gift results based on search keywords and price range
 */
const getRelevantMockGiftResults = (
  keywords: string, 
  minPrice?: number, 
  maxPrice?: number
): GiftResult[] => {
  const lowerKeywords = keywords.toLowerCase();
  
  // Base set of gifts with appropriate pricing
  const gifts = [
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
      isTrending: true,
      sales: 3200,
      priceValue: 59.99
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
      sales: 800,
      priceValue: 129.99
    },
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
      sales: 1200,
      priceValue: 89.99
    },
    {
      title: "Personalized Name Necklace",
      price: "$45.99",
      images: [
        "https://placehold.co/600x400/333/FFF?text=Necklace"
      ],
      rating: 4.9,
      reviews: 1200,
      retailer: "Etsy",
      url: "https://etsy.com",
      aiRecommendation: "A beautiful personalized necklace with the recipient's name. A timeless piece of jewelry they'll wear every day.",
      matchScore: 88,
      isTrending: true,
      sales: 5000,
      priceValue: 45.99
    },
    {
      title: "Leather Bound Journal",
      price: "$39.99",
      images: [
        "https://placehold.co/600x400/333/FFF?text=Journal"
      ],
      rating: 4.6,
      reviews: 520,
      retailer: "Etsy",
      url: "https://etsy.com",
      aiRecommendation: "A high-quality leather journal with personalized engraving. Perfect for writers, travelers, or anyone who appreciates a thoughtful gift.",
      matchScore: 85,
      isTrending: false,
      sales: 2100,
      priceValue: 39.99
    },
    {
      title: "Custom Pet Portrait",
      price: "$79.99",
      images: [
        "https://placehold.co/600x400/333/FFF?text=Pet+Portrait"
      ],
      rating: 4.9,
      reviews: 890,
      retailer: "Etsy",
      url: "https://etsy.com",
      aiRecommendation: "A custom portrait of the recipient's beloved pet. A heartwarming gift for any animal lover.",
      matchScore: 94,
      isTrending: true,
      sales: 3400,
      priceValue: 79.99
    },
    {
      title: "Engraved Whiskey Glasses Set",
      price: "$65.99",
      images: [
        "https://placehold.co/600x400/333/FFF?text=Whiskey+Glasses"
      ],
      rating: 4.8,
      reviews: 430,
      retailer: "Etsy",
      url: "https://etsy.com",
      aiRecommendation: "A set of high-quality whiskey glasses with personalized engraving. Perfect for the whiskey enthusiast.",
      matchScore: 89,
      isTrending: false,
      sales: 1800,
      priceValue: 65.99
    },
    {
      title: "Custom Family Recipe Cutting Board",
      price: "$49.99",
      images: [
        "https://placehold.co/600x400/333/FFF?text=Cutting+Board"
      ],
      rating: 4.7,
      reviews: 610,
      retailer: "Etsy",
      url: "https://etsy.com",
      aiRecommendation: "A beautiful cutting board engraved with a treasured family recipe. A meaningful gift for anyone who loves cooking.",
      matchScore: 91,
      isTrending: true,
      sales: 2700,
      priceValue: 49.99
    }
  ];
  
  // Match gifts based on keywords
  let relevantGifts = [...gifts];
  
  // Add occasion-specific gifts
  if (lowerKeywords.includes("birthday")) {
    relevantGifts.push({
      title: "Birthday Countdown Calendar",
      price: "$34.99",
      images: ["https://placehold.co/600x400/333/FFF?text=Birthday+Calendar"],
      rating: 4.8,
      reviews: 325,
      retailer: "Etsy",
      url: "https://etsy.com",
      aiRecommendation: "A fun countdown calendar to build excitement for their big day. Each day reveals a small gift or message.",
      matchScore: 93,
      isTrending: false,
      sales: 950,
      priceValue: 34.99
    });
  }
  
  if (lowerKeywords.includes("wedding") || lowerKeywords.includes("anniversary")) {
    relevantGifts.push({
      title: "Custom Wedding Vows Art Print",
      price: "$69.99",
      images: ["https://placehold.co/600x400/333/FFF?text=Vows+Print"],
      rating: 5.0,
      reviews: 189,
      retailer: "Etsy",
      url: "https://etsy.com",
      aiRecommendation: "Turn wedding vows or a special quote into a beautiful art piece. A romantic reminder of their special day.",
      matchScore: 96,
      isTrending: true,
      sales: 780,
      priceValue: 69.99
    });
  }

  if (lowerKeywords.includes("child") || lowerKeywords.includes("under 18")) {
    relevantGifts.push({
      title: "Personalized Children's Storybook",
      price: "$39.99",
      images: ["https://placehold.co/600x400/333/FFF?text=Storybook"],
      rating: 4.9,
      reviews: 752,
      retailer: "Etsy",
      url: "https://etsy.com",
      aiRecommendation: "A custom storybook where the child becomes the main character. A magical gift they'll love reading over and over.",
      matchScore: 98,
      isTrending: true,
      sales: 4200,
      priceValue: 39.99
    });
  }
  
  // Interest-based matching
  if (lowerKeywords.includes("reading") || lowerKeywords.includes("book")) {
    relevantGifts.push({
      title: "Personalized Bookmarks Set",
      price: "$24.99",
      images: ["https://placehold.co/600x400/333/FFF?text=Bookmarks"],
      rating: 4.7,
      reviews: 520,
      retailer: "Etsy",
      url: "https://etsy.com",
      aiRecommendation: "A set of beautifully crafted personalized bookmarks. Perfect for the avid reader.",
      matchScore: 95,
      isTrending: false,
      sales: 2250,
      priceValue: 24.99
    });
  }
  
  if (lowerKeywords.includes("cooking") || lowerKeywords.includes("chef") || lowerKeywords.includes("kitchen")) {
    relevantGifts.push({
      title: "Personalized Chef's Apron",
      price: "$35.99",
      images: ["https://placehold.co/600x400/333/FFF?text=Chef+Apron"],
      rating: 4.8,
      reviews: 310,
      retailer: "Etsy",
      url: "https://etsy.com",
      aiRecommendation: "A high-quality personalized apron for the cooking enthusiast. A practical and thoughtful gift.",
      matchScore: 97,
      isTrending: true,
      sales: 1890,
      priceValue: 35.99
    });
  }
  
  if (lowerKeywords.includes("music") || lowerKeywords.includes("musician")) {
    relevantGifts.push({
      title: "Custom Sound Wave Art Print",
      price: "$45.99",
      images: ["https://placehold.co/600x400/333/FFF?text=Sound+Wave+Art"],
      rating: 4.9,
      reviews: 275,
      retailer: "Etsy",
      url: "https://etsy.com",
      aiRecommendation: "A beautiful art print of a sound wave from their favorite song. A unique gift for music lovers.",
      matchScore: 96,
      isTrending: true,
      sales: 980,
      priceValue: 45.99
    });
  }
  
  if (lowerKeywords.includes("travel")) {
    relevantGifts.push({
      title: "Personalized Travel Map",
      price: "$69.99",
      images: ["https://placehold.co/600x400/333/FFF?text=Travel+Map"],
      rating: 4.8,
      reviews: 345,
      retailer: "Etsy",
      url: "https://etsy.com",
      aiRecommendation: "A beautiful map where they can track their travels. Perfect for the adventure seeker.",
      matchScore: 94,
      isTrending: false,
      sales: 1560,
      priceValue: 69.99
    });
  }
  
  // Filter by price if provided
  if (minPrice !== undefined || maxPrice !== undefined) {
    relevantGifts = relevantGifts.filter(gift => {
      const price = gift.priceValue;
      
      if (minPrice !== undefined && maxPrice !== undefined) {
        return price >= minPrice && price <= maxPrice;
      } else if (minPrice !== undefined) {
        return price >= minPrice;
      } else if (maxPrice !== undefined) {
        return price <= maxPrice;
      }
      
      return true;
    });
  }

  // Adjust match scores based on keyword relevance
  relevantGifts = relevantGifts.map(gift => {
    let adjustedScore = gift.matchScore;
    
    // Boost score if title or recommendation contains keywords
    const titleAndDesc = (gift.title + gift.aiRecommendation).toLowerCase();
    const keywordParts = lowerKeywords.split(' ');
    
    keywordParts.forEach(word => {
      if (word.length > 3 && titleAndDesc.includes(word)) {
        adjustedScore += 3;
      }
    });
    
    // Cap at 99
    adjustedScore = Math.min(99, adjustedScore);
    
    return { ...gift, matchScore: adjustedScore };
  });

  // Shuffle and return a random selection
  return relevantGifts
    .sort(() => 0.5 - Math.random())
    .map(({ priceValue, ...gift }) => gift); // Remove the priceValue property
};
