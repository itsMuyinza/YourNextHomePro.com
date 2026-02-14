
import React, { useState, useEffect } from 'react';
import { Navbar, Footer } from './components/Layout';
import { Hero } from './components/Hero';
import { ProCard } from './components/ProCard';
import { SearchResults } from './pages/SearchResults';
import { ProProfile } from './pages/ProProfile';
import { Dashboard } from './pages/Dashboard';
import { HomeownerDashboard } from './pages/HomeownerDashboard';
import { HomeownerLanding } from './pages/HomeownerLanding';
import { ProLanding } from './pages/ProLanding';
import { AffiliateProgram } from './pages/AffiliateProgram';
import { Blog } from './pages/Blog';
import { AIChatbot } from './components/AIChatbot';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { ProOnboardingWizard } from './components/ProOnboardingWizard';
import { MOCK_PROS } from './data';
import { Pro, ViewState, UserRole, Lead } from './types';
import { AnimatePresence, motion } from 'framer-motion';
import { searchWithGemini } from './utils/geminiSearch';

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [userRole, setUserRole] = useState<UserRole>('GUEST');
  const [selectedProId, setSelectedProId] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isThinking, setIsThinking] = useState(false);
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [savedPros, setSavedPros] = useState<string[]>([]);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [activeLeadPro, setActiveLeadPro] = useState<Pro | null>(null);

  const [isProWizardOpen, setIsProWizardOpen] = useState(false);

  const [pros] = useState<Pro[]>(MOCK_PROS);
  const [filteredPros, setFilteredPros] = useState<Pro[]>(MOCK_PROS);
  const [currentUser] = useState<Pro>(MOCK_PROS[0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, selectedProId]);

  useEffect(() => {
    // Only run standard filter if NOT in a special search mode or empty
    if (!isThinking) {
        let result = pros;
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            result = result.filter(p => 
                p.service.toLowerCase().includes(lowerTerm) || 
                p.businessName.toLowerCase().includes(lowerTerm) ||
                p.tags.some(t => t.toLowerCase().includes(lowerTerm)) ||
                // Keep results if they have a matchReason from Concierge search
                (p.matchReason && p.matchReason.length > 0)
            );
        }
        if (searchLocation) {
            const lowerLoc = searchLocation.toLowerCase();
            result = result.filter(p => p.location.toLowerCase().includes(lowerLoc));
        }
        setFilteredPros(result);
    }
  }, [searchTerm, searchLocation, activeCategory, pros, isThinking]);

  const handleSearch = (term: string, location: string) => {
    // Clear any previous AI matches when doing standard search
    const resetPros = pros.map(p => ({...p, matchReason: undefined}));
    
    setSearchTerm(term);
    setSearchLocation(location);
    setActiveCategory('all');
    setView('search');
  };

  const handleConciergeSearch = async (query: string) => {
    setIsThinking(true);
    try {
      // Use the utility to score and sort pros
      const rankedPros = await searchWithGemini(query, pros);
      setFilteredPros(rankedPros);
      setSearchTerm(query); // Set term to show in search bar
      setView('search');
    } finally {
      setIsThinking(false);
    }
  };

  const handleProSelect = (pro: Pro) => {
    setSelectedProId(pro.id);
    setView('profile');
  };

  const handleNavigate = (targetView: ViewState) => {
    if (targetView === 'home') {
        setSearchTerm('');
        setSearchLocation('');
        setActiveCategory('all');
        // Clear AI matches on home nav
        setFilteredPros(pros.map(p => ({...p, matchReason: undefined})));
    }
    setView(targetView);
  };

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    if (role === 'HOMEOWNER') setView('hub');
    if (role === 'PRO') setView('dashboard');
    if (role === 'GUEST') setView('home');
  };

  const handleToggleSave = (proId: string) => {
    setSavedPros(prev => 
      prev.includes(proId) ? prev.filter(id => id !== proId) : [...prev, proId]
    );
  };

  const handleInquiry = (pro: Pro) => {
    setActiveLeadPro(pro);
    setIsLeadModalOpen(true);
  };

  const handleLeadSubmit = (leadData: Lead) => {
    setLeads([leadData, ...leads]);
  };

  const handleUnlockLead = (leadId: string) => {
    setLeads(prevLeads => prevLeads.map(l => 
      l.id === leadId ? { ...l, status: 'UNLOCKED' } : l
    ));
  };

  const selectedPro = pros.find(p => p.id === selectedProId);

  return (
    <div className="font-sans text-espresso bg-paper min-h-screen flex flex-col selection:bg-terracotta/20">
      <Navbar onNavigate={handleNavigate} currentPage={view} userRole={userRole} onLogin={handleLogin} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
            {view === 'home' && (
              <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Hero 
                  onSearch={handleSearch} 
                  onConciergeSearch={handleConciergeSearch}
                  isThinking={isThinking}
                />
                <div className="py-24 bg-paper relative">
                    <div className="max-w-[1920px] mx-auto px-4 mb-16 text-center">
                        <span className="text-terracotta font-bold tracking-widest text-xs uppercase mb-3 block">Our Selection</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso">Top-Rated Local Home Professionals</h2>
                    </div>
                    <div className="max-w-[1920px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {filteredPros.slice(0, 3).map((pro) => (
                            <ProCard 
                              key={pro.id}
                              pro={pro} 
                              onClick={handleProSelect} 
                              onToggleSave={handleToggleSave}
                              isSaved={savedPros.includes(pro.id)}
                            />
                        ))}
                    </div>
                    <div className="text-center pb-8">
                        <button onClick={() => handleNavigate('search')} className="group inline-flex items-center gap-2 text-espresso font-medium text-lg border-b-2 border-terracotta pb-1 hover:text-terracotta transition-colors">
                            View Full Collection
                            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>
                </div>
              </motion.div>
            )}

            {view === 'search' && (
              <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <SearchResults 
                    pros={filteredPros} 
                    onSelectPro={handleProSelect} 
                    searchTerm={searchTerm}
                />
              </motion.div>
            )}

            {view === 'homeowner_landing' && (
              <motion.div key="homeowner_landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <HomeownerLanding onJoin={() => handleLogin('HOMEOWNER')} />
              </motion.div>
            )}

            {view === 'pro_landing' && (
              <motion.div key="pro_landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ProLanding onClaimClick={() => setIsProWizardOpen(true)} />
              </motion.div>
            )}

            {view === 'blog' && (
              <motion.div key="blog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Blog />
              </motion.div>
            )}

            {view === 'profile' && selectedPro && (
              <motion.div key="profile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                <ProProfile 
                    pro={selectedPro} 
                    onClaimStatusChange={() => {}}
                    onVerificationSubmit={() => {}}
                    onInquiry={() => handleInquiry(selectedPro)}
                />
              </motion.div>
            )}

            {view === 'hub' && (
              <motion.div key="hub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <HomeownerDashboard 
                  savedPros={pros.filter(p => savedPros.includes(p.id))} 
                  leads={leads}
                  onSelectPro={handleProSelect}
                />
              </motion.div>
            )}

            {view === 'dashboard' && (
                <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Dashboard 
                        pro={currentUser}
                        userRole={userRole === 'PRO' ? 'pro' : 'guest'}
                        onLogin={() => handleLogin('PRO')}
                        onVerificationSubmit={() => {}} 
                        leads={leads}
                        onUnlockLead={handleUnlockLead}
                    />
                </motion.div>
            )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {isLeadModalOpen && activeLeadPro && (
          <LeadCaptureModal 
            isOpen={isLeadModalOpen} 
            onClose={() => setIsLeadModalOpen(false)} 
            onSubmit={handleLeadSubmit}
            proName={activeLeadPro.businessName}
            proId={activeLeadPro.id}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isProWizardOpen && (
          <ProOnboardingWizard 
            isOpen={isProWizardOpen} 
            onClose={() => setIsProWizardOpen(false)} 
            onComplete={() => handleLogin('PRO')} 
          />
        )}
      </AnimatePresence>
      
      {/* Floating AI Concierge */}
      <AIChatbot />
      
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
