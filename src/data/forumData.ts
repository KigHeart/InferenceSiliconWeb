import { PassInfo, DayProgramme, AttendeeSpotlight } from '../types';

export const FORUM_CONFIG = {
  title: 'ADVANCED INFERENCE SILICON INVESTORS FORUM',
  edition: '1ST EDITION · ACCRA, GHANA',
  dates: '3–5 March 2027',
  location: 'Accra, Ghana',
  venue: 'Accra International Conference Centre & Labadi Beach Grand Hall',
  tagline: 'Three days on AI inference hardware, and on what Africa can build with the resources it already has.',
  earlyBirdDate: '15 January 2027',
  // Reference targets for countdown
  eventStartDate: '2027-03-03T09:00:00Z',
  earlyBirdDeadline: '2027-01-15T23:59:59Z',
  conveners: [
    {
      name: 'Kiprop Yego',
      role: 'Chairman, Tilil Engineering Group',
      bio: 'Visionary engineer and industrial leader steering technological self-reliance, semiconductor initiatives and energy-efficient hardware ventures across Africa.',
      org: 'Tilil Engineering Group',
      location: 'Kapsabet, Kenya',
      contact: 'yeqoen@outlook.com'
    },
    {
      name: 'Dr. Michael Apasiku',
      role: 'Nelix Chip Design',
      bio: 'Pioneering ASIC architect and founder driving custom edge-AI silicon architectures, RISC-V compute engines and semiconductor IP development.',
      org: 'Nelix Chip Design',
      location: 'Accra, Ghana'
    }
  ],
  contact: {
    email: 'yeqoen@outlook.com',
    phone: '+254 729 377 540',
    address: 'Tilil Engineering Group, Kapsabet, Kenya'
  }
};

export const PASSES: PassInfo[] = [
  {
    id: 'day',
    name: 'Day Pass',
    priceUSD: 150,
    rateLabel: 'Standard rate',
    description: 'Any one day: sessions, exhibition and lunch.',
    ctaText: 'Choose Day Pass',
    includedFeatures: [
      'Access to all open track sessions on chosen day',
      'Entry to the Hardware & Minerals Exhibition Hall',
      'Delegate buffet lunch & networking coffee breaks',
      'Access to digital conference materials'
    ]
  },
  {
    id: 'delegate',
    name: 'Delegate Pass',
    priceUSD: 450,
    originalPriceUSD: 550,
    rateLabel: 'Early bird · Standard USD 550',
    description: 'Three days: every session Wednesday to Friday, exhibition, daily lunch and certificate.',
    ctaText: 'Choose Delegate Pass',
    includedFeatures: [
      'Full 3-day access (Wednesday to Friday)',
      'Every technical keynote, plenary & panel session',
      'Daily delegate lunch and all networking receptions',
      'Official Forum Delegate Certificate of Attendance',
      'Listing in the delegate directory & matchmaking app'
    ]
  },
  {
    id: 'investor',
    name: 'Investor Pass',
    priceUSD: 1200,
    originalPriceUSD: 1500,
    rateLabel: 'Early bird · Standard USD 1,500',
    badge: 'FULL ACCESS',
    isPopular: true,
    description: 'Three days: Delegate access plus closed-door Capital Roundtables, Deal Room one-to-ones, VIP lounge and gala dinner.',
    ctaText: 'Choose Investor Pass',
    includedFeatures: [
      'Full 3-day All-Access VIP Delegate credentials',
      'Closed-door Capital Roundtables with sovereign funds & VCs',
      'Curated Deal Room 1-to-1 startup pitch access',
      'Exclusive VIP Lounge with dedicated meeting suites',
      'VIP Gala Dinner & Accra Declaration ceremony seat',
      'Direct contact pipeline to convened chip architects'
    ]
  },
  {
    id: 'table',
    name: 'Institutional Table',
    priceUSD: 5000,
    originalPriceUSD: 6000,
    rateLabel: 'Early bird · Standard USD 6,000',
    description: 'Five Investor Passes, a reserved gala table and logo in the programme.',
    ctaText: 'Choose Table',
    includedFeatures: [
      '5 Complete Investor Passes with VIP Deal Room privileges',
      'Reserved branded table at the Accra Silicon Gala Dinner',
      'Corporate logo and institutional profile in official programme',
      'Private 8-seat meeting room booking allocation for 2 hours',
      'Direct facilitation of founder-to-investor introductions'
    ]
  }
];

