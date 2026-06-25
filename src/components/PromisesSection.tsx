import React, { useState } from "react";
import { PromiseCardData } from "../types";
import { Heart, Sparkles, CheckCircle } from "lucide-react";

const PROMISE_CARDS: PromiseCardData[] = [
  {
    id: 1,
    emoji: "🌹",
    promiseText: "I promise to always make you smile.",
    backDetail: "Your smile is my favorite sight. I'll do everything I can to protect it, brighten it, and be the reason behind it for years to come. ❤️",
  },
  {
    id: 2,
    emoji: "💫",
    promiseText: "I promise to support every dream you chase. 💫",
    backDetail: "No dream of yours is ever too big. I'll always believe in you, cheer for you, and celebrate every achievement by your side. ❤️",
  },
  {
    id: 3,
    emoji: "🛡️",
    promiseText: "I promise to stand beside you through every season. 🩵.",
    backDetail: "When life becomes difficult, you will never have to face it alone. My hand will always be there for you, no matter what. ❤️",
  },
  {
    id: 4,
    emoji: "🎉",
    promiseText: "I promise to celebrate every birthday and anniversary with you.",
    backDetail: "Every special day is another beautiful reminder that we chose each other. I can't wait to celebrate countless more together. ❤️",
  },
  {
    id: 5,
    emoji: "📸",
    promiseText: "I promise to keep creating beautiful memories together.",
    backDetail: "From little adventures to unforgettable moments, every memory with you becomes one of my favorites. Let's keep writing our story together. ❤️",
  },
  {
    id: 6,
    emoji: "💝",
    promiseText: "I promise to choose you, every single day.",
    backDetail: "Yesterday, today, tomorrow, and forever,—I choose you with all my heart. Loving you will always be the easiest and happiest decision of my life. ❤️",
  },
];

export default function PromisesSection() {
  const [flippedIds, setFlippedIds] = useState<number[]>([]);

  const handleCardClick = (id: number) => {
    if (flippedIds.includes(id)) {
      setFlippedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setFlippedIds((prev) => [...prev, id]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 font-sans text-white py-4 flex flex-col items-center">
      {/* Title block */}
      <div className="text-center mb-10">
        <h2 className="text-5xl md:text-7xl font-serif text-white tracking-wide mb-3 drop-shadow-md select-none">
          Promises For Our Forever 🌹
        </h2>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-luxury-accent to-transparent mx-auto mb-5" />
        <p className="text-xs md:text-sm text-luxury-accent/80 uppercase tracking-widest font-light">
          Click any promise card below to flip it and read the dedication behind it...
        </p>
      </div>

      {/* Grid of promise cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-10 select-none">
        {PROMISE_CARDS.map((card) => {
          const isFlipped = flippedIds.includes(card.id);
          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="h-56 perspective-1000 cursor-pointer group"
            >
              {/* Card rotator assembly */}
              <div
                className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform ${isFlipped ? "rotate-y-180" : ""}`}
              >
                {/* CARD FRONT face */}
                <div className="absolute inset-0 w-full h-full rounded-2xl p-5 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex flex-col justify-between backface-hidden shadow-lg group-hover:border-luxury-accent/50 transition-all">
                  <div className="flex justify-between items-start">
                    <span className="text-2xl">{card.emoji}</span>
                    <Heart className="w-4 h-4 text-luxury-accent/40 fill-current animate-pulse" />
                  </div>
                  
                  <div className="flex-1 flex items-center justify-center py-2">
                    <p className="text-sm md:text-base font-serif italic text-white/95 text-center font-semibold">
                      {card.promiseText}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-luxury-accent/60">
                      Tap to reveal ➜
                    </span>
                  </div>
                </div>

                {/* CARD BACK face (flipped) */}
                <div className="absolute inset-0 w-full h-full rounded-2xl p-5 bg-gradient-to-tr from-rose-950/80 via-purple-950/50 to-red-950/80 border border-luxury-accent/30 flex flex-col justify-between backface-hidden rotate-y-180 shadow-2xl">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-luxury-accent flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
                      <span>My Vow</span>
                    </span>
                    <CheckCircle className="w-4 h-4 text-luxury-accent fill-white/10" />
                  </div>

                  <div className="flex-1 flex items-center justify-center p-1 overflow-y-auto">
                    <p className="text-xs md:text-sm text-white/90 text-center leading-relaxed font-sans">
                      {card.backDetail}
                    </p>
                  </div>

                  <div className="text-center pt-2 text-[9px] font-mono text-luxury-accent/70 uppercase">
                    I Promise ❤️
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid footer block */}
      <div className="text-center pt-4 border-t border-white/5 w-full max-w-lg mx-auto">
        <p className="text-sm md:text-base italic text-white/90 leading-relaxed font-serif bg-white/5 border border-white/15 p-5 rounded-2xl shadow-sm backdrop-blur-md">
          "No matter where life takes us,
          I hope our story continues with more love,
          more laughter,
          and countless memories yet to be written. ❤️"
        </p>
      </div>
    </div>
  );
}
