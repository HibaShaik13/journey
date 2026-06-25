import React, { useState } from "react";
import { Sparkles, Heart } from "lucide-react";

interface ConfettiPiece {
  id: number;
  left: string;
  delay: string;
  color: string;
  size: string;
}

export default function CakeSection() {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);

    // Generate local birthday confetti items for a premium burst screen effect
    const confettiColors = ["#ff477e", "#ff85a1", "#ffd166", "#06d6a0", "#118ab2", "#7209b7", "#ff0a54"];
    const items: ConfettiPiece[] = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2 }s`,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      size: `${Math.random() * 8 + 6}px`,
    }));
    setConfetti(items);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 font-sans text-white py-4 relative">
      {/* Confetti generator when candles are blown out */}
      {candlesBlown && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {confetti.map((c) => (
            <div
              key={c.id}
              className="absolute rounded-sm animate-bounce"
              style={{
                left: c.left,
                width: c.size,
                height: c.size,
                backgroundColor: c.color,
                top: "-5%",
                opacity: 0.9,
                animation: `floatSlow 5s linear infinite`,
                animationDelay: c.delay,
                "--drift": `${(Math.random() * 300) - 150}px`,
                "--rotation": "720deg",
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      {/* Header and instruction block */}
      <div className="text-center mb-10">
        <h2 className="text-5xl md:text-7xl font-serif text-white tracking-wide mb-3 drop-shadow-md select-none">
          Make A Wish, My Love 🎂
        </h2>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-luxury-accent to-transparent mx-auto mb-5" />
        
        <p className="text-sm md:text-base text-white/90 max-w-lg mx-auto leading-relaxed italic whitespace-pre-line">
          Close your eyes.
          Take a deep breath.
          Make a wish from your heart.

          May your life always be filled with happiness,
          love, success, and countless smiles.

          Happy Birthday, My Love ❤️
        </p>
      </div>

      {/* Birthday Cake Showcase with Vector Layers & Candles */}
      <div className="flex flex-col items-center justify-center my-8 select-none">
        <div className="relative w-64 h-64 flex flex-col justify-end items-center pb-2">
          
          {/* Candles standing on cake */}
          <div className="flex justify-center space-x-6 mb-[-10px] z-10 relative">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex flex-col items-center transition-all duration-300">
                {/* Yellow glowing Flame */}
                {!candlesBlown ? (
                  <div className="w-3 h-6 bg-gradient-to-t from-red-500 via-yellow-400 to-yellow-100 rounded-full animate-flame-flicker origin-bottom" />
                ) : (
                  // Smoke puff placeholder
                  <div className="w-1.5 h-4 bg-white/20 rounded-full blur-xs animate-pulse opacity-40" />
                )}
                {/* Candle stick with stripes */}
                <div className="w-2.5 h-12 bg-gradient-to-b from-pink-300 via-rose-300 to-pink-200 rounded-t-sm relative shadow-sm">
                  {/* Stripes */}
                  <div className="absolute inset-x-0 top-2 h-1 bg-white/40 rotate-[15deg]" />
                  <div className="absolute inset-x-0 top-6 h-1 bg-white/40 rotate-[15deg]" />
                </div>
              </div>
            ))}
          </div>

          {/* Golden Sparkles floating around */}
          {!candlesBlown && (
            <div className="absolute top-2 left-6 animate-pulse">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
          )}

          {/* Birthday Cake Structure */}
          {/* Top Layer */}
          <div className="w-32 h-14 bg-gradient-to-r from-pink-400 to-pink-300 rounded-t-xl relative border-t-4 border-white/30 shadow-md">
            {/* White icing drops dripping down */}
            <div className="absolute bottom-0 inset-x-0 flex justify-between px-1">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="w-4 h-5 bg-white rounded-b-full shadow-xs mt-[-2px]" />
              ))}
            </div>
            {/* Slices of strawberry topping */}
            <div className="absolute inset-x-0 top-1.5 flex justify-around">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="w-3.5 h-3.5 rounded-full bg-rose-600 border border-white" />
              ))}
            </div>
          </div>

          {/* Bottom Layer */}
          <div className="w-48 h-18 bg-gradient-to-r from-pink-500 to-pink-400 rounded-t-2xl relative border-t-4 border-pink-100/40 shadow-lg mt-[-6px]">
            {/* Chocolate/cream swirls */}
            <div className="absolute inset-x-0 top-3 flex justify-around px-2">
              {[...Array(5)].map((_, idx) => (
                <div key={idx} className="w-5 h-2.5 bg-white/70 rounded-full" />
              ))}
            </div>
            {/* White cream lace details */}
            <div className="absolute bottom-1 inset-x-0 flex justify-between px-2">
              {[...Array(8)].map((_, idx) => (
                <div key={idx} className="w-4 h-4 bg-white/80 rounded-full" />
              ))}
            </div>
          </div>

          {/* Elegant Gold Plate */}
          <div className="w-56 h-4 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 rounded-full shadow-xl relative border-b-2 border-yellow-700" />
          {/* Plate base standing */}
          <div className="w-32 h-2.5 bg-yellow-700/80 rounded-b-md shadow-xs" />
        </div>

        {/* Action Button & Congratulate messaging */}
        <div className="mt-8 text-center">
          {!candlesBlown ? (
            <button
              onClick={handleBlowCandles}
              id="blow-candles-btn"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-sm md:text-base tracking-widest shadow-[0_4px_20px_rgba(244,63,94,0.4)] animate-heart-beat transition-all active:scale-95 flex items-center justify-center space-x-2"
            >
              <span>🎂 Blow the Candles</span>
            </button>
          ) : (
            <div className="animate-fade-in space-y-4 max-w-md mx-auto px-4">
              <div className="inline-flex p-3 rounded-full bg-rose-100/10 border border-rose-300/30 text-rose-300">
                <Heart className="w-8 h-8 fill-current animate-heart-beat" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-pink-200 tracking-wide">
                *Your candles are blown!* 💖
              </h3>
              <p className="text-sm md:text-base text-white/90 leading-relaxed bg-white/10 p-5 rounded-2xl border border-white/10 shadow-lg backdrop-blur-md">
                "May all your dreams come true, because your happiness means the world to me. ❤️"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
