import React, { useState } from 'react';
import { Gem, Zap, Users, MessageSquareQuote, ChevronDown, ChevronUp } from 'lucide-react';
import { AFRICA_ADVANTAGES } from '../data/forumData';

export const AfricaAdvantage: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getIcon = (id: string) => {
    switch (id) {
      case 'minerals':
        return <Gem className="w-6 h-6 text-[#9c2049]" />;
      case 'power':
        return <Zap className="w-6 h-6 text-[#9c2049]" />;
      case 'people':
        return <Users className="w-6 h-6 text-[#9c2049]" />;
      case 'languages':
        return <MessageSquareQuote className="w-6 h-6 text-[#9c2049]" />;
      default:
        return <Gem className="w-6 h-6 text-[#9c2049]" />;
    }
  };

  return (
    <section className="py-12 pb-24 bg-[#faf7f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Kicker */}
        <div className="mb-8 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-[#82163b]">
            AFRICA’S ADVANTAGE
          </span>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AFRICA_ADVANTAGES.map((adv) => {
            const isExpanded = expandedId === adv.id;
            return (
              <div 
                key={adv.id}
                className="bg-white rounded-2xl p-7 border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-left group"
              >
                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#fae8ee] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    {getIcon(adv.id)}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-stone-900 mb-3 tracking-tight">
                    {adv.title}
                  </h3>

                  {/* Description from PDF */}
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {adv.description}
                  </p>

                  {/* Expandable deeper info */}
                  {isExpanded && (
                    <p className="mt-4 pt-4 border-t border-stone-100 text-xs text-stone-500 leading-relaxed animate-fadeIn">
                      {adv.details}
                    </p>
                  )}
                </div>

                {/* Subtle affordance for deeper context */}
                <div className="mt-6 pt-3">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : adv.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#82163b] hover:text-[#540921] transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? 'Less' : 'Learn more'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
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
