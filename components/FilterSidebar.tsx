
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Zap, Star } from 'lucide-react';
import { FilterState } from '../types';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  resultsCount: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose, filters, setFilters, resultsCount }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-espresso/40 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-paper shadow-2xl z-[70] flex flex-col border-l border-white/20"
          >
            {/* Header */}
            <div className="p-8 border-b border-taupe/10 flex justify-between items-center bg-white">
              <div>
                <h2 className="font-serif text-3xl font-bold text-espresso">Refine Results</h2>
                <p className="text-taupe text-xs font-bold uppercase tracking-widest mt-1">Discovery Filters</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-taupe/10 rounded-full transition-colors">
                <X className="h-6 w-6 text-espresso" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-12">
              
              {/* Verification Toggles */}
              <section className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-taupe">Trust & Verification</h3>
                
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-taupe/5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-sage" />
                    <div>
                      <p className="text-sm font-bold text-espresso">Verified License Only</p>
                      <p className="text-[10px] text-taupe">Confirmed with state databases</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setFilters({ ...filters, isLicensed: !filters.isLicensed })}
                    className={`w-12 h-6 rounded-full transition-colors relative ${filters.isLicensed ? 'bg-terracotta' : 'bg-taupe/20'}`}
                  >
                    <motion.div 
                      animate={{ x: filters.isLicensed ? 26 : 2 }}
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-taupe/5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-terracotta" />
                    <div>
                      <p className="text-sm font-bold text-espresso">Instant Booking</p>
                      <p className="text-[10px] text-taupe">No confirmation delay</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setFilters({ ...filters, instantBook: !filters.instantBook })}
                    className={`w-12 h-6 rounded-full transition-colors relative ${filters.instantBook ? 'bg-terracotta' : 'bg-taupe/20'}`}
                  >
                    <motion.div 
                      animate={{ x: filters.instantBook ? 26 : 2 }}
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                    />
                  </button>
                </div>
              </section>

              {/* Radius Slider */}
              <section className="space-y-6">
                <div className="flex justify-between items-end">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-taupe">Distance Radius</h3>
                  <span className="text-espresso font-bold">{filters.distance} miles</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="100" 
                  step="5"
                  value={filters.distance}
                  onChange={(e) => setFilters({ ...filters, distance: parseInt(e.target.value) })}
                  className="w-full accent-terracotta"
                />
                <div className="flex justify-between text-[10px] font-bold text-taupe uppercase tracking-widest">
                  <span>5 mi</span>
                  <span>100 mi</span>
                </div>
              </section>

              {/* Min Rating */}
              <section className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-taupe">Minimum Rating</h3>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setFilters({ ...filters, minRating: rating })}
                      className={`py-3 rounded-xl border font-bold text-xs flex flex-col items-center gap-1 transition-all ${
                        filters.minRating === rating 
                        ? 'bg-espresso text-white border-espresso' 
                        : 'bg-white text-taupe border-taupe/10 hover:border-terracotta/50'
                      }`}
                    >
                      <Star className={`h-3 w-3 ${filters.minRating >= rating ? 'fill-current' : ''}`} />
                      {rating}+
                    </button>
                  ))}
                </div>
              </section>

            </div>

            {/* Footer */}
            <div className="p-8 border-t border-taupe/10 bg-white">
              <button 
                onClick={onClose}
                className="w-full py-5 bg-terracotta text-white font-bold rounded-2xl shadow-glow hover:bg-terracotta-dark active:scale-[0.98] transition-all uppercase tracking-widest text-xs"
              >
                Show {resultsCount} Results
              </button>
              <button 
                onClick={() => setFilters({ category: 'all', availability: 'any', distance: 25, isLicensed: false, minRating: 0, instantBook: false })}
                className="w-full mt-4 text-xs font-bold text-taupe hover:text-espresso uppercase tracking-widest transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
