
import React from 'react';
import { Pro, Lead } from '../types';
import { ProCard } from '../components/ProCard';
import { Sparkles, Calendar, MessageSquare, ChevronRight, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface HomeownerDashboardProps {
  savedPros: Pro[];
  leads: Lead[];
  onSelectPro: (pro: Pro) => void;
}

export const HomeownerDashboard: React.FC<HomeownerDashboardProps> = ({ savedPros, leads, onSelectPro }) => {
  return (
    <div className="min-h-screen bg-paper pb-20">
      <div className="bg-espresso text-paper py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full border-2 border-terracotta p-1">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-full h-full rounded-full object-cover" />
              </div>
              <div>
                <h1 className="font-serif text-4xl font-bold mb-2 tracking-tight">Welcome home, Sarah.</h1>
                <p className="text-white/60 font-light">You have 2 active project inquiries being verified by our concierge.</p>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Project Tracker */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-2xl font-bold text-espresso">Project Tracker</h2>
                <button className="text-xs font-bold uppercase tracking-widest text-terracotta hover:underline">View History</button>
              </div>
              
              <div className="space-y-4">
                {leads.length > 0 ? (
                  leads.map(lead => (
                    <div key={lead.id} className="bg-white p-6 rounded-3xl shadow-soft border border-taupe/5 flex items-center justify-between group hover:border-terracotta/20 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-paper flex items-center justify-center text-terracotta">
                          <Sparkles className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-espresso">{lead.serviceType}</h4>
                          <p className="text-xs text-taupe">{lead.timestamp} • Austin, TX</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col items-end">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-taupe mb-1">Status</span>
                          <span className="px-3 py-1 bg-terracotta/10 text-terracotta rounded-full text-[10px] font-bold uppercase tracking-wide">
                            Matching Specialist
                          </span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-taupe group-hover:text-terracotta group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white/50 border border-dashed border-taupe/20 p-12 rounded-3xl text-center">
                    <p className="text-taupe italic">No active projects. Search the guide to start a request.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Saved Pros */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-2xl font-bold text-espresso">Your Curated Specialists</h2>
                <span className="text-xs text-taupe font-medium">{savedPros.length} Pros Saved</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {savedPros.length > 0 ? (
                  savedPros.map(pro => (
                    <div key={pro.id} className="h-[460px]">
                      <ProCard 
                        pro={pro} 
                        onClick={onSelectPro} 
                        isSaved={true}
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 py-20 text-center">
                     <p className="text-taupe italic">You haven't saved any professionals yet.</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-3xl shadow-soft border border-taupe/5 sticky top-32 space-y-8">
               <div>
                  <h3 className="font-serif text-xl font-bold text-espresso mb-4">Sarah Jenkins</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-taupe">
                      <MessageSquare className="h-4 w-4" /> 2 Active Inquiries
                    </div>
                    <div className="flex items-center gap-3 text-sm text-taupe">
                      <Sparkles className="h-4 w-4" /> Gold Tier Member
                    </div>
                  </div>
               </div>

               <div className="p-6 bg-terracotta/5 rounded-2xl border border-terracotta/10">
                  <h4 className="font-bold text-terracotta text-sm mb-2 uppercase tracking-wide">Concierge Tip</h4>
                  <p className="text-xs text-taupe leading-relaxed italic">
                    "Projects with detailed descriptions get 50% faster responses from our master specialists."
                  </p>
               </div>

               <button className="w-full py-3 bg-espresso text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-espresso/90 transition-all">
                  Account Settings
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
