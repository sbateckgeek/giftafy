
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.23.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { gift, isFavorite = false } = await req.json();
    
    // Validate user's session
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
    
    // Get user's subscription tier to check if they can save gifts
    const { data: userData, error: userDataError } = await supabaseClient
      .from('users')
      .select('subscription_tier')
      .eq('id', user.id)
      .single();
      
    if (userDataError) {
      return new Response(JSON.stringify({ error: 'Failed to fetch user data' }), { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Check if user's tier allows favoriting
    if (isFavorite) {
      const { data: subscriptionLimits, error: limitsError } = await supabaseClient
        .from('subscription_limits')
        .select('can_favorite_gifts')
        .eq('tier', userData.subscription_tier)
        .single();
        
      if (limitsError) {
        return new Response(JSON.stringify({ error: 'Failed to fetch subscription limits' }), { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      if (!subscriptionLimits.can_favorite_gifts) {
        return new Response(JSON.stringify({ 
          error: 'Your subscription tier does not allow favoriting gifts',
          upgradeRequired: true 
        }), { 
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }
    
    // Save the gift to the database
    const { data, error } = await supabaseClient
      .from('saved_gifts')
      .insert([{
        user_id: user.id,
        gift_name: gift.title,
        gift_image: gift.images && gift.images.length > 0 ? gift.images[0] : null,
        price: gift.price,
        rating: gift.rating,
        sales: gift.sales,
        ai_insight: gift.aiRecommendation,
        buy_link: gift.url,
        is_favorite: isFavorite
      }])
      .select()
      .single();
      
    if (error) {
      return new Response(JSON.stringify({ error: 'Failed to save gift' }), { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({ success: true, gift: data }), {
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
