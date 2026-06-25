/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { Heart, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { JourneyStage } from "./types";
import RomanticBackground from "./components/RomanticBackground";
import HeartCursor from "./components/HeartCursor";
import MusicController from "./components/MusicController";
import TimelineSection from "./components/TimelineSection";
import GallerySection from "./components/GallerySection";
import CakeSection from "./components/CakeSection";
import LetterSection from "./components/LetterSection";
import PromisesSection from "./components/PromisesSection";
import FinaleSection from "./components/FinaleSection";
import BirthdayGirlSection from "./components/BirthdayGirlSection";

export default function App() {
  const [stage, setStage] = useState<JourneyStage>(JourneyStage.LANDING);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Trigger audio playback after user interaction
  const triggerMusicStart = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setMusicPlaying(true))
        .catch((err) => console.log("Audio autoplay deferred by browser:", err));
    }
  };

  const advanceStage = () => {
    if (stage < JourneyStage.FINALE) {
      setStage(stage + 1);
    }
  };

  const regressStage = () => {
    if (stage > JourneyStage.LANDING) {
      setStage(stage - 1);
    }
  };

  const jumpToStage = (newStage: JourneyStage) => {
    setStage(newStage);
  };

  return (
    <div className="relative min-h-screen love-gradient-bg flex flex-col justify-between overflow-x-hidden select-none">
      
      {/* 1. Global Ambient Screen Background */}
      <RomanticBackground />

      {/* 2. Interactive Heart Cursor Trails */}
      <HeartCursor />

      {/* 3. Floating Vintage Music Controller */}
      <MusicController 
        isPlaying={musicPlaying} 
        setIsPlaying={setMusicPlaying} 
        audioRef={audioRef} 
      />

      {/* 4. Top Micro Navigation Tracker Bar (rendered starting on Stage 1 Welcome) */}
      {stage > JourneyStage.LANDING && (
        <header className="z-30 w-full max-w-5xl mx-auto px-4 pt-16 md:pt-6">
          <div className="glassmorphism p-3 rounded-2xl flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 shadow-lg border-white/20 select-none">
            {/* Logo heading */}
            <div 
              onClick={() => jumpToStage(JourneyStage.WELCOME)}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <Heart className="w-5 h-5 text-luxury-accent fill-luxury-rose group-hover:scale-110 transition-transform animate-heart-beat" />
              <span className="font-serif text-lg text-white font-bold tracking-wider select-none">
                Journey Through Time
              </span>
            </div>

            {/* Pagination Bullet indicators */}
            <nav className="flex items-center space-x-1.5 sm:space-x-2.5 overflow-x-auto max-w-full py-1 px-2">
              {Array.from({ length: 8 }).map((_, index) => {
                const target = index + 1; // 1 to 8
                const isActive = stage === target;
                const completed = stage > target;
                
                const names = [
                  "Welcome", "Timeline", "Gallery", "Birthday Girl", "Cake Wish", "Love Letter", "Promises", "Finale"
                ];

                return (
                  <button
                    key={target}
                    onClick={() => jumpToStage(target)}
                    title={names[index]}
                    className={`h-2.5 rounded-full transition-all duration-300 relative group truncate shrink-0 ${isActive ? "bg-luxury-accent w-9 shadow-[0_0_8px_rgba(255,183,197,0.5)]" : completed ? "bg-rose-400 w-2.5" : "bg-white/20 hover:bg-white/40 w-2.5"}`}
                  >
                    {/* Tiny responsive tooltip hover label */}
                    <span className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-xs text-[9px] text-white/90 p-1 px-1.5 rounded-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-40 whitespace-nowrap">
                      {names[index]}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </header>
      )}

      {/* 5. Stage Viewer Canvas Router viewports */}
      <main className="flex-1 w-full flex items-center justify-center z-10 py-10 px-4 md:px-6 relative">
        <div className="w-full max-w-5xl flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ opacity: 0, x: 20, rotateY: -10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -20, rotateY: 10 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full flex items-center justify-center"
              style={{ perspective: 1000 }}
            >
              ```tsx
{stage === JourneyStage.LANDING && (
  <div className="w-full max-w-2xl glassmorphism p-10 rounded-3xl text-center shadow-2xl border-white/20 animate-fade-in flex flex-col items-center select-none py-14">
    
    <div className="relative w-40 h-40 flex items-center justify-center mb-8">
      {/* Layered pulsating glowing heart loops */}
      <div className="absolute inset-0 bg-[#5C0029]/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute w-32 h-32 text-[#ff477e] fill-[#ff477e]/20 animate-heart-beat">
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      <Sparkles className="absolute text-yellow-300 w-8 h-8 animate-sparkle-spin" />
    </div>

    <h1 className="text-3xl md:text-5xl font-serif text-white font-black leading-tight tracking-wide mb-6 max-w-3xl">
      Every Love Story is Beautiful...
      <br />
      But Ours Is My Favorite. ❤️
    </h1>

    <p className="text-base md:text-lg text-white/90 leading-8 max-w-xl mb-10 px-6">
      This isn't just our anniversary.
      It's another year of choosing each other,
      laughing together, growing together,
      and creating memories I'll cherish forever.
    </p>

    <button
      onClick={() => {
        triggerMusicStart();
        advanceStage();
      }}
      id="begin-journey-btn"
      className="px-10 py-4 rounded-full bg-gradient-to-r from-[#5C0029] via-[#850045] to-[#ff477e] hover:scale-105 active:scale-95 text-white font-bold tracking-widest text-sm uppercase shadow-[0_4px_25px_rgba(255,10,84,0.5)] transition-all animate-heart-beat"
    >
      Let's Relive Our Story ❤️
    </button>
  </div>
)}
```

             
              {/* STAGE 1: Welcome and dedicated congrats section */}
              {stage === JourneyStage.WELCOME && (
                <div className="w-full max-w-xl glassmorphism p-8 rounded-3xl text-center shadow-2xl relative border-white/20 animate-fade-in flex flex-col items-center select-none py-10">
                  
                  {/* Central glowing heart decoration */}
                  <div className="w-20 h-20 bg-rose-500/20 rounded-full border border-rose-300/20 flex items-center justify-center mb-6 animate-heart-beat">
                    <Heart className="w-10 h-10 text-rose-500 fill-current" />
                  </div>

                  <h2 className="text-2xl md:text-4xl font-serif text-white leading-snug tracking-wide mb-6 select-text font-black">
                    To The Girl Who Changed My Life ❤️
                  </h2>

                  <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-luxury-accent to-transparent mb-6" />

                  <p className="text-sm md:text-base text-white/95 leading-relaxed bg-black/15 p-5 rounded-2xl border border-white/5 shadow-inner mb-8 text-center select-text font-medium">
                    "Some people spend their whole lives<br />
                   searching for happiness.

<br /><br />
                   I found mine the day I found you.

<br /><br />
                  Thank you for every smile,<br />
every laugh,<br />
every late-night conversation,<br />
and every beautiful memory we've created together.<br />
<br />This little journey is my way of saying...<br />
I love you more than words can ever express. ❤️
</p>

                  <button
                    onClick={advanceStage}
                    id="begin-welcome-btn"
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#5C0029] to-[#850045] hover:scale-105 active:scale-95 text-white font-semibold text-xs md:text-sm tracking-widest uppercase shadow-[0_4px_20px_rgba(255,71,126,0.3)] transition-all"
                  >
                    ✨ Begin Our Journey ✨
                  </button>
                </div>
              )}

              {/* STAGE 2: Love Story Timeline Section */}
              {stage === JourneyStage.TIMELINE && <TimelineSection />}

              {/* STAGE 3: Polaroid Photo Gallery Slideshow */}
              {stage === JourneyStage.GALLERY && <GallerySection />}

              {/* STAGE 4: Birthday Girl Section */}
              {stage === JourneyStage.BIRTHDAY_GIRL && (
                <BirthdayGirlSection onNext={advanceStage} />
              )}

              {/* STAGE 5: Animated Birthday Cake Blowing Interaction */}
              {stage === JourneyStage.CAKE && <CakeSection />}

              {/* STAGE 6: Unfolding Hearts Wax Seal Love Letter */}
              {stage === JourneyStage.LETTER && <LetterSection />}

              {/* STAGE 7: Future Promises Flipping Bento Grid */}
              {stage === JourneyStage.PROMISES && <PromisesSection />}

              {/* STAGE 8: Grand Finale Fireworks and Hearts explosion */}
              {stage === JourneyStage.FINALE && (
                <FinaleSection onTriggerMusic={triggerMusicStart} />
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* 6. Footer and Bottom Navigation Controls */}
      <footer className="z-30 w-full max-w-5xl mx-auto px-4 pb-6 pt-2">
        
        {/* Navigation Action Buttons (Previous & Next control row) only shown if not on Landing page */}
        {stage > JourneyStage.LANDING && (
          <div className="flex items-center justify-between space-x-4 mb-4 select-none">
            <button
              onClick={regressStage}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-semibold tracking-wider transition-all duration-300 active:scale-95 hover:shadow-lg disabled:opacity-40 disabled:pointer-events-none"
              disabled={stage === JourneyStage.WELCOME}
              id="back-journey-btn"
            >
              <ChevronLeft className="w-4 h-4 text-luxury-accent" />
              <span>⬅ Previous</span>
            </button>

            {stage < JourneyStage.FINALE && (
              <button
                onClick={advanceStage}
                className="flex items-center space-x-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-[#850045] hover:opacity-90 border border-white/10 text-white text-xs font-semibold tracking-wider transition-all duration-300 active:scale-95 hover:shadow-[0_4px_15px_rgba(255,71,126,0.3)]"
                id="next-journey-btn"
              >
                <span>Next ➜</span>
                <ChevronRight className="w-4 h-4 text-luxury-accent" />
              </button>
            )}
          </div>
        )}

        {/* Romantic signature line in footer */}
        <div className="text-center pt-2 border-t border-white/10 flex flex-col items-center justify-center space-y-1">
          <p className="text-[10px] md:text-xs text-white/50 tracking-widest font-semibold uppercase flex items-center justify-center space-x-1 font-sans select-text">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current animate-heart-beat shrink-0 inline" />
            <span>for You, My Love Forever</span>
          </p>
          <p className="text-[9px] text-white/30 font-mono tracking-wide select-none">
            © 2026 Love Infinite Studio • Journey Through Time
          </p>
        </div>
      </footer>
    </div>
  );
}
