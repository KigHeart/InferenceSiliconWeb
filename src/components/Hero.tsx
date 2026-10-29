import React, { useMemo } from 'react';
import { Play } from 'lucide-react';
import { FORUM_CONFIG } from '../data/forumData';
import heroPhotoUrl from '../assets/images/hero_silicon_inference_1793309657830.jpg';

interface HeroProps {
  onOpenRegister: () => void;
  onOpenPartner: () => void;
  onOpenVideo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister, onOpenPartner, onOpenVideo }) => {
  // Calibrated forum countdown numbers matching PDF
  const { daysToEvent, daysToEarlyBird } = useMemo(() => {
    return {
      daysToEvent: 125,
      daysToEarlyBird: 79,
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#781335] text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      
      {/* Background High-Fidelity Silicon Photo with Measured Rich Burgundy Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroPhotoUrl}
          alt="Advanced Inference Silicon Wafer and Processor Architecture"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105"
        />
        {/* Measured Scrim Gradient ensuring WCAG AA contrast for text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#82163b] via-[#781335]/95 to-[#4e0821]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#4e0821] via-transparent to-transparent opacity-80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography, Tag, Description, CTAs */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Edition Kicker Pill */}
            <div className="inline-block">
              <span className="inline-flex items-center px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-white/95 bg-white/10 border border-white/20 rounded-full shadow-2xs backdrop-blur-sm">
                1ST EDITION · ACCRA, GHANA
              </span>
            </div>

            {/* Forum Title in Refined Geometric Typography */}
            <h1 className="text-4xl sm:text-5xl xl:text-[56px] font-extrabold tracking-tight text-white leading-[1.08] text-balance">
              ADVANCED <br className="hidden sm:inline" />
              INFERENCE SILICON <br className="hidden sm:inline" />
              INVESTORS FORUM
            </h1>

            {/* Dates in Rose tone */}
            <div className="text-2xl sm:text-3xl font-bold text-[#fbcfe8] tracking-tight">
              3–5 March 2027
            </div>

            {/* Sub-headline description */}
            <p className="text-base sm:text-lg text-white/90 max-w-2xl font-normal leading-relaxed">
              Three days on AI inference hardware, and on what Africa can build with the resources it already has.
            </p>

            {/* CTAs matching PDF + Video Play Trigger */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenRegister}
                className="px-7 py-3 text-sm sm:text-base font-semibold text-[#82163b] bg-white hover:bg-[#fff0f4] rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              >
                Register now
              </button>

              <button
                onClick={onOpenPartner}
                className="px-7 py-3 text-sm sm:text-base font-semibold text-white bg-transparent hover:bg-white/10 border border-white/40 rounded-full transition-all cursor-pointer whitespace-nowrap"
              >
                Partner with the forum
              </button>

              {/* Watch Video Teaser Button */}
              <button
                onClick={onOpenVideo}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#fbcfe8] hover:text-white bg-white/5 hover:bg-white/15 border border-white/20 rounded-full transition-all cursor-pointer whitespace-nowrap"
              >
                <div className="w-5 h-5 rounded-full bg-[#f43f5e] flex items-center justify-center text-white shadow-xs">
                  <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>

          </div>

          {/* Right Column: Silicon Schematic, Video Teaser & Countdown Matrix */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end space-y-8">
            
            {/* Silicon Chip Vector Illustration matching the PDF diagram with Video Play Option */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center group">
              
              {/* Subtle ambient back-glow */}
              <div className="absolute inset-4 bg-[#b52656]/30 blur-2xl rounded-full pointer-events-none" />

              {/* Vector Microchip from PDF */}
              <svg 
                viewBox="0 0 320 320" 
                className="w-full h-full drop-shadow-2xl relative z-10"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer Pin lines - Top */}
                <line x1="100" y1="20" x2="100" y2="60" stroke="#f497b4" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="130" y1="20" x2="130" y2="60" stroke="#f497b4" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="160" y1="20" x2="160" y2="60" stroke="#f497b4" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="190" y1="20" x2="190" y2="60" stroke="#f497b4" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="220" y1="20" x2="220" y2="60" stroke="#f497b4" strokeWidth="2.5" strokeLinecap="round" />

                {/* Outer Pin lines - Bottom */}
                <line x1="100" y1="260" x2="100" y2="300" stroke="#f497b4" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="130" y1="260" x2="130" y2="300" stroke="#f497b4" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="160" y1="260" x2="160" y2="300" stroke="#f497b4" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="190" y1="260" x2="190" y2="300" stroke="#f497b4" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="220" y1="260" x2="220" y2="300" stroke="#f497b4" strokeWidth="2.5" strokeLinecap="round" />

                {/* Outer Pin lines - Left */}
                <line x1="20" y1="100" x2="60" y2="100" stroke="#f497b4" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="20" y1="130" x2="60" y2="130" stroke="#f497b4" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="20" y1="160" x2="60" y2="160" stroke="#f497b4" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="20" y1="190" x2="60" y2="190" stroke="#f497b4" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="20" y1="220" x2="60" y2="220" stroke="#f497b4" strokeWidth="2.5" strokeLinecap="round" />

                {/* Outer Pin lines - Right */}
                <line x1="260" y1="100" x2="300" y2="100" stroke="#f497b4" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="260" y1="130" x2="300" y2="130" stroke="#f497b4" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="260" y1="160" x2="300" y2="160" stroke="#f497b4" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="260" y1="190" x2="300" y2="190" stroke="#f497b4" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="260" y1="220" x2="300" y2="220" stroke="#f497b4" strokeWidth="2.5" strokeLinecap="round" />

                {/* Outer Chip Package Boundary */}
                <rect 
                  x="60" 
                  y="60" 
                  width="200" 
                  height="200" 
                  rx="6" 
                  stroke="#f8a2bc" 
                  strokeWidth="3.5" 
                  fill="#781335" 
                  fillOpacity="0.45"
                />

                {/* Inner Silicon Die Boundary */}
                <rect 
                  x="96" 
                  y="96" 
                  width="128" 
                  height="128" 
                  rx="4" 
                  stroke="#f497b4" 
                  strokeWidth="2" 
                  strokeDasharray="4 2"
                  fill="#5c0e27"
                  fillOpacity="0.6"
                />

                {/* Circuit Traces & Nodes inside Die */}
                <path 
                  d="M120 145 H145 V170 H180 V140" 
                  stroke="#fbcfe8" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  className="circuit-pulse"
                />
                <path 
                  d="M195 185 H165 V200 H135" 
                  stroke="#fbcfe8" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                />

                {/* Gold Connection Nodes */}
                <circle cx="120" cy="145" r="4" fill="#fde047" stroke="#92400e" strokeWidth="1" />
                <circle cx="145" cy="170" r="3.5" fill="#fde047" stroke="#92400e" strokeWidth="1" />
                <circle cx="180" cy="140" r="4.5" fill="#fde047" stroke="#92400e" strokeWidth="1" />
                <circle cx="195" cy="185" r="4" fill="#fde047" stroke="#92400e" strokeWidth="1" />
                <circle cx="135" cy="200" r="3.5" fill="#fde047" stroke="#92400e" strokeWidth="1" />

                {/* Center Core Accelerator Block */}
                <rect 
                  x="142" 
                  y="142" 
                  width="36" 
                  height="36" 
                  rx="3" 
                  fill="#9e1c47" 
                  stroke="#fbcfe8" 
                  strokeWidth="2"
                />
                <circle cx="160" cy="160" r="5" fill="#ffffff" />
              </svg>

              {/* Clickable Video Play Overlay in Center of Chip */}
              <button
                onClick={onOpenVideo}
                title="Play Forum Video Preview"
                className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-[#82163b]/90 text-white flex items-center justify-center shadow-xl border border-white/40 transform hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
              </button>

            </div>

            {/* Countdown / Milestone Stat Box exactly from PDF */}
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex items-center justify-between text-left shadow-lg">
              
              {/* Left Stat: Days to opening plenary */}
              <div className="flex items-baseline gap-3 pr-4 border-r border-white/20">
                <span className="text-4xl sm:text-5xl font-extrabold font-mono-numbers text-white tracking-tight">
                  {daysToEvent}
                </span>
                <span className="text-xs sm:text-sm text-white/95 leading-snug">
                  days to the opening <br />
                  plenary
                </span>
              </div>

              {/* Right Stat: Early bird deadline */}
              <div className="pl-4 space-y-0.5">
                <div className="text-xs font-semibold text-[#fbcfe8] uppercase tracking-wide">
                  Early bird
                </div>
                <div className="text-sm font-medium text-white/95">
                  closes in <span className="font-bold text-white">{daysToEarlyBird}</span> days
                </div>
                <div className="text-xs text-white/75 font-mono-numbers">
                  15 Jan 2027
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
