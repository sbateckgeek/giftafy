
import React from 'react';
import { GiftResult, GiftFinderFormData } from '@/types/giftFinder';
import GiftCard from './GiftCard';
import { Heart, Share2, Bookmark, ArrowUpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useGiftFinder } from '@/hooks/useGiftFinder';

interface GiftFinderResultsProps {
  giftResults: GiftResult[];
  formData: GiftFinderFormData;
  isLoading: boolean;
}

const GiftFinderResults: React.FC<GiftFinderResultsProps> = ({ 
  giftResults, 
  formData, 
  isLoading
}) => {
  const { saveGift } = useGiftFinder();
  
  const handleSaveGift = async (gift: GiftResult) => {
    await saveGift(gift);
  };
  
  const handleFavoriteGift = async (gift: GiftResult) => {
    await saveGift(gift, true);
  };
  
  const handleShareGift = (gift: GiftResult) => {
    if (navigator.share) {
      navigator.share({
        title: gift.title,
        text: `Check out this gift idea: ${gift.title}`,
        url: gift.url,
      })
      .then(() => toast.success("Shared successfully!"))
      .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(gift.url)
        .then(() => toast.success("Link copied to clipboard!"))
        .catch(() => toast.error("Failed to copy link"));
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="text-white/70 mt-4">Finding perfect gift ideas...</p>
      </div>
    );
  }

  if (giftResults.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-4">No gift ideas found</h3>
        <p className="text-white/70 mb-6">Try adjusting your search criteria and try again.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-light mb-2">
          Gift Ideas for {formData.relationship} ({formData.age})
        </h2>
        <p className="text-white/70">
          For {formData.occasion} • Budget: {formData.budget}
          {formData.interests && ` • Interests: ${formData.interests}`}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {giftResults.map((gift, index) => (
          <GiftCard 
            key={index} 
            gift={gift}
            actionIcons={[
              { 
                icon: <Bookmark size={18} />, 
                label: "Save", 
                onClick: () => handleSaveGift(gift)
              },
              { 
                icon: <Heart size={18} />, 
                label: "Favorite", 
                onClick: () => handleFavoriteGift(gift) 
              },
              { 
                icon: <Share2 size={18} />, 
                label: "Share", 
                onClick: () => handleShareGift(gift) 
              }
            ]}
          />
        ))}
      </div>
      
      <Button
        onClick={scrollToTop}
        variant="outline"
        size="icon"
        className="fixed bottom-8 right-8 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <ArrowUpCircle />
      </Button>
    </div>
  );
};

export default GiftFinderResults;
