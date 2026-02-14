
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MapPin, Info, ArrowRight, ExternalLink, Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface AreaInsightsProps {
  location: string;
}

export const AreaInsights: React.FC<AreaInsightsProps> = ({ location }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [links, setLinks] = useState<{ title: string; uri: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInsights = async () => {
    if (!location) return;
    setIsLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Provide a brief, sophisticated 2-sentence summary of the home renovation and repair market in ${location}. Mention local architecture styles or common housing needs in this area.`,
        config: {
          tools: [{ googleMaps: {} }],
        },
      });

      setInsight(response.text || null);
      
      const grounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const extractedLinks = grounding
        .filter((c: any) => c.maps)
        .map((c: any) => ({
          title: c.maps.title || "Local Map View",
          uri: c.maps.uri
        }));
      setLinks(extractedLinks);
    } catch (error) {
      console.error("Maps grounding error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, [location]);

  if (!location) return null;

  return (
    <div className="bg-white rounded-[32px] p-8 border border-taupe/10 shadow-soft relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta/5 rounded-full -mr-16 -mt-16 blur-3xl" />
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-paper rounded-xl text-terracotta">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="font-serif text-xl font-bold text-espresso">Area Intelligence: {location}</h3>
        </div>
        {isLoading && <Loader2 className="h-4 w-4 animate-spin text-taupe/40" />}
      </div>

      <div className="space-y-4 relative z-10">
        {insight ? (
          <p className="text-taupe text-sm leading-relaxed font-light italic">
            "{insight}"
          </p>
        ) : !isLoading && (
          <p className="text-taupe/40 text-sm italic">Local data initializing...</p>
        )}

        {links.length > 0 && (
          <div className="pt-4 border-t border-taupe/5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-taupe/60 mb-3">Grounding Sources</p>
            <div className="flex flex-wrap gap-2">
              {links.map((link, i) => (
                <a 
                  key={i}
                  href={link.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-paper rounded-full text-[10px] font-bold text-espresso hover:bg-terracotta hover:text-white transition-all border border-taupe/5"
                >
                  <MapPin className="h-3 w-3" />
                  {link.title}
                  <ExternalLink className="h-2 w-2" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
