
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Added missing Briefcase import
import { X, Search, ShieldCheck, CheckCircle, Upload, ArrowRight, Loader2, Sparkles, Star, MapPin, Briefcase } from 'lucide-react';

interface ProOnboardingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: any) => void;
}

export const ProOnboardingWizard: React.FC<ProOnboardingWizardProps> = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [isVetting, setIsVetting] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    trade: '',
    licenseNumber: '',
    insurance: '',
    headshot: null as string | null
  });

  const [searchQuery, setSearchQuery] = useState('');

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleVetting = () => {
    setIsVetting(true);
    setTimeout(() => {
      setIsVetting(false);
      nextStep();
    }, 2500);
  };

  const handleComplete = () => {
    onComplete(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-espresso/80 backdrop-blur-xl"
      />

      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-4xl bg-paper rounded-[48px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-white/20"
      >
        {/* Progress Sidebar */}
        <div className="w-full md:w-1/3 bg-espresso p-12 text-paper flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-10 h-10 rounded-xl bg-terracotta flex items-center justify-center shadow-lg shadow-terracotta/20">
                        <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-serif font-bold text-xl tracking-tight">Pro Partner</span>
                </div>
                <div className="space-y-8">
                    {[
                        { num: 1, label: 'Find Business' },
                        { num: 2, label: 'Trust Verification' },
                        { num: 3, label: 'Profile Polish' },
                        { num: 4, label: 'Welcome' }
                    ].map((s) => (
                        <div key={s.num} className="flex items-center gap-4 group">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${step >= s.num ? 'bg-terracotta border-terracotta text-white' : 'border-white/20 text-white/40'}`}>
                                {step > s.num ? <CheckCircle className="h-4 w-4" /> : s.num}
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${step >= s.num ? 'text-white' : 'text-white/30'}`}>
                                {s.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">Secured by Verification Engine</p>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 md:p-16 flex flex-col">
            <button onClick={onClose} className="absolute top-8 right-8 p-2 rounded-full hover:bg-taupe/10 transition-colors">
                <X className="h-6 w-6 text-taupe" />
            </button>

            <AnimatePresence mode="wait">
                {/* STEP 1: FIND BUSINESS */}
                {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
                        <h2 className="font-serif text-4xl text-espresso mb-4">First, let's find you.</h2>
                        <p className="text-taupe mb-10 font-light">Search for your business name to see if we already have a ghost listing waiting for you.</p>
                        
                        <div className="relative mb-8">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-taupe h-6 w-6" />
                            <input 
                                type="text"
                                placeholder="Business Name or Phone..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-16 pr-6 py-6 bg-white border border-taupe/10 rounded-2xl text-lg outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition-all"
                            />
                        </div>

                        {searchQuery.length > 2 && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                                <div className="p-6 bg-white border border-dashed border-terracotta/30 rounded-3xl flex justify-between items-center group cursor-pointer hover:border-terracotta transition-all" onClick={() => { setFormData({...formData, businessName: searchQuery}); nextStep(); }}>
                                    <div className="flex items-center gap-4 opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all">
                                        <div className="w-12 h-12 bg-taupe/10 rounded-xl flex items-center justify-center">
                                            <Briefcase className="h-6 w-6 text-taupe" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-espresso">{searchQuery} Listing</h4>
                                            <p className="text-xs text-taupe">Unclaimed Profile • Austin, TX</p>
                                        </div>
                                    </div>
                                    <button className="px-6 py-3 bg-terracotta text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-terracotta/20 opacity-0 group-hover:opacity-100 transition-all">Claim Profile</button>
                                </div>
                                <button onClick={() => { setFormData({...formData, businessName: searchQuery}); nextStep(); }} className="text-sm text-taupe font-medium hover:text-espresso transition-colors">Business not listed? Create new →</button>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {/* STEP 2: TRUST VERIFICATION */}
                {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
                        <h2 className="font-serif text-4xl text-espresso mb-4">The Trust Gate.</h2>
                        <p className="text-taupe mb-10 font-light">We verify every pro to maintain the highest standard for homeowners.</p>
                        
                        <div className="space-y-6 flex-1">
                            <div>
                                <label className="block text-[10px] font-bold text-taupe uppercase tracking-widest mb-2">License Number</label>
                                <input 
                                    type="text"
                                    value={formData.licenseNumber}
                                    onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                                    className="w-full px-6 py-4 bg-white border border-taupe/10 rounded-2xl outline-none focus:border-terracotta transition-all"
                                    placeholder="e.g. M-39281-TX"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-taupe uppercase tracking-widest mb-2">Liability Insurance Provider</label>
                                <input 
                                    type="text"
                                    value={formData.insurance}
                                    onChange={(e) => setFormData({...formData, insurance: e.target.value})}
                                    className="w-full px-6 py-4 bg-white border border-taupe/10 rounded-2xl outline-none focus:border-terracotta transition-all"
                                    placeholder="e.g. Liberty Mutual"
                                />
                            </div>
                        </div>

                        <div className="mt-12 flex flex-col gap-4">
                            {isVetting ? (
                                <div className="w-full py-5 bg-sage/10 text-sage rounded-2xl flex flex-col items-center justify-center gap-3 overflow-hidden relative">
                                    <motion.div 
                                        animate={{ x: [-200, 400] }}
                                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                        className="absolute top-0 bottom-0 w-20 bg-sage/20 skew-x-12 blur-xl"
                                    />
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Cross-referencing state databases...</span>
                                </div>
                            ) : (
                                <button 
                                    onClick={handleVetting}
                                    disabled={!formData.licenseNumber || !formData.insurance}
                                    className="w-full py-5 bg-espresso text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl disabled:opacity-30 flex items-center justify-center gap-2"
                                >
                                    Verify Credentials
                                </button>
                            )}
                            <button onClick={prevStep} className="text-sm text-taupe hover:text-espresso font-medium self-center">Back</button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 3: PROFILE POLISH */}
                {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col lg:flex-row gap-12">
                        <div className="flex-1 space-y-8">
                            <h2 className="font-serif text-4xl text-espresso">Perfect your pitch.</h2>
                            <div>
                                <label className="block text-[10px] font-bold text-taupe uppercase tracking-widest mb-4">Owner Photo</label>
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 rounded-full bg-taupe/10 border-2 border-dashed border-taupe/30 flex items-center justify-center overflow-hidden">
                                        {formData.headshot ? <img src={formData.headshot} className="w-full h-full object-cover" /> : <Upload className="h-6 w-6 text-taupe" />}
                                    </div>
                                    <button onClick={() => setFormData({...formData, headshot: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'})} className="px-6 py-3 bg-white border border-taupe/20 rounded-xl text-xs font-bold text-espresso uppercase tracking-widest hover:border-terracotta">Upload Headshot</button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-taupe uppercase tracking-widest mb-2">Primary Master Trade</label>
                                <select 
                                    value={formData.trade}
                                    onChange={(e) => setFormData({...formData, trade: e.target.value})}
                                    className="w-full px-6 py-4 bg-white border border-taupe/10 rounded-2xl outline-none focus:border-terracotta transition-all text-espresso font-bold"
                                >
                                    <option value="">Select Specialty...</option>
                                    <option>Master Plumber</option>
                                    <option>Certified Electrician</option>
                                    <option>General Contractor</option>
                                    <option>HVAC Specialist</option>
                                </select>
                            </div>
                            <button onClick={nextStep} disabled={!formData.trade} className="w-full py-5 bg-terracotta text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-lg disabled:opacity-30">Finish Application</button>
                        </div>

                        {/* Live Preview Card */}
                        <div className="hidden lg:block w-72 pt-12">
                            <span className="text-[10px] font-bold text-taupe uppercase tracking-widest mb-4 block text-center">Live Preview</span>
                            <div className="bg-white rounded-3xl shadow-soft border border-taupe/10 overflow-hidden transform scale-90 opacity-80">
                                <div className="aspect-[4/3] bg-taupe/10 relative">
                                    {formData.headshot && <img src={formData.headshot} className="w-full h-full object-cover" />}
                                    <div className="absolute top-2 left-2 bg-white/95 px-2 py-1 rounded-full border border-emerald-100">
                                        <span className="text-[8px] font-bold text-emerald-600 uppercase">Verified</span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between mb-1">
                                        <h4 className="font-bold text-espresso text-xs truncate">{formData.businessName || 'Business Name'}</h4>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-2 w-2 text-terracotta fill-current" />
                                            <span className="text-[10px] font-bold">5.0</span>
                                        </div>
                                    </div>
                                    <p className="text-[8px] font-bold text-terracotta uppercase mb-2">{formData.trade || 'Specialty'}</p>
                                    <div className="flex items-center text-taupe/60 text-[8px]">
                                        <MapPin className="h-2 w-2 mr-1" /> Austin, TX
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* STEP 4: SUCCESS */}
                {step === 4 && (
                    <motion.div key="step4" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 bg-sage/10 rounded-full flex items-center justify-center mb-8 relative">
                            <motion.div 
                              initial={{ scale: 0 }} 
                              animate={{ scale: [1, 1.2, 1] }} 
                              transition={{ repeat: Infinity, duration: 2 }}
                              className="absolute inset-0 bg-sage/20 rounded-full"
                            />
                            <CheckCircle className="h-12 w-12 text-sage relative z-10" />
                        </div>
                        <h2 className="font-serif text-5xl text-espresso mb-4 tracking-tight">Welcome, Partner.</h2>
                        <p className="text-taupe mb-10 max-w-sm font-light">Your master profile is now live. We're matching you with high-intent homeowners right now.</p>
                        
                        <div className="flex flex-col gap-4 w-full max-w-xs">
                            <button onClick={handleComplete} className="w-full py-5 bg-espresso text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl hover:bg-espresso/90 flex items-center justify-center gap-2 group">
                                Go to Lead Desk
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
