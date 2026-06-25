import React, { useEffect, useState } from "react";

interface CursorHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  createdAt: number;
  color: string;
}

const HEART_COLORS = [
  "rgba(255, 10, 84, 0.7)",   // romantic-red
  "rgba(255, 71, 126, 0.7)",  // romantic-rose
  "rgba(255, 133, 161, 0.7)", // romantic-pink
  "rgba(114, 9, 183, 0.6)",   // romantic-purple
];

export default function HeartCursor() {
  const [hearts, setHearts] = useState<CursorHeart[]>([]);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let heartId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate distance from last heart spawn to prevent spamming
      const dx = e.clientX - lastPos.x;
      const dy = e.clientY - lastPos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Only spawn heart if user has moved at least 35px
      if (dist > 35) {
        const size = Math.random() * 12 + 8; // 8px to 20px
        const rotation = Math.random() * 60 - 30; // -30deg to 30deg
        const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];

        const newHeart: CursorHeart = {
          id: heartId++,
          x: e.clientX,
          y: e.clientY,
          size,
          rotation,
          createdAt: Date.now(),
          color,
        };

        setHearts((prev) => [...prev.slice(-30), newHeart]); // Keep at most 30 hearts for performance
        setLastPos({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Dynamic cleanup poll every 100ms
    const interval = setInterval(() => {
      const now = Date.now();
      setHearts((prev) => prev.filter((h) => now - h.createdAt < 800));
    }, 100);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, [lastPos]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
      {hearts.map((heart) => {
        const age = Date.now() - heart.createdAt;
        const opacity = Math.max(0, 1 - age / 800);
        const scale = 1 + (age / 800) * 0.5;
        const translateY = -(age / 800) * 80; // Rise up 80px as it fades

        return (
          <svg
            key={heart.id}
            className="absolute"
            style={{
              left: heart.x - heart.size / 2,
              top: heart.y - heart.size / 2,
              width: heart.size,
              height: heart.size,
              transform: `translate3d(0px, ${translateY}px, 0px) scale(${scale}) rotate(${heart.rotation}deg)`,
              opacity: opacity,
              filter: "drop-shadow(0 2px 4px rgba(255, 71, 126, 0.3))",
              transition: "transform 10ms linear, opacity 10ms linear",
            }}
            viewBox="0 0 24 24"
          >
            <path
              fill={heart.color}
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        );
      })}
    </div>
  );
}
