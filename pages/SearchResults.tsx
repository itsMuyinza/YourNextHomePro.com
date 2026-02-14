
import React, { useState, useEffect, useMemo } from 'react';
import { ProCard, ProCardSkeleton } from '../components/ProCard';
import { FilterBar } from '../components/FilterBar';
import { FilterSidebar } from '../components/FilterSidebar';
import { AreaInsights } from '../components/AreaInsights';
import { Pro, FilterState } from '../types';
import { Map, Star, ArrowRight, SearchX, List, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResultsProps {
  pros: Pro[];
  onSelectPro: (pro: Pro) => void;
  searchTerm: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ 
    pros: rawPros, 
    onSelectPro, 
    searchTerm, 
}) => {
  const [hoveredProId, setHoveredProId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileMap, setShowMobileMap] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Core Filter State
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    availability: 'any',
    distance: 25,
    isLicensed: false,
    minRating: 0,
    instantBook: false
  });

  // Calculate Filtered Pros
  const filteredPros = useMemo(() => {
    return rawPros.filter(pro => {
      // 1. Search Term (Title, Service, Tags) - Note: If passed from Gemini Search, this list is already filtered/sorted
      if (searchTerm && !pro.matchReason) {
        const lowerSearch = searchTerm.toLowerCase();
        const matchesSearch = 
            pro.businessName.toLowerCase().includes(lowerSearch) ||
            pro.service.toLowerCase().includes(lowerSearch) ||
            pro.tags.some(t => t.toLowerCase().includes(lowerSearch));
        if (!matchesSearch) return false;
      }

      // 2. Category (Vibe Check)
      if (filters.category !== 'all') {
          const s = pro.service.toLowerCase();
          const tags = pro.tags.map(t => t.toLowerCase());
          const attrs = pro.attributes || [];
          
          if (filters.category === 'handyman') {
            if (!(s.includes('handyman') || tags.includes('quick fix'))) return false;
          } else if (filters.category === 'luxury') {
            if (!(pro.priceRange === '$$$$' || tags.includes('design') || tags.includes('additions'))) return false;
          } else if (filters.category === 'eco') {
            if (!(tags.some(t => t.includes('eco') || t.includes('sustainable')))) return false;
          } else if (filters.category === 'historic') {
            if (!(tags.some(t => t.includes('historic')))) return false;
          } else if (filters.category === 'emergency') {
            if (!(attrs.some(a => a.value.toLowerCase().includes('24/7')) || tags.some(t => t.includes('emergency')))) return false;
          }
      }

      // 3. Trust & License
      if (filters.isLicensed && !pro.verified) return false;

      // 4. Rating Threshold
      if (pro.rating < filters.minRating) return false;

      // 5. Distance Logic (Strictly inclusive of selected radius)
      if (filters.distance < 100 && pro.distance > filters.distance) return false;

      // 6. Availability Logic
      if (filters.availability === 'today') {
        if (pro.availability !== 'today') return false;
      } else if (filters.availability === 'within_3_days') {
        // Includes 'today' and 'tomorrow' based on our mock data structure
        if (pro.availability === 'week') return false; 
      }

      return true;
    });
  }, [rawPros, filters, searchTerm]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [searchTerm, filters]);

  const scrollToPro = (proId: string) => {
    const element = document.getElementById(`pro-card-${proId}`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setHoveredProId(proId);
        setTimeout(() => setHoveredProId(null), 2000);
    }
  };

  return (
    <div className="bg-paper min-h-screen flex flex-col">
      <FilterBar 
        filters={filters} 
        setFilters={setFilters} 
        onOpenSidebar={() => setIsSidebarOpen(true)} 
      />

      <FilterSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        filters={filters}
        setFilters={setFilters}
        resultsCount={filteredPros.length}
      />

      <div className="flex-1 max-w-[1920px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        
        <div className="mb-8 pl-2 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
             <div>
               {searchTerm ? (
                   <h1 className="text-3xl md:text-4xl font-serif font-medium text-espresso">
                    Results for "<span className="italic">{searchTerm}</span>"
                  </h1>
               ) : (
                   <h1 className="text-3xl md:text-4xl font-serif font-medium text-espresso">
                    The Guide: <span className="text-terracotta italic">Trusted Local Craftsmen</span>
                  </h1>
               )}
               <div className="text-xs font-bold uppercase tracking-widest text-taupe mt-2">
                  {filteredPros.length} specialists found
               </div>
             </div>
             
             {/* Google Maps Insight Component */}
             <div className="w-full md:w-96">
                <AreaInsights location={filteredPros[0]?.location || "Austin, TX"} />
             </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 relative h-full">
            {/* Feed */}
            <div className={`w-full lg:w-[45%] order-2 lg:order-1 min-h-[500px] ${showMobileMap ? 'hidden lg:block' : 'block'}`}>
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map((i) => <ProCardSkeleton key={i} />)}
                    </div>
                ) : (
                    <motion.div 
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 items-stretch"
                    >
                        {filteredPros.length > 0 ? (
                            filteredPros.map((pro) => (
                                <ProCard 
                                    key={pro.id}
                                    pro={pro} 
                                    onClick={onSelectPro} 
                                    onHover={setHoveredProId}
                                    isHighlighted={hoveredProId === pro.id}
                                />
                            ))
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }} 
                                animate={{ opacity: 1, scale: 1 }}
                                className="col-span-full py-24 bg-white rounded-[40px] border border-taupe/10 px-8 shadow-soft text-center"
                            >
                                <div className="w-20 h-20 bg-taupe/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <HelpCircle className="h-10 w-10 text-taupe" />
                                </div>
                                <h3 className="text-2xl font-serif text-espresso mb-3">No direct match found.</h3>
                                <p className="text-taupe mb-8 max-w-sm mx-auto">
                                  I couldn't find a perfect match in our database. Would you like our concierge team to manually scout this for you?
                                </p>
                                <button 
                                    onClick={() => setFilters({ category: 'all', availability: 'any', distance: 25, isLicensed: false, minRating: 0, instantBook: false })}
                                    className="text-white bg-terracotta px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-terracotta-dark transition-colors mb-4 block w-full sm:w-auto mx-auto"
                                >
                                    Start Manual Scout Request
                                </button>
                                <button 
                                    onClick={() => setFilters({ category: 'all', availability: 'any', distance: 25, isLicensed: false, minRating: 0, instantBook: false })}
                                    className="text-taupe hover:text-espresso text-xs font-bold uppercase tracking-widest transition-colors"
                                >
                                    Or Reset Filters
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </div>

            {/* Interactive Map Overlay (Simulated) */}
            <div className={`w-full lg:w-[55%] h-[calc(100vh-160px)] sticky top-36 rounded-[40px] overflow-hidden shadow-soft border border-white/5 order-2 z-10 ${showMobileMap ? 'block' : 'hidden lg:block'}`}>
                <div className="w-full h-full bg-[#E5E0D8] relative">
                    <div className="absolute inset-0 opacity-60 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Map_of_New_York_City_featuring_all_five_boroughs.svg/1200px-Map_of_New_York_City_featuring_all_five_boroughs.svg.png')] bg-cover bg-center grayscale contrast-[0.8] sepia-[0.1]"></div>
                    {filteredPros.map((pro, index) => (
                      <div 
                        key={pro.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${hoveredProId === pro.id ? 'z-50 scale-125' : 'z-20'}`}
                        style={{ top: `${30 + (index * 12)}%`, left: `${20 + (index * 15)}%` }}
                        onClick={() => scrollToPro(pro.id)}
                      >
                         <div className={`px-4 py-2 rounded-full font-bold text-xs shadow-lg border-2 border-white ${hoveredProId === pro.id ? 'bg-terracotta text-white' : 'bg-espresso text-white'}`}>
                           {pro.priceRange} • {pro.distance}mi
                         </div>
                      </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
