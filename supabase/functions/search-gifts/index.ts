
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.23.0'

// API keys for Google Custom Search
const GOOGLE_API_KEY = 'AIzaSyAvU2uNmKlR5WOlmqXRaNoG-rKi5nHrLNk';
const SEARCH_ENGINE_ID = '903b96e5eea5d46ee';

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Helper to parse price from text
const extractPrice = (text: string): number | null => {
  const priceRegex = /\$\s?(\d+(?:\.\d{1,2})?)/;
  const match = text.match(priceRegex);
  if (match && match[1]) {
    return parseFloat(match[1]);
  }
  return null;
};

// Generate AI insight about a gift
const generateInsight = (title: string, snippet: string): string => {
  // This is a simple placeholder - in a real app you might use an AI service
  const insights = [
    `This ${title} would be perfect for someone who appreciates quality and thoughtfulness.`,
    `A great choice! This ${title} has been trending among gift-givers this season.`,
    `The ${title} offers excellent value and is sure to bring joy to the recipient.`,
    `Highly recommended - the ${title} has been consistently well-reviewed by customers.`,
    `This ${title} stands out as a personalized and meaningful gift option.`
  ];
  
  return insights[Math.floor(Math.random() * insights.length)];
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const { searchTerms, minPrice, maxPrice, apiKey } = await req.json();
    
    // Validate user's session and subscription tier
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), { 
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );
    
    // Get user's session
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Get user's subscription tier to check limits
    const { data: userData, error: userDataError } = await supabaseClient
      .from('users')
      .select('subscription_tier, search_count, last_search_reset')
      .eq('id', user.id)
      .single();
      
    if (userDataError) {
      return new Response(JSON.stringify({ error: 'Failed to fetch user data' }), { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Get subscription limits
    const { data: subscriptionLimits, error: limitsError } = await supabaseClient
      .from('subscription_limits')
      .select('daily_searches')
      .eq('tier', userData.subscription_tier)
      .single();
      
    if (limitsError) {
      return new Response(JSON.stringify({ error: 'Failed to fetch subscription limits' }), { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Check if user has exceeded search limits
    const lastResetDate = new Date(userData.last_search_reset);
    const currentDate = new Date();
    const resetSearchCount = 
      lastResetDate.getDate() !== currentDate.getDate() || 
      lastResetDate.getMonth() !== currentDate.getMonth() || 
      lastResetDate.getFullYear() !== currentDate.getFullYear();
      
    let searchCount = userData.search_count;
    if (resetSearchCount) {
      searchCount = 0;
    }
    
    if (searchCount >= subscriptionLimits.daily_searches) {
      return new Response(JSON.stringify({ error: 'Daily search limit exceeded', limitExceeded: true }), { 
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Update user's search count
    await supabaseClient
      .from('users')
      .update({ 
        search_count: resetSearchCount ? 1 : searchCount + 1,
        last_search_reset: resetSearchCount ? new Date().toISOString() : userData.last_search_reset
      })
      .eq('id', user.id);
      
    // Record search in history
    await supabaseClient
      .from('search_history')
      .insert([{ 
        user_id: user.id, 
        search_terms: searchTerms
      }]);

    // Build the Google Custom Search API URL
    let searchQuery = searchTerms + " gift ideas";
    let url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(searchQuery)}`;
    
    // Add price range as a filter if provided
    if (minPrice && maxPrice) {
      url += `&exactTerms=price`;
    }
    
    // Make request to Google Custom Search API
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return new Response(JSON.stringify({ error: 'No results found' }), { 
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Transform and filter the search results
    const gifts = data.items
      .map(item => {
        // Extract price from snippet or title
        const priceText = item.snippet || item.title;
        const price = extractPrice(priceText);
        
        // Skip if price is outside the budget range
        if ((minPrice && price && price < minPrice) || 
            (maxPrice && price && price > maxPrice)) {
          return null;
        }
        
        const randomRating = (3 + Math.random() * 2).toFixed(1); // Generate random rating between 3-5
        const randomSales = Math.floor(10 + Math.random() * 990); // Generate random sales between 10-1000
        
        return {
          title: item.title,
          images: item.pagemap?.cse_image?.map(img => img.src) || 
                 item.pagemap?.cse_thumbnail?.map(img => img.src) || 
                 [],
          price: price ? `$${price.toFixed(2)}` : 'Price not available',
          rating: parseFloat(randomRating),
          reviews: Math.floor(randomSales / 4),
          retailer: item.displayLink || 'Unknown retailer',
          url: item.link,
          aiRecommendation: generateInsight(item.title, item.snippet || ''),
          matchScore: Math.floor(50 + Math.random() * 50), // Random match score 50-100
          isTrending: Math.random() > 0.7, // 30% chance of being trending
          sales: randomSales
        };
      })
      .filter(Boolean); // Remove null entries (items outside price range)
    
    // Return the gift recommendations
    return new Response(JSON.stringify({ gifts }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error processing request:', error);
    
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
})
