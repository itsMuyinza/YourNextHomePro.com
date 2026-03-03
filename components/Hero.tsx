
import React, { useState } from 'react';
import { Compass, Hammer, CheckCircle, MapPin, ShieldCheck, Sparkles, Search, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VoiceSearch } from './VoiceSearch';

interface HeroProps {
  onSearch: (term: string, location: string) => void;
  onConciergeSearch: (query: string) => void;
  isThinking?: boolean;
}

type SearchMode = 'STANDARD' | 'CONCIERGE';

export const Hero: React.FC<HeroProps> = ({ onSearch, onConciergeSearch, isThinking = false }) => {
  const [term, setTerm] = useState('');
  const [location, setLocation] = useState('');
  const [mode, setMode] = useState<SearchMode>('STANDARD');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'CONCIERGE') {
      if (term.trim()) onConciergeSearch(term);
    } else {
      onSearch(term, location);
    }
  };

  const handleVoiceTranscription = (text: string) => {
    setTerm(text);
  };

  // "Expensive" feel: High stiffness, sufficient damping to prevent wobble
  const springTransition = { type: "spring", stiffness: 400, damping: 30 };

  return (
    <div className="relative overflow-hidden bg-paper">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 min-h-[750px]">
          
          {/* Content Side */}
          <div className="lg:col-span-6 px-4 sm:px-6 lg:px-12 flex flex-col justify-center py-16 lg:py-20 z-10 relative">
             {/* Decor element - Subtle Shift */}
            <motion.div 
              animate={{ 
                opacity: mode === 'CONCIERGE' ? 0.6 : 0.3,
                scale: mode === 'CONCIERGE' ? 1.1 : 1
              }}
              transition={{ duration: 1.5 }}
              className="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl pointer-events-none bg-terracotta/10"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="flex items-center gap-2 mb-6">
                 <span className="text-terracotta font-bold tracking-[0.2em] text-xs uppercase block">
                  Curated Local Network
                </span>
                <AnimatePresence>
                  {mode === 'CONCIERGE' && (
                    <motion.div 
                      initial={{ opacity: 0, width: 0 }} 
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-terracotta/10 border border-terracotta/20">
                        <Sparkles className="h-3 w-3 text-terracotta" />
                        <span className="text-[9px] font-bold uppercase tracking-wider text-terracotta whitespace-nowrap">AI Concierge Active</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-espresso leading-tight md:leading-snug mb-6 tracking-tight">
                Find Trusted Home <br />
                Professionals with Ease.
              </h1>
              <p className="text-lg text-taupe mb-10 max-w-lg leading-relaxed font-light">
                From emergency repairs to dream renovations, connect with verified experts in minutes.
              </p>
              
              {/* "Sliding Surface" Segmented Control */}
              <div className="flex items-center gap-4 mb-8">
                  {/* Container: Warm Taupe/Stone Pill */}
                  <div className="bg-taupe/10 p-1.5 rounded-full flex items-center shadow-inner relative w-fit">
                    
                    {/* Option 1: Standard */}
                    <button 
                      onClick={() => setMode('STANDARD')} 
                      className="relative z-10 px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-colors duration-200 w-40 text-center"
                    >
                      <span className={`relative z-10 transition-colors duration-200 ${mode === 'STANDARD' ? 'text-espresso' : 'text-taupe'}`}>
                        Standard Search
                      </span>
                    </button>
                    
                    {/* Option 2: Concierge */}
                    <button 
                      onClick={() => setMode('CONCIERGE')} 
                      className="relative z-10 px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-colors duration-200 flex items-center justify-center gap-2 w-40"
                    >
                         <span className={`relative z-10 transition-colors duration-200 ${mode === 'CONCIERGE' ? 'text-espresso' : 'text-taupe'}`}>
                            Concierge
                         </span>
                         {mode === 'CONCIERGE' && (
                           <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={springTransition}
                           >
                              <Sparkles className="h-3 w-3 text-terracotta relative z-10" />
                           </motion.div>
                         )}
                    </button>

                    {/* The "Puck" - Floating White Surface */}
                    <div className="absolute inset-0 p-1.5 pointer-events-none">
                      <motion.div
                        layoutId="activePill"
                        transition={springTransition}
                        className={`h-full rounded-full shadow-sm bg-white w-[160px] ${mode === 'CONCIERGE' ? 'translate-x-[160px]' : 'translate-x-0'}`}
                      />
                    </div>
                  </div>
              </div>

            </motion.div>

            {/* High-Fidelity Search Container */}
            <motion.form 
              layout
              onSubmit={handleSearch}
              initial={false}
              animate={{
                borderColor: mode === 'CONCIERGE' ? 'rgba(217, 119, 87, 0.5)' : 'rgba(107, 94, 85, 0.1)',
                boxShadow: mode === 'CONCIERGE' ? '0 0 0 4px rgba(217, 119, 87, 0.05), 0 20px 40px rgba(0,0,0,0.05)' : '0 8px 30px rgba(0, 0, 0, 0.04)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)'
              }}
              transition={springTransition}
              className="backdrop-blur-xl p-2 rounded-[32px] border relative z-20 group"
            >
              <div className="flex flex-col">
                <div className={`flex items-center px-6 py-5 transition-all duration-300 ${mode === 'STANDARD' ? 'border-b border-taupe/5' : ''}`}>
                    <AnimatePresence mode="wait">
                      {mode === 'CONCIERGE' ? (
                        <motion.div 
                          key="icon-concierge"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={springTransition}
                        >
                          <motion.div 
                            animate={{ scale: [1, 1.1, 1] }} 
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                          >
                             <Sparkles className="h-6 w-6 text-terracotta mr-4" />
                          </motion.div>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="icon-standard"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={springTransition}
                        >
                          <Search className="h-6 w-6 text-taupe/60 mr-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <motion.input
                      layout
                      key={mode} 
                      type="text"
                      placeholder={mode === 'CONCIERGE' ? "Ask Gemini... (e.g. 'I need a cheap painter for a small studio ASAP')" : "What service do you need? (e.g. Plumber)"}
                      className="w-full bg-transparent border-none focus:ring-0 text-espresso placeholder-taupe/40 font-medium outline-none text-lg"
                      value={term}
                      onChange={(e) => setTerm(e.target.value)}
                    />
                    <VoiceSearch onTranscription={handleVoiceTranscription} />
                </div>

                <AnimatePresence>
                  {mode === 'STANDARD' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={springTransition}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col sm:flex-row pt-2">
                          <div className="flex-grow flex items-center px-6 py-4">
                              <MapPin className="h-5 w-5 text-terracotta mr-4" />
                              <input
                              type="text"
                              placeholder="Zip Code or City"
                              className="w-full bg-transparent border-none focus:ring-0 text-espresso placeholder-taupe/40 font-medium outline-none text-lg"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              />
                          </div>
                          <motion.button 
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.97 }}
                              type="submit"
                              className="w-full sm:w-auto px-10 py-4 bg-terracotta text-paper font-bold rounded-3xl shadow-glow flex items-center justify-center gap-2 m-1.5 text-sm uppercase tracking-widest transition-all hover:bg-terracotta-dark"
                          >
                              <Compass className="h-4 w-4" />
                              <span>Search</span>
                          </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {mode === 'CONCIERGE' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={springTransition}
                      className="overflow-hidden"
                    >
                       <div className="px-1.5 pb-1.5 pt-2">
                          <motion.button 
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              type="submit"
                              disabled={isThinking}
                              className="w-full py-4 bg-terracotta text-white font-bold rounded-3xl shadow-lg flex items-center justify-center gap-2 text-sm uppercase tracking-widest transition-all disabled:opacity-80"
                          >
                              {isThinking ? (
                                 <>
                                   <Loader2 className="h-4 w-4 animate-spin" />
                                   <span>Scanning 1,200+ Verified Pro Profiles...</span>
                                 </>
                              ) : (
                                 <>
                                   <Sparkles className="h-4 w-4" />
                                   <span>Find My Perfect Match</span>
                                 </>
                              )}
                          </motion.button>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.form>

            {/* Trust Strip */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-xs font-bold uppercase tracking-widest text-taupe/80 px-4"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-sage" />
                1,200+ Licensed Pros
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-sage" />
                Strictly Vetted
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-sage" />
                Insured
              </div>
            </motion.div>
          </div>

          {/* Image Side */}
          <div className="lg:col-span-6 relative h-[500px] lg:h-auto overflow-hidden">
             <div className="absolute inset-0 lg:left-0 lg:right-0 bg-gray-100 rounded-bl-[80px] overflow-hidden shadow-2xl">
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80"
                    alt="Interior"
                    className="w-full h-full object-cover"
                />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
