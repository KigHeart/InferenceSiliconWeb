import React, { useMemo, useState } from 'react';
import { Play, Box, Sparkles, RefreshCw } from 'lucide-react';
import { FORUM_CONFIG } from '../data/forumData';
import heroPhotoUrl from '../assets/images/hero_silicon_inference_1793309657830.jpg';
import { SiliconVisualizer3D } from './SiliconVisualizer3D';

interface HeroProps {
  onOpenRegister: () => void;
  onOpenPartner: () => void;
  onOpenVideo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister, onOpenPartner, onOpenVideo }) => {
  const [viewMode, setViewMode] = useState<'schematic' | 'three3d'>('three3d');

  const { daysToEvent, daysToEarlyBird } = useMemo(() => {
    return {
      daysToEvent: 125,
      daysToEarlyBird: 79,
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0a1931] text-white pt-12 pb-20 lg:pt-16 lg:pb-24">
      
      {/* Background High-Fidelity Silicon Photo with Deep Royal Blue Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroPhotoUrl}
          alt="Advanced Inference Silicon Wafer and Processor Architecture"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-25 mix-blend-luminosity scale-105"
        />
        {/* Measured Deep Royal Blue Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1931] via-[#0f254e]/95 to-[#172554]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1931] via-transparent to-transparent opacity-90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography, Tag, Description, CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Edition Kicker Pill */}
            <div className="inline-block">
              <span className="inline-flex items-center px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-blue-200 bg-blue-900/40 border border-blue-500/30 rounded-full shadow-2xs backdrop-blur-sm">
                1ST EDITION · ACCRA, GHANA
              </span>
            </div>

            {/* Forum Title in Refined Geometric Typography */}
            <h1 className="text-4xl sm:text-5xl xl:text-[54px] font-extrabold tracking-tight text-white leading-[1.08] text-balance">
              ADVANCED <br className="hidden sm:inline" />
              INFERENCE SILICON <br className="hidden sm:inline" />
              INVESTORS FORUM
            </h1>

            {/* Dates in Royal Ice-Blue */}
            <div className="text-2xl sm:text-3xl font-bold text-blue-300 tracking-tight">
              3–5 March 2027
            </div>

            {/* Sub-headline description */}
            <p className="text-base sm:text-lg text-blue-100/90 max-w-xl font-normal leading-relaxed">
              Three days on AI inference hardware, and on what Africa can build with the resources it already has.
            </p>

            {/* CTAs matching PDF + Video Play Trigger */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onOpenRegister}
                className="px-7 py-3 text-sm sm:text-base font-bold text-[#0a1931] bg-white hover:bg-blue-50 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              >
                Register now
              </button>

              <button
                onClick={onOpenPartner}
                className="px-6 py-3 text-sm sm:text-base font-semibold text-white bg-blue-950/60 hover:bg-blue-900/80 border border-blue-400/40 rounded-full transition-all cursor-pointer whitespace-nowrap"
              >
                Partner with the forum
              </button>

              <button
                onClick={onOpenVideo}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-blue-200 hover:text-white bg-white/5 hover:bg-white/10 border border-blue-400/30 rounded-full transition-all cursor-pointer whitespace-nowrap"
              >
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-xs">
                  <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>

            {/* Countdown / Milestone Stat Box in Deep Royal Blue */}
            <div className="pt-2">
              <div className="w-full max-w-lg bg-[#0f254e]/80 backdrop-blur-md border border-blue-600/40 rounded-2xl p-4.5 flex items-center justify-between text-left shadow-xl">
                
                {/* Left Stat: Days to opening plenary */}
                <div className="flex items-baseline gap-3 pr-4 border-r border-blue-700/50">
                  <span className="text-4xl sm:text-5xl font-extrabold font-mono-numbers text-white tracking-tight">
                    {daysToEvent}
                  </span>
                  <span className="text-xs sm:text-sm text-blue-200 leading-snug">
                    days to the opening <br />
                    plenary
                  </span>
                </div>

                {/* Right Stat: Early bird deadline */}
                <div className="pl-4 space-y-0.5">
                  <div className="text-xs font-semibold text-blue-300 uppercase tracking-wide">
                    Early bird
                  </div>
                  <div className="text-sm font-medium text-white/95">
                    closes in <span className="font-bold text-blue-200">{daysToEarlyBird}</span> days
                  </div>
                  <div className="text-xs text-blue-300/70 font-mono-numbers">
                    15 Jan 2027
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Three.js Hardware View or 2D Schematic */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-end space-y-4">
            
            {/* View Mode Toggle Bar (3D Interactive vs 2D Die Schematic) */}
            <div className="flex items-center gap-2 bg-[#0f254e] border border-blue-700/50 p-1.5 rounded-full text-xs font-semibold shadow-lg">
              <button
                onClick={() => setViewMode('three3d')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  viewMode === 'three3d'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-blue-300 hover:text-white'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>Three.js 3D Silicon</span>
              </button>

              <button
                onClick={() => setViewMode('schematic')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  viewMode === 'schematic'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-blue-300 hover:text-white'
                }`}
              >
                <span>2D Die Vector</span>
              </button>
            </div>

            {/* Display either 3D Three.js Interactive Component or 2D Die Schematic */}
            {viewMode === 'three3d' ? (
              <div className="w-full">
                <SiliconVisualizer3D isHeroEmbedded={true} />
              </div>
            ) : (
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center group bg-[#0f254e]/50 border border-blue-800/60 rounded-3xl p-6 shadow-2xl">
                
                {/* Subtle ambient back-glow */}
                <div className="absolute inset-4 bg-blue-600/20 blur-2xl rounded-full pointer-events-none" />

                {/* Vector Microchip in Royal Blue Palette */}
                <svg 
                  viewBox="0 0 320 320" 
                  className="w-full h-full drop-shadow-2xl relative z-10"
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer Pin lines - Top */}
                  <line x1="100" y1="20" x2="100" y2="60" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="130" y1="20" x2="130" y2="60" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="160" y1="20" x2="160" y2="60" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="190" y1="20" x2="190" y2="60" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="220" y1="20" x2="220" y2="60" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Outer Pin lines - Bottom */}
                  <line x1="100" y1="260" x2="100" y2="300" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="130" y1="260" x2="130" y2="300" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="160" y1="260" x2="160" y2="300" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="190" y1="260" x2="190" y2="300" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="220" y1="260" x2="220" y2="300" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Outer Pin lines - Left */}
                  <line x1="20" y1="100" x2="60" y2="100" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="20" y1="130" x2="60" y2="130" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="20" y1="160" x2="60" y2="160" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="20" y1="190" x2="60" y2="190" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="20" y1="220" x2="60" y2="220" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Outer Pin lines - Right */}
                  <line x1="260" y1="100" x2="300" y2="100" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="260" y1="130" x2="300" y2="130" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="260" y1="160" x2="300" y2="160" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="260" y1="190" x2="300" y2="190" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="260" y1="220" x2="300" y2="220" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Outer Chip Package Boundary */}
                  <rect 
                    x="60" 
                    y="60" 
                    width="200" 
                    height="200" 
                    rx="6" 
                    stroke="#3b82f6" 
                    strokeWidth="3.5" 
                    fill="#0f254e" 
                    fillOpacity="0.8"
                  />

                  {/* Inner Silicon Die Boundary */}
                  <rect 
                    x="96" 
                    y="96" 
                    width="128" 
                    height="128" 
                    rx="4" 
                    stroke="#60a5fa" 
                    strokeWidth="2" 
                    strokeDasharray="4 2"
                    fill="#0a1931"
                    fillOpacity="0.9"
                  />

                  {/* Circuit Traces */}
                  <path 
                    d="M120 145 H145 V170 H180 V140" 
                    stroke="#93c5fd" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                  />
                  <path 
                    d="M195 185 H165 V200 H135" 
                    stroke="#93c5fd" 
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
                    fill="#1e3a8a" 
                    stroke="#bfdbfe" 
                    strokeWidth="2"
                  />
                  <circle cx="160" cy="160" r="5" fill="#ffffff" />
                </svg>

                <button
                  onClick={onOpenVideo}
                  title="Play Forum Video Preview"
                  className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-xl border border-white/40 transform hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};
