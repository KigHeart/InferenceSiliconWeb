/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Conveners } from './components/Conveners';
import { WhyForum } from './components/WhyForum';
import { AfricaAdvantage } from './components/AfricaAdvantage';
import { Programme } from './components/Programme';
import { WhoWillBeInRoom } from './components/WhoWillBeInRoom';
import { AttendeeSpotlight } from './components/AttendeeSpotlight';
import { Partners } from './components/Partners';
import { PassesPricing } from './components/PassesPricing';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';

import { RegisterModal } from './components/RegisterModal';
import { PartnerModal } from './components/PartnerModal';
import { FullProgrammeModal } from './components/FullProgrammeModal';
import { VenueFaqModal } from './components/VenueFaqModal';
import { VideoModal } from './components/VideoModal';

import { PassType } from './types';
import heroPhotoUrl from './assets/images/hero_silicon_inference_1793309657830.jpg';

export default function App() {
  // Modal visibility states
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedPassType, setSelectedPassType] = useState<PassType>('investor');

  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [selectedPartnerTier, setSelectedPartnerTier] = useState<
    'headline' | 'platinum' | 'gold' | 'exhibitor' | 'custom'
  >('headline');

  const [isProgrammeOpen, setIsProgrammeOpen] = useState(false);
  const [initialDayIndex, setInitialDayIndex] = useState(0);

  const [isVenueFaqOpen, setIsVenueFaqOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Handlers
  const handleOpenRegister = (passType: PassType = 'investor') => {
    setSelectedPassType(passType);
    setIsRegisterOpen(true);
  };

  const handleOpenPartner = (
    tier: 'headline' | 'platinum' | 'gold' | 'exhibitor' | 'custom' = 'headline'
  ) => {
    setSelectedPartnerTier(tier);
    setIsPartnerOpen(true);
  };

  const handleOpenProgramme = (dayIndex = 0) => {
    setInitialDayIndex(dayIndex);
    setIsProgrammeOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf7f7] text-[#1c1917] flex flex-col font-sans selection:bg-[#82163b] selection:text-white">
      
      {/* 1. Header (Sticky navigation, logo, register CTA) */}
      <Header
        onOpenRegister={() => handleOpenRegister('investor')}
        onOpenProgramme={() => handleOpenProgramme(0)}
        onOpenVenueFaq={() => setIsVenueFaqOpen(true)}
        onOpenPartner={() => handleOpenPartner('custom')}
      />

      <main className="flex-1">
        {/* 2. Hero Section (Deep burgundy gradient, silicon photo backdrop, chip diagram & video trigger) */}
        <Hero
          onOpenRegister={() => handleOpenRegister('investor')}
          onOpenPartner={() => handleOpenPartner('custom')}
          onOpenVideo={() => setIsVideoOpen(true)}
        />

        {/* 3. Convened By Bar (Kiprop Yego & Dr. Dr. Michael Apasiku) */}
        <Conveners />

        {/* 4. Why This Forum, And Why Now (Editorial 2-column thesis) */}
        <WhyForum />

        {/* 5. Africa's Advantage (4 cards: Critical minerals, Clean power, People, Data & languages) */}
        <AfricaAdvantage />

        {/* 6. The Programme (Wednesday to Friday dark track preview) */}
        <Programme onOpenFullProgramme={handleOpenProgramme} />

        {/* 7. Who Will Be In The Room (6 participant segments) */}
        <WhoWillBeInRoom />

        {/* 8. Attendee & Speaker Spotlight Carousel */}
        <AttendeeSpotlight
          onConnectAttendee={(_attendee) => handleOpenRegister('investor')}
          onViewProgramme={() => handleOpenProgramme(0)}
        />

        {/* 9. Our Partners (Soft blush section, Tilil, Nelix, Open slots) */}
        <Partners onOpenPartnerModal={handleOpenPartner} />

        {/* 9. Passes and Pricing (Day, Delegate, Investor, Institutional Table) */}
        <PassesPricing onSelectPass={handleOpenRegister} />

        {/* 10. Call To Action (Secure your pass for Accra) */}
        <CallToAction onOpenRegister={() => handleOpenRegister('investor')} />
      </main>

      {/* 11. Footer (Contact details, conveners, forum links) */}
      <Footer
        onOpenProgramme={() => handleOpenProgramme(0)}
        onOpenPartners={() => {
          const el = document.getElementById('partners');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenVenueFaq={() => setIsVenueFaqOpen(true)}
        onOpenRegister={() => handleOpenRegister('investor')}
      />

      {/* Interactive Modals */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        initialPassType={selectedPassType}
      />

      <PartnerModal
        isOpen={isPartnerOpen}
        onClose={() => setIsPartnerOpen(false)}
        initialTier={selectedPartnerTier}
      />

      <FullProgrammeModal
        isOpen={isProgrammeOpen}
        onClose={() => setIsProgrammeOpen(false)}
        initialDayIndex={initialDayIndex}
      />

      <VenueFaqModal
        isOpen={isVenueFaqOpen}
        onClose={() => setIsVenueFaqOpen(false)}
      />

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        posterImage={heroPhotoUrl}
      />

      {/* Floating Download ZIP Button for 1-Click Browser Export */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="/inference-silicon-forum.zip"
          download="inference-silicon-forum.zip"
          className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-stone-900/95 hover:bg-[#82163b] text-white rounded-full shadow-2xl border border-white/20 backdrop-blur-md text-xs font-bold hover:scale-105 transition-all group"
          title="Download latest updated ZIP for GitHub deployment"
        >
          <div className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center">
            <Download className="w-3 h-3 text-white" />
          </div>
          <span>Download Website ZIP</span>
        </a>
      </div>

    </div>
  );
}
