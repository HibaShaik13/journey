import React, { useEffect, useState } from "react";

interface FloatingItem {
  id: number;
  left: string;
  top?: string;
  size: number;
  delay: string;
  duration: string;
  drift: string;
  rotation: string;
  type: "heart" | "petal" | "bokeh" | "star";
  opacity: number;
}

export default function RomanticBackground() {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    const generatedItems: FloatingItem[] = [];
    
    // Tiny floating hearts (very few to maintain luxury/premium feel)
    for (let i = 0; i < 6; i++) {
      generatedItems.push({
        id: i,
        left: `${15 + Math.random() * 70}%`, // Keep more centered
        size: Math.random() * 12 + 6, // smaller size: 6px to 18px
        delay: `${Math.random() * 5}s`,
        duration: `${Math.random() * 16 + 18}s`, // very slow: 18s to 34s
        drift: `${(Math.random() * 60) - 30}px`,
        rotation: `${Math.random() * 180}deg`,
        type: "heart",
        opacity: Math.random() * 0.25 + 0.15,
      });
    }

    // Drifting classic rose petals (also very few and slow)
    for (let i = 0; i < 8; i++) {
      generatedItems.push({
        id: i + 100,
        left: `${Math.random() * 95}%`,
        size: Math.random() * 10 + 6,
        delay: `${Math.random() * 8}s`,
        duration: `${Math.random() * 20 + 20}s`, // 20s to 40s
        drift: `${(Math.random() * 120) - 60}px`,
        rotation: `${Math.random() * 360}deg`,
        type: "petal",
        opacity: Math.random() * 0.3 + 0.15,
      });
    }

    // Soft Bokeh Background Lights
    for (let i = 0; i < 12; i++) {
      generatedItems.push({
        id: i + 200,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 120 + 40, // 40px to 160px
        delay: `${Math.random() * 4}s`,
        duration: `${Math.random() * 8 + 8}s`,
        drift: "0px",
        rotation: "0deg",
        type: "bokeh",
        opacity: Math.random() * 0.08 + 0.04,
      });
    }

    // Sparkling elegant stars
    for (let i = 0; i < 15; i++) {
      generatedItems.push({
        id: i + 300,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 90}%`,
        size: Math.random() * 5 + 3, // tiny bright star
        delay: `${Math.random() * 10}s`,
        duration: `${Math.random() * 5 + 4}s`,
        drift: "0px",
        rotation: "0deg",
        type: "star",
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    setItems(generatedItems);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none love-gradient-bg">
      {/* Cinematic Aurora Colors with slow waving motion */}
      <div 
        className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen pointer-events-none filter blur-[150px] opacity-[0.4]"
        style={{
          background: "radial-gradient(circle, rgba(92,0,41,0.5) 0%, rgba(0,0,0,0) 70%)",
          animation: "auroraFlow 25s infinite ease-in-out alternate",
        }}
      />
      <div 
        className="absolute -bottom-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full mix-blend-screen pointer-events-none filter blur-[180px] opacity-[0.35]"
        style={{
          background: "radial-gradient(circle, rgba(255,183,197,0.15) 0%, rgba(92,0,41,0.6) 50%, rgba(0,0,0,0) 70%)",
          animation: "auroraFlow 35s infinite ease-in-out alternate-reverse",
        }}
      />
      <div 
        className="absolute top-[30%] left-[40%] w-[40vw] h-[40vw] rounded-full mix-blend-screen pointer-events-none filter blur-[130px] opacity-[0.25]"
        style={{
          background: "radial-gradient(circle, rgba(45,0,30,0.8) 0%, rgba(92,0,41,0.3) 50%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* Render slow luxury elements */}
      {items.map((item) => {
        if (item.type === "heart") {
          return (
            <svg
              key={item.id}
              className="absolute text-luxury-accent fill-luxury-accent pointer-events-none"
              style={{
                left: item.left,
                width: item.size,
                height: item.size,
                animationName: "floatSlow",
                animationDuration: item.duration,
                animationDelay: item.delay,
                animationIterationCount: "infinite",
                animationTimingFunction: "linear",
                bottom: "-10%",
                opacity: item.opacity,
                filter: "drop-shadow(0 0 3px rgba(255,183,197,0.3))",
                "--drift": item.drift,
                "--rotation": item.rotation,
              } as React.CSSProperties}
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          );
        } else if (item.type === "petal") {
          return (
            <svg
              key={item.id}
              className="absolute text-luxury-rose fill-luxury-rose"
              style={{
                left: item.left,
                width: item.size,
                height: item.size * 1.3,
                animationName: "rosePetalFloat",
                animationDuration: item.duration,
                animationDelay: item.delay,
                animationIterationCount: "infinite",
                animationTimingFunction: "ease-in-out",
                top: "-10%",
                opacity: item.opacity,
                "--drift-x": item.drift,
                "--rot-z": item.rotation,
              } as React.CSSProperties}
              viewBox="0 0 100 100"
            >
              <path d="M 50 0 C 80 0, 100 30, 90 70 C 80 90, 50 100, 50 100 C 50 100, 20 90, 10 70 C 0 30, 20 0, 50 0 Z" />
            </svg>
          );
        } else if (item.type === "bokeh") {
          return (
            <div
              key={item.id}
              className="absolute rounded-full bg-radial from-luxury-accent/30 to-transparent blur-[30px]"
              style={{
                left: item.left,
                top: item.top,
                width: item.size,
                height: item.size,
                opacity: item.opacity,
                transform: "scale(1)",
                animation: "starryGlow 15s infinite ease-in-out",
                animationDelay: item.delay,
              }}
            />
          );
        } else {
          // Sparkle star
          return (
            <svg
              key={item.id}
              className="absolute text-white fill-white animate-star-glow"
              style={{
                left: item.left,
                top: item.top,
                width: item.size,
                height: item.size,
                opacity: item.opacity,
                animationDelay: item.delay,
              }}
              viewBox="0 0 24 24"
            >
              <path d="M12 0l3.086 8.914L24 12l-8.914 3.086L12 24l-3.086-8.914L0 12l8.914-3.086z" />
            </svg>
          );
        }
      })}

      {/* Cinematic subtle grid scanline overlay for luxury tech aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:100%_4px] mix-blend-overlay opacity-30 pointer-events-none" />
    </div>
  );
}
