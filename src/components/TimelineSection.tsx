import React from "react";
import { TimelineEvent } from "../types";
import { Calendar, MessagesSquare, Heart, Sparkles, MapPin, Milestone } from "lucide-react";

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    date: "19 Febraury 2020",
    title: "The Day We First Met 🌸",
    description: "A simple hello became the beginning of something beautiful. Two separate paths met at a single point in time, and the world hasn't been the same since.",
    iconName: "met",
  },
  {
    date: "19 Febraury 2019",
    title: "Our First Conversation 💬",
    description: "Hours felt like minutes as we talked about everything and nothing. We shared hidden dreams, quiet thoughts, and endless smiles under a digital sky.",
    iconName: "talk",
  },
  {
    date: "18 April 2021",
    title: "Our First Date 🌹",
    description: "The day memories started becoming our favorite treasure. A beautiful spark that became a warm, glowing fire, lighting up our hearts.",
    iconName: "date",
  },
  {
    date: "30 June 2020",
    title: "Our First Love Anniversary ❤️",
    description: "A beautiful milestone celebrating how far we've come together, reinforcing the deep, quiet bond that links our souls in complete warmth.",
    iconName: "anniversary",
  },
  {
    date: "✨ Today",
    title: "Happy Birthday & Our Love Anniversary 🎉",
    description: "Another beautiful chapter added to our timeless, magical story. Celebrating your birth, and celebrating our unified hearts forever.",
    iconName: "today",
  },
];

export default function TimelineSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "met":
        return <Calendar className="w-6 h-6 text-pink-300" />;
      case "talk":
        return <MessagesSquare className="w-6 h-6 text-rose-300" />;
      case "date":
        return <MapPin className="w-6 h-6 text-rose-400" />;
      case "anniversary":
        return <Heart className="w-6 h-6 text-red-400 fill-current" />;
      default:
        return <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 font-sans text-white py-2 relative">
      <div className="text-center mb-14">
        {/* Unique heading as requested */}
        <h2 className="text-5xl md:text-7xl font-serif text-white tracking-wide mb-3 drop-shadow-md select-none">
          The Chapters of Us ❤️
        </h2>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-luxury-accent to-transparent mx-auto mb-5" />
        <p className="text-xs md:text-sm text-luxury-accent/80 max-w-lg mx-auto uppercase tracking-widest font-light">
          "Redefined in quiet places, grown in beautiful moments."
        </p>
      </div>

      {/* Spacious, luxury vertical layout of WIDE cards - NO thin cramped vertical box */}
      <div className="space-y-8 max-w-3xl mx-auto">
        {TIMELINE_EVENTS.map((event, index) => {
          return (
            <div 
              id={`timeline-event-${index}`}
              key={index} 
              className="relative group transition-all duration-300"
            >
              <div className="glassmorphism p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 relative overflow-hidden">
                
                {/* Left Luxury Icon Shield */}
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                  {getIcon(event.iconName)}
                </div>

                {/* Right Text Block (Fully Wide, no cutting of text) */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-luxury-accent transition-colors">
                      {event.title}
                    </h3>
                    <span className="inline-flex self-start sm:self-auto bg-white/15 text-luxury-accent text-[11px] font-semibold px-3 py-1 rounded-full tracking-wider font-mono border border-white/5">
                      {event.date}
                    </span>
                  </div>

                  <p className="text-white/80 text-sm md:text-base leading-relaxed font-light">
                    {event.description}
                  </p>
                </div>

                {/* Aesthetic visual accent lines */}
                <div className="absolute top-0 left-0 w-[4px] h-full bg-gradient-to-b from-luxury-accent/50 to-transparent group-hover:from-luxury-accent transition-all" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-14 py-6">
        <p className="text-sm md:text-base italic font-serif text-luxury-accent">
          "Every single chapter with you is my absolute favorite."
        </p>
      </div>
    </div>
  );
}