export const AFRICA_ADVANTAGES = [
  {
    id: 'minerals',
    title: 'Critical minerals',
    description: 'Copper, cobalt, manganese, lithium and more, upstream of every chip and battery.',
    details: 'Africa holds ~30% of global critical mineral reserves. The forum anchors value addition at the origin—moving from raw export to refined substrates, precursor components, and domestic packaging.'
  },
  {
    id: 'power',
    title: 'Clean power',
    description: 'Solar, hydro and geothermal potential for low-cost, low-carbon compute.',
    details: 'Equatorial solar insolation, the Rift Valley geothermal corridor, and abundant hydro basins create baseload zero-carbon energy for high-efficiency AI inference datacenters.'
  },
  {
    id: 'people',
    title: 'People',
    description: 'The world’s youngest continent: engineers, designers and users.',
    details: 'With a median age under 19 and rapidly graduating cohorts in electrical engineering, computer science, and VLSI physics, Africa is the talent growth frontier for hardware innovation.'
  },
  {
    id: 'languages',
    title: 'Data & languages',
    description: 'Over a thousand languages and unmet needs that edge inference can serve.',
    details: 'Local inference on low-power silicon solves offline multilingual voice translation, agrarian disease vision diagnostics, and localized fintech in low-bandwidth regions.'
  }
];

export const WHO_IN_THE_ROOM = [
  {
    title: 'Investors & funds',
    description: 'Venture, growth, sovereign and family-office capital, and development finance.',
    focus: 'Direct equity, fund-of-funds, hardware debt facilities, and mineral value-chain financing.'
  },
  {
    title: 'Chip designers & hardware founders',
    description: 'Architects and startups building accelerators and inference silicon.',
    focus: 'RISC-V extensions, NPU accelerators, analog compute-in-memory, and wafer-scale packaging.'
  },
  {
    title: 'Cloud & data-centre operators',
    description: 'Builders and buyers of compute across the continent.',
    focus: 'Edge colocation, green energy PPA models, inference workload offload, and liquid cooling.'
  },
  {
    title: 'Mining & energy companies',
    description: 'Owners of the minerals and power that hardware depends on.',
    focus: 'Downstream beneficiation, strategic mineral reserves, and microgrid infrastructure for compute clusters.'
  },
  {
    title: 'Government & policy',
    description: 'Ministries, regulators and industrial-policy leaders.',
    focus: 'Continental free trade silicon zones, tax incentives, import tariffs on fab tools, and national compute sovereign strategies.'
  },
  {
    title: 'Researchers & universities',
    description: 'Labs and graduate programmes training the next generation.',
    focus: 'Semiconductor design pipelines, open-source EDA toolchains, tape-out subsidies, and academic fab access.'
  }
];

