
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, TrendingUp, DollarSign, CheckCircle, ArrowRight, HelpCircle } from 'lucide-react';

interface AffiliateProgramProps {
  onJoin: () => void;
}

export const AffiliateProgram: React.FC<AffiliateProgramProps> = ({ onJoin }) => {
  return (
    <div className="bg-paper min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 lg:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-terracotta font-bold tracking-[0.3em] text-[10px] uppercase mb-6 block">Affiliate Partner Program</span>
              <h1 className="font-serif text-5xl md:text-7xl font-medium text-espresso leading-[1.1] mb-8 tracking-tight">
                Turn Your "I Know a Guy" <br />
                <span className="italic text-terracotta">Into Real Monthly Income.</span>
              </h1>
              <p className="text-xl text-taupe mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                You already recommend great pros to your friends. Now, earn <span className="font-bold text-espresso">$15/month (30%)</span> for every home professional you refer. Build a recurring revenue stream by supporting local businesses.
              </p>
              
              <button 
                onClick={onJoin}
                className="px-10 py-5 bg-terracotta text-white font-bold rounded-2xl shadow-xl shadow-terracotta/20 hover:bg-terracotta-dark transition-all inline-flex items-center justify-center gap-3 uppercase tracking-widest text-xs group"
              >
                Join the Affiliate Program
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Three Audiences */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                 <h2 className="font-serif text-4xl text-espresso mb-4">Choose Your Path</h2>
                 <p className="text-taupe">Designed for everyone from neighbors to influencers.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 1. The Social Butterfly */}
                <div className="bg-paper p-8 rounded-[40px] border border-taupe/10 hover:border-terracotta/30 transition-all group">
                    <div className="w-16 h-16 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Users className="h-8 w-8" />
                    </div>
                    <h3 className="font-serif text-2xl text-espresso mb-2">The Neighbor</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-taupe mb-6">Social Butterfly</p>
                    <p className="text-taupe leading-relaxed mb-6">
                        You know everyone. You're the HOA president or the person everyone asks for a "good plumber." Turn that influence into cash.
                    </p>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-2 text-sm text-espresso"><CheckCircle className="h-4 w-4 text-sage" /> 5 Referrals = $75/mo</li>
                        <li className="flex items-center gap-2 text-sm text-espresso"><CheckCircle className="h-4 w-4 text-sage" /> Pays your internet bill</li>
                        <li className="flex items-center gap-2 text-sm text-espresso"><CheckCircle className="h-4 w-4 text-sage" /> No quotas, just help friends</li>
                    </ul>
                </div>

                {/* 2. The Service Provider */}
                <div className="bg-espresso text-white p-8 rounded-[40px] border border-white/10 shadow-xl relative overflow-hidden group transform md:-translate-y-4">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    <div className="w-16 h-16 rounded-2xl bg-white/10 text-terracotta flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Briefcase className="h-8 w-8" />
                    </div>
                    <h3 className="font-serif text-2xl text-white mb-2">The Pro</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-6">"Power of 3" Deal</p>
                    <p className="text-white/70 leading-relaxed mb-6">
                        Stop paying for marketing. Refer 3 other pros (partners you trust) and your $50/mo listing is effectively FREE.
                    </p>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-2 text-sm text-white"><CheckCircle className="h-4 w-4 text-terracotta" /> Refer 3 = $45/mo earned</li>
                        <li className="flex items-center gap-2 text-sm text-white"><CheckCircle className="h-4 w-4 text-terracotta" /> Covers your listing fee</li>
                        <li className="flex items-center gap-2 text-sm text-white"><CheckCircle className="h-4 w-4 text-terracotta" /> 4+ referrals = Profit</li>
                    </ul>
                </div>

                {/* 3. The Authority */}
                <div className="bg-paper p-8 rounded-[40px] border border-taupe/10 hover:border-terracotta/30 transition-all group">
                    <div className="w-16 h-16 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <TrendingUp className="h-8 w-8" />
                    </div>
                    <h3 className="font-serif text-2xl text-espresso mb-2">The Authority</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-taupe mb-6">Realtor / Influencer</p>
                    <p className="text-taupe leading-relaxed mb-6">
                        Monetize your influence without "selling out." Provide a curated list of vetted pros to your audience and earn passive income.
                    </p>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-2 text-sm text-espresso"><CheckCircle className="h-4 w-4 text-sage" /> 100 Pros = $1,500/mo</li>
                        <li className="flex items-center gap-2 text-sm text-espresso"><CheckCircle className="h-4 w-4 text-sage" /> Zero maintenance</li>
                        <li className="flex items-center gap-2 text-sm text-espresso"><CheckCircle className="h-4 w-4 text-sage" /> Real-time dashboard</li>
                    </ul>
                </div>
            </div>
        </div>
      </section>

      {/* Revenue Table */}
      <section className="py-24 bg-espresso text-paper">
         <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
                 <h2 className="font-serif text-4xl text-white mb-4">The Numbers for Growth</h2>
                 <p className="text-white/60">How much is your network worth?</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden">
                <div className="grid grid-cols-2 p-6 border-b border-white/10 bg-white/5">
                    <span className="text-xs font-bold uppercase tracking-widest text-taupe">Active Referrals</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-terracotta text-right">Your Monthly Income</span>
                </div>
                {[
                    { pros: '10 Pros', income: '$150 / mo' },
                    { pros: '25 Pros', income: '$375 / mo' },
                    { pros: '50 Pros', income: '$750 / mo' },
                    { pros: '100 Pros', income: '$1,500 / mo' },
                ].map((row, i) => (
                    <div key={i} className="grid grid-cols-2 p-6 border-b border-white/5 hover:bg-white/5 transition-colors">
                        <span className="font-serif text-xl font-bold">{row.pros}</span>
                        <span className="font-bold text-xl text-right">{row.income}</span>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* FAQ */}
      <section className="py-24 max-w-3xl mx-auto px-4">
        <h2 className="font-serif text-3xl text-espresso mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
            {[
                { q: "How long do I get paid?", a: "Forever, as long as your referral stays active. If they cancel, your commission stops. If they reactivate, it resumes." },
                { q: "Can I refer my own business?", a: "No. Self-referrals are prohibited to keep the network genuine." },
                { q: "What if a pro I refer disputes their charge?", a: "Chargebacks result in a commission reversal for that specific month." },
                { q: "Do I need a professional license to be an affiliate?", a: "Not at all. You just need to know pros who want more local visibility." },
            ].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-taupe/10">
                    <h4 className="font-bold text-espresso mb-2 flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-terracotta" /> {faq.q}
                    </h4>
                    <p className="text-taupe text-sm leading-relaxed pl-6">{faq.a}</p>
                </div>
            ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
            <h2 className="font-serif text-4xl md:text-5xl text-espresso mb-8 leading-tight">Build your local legacy.</h2>
            <div className="space-y-4">
                <button 
                    onClick={onJoin}
                    className="w-full md:w-auto px-16 py-6 bg-terracotta text-white font-bold rounded-2xl shadow-2xl shadow-terracotta/20 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-[0.2em] text-xs"
                >
                    Join the Pro-Authority Network
                </button>
                <p className="text-taupe text-sm italic">Questions? affiliates@yournexthomepro.com</p>
            </div>
        </div>
      </section>
    </div>
  );
};
