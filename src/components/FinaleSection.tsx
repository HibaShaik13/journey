import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Heart } from "lucide-react";

interface EndHeart {
  id: number;
  left: string;
  size: number;
  delay: string;
  duration: string;
  drift: string;
  rotation: string;
}

export default function FinaleSection({ 
  onTriggerMusic 
}: { 
  onTriggerMusic: () => void 
}) {
  const [activated, setActivated] = useState(false);
  const [hearts, setHearts] = useState<EndHeart[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleActivation = () => {
    setActivated(true);
    onTriggerMusic(); // Play/unmute sound

    // Generate massive floating hearts
    const generated: EndHeart[] = Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 95}%`,
      size: Math.random() * 25 + 12, // larger hearts
      delay: `${Math.random() * 4}s`,
      duration: `${Math.random() * 8 + 6}s`, // fast rising
      drift: `${(Math.random() * 240) - 120}px`,
      rotation: `${Math.random() * 360}deg`,
    }));
    setHearts(generated);
  };

  // High-Performance Canvas Fireworks algorithm
  useEffect(() => {
    if (!activated) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      size: number;
      gravity: number;
      decay: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const speed = Math.random() * 6 + 2;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.color = color;
        this.size = Math.random() * 3 + 1.5;
        this.gravity = 0.05;
        this.decay = Math.random() * 0.015 + 0.01;
      }

      update() {
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.globalAlpha = this.alpha;
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    class Firework {
      x: number;
      y: number;
      tx: number;
      ty: number;
      vx: number;
      vy: number;
      particles: Particle[];
      exploded: boolean;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = height;
        this.tx = Math.random() * width;
        this.ty = Math.random() * (height * 0.5) + 50;
        const dy = this.ty - this.y;
        const dx = this.tx - this.x;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = Math.random() * 12 + 10;
        this.vx = (dx / distance) * speed;
        this.vy = (dy / distance) * speed;
        this.particles = [];
        this.exploded = false;

        const colors = ["#ff477e", "#ff85a1", "#ff0a54", "#7209b7", "#4cc9f0", "#ffd166"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        if (!this.exploded) {
          this.x += this.vx;
          this.y += this.vy;
          if (this.vy >= 0 || this.y <= this.ty) {
            this.exploded = true;
            this.explode();
          }
        } else {
          this.particles.forEach((p) => p.update());
          this.particles = this.particles.filter((p) => p.alpha > 0);
        }
      }

      explode() {
        for (let i = 0; i < 70; i++) {
          this.particles.push(new Particle(this.x, this.y, this.color));
        }
      }

      draw(c: CanvasRenderingContext2D) {
        if (!this.exploded) {
          c.save();
          c.fillStyle = this.color;
          c.beginPath();
          c.arc(this.x, this.y, 3, 0, Math.PI * 2);
          c.fill();
          c.restore();
        } else {
          this.particles.forEach((p) => p.draw(c));
        }
      }
    }

    const fireworks: Firework[] = [];

    const loop = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.25)"; // Tail shadows
      ctx.fillRect(0, 0, width, height);

      // Randomly spawn rockets
      if (Math.random() < 0.05 && fireworks.length < 15) {
        fireworks.push(new Firework());
      }

      fireworks.forEach((fw, idx) => {
        fw.update();
        fw.draw(ctx);
        // Clean finished fireworks
        if (fw.exploded && fw.particles.length === 0) {
          fireworks.splice(idx, 1);
        }
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [activated]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 font-sans text-white py-4 relative flex flex-col items-center">
      {/* Absolute fullscreen overlay canvas for sparkly firework blossoms */}
      {activated && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-30 w-full h-full"
        />
      )}

      {/* Infinite rising hearts container */}
      {activated && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-25">
          {hearts.map((h) => (
            <svg
              key={h.id}
              className="absolute text-rose-600/40 fill-rose-500/30"
              style={{
                left: h.left,
                width: h.size,
                height: h.size,
                animationName: "floatSlow",
                animationDuration: h.duration,
                animationDelay: h.delay,
                animationIterationCount: "infinite",
                animationTimingFunction: "linear",
                bottom: "-10%",
                "--drift": h.drift,
                "--rotation": h.rotation,
              } as React.CSSProperties}
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ))}
        </div>
      )}

      {/* Core Letter paper styling for final text */}
      <div className="text-center w-full max-w-lg mb-10">
        <h2 className="text-5xl md:text-7xl font-serif text-white tracking-wide mb-3 drop-shadow-md select-none">
          And This Story Continues... ❤️
        </h2>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-luxury-accent to-transparent mx-auto mb-6" />
      </div>

      <div className="w-full max-w-xl glassmorphism-dark p-6 md:p-8 rounded-3xl border border-white/20 shadow-2xl relative text-center z-10 select-text">
        <blockquote className="font-serif text-lg md:text-2xl text-pink-200 tracking-wide leading-relaxed mb-6 whitespace-pre-line">
          Happy Birthday, My Love 🎂
          Happy Love Anniversary ❤️
        </blockquote>

        <p className="text-xs md:text-sm text-white/80 leading-relaxed mb-5">
          Thank you for being the most beautiful part of my life.
        </p>

        <p className="text-xs md:text-sm text-white/80 leading-relaxed mb-5">
          Every smile,<br />
          every conversation,<br />
          every memory,<br />
          and every moment with you has made my world brighter.
        </p>

        <p className="text-xs md:text-sm text-white/80 leading-relaxed mb-5">
          This website may end here,<br />
          but our story doesn't.
        </p>

        <p className="text-xs md:text-sm text-white/80 leading-relaxed mb-5">
          Here's to more birthdays,<br />
          more anniversaries,<br />
          more adventures,<br />
          and a lifetime of beautiful memories.
        </p>

        <p className="font-serif text-lg md:text-xl text-pink-200 whitespace-pre-line leading-relaxed border-t border-white/10 pt-5 mt-5">
          You are my favorite hello,<br />
          my happiest memory,<br />
          and my sweetest forever.
        </p>

        <h4 className="text-xl md:text-2xl font-serif text-rose-500 font-medium tracking-widest uppercase mt-4">
          I Love You. Forever and Always. ❤️✨
        </h4>

        {/* Story Continuation trigger button */}
        <div className="mt-8 flex flex-col items-center">
          {!activated ? (
            <button
              onClick={handleActivation}
              id="our-story-continues-btn"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-[#850045] hover:scale-105 transform transition-all active:scale-95 text-white font-semibold text-sm md:text-base tracking-widest shadow-[0_4px_25px_rgba(255,10,84,0.6)] animate-heart-beat flex items-center justify-center space-x-2"
            >
              <span>❤️ Our Story Continues...</span>
            </button>
          ) : (
            <div className="animate-fade-in flex flex-col items-center space-y-6 pt-2 w-full">
              
              {/* Elegant floating Couple Portrait Panel */}
              <div className="relative w-full max-w-sm mx-auto mb-2 overflow-hidden rounded-2xl border-2 border-rose-500/40 shadow-[0_0_35px_rgba(244,63,94,0.5)] bg-[#2D001E]/60 p-2.5 transform hover:scale-105 transition-all duration-500 group">
                {/* Floating soft golden glow sparkles details */}
                <div className="absolute top-2 left-2 animate-pulse z-10">
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                </div>
                <div className="absolute bottom-2 right-2 animate-pulse delay-300 z-10">
                  <Sparkles className="w-5 h-5 text-yellow-300 animate-sparkle-spin" />
                </div>

                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800"
                    alt="The Beautiful Couple"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle vignette layer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Micro text inside visual */}
                  <div className="absolute bottom-3 left-0 right-0 text-center px-4">
                    <p className="font-serif text-white text-sm md:text-base tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-bold">
                      Together, Hand in Hand ❤️
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-10 py-5 rounded-2xl bg-white/10 border-2 border-rose-500/40 animate-pulse text-2xl md:text-4xl font-serif text-white tracking-widest shadow-[0_0_30px_rgba(244,63,94,0.6)]">
                Forever & Always ❤️
              </div>
              <p className="text-[10px] text-pink-200/80 uppercase tracking-widest font-semibold pt-1">
                🎆 The skies burst with our love! 🎇
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
