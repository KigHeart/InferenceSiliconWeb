import React from 'react';
import { PASSES } from '../data/forumData';
import { PassType } from '../types';

interface PassesPricingProps {
  onSelectPass: (passType: PassType) => void;
}

export const PassesPricing: React.FC<PassesPricingProps> = ({ onSelectPass }) => {
  return (
    <section id="passes" className="py-20 lg:py-28 bg-[#faf7f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Kicker */}
        <div className="mb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0f254e]">
            PASSES AND PRICING
          </span>
        </div>

        {/* Title & Currency Disclaimer */}
        <div className="max-w-3xl mb-12 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Early-bird rates close 15 January 2027
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            All prices in US dollars (USD). Your pass is confirmed when payment is received.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PASSES.map((pass) => {
            const isFeatured = pass.id === 'investor';

            return (
              <div
                key={pass.id}
                className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-200 ${
                  isFeatured
                    ? 'bg-[#0f254e] text-white shadow-xl ring-2 ring-[#1d4ed8] relative transform lg:-translate-y-2'
                    : 'bg-white text-stone-900 border border-stone-200/90 shadow-xs hover:shadow-md'
                }`}
              >
                <div>
                  
                  {/* Top line with title and badge if any */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className={`text-xl font-bold tracking-tight ${isFeatured ? 'text-white' : 'text-stone-900'}`}>
                      {pass.name}
                    </h3>
                    
                    {pass.badge && (
                      <span className="px-2.5 py-0.5 text-[10px] font-black tracking-wider uppercase bg-[#1d4ed8] text-white rounded-full border border-white/20 whitespace-nowrap">
                        {pass.badge}
                      </span>
                    )}
                  </div>

                  {/* Price display */}
                  <div className="mb-2">
                    <div className="text-2xl sm:text-3xl font-extrabold font-mono-numbers tracking-tight">
                      USD {pass.priceUSD.toLocaleString()}
                    </div>
                    <div className={`text-xs font-medium ${isFeatured ? 'text-[#93c5fd]' : 'text-stone-500'}`}>
                      {pass.rateLabel}
                    </div>
                  </div>

                  {/* Description from PDF */}
                  <p className={`text-sm leading-relaxed mt-4 pt-4 border-t ${
                    isFeatured ? 'border-white/20 text-white/90' : 'border-stone-100 text-stone-600'
                  }`}>
                    {pass.description}
                  </p>

                </div>

                {/* Bottom CTA Button */}
                <div className="mt-8 pt-4">
                  <button
                    onClick={() => onSelectPass(pass.id)}
                    className={`w-full py-2.5 px-4 text-xs font-semibold rounded-full transition-all cursor-pointer text-center ${
                      isFeatured
                        ? 'bg-white text-[#0f254e] hover:bg-[#eff6ff] shadow-md hover:shadow-lg'
                        : 'bg-transparent text-stone-800 border border-stone-300 hover:border-[#0f254e] hover:text-[#0f254e] hover:bg-[#eff6ff]/40'
                    }`}
                  >
                    {pass.ctaText}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
