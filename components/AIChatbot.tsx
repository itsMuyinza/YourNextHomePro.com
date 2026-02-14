
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, X, Send, Sparkles, Loader2, Minus, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: "Hello! I'm your Project Concierge. Looking for a master plumber, or planning a full kitchen remodel? I'm here to help." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: messages.concat([{ role: 'user', text: userMsg }]).map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: "You are the 'YourNextHomePro Project Concierge'. You are professional, sophisticated, and helpful. You provide advice on home improvement, explain differences between trades (e.g., Handyman vs. Licensed Plumber), and help users define their project scope. Keep responses concise but insightful.",
          thinkingConfig: { thinkingBudget: 4000 }
        }
      });

      const botText = response.text || "I'm having trouble connecting right now, but I'm usually much smarter than this.";
      setMessages(prev => [...prev, { role: 'model', text: botText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Forgive me, my connection is flickering. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`bg-white shadow-2xl rounded-[32px] border border-taupe/10 overflow-hidden mb-4 flex flex-col ${isMinimized ? 'h-20 w-80' : 'h-[550px] w-[400px]'}`}
          >
            {/* Header */}
            <div className="bg-espresso p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-terracotta p-2 rounded-xl">
                  <Sparkles className="h-4 w-4 text-paper" />
                </div>
                <div>
                  <h3 className="text-paper font-serif font-bold leading-none">Project Concierge</h3>
                  <span className="text-[10px] text-paper/60 uppercase tracking-widest font-bold">AI Intelligence</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 hover:bg-white/10 rounded-lg text-paper/60 transition-colors">
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg text-paper/60 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-paper/30">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                        m.role === 'user' 
                        ? 'bg-terracotta text-white rounded-br-none shadow-md' 
                        : 'bg-white text-espresso border border-taupe/5 rounded-bl-none shadow-sm'
                      }`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-taupe/5 shadow-sm">
                        <Loader2 className="h-4 w-4 text-terracotta animate-spin" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-5 border-t border-taupe/5 bg-white">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex items-center gap-3 bg-paper p-1 rounded-2xl border border-taupe/10"
                  >
                    <input 
                      type="text"
                      placeholder="Ask about your renovation..."
                      className="flex-1 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-taupe/40"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <button 
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="bg-espresso text-paper p-2.5 rounded-xl hover:bg-terracotta transition-all disabled:opacity-30"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => { setIsOpen(true); setIsMinimized(false); }}
        className={`bg-terracotta p-4 rounded-full shadow-glow text-paper flex items-center gap-3 font-bold uppercase tracking-widest text-[10px] transition-all ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <MessageSquare className="h-5 w-5" />
        AI Concierge
      </motion.button>
    </div>
  );
};
