import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, User, ChevronRight, Download } from 'lucide-react';
import { PROGRAMME_DAYS } from '../data/forumData';

interface FullProgrammeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDayIndex?: number;
}

export const FullProgrammeModal: React.FC<FullProgrammeModalProps> = ({
  isOpen,
  onClose,
  initialDayIndex = 0,
}) => {
  const [activeDayIdx, setActiveDayIdx] = useState(initialDayIndex);

  if (!isOpen) return null;

  const activeDay = PROGRAMME_DAYS[activeDayIdx] || PROGRAMME_DAYS[0];

  const handleDownloadAgenda = () => {
    // Generate text/calendar summary
    const agendaText = PROGRAMME_DAYS.map((d) => `
=== ${d.date} (${d.dayName}) ===
Theme: ${d.themeTitle}
Tracks: ${d.subThemes.map((s) => s.title).join(' & ')}

Sessions:
${d.sessions.map((s) => `[${s.time}] ${s.title}\nLocation: ${s.location}\n${s.description}\n`).join('\n')}
    `).join('\n\n');

    const blob = new Blob([agendaText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Inference-Silicon-Forum-Accra-2027-Agenda.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-stone-900 text-white rounded-3xl shadow-2xl border border-white/10 overflow-hidden my-6 text-left flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-[#82163b] px-6 py-5 flex items-center justify-between shrink-0">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#fbcfe8]">
              COMPLETE FORUM AGENDA
            </span>
            <h2 className="text-xl font-extrabold text-white">
              Three Days in Accra: Wednesday to Friday
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadAgenda}
              title="Download text agenda"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white/90 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#f9a8d4]" />
              <span>Export Agenda</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Day Selector Tabs */}
        <div className="bg-stone-950/80 border-b border-white/10 px-6 py-3 flex gap-2 overflow-x-auto shrink-0">
          {PROGRAMME_DAYS.map((day, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDayIdx(idx)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer whitespace-nowrap ${
                activeDayIdx === idx
                  ? 'bg-[#82163b] text-white shadow-md'
                  : 'bg-white/5 text-stone-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="font-mono-numbers text-base">{day.dayNumber}</span>
              <span>{day.dayName}</span>
            </button>
          ))}
        </div>

        {/* Day Content Area (Scrollable) */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* Day Theme Banner */}
          <div className="bg-[#202024] p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#f59e0b]">
              <Calendar className="w-4 h-4" />
              <span>{activeDay.date} · {activeDay.dayName}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {activeDay.themeTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-stone-300">
              {activeDay.subThemes.map((st, i) => (
                <div key={i} className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                  <div className="font-bold text-white mb-0.5">{st.title}</div>
                  <div className="text-stone-400">{st.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sessions List */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Session Schedule
            </h4>

            {activeDay.sessions.map((session, sIdx) => (
              <div 
                key={sIdx}
                className="bg-[#202024]/60 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-start gap-4"
              >
                {/* Time & Room badge */}
                <div className="sm:w-48 shrink-0 space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold font-mono-numbers text-white bg-white/10 rounded-md">
                    <Clock className="w-3.5 h-3.5 text-[#f59e0b]" />
                    <span>{session.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-400">
                    <MapPin className="w-3.5 h-3.5 text-stone-500" />
                    <span className="truncate">{session.location}</span>
                  </div>
                </div>

                {/* Session Details */}
                <div className="flex-1 space-y-2">
                  <h5 className="text-base font-bold text-white">
                    {session.title}
                  </h5>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {session.description}
                  </p>

                  {session.speakers && (
                    <div className="pt-2 flex flex-wrap gap-2">
                      {session.speakers.map((spk, spkIdx) => (
                        <div 
                          key={spkIdx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-stone-300"
                        >
                          <User className="w-3 h-3 text-[#f9a8d4]" />
                          <span className="font-semibold text-white">{spk.name}</span>
                          <span className="text-stone-500">· {spk.company}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-stone-950 px-6 py-4 border-t border-white/10 flex items-center justify-between shrink-0">
          <span className="text-xs text-stone-400">
            Venue: {activeDayIdx === 2 ? 'Labadi Beach Grand Hall & AICC' : 'Accra International Conference Centre (AICC)'}
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 text-xs font-bold text-white bg-[#82163b] hover:bg-[#660f2c] rounded-full transition-colors cursor-pointer"
          >
            Close Agenda
          </button>
        </div>

      </div>
    </div>
  );
};
