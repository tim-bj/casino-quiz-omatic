import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Question } from "@/types/quiz";
import { Sparkles, Zap, Crown } from "lucide-react";

interface LootboxQuestionProps {
  question: Question;
  onReveal: () => void;
  isRevealing: boolean;
}

const LootboxQuestion = ({ question, onReveal, isRevealing }: LootboxQuestionProps) => {
  const [isSpinning, setIsSpinning] = useState(true);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    if (isRevealing) {
      const spinTimer = setTimeout(() => {
        setIsSpinning(false);
        setShowParticles(true);
        const revealTimer = setTimeout(() => {
          onReveal();
          setShowParticles(false);
        }, 1000);
        return () => clearTimeout(revealTimer);
      }, 2500);
      return () => clearTimeout(spinTimer);
    }
  }, [isRevealing, onReveal]);

  const getRarityConfig = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return {
          icon: Crown,
          color: 'text-yellow-400',
          glow: 'legendary-glow',
          badge: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
          label: 'LLEGENDÀRIA'
        };
      case 'rare':
        return {
          icon: Zap,
          color: 'text-purple-400', 
          glow: 'rare-glow',
          badge: 'bg-gradient-to-r from-purple-400 to-purple-600',
          label: 'RARA'
        };
      default:
        return {
          icon: Sparkles,
          color: 'text-blue-400',
          glow: 'lootbox-glow',
          badge: 'bg-gradient-to-r from-blue-400 to-blue-600',
          label: 'COMUNA'
        };
    }
  };

  const rarityConfig = getRarityConfig(question.rarity);
  const IconComponent = rarityConfig.icon;

  if (isSpinning && isRevealing) {
    return (
      <div className="lootbox-container">
        <Card className={`lootbox-spinning ${rarityConfig.glow} border-2 border-primary/50`}>
          <CardContent className="p-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <IconComponent className={`w-16 h-16 ${rarityConfig.color}`} />
                <div className="absolute inset-0 animate-pulse">
                  <IconComponent className={`w-16 h-16 ${rarityConfig.color} opacity-50`} />
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold">OBRINT LOOTBOX...</div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {showParticles && (
          <div className="particles">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="particle"></div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="lootbox-container">
      <Card className={`lootbox-reveal ${rarityConfig.glow} border-2 border-primary/50`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Badge className={`${rarityConfig.badge} text-white font-bold px-3 py-1`}>
              <IconComponent className="w-4 h-4 mr-1" />
              {rarityConfig.label}
            </Badge>
            <Badge variant="outline">{question.category}</Badge>
          </div>
          
          <div className="text-center space-y-4">
            <div className="relative">
              <IconComponent className={`w-12 h-12 ${rarityConfig.color} mx-auto mb-4`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-16 h-16 rounded-full ${rarityConfig.glow} opacity-30`}></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold leading-tight">
              {question.question}
            </h2>
          </div>
        </CardContent>
      </Card>
      
      {showParticles && (
        <div className="particles">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="particle"></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LootboxQuestion;