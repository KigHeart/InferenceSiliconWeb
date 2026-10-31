import React from 'react';

interface CallToActionProps {
  onOpenRegister: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onOpenRegister }) => {
  return (
    <section className="bg-gradient-to-r from-[#0a1931] via-[#0f254e] to-[#1e3a8a] text-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Secure your pass for Accra
            </h2>
            <p className="text-base text-white/90">
              Passes are confirmed on payment. Early-bird rates close 15 January 2027.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onOpenRegister}
              className="px-8 py-3.5 text-base font-bold text-[#0a1931] bg-white hover:bg-[#eff6ff] rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
            >
              Register now
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