export const PROGRAMME_DAYS: DayProgramme[] = [
  {
    date: '3 March 2027',
    dayNumber: '03',
    dayName: 'WEDNESDAY',
    themeTitle: 'The Inference Economy & Chips for Inference',
    subThemes: [
      {
        title: 'The Inference Economy',
        description: 'Opening plenary and keynotes on where the money is moving.'
      },
      {
        title: 'Chips for Inference',
        description: 'Accelerators, in-memory compute, low-precision arithmetic, packaging and energy per query.'
      }
    ],
    sessions: [
      {
        time: '08:30 – 09:30',
        title: 'Registration, VIP Networking & Hardware Showcase',
        description: 'Badge pickup, welcome espresso, exhibition preview of silicon prototypes.',
        location: 'Main Foyer & Exhibition Hall'
      },
      {
        time: '09:30 – 10:45',
        title: 'Opening Plenary: The Shifting Center of AI Gravity',
        description: 'From training clusters to edge inference: why model execution economics govern the next decade of technology and where capital must flow.',
        speakers: [
          { name: 'Kiprop Yego', role: 'Chairman', company: 'Tilil Engineering Group' },
          { name: 'Dr. Michael Apasiku', role: 'Chief Architect', company: 'Nelix Chip Design' }
        ],
        location: 'Auditorium Magna'
      },
      {
        time: '11:15 – 12:45',
        title: 'Keynote & Panel: Economics of the Query',
        description: 'Cost per token, joules per inference, latency bounds, and the physical limits of general-purpose GPUs.',
        location: 'Auditorium Magna'
      },
      {
        time: '14:00 – 15:30',
        title: 'Architectures for Inference: NPU, In-Memory & Low-Bit Precision',
        description: 'Deep dive into 4-bit/8-bit quantized engines, neuromorphic approaches, and memory bandwidth bottlenecks in localized models.',
        location: 'Hall B (Silicon Track)'
      },
      {
        time: '16:00 – 17:30',
        title: 'Advanced Packaging, 2.5D/3D Chiplets & Fabrication Realities',
        description: 'Evaluating what stages of the semiconductor value chain Africa can adopt first: design, test, advanced packaging, and wafer testing.',
        location: 'Hall B (Silicon Track)'
      },
      {
        time: '18:00 – 20:00',
        title: 'Welcome Reception & Founders Mingle',
        description: 'Cocktails and informal conversations overlooking the Gulf of Guinea.',
        location: 'Coastal Terrace'
      }
    ]
  },
  {
    date: '4 March 2027',
    dayNumber: '04',
    dayName: 'THURSDAY',
    themeTitle: "Africa’s Resource Advantage & Building Silicon in Africa",
    subThemes: [
      {
        title: "Africa’s Resource Advantage",
        description: 'Minerals, clean power and cooling, talent, data and languages.'
      },
      {
        title: 'Building Silicon in Africa',
        description: 'Design houses, open hardware and open EDA, packaging, test and bankable policy.'
      }
    ],
    sessions: [
      {
        time: '09:00 – 10:30',
        title: 'The Upstream Link: Critical Minerals to Silicon Substrates',
        description: 'How Africa’s mineral endowments (copper, cobalt, tantalum, manganese, lithium) can be leveraged for strategic participation in semiconductor value chains.',
        location: 'Auditorium Magna'
      },
      {
        time: '11:00 – 12:30',
        title: 'Clean Energy Corridors for Continental Inference Clusters',
        description: 'Matching renewable geothermal, hydro, and high-capacity solar with zero-carbon datacenter operations.',
        location: 'Hall A'
      },
      {
        time: '14:00 – 15:30',
        title: 'Building African Fabless Design Houses & Open EDA Toolchains',
        description: 'Leveraging RISC-V, Tiny Tapeout, OpenLane, and commercial foundry shuttle services to design world-class ASICs from Accra, Nairobi, and Lagos.',
        location: 'Hall B'
      },
      {
        time: '16:00 – 17:30',
        title: 'Bankable Industrial Policy: Special Economic Zones & Sovereign Subsidies',
        description: 'Ministers of trade, finance, and telecommunications discuss tariff exemptions, patent laws, and regional compute hubs.',
        location: 'Executive Council Chamber'
      }
    ]
  },
  {
    date: '5 March 2027',
    dayNumber: '05',
    dayName: 'FRIDAY',
    themeTitle: 'Deal Room & Declaration & Gala',
    subThemes: [
      {
        title: 'Deal Room',
        description: 'Curated hardware-startup pitches and closed-door one-to-one investor meetings.'
      },
      {
        title: 'Declaration & Gala',
        description: 'Capital roundtable, closing plenary, the Accra Declaration on African inference silicon, and gala dinner.'
      }
    ],
    sessions: [
      {
        time: '09:00 – 12:30',
        title: 'Curated Hardware-Startup Pitches (Deal Room)',
        description: '12 vetted hardware and silicon startups pitch to global seed, series A, and growth funds in 15-minute high-impact slots.',
        location: 'Deal Room Suite & Pitch Theater'
      },
      {
        time: '14:00 – 15:30',
        title: 'Closed-Door Capital Roundtable: Blended Finance for Hardware',
        description: 'DFIs, sovereign wealth funds, and venture GPs structure catalytic capital facilities for African semiconductor test and packaging pilot lines.',
        location: 'Private Boardroom'
      },
      {
        time: '16:00 – 17:30',
        title: 'Closing Plenary: The Accra Declaration on African Inference Silicon',
        description: 'Presentation, formal signing, and ministerial endorsement of the Accra Action Plan for continental semiconductor capability.',
        location: 'Auditorium Magna'
      },
      {
        time: '19:00 – 22:30',
        title: 'Grand Gala Dinner & Investor Awards',
        description: 'Formal dinner, live acoustic performances, keynote address, and celebrating groundbreaking innovators.',
        location: 'Labadi Grand Ballroom'
      }
    ]
  }
];

