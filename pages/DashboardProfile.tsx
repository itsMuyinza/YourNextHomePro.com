
import React from 'react';
import { Pro } from '../types';
import { Save, Upload, MapPin, X } from 'lucide-react';

interface DashboardProfileProps {
  pro: Pro;
}

export const DashboardProfile: React.FC<DashboardProfileProps> = ({ pro }) => {
  return (
    <div className="p-6 lg:p-12 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="font-serif text-3xl font-bold text-espresso">Profile Editor</h1>
                <p className="text-taupe text-sm mt-1">Manage how homeowners see your business.</p>
            </div>
            <button className="bg-espresso text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-espresso/90 shadow-lg">
                <Save className="h-4 w-4" /> Save Changes
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Basics */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Basic Info Card */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-taupe/5">
                    <h3 className="font-bold text-espresso mb-6 pb-2 border-b border-taupe/5">Business Details</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-taupe mb-2">Business Name</label>
                                <input type="text" defaultValue={pro.businessName} className="w-full p-3 bg-paper rounded-xl border border-taupe/10 outline-none focus:border-terracotta transition-colors font-medium text-espresso" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-taupe mb-2">Primary Service</label>
                                <select className="w-full p-3 bg-paper rounded-xl border border-taupe/10 outline-none focus:border-terracotta transition-colors font-medium text-espresso">
                                    <option>{pro.service}</option>
                                    <option>General Contractor</option>
                                    <option>Electrician</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-taupe mb-2">The Essence (Bio)</label>
                            <textarea rows={4} defaultValue={pro.description} className="w-full p-3 bg-paper rounded-xl border border-taupe/10 outline-none focus:border-terracotta transition-colors text-sm leading-relaxed" />
                        </div>
                    </div>
                </div>

                {/* Service Area */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-taupe/5">
                    <h3 className="font-bold text-espresso mb-6 pb-2 border-b border-taupe/5">Service Area</h3>
                    <div className="flex items-center gap-4 mb-4">
                         <div className="flex-1 relative">
                            <MapPin className="h-4 w-4 absolute left-3 top-3.5 text-taupe" />
                            <input type="text" placeholder="Enter Zip Code" className="w-full pl-10 pr-4 py-3 bg-paper rounded-xl border border-taupe/10 outline-none" />
                         </div>
                         <button className="bg-terracotta/10 text-terracotta font-bold px-4 py-3 rounded-xl hover:bg-terracotta/20">Add</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {['Austin, TX', 'Round Rock, TX', 'Pflugerville, TX', '78704'].map((loc, i) => (
                            <span key={i} className="px-3 py-1.5 bg-espresso text-white rounded-lg text-xs font-bold flex items-center gap-2">
                                {loc} <button><X className="h-3 w-3" /></button>
                            </span>
                        ))}
                    </div>
                </div>

                 {/* Portfolio */}
                 <div className="bg-white p-8 rounded-3xl shadow-sm border border-taupe/5">
                    <h3 className="font-bold text-espresso mb-6 pb-2 border-b border-taupe/5">Portfolio</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Upload Placeholder */}
                        <div className="aspect-square border-2 border-dashed border-taupe/20 rounded-xl flex flex-col items-center justify-center text-taupe cursor-pointer hover:bg-paper transition-colors">
                            <Upload className="h-6 w-6 mb-2" />
                            <span className="text-xs font-bold uppercase">Add Photo</span>
                        </div>
                        {/* Mock Images */}
                        {[1, 2, 3].map(i => (
                             <div key={i} className="aspect-square rounded-xl overflow-hidden relative group">
                                <img src={`https://picsum.photos/300/300?random=${i}`} className="w-full h-full object-cover" />
                                <button className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                    <X className="h-3 w-3 text-red-500" />
                                </button>
                             </div>
                        ))}
                    </div>
                 </div>
            </div>

            {/* Right Column - Attributes */}
            <div className="space-y-8">
                 <div className="bg-white p-6 rounded-3xl shadow-sm border border-taupe/5">
                    <h3 className="font-bold text-espresso mb-4">Quick Stats</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-taupe mb-1">Years in Business</label>
                            <input type="number" defaultValue={pro.yearsInBusiness} className="w-full p-2 bg-paper rounded-lg border border-taupe/10 font-bold text-espresso" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-taupe mb-1">Pricing Tier</label>
                            <div className="flex gap-2">
                                {['$', '$$', '$$$', '$$$$'].map(price => (
                                    <button key={price} className={`flex-1 py-2 rounded-lg text-sm font-bold border ${pro.priceRange === price ? 'bg-terracotta text-white border-terracotta' : 'bg-white border-taupe/20 text-taupe'}`}>
                                        {price}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                 </div>

                 <div className="bg-terracotta/5 p-6 rounded-3xl border border-terracotta/10">
                    <h4 className="font-bold text-terracotta text-sm mb-2">Pro Tip</h4>
                    <p className="text-xs text-taupe leading-relaxed">
                        Pros with 5+ portfolio photos get 40% more engagement. Show off your best work!
                    </p>
                 </div>
            </div>
        </div>
    </div>
  );
};
