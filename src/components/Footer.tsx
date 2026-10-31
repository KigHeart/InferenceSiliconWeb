import React from 'react';
import { ArrowUp } from 'lucide-react';
import { FORUM_CONFIG } from '../data/forumData';
import { SocialLinks } from './SocialLinks';

interface FooterProps {
  onOpenProgramme: () => void;
  onOpenPartners: () => void;
  onOpenVenueFaq: () => void;
  onOpenRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenProgramme,
  onOpenPartners,
  onOpenVenueFaq,
  onOpenRegister,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#161618] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Main 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          
          {/* Column 1: Forum Name, Edition & Social Network Presence */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xl font-extrabold text-white tracking-tight leading-snug">
              Advanced Inference Silicon <br />
              Investors Forum
            </h3>
            <p className="text-sm text-stone-400">
              {FORUM_CONFIG.edition} · {FORUM_CONFIG.dates}
            </p>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Accelerating African semiconductor leadership, critical mineral beneficiation, and sustainable inference infrastructure.
            </p>

            {/* Social Media Link Component */}
            <div className="pt-2 space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#93c5fd] block">
                Official Network & Channels
              </span>
              <SocialLinks layout="inline" />
            </div>
          </div>

          {/* Column 2: Forum Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#60a5fa]">
              FORUM
            </h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>
                <button 
                  onClick={onOpenProgramme}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Programme
                </button>
              </li>
              <li>
                <a 
                  href="#partners" 
                  onClick={onOpenPartners}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Partners
                </a>
              </li>
              <li>
                <button 
                  onClick={onOpenVenueFaq}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Venue & FAQ
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenRegister}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Register
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#60a5fa]">
              CONTACT
            </h4>
            <div className="space-y-2 text-sm text-stone-300">
              <div>
                <a 
                  href={`mailto:${FORUM_CONFIG.contact.email}`}
                  className="hover:text-white transition-colors block text-stone-200"
                >
                  {FORUM_CONFIG.contact.email}
                </a>
              </div>
              <div>
                <a 
                  href={`tel:${FORUM_CONFIG.contact.phone.replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors block text-stone-200 font-mono-numbers"
                >
                  {FORUM_CONFIG.contact.phone}
                </a>
              </div>
              <div className="text-stone-400 text-xs leading-relaxed pt-1">
                {FORUM_CONFIG.contact.address}
              </div>
            </div>
          </div>

          {/* Column 4: Convened By */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#60a5fa]">
              CONVENED BY
            </h4>
            <div className="space-y-3 text-sm text-stone-300">
              <div>
                <div className="font-semibold text-white">Kiprop Yego</div>
                <div className="text-xs text-stone-400">Chairman, Tilil Engineering Group</div>
              </div>
              <div>
                <div className="font-semibold text-white">Dr. Michael Apasiku</div>
                <div className="text-xs text-stone-400">Nelix Chip Design</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer, Socials & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            Programme, speakers and venue subject to confirmation. Prices in US dollars (USD).
          </p>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4 text-stone-400">
              <a 
                href="https://www.linkedin.com/company/inference-silicon-forum" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <span className="text-stone-700">·</span>
              <a 
                href="https://x.com/InferenceSilicon" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                X (Twitter)
              </a>
              <span className="text-stone-700">·</span>
              <a 
                href="https://github.com/inference-silicon-forum" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
