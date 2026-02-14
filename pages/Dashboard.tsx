
import React, { useState } from 'react';
import { ShieldCheck, Eye, MessageSquare, Star, FileText, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import { Pro, UserRole, DashboardViewState, Lead } from '../types';
import { VerificationModal } from '../components/VerificationModal';
import { DashboardLayout } from '../components/DashboardLayout';
import { DashboardInbox } from './DashboardInbox';
import { DashboardProfile } from './DashboardProfile';
import { MOCK_THREADS } from '../data';
import { motion } from 'framer-motion';

interface DashboardProps {
  pro: Pro;
  userRole: 'pro' | 'guest';
  onLogin: () => void;
  onVerificationSubmit: (proId: string, details: any) => void;
  leads: Lead[];
  onUnlockLead: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ pro, userRole, onLogin, onVerificationSubmit, leads, onUnlockLead }) => {
  const [dashboardView, setDashboardView] = useState<DashboardViewState>('overview');
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');

  if (userRole === 'guest') {
    return (
        <div className="min-h-screen bg-paper flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white max-w-md w-full rounded-3xl shadow-soft border border-taupe/10 p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-terracotta to-espresso"></div>
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-terracotta/10 text-terracotta mb-4">
                        <Lock className="h-8 w-8" />
                    </div>
                    <h2 className="font-serif text-3xl font-bold text-espresso mb-2">Pro Portal</h2>
                    <p className="text-taupe text-sm">Access your business tools, manage leads, and verify your license.</p>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-espresso mb-2">Email Address</label>
                        <input type="email" required placeholder="pro@example.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full px-4 py-3 bg-paper border border-taupe/10 rounded-xl outline-none" />
                    </div>
                    <div>
                         <label className="block text-xs font-bold uppercase tracking-widest text-espresso mb-2">Password</label>
                        <input type="password" required placeholder="••••••••" className="w-full px-4 py-3 bg-paper border border-taupe/10 rounded-xl outline-none" />
                    </div>
                    <button type="submit" className="w-full bg-espresso text-white py-4 rounded-xl font-bold uppercase tracking-wide shadow-lg hover:bg-espresso/90 flex items-center justify-center gap-2 group">
                        Sign In <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>
            </motion.div>
        </div>
    );
  }

  const renderContent = () => {
      switch (dashboardView) {
          case 'inbox':
              return <DashboardInbox threads={MOCK_THREADS} leads={leads} onUnlockLead={onUnlockLead} />;
          case 'profile':
              return <DashboardProfile pro={pro} />;
          case 'credentials':
               return <OverviewContent />; 
          default:
              return <OverviewContent />;
      }
  };

  const OverviewContent = () => (
    <div className="p-6 lg:p-12 max-w-[1600px] mx-auto">
        <div className="flex justify-between items-end mb-10">
            <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-espresso mb-2">Welcome back, {pro.name.split(' ')[0]}</h1>
                <p className="text-taupe">Manage your portfolio, analytics, and credentials.</p>
            </div>
            <div className="hidden md:block">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium border border-taupe/10 shadow-sm">
                    Status: <span className="text-green-500 font-bold">Active</span>
                </span>
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-3xl shadow-soft border border-taupe/5 hover:border-terracotta/20 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3 mb-2 text-taupe group-hover:text-terracotta transition-colors">
                            <Eye className="h-5 w-5" />
                            <span className="text-xs font-bold uppercase tracking-widest">Portfolio Views</span>
                        </div>
                        <p className="text-3xl font-serif font-bold text-espresso">1,248</p>
                        <span className="text-xs text-green-600 font-medium">+12% this week</span>
                    </div>
                    <div onClick={() => setDashboardView('inbox')} className="bg-white p-6 rounded-3xl shadow-soft border border-taupe/5 hover:border-terracotta/20 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3 mb-2 text-taupe group-hover:text-terracotta transition-colors">
                            <MessageSquare className="h-5 w-5" />
                            <span className="text-xs font-bold uppercase tracking-widest">Leads</span>
                        </div>
                        <p className="text-3xl font-serif font-bold text-espresso">{leads.length + 24}</p>
                        <span className="text-xs text-green-600 font-medium">{leads.filter(l => l.status === 'LOCKED').length} new available</span>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-soft border border-taupe/5 hover:border-terracotta/20 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3 mb-2 text-taupe group-hover:text-terracotta transition-colors">
                            <Star className="h-5 w-5" />
                            <span className="text-xs font-bold uppercase tracking-widest">Rating</span>
                        </div>
                        <p className="text-3xl font-serif font-bold text-espresso">{pro.rating}</p>
                        <span className="text-xs text-taupe font-medium">Based on {pro.reviewCount} reviews</span>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-soft border border-taupe/5">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="font-serif text-2xl font-bold text-espresso">Credential Vault</h2>
                    </div>
                    <div className="space-y-6">
                        <div className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${pro.licenseStatus === 'verified' ? 'bg-sage/5 border-sage/20' : 'bg-paper border-taupe/10'}`}>
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${pro.licenseStatus === 'verified' ? 'bg-sage/10 text-sage' : 'bg-taupe/10 text-taupe'}`}>
                                    <FileText className="h-6 w-6" />
                                </div>
                                <div><h4 className="font-bold text-espresso">State License</h4><p className="text-sm text-taupe">Required for badges</p></div>
                            </div>
                            <div>
                                {pro.licenseStatus === 'verified' ? (
                                    <div className="text-right">
                                        <span className="text-xs font-bold text-sage block uppercase tracking-wide">Verified</span>
                                        <span className="text-[10px] text-taupe">{pro.licenseDetails?.number}</span>
                                    </div>
                                ) : (
                                    <button onClick={() => setIsVerifyModalOpen(true)} className="px-4 py-2 bg-espresso text-white text-sm font-medium rounded-xl hover:bg-terracotta shadow-lg uppercase tracking-widest">Verify</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-6">
                <div className="bg-terracotta text-white p-8 rounded-3xl shadow-glow relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="font-serif text-xl font-bold mb-2">Boost Your Reach</h3>
                        <p className="text-white/80 text-sm mb-6">Verified pros get 3x more leads.</p>
                        <button className="bg-white text-terracotta px-6 py-3 rounded-xl font-bold text-sm w-full uppercase tracking-widest">View Tips</button>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-soft border border-taupe/5">
                    <h3 className="font-serif text-lg font-bold text-espresso mb-4">New Lead Inquiries</h3>
                    <div className="space-y-4">
                        {leads.map(lead => (
                            <div key={lead.id} onClick={() => setDashboardView('inbox')} className="flex gap-3 pb-3 border-b border-taupe/5 last:border-0 cursor-pointer p-2 hover:bg-paper rounded-xl">
                                <div className="w-10 h-10 rounded-full bg-paper flex items-center justify-center text-taupe"><Lock className="h-4 w-4" /></div>
                                <div>
                                    <p className="text-sm font-bold text-espresso">Locked Lead</p>
                                    <p className="text-xs text-taupe line-clamp-1 italic">Click to unlock project details</p>
                                    <span className="text-[10px] text-taupe/60">{lead.timestamp}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <DashboardLayout activeView={dashboardView} onViewChange={setDashboardView} pro={pro}>
        {renderContent()}
        <VerificationModal isOpen={isVerifyModalOpen} onClose={() => setIsVerifyModalOpen(false)} onSubmit={(details) => onVerificationSubmit(pro.id, details)} />
    </DashboardLayout>
  );
};
