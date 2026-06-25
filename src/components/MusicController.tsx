import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Music, Heart } from "lucide-react";

interface Track {
  name: string;
  artist: string;
  url: string;
}

const ROMANTIC_TRACKS: Track[] = [
  {
    name: "romantic bgm",
    artist: "Gentle Romantic Instrumental",
    url: "/music/lovetone.mp3",
  },
  {
    name: "Eppudaina bgm",
    artist: "Acoustic Melody & Echoes",
    url: "/music/eppudaina_music.mp3",
  },
  {
    name: "romantic music",
    artist: "Piano Soft Serenade",
    url: "/music/romantic_music.mp3",
  },
  
];

interface MusicControllerProps {
  isPlaying: boolean;
  setIsPlaying: (val: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export default function MusicController({ isPlaying, setIsPlaying, audioRef }: MusicControllerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.25); // low volume by default as requested
  const [isMuted, setIsMuted] = useState(false);
  const [showTracks, setShowTracks] = useState(false);

  const currentTrack = ROMANTIC_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted, audioRef]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Autoplay blocked or audio load error:", err);
      });
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0) setIsMuted(false);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleTrackSelect = (idx: number) => {
    setCurrentTrackIndex(idx);
    setShowTracks(false);
    setIsPlaying(false);
    
    // Quick load and play
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => console.log("Audio play deferred", err));
      }
    }, 100);
  };

  return (
    <div className="fixed top-4 right-4 z-40 select-none font-sans">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        loop
        preload="auto"
      />

      <div className="glassmorphism p-3 rounded-2xl flex flex-col items-stretch space-y-2 shadow-lg backdrop-blur-md max-w-xs border-white/20 text-white transition-all duration-300">
        <div className="flex items-center space-x-3">
          {/* Heart Beat disk */}
          <div 
            onClick={handlePlayPause}
            className={`cursor-pointer w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#5C0029] to-rose-400 shadow-md relative ${isPlaying ? "animate-spin" : ""}`}
            style={{ animationDuration: "14s" }}
          >
            <Heart className="w-5 h-5 text-white fill-current" />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ffb7c5]"></span>
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0 pr-1">
            <h4 className="text-xs font-semibold truncate uppercase tracking-widest text-[#ffb7c5]">
              {currentTrack.name}
            </h4>
            <p className="text-[10px] text-white/75 truncate italic">
              {currentTrack.artist}
            </p>
          </div>

          {/* Simple controls */}
          <div className="flex items-center space-x-1">
            <button
              onClick={handlePlayPause}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors active:scale-95 cursor-pointer"
              id="music-play-btn"
              title={isPlaying ? "Pause Music" : "Play Music"}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-[#ffb7c5]" /> : <Play className="w-4 h-4 text-white" />}
            </button>
            <button
              onClick={handleToggleMute}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors active:scale-95 cursor-pointer"
              title="Toggle Mute"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-[#ffb7c5]" />
              ) : (
                <Volume2 className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Dancing Visualizer Sub-bars */}
        {isPlaying && (
          <div className="flex items-end justify-center space-x-0.5 h-3 px-1">
            {[...Array(12)].map((_, i) => {
              const randDur = `${0.4 + Math.random() * 0.5}s`;
              return (
                <div
                  key={i}
                  className="w-0.5 bg-[#ffb7c5] rounded-full"
                  style={{
                    height: `${Math.random() * 100}%`,
                    animation: `flameFlicker ${randDur} infinite alternate ease-in-out`,
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Volume slider & track chooser toggler */}
        <div className="flex items-center justify-between space-x-2 pt-1 border-t border-white/10">
          <div className="flex items-center space-x-2 flex-1">
            <span className="text-[9px] text-white/50 font-mono">VOL</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#ffb7c5]"
            />
          </div>
          
          <button
            onClick={() => setShowTracks(!showTracks)}
            className="flex items-center space-x-1 p-1 px-2 rounded-full hover:bg-white/10 text-[9px] font-semibold text-[#ffb7c5] tracking-wide transition-all border border-white/10 cursor-pointer"
          >
            <Music className="w-2.5 h-2.5" />
            <span>SONGS</span>
          </button>
        </div>

        {/* Tracks List Pop-down */}
        {showTracks && (
          <div className="bg-black/60 border border-white/10 rounded-xl p-1 max-h-40 overflow-y-auto mt-1 space-y-0.5">
            {ROMANTIC_TRACKS.map((t, index) => (
              <button
                key={index}
                onClick={() => handleTrackSelect(index)}
                className={`w-full text-left p-1.5 rounded-lg text-[10px] truncate transition-colors flex items-center justify-between cursor-pointer ${currentTrackIndex === index ? "bg-white/15 text-[#ffb7c5] font-medium" : "hover:bg-white/5 text-white/70"}`}
              >
                <span>{t.name}</span>
                {currentTrackIndex === index && <Heart className="w-2.5 h-2.5 fill-current text-[#ffb7c5]" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
