import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { PROGRAMME_DAYS } from '../data/forumData';

interface ProgrammeProps {
  onOpenFullProgramme: (initialDayIndex?: number) => void;
}

export const Programme: React.FC<ProgrammeProps> = ({ onOpenFullProgramme }) => {
  return (
    <section id="programme" className="py-20 lg:py-28 bg-[#091122] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Kicker */}
        <div className="mb-4 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-[#60a5fa]">
            THE PROGRAMME
          </span>
        </div>

        {/* Section Header with "See the full programme" link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Three days, Wednesday to Friday
          </h2>

          <button
            onClick={() => onOpenFullProgramme(0)}
            className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-white/90 hover:text-white underline underline-offset-4 decoration-blue-400 hover:decoration-white transition-all cursor-pointer group"
          >
            <span>See the full programme</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-blue-400" />
          </button>
        </div>

        {/* 3 Day Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 text-left">
          {PROGRAMME_DAYS.map((day, idx) => (
            <div 
              key={idx}
              className="bg-[#0f1f3d]/90 border border-blue-900/60 rounded-2xl p-7 flex flex-col justify-between hover:border-blue-600/60 transition-all group shadow-xl"
            >
              <div>
                {/* Date header */}
                <div className="flex items-baseline gap-3 pb-6 border-b border-blue-900/60 mb-6">
                  <span className="text-4xl sm:text-5xl font-black text-[#38bdf8] font-mono-numbers">
                    {day.dayNumber}
                  </span>
                  <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-blue-200/80">
                    MARCH · {day.dayName}
                  </span>
                </div>

                {/* Sub-themes / Tracks */}
                <div className="space-y-8">
                  {day.subThemes.map((sub, sIdx) => (
                    <div key={sIdx} className="space-y-2">
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                        {sub.title}
                      </h3>
                      <p className="text-sm text-stone-300 leading-relaxed font-normal">
                        {sub.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* View Schedule Button */}
              <div className="mt-8 pt-5 border-t border-white/10">
                <button
                  onClick={() => onOpenFullProgramme(idx)}
                  className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span>Day {day.dayNumber} Agenda ({day.sessions.length} sessions)</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
