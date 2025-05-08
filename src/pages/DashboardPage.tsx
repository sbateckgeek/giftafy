
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Trash2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface SavedGift {
  id: string;
  gift_name: string;
  gift_image: string | null;
  price: string;
  rating: number;
  ai_insight: string;
  buy_link: string;
  is_favorite: boolean;
  created_at: string;
}

interface SearchHistoryItem {
  id: string;
  search_terms: string;
  relationship: string;
  age: string;
  occasion: string;
  interests: string;
  budget: string;
  created_at: string;
}

interface UserData {
  subscription_tier: string;
  search_count: number;
}

const DashboardPage = () => {
  const [savedGifts, setSavedGifts] = useState<SavedGift[]>([]);
  const [favoriteGifts, setFavoriteGifts] = useState<SavedGift[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        navigate('/auth');
        return;
      }
      
      setUser(user);
      fetchUserData(user.id);
      fetchSavedGifts(user.id);
      fetchSearchHistory(user.id);
    };
    
    getUser();
  }, [navigate]);
  
  const fetchUserData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('subscription_tier, search_count')
        .eq('id', userId)
        .single();
        
      if (error) throw error;
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  const fetchSavedGifts = async (userId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('saved_gifts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      const saved = data.filter(gift => !gift.is_favorite);
      const favorites = data.filter(gift => gift.is_favorite);
      
      setSavedGifts(saved);
      setFavoriteGifts(favorites);
    } catch (error) {
      console.error('Error fetching saved gifts:', error);
      toast.error('Failed to load saved gifts');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchSearchHistory = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('search_history')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(20);
        
      if (error) throw error;
      setSearchHistory(data);
    } catch (error) {
      console.error('Error fetching search history:', error);
    }
  };
  
  const handleDeleteGift = async (id: string) => {
    try {
      const { error } = await supabase
        .from('saved_gifts')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setSavedGifts(savedGifts.filter(gift => gift.id !== id));
      setFavoriteGifts(favoriteGifts.filter(gift => gift.id !== id));
      
      toast.success('Gift removed successfully');
    } catch (error) {
      console.error('Error deleting gift:', error);
      toast.error('Failed to remove gift');
    }
  };
  
  const handleToggleFavorite = async (gift: SavedGift) => {
    try {
      // If user is on free tier and trying to add to favorites
      if (userData?.subscription_tier === 'free' && !gift.is_favorite) {
        toast.error('Upgrade required', {
          description: 'Please upgrade to favorite gifts'
        });
        return;
      }
      
      const { error } = await supabase
        .from('saved_gifts')
        .update({ is_favorite: !gift.is_favorite })
        .eq('id', gift.id);
        
      if (error) throw error;
      
      // Update local state
      if (gift.is_favorite) {
        // Moving from favorites to saved
        setFavoriteGifts(favoriteGifts.filter(g => g.id !== gift.id));
        setSavedGifts([...savedGifts, {...gift, is_favorite: false}]);
      } else {
        // Moving from saved to favorites
        setSavedGifts(savedGifts.filter(g => g.id !== gift.id));
        setFavoriteGifts([...favoriteGifts, {...gift, is_favorite: true}]);
      }
      
      toast.success(gift.is_favorite ? 'Removed from favorites' : 'Added to favorites');
    } catch (error) {
      console.error('Error updating gift:', error);
      toast.error('Failed to update gift');
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <ScrollAnimationWrapper>
      <div className="min-h-screen bg-background text-foreground">
        <NavBar />
        
        <div className="container mx-auto px-4 py-24">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-light mb-4">
              Your Dashboard
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <div className="glass-card py-2 px-4 border border-white/10 rounded-lg">
                <span className="text-white/70 text-sm">Current Plan:</span>
                <span className="ml-2 capitalize font-medium">{userData?.subscription_tier || 'Loading...'}</span>
              </div>
              
              <div className="glass-card py-2 px-4 border border-white/10 rounded-lg">
                <span className="text-white/70 text-sm">Searches Today:</span>
                <span className="ml-2 font-medium">{userData?.search_count || 0}</span>
              </div>
              
              {userData?.subscription_tier === 'free' && (
                <Button className="neomorphic-button ml-auto" onClick={() => navigate('/#pricing')}>
                  Upgrade Plan
                </Button>
              )}
            </div>
          </div>
          
          <Tabs defaultValue="saved" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="saved">Saved Gifts</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="history">Search History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="saved">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : savedGifts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedGifts.map(gift => (
                    <Card key={gift.id} className="glass-card border-white/10 overflow-hidden">
                      <div className="relative pb-[56.25%] bg-black/20">
                        {gift.gift_image ? (
                          <img 
                            src={gift.gift_image} 
                            alt={gift.gift_name} 
                            className="absolute inset-0 w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-white/40">
                            No image available
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2 line-clamp-2">{gift.gift_name}</h3>
                        <p className="text-primary font-medium mb-2">{gift.price}</p>
                        <p className="text-white/70 text-sm mb-4 line-clamp-2">{gift.ai_insight}</p>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="text-xs text-white/50">
                            Saved on {formatDate(gift.created_at)}
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-white/70 hover:text-primary"
                              onClick={() => handleToggleFavorite(gift)}
                            >
                              <Heart size={18} className={gift.is_favorite ? "fill-primary text-primary" : ""} />
                            </Button>
                            
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-white/70 hover:text-white"
                              onClick={() => window.open(gift.buy_link, '_blank')}
                            >
                              <ExternalLink size={18} />
                            </Button>
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="text-white/70 hover:text-red-500"
                                >
                                  <Trash2 size={18} />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="glass-card border-white/10">
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete this saved gift from your collection.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteGift(gift.id)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-4">No saved gifts yet</h3>
                  <p className="text-white/70 mb-6">When you find gifts you like, save them here for later.</p>
                  <Button className="neomorphic-button" onClick={() => navigate('/gift-finder')}>
                    Find Gifts
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="favorites">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : favoriteGifts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteGifts.map(gift => (
                    <Card key={gift.id} className="glass-card border-white/10 overflow-hidden">
                      <div className="relative pb-[56.25%] bg-black/20">
                        {gift.gift_image ? (
                          <img 
                            src={gift.gift_image} 
                            alt={gift.gift_name} 
                            className="absolute inset-0 w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-white/40">
                            No image available
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2 line-clamp-2">{gift.gift_name}</h3>
                        <p className="text-primary font-medium mb-2">{gift.price}</p>
                        <p className="text-white/70 text-sm mb-4 line-clamp-2">{gift.ai_insight}</p>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="text-xs text-white/50">
                            Added on {formatDate(gift.created_at)}
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-primary hover:text-white/70"
                              onClick={() => handleToggleFavorite(gift)}
                            >
                              <Heart size={18} className="fill-primary" />
                            </Button>
                            
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-white/70 hover:text-white"
                              onClick={() => window.open(gift.buy_link, '_blank')}
                            >
                              <ExternalLink size={18} />
                            </Button>
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="text-white/70 hover:text-red-500"
                                >
                                  <Trash2 size={18} />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="glass-card border-white/10">
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete this favorite gift from your collection.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteGift(gift.id)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-4">No favorite gifts yet</h3>
                  <p className="text-white/70 mb-6">
                    {userData?.subscription_tier === 'free' 
                      ? 'Upgrade your plan to add gifts to favorites.' 
                      : 'Click the heart icon on any saved gift to add it to favorites.'}
                  </p>
                  {userData?.subscription_tier === 'free' ? (
                    <Button className="neomorphic-button" onClick={() => navigate('/#pricing')}>
                      Upgrade Plan
                    </Button>
                  ) : (
                    <Button className="neomorphic-button" onClick={() => navigate('/gift-finder')}>
                      Find Gifts
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="history">
              {searchHistory.length > 0 ? (
                <div className="space-y-4">
                  {searchHistory.map(search => (
                    <Card key={search.id} className="glass-card border-white/10">
                      <CardContent className="p-4">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <h4 className="font-medium">{search.search_terms}</h4>
                            <p className="text-xs text-white/50">
                              Searched on {formatDate(search.created_at)}
                            </p>
                          </div>
                          
                          <Button 
                            size="sm" 
                            className="neomorphic-button"
                            onClick={() => navigate('/gift-finder')}
                          >
                            Search Again
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-4">No search history yet</h3>
                  <p className="text-white/70 mb-6">Your recent gift searches will appear here.</p>
                  <Button className="neomorphic-button" onClick={() => navigate('/gift-finder')}>
                    Find Gifts
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <Footer />
      </div>
    </ScrollAnimationWrapper>
  );
};

export default DashboardPage;
