import React, { useState } from 'react';
import { X, CheckCircle, Mail, Phone, Lock } from 'lucide-react';
import { Pro } from '../types';

interface ClaimModalProps {
  pro: Pro;
  isOpen: boolean;
  onClose: () => void;
  onClaim: () => void;
}

export const ClaimModal: React.FC<ClaimModalProps> = ({ pro, isOpen, onClose, onClaim }) => {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState<'email' | 'phone'>('email');

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 3) {
      onClaim();
      onClose();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity backdrop-blur-sm" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="w-full">
                <div className="flex justify-between items-center mb-5">
                   <h3 className="text-lg leading-6 font-bold text-slate-900" id="modal-title">
                    Claim {pro.businessName}
                  </h3>
                  <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
                  <div 
                    className="bg-brand-green h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(step / 3) * 100}%` }}
                  ></div>
                </div>

                {step === 1 && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <p className="text-sm text-blue-800">
                        Verify your identity to unlock business tools, respond to reviews, and update your information.
                      </p>
                    </div>
                    
                    <p className="text-sm font-medium text-slate-700">How would you like to verify?</p>
                    
                    <div 
                      onClick={() => setMethod('email')}
                      className={`cursor-pointer p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${method === 'email' ? 'border-brand-blue bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className={`p-2 rounded-full ${method === 'email' ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <Mail className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">Email Verification</p>
                        <p className="text-xs text-slate-500">We'll send a code to {pro.email}</p>
                      </div>
                      {method === 'email' && <CheckCircle className="h-5 w-5 text-brand-blue" />}
                    </div>

                    <div 
                      onClick={() => setMethod('phone')}
                      className={`cursor-pointer p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${method === 'phone' ? 'border-brand-blue bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className={`p-2 rounded-full ${method === 'phone' ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <Phone className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">Phone Call / SMS</p>
                        <p className="text-xs text-slate-500">We'll call {pro.phone}</p>
                      </div>
                      {method === 'phone' && <CheckCircle className="h-5 w-5 text-brand-blue" />}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="text-center py-6">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                      <Lock className="h-8 w-8 text-brand-blue" />
                    </div>
                    <h4 className="text-lg font-medium text-slate-900 mb-2">Enter Verification Code</h4>
                    <p className="text-sm text-slate-500 mb-6">
                      We sent a 6-digit code to your {method}.
                    </p>
                    <div className="flex justify-center gap-2 mb-4">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <input 
                          key={i} 
                          type="text" 
                          maxLength={1} 
                          className="w-10 h-12 border border-gray-300 rounded-lg text-center text-xl font-bold focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
                        />
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 cursor-pointer hover:text-brand-blue">Resend Code</p>
                  </div>
                )}

                {step === 3 && (
                  <div className="text-center py-6">
                     <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="text-lg font-medium text-slate-900 mb-2">Verification Successful!</h4>
                    <p className="text-sm text-slate-500">
                      You are now the owner of this profile. Redirecting to your dashboard...
                    </p>
                  </div>
                )}

              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-brand-blue text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleNext}
            >
              {step === 3 ? 'Finish' : 'Continue'}
            </button>
            <button 
              type="button" 
              className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};