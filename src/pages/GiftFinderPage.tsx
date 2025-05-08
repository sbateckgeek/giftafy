
import React, { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import GiftFinder from '@/components/GiftFinder';
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper';
import { Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Remove the incorrect import
// No PricingTierProps import needed

const GiftFinderPage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated
    const getUser = async () => {
      setLoading(true);
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error('Error getting user:', error);
        toast.error('Authentication error', {
          description: 'Please login to access the Gift Finder'
        });
      }
      
      setUser(user);
      setLoading(false);
    };
    
    getUser();
    
    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') {
          setUser(session?.user ?? null);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          navigate('/');
        }
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);
  
  const handleLogin = () => {
    // Redirect to login page (to be implemented)
    navigate('/auth');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // If not authenticated, show login prompt
  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <NavBar />
        <div className="container mx-auto pt-24 pb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-light tracking-tighter mb-6 bg-gradient-to-r from-white via-white/90 to-primary bg-clip-text text-transparent">
            Login Required
          </h1>
          <p className="text-lg font-light text-white/70 mb-8 max-w-2xl mx-auto">
            Please login or create an account to access the Gift Finder feature and get personalized gift recommendations.
          </p>
          <Button className="neomorphic-button" onClick={handleLogin}>
            Login / Sign Up
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  // User is authenticated, show gift finder
  return (
    <ScrollAnimationWrapper>
      <div className="min-h-screen bg-background text-foreground">
        <NavBar />
        
        <div className="container mx-auto pt-12">
          <GiftFinder />
          
          <div className="flex items-center justify-center space-x-2 mb-8 mt-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm text-white/70 uppercase tracking-wider">Powered by Etsy</span>
          </div>
        </div>
        
        <Footer />
      </div>
    </ScrollAnimationWrapper>
  );
};

export default GiftFinderPage;
