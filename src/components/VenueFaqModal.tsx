import React, { useState } from 'react';
import { X, MapPin, Plane, Shield, HelpCircle, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { FAQS } from '../data/forumData';

interface VenueFaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VenueFaqModal: React.FC<VenueFaqModalProps> = ({ isOpen, onClose }) => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white text-stone-900 rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6 text-left flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#0f254e] text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#93c5fd]">
              LOGISTICS & DELEGATE INFORMATION
            </span>
            <h2 className="text-xl font-extrabold text-white">
              Venue, Travel & FAQ
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* Venue Cards */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              Official Venues in Accra, Ghana
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Venue 1 */}
              <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#dbeafe] flex items-center justify-center text-[#1e3a8a]">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-stone-900">
                  Accra International Conference Centre (AICC)
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Castle Road, Osu, Accra. Home to the Opening Plenary, Hardware Expo, and Technical Accelerators Track (3–4 March).
                </p>
                <div className="text-[11px] font-semibold text-[#1e3a8a]">
                  15 min from Kotoka International Airport (ACC)
                </div>
              </div>

              {/* Venue 2 */}
              <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#dbeafe] flex items-center justify-center text-[#1e3a8a]">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-stone-900">
                  Labadi Beach Hotel Grand Ballroom
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  No 1 Labadi Bypass, Accra. VIP Deal Room, Sovereign Capital Roundtables & Closing Accra Declaration Gala Dinner (5 March).
                </p>
                <div className="text-[11px] font-semibold text-[#1e3a8a]">
                  Private beachfront pavilion & bilateral meeting suites
                </div>
              </div>

            </div>
          </div>

          {/* Travel & Visa Section */}
          <div className="p-5 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-[#1e3a8a]">
              <Plane className="w-4 h-4" />
              <span>International Travel & Visa on Arrival</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              Ghana offers visa-free entry for all citizens of ECOWAS member states. For international delegates from North America, Europe, Asia, and other AU member countries, Ghana Immigration Service operates a streamlined e-Visa system and authorized Visa-on-Arrival upon issuance of our official conference delegate invitation dossier.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              Frequently Asked Questions
            </h3>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="border border-stone-200 rounded-xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 bg-white hover:bg-stone-50 transition-colors cursor-pointer"
                    >
                      <span className="text-sm font-bold text-stone-900">{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-stone-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 bg-stone-50/60 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-stone-50 px-6 py-4 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 text-xs font-bold text-white bg-[#1e3a8a] hover:bg-[#0f254e] rounded-full transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
