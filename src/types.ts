/**
 * Types for the Advanced Inference Silicon Investors Forum
 */

export type PassType = 'day' | 'delegate' | 'investor' | 'table';

export interface PassInfo {
  id: PassType;
  name: string;
  priceUSD: number;
  originalPriceUSD?: number;
  rateLabel: string;
  badge?: string;
  isPopular?: boolean;
  description: string;
  ctaText: string;
  includedFeatures: string[];
}

export interface RegistrationSubmission {
  id?: string;
  passType: PassType;
  passName: string;
  amountUSD: number;
  fullName: string;
  email: string;
  organization: string;
  jobTitle: string;
  country: string;
  phone?: string;
  dietaryOrAccessibility?: string;
  paymentMethod: 'credit_card' | 'wire_transfer' | 'mobile_money';
  paymentStatus: 'confirmed' | 'pending';
  registrationCode: string;
  createdAt: string;
}

export interface PartnerEnquiry {
  id?: string;
  tier: 'headline' | 'platinum' | 'gold' | 'exhibitor' | 'custom';
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  message: string;
  country: string;
  submittedAt: string;
}

export interface ScheduleSession {
  time: string;
  title: string;
  description: string;
  track?: string;
  speakers?: {
    name: string;
    role: string;
    company: string;
  }[];
  location: string;
}

export interface DayProgramme {
  date: string;
  dayNumber: string;
  dayName: string;
  themeTitle: string;
  subThemes: {
    title: string;
    description: string;
  }[];
  sessions: ScheduleSession[];
}

export interface AttendeeSpotlight {
  id: string;
  name: string;
  title: string;
  company: string;
  category: 'Speaker' | 'Investor' | 'Architect' | 'Policy & Industry';
  location: string;
  bio: string;
  accentColor?: string;
  initials: string;
  keyTopics: string[];
  dealRoomParticipant: boolean;
}

