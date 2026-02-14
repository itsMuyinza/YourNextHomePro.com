
import React, { useState } from 'react';
import { Star, MapPin, Check, ShieldCheck, Clock, Quote, ArrowRight, Heart, Hammer, Briefcase, Zap, AlertTriangle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Pro } from '../types';

interface ProCardProps {
  pro: Pro;
  onClick: (pro: Pro) => void;
  onHover?: (id: string | null) => void;
  isHighlighted?: boolean;
  onToggleSave?: (id: string) => void;
  isSaved?: boolean;
}

export const ProCard: React.FC<ProCardProps> = ({ pro, onClick, onHover, isHighlighted = false, onToggleSave, isSaved = false }) => {
  const [imageError, setImageError] = useState(false);
  
  const reviewSnippet = pro.reviews.length > 0 
    ? pro.reviews[0].text.length > 80 
        ? `"${pro.reviews[0].text.substring(0, 80)}..."`
        : `"${pro.reviews[0].text}"`
    : "Verified reviews coming soon.";

  // Determine fallback icon based on service
  const getFallbackIcon = () => {
      const s = pro.service.toLowerCase();
      if (s.includes('electric')) return <Zap className="h-12 w-12 text-taupe/40" />;
      if (s.includes('plumb')) return <AlertTriangle className="h-12 w-12 text-taupe/40" />;
      return <Briefcase className="h-12 w-12 text-taupe/40" />;
  };

  return (
    <motion.article 
      id={`pro-card-${pro.id}`}
      className={`group bg-white rounded-[32px] shadow-sm hover:shadow-soft-hover cursor-pointer flex flex-col h-full overflow-hidden relative transition-all duration-500 border border-taupe/5 ${isHighlighted ? 'ring-2 ring-terracotta ring-offset-4' : ''}`}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={() => onHover?.(pro.id)}
      onMouseLeave={() => onHover?.(null)}
      onClick={() => onClick(pro)}
    >
      {/* Availability & Save Row */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
         <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-sm border border-emerald-100/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold tracking-wide text-emerald-800 uppercase">Available Today</span>
         </div>
         <motion.button 
           whileTap={{ scale: 0.8 }}
           onClick={(e) => {
             e.stopPropagation();
             onToggleSave?.(pro.id);
           }}
           className={`p-2.5 rounded-full backdrop-blur-md shadow-sm border transition-all ${isSaved ? 'bg-terracotta text-white border-terracotta' : 'bg-white/90 text-taupe border-white/40 hover:bg-white hover:text-terracotta'}`}
         >
           <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
         </motion.button>
      </div>

      {/* Image Container with Fixed Aspect Ratio */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-taupe/10 shrink-0">
        {!imageError ? (
          <motion.img 
            src={pro.coverUrl} 
            alt={`${pro.businessName} Cover`} 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-paper relative overflow-hidden">
             <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#2C2420_1px,transparent_1px)] [background-size:16px_16px]"></div>
             <div className="z-10 bg-white p-6 rounded-full shadow-sm mb-3">
                {getFallbackIcon()}
             </div>
             <span className="text-taupe/60 font-serif italic text-sm z-10">Image Unavailable</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-80"></div>
        
        {pro.verified && (
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden relative">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent z-10 pointer-events-none"></div>
                <ShieldCheck className="h-3.5 w-3.5 text-sage relative z-20" />
                <span className="text-[10px] font-bold tracking-wider text-espresso uppercase relative z-20">Licensed</span>
            </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-7 flex-1 flex flex-col">
        {/* Gemini Insight Box */}
        {pro.matchReason && (
          <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 flex gap-3 items-start animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Sparkles className="h-4 w-4 text-purple-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-purple-600 mb-0.5">Gemini Insight</p>
              <p className="text-xs text-espresso/80 leading-snug font-medium">{pro.matchReason}</p>
            </div>
          </div>
        )}

        <div className="flex justify-between items-start mb-1">
          <h3 className="font-serif text-xl font-bold text-espresso group-hover:text-terracotta transition-colors leading-tight line-clamp-1">
            {pro.businessName}
          </h3>
          <div className="flex items-center bg-paper px-2 py-1 rounded-lg border border-taupe/5 shrink-0 ml-2">
            <Star className="h-3.5 w-3.5 text-terracotta fill-current" />
            <span className="ml-1 text-sm font-bold text-espresso">{pro.rating}</span>
          </div>
        </div>
        <p className="text-xs font-bold text-terracotta uppercase tracking-wider mb-4">
             {pro.service} • {pro.yearsInBusiness} Years Exp.
        </p>
        <div className="flex items-center text-taupe/80 text-sm mb-6">
          <MapPin className="h-3.5 w-3.5 mr-1.5 text-taupe/60" />
          <span className="truncate">Serving {pro.location}</span>
        </div>
        
        <div className="mb-6 bg-paper/50 p-4 rounded-2xl border border-taupe/5 relative">
             <Quote className="h-4 w-4 text-terracotta/20 absolute top-3 left-3 transform -scale-x-100" />
             <p className="text-sm text-taupe italic leading-relaxed pl-2 line-clamp-2">
                {reviewSnippet}
             </p>
        </div>
        
        <div className="mt-auto pt-5 border-t border-taupe/10 flex items-center justify-between">
            <div className="flex items-center text-[10px] text-taupe/60 font-medium">
                <Clock className="h-3 w-3 mr-1.5" />
                Responds fast
            </div>
            <button className="text-sm font-bold text-espresso group-hover:text-terracotta transition-colors flex items-center gap-1 group/btn">
                Profile <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
            </button>
        </div>
      </div>
    </motion.article>
  );
};

export const ProCardSkeleton = () => (
    <div className="bg-white rounded-[32px] shadow-sm h-[500px] flex flex-col overflow-hidden animate-pulse border border-gray-100">
        <div className="aspect-[4/3] bg-gray-200 w-full relative"></div>
        <div className="p-7 flex-1 flex flex-col">
            <div className="flex justify-between mb-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-12"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-20 bg-gray-100 rounded-2xl mb-4"></div>
            <div className="mt-auto pt-4 flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
        </div>
    </div>
);