export const FAQS = [
  {
    q: 'Where does the forum take place?',
    a: 'The forum is hosted in Accra, Ghana, across the Accra International Conference Centre (AICC) for technical plenaries and exhibition, and the Labadi Beach Hotel Grand Ballroom for the Friday Gala Dinner and VIP Deal Room suites.'
  },
  {
    q: 'Who should attend this forum?',
    a: 'Venture and private equity investors, sovereign wealth managers, semiconductor architects, hardware founders, cloud operators, mining and energy executives, policy leaders, and academic researchers working on AI inference systems and critical minerals.'
  },
  {
    q: 'How does visa acquisition work for Ghana?',
    a: 'Citizens of ECOWAS countries enter visa-free. For international and other African Union delegates, Ghana offers streamlined e-Visa and Visa-on-Arrival arrangements. Upon registration, you will receive an official Invitation Letter and Visa Support Dossier.'
  },
  {
    q: 'What is included in the Investor Pass and Institutional Table?',
    a: 'Investor Passes unlock the curated Friday Deal Room (1-to-1 meetings with vetted silicon startups), the closed-door Capital Roundtables with sovereign and private equity funds, VIP Lounge access, and seats at the Accra Declaration Gala Dinner. Institutional Tables include 5 passes, a dedicated dinner table, and programme branding.'
  },
  {
    q: 'How can our organisation partner or sponsor?',
    a: 'We offer Headline, Platinum, Gold, and Exhibitor packages. You can submit an enquiry via the "Become a partner" button or contact our convening team directly at yeqoen@outlook.com.'
  }
];

