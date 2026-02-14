
import React, { useState } from 'react';
import { ShieldCheck, Star, MapPin, Calendar, Phone, Mail, Share2, Heart, CheckCircle, Clock, AlertTriangle, DollarSign, Zap, Sparkles, User, ArrowRight } from 'lucide-react';
import { Pro } from '../types';
import { ClaimModal } from '../components/ClaimModal';
import { VerificationModal } from '../components/VerificationModal';
import { motion } from 'framer-motion';

interface ProProfileProps {
  pro: Pro;
  onClaimStatusChange: (proId: string) => void;
  onVerificationSubmit?: (proId: string, details: any) => void;
  onInquiry?: () => void;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Clock': return <Clock className="h-5 w-5" />;
    case 'MapPin': return <MapPin className="h-5 w-5" />;
    case 'DollarSign': return <DollarSign className="h-5 w-5" />;
    case 'Shield': return <ShieldCheck className="h-5 w-5" />;
    case 'Calendar': return <Calendar className="h-5 w-5" />;
    case 'Sparkles': return <Sparkles className="h-5 w-5" />;
    case 'Award': return <Star className="h-5 w-5" />;
    default: return <CheckCircle className="h-5 w-5" />;
  }
};

export const ProProfile: React.FC<ProProfileProps> = ({ pro, onClaimStatusChange, onVerificationSubmit, onInquiry }) => {
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);

  return (
    <div className="bg-paper min-h-screen pb-32">
      {/* Full Bleed Cinematic Header */}
      <div className="relative h-[60vh] w-full overflow-hidden group">
        <img src={pro.coverUrl} alt="Cover" className="w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-105" />
        <div className="absolute inset-0 bg-espresso/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-transparent opacity-100"></div>
        
        {/* Navigation Overlay */}
        <div className="absolute top-0 left-0 w-full p-8 z-20 flex justify-between items-start">
             <button onClick={() => window.history.back()} className="bg-white/10 backdrop-blur-xl text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20 hover:bg-white/20 transition-all">
                ← Back to Guide
             </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Content (Editorial) */}
          <div className="lg:col-span-8">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="mb-16"
             >
                 <div className="h-32 w-32 rounded-[32px] overflow-hidden shadow-2xl border-4 border-paper mb-8 relative">
                    <img src={pro.imageUrl} alt={pro.name} className="w-full h-full object-cover" />
                 </div>
                 
                 <div className="flex items-center gap-4 mb-4">
                        <h1 className="text-5xl md:text-6xl font-serif font-medium text-espresso tracking-tight leading-none">{pro.businessName}</h1>
                        {pro.licenseStatus === 'verified' && (
                            <div className="bg-sage/10 p-2 rounded-full" title="Verified License">
                                <ShieldCheck className="h-6 w-6 text-sage" />
                            </div>
                        )}
                </div>
                
                <div className="flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-widest text-taupe/80">
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-terracotta"></div>{pro.service}</span>
                    <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {pro.location}</span>
                    <span className="flex items-center gap-2"><Star className="h-4 w-4 text-terracotta fill-current" /> {pro.rating} Rating</span>
                </div>
             </motion.div>

             {/* The Essence */}
             <div className="bg-white rounded-[40px] p-10 md:p-14 shadow-soft border border-taupe/5 mb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                
                <span className="text-terracotta font-bold tracking-[0.2em] text-xs uppercase mb-8 block relative z-10">The Narrative</span>
                
                <div className="prose prose-lg text-taupe relative z-10">
                    <p className="text-espresso font-serif text-3xl leading-snug mb-8 italic">
                        "{pro.description.split('.')[0]}."
                    </p>
                    <p className="leading-relaxed font-light text-lg mb-6">
                        {pro.description.split('.').slice(1).join('.')}
                    </p>
                    <p className="leading-relaxed font-light text-lg">
                        Founded on the belief that true craftsmanship lies in the details that others overlook. Our philosophy is built on transparency, precision, and an unwavering commitment to the longevity of your home projects.
                    </p>
                </div>
             </div>

             {/* Redesigned Meet The Team Section */}
             {pro.team && pro.team.length > 0 && (
                <div className="mb-20">
                     <div className="mb-12">
                        <span className="text-terracotta font-bold tracking-[0.2em] text-[10px] uppercase mb-4 block">The Hands Behind the Craft</span>
                        <h3 className="font-serif text-4xl text-espresso">Meet the Makers</h3>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {pro.team.map((member) => (
                            <motion.div 
                              key={member.id} 
                              whileHover={{ y: -5 }}
                              className="bg-white p-8 rounded-[40px] border border-taupe/5 shadow-soft group transition-all"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative mb-6">
                                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-paper shadow-xl">
                                            <img src={member.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={member.name} />
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 bg-terracotta p-2 rounded-full shadow-lg border-2 border-white">
                                            <Sparkles className="h-4 w-4 text-white" />
                                        </div>
                                    </div>
                                    
                                    <h4 className="font-serif font-bold text-espresso text-2xl mb-1">{member.name}</h4>
                                    <p className="text-[10px] text-terracotta uppercase tracking-[0.2em] font-bold mb-6">{member.role}</p>
                                    
                                    <div className="w-10 h-px bg-taupe/10 mb-6"></div>
                                    
                                    <p className="text-sm text-taupe leading-relaxed font-light">
                                        {member.bio}
                                    </p>

                                    {member.id === 'muyinza' && (
                                        <div className="mt-6 pt-6 border-t border-taupe/5 w-full flex justify-center gap-4 text-[10px] font-bold text-taupe uppercase tracking-widest">
                                            <span>Media</span>
                                            <span className="opacity-30">•</span>
                                            <span>Curator</span>
                                            <span className="opacity-30">•</span>
                                            <span>Father</span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                     </div>

                     <div className="mt-12 bg-espresso rounded-[40px] p-10 text-paper relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                             <div className="bg-terracotta/20 p-5 rounded-3xl">
                                <Sparkles className="h-10 w-10 text-terracotta" />
                             </div>
                             <div>
                                <h4 className="font-serif text-2xl mb-2 italic">The Motivation</h4>
                                <p className="text-paper/70 font-light leading-relaxed">
                                    "When my son was diagnosed with autism, it really made me realize how hard it is to find the people you need—from the right doctors to the best home helpers. This directory is born from that struggle."
                                </p>
                             </div>
                        </div>
                        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                     </div>
                </div>
             )}
          </div>

          {/* Right Sidebar (The Gatekeeper) */}
          <div className="lg:col-span-4 relative">
             <div className="sticky top-32 space-y-8">
                
                {/* Inquiry Card */}
                <div className="bg-white p-8 rounded-[40px] shadow-soft border border-taupe/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-terracotta to-espresso"></div>
                    
                    <div className="text-center mb-8 pt-4">
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-paper mb-4 text-espresso">
                            <Sparkles className="h-5 w-5" />
                        </span>
                        <h3 className="font-serif text-2xl font-bold text-espresso mb-2">Start a Project</h3>
                        <p className="text-taupe text-sm px-4">Direct access to {pro.businessName.split(' ')[0]}'s schedule.</p>
                    </div>

                    <button 
                      onClick={onInquiry}
                      className="w-full py-5 bg-terracotta text-white font-bold rounded-2xl shadow-lg shadow-terracotta/30 hover:bg-terracotta-dark active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs group"
                    >
                        Contact Specialist
                        <Mail className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-taupe/60 font-bold uppercase tracking-widest">
                        <ShieldCheck className="h-3 w-3 text-sage" /> Mediated by Concierge
                    </div>
                </div>

                {/* Logistics Grid */}
                <div className="bg-paper border border-taupe/10 rounded-[32px] p-8">
                    <h4 className="font-serif font-bold text-espresso text-xl mb-6">Logistics</h4>
                    <div className="space-y-5">
                        {pro.attributes?.map((attr, idx) => (
                          <div key={idx} className="flex gap-4 items-start group">
                              <div className="p-2 bg-white rounded-xl shadow-sm text-terracotta group-hover:scale-110 transition-transform">
                                  {getIcon(attr.icon)}
                              </div>
                              <div>
                                  <p className="text-[10px] font-bold text-taupe uppercase tracking-widest leading-none mb-1.5">{attr.label}</p>
                                  <p className="text-espresso font-bold text-sm">{attr.value}</p>
                                  {attr.subtext && <p className="text-xs text-taupe/60 mt-0.5">{attr.subtext}</p>}
                              </div>
                          </div>
                        ))}
                    </div>
                </div>

             </div>
          </div>
        </div>
      </div>

      <ClaimModal pro={pro} isOpen={isClaimModalOpen} onClose={() => setIsClaimModalOpen(false)} onClaim={() => {}} />
      <VerificationModal isOpen={isVerifyModalOpen} onClose={() => setIsVerifyModalOpen(false)} onSubmit={(details) => onVerificationSubmit?.(pro.id, details)} />
    </div>
  );
};
