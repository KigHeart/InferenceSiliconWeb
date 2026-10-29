import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ChevronLeft, ChevronRight, Handshake, MapPin, Sparkles, UserCheck, Pause, Play } from 'lucide-react';
import { ATTENDEE_SPOTLIGHTS } from '../data/forumData';
import { AttendeeSpotlight as AttendeeType } from '../types';

interface AttendeeSpotlightProps {
  onConnectAttendee: (attendee: AttendeeType) => void;
  onViewProgramme: () => void;
}

export const AttendeeSpotlight: React.FC<AttendeeSpotlightProps> = ({
  onConnectAttendee,
  onViewProgramme,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const categories = ['All', 'Speaker', 'Investor', 'Architect', 'Policy & Industry'];

  // Filter attendees
  const filteredAttendees = useMemo(() => {
    if (selectedCategory === 'All') return ATTENDEE_SPOTLIGHTS;
    return ATTENDEE_SPOTLIGHTS.filter((a) => a.category === selectedCategory);
  }, [selectedCategory]);

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  // Max index bounds: calculate how many cards visible
  // On desktop we display up to 3 cards per view, so maxIndex = filteredAttendees.length - 1
  const maxIndex = Math.max(0, filteredAttendees.length - 1);

  // Auto-play interval
  useEffect(() => {
    if (isAutoPlaying && filteredAttendees.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, maxIndex, filteredAttendees.length]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-stone-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Section Kicker */}
        <div className="mb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#82163b]">
            ATTENDEE & SPEAKER SPOTLIGHT
          </span>
        </div>

        {/* Section Header & Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Pioneers, Investors & Architects in Accra
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              Meet the chip architects, sovereign fund partners, and industrial leaders gathering to build Africa’s semiconductor inference economy.
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Play/Pause Auto-scroll */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              title={isAutoPlaying ? 'Pause carousel auto-rotation' : 'Resume carousel auto-rotation'}
              className="p-2.5 rounded-full border border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-400 bg-stone-50 transition-colors cursor-pointer"
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous attendee"
              className="p-2.5 rounded-full border border-stone-200 text-stone-700 hover:text-white hover:bg-[#82163b] hover:border-[#82163b] transition-all cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              aria-label="Next attendee"
              className="p-2.5 rounded-full border border-stone-200 text-stone-700 hover:text-white hover:bg-[#82163b] hover:border-[#82163b] transition-all cursor-pointer shadow-2xs"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#82163b] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              {cat === 'All' ? 'All Profiles' : cat}
            </button>
          ))}
        </div>

        {/* Carousel Viewport Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
        >
          {/* Track */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1))}%)`,
              }}
            >
              {filteredAttendees.map((attendee) => (
                <div 
                  key={attendee.id}
                  className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3"
                >
                  <div className="h-full bg-[#faf7f7] rounded-2xl p-7 border border-stone-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group text-left">
                    
                    <div>
                      {/* Top Header: Category Tag & Deal Room Badge */}
                      <div className="flex items-center justify-between gap-2 mb-5">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-stone-200/80 text-stone-700">
                          {attendee.category}
                        </span>

                        {attendee.dealRoomParticipant && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#fae8ee] text-[#82163b] border border-[#f3d9df]">
                            <Handshake className="w-3 h-3" />
                            <span>Deal Room</span>
                          </span>
                        )}
                      </div>

                      {/* Avatar Lockup with Initials */}
                      <div className="flex items-center gap-4 mb-4">
                        <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-lg text-white shadow-sm shrink-0"
                          style={{ backgroundColor: attendee.accentColor || '#82163b' }}
                        >
                          {attendee.initials}
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-stone-900 tracking-tight group-hover:text-[#82163b] transition-colors leading-snug">
                            {attendee.name}
                          </h3>
                          <div className="text-xs font-semibold text-stone-700">
                            {attendee.title}
                          </div>
                          <div className="text-xs text-stone-500 font-medium">
                            {attendee.company}
                          </div>
                        </div>
                      </div>

                      {/* Location marker */}
                      <div className="flex items-center gap-1 text-xs text-stone-500 mb-3">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>{attendee.location}</span>
                      </div>

                      {/* Bio */}
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-5">
                        {attendee.bio}
                      </p>

                      {/* Key Topics */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {attendee.keyTopics.map((topic, tIdx) => (
                          <span 
                            key={tIdx}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-stone-200/80 text-stone-600 font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onConnectAttendee(attendee)}
                        className="text-xs font-bold text-[#82163b] hover:text-[#540921] transition-colors cursor-pointer"
                      >
                        Schedule 1-to-1 Meeting
                      </button>

                      <button
                        onClick={onViewProgramme}
                        className="text-xs text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
                      >
                        View Sessions
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Pagination Dots & Progress */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {filteredAttendees.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(dotIdx);
                }}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === dotIdx
                    ? 'w-6 bg-[#82163b]'
                    : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>

          <div className="text-xs text-stone-500 font-mono-numbers">
            Showing <strong className="text-stone-900">{currentIndex + 1}</strong> of{' '}
            <strong className="text-stone-900">{filteredAttendees.length}</strong> featured profiles
          </div>
        </div>

      </div>
    </section>
  );
};
