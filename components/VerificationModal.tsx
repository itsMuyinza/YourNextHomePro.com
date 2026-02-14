import React, { useState } from 'react';
import { X, Upload, CheckCircle, Shield, FileText, Loader2 } from 'lucide-react';
import { Pro } from '../types';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: any) => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    licenseNumber: '',
    state: '',
    licenseType: '',
    expiryDate: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
      onSubmit(formData);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        
        <div 
          className="fixed inset-0 bg-espresso/60 transition-opacity backdrop-blur-sm" 
          onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-middle bg-paper rounded-[32px] text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:max-w-lg w-full border border-white/50">
          
          <div className="px-6 py-6 sm:px-8 sm:py-8">
            <div className="flex justify-between items-center mb-8">
               <div>
                  <h3 className="text-2xl font-serif font-bold text-espresso">
                    Pro Verification
                  </h3>
                  <p className="text-taupe text-sm mt-1">Get the Verified Badge and build trust.</p>
               </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-taupe/10 transition-colors">
                <X className="h-5 w-5 text-espresso" />
              </button>
            </div>

            {/* Steps Visual */}
            <div className="flex items-center gap-2 mb-8">
                <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-terracotta' : 'bg-taupe/10'}`}></div>
                <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-terracotta' : 'bg-taupe/10'}`}></div>
                <div className={`h-1 flex-1 rounded-full ${step >= 3 ? 'bg-terracotta' : 'bg-taupe/10'}`}></div>
            </div>

            {step === 1 && (
              <form onSubmit={() => setStep(2)}>
                <div className="space-y-5">
                   <div className="bg-white p-4 rounded-xl border border-taupe/10 flex gap-4">
                      <div className="bg-blue-50 p-2 rounded-lg h-fit">
                        <Shield className="h-6 w-6 text-terracotta" />
                      </div>
                      <div>
                        <h4 className="font-bold text-espresso text-sm">Why Verify?</h4>
                        <p className="text-xs text-taupe mt-1 leading-relaxed">
                          Verified pros get 3x more leads. We check state databases to confirm your active status.
                        </p>
                      </div>
                   </div>

                   <div>
                     <label className="block text-sm font-medium text-espresso mb-2">License Number</label>
                     <input 
                        required
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-taupe/20 rounded-xl focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none transition-all"
                        placeholder="e.g. 12345678"
                     />
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-espresso mb-2">State</label>
                        <select 
                          required
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-taupe/20 rounded-xl focus:ring-2 focus:ring-terracotta outline-none"
                        >
                          <option value="">Select</option>
                          <option value="TX">Texas</option>
                          <option value="CA">California</option>
                          <option value="NY">New York</option>
                        </select>
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-espresso mb-2">Type</label>
                        <input 
                          required
                          name="licenseType"
                          value={formData.licenseType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-taupe/20 rounded-xl focus:ring-2 focus:ring-terracotta outline-none"
                          placeholder="e.g. Electrical"
                        />
                     </div>
                   </div>
                </div>
                
                <button 
                  type="submit"
                  className="w-full mt-8 bg-espresso text-white py-3.5 rounded-xl font-medium hover:bg-espresso/90 transition-colors shadow-lg shadow-espresso/20"
                >
                  Continue
                </button>
              </form>
            )}

            {step === 2 && (
               <div className="text-center">
                  <div className="border-2 border-dashed border-taupe/20 rounded-2xl p-10 mb-6 bg-white hover:bg-gray-50 transition-colors cursor-pointer group">
                     <div className="bg-taupe/5 p-4 rounded-full inline-block mb-4 group-hover:bg-terracotta/10 transition-colors">
                        <Upload className="h-8 w-8 text-taupe group-hover:text-terracotta" />
                     </div>
                     <h4 className="font-bold text-espresso">Upload License Document</h4>
                     <p className="text-sm text-taupe mt-2">PDF, JPG or PNG (Max 5MB)</p>
                     <p className="text-xs text-taupe/60 mt-4">We encrypt your data securely.</p>
                  </div>

                  {isLoading ? (
                    <button disabled className="w-full bg-taupe/20 text-taupe py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 cursor-wait">
                      <Loader2 className="h-5 w-5 animate-spin" /> Verifying...
                    </button>
                  ) : (
                    <button 
                      onClick={handleSubmit}
                      className="w-full bg-terracotta text-white py-3.5 rounded-xl font-medium hover:bg-terracotta-dark transition-colors shadow-lg shadow-terracotta/20"
                    >
                      Submit for Verification
                    </button>
                  )}
                  
                  <button onClick={() => setStep(1)} className="mt-4 text-sm text-taupe hover:text-espresso">
                    Back
                  </button>
               </div>
            )}

            {step === 3 && (
               <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-espresso mb-2">Submission Received</h4>
                  <p className="text-taupe mb-8 max-w-xs mx-auto">
                    We are reviewing your license. Your status is now "Pending" and will be updated within 24 hours.
                  </p>
                  <button 
                    onClick={onClose}
                    className="w-full bg-espresso text-white py-3.5 rounded-xl font-medium shadow-lg"
                  >
                    Return to Profile
                  </button>
               </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};