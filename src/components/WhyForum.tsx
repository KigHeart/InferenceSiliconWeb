import React from 'react';

export const WhyForum: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#faf7f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Kicker */}
        <div className="mb-6 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-[#82163b]">
            WHY THIS FORUM, AND WHY NOW
          </span>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start text-left">
          
          {/* Main Thesis */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-stone-900 tracking-tight leading-[1.15] text-balance">
              Inference is decided by silicon. Africa has what silicon needs.
            </h2>
          </div>

          {/* Context & Argument */}
          <div className="lg:col-span-7 space-y-6 text-stone-700 text-base sm:text-lg leading-relaxed">
            <p>
              AI demand is shifting from training models to running them, and in inference the winners are decided by cost per query, energy and latency, all of which come down to silicon.
            </p>
            <p>
              Africa supplies many of the minerals chips and batteries depend on, has vast clean-energy potential and the world’s youngest continental population, yet captures very little of the value in AI hardware. This forum asks how that changes, and where investors can back it.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
