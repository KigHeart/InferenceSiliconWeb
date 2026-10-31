import React from 'react';
import { FORUM_CONFIG } from '../data/forumData';

export const Conveners: React.FC = () => {
  return (
    <section className="bg-white border-b border-stone-200/80 py-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 lg:gap-20">
          
          {/* Label */}
          <div className="shrink-0">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
              CONVENED BY
            </span>
          </div>

          {/* Conveners items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 flex-1">
            {FORUM_CONFIG.conveners.map((convener, idx) => (
              <div key={idx} className="flex flex-col text-left">
                <span className="text-base font-bold text-stone-900">
                  {convener.name}
                </span>
                <span className="text-xs sm:text-sm text-stone-600 font-medium">
                  {convener.role}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
