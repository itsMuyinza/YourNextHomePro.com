
import { Pro } from '../types';

export const searchWithGemini = async (query: string, pros: Pro[]): Promise<Pro[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      
      // Tokenize: Split by space, remove punctuation, filter common stop words
      const stopWords = ['i', 'need', 'a', 'an', 'the', 'for', 'to', 'in', 'on', 'at', 'with', 'looking', 'want', 'help', 'please', 'find', 'me', 'some', 'is', 'are'];
      const tokens = lowerQuery
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
        .split(/\s+/)
        .filter(w => w.length > 1 && !stopWords.includes(w));

      // Identify Price Intent
      const isBudget = ['cheap', 'budget', 'affordable', 'economy', 'low cost', 'inexpensive'].some(w => lowerQuery.includes(w));
      const isPremium = ['premium', 'best', 'luxury', 'high end', 'expensive', 'top', 'exclusive'].some(w => lowerQuery.includes(w));

      const scoredPros = pros.map(pro => {
        let score = 0;
        let reasons: string[] = [];
        let hitKeywords: string[] = [];

        const lowerCategory = pro.service.toLowerCase();
        const lowerDesc = pro.description.toLowerCase();
        // Check reviews if available
        const lowerReviews = pro.reviews?.map(r => r.text.toLowerCase()).join(' ') || "";

        tokens.forEach(token => {
          let tokenScore = 0;
          
          // Category Match (+10)
          if (lowerCategory.includes(token)) {
            tokenScore = 10;
          } 
          // Description Match (+5)
          else if (lowerDesc.includes(token)) {
            tokenScore = 5;
          }
          // Review Match (+3)
          else if (lowerReviews.includes(token)) {
            tokenScore = 3;
          }

          if (tokenScore > 0) {
            score += tokenScore;
            if (!hitKeywords.includes(token)) hitKeywords.push(token);
          }
        });

        // Price Match (+5)
        if (isBudget && (pro.priceRange === '$' || pro.priceRange === '$$')) {
            score += 5;
            reasons.push("fits your budget request");
        }
        if (isPremium && (pro.priceRange === '$$$' || pro.priceRange === '$$$$')) {
            score += 5;
            reasons.push("matches your premium preference");
        }

        // Generate Match Reason string
        let matchReason = undefined;
        if (score >= 5) {
            const mainKeyword = hitKeywords[0] || 'your request';
            matchReason = `Matched for ${pro.service} because you asked for "${mainKeyword}".`;
            if (reasons.length > 0) {
                matchReason += ` Also ${reasons.join(' and ')}.`;
            }
        }

        return { ...pro, _score: score, matchReason };
      });

      // Filter score < 5 and Sort by relevance
      const results = scoredPros
        .filter(p => p._score >= 5)
        .sort((a, b) => b._score - a._score)
        .slice(0, 3)
        .map(({ _score, ...p }) => p);

      resolve(results);
    }, 1500); // Simulated "Scanning" latency
  });
};
