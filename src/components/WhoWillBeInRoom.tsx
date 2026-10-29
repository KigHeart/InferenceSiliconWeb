import React from 'react';
import { WHO_IN_THE_ROOM } from '../data/forumData';

export const WhoWillBeInRoom: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#faf7f7] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Kicker */}
        <div className="mb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#82163b]">
            WHO WILL BE IN THE ROOM
          </span>
        </div>

        {/* Title & Introduction */}
        <div className="max-w-4xl mb-14 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-stone-900 tracking-tight leading-tight">
            Capital, silicon, minerals and policy, together
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
            By invitation and open registration. We are inviting leading chip architects, hardware founders, funds, cloud operators, miners, energy producers and policymakers from Africa and around the world, alongside the investors and builders who register to attend.
          </p>
        </div>

        {/* 6 Category Items (3 cols x 2 rows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHO_IN_THE_ROOM.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-7 border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-stone-900 mb-2.5 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 text-[13px] text-stone-500 font-medium">
                <span className="text-[#82163b] font-semibold">Key agenda:</span> {item.focus}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