export const ATTENDEE_SPOTLIGHTS: AttendeeSpotlight[] = [
  {
    id: 'kiprop-yego',
    name: 'Kiprop Yego',
    title: 'Chairman & Industrialist',
    company: 'Tilil Engineering Group',
    category: 'Speaker',
    location: 'Kapsabet, Kenya',
    bio: 'Guiding regional semiconductor packaging ventures, microgrid compute deployment, and industrial sovereign tech policy across Sub-Saharan Africa.',
    initials: 'KY',
    accentColor: '#82163b',
    keyTopics: ['Sovereign Silicon Strategy', 'Packaging & Test Pilot Lines', 'Industrial Capital'],
    dealRoomParticipant: true,
  },
  {
    id: 'michael-apasiku',
    name: 'Dr. Michael Apasiku',
    title: 'Chief Silicon Architect',
    company: 'Nelix Chip Design',
    category: 'Architect',
    location: 'Accra, Ghana',
    bio: 'Pioneering custom edge-AI NPU architectures and tapeout acceleration using RISC-V open instruction sets and low-precision INT4/FP4 arithmetic.',
    initials: 'MA',
    accentColor: '#9c2049',
    keyTopics: ['RISC-V Custom Extensions', 'In-Memory Compute', 'Sub-Watt Edge Inference'],
    dealRoomParticipant: true,
  },
  {
    id: 'amina-diallo',
    name: 'Dr. Amina Diallo',
    title: 'Founding Partner',
    company: 'Pan-African DeepTech Fund',
    category: 'Investor',
    location: 'Dakar & London',
    bio: 'Directing a $120M hardware and compute growth facility backing African fabless startups, physical AI infrastructure, and foundry shuttle access.',
    initials: 'AD',
    accentColor: '#b45309',
    keyTopics: ['Hardware Venture Debt', 'Seed-to-Series A Tapeouts', 'Foundry Alliances'],
    dealRoomParticipant: true,
  },
  {
    id: 'kwame-boateng',
    name: 'Kwame Boateng',
    title: 'VP Infrastructure & Compute',
    company: 'Volta Data Systems',
    category: 'Policy & Industry',
    location: 'Accra, Ghana',
    bio: 'Leading green compute integration matching renewable geothermal and hydro baseload capacity with high-density localized inference datacenters.',
    initials: 'KB',
    accentColor: '#047857',
    keyTopics: ['Green Compute PPA', 'Liquid Immersion Cooling', 'Edge Colocation'],
    dealRoomParticipant: false,
  },
  {
    id: 'sophia-ndlovu',
    name: 'Dr. Sophia Ndlovu',
    title: 'Director of Value Addition',
    company: 'African Critical Minerals Consortium',
    category: 'Policy & Industry',
    location: 'Johannesburg, South Africa',
    bio: 'Architecting cross-border mineral beneficiation treaties to refine upstream lithium, cobalt, and copper into semiconductor-grade precursor materials.',
    initials: 'SN',
    accentColor: '#b91c1c',
    keyTopics: ['Upstream Mineral Beneficiation', 'Supply Chain Sovereignty', 'AfCFTA Trade Corridors'],
    dealRoomParticipant: true,
  },
  {
    id: 'siddharth-rao',
    name: 'Siddharth Rao',
    title: 'General Partner',
    company: 'Silicon Matrix Capital',
    category: 'Investor',
    location: 'Singapore & San Francisco',
    bio: 'Veteran semiconductor investor in 28 silicon startups with 6 IPOs, focusing on novel memory architectures, optical interconnects, and fabless accelerators.',
    initials: 'SR',
    accentColor: '#4338ca',
    keyTopics: ['Fabless Unit Economics', 'Cross-Border Syndication', 'Foundry Shuttle Economics'],
    dealRoomParticipant: true,
  },
  {
    id: 'jean-paul-kabore',
    name: 'Prof. Jean-Paul Kaboré',
    title: 'Chair of Microelectronics',
    company: 'AIMS & Kigali Chip Center',
    category: 'Speaker',
    location: 'Kigali, Rwanda',
    bio: 'Spearheading open-source EDA (OpenLane/Magic) training programs and subsidized Tiny Tapeout multi-project wafers for African engineering graduate cohorts.',
    initials: 'JK',
    accentColor: '#0f766e',
    keyTopics: ['Open-Source EDA Toolchains', 'VLSI Talent Pipelines', 'Academic Tapeout Access'],
    dealRoomParticipant: false,
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    title: 'Chief Technology Officer',
    company: 'Apex Neuromorphic Core',
    category: 'Architect',
    location: 'Munich, Germany',
    bio: 'Specialist in sparse transformer execution, ultra-low power spiking neural networks, and wafer-level packaging for localized edge LLM workloads.',
    initials: 'ER',
    accentColor: '#6d28d9',
    keyTopics: ['Analog Compute-in-Memory', 'Sparse Transformer Acceleration', 'Heterogeneous Packaging'],
    dealRoomParticipant: true,
  },
];

