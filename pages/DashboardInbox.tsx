
import React, { useState } from 'react';
import { Thread, Lead } from '../types';
import { Search, Clock, Lock, Unlock, MapPin, Phone, Mail, User } from 'lucide-react';

interface DashboardInboxProps {
  threads: Thread[];
  leads: Lead[];
  onUnlockLead: (id: string) => void;
}

export const DashboardInbox: React.FC<DashboardInboxProps> = ({ threads, leads, onUnlockLead }) => {
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(leads[0]?.id || null);
  const activeLead = leads.find(l => l.id === selectedLeadId);

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col md:flex-row bg-white">
        
        {/* Thread/Lead List */}
        <div className="w-full md:w-80 lg:w-96 border-r border-taupe/10 flex flex-col">
            <div className="p-4 border-b border-taupe/10">
                <h2 className="font-serif text-xl font-bold text-espresso mb-4">Lead Desk</h2>
                <div className="relative">
                    <Search className="h-4 w-4 text-taupe absolute left-3 top-3" />
                    <input type="text" placeholder="Search inquiries..." className="w-full pl-10 pr-4 py-2 bg-paper rounded-xl text-sm outline-none" />
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
                {leads.length > 0 ? leads.map(lead => (
                    <div 
                        key={lead.id}
                        onClick={() => setSelectedLeadId(lead.id)}
                        className={`p-4 border-b border-taupe/5 cursor-pointer transition-colors hover:bg-gray-50 ${selectedLeadId === lead.id ? 'bg-terracotta/5 border-l-4 border-l-terracotta' : 'border-l-4 border-l-transparent'}`}
                    >
                        <div className="flex justify-between items-start mb-1">
                            <h4 className={`text-sm font-bold ${lead.status === 'LOCKED' ? 'text-taupe' : 'text-espresso'}`}>
                                {lead.status === 'LOCKED' ? '•••••••• ••••••••' : lead.homeownerName}
                            </h4>
                            <span className="text-[10px] text-taupe/60">{lead.timestamp}</span>
                        </div>
                        <p className="text-xs text-terracotta font-bold uppercase tracking-widest mb-1">{lead.serviceType}</p>
                        <div className="flex items-center gap-1.5">
                          {lead.status === 'LOCKED' ? <Lock className="h-3 w-3 text-taupe/40" /> : <Unlock className="h-3 w-3 text-sage" />}
                          <p className="text-xs text-taupe line-clamp-1 italic">
                            {lead.status === 'LOCKED' ? 'Inquiry is blurred until unlocked' : lead.message}
                          </p>
                        </div>
                    </div>
                )) : (
                    <div className="p-12 text-center text-taupe italic text-sm">
                        No active leads yet.
                    </div>
                )}
            </div>
        </div>

        {/* Lead Details Area */}
        <div className="flex-1 flex flex-col bg-paper relative overflow-hidden">
            {activeLead ? (
                <>
                    {/* Header */}
                    <div className="h-20 border-b border-taupe/10 bg-white flex items-center justify-between px-8">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-paper flex items-center justify-center text-taupe">
                              <User className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-espresso text-base">
                                  {activeLead.status === 'LOCKED' ? 'Verified Homeowner' : activeLead.homeownerName}
                                </h3>
                                <div className="flex items-center gap-3 text-[10px] text-taupe font-bold uppercase tracking-widest">
                                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {activeLead.location}</span>
                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {activeLead.timing}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-8 overflow-y-auto">
                        <div className={`max-w-2xl mx-auto space-y-8 transition-all duration-500 ${activeLead.status === 'LOCKED' ? 'blur-sm select-none grayscale opacity-40' : ''}`}>
                            <div className="bg-white p-8 rounded-[32px] shadow-soft border border-taupe/5">
                                <h4 className="text-xs font-bold text-taupe uppercase tracking-widest mb-4">Project Inquiry Message</h4>
                                <p className="text-lg font-serif text-espresso leading-relaxed italic">
                                  "{activeLead.message}"
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div className="bg-white p-6 rounded-2xl border border-taupe/5">
                                  <label className="block text-[10px] font-bold text-taupe uppercase tracking-widest mb-2">Direct Phone</label>
                                  <p className="font-bold text-espresso flex items-center gap-2 truncate">
                                    <Phone className="h-4 w-4 text-terracotta" /> {activeLead.homeownerPhone}
                                  </p>
                               </div>
                               <div className="bg-white p-6 rounded-2xl border border-taupe/5">
                                  <label className="block text-[10px] font-bold text-taupe uppercase tracking-widest mb-2">Direct Email</label>
                                  <p className="font-bold text-espresso flex items-center gap-2 truncate">
                                    <Mail className="h-4 w-4 text-terracotta" /> {activeLead.homeownerEmail}
                                  </p>
                               </div>
                            </div>
                        </div>

                        {/* Lock Overlay */}
                        {activeLead.status === 'LOCKED' && (
                          <div className="absolute inset-0 flex items-center justify-center z-20">
                              <div className="bg-white/90 backdrop-blur-xl p-10 rounded-[40px] shadow-2xl border border-white text-center max-w-sm mx-4">
                                  <div className="w-16 h-16 bg-terracotta/10 text-terracotta rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Lock className="h-8 w-8" />
                                  </div>
                                  <h4 className="font-serif text-2xl font-bold text-espresso mb-2">Exclusive High-Intent Lead</h4>
                                  <p className="text-taupe text-sm mb-8 leading-relaxed">
                                    This homeowner is specifically requesting your services. Unlock to view contact details and respond.
                                  </p>
                                  <button 
                                    onClick={() => onUnlockLead(activeLead.id)}
                                    className="w-full bg-terracotta text-white py-4 rounded-2xl font-bold shadow-lg shadow-terracotta/30 hover:bg-terracotta-dark transition-all uppercase tracking-widest text-xs"
                                  >
                                    Unlock Lead ($25)
                                  </button>
                                  <p className="text-[10px] text-taupe/60 mt-4 uppercase tracking-widest">Charged to balance</p>
                              </div>
                          </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="flex-1 flex items-center justify-center text-taupe italic font-light">
                    Select a lead from the desk to review project details.
                </div>
            )}
        </div>
    </div>
  );
};
