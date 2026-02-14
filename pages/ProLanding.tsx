
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Award, ArrowRight, CheckCircle, Lock, MessageSquare, Briefcase } from 'lucide-react';

interface ProLandingProps {
  onClaimClick: () => void;
}

export const ProLanding: React.FC<ProLandingProps> = ({ onClaimClick }) => {
  return (
    <div className="bg-espresso text-paper min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 lg:pt-32 pb-32">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-terracotta/10 rounded-full -mr-96 -mt-96 blur-[120px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-terracotta font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block">Supply-Side Elite</span>
              <h1 className="font-serif text-5xl md:text-7xl font-medium leading-[1.05] mb-8 tracking-tight text-white">
                Stop chasing leads. <br />
                <span className="italic text-taupe">Start building</span> <br />
                relationships.
              </h1>
              <p className="text-xl text-paper/70 mb-10 max-w-lg leading-relaxed font-light">
                Join an exclusive network of master craftsmen. We verify the homeowners so you get high-intent, ready-to-hire projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={onClaimClick}
                  className="px-10 py-5 bg-terracotta text-white font-bold rounded-2xl shadow-2xl shadow-terracotta/40 hover:bg-terracotta-dark transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs group"
                >
                  Claim Your Profile
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-4 px-6 py-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                   <CheckCircle className="h-5 w-5 text-sage" />
                   <span className="text-[10px] font-bold uppercase tracking-widest text-paper/80">No lead fees until 2025</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-[48px] overflow-hidden shadow-2xl border border-white/10 relative group">
                <img 
                  src="https://images.unsplash.com/photo-1541933224352-232f170b4ce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  className="w-full h-full object-cover grayscale opacity-50 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" 
                  alt="Craftsman at work" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-transparent"></div>
                
                {/* Visual Representation of Conversion */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex gap-4">
                        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-2xl flex flex-col items-center gap-3">
                            <Lock className="h-8 w-8 text-taupe/50" />
                            <div className="h-2 w-16 bg-white/10 rounded-full"></div>
                            <div className="h-2 w-10 bg-white/10 rounded-full"></div>
                        </div>
                        <motion.div 
                          animate={{ x: [0, 10, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="flex items-center text-terracotta"
                        >
                            <ArrowRight className="h-10 w-10" />
                        </motion.div>
                        <div className="bg-terracotta p-6 rounded-3xl shadow-glow flex flex-col items-center gap-3 border border-white/20">
                            <CheckCircle className="h-8 w-8 text-white" />
                            <div className="h-2 w-16 bg-white/40 rounded-full"></div>
                            <div className="h-2 w-10 bg-white/40 rounded-full"></div>
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Grid */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-terracotta font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">The Partnership</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white">Why Pros Choose Us.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-md p-10 rounded-[40px] border border-white/10 hover:bg-white/[0.08] transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl text-white mb-4">Zero Tire Kickers</h3>
              <p className="text-paper/60 leading-relaxed font-light">
                Our concierge team verifies every homeowner request before it reaches you. High intent only.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-10 rounded-[40px] border border-white/10 hover:bg-white/[0.08] transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl text-white mb-4">Keep Your Brand</h3>
              <p className="text-paper/60 leading-relaxed font-light">
                Your profile is your portfolio. Showcase your best work with high-res galleries and verified reviews.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-10 rounded-[40px] border border-white/10 hover:bg-white/[0.08] transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl text-white mb-4">Direct Messaging</h3>
              <p className="text-paper/60 leading-relaxed font-light">
                No middleman taking a cut of your labor. You quote, you get paid. We just provide the tools to win.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-taupe mb-12">Trusted by the best in the business</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale invert">
            <span className="font-serif text-2xl font-bold">MASTERPLUMB</span>
            <span className="font-serif text-2xl font-bold">STRUCTURA</span>
            <span className="font-serif text-2xl font-bold">VETERANBUILT</span>
            <span className="font-serif text-2xl font-bold">AUSTINCRAFT</span>
          </div>
          <p className="mt-16 text-taupe font-medium">Over 500+ Master Tradesmen joined this month alone.</p>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-terracotta/20 mb-8">
            <Briefcase className="h-10 w-10 text-terracotta" />
          </div>
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-10 italic leading-tight">Your next great project <br /> is waiting in the guide.</h2>
          <button 
            onClick={onClaimClick}
            className="px-16 py-6 bg-white text-espresso font-bold rounded-2xl hover:bg-terracotta hover:text-white transition-all uppercase tracking-[0.2em] text-xs shadow-2xl"
          >
            Start Your Application
          </button>
        </div>
      </section>
    </div>
  );
};
