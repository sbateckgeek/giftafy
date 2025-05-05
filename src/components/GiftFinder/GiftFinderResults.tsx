
import React, { useState } from 'react';
import { GiftCard } from './GiftCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GiftFinderFormData, GiftResult } from '@/types/giftFinder';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Search, SlidersHorizontal } from 'lucide-react';

interface GiftFinderResultsProps {
  giftResults: GiftResult[];
  formData: GiftFinderFormData;
  isLoading: boolean;
}

const GiftFinderResults = ({ giftResults, formData, isLoading }: GiftFinderResultsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('match');
  const [showFilters, setShowFilters] = useState(false);
  
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const filteredResults = giftResults
    .filter(gift => {
      // Search filter
      if (searchTerm && !gift.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Price filter
      if (priceFilter !== 'all') {
        const price = parseFloat(gift.price.replace('$', ''));
        if (priceFilter === 'under50' && price >= 50) return false;
        if (priceFilter === '50to100' && (price < 50 || price > 100)) return false;
        if (priceFilter === '100to250' && (price < 100 || price > 250)) return false;
        if (priceFilter === 'over250' && price <= 250) return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sorting
      if (sortBy === 'match') {
        return b.matchScore - a.matchScore;
      }
      if (sortBy === 'priceAsc') {
        return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
      }
      if (sortBy === 'priceDesc') {
        return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
      }
      if (sortBy === 'popularity') {
        return b.reviews - a.reviews;
      }
      return 0;
    });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
        <p className="text-white/70 text-lg">Finding the perfect gifts for you...</p>
      </div>
    );
  }

  return (
    <div 
      ref={ref}
      className={cn(
        "fade-in-section",
        inView && "is-visible"
      )}
    >
      <div className="glass-card border border-white/10 p-6 md:p-10 max-w-7xl mx-auto mb-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-light mb-3">Gift Ideas for {formData.relationship}</h2>
          <p className="text-white/70">
            Based on your description, here are some perfect gift ideas for the {formData.age} {formData.relationship.toLowerCase()} 
            who enjoys {formData.interests}. Budget range: {formData.budget}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-auto md:flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
            <Input
              placeholder="Search gifts..."
              className="pl-10 bg-background/40 border-white/10 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Button 
              variant="outline" 
              className="border-white/20 text-white/70 hover:bg-white/5"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={16} className="mr-2" />
              Filters
            </Button>
            
            <select 
              className="bg-background/40 border border-white/10 text-white/90 p-2 rounded-md"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="match">Best Match</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="popularity">Most Popular</option>
            </select>
          </div>
        </div>
        
        {showFilters && (
          <div className="mb-6 p-4 border border-white/10 rounded-lg bg-black/20 animate-fade-in">
            <p className="text-white/80 mb-2">Filter by price:</p>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={priceFilter === 'all' ? 'default' : 'outline'}
                className={priceFilter !== 'all' ? "border-white/20 text-white/70" : ""}
                onClick={() => setPriceFilter('all')}
                size="sm"
              >
                All Prices
              </Button>
              <Button 
                variant={priceFilter === 'under50' ? 'default' : 'outline'}
                className={priceFilter !== 'under50' ? "border-white/20 text-white/70" : ""}
                onClick={() => setPriceFilter('under50')}
                size="sm"
              >
                Under $50
              </Button>
              <Button 
                variant={priceFilter === '50to100' ? 'default' : 'outline'}
                className={priceFilter !== '50to100' ? "border-white/20 text-white/70" : ""}
                onClick={() => setPriceFilter('50to100')}
                size="sm"
              >
                $50 - $100
              </Button>
              <Button 
                variant={priceFilter === '100to250' ? 'default' : 'outline'}
                className={priceFilter !== '100to250' ? "border-white/20 text-white/70" : ""}
                onClick={() => setPriceFilter('100to250')}
                size="sm"
              >
                $100 - $250
              </Button>
              <Button 
                variant={priceFilter === 'over250' ? 'default' : 'outline'}
                className={priceFilter !== 'over250' ? "border-white/20 text-white/70" : ""}
                onClick={() => setPriceFilter('over250')}
                size="sm"
              >
                Over $250
              </Button>
            </div>
          </div>
        )}
        
        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map((gift, index) => (
              <GiftCard key={index} gift={gift} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-white/70 text-lg mb-4">No gifts match your current filters.</p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setPriceFilter('all');
              }}
              className="neomorphic-button"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftFinderResults;
