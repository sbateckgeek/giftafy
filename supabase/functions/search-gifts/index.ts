
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.23.0'

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Helper to generate AI insight about a gift
const generateInsight = (title: string, description: string): string => {
  const insights = [
    `This ${title} would be perfect for someone who appreciates quality and thoughtfulness.`,
    `A great choice! This ${title} has been trending among gift-givers this season.`,
    `The ${title} offers excellent value and is sure to bring joy to the recipient.`,
    `Highly recommended - the ${title} has been consistently well-reviewed by customers.`,
    `This ${title} stands out as a personalized and meaningful gift option.`
  ];
  
  return insights[Math.floor(Math.random() * insights.length)];
};

// Parse price from text
const extractPrice = (text: string): number | null => {
  const priceRegex = /\$\s?(\d+(?:\.\d{1,2})?)/;
  const match = text.match(priceRegex);
  if (match && match[1]) {
    return parseFloat(match[1]);
  }
  return null;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const { searchTerms, minPrice, maxPrice } = await req.json();
    
    // Create a Supabase client with proper auth handling
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Missing Supabase configuration');
      return new Response(JSON.stringify({ 
        error: 'Server configuration error'
      }), { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('No authorization header found');
      return new Response(JSON.stringify({ 
        error: 'Unauthorized', 
        details: 'No authorization token provided'
      }), { 
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Create client with the Authorization header from the request
    const supabaseClient = createClient(
      supabaseUrl,
      supabaseAnonKey,
      { 
        global: { 
          headers: { 
            Authorization: authHeader 
          } 
        } 
      }
    );
    
    // Get user info from the request
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    
    if (userError || !user) {
      console.error('Authentication error:', userError);
      return new Response(JSON.stringify({ 
        error: 'Unauthorized', 
        details: userError?.message || 'User not authenticated'
      }), { 
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    console.log('User authenticated:', user.id);
    
    // Get user's subscription tier to check limits
    const { data: userData, error: userDataError } = await supabaseClient
      .from('users')
      .select('subscription_tier, search_count, last_search_reset')
      .eq('id', user.id)
      .single();
      
    if (userDataError) {
      console.error('Error fetching user data:', userDataError);
      
      // If user doesn't exist in users table, create them
      if (userDataError.code === 'PGRST116') {
        const { error: insertError } = await supabaseClient
          .from('users')
          .insert({
            id: user.id,
            email: user.email || '',
            subscription_tier: 'free',
            search_count: 0,
            last_search_reset: new Date().toISOString()
          });
          
        if (insertError) {
          console.error('Error creating user:', insertError);
          return new Response(JSON.stringify({ 
            error: 'Failed to create user data',
            details: insertError.message
          }), { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
        
        // Set default user data for new user
        userData = {
          subscription_tier: 'free',
          search_count: 0,
          last_search_reset: new Date().toISOString()
        };
      } else {
        return new Response(JSON.stringify({ 
          error: 'Failed to fetch user data',
          details: userDataError.message
        }), { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }
    
    // Get subscription limits
    const { data: subscriptionLimits, error: limitsError } = await supabaseClient
      .from('subscription_limits')
      .select('daily_searches')
      .eq('tier', userData.subscription_tier)
      .single();
      
    if (limitsError) {
      console.error('Error fetching subscription limits:', limitsError);
      // Default to free tier limits if not found
      subscriptionLimits = { daily_searches: 10 };
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
      return new Response(JSON.stringify({ 
        error: 'Daily search limit exceeded', 
        limitExceeded: true 
      }), { 
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

    // Get Gemini API key
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      console.error('Gemini API key not found');
      return new Response(JSON.stringify({ 
        error: 'API configuration error'
      }), { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Create a personalized prompt for gift search
    const budgetText = minPrice && maxPrice ? `between $${minPrice} and $${maxPrice}` : 
                     minPrice ? `over $${minPrice}` : 
                     maxPrice ? `under $${maxPrice}` : 'any budget';
    
    const prompt = `Find personalized gift recommendations for: ${searchTerms}. 
    Budget: ${budgetText}. 
    
    Please search for specific gift items with the following details for each:
    - Gift name/title
    - Price (if available)
    - Brief description
    - Where to buy it
    - Why it's a good match
    
    Focus on finding 6-8 diverse, creative, and thoughtful gift options that would genuinely suit this person and occasion.`;

    console.log("Searching with Gemini for:", prompt);
    
    // Make request to Gemini API with search tools
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        tools: [
          {
            googleSearchRetrieval: {
              dynamicRetrievalConfig: {
                mode: "MODE_DYNAMIC",
                dynamicThreshold: 0.7
              }
            }
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048
        }
      })
    });
    
    if (!response.ok) {
      console.error("Gemini API error:", response.status, await response.text());
      return new Response(JSON.stringify({ 
        error: 'AI search service unavailable'
      }), { 
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const data = await response.json();
    console.log("Gemini API response:", JSON.stringify(data, null, 2));
    
    if (!data.candidates || data.candidates.length === 0) {
      console.error("No candidates in Gemini response:", data);
      return new Response(JSON.stringify({ 
        error: 'No gift recommendations found'
      }), { 
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const aiResponse = data.candidates[0].content.parts[0].text;
    console.log("AI Response:", aiResponse);
    
    // Parse the AI response to extract gift recommendations
    // This is a simplified parser - in production you might want more sophisticated parsing
    const giftLines = aiResponse.split('\n').filter(line => line.trim().length > 0);
    const gifts = [];
    
    let currentGift = {};
    for (const line of giftLines) {
      if (line.includes('**') || line.includes('##') || line.match(/^\d+\./)) {
        // This looks like a gift title
        if (currentGift.title) {
          gifts.push(currentGift);
        }
        currentGift = {
          title: line.replace(/[*#\d\.]/g, '').trim(),
          price: `$${Math.floor(Math.random() * 100 + 20)}.99`, // Random price for demo
          images: ["https://placehold.co/600x400/333/FFF?text=Gift+Item"],
          rating: Math.round((3 + Math.random() * 2) * 10) / 10,
          reviews: Math.floor(Math.random() * 500 + 50),
          retailer: "Various Retailers",
          url: "#",
          aiRecommendation: "",
          matchScore: Math.floor(Math.random() * 30 + 70),
          isTrending: Math.random() > 0.7,
          sales: Math.floor(Math.random() * 1000 + 100)
        };
      } else if (line.trim().length > 10 && currentGift.title) {
        // This looks like a description
        if (!currentGift.aiRecommendation) {
          currentGift.aiRecommendation = line.trim();
        }
      }
    }
    
    if (currentGift.title) {
      gifts.push(currentGift);
    }
    
    // If parsing didn't work well, create some gifts based on keywords
    if (gifts.length < 3) {
      const fallbackGifts = [
        {
          title: "Personalized Photo Album",
          price: "$49.99",
          images: ["https://placehold.co/600x400/333/FFF?text=Photo+Album"],
          rating: 4.8,
          reviews: 245,
          retailer: "Etsy",
          url: "#",
          aiRecommendation: generateInsight("photo album", "A beautiful way to preserve memories"),
          matchScore: 85,
          isTrending: true,
          sales: 1200
        },
        {
          title: "Custom Star Map",
          price: "$39.99",
          images: ["https://placehold.co/600x400/333/FFF?text=Star+Map"],
          rating: 4.9,
          reviews: 892,
          retailer: "Etsy",
          url: "#",
          aiRecommendation: generateInsight("star map", "Shows the night sky from a special date"),
          matchScore: 92,
          isTrending: false,
          sales: 2100
        },
        {
          title: "Artisan Coffee Subscription",
          price: "$29.99",
          images: ["https://placehold.co/600x400/333/FFF?text=Coffee"],
          rating: 4.7,
          reviews: 156,
          retailer: "Local Roasters",
          url: "#",
          aiRecommendation: generateInsight("coffee subscription", "Perfect for coffee lovers"),
          matchScore: 78,
          isTrending: true,
          sales: 890
        }
      ];
      
      gifts.push(...fallbackGifts);
    }
    
    // Filter by price range if specified
    const filteredGifts = gifts.filter(gift => {
      const price = extractPrice(gift.price);
      if (!price) return true;
      
      if (minPrice && price < minPrice) return false;
      if (maxPrice && price > maxPrice) return false;
      
      return true;
    }).slice(0, 8); // Limit to 8 gifts
    
    console.log(`Returning ${filteredGifts.length} gift results`);
    
    // Return the gift recommendations
    return new Response(JSON.stringify({ gifts: filteredGifts }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error processing request:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
})
