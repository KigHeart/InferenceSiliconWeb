import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenRegister: () => void;
  onOpenProgramme: () => void;
  onOpenVenueFaq: () => void;
  onOpenPartner: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenRegister,
  onOpenProgramme,
  onOpenVenueFaq,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0f254e] text-white border-b border-[#9c274d]/40 shadow-xs backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Zone 1: Logo & Brand Identity */}
          <a href="#" className="flex items-center gap-3.5 group text-left shrink-0">
            {/* Silicon Chip Emblem */}
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#9c2049] to-[#600f2a] border border-[#d6698b]/40 flex items-center justify-center p-1.5 shadow-inner group-hover:border-white/60 transition-colors">
              <svg viewBox="0 0 40 40" className="w-full h-full stroke-white/90 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* Outer pins */}
                <path d="M12 4v4 M20 4v4 M28 4v4" />
                <path d="M12 32v4 M20 32v4 M28 32v4" />
                <path d="M4 12h4 M4 20h4 M4 28h4" />
                <path d="M32 12h4 M32 20h4 M32 28h4" />
                {/* Chip Package */}
                <rect x="8" y="8" width="24" height="24" rx="2" className="stroke-white" />
                {/* Inner Core */}
                <rect x="14" y="14" width="12" height="12" rx="1" className="fill-[#e2829c]/20 stroke-[#e2829c]" />
                <circle cx="20" cy="20" r="2" className="fill-white" />
              </svg>
            </div>
            
            {/* Title & Sub-line */}
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
                Inference Silicon Forum
              </span>
              <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-white/80 uppercase">
                ACCRA · 3–5 MARCH 2027
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/90">
            <button
              onClick={onOpenProgramme}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              Programme
            </button>
            <a
              href="#partners"
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              Partners
            </a>
            <button
              onClick={onOpenVenueFaq}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              Venue & FAQ
            </button>
          </nav>

          {/* Zone 3: Primary CTA (Register) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenRegister}
              className="px-6 py-2.5 text-sm font-semibold text-[#0f254e] bg-white hover:bg-[#eff6ff] rounded-full shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
            >
              Register
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={onOpenRegister}
              className="px-4 py-1.5 text-xs font-semibold text-[#0f254e] bg-white rounded-full"
            >
              Register
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white/90 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#6b102f] border-t border-white/10 px-4 pt-3 pb-5 space-y-3">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenProgramme();
            }}
            className="block w-full text-left py-2 text-base font-medium text-white"
          >
            Programme
          </button>
          <a
            href="#partners"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-left py-2 text-base font-medium text-white"
          >
            Partners
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenVenueFaq();
            }}
            className="block w-full text-left py-2 text-base font-medium text-white"
          >
            Venue & FAQ
          </button>
        </div>
      )}
    </header>
  );
};
