import React, { useState } from "react";
import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";

interface BirthdayGirlSectionProps {
  onNext: () => void;
}

export default function BirthdayGirlSection({ onNext }: BirthdayGirlSectionProps) {
  // Local state to track which image is hovered to show floating micor-hearts around it
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // 3 high-quality royalty-free portraits of a beautiful girl as placeholders
  const PORTRAITS = [
    {
      id: 1,
      src: "/src/assets/images/pic5.png",
      caption: "The smile that brightens even my darkest days. ❤️",
      style: "sm:translate-y-6 rotate-[-3deg]",
    },
    {
      id: 2, // Center portrait (Larger and with Crown effect)
      src:"/src/assets/images/pic4.png",
      caption: "Beautiful, graceful, and effortlessly unforgettable. ✨❤️",
      style: "scale-105 z-10 border-4 border-yellow-300 shadow-[0_0_25px_rgba(253,224,71,0.4)]",
      isCenter: true,
    },
    {
      id: 3,
      src: "/src/assets/images/pic6.png",
      caption: "Every little thing you do makes my heart smile. 💖",
      style: "sm:translate-y-6 rotate-[3deg]",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 font-sans text-white py-4 flex flex-col items-center relative overflow-hidden">
      
      {/* 1. Header Block */}
      <div className="text-center mb-10 z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-serif text-white tracking-widest leading-tight mb-2 select-none"
        >
          ✨ Happy Birthday, My Beautiful Girl ✨
        </motion.h2>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-luxury-accent to-transparent mx-auto mb-6" />
      </div>

      {/* 2. Central Cinematic Dedication Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl bg-[#2D001E]/80 border border-white/10 p-6 md:p-8 rounded-3xl text-center shadow-2xl backdrop-blur-md mb-12 relative select-text"
      >
        {/* Soft glowing cinematic lighting effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-accent/5 via-transparent to-luxury-rose/10 pointer-events-none rounded-3xl" />
        
        <p className="text-sm md:text-lg text-white/95 leading-relaxed italic whitespace-pre-line relative z-10">
          "Today is special because the most beautiful soul came into this world.

          Your smile brightens my darkest days,
          your eyes hold countless stories,
          and your heart makes everything feel like home.

          This little page is dedicated only to you. ❤️"
        </p>

        {/* Ambient sparkling star background details */}
        <div className="absolute -top-3 -left-3 animate-pulse">
          <Sparkles className="w-5 h-5 text-yellow-300" />
        </div>
        <div className="absolute -bottom-3 -right-3 animate-pulse delay-500">
          <Sparkles className="w-5 h-5 text-yellow-300" />
        </div>
      </motion.div>

      {/* 3. Three Portrait Crown-Layout Grid */}
      <div className="w-full max-w-3xl flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 mb-14 relative z-10">
        {PORTRAITS.map((p, idx) => {
          const isCenter = p.isCenter;
          const isHovered = hoveredIdx === idx;

          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.25, duration: 0.6, ease: "easeOut" }}
              className={`relative flex flex-col items-center group cursor-pointer ${isCenter ? "order-1 sm:order-2" : idx === 0 ? "order-2 sm:order-1" : "order-3"}`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* CROWN EFFECT (Only for center portrait) */}
              {isCenter && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bounce" style={{ animationDuration: "3s" }}>
                  {/* Elegant Golden Crown */}
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-10 h-10 text-yellow-300 fill-yellow-300/90 filter drop-shadow-[0_2px_8px_rgba(253,224,71,0.6)]"
                  >
                    <path d="M2 22h20v-2H2v2zm1-4h18l-2-6 3-4-5 1-3-7-3 7-5-1 3 4-2 6z" />
                  </svg>
                </div>
              )}

              {/* Polaroid Photo Frame */}
              <div 
                className={`bg-white p-3 pb-5 rounded-md shadow-2xl transition-all duration-500 transform ${p.style} ${
                  isHovered ? "scale-105 shadow-[0_0_30px_rgba(255,183,197,0.4)]" : ""
                }`}
              >
                {/* Image Wrap */}
                <div className="relative aspect-[3/4] w-48 sm:w-52 overflow-hidden bg-rose-50 border border-slate-100 rounded-sm">
                  <img
                    src={p.src}
                    alt={p.caption}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isHovered ? "scale-110" : "scale-100"
                    }`}
                  />

                  {/* Hover Floating Hearts Effect */}
                  {isHovered && (
                    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute text-rose-500 animate-float-up"
                          style={{
                            left: `${20 + i * 12}%`,
                            bottom: "10px",
                            animationDelay: `${i * 0.15}s`,
                            animationDuration: "1.2s",
                            opacity: 0,
                          }}
                        >
                          <Heart className="w-3.5 h-3.5 fill-current" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Shimmer/flash overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Caption Text */}
                <div className="mt-3.5 text-center px-1">
                  <p className="font-sans text-xs md:text-sm font-semibold text-slate-800 tracking-wide">
                    {p.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 4. Bottom Dedication Block */}
      <div className="text-center mb-10 max-w-md mx-auto z-10 select-text">
        <p className="text-sm md:text-base italic text-luxury-accent font-serif leading-relaxed">
          "No matter how many candles are on your cake,<br />
          you'll always be the girl who lights up my world.<br /><br />
          Happy Birthday, Beautiful. ❤️"
        </p>
      </div>

      {/* 5. Continuing Action Button (Framer Motion Beat animation) */}
      <div className="z-20">
        <button
          onClick={onNext}
          id="continue-celebration-btn"
          className="px-10 py-4 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-[#850045] hover:scale-105 active:scale-95 text-white font-bold tracking-widest text-xs md:text-sm uppercase shadow-[0_4px_25px_rgba(244,63,94,0.4)] transition-all animate-heart-beat flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
        >
          <span>Continue The Celebration ➜ 🎂</span>
        </button>
      </div>

    </div>
  );
}
