
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Layout, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

interface HomeownerLandingProps {
  onJoin: () => void;
}

export const HomeownerLanding: React.FC<HomeownerLandingProps> = ({ onJoin }) => {
  return (
    <div className="bg-paper min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 lg:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="text-terracotta font-bold tracking-[0.3em] text-[10px] uppercase mb-6 block">Homeowner Excellence</span>
                <h1 className="font-serif text-5xl md:text-7xl font-medium text-espresso leading-[1.1] mb-8 tracking-tight">
                  The <span className="italic">Concierge</span> <br />
                  for Your Home.
                </h1>
                <p className="text-xl text-taupe mb-10 max-w-lg leading-relaxed font-light">
                  Stop searching. Start matching. Access our curated list of verified master craftsmen and manage your projects in one private hub.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-12">
                  <button 
                    onClick={onJoin}
                    className="w-full sm:w-auto px-10 py-5 bg-terracotta text-white font-bold rounded-2xl shadow-xl shadow-terracotta/20 hover:bg-terracotta-dark transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs group"
                  >
                    Join for Free
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map(i => (
                        <img key={i} src={`https://randomuser.me/api/portraits/thumb/women/${40+i}.jpg`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="User" />
                      ))}
                    </div>
                    <p className="text-xs font-bold text-taupe uppercase tracking-wider">Join 2,400+ Homeowners</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-taupe/10 pt-8">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-taupe uppercase tracking-widest">
                    <CheckCircle className="h-3.5 w-3.5 text-sage" /> Verified Pros
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-taupe uppercase tracking-widest">
                    <CheckCircle className="h-3.5 w-3.5 text-sage" /> Zero Spam
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-taupe uppercase tracking-widest">
                    <CheckCircle className="h-3.5 w-3.5 text-sage" /> 100% Private
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Visual */}
            <div className="lg:col-span-6 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1556912177-c54034b7971d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  className="w-full h-full object-cover" 
                  alt="Modern Living" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-espresso/20 via-transparent to-transparent"></div>
                
                {/* Float Card 1 */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute top-12 -left-8 bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/40 max-w-[200px]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-terracotta" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Concierge Match</span>
                  </div>
                  <p className="text-sm font-serif italic text-espresso">"We found a master plumber in 12 minutes."</p>
                </motion.div>

                {/* Float Card 2 */}
                <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute bottom-12 -right-8 bg-espresso text-white p-6 rounded-3xl shadow-xl border border-white/10 max-w-[220px]"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-4 w-4 text-terracotta" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Identity Protected</span>
                  </div>
                  <p className="text-xs text-paper/60 leading-relaxed font-light">
                    Your contact details are encrypted and hidden from pros until you grant access.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-terracotta font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">The Platform</span>
            <h2 className="font-serif text-4xl md:text-5xl text-espresso">Engineered for Quality.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            <div className="space-y-6 text-center md:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-terracotta/5 text-terracotta mb-2">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl text-espresso">Cloaked Messaging</h3>
              <p className="text-taupe leading-relaxed font-light">
                Your phone number and email stay hidden. Receive quotes and chat through our secure platform. No more unsolicited sales calls.
              </p>
            </div>

            <div className="space-y-6 text-center md:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-terracotta/5 text-terracotta mb-2">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl text-espresso">Verified Masters</h3>
              <p className="text-taupe leading-relaxed font-light">
                We strictly vet every pro. Only the top 5% of applicants make our list, ensuring you only work with true craftsmen.
              </p>
            </div>

            <div className="space-y-6 text-center md:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-terracotta/5 text-terracotta mb-2">
                <Layout className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl text-espresso">Project Hub</h3>
              <p className="text-taupe leading-relaxed font-light">
                Track every detail. Manage timelines, save favorite pros, and keep your home records in one beautiful, organized dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Strip */}
      <section className="py-16 bg-espresso text-paper overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
            <div className="flex items-center gap-4 group">
              <span className="text-4xl font-serif italic text-terracotta">1.</span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] group-hover:text-terracotta transition-colors">Post a Request</span>
            </div>
            <div className="hidden md:block w-12 h-px bg-white/10"></div>
            <div className="flex items-center gap-4 group">
              <span className="text-4xl font-serif italic text-terracotta">2.</span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] group-hover:text-terracotta transition-colors">Concierge Matches You</span>
            </div>
            <div className="hidden md:block w-12 h-px bg-white/10"></div>
            <div className="flex items-center gap-4 group">
              <span className="text-4xl font-serif italic text-terracotta">3.</span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] group-hover:text-terracotta transition-colors">Hire with Confidence</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-paper">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-espresso mb-8 leading-tight">Your home deserves <br /> better than a directory.</h2>
          <button 
            onClick={onJoin}
            className="px-16 py-6 bg-terracotta text-white font-bold rounded-2xl shadow-2xl shadow-terracotta/20 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-[0.2em] text-xs"
          >
            Create Your Private Hub
          </button>
          <p className="mt-8 text-taupe text-sm italic font-light">Free for homeowners. No credit card required.</p>
        </div>
      </section>
    </div>
  );
};
