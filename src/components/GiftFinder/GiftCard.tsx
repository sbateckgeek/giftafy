
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { GiftResult } from '@/types/giftFinder';
import { Share, Star, Bookmark, BookmarkCheck } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import { useInView } from 'react-intersection-observer';

interface GiftCardProps {
  gift: GiftResult;
}

export const GiftCard = ({ gift }: GiftCardProps) => {
  const [saved, setSaved] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const shareGift = (platform: 'facebook' | 'twitter' | 'email' | 'link') => {
    // In a real app, this would use proper sharing APIs
    const shareText = `Check out this ${gift.title} I found on Giftafy!`;
    const shareUrl = gift.url;
    
    switch (platform) {
      case 'link':
        navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard!');
        break;
      default:
        toast.success(`Shared on ${platform}!`);
        break;
    }
  };

  const toggleSave = () => {
    setSaved(!saved);
    if (!saved) {
      toast.success('Gift saved to your collection!');
    } else {
      toast.success('Gift removed from your collection');
    }
  };

  const handleBuyClick = () => {
    // In a real app, this would track the outbound click
    window.open(gift.url, '_blank');
  };

  const getRetailerColor = () => {
    switch (gift.retailer) {
      case 'Amazon': return 'bg-[#FF9900]/20 text-[#FF9900]';
      case 'Etsy': return 'bg-[#F56400]/20 text-[#F56400]';
      case 'Walmart': return 'bg-[#0071DC]/20 text-[#0071DC]';
      default: return 'bg-primary/20 text-primary';
    }
  };

  return (
    <Card 
      ref={ref}
      className={cn(
        "glass-card border border-white/10 overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_15px_rgba(13,255,139,0.15)] fade-in-section h-full",
        inView && "is-visible"
      )}
    >
      <div className="relative">
        {/* Image gallery */}
        <div className="relative h-64 overflow-hidden bg-black/20">
          <img
            src={gift.images[imageIndex]}
            alt={gift.title}
            className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
          />
          
          {/* Thumbnail navigation if more than one image */}
          {gift.images.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {gift.images.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setImageIndex(idx)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    idx === imageIndex ? "bg-primary" : "bg-white/50"
                  )}
                />
              ))}
            </div>
          )}
          
          {/* Match score */}
          <div className="absolute top-2 right-2">
            <Badge className="bg-primary/90 text-black font-medium">
              {gift.matchScore}% Match
            </Badge>
          </div>
          
          {/* Retailer badge */}
          <div className="absolute top-2 left-2">
            <Badge className={cn("font-medium", getRetailerColor())}>
              {gift.retailer}
            </Badge>
          </div>
          
          {/* Trending or bestseller badge */}
          {gift.isTrending && (
            <div className="absolute bottom-2 left-2">
              <Badge variant="secondary" className="bg-white/20">
                Trending
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-lg line-clamp-2">{gift.title}</h3>
          </div>
          
          {/* Price info */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl text-primary font-medium">{gift.price}</span>
            {gift.originalPrice && (
              <span className="text-white/50 line-through text-sm">
                {gift.originalPrice}
              </span>
            )}
          </div>
          
          {/* Review info */}
          <div className="flex items-center mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  className={i < Math.floor(gift.rating) ? "fill-primary text-primary" : "text-white/30"} 
                />
              ))}
            </div>
            <span className="text-white/70 ml-2 text-sm">({gift.reviews})</span>
          </div>
          
          {/* AI recommendation */}
          <p className="text-white/70 text-sm line-clamp-3 mb-3">
            {gift.aiRecommendation}
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex flex-col gap-2">
          <Button 
            className="w-full neomorphic-button"
            onClick={handleBuyClick}
          >
            View on {gift.retailer}
          </Button>
          
          <div className="flex justify-between w-full">
            <Button 
              variant="outline" 
              size="icon"
              className="border-white/20 text-white/70 hover:bg-white/5 hover:text-primary"
              onClick={toggleSave}
            >
              {saved ? <BookmarkCheck className="h-4 w-4 fill-primary text-primary" /> : <Bookmark className="h-4 w-4" />}
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="border-white/20 text-white/70 hover:bg-white/5 hover:text-primary"
                >
                  <Share className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2 bg-background/95 backdrop-blur-lg border-white/10">
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => shareGift('facebook')}>Facebook</Button>
                  <Button size="sm" variant="outline" onClick={() => shareGift('twitter')}>Twitter</Button>
                  <Button size="sm" variant="outline" onClick={() => shareGift('email')}>Email</Button>
                  <Button size="sm" variant="outline" onClick={() => shareGift('link')}>Copy Link</Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};
