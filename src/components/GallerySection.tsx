import React, { useState } from "react";
import { Heart, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface PolaroidPhoto {
  id: number;
  src: string;
  caption: string;
  date: string;
  tilt: string;
}

const PHOTOS: PolaroidPhoto[] = [
  {
    id: 1,
    src: "/src/assets/images/pic1.png",
    caption: "Watching our dreams blend with the golden sunset sky. ❤️",
    tilt: "group-hover:-rotate-2 rotate-1",
  },
  {
    id: 2,
    src: "/src/assets/images/pic2.png",
    caption: "Every glance between us tells a story that words never could. ❤️",
    tilt: "group-hover:rotate-3 -rotate-1",
  },
  {
    id: 3,
    src: "/src/assets/images/pic3.png",
    caption: "Side by side, hand in hand, every path feels right with you. ❤️",
    tilt: "group-hover:-rotate-3 -rotate-2",
  },
  {
    id: 4,
    src: "/src/assets/images/image.png",
    caption: "Hand in hand, promise in promise, through every phase. ❤️",

    tilt: "group-hover:rotate-2 rotate-2",
  },
];

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? PHOTOS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === PHOTOS.length - 1 ? 0 : prev + 1));
  };

  const currentPhoto = PHOTOS[activeIndex];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 font-sans text-white py-4">
      {/* Heading block */}
      <div className="text-center mb-10">
        <h2 className="text-5xl md:text-7xl font-serif text-white tracking-wide mb-3 drop-shadow-md select-none">
          Memories That Still Make Me Smile 📸
        </h2>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-luxury-accent to-transparent mx-auto mb-5" />
        
        <p className="text-xs md:text-sm text-luxury-accent/80 max-w-xl mx-auto uppercase tracking-widest font-light">
          "Every single picture here holds a small whisper of a perfect yesterday."
        </p>
      </div>

      {/* Main Slideshow viewport */}
      <div className="relative max-w-lg mx-auto mb-10 group">
        {/* Navigation arrows absolute controls inside the deck */}
        <button
          onClick={prevSlide}
          className="absolute left-[-20px] sm:left-[-40px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all duration-300 transform active:scale-90"
          id="gallery-prev"
        >
          <ChevronLeft className="w-6 h-6 text-luxury-accent" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-[-20px] sm:right-[-40px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all duration-300 transform active:scale-90"
          id="gallery-next"
        >
          <ChevronRight className="w-6 h-6 text-luxury-accent" />
        </button>

        {/* Polaroid Card frame - Premium Wedding invitation style */}
        <div 
          className={`bg-white text-slate-800 p-5 pb-8 rounded-sm shadow-2xl transition-all duration-500 transform ${currentPhoto.tilt} hover:scale-[1.02]`}
        >
          {/* Photo area */}
          <div className="relative aspect-square w-full overflow-hidden bg-rose-50 border border-slate-100 rounded-sm">
            <img
              src={currentPhoto.src}
              alt={currentPhoto.caption}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            
            {/* Glowing heart badge in corner */}
            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm p-1.5 px-3.5 rounded-full flex items-center space-x-1.5 shadow-md">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-current animate-heart-beat" />
              <span className="text-[10px] font-bold font-mono text-slate-700">{currentPhoto.date}</span>
            </div>
          </div>

          {/* Polaroid pen writing area */}
          <div className="mt-6 text-center px-2">
            <p className="font-serif text-2xl md:text-3xl text-slate-800 leading-tight italic">
              {currentPhoto.caption}
            </p>
            <div className="flex items-center justify-center space-x-1 mt-4 text-slate-400">
              <Sparkles className="w-3 h-3 text-luxury-rose animate-spin" style={{ animationDuration: "8s" }} />
              <span className="text-[9px] uppercase tracking-widest font-semibold font-sans">Chapter Page {activeIndex + 1} of {PHOTOS.length}</span>
              <Sparkles className="w-3 h-3 text-luxury-rose animate-spin" style={{ animationDuration: "8s" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="flex justify-center space-x-2.5 mb-10">
        {PHOTOS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === idx ? "bg-luxury-accent w-6 shadow-[0_0_8px_rgba(255,183,197,0.5)]" : "bg-white/25 hover:bg-white/50"}`}
          />
        ))}
      </div>

      {/* Ending caption line */}
      <div className="text-center pt-4 border-t border-white/5 max-w-md mx-auto">
        <p className="text-sm md:text-base italic text-luxury-accent font-serif">
          "Some memories fade with time, but ours only grow more radiant. ❤️"
        </p>
      </div>
    </div>
  );
}
