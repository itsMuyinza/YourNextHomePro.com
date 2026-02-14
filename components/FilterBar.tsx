
import React, { useState, useRef, useEffect } from 'react';
import { SlidersHorizontal, ChevronDown, Clock, Award, Zap, Leaf, Shield, MapPin, Check } from 'lucide-react';
import { FilterState } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterBarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  onOpenSidebar: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters, onOpenSidebar }) => {
  const [openMenu, setOpenMenu] = useState<'availability' | 'distance' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
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
    { id: 'historic', label: 'Historic Restoration', icon: <Shield className="h-3.5 w-3.5" /> },
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
    { value: 100, label: 'Anywhere' },
  ];

  const handleToggle = (menu: 'availability' | 'distance') => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const currentAvailabilityLabel = availabilityOptions.find(o => o.id === filters.availability)?.label || 'Availability';
  const currentDistanceLabel = distanceOptions.find(o => o.value === filters.distance)?.label || 'Distance';

  return (
    <div className="w-full border-b border-taupe/10 bg-paper py-4 sticky top-20 z-[45] shadow-sm backdrop-blur-md bg-opacity-95" ref={containerRef}>
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          
          {/* Row 1: Vibe Check Pills */}
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

          {/* Row 2: Pull-down Filters */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            
            {/* ALL FILTERS TRIGGER */}
            <button 
              onClick={onOpenSidebar}
              className="flex items-center gap-2 bg-white border border-taupe/10 px-4 py-2 rounded-lg text-sm font-medium text-espresso shadow-sm hover:shadow-md transition-all whitespace-nowrap active:scale-95 group"
            >
              <SlidersHorizontal className="h-4 w-4 group-hover:text-terracotta transition-colors" />
              All Filters
              {(filters.isLicensed || filters.instantBook || filters.minRating > 0) && (
                <span className="bg-terracotta w-2 h-2 rounded-full"></span>
              )}
            </button>

            <div className="h-6 w-px bg-taupe/10 mx-2"></div>

            {/* AVAILABILITY PULL DOWN */}
            <div className="relative">
              <button 
                onClick={() => handleToggle('availability')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all active:scale-95 ${
                  openMenu === 'availability' || filters.availability !== 'any' 
                  ? 'border-terracotta bg-terracotta/5 text-terracotta shadow-sm' 
                  : 'border-taupe/20 bg-white text-taupe hover:border-terracotta/50'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">{currentAvailabilityLabel}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${openMenu === 'availability' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {openMenu === 'availability' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-taupe/10 z-[100] overflow-hidden py-1"
                  >
                    {availabilityOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setFilters({ ...filters, availability: opt.id as any });
                          setOpenMenu(null);
                        }}
                        className={`w-full text-left px-5 py-3.5 text-sm transition-colors flex items-center justify-between ${
                          filters.availability === opt.id 
                          ? 'bg-paper text-terracotta font-bold' 
                          : 'text-espresso hover:bg-paper'
                        }`}
                      >
                        {opt.label}
                        {filters.availability === opt.id && <Check className="h-4 w-4" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* DISTANCE PULL DOWN */}
            <div className="relative">
              <button 
                onClick={() => handleToggle('distance')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all active:scale-95 ${
                  openMenu === 'distance' || filters.distance !== 25 
                  ? 'border-terracotta bg-terracotta/5 text-terracotta shadow-sm' 
                  : 'border-taupe/20 bg-white text-taupe hover:border-terracotta/50'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">{currentDistanceLabel}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${openMenu === 'distance' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {openMenu === 'distance' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-taupe/10 z-[100] overflow-hidden py-1"
                  >
                    {distanceOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setFilters({ ...filters, distance: opt.value });
                          setOpenMenu(null);
                        }}
                        className={`w-full text-left px-5 py-3.5 text-sm transition-colors flex items-center justify-between ${
                          filters.distance === opt.value 
                          ? 'bg-paper text-terracotta font-bold' 
                          : 'text-espresso hover:bg-paper'
                        }`}
                      >
                        {opt.label}
                        {filters.distance === opt.value && <Check className="h-4 w-4" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* LICENSED QUICK TOGGLE */}
            <button 
              onClick={() => setFilters({ ...filters, isLicensed: !filters.isLicensed })}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all active:scale-95 ${
                filters.isLicensed 
                ? 'bg-sage/10 border-sage/30 text-sage' 
                : 'bg-white border-taupe/20 text-taupe hover:border-terracotta/50'
              }`}
            >
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">Licensed Only</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
