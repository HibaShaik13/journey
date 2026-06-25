import React, { useState } from "react";
import { Heart, Sparkles, RefreshCw } from "lucide-react";

export default function LetterSection() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 font-sans text-white py-4 flex flex-col items-center">
      {/* Heading Block */}
      <div className="text-center mb-10">
        <h2 className="text-5xl md:text-7xl font-serif text-white tracking-wide mb-3 drop-shadow-md select-none">
          Words My Heart Could Never Keep Inside 💌
        </h2>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-luxury-accent to-transparent mx-auto mb-5" />
        <p className="text-xs md:text-sm text-luxury-accent/80 uppercase tracking-widest font-light">
          Click the love letter envelope below to break the seal and open my message...
        </p>
      </div>

      <div className="w-full max-w-lg min-h-[420px] flex flex-col items-center justify-center relative mb-6">
        
        {/* Envelope Container */}
        {!isOpen ? (
          // Closed Envelope Stage with Wax Seal
          <div 
            onClick={handleOpenLetter}
            id="envelope-closed"
            className="w-full max-w-sm h-64 bg-gradient-to-br from-red-800 via-[#850045] to-red-950 rounded-2xl shadow-2xl relative flex flex-col items-center justify-center cursor-pointer transform hover:scale-105 active:scale-98 transition-all duration-500 border border-white/5 group animate-neon-glow"
          >
            {/* Triangular decorative lines resembling envelope lines */}
            <div className="absolute top-0 inset-x-0 h-0 w-0 border-t-[120px] border-t-black/40 border-x-[180px] border-x-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-0 w-0 border-b-[130px] border-b-black/20 border-x-[180px] border-x-transparent pointer-events-none" />

            {/* Glowing gold seal in center */}
            <div className="z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-600 via-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg border-2 border-yellow-300 relative group-hover:scale-110 transition-transform duration-300">
              {/* Pulsing seal heart */}
              <Heart className="w-8 h-8 text-[#850045] fill-current animate-heart-beat" />
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-200 animate-spin" />
            </div>

            <p className="z-10 text-[10px] text-yellow-200 font-semibold tracking-widest mt-4 uppercase">
              Break The Seal
            </p>
            <p className="z-10 text-[10px] text-white/60 italic font-mono mt-1 pr-1">
              For: My Love ❤️
            </p>
          </div>
        ) : (
          // Unfolded Letter Stage
          <div 
            className="w-full bg-[#fdfaf6] text-slate-800 p-6 md:p-8 rounded-3xl shadow-2xl border border-white/20 relative animate-fade-in max-h-[85vh] overflow-y-auto"
            style={{ 
              animationName: "letterSlideUp", 
              animationDuration: "0.8s", 
              animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" 
            }}
          >
            {/* Lined notebook paper background look */}
            <div className="absolute top-0 bottom-0 left-[2rem] w-[1px] bg-red-100 pointer-events-none" />
            
            {/* Reset button back to envelope */}
            <button 
              onClick={handleOpenLetter}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-200/50 text-slate-400 hover:text-slate-600 transition-colors"
              title="Close Letter"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Handwritten Text formatting */}
            <div className="pl-6 md:pl-8 font-sans leading-relaxed text-sm md:text-base selection:bg-rose-200">
              
              <h3 className="font-serif text-3xl md:text-4xl text-[#850045] font-semibold tracking-wide border-b border-dashed border-red-200 pb-2 mb-6">
                My Love,
              </h3>

              <p className="mb-4">
                Happy Birthday and Happy Love Anniversary.
              </p>

              <p className="mb-4">
                Thank you for walking into my life and turning ordinary days into beautiful memories.
              </p>

              <p className="mb-4">
                You have been my smile during difficult days,
                my peace during stressful moments,
                and my happiness in ways words cannot explain.
              </p>

              <p className="mb-4">
                I don't know what the future holds,
                but I know one thing for sure—
                I want to keep creating memories with you.
              </p>

              <p className="mb-4">
                Thank you for your love,
                your care,
                your patience,
                and for simply being you.
              </p>

              <p className="mb-4">
                I hope your birthday is as wonderful as your heart.
              </p>

              <p className="font-semibold text-2xl md:text-3xl text-red-600 italic flex flex-col mt-6 font-serif tracking-wider">
                <span>I love you today,</span>
                <span className="text-red-700">tomorrow,</span>
                <span className="font-semibold text-[#850045] uppercase text-2xl md:text-4xl">and forever. ❤️</span>
              </p>
            </div>
            
            {/* Decorative bottom seal corner */}
            <div className="absolute right-6 bottom-6 opacity-35 select-none pointer-events-none">
              <Heart className="w-16 h-16 text-rose-200 fill-current" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
