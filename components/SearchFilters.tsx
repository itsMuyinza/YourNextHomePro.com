
import React, { useState, useRef, useEffect } from 'react';
import { SlidersHorizontal, ChevronDown, CheckCircle, Clock, Award, Zap, Leaf, Shield, MapPin } from 'lucide-react';
import { FilterState } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchFiltersProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  onOpenSidebar: () => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, setFilters, onOpenSidebar }) => {
  const [activeDropdown, setActiveDropdown] = useState<'availability' | 'distance' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const vibes = [
    { id: 'all', label: 'All Pros', icon: null },
    { id: 'handyman', label: 'Handyman & Repairs', icon: <Zap className="h-3.5 w-3.5" /> },
    { id: 'luxury', label: 'Luxury Design & Build', icon: <Award className="h-3.5 w-3.5" /> },
    { id: 'eco', label: 'Energy Efficient Upgrades', icon: <Leaf className="h-3.5 w-3.5" /> },
    { id: 'historic', label: 'Historic Restoration', icon: <CheckCircle className="h-3.5 w-3.5" /> },
    { id: 'emergency', label: '24/7 Emergency Service', icon: <Clock className="h-3.5 w-3.5" /> },
  ];

  const availabilityOptions = [
    { id: 'any', label: 'Anytime' },
    { id: 'today', label: 'Available Today' },
    { id: 'within_3_days', label: 'Within 3 Days' },
  ];

  const distanceOptions = [
    { value: 5, label: 'Within 5 miles' },
    { value: 10, label: 'Within 10 miles' },
    { value: 25, label: 'Within 25 miles' },
    { value: 50, label: 'Within 50 miles' },
    { value: 100, label: '100+ miles' },
  ];

  const getAvailabilityLabel = () => {
    return availabilityOptions.find(o => o.id === filters.availability)?.label || 'Availability';
  };

  const getDistanceLabel = () => {
    return distanceOptions.find(o => o.value === filters.distance)?.label || 'Distance';
  };

  return (
    <div className="w-full border-b border-taupe/10 bg-paper py-4 sticky top-20 z-30 shadow-sm backdrop-blur-md bg-opacity-95">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4">
                {/* Row 1: Vibe Check (Horizontal Scroll) */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    <span className="text-xs font-bold text-espresso uppercase tracking-widest whitespace-nowrap mr-2">Vibe Check:</span>
                    {vibes.map((vibe) => (
                        <button
                            key={vibe.id}
                            onClick={() => setFilters({ ...filters, category: vibe.id })}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border active:scale-95 ${
                                filters.category === vibe.id 
                                ? 'bg-terracotta text-white border-terracotta shadow-glow' 
                                : 'bg-white text-taupe border-taupe/10 hover:border-terracotta hover:text-terracotta'
                            }`}
                        >
                            {vibe.icon}
                            {vibe.label}
                        </button>
                    ))}
                </div>

                {/* Row 2: Tech Filters */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide" ref={dropdownRef}>
                     <button 
                        onClick={onOpenSidebar}
                        className="flex items-center gap-2 bg-white border border-taupe/10 px-4 py-2 rounded-lg text-sm font-medium text-espresso shadow-sm hover:shadow-md transition-all whitespace-nowrap active:scale-95"
                      >
                        <SlidersHorizontal className="h-4 w-4" />
                        All Filters
                        {(filters.isLicensed || filters.instantBook || filters.minRating > 0) && (
                          <span className="bg-terracotta w-2 h-2 rounded-full"></span>
                        )}
                     </button>
                     <div className="h-6 w-px bg-taupe/10 mx-2"></div>
                     
                     {/* Availability Dropdown */}
                     <div className="relative">
                        <button 
                          onClick={() => setActiveDropdown(activeDropdown === 'availability' ? null : 'availability')}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap border active:scale-95 ${activeDropdown === 'availability' || filters.availability !== 'any' ? 'bg-white border-taupe/20 text-espresso shadow-sm' : 'bg-transparent border-transparent text-taupe hover:bg-white hover:border-taupe/10'}`}
                        >
                           <Clock className="h-4 w-4" />
                           {getAvailabilityLabel()}
                           <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'availability' ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === 'availability' && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-taupe/10 py-2 z-50"
                            >
                               {availabilityOptions.map(opt => (
                                  <button 
                                    key={opt.id}
                                    onClick={() => {
                                      setFilters({ ...filters, availability: opt.id as any });
                                      setActiveDropdown(null);
                                    }}
                                    className={`w-full text-left px-4 py-3 text-sm hover:bg-paper transition-colors flex items-center justify-between ${filters.availability === opt.id ? 'text-terracotta font-bold' : 'text-taupe'}`}
                                  >
                                    {opt.label}
                                    {filters.availability === opt.id && <CheckCircle className="h-4 w-4" />}
                                  </button>
                               ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                     </div>

                     {/* Distance Dropdown */}
                     <div className="relative">
                        <button 
                          onClick={() => setActiveDropdown(activeDropdown === 'distance' ? null : 'distance')}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap border active:scale-95 ${activeDropdown === 'distance' || filters.distance !== 25 ? 'bg-white border-taupe/20 text-espresso shadow-sm' : 'bg-transparent border-transparent text-taupe hover:bg-white hover:border-taupe/10'}`}
                        >
                           <MapPin className="h-4 w-4" />
                           {getDistanceLabel()}
                           <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'distance' ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === 'distance' && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-taupe/10 py-2 z-50"
                            >
                               {distanceOptions.map(opt => (
                                  <button 
                                    key={opt.value}
                                    onClick={() => {
                                      setFilters({ ...filters, distance: opt.value });
                                      setActiveDropdown(null);
                                    }}
                                    className={`w-full text-left px-4 py-3 text-sm hover:bg-paper transition-colors flex items-center justify-between ${filters.distance === opt.value ? 'text-terracotta font-bold' : 'text-taupe'}`}
                                  >
                                    {opt.label}
                                    {filters.distance === opt.value && <CheckCircle className="h-4 w-4" />}
                                  </button>
                               ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                     </div>

                     <button 
                        onClick={() => setFilters({ ...filters, isLicensed: !filters.isLicensed })}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap border ${filters.isLicensed ? 'bg-sage/10 border-sage/30 text-sage shadow-sm' : 'bg-transparent border-transparent text-taupe hover:bg-white hover:border-taupe/10'}`}
                      >
                         <Shield className="h-4 w-4" />
                         Licensed Only
                     </button>
                </div>
            </div>
        </div>
    </div>
  );
};
