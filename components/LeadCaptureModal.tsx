

import React, { useState, useEffect } from 'react';
import { X, MessageSquare, ArrowRight, CheckCircle, ShieldCheck, Loader2, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  proName: string;
  proId: string;
  onSubmit: (leadData: any) => void;
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ isOpen, onClose, proName, proId, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    serviceType: '',
    urgency: '',
    budget: '',
    details: '',
  });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsSubmitting(false);
      setFormData({ serviceType: '', urgency: '', budget: '', details: '' });
    }
  }, [isOpen]);

  const handleNext = () => setStep((prev) => prev + 1);
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate concierge processing
    setTimeout(() => {
      const newLead = {
        id: `lead_${Date.now()}`,
        proId,
        proName,
        homeownerName: "Sarah Jenkins",
        homeownerEmail: "sarah.j@example.com",
        homeownerPhone: "(512) 555-9876",
        serviceType: formData.serviceType,
        urgency: formData.urgency,
        message: formData.details,
        status: 'LOCKED',
        timestamp: "Just now",
        value: 25.00,
        location: 'Austin, TX',
        timing: formData.urgency
      };
      
      onSubmit(newLead);
      setIsSubmitting(false);
      setStep(5);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-espresso/60 backdrop-blur-md"
      />

      <motion.div 
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-lg bg-paper rounded-t-[40px] sm:rounded-[40px] shadow-2xl overflow-hidden border border-white/50"
      >
        {/* Header */}
        <div className="bg-white px-8 py-6 border-b border-taupe/10 flex justify-between items-center">
          <div>
            <h3 className="font-serif text-2xl font-bold text-espresso">Contact {proName}</h3>
            <div className="flex items-center gap-1.5 mt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sage" />
              <span className="text-[10px] text-taupe font-bold uppercase tracking-wider">Verified Pro • Typical Reply: 10m</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-taupe/10 rounded-full transition-colors">
            <X className="w-5 h-5 text-taupe" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 min-h-[380px] flex flex-col">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Service Type */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                <h4 className="text-xl font-serif font-bold text-espresso mb-6">What can {proName} help you with?</h4>
                <div className="grid grid-cols-1 gap-3">
                  {['New Installation / Project', 'Repair or Fix', 'Maintenance / Service', 'Consultation / Quote'].map((option) => (
                    <button
                      key={option}
                      onClick={() => { setFormData({...formData, serviceType: option}); handleNext(); }}
                      className="flex items-center justify-between p-5 bg-white border border-taupe/10 rounded-2xl hover:border-terracotta/50 hover:shadow-md transition-all text-left group"
                    >
                      <span className="text-espresso font-medium">{option}</span>
                      <ArrowRight className="w-4 h-4 text-taupe group-hover:text-terracotta group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Timeline */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                <h4 className="text-xl font-serif font-bold text-espresso mb-6">When do you need this done?</h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { label: 'Emergency (Asap)', icon: '🚨' },
                    { label: 'Within 48 Hours', icon: '⚡' },
                    { label: 'Next 2 Weeks', icon: '📅' },
                    { label: 'Flexible / Planning', icon: '💡' }
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => { setFormData({...formData, urgency: item.label}); handleNext(); }}
                      className="flex items-center gap-4 p-5 bg-white border border-taupe/10 rounded-2xl hover:border-terracotta/50 hover:shadow-md transition-all text-left"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-espresso font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Budget (New) */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                <h4 className="text-xl font-serif font-bold text-espresso mb-6">Estimated Budget</h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { label: 'Under $500', sub: 'Minor repairs' },
                    { label: '$500 - $2,000', sub: 'Standard projects' },
                    { label: '$2,000 - $10,000', sub: 'Major renovations' },
                    { label: '$10,000+', sub: 'Full scale remodel' }
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => { setFormData({...formData, budget: item.label}); handleNext(); }}
                      className="flex items-center justify-between p-5 bg-white border border-taupe/10 rounded-2xl hover:border-terracotta/50 hover:shadow-md transition-all text-left group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-paper flex items-center justify-center text-terracotta">
                            <DollarSign className="h-5 w-5" />
                        </div>
                        <div>
                            <span className="block text-espresso font-bold">{item.label}</span>
                            <span className="text-xs text-taupe">{item.sub}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-taupe group-hover:text-terracotta group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
                <button onClick={handleNext} className="mt-6 w-full py-4 text-sm font-bold text-taupe hover:text-espresso underline">Skip for now</button>
              </motion.div>
            )}

            {/* Step 4: Details */}
            {step === 4 && !isSubmitting && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
                <h4 className="text-xl font-serif font-bold text-espresso mb-2">Project Details</h4>
                <p className="text-sm text-taupe mb-6 font-light">Describe the issue or project scope for our concierge to verify.</p>
                
                <textarea
                  className="w-full flex-1 p-5 bg-white border border-taupe/20 rounded-2xl focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none resize-none text-espresso placeholder:text-taupe/30 text-lg leading-relaxed shadow-inner"
                  placeholder="Hi, I need help with..."
                  rows={4}
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                />

                <div className="mt-8">
                  <button
                    onClick={handleSubmit}
                    disabled={!formData.details}
                    className="w-full py-4 bg-terracotta text-white font-bold rounded-2xl shadow-lg shadow-terracotta/30 hover:bg-terracotta-dark active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Request Quote From Specialist
                  </button>
                </div>
              </motion.div>
            )}

            {isSubmitting && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center py-10">
                <div className="relative mb-8">
                  <Loader2 className="h-16 w-16 text-terracotta animate-spin" />
                  <ShieldCheck className="absolute inset-0 m-auto w-6 h-6 text-terracotta" />
                </div>
                <h4 className="text-2xl font-serif font-bold text-espresso mb-3">Verifying Availability...</h4>
                <p className="text-taupe font-light italic max-w-xs mx-auto">
                  Our concierge engine is connecting your project details with {proName}.
                </p>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="success" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center py-8">
                <div className="w-20 h-20 bg-sage/10 text-sage rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-espresso mb-3">Request Received!</h3>
                <p className="text-taupe font-light max-w-xs mx-auto mb-10 leading-relaxed">
                  We have successfully notified {proName}. They will review your project scope and respond shortly.
                </p>
                <button onClick={onClose} className="px-12 py-4 bg-espresso text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-espresso/90 transition-all shadow-lg">
                  Return to Guide
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};