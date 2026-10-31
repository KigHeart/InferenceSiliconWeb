import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Film } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  posterImage: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, posterImage }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(32);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-stone-950 text-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden my-6 text-left animate-fadeIn">
        
        {/* Header */}
        <div className="bg-[#0f254e] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Film className="w-5 h-5 text-[#93c5fd]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                Accra 2027: Forum Preview & Silicon Vision
              </h3>
              <p className="text-xs text-white/80">
                Advanced Inference Silicon Investors Forum · 3–5 March 2027
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Screen Area */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
          
          {/* Background Poster Photo */}
          <img
            src={posterImage}
            alt="Advanced Inference Silicon Preview"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}
          />

          {/* Cinematic Dark Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 pointer-events-none" />

          {/* Central Play/Pause Watermark Overlay */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
          >
            <div className={`w-20 h-20 rounded-full bg-[#1e3a8a]/90 hover:bg-[#1e3a8a] text-white flex items-center justify-center shadow-2xl border-2 border-white/40 transform transition-all hover:scale-110 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
              {isPlaying ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white ml-1" />}
            </div>
          </button>

          {/* On-screen Title Overlay */}
          <div className="absolute top-6 left-6 right-6 flex items-start justify-between pointer-events-none">
            <div className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
              <span>Official Keynote Preview · 4K UHD</span>
            </div>

            <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-xs text-white/80 font-mono-numbers">
              01:14 / 03:45
            </div>
          </div>

          {/* Video Controls Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent space-y-3">
            
            {/* Scrubber / Progress Bar */}
            <div 
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newProgress = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
                setProgress(newProgress);
              }}
              className="w-full h-1.5 bg-white/20 hover:h-2.5 rounded-full cursor-pointer relative transition-all"
            >
              <div 
                className="h-full bg-gradient-to-r from-[#1d4ed8] to-[#38bdf8] rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md transform scale-0 group-hover:scale-100 transition-transform" />
              </div>
            </div>

            {/* Bottom Controls Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 text-white/90 hover:text-white transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 text-white/90 hover:text-white transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>

                <div className="text-xs text-stone-300 hidden sm:block">
                  <span className="text-white font-semibold">Chapter 2:</span> The Mineral-to-Silicon Gateway
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-stone-400 font-mono-numbers">
                  Accra, Ghana 2027
                </span>
                <button 
                  onClick={() => {
                    const el = document.documentElement;
                    if (!document.fullscreenElement) {
                      el.requestFullscreen?.().catch(() => {});
                    } else {
                      document.exitFullscreen?.().catch(() => {});
                    }
                  }}
                  className="p-1.5 text-white/80 hover:text-white cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Video Topics Bar */}
        <div className="p-5 bg-stone-900 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-300">
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <div className="font-bold text-white mb-0.5">01. The Inference Economy</div>
            <div>Cost per query vs training cluster economics.</div>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <div className="font-bold text-white mb-0.5">02. Critical Mineral Value</div>
            <div>Upstream lithium, cobalt and copper beneficiation.</div>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <div className="font-bold text-white mb-0.5">03. The Deal Room</div>
            <div>1-to-1 matchmaking between founders and sovereign funds.</div>
          </div>
        </div>

      </div>
    </div>
  );
};
