
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';

const ARTICLES = [
  {
    id: '1',
    title: "The ROI of Renovation: What actually pays off in 2024?",
    excerpt: "Investing in your home is more than just aesthetics. We break down the projects that offer the highest return on investment in the current market.",
    category: "Market Insights",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Elena Vance",
    date: "Oct 12, 2024"
  },
  {
    id: '2',
    title: "Restoring Historic Windows: A Complete Preservation Guide",
    excerpt: "Why original wood windows are worth the effort, and how to find the right master craftsman to restore them to their former glory.",
    category: "Craftsmanship",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1513584684374-8bdb7483fe8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Julian Thorne",
    date: "Oct 8, 2024"
  },
  {
    id: '3',
    title: "5 Signs You Need a Master Electrician (Not Just a Handyman)",
    excerpt: "Electrical safety isn't something to gamble with. Learn the critical signals that your home requires a licensed specialist.",
    category: "Safety",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Sarah Jenkins",
    date: "Sep 30, 2024"
  },
  {
    id: '4',
    title: "The Luxury of Light: Architectural Lighting Design Trends",
    excerpt: "How the right lighting scheme can transform a standard living space into a gallery-worthy masterpiece.",
    category: "Design",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Marcus Wright",
    date: "Sep 22, 2024"
  }
];

export const Blog: React.FC = () => {
  return (
    <div className="bg-paper min-h-screen pb-20">
      {/* Editorial Header */}
      <header className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-taupe/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-terracotta font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">Editorial</span>
          <h1 className="font-serif text-6xl md:text-8xl font-medium text-espresso mb-8">The Journal.</h1>
          <p className="text-xl text-taupe max-w-2xl mx-auto leading-relaxed font-light italic">
            Refined insights on home craftsmanship, renovation strategy, and the pursuit of domestic excellence.
          </p>
        </motion.div>
      </header>

      {/* Featured Article */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.article 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group cursor-pointer"
        >
          <div className="relative aspect-[16/9] lg:aspect-square overflow-hidden rounded-[40px] shadow-2xl">
            <img 
              src={ARTICLES[0].image} 
              alt={ARTICLES[0].title} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-espresso/10 mix-blend-multiply"></div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-terracotta">
              <span>{ARTICLES[0].category}</span>
              <span className="w-1 h-1 bg-taupe/30 rounded-full"></span>
              <span className="text-taupe">{ARTICLES[0].date}</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-espresso leading-tight group-hover:text-terracotta transition-colors">
              {ARTICLES[0].title}
            </h2>
            <p className="text-lg text-taupe font-light leading-relaxed">
              {ARTICLES[0].excerpt}
            </p>
            <div className="flex items-center justify-between pt-6 border-t border-taupe/10">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-taupe/10 flex items-center justify-center text-taupe">
                   {ARTICLES[0].author[0]}
                 </div>
                 <span className="text-sm font-bold text-espresso">{ARTICLES[0].author}</span>
               </div>
               <div className="flex items-center gap-2 text-taupe text-sm">
                 <Clock className="h-4 w-4" />
                 {ARTICLES[0].readTime}
               </div>
            </div>
          </div>
        </motion.article>
      </section>

      {/* Article Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-taupe/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {ARTICLES.slice(1).map((article, idx) => (
            <motion.article 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer flex flex-col h-full"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 shadow-soft group-hover:shadow-soft-hover transition-all">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-terracotta mb-4">
                <span>{article.category}</span>
              </div>
              <h3 className="font-serif text-2xl text-espresso leading-snug mb-4 group-hover:text-terracotta transition-colors flex-grow">
                {article.title}
              </h3>
              <p className="text-sm text-taupe leading-relaxed mb-6 line-clamp-3 font-light">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-taupe/60 pt-4 border-t border-taupe/10">
                <span className="font-bold">{article.date}</span>
                <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {article.readTime}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Newsletter Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="bg-espresso rounded-[60px] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="font-serif text-4xl md:text-5xl text-paper mb-6 italic">Subscribe to the Weekly Digest.</h2>
            <p className="text-paper/60 text-lg mb-12 max-w-xl mx-auto font-light leading-relaxed">
              Curated articles and pro-recommendations delivered to your inbox every Sunday morning.
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-paper outline-none focus:border-terracotta transition-colors"
              />
              <button className="bg-terracotta text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-terracotta-dark transition-all">
                Join
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
