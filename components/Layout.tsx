
import React, { useState } from 'react';
import { Menu, X, Home, LayoutDashboard, ArrowRight, Sparkles, User, Briefcase, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserRole, ViewState } from '../types';

interface NavbarProps {
  onNavigate: (view: ViewState) => void;
  currentPage: string;
  userRole: UserRole;
  onLogin: (role: UserRole) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage, userRole, onLogin }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/50 transition-all duration-300">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center cursor-pointer gap-3 group" onClick={() => onNavigate('home')}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-terracotta p-2 rounded-xl shadow-lg">
              <Home className="h-5 w-5 text-paper" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-2xl tracking-tight text-espresso leading-none">YourNextHomePro</span>
              <span className="text-[10px] tracking-widest uppercase text-taupe font-medium mt-0.5">Local Craftsmen & Specialists</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => onNavigate('search')} className={`text-sm font-medium transition-colors tracking-wide ${currentPage === 'search' ? 'text-terracotta font-bold' : 'text-taupe hover:text-espresso'}`}>
              The Guide
            </button>

            <button onClick={() => onNavigate('blog')} className={`text-sm font-medium transition-colors tracking-wide flex items-center gap-2 ${currentPage === 'blog' ? 'text-terracotta font-bold' : 'text-taupe hover:text-espresso'}`}>
              Journal
            </button>
            
            {userRole === 'HOMEOWNER' ? (
              <button onClick={() => onNavigate('hub')} className={`text-sm font-bold transition-colors tracking-widest uppercase flex items-center gap-2 ${currentPage === 'hub' ? 'text-terracotta' : 'text-taupe hover:text-espresso'}`}>
                <Sparkles className="h-4 w-4" /> My Projects
              </button>
            ) : userRole === 'PRO' ? (
              <button onClick={() => onNavigate('dashboard')} className={`text-sm font-bold transition-colors tracking-widest uppercase flex items-center gap-2 ${currentPage === 'dashboard' ? 'text-terracotta' : 'text-taupe hover:text-espresso'}`}>
                <LayoutDashboard className="h-4 w-4" /> Lead Desk
              </button>
            ) : null}

            <div className="h-4 w-px bg-taupe/20"></div>
            
            {userRole === 'GUEST' ? (
              <>
                <button onClick={() => onLogin('HOMEOWNER')} className="text-sm font-medium text-taupe hover:text-espresso flex items-center gap-2 group">
                   <User className="h-4 w-4 group-hover:text-terracotta transition-colors" /> Homeowner Login
                </button>
                <motion.button 
                  onClick={() => onNavigate('pro_landing')} 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.97 }}
                  className="bg-terracotta text-paper px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg shadow-terracotta/20 transition-all"
                >
                  Join as a Pro
                </motion.button>
              </>
            ) : (
              <button onClick={() => onLogin('GUEST')} className="text-xs font-bold text-taupe uppercase tracking-widest hover:text-espresso transition-colors">Sign Out</button>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-taupe hover:text-espresso">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-taupe/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <button onClick={() => { onNavigate('search'); setIsOpen(false); }} className="block w-full text-left font-bold text-espresso py-2">The Guide</button>
              <button onClick={() => { onNavigate('blog'); setIsOpen(false); }} className="block w-full text-left font-bold text-espresso py-2">Journal</button>
              {userRole === 'GUEST' ? (
                <>
                  <button onClick={() => { onLogin('HOMEOWNER'); setIsOpen(false); }} className="block w-full text-left font-bold text-espresso py-2">Homeowner Login</button>
                  <button onClick={() => { onNavigate('pro_landing'); setIsOpen(false); }} className="block w-full text-center bg-terracotta text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs">Join as a Pro</button>
                </>
              ) : (
                <button onClick={() => { onLogin('GUEST'); setIsOpen(false); }} className="block w-full text-left font-bold text-taupe py-2">Sign Out</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

interface FooterProps {
  onNavigate?: (view: ViewState) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-espresso text-paper border-t border-white/5">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-20">
          
          {/* Column 1: Brand */}
          <div className="col-span-1">
             <div className="flex items-center gap-3 mb-6">
              <div className="bg-terracotta p-2 rounded-xl"><Home className="h-5 w-5 text-paper" /></div>
              <span className="font-serif font-bold text-2xl text-paper tracking-tight">YourNextHomePro</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-6">
              Curating the finest local craftsmen for homes that deserve the best. Verified, trusted, and always professional.
            </p>
            <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-terracotta transition-colors"></div>
                <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-terracotta transition-colors"></div>
                <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-terracotta transition-colors"></div>
            </div>
          </div>

          {/* Column 2: Browse by Service */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-terracotta mb-8">Browse by Service</h3>
            <ul className="space-y-4 text-white/60 text-sm font-medium">
              <li><button onClick={() => onNavigate?.('search')} className="hover:text-white transition-colors">Plumbers near me</button></li>
              <li><button onClick={() => onNavigate?.('search')} className="hover:text-white transition-colors">Electricians</button></li>
              <li><button onClick={() => onNavigate?.('search')} className="hover:text-white transition-colors">General Contractors</button></li>
              <li><button onClick={() => onNavigate?.('search')} className="hover:text-white transition-colors">HVAC Specialists</button></li>
              <li><button onClick={() => onNavigate?.('search')} className="hover:text-white transition-colors">Landscapers</button></li>
            </ul>
          </div>

          {/* Column 3: For Pros */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-terracotta mb-8">For Pros</h3>
            <ul className="space-y-4 text-white/60 text-sm font-medium">
              <li><button onClick={() => onNavigate?.('pro_landing')} className="hover:text-white transition-colors flex items-center gap-2"><Briefcase className="h-3 w-3" /> Join the Network</button></li>
              <li><button onClick={() => onNavigate?.('dashboard')} className="hover:text-white transition-colors">Pro Login</button></li>
              <li><button onClick={() => onNavigate?.('pro_landing')} className="hover:text-white transition-colors flex items-center gap-2"><ShieldCheck className="h-3 w-3" /> Get Verified</button></li>
              <li><button onClick={() => onNavigate?.('affiliate_program')} className="hover:text-white transition-colors">Affiliate Program</button></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-terracotta mb-8">Design & Care</h3>
            <p className="text-white/60 text-sm mb-6">Join homeowners receiving weekly renovation guides and maintenance tips.</p>
            <form className="relative group" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Email address" className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-terracotta transition-colors pr-10 font-light" />
                <button type="submit" className="absolute right-0 top-3 text-white/40 group-hover:text-terracotta transition-colors">
                  <ArrowRight className="h-5 w-5" />
                </button>
            </form>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between text-[10px] font-bold uppercase tracking-widest text-white/30">
          <span className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} YourNextHomePro. All rights reserved.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
