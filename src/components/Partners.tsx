import React from 'react';
import { Sparkles, Handshake, Cpu } from 'lucide-react';

interface PartnersProps {
  onOpenPartnerModal: (tier?: 'headline' | 'platinum' | 'gold' | 'exhibitor' | 'custom') => void;
}

export const Partners: React.FC<PartnersProps> = ({ onOpenPartnerModal }) => {
  return (
    <section id="partners" className="py-20 lg:py-28 bg-[#f0f7ff] border-b border-[#dbeafe]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Section Kicker */}
        <div className="mb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1d4ed8]">
            OUR PARTNERS
          </span>
        </div>

        {/* Header Row: Title & "Become a partner" Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Back the forum. Be seen by the room.
          </h2>

          <button
            onClick={() => onOpenPartnerModal('custom')}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-[#1e3a8a] hover:bg-[#0f254e] rounded-full shadow-md hover:shadow-lg transition-all self-start sm:self-auto cursor-pointer"
          >
            Become a partner
          </button>
        </div>

        {/* Convening Organisations */}
        <div className="mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
            CONVENING ORGANISATIONS
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Tilil Engineering Group */}
            <div className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-2xs flex items-center gap-4 hover:border-[#1d4ed8]/40 transition-all">
              <div className="w-12 h-12 rounded-lg bg-[#dbeafe] text-[#1e3a8a] flex items-center justify-center font-black text-xl tracking-tighter">
                †¡L!L
              </div>
              <div>
                <div className="text-lg font-bold text-stone-900 leading-tight">
                  TILIL ENGINEERING GROUP
                </div>
                <div className="text-xs text-stone-500 font-medium">
                  Hardware engineering, energy & semiconductor ventures · Kapsabet, Kenya
                </div>
              </div>
            </div>

            {/* Nelix Chip Design */}
            <div className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-2xs flex items-center gap-4 hover:border-[#1d4ed8]/40 transition-all">
              <div className="w-12 h-12 rounded-lg bg-[#dbeafe] text-[#1e3a8a] flex items-center justify-center font-bold text-lg">
                <Cpu className="w-6 h-6 text-[#1e3a8a]" />
              </div>
              <div>
                <div className="text-lg font-bold text-stone-900 leading-tight">
                  NELIX CHIP DESIGN
                </div>
                <div className="text-xs text-stone-500 font-medium">
                  Edge AI architectures, RISC-V processors & custom silicon · Accra, Ghana
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Headline Partner Slot */}
        <div className="mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
            HEADLINE PARTNER
          </div>

          <div className="bg-white/90 rounded-xl p-7 border-2 border-dashed border-stone-300 text-center flex flex-col sm:flex-row items-center justify-center gap-2 hover:border-[#1d4ed8] hover:bg-white transition-all">
            <span className="text-sm sm:text-base text-stone-700">
              Open: naming rights and the opening keynote slot.
            </span>
            <button
              onClick={() => onOpenPartnerModal('headline')}
              className="text-sm sm:text-base font-bold text-[#1d4ed8] hover:underline cursor-pointer"
            >
              Enquire
            </button>
          </div>
        </div>

        {/* Platinum, Gold, Exhibitors Slots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Platinum */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              PLATINUM PARTNERS
            </div>
            <button
              onClick={() => onOpenPartnerModal('platinum')}
              className="w-full bg-white/90 rounded-xl py-8 px-4 border-2 border-dashed border-stone-300 text-center text-sm font-medium text-stone-500 hover:text-[#1d4ed8] hover:border-[#1d4ed8] hover:bg-white transition-all cursor-pointer block"
            >
              Open slot
            </button>
          </div>

          {/* Gold */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              GOLD PARTNERS
            </div>
            <button
              onClick={() => onOpenPartnerModal('gold')}
              className="w-full bg-white/90 rounded-xl py-8 px-4 border-2 border-dashed border-stone-300 text-center text-sm font-medium text-stone-500 hover:text-[#1d4ed8] hover:border-[#1d4ed8] hover:bg-white transition-all cursor-pointer block"
            >
              Open slot
            </button>
          </div>

          {/* Exhibitors */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              EXHIBITORS
            </div>
            <button
              onClick={() => onOpenPartnerModal('exhibitor')}
              className="w-full bg-white/90 rounded-xl py-8 px-4 border-2 border-dashed border-stone-300 text-center text-sm font-medium text-stone-500 hover:text-[#1d4ed8] hover:border-[#1d4ed8] hover:bg-white transition-all cursor-pointer block"
            >
              Open slot
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
