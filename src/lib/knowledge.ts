export const sourceUrl = "https://www.greedyadventures.com/experiences/sea-view-skydiving";

export const source = {
  title: "Sea View Skydiving - Tandem Jump over Pattaya",
  url: sourceUrl,
  capturedAt: "2026-10-30",
  sections: [
    {
      id: "packages",
      text: "ECO: ฿9,500 per person. The jump, nothing else. DELUXE: ฿12,500 per person. Video and photos included. VIP: ฿14,000 per person. Personal cameraman and edited film. Same aircraft, altitude and instructors in every package.",
    },
    {
      id: "included",
      text: "Tandem skydive experience in Pattaya, Thailand. Safety briefing and tandem instructor support. Aircraft ascent and ocean-view jump experience. Certificate of completion.",
    },
    {
      id: "experience",
      text: "At the dropzone: 3h. Exit altitude: 13,000 ft. 60 seconds of freefall. Around sixty seconds of freefall, then five to seven minutes under canopy along the coast. No experience needed: your USPA-certified instructor flies the jump.",
    },
    {
      id: "location",
      text: "Pattaya Sea View, Pattaya, Thailand. 95 M.4, Chakphong, Klaeng District, Rayong 21190, Thailand. Operated by Dropzone Thailand. Bangkok pickup is available as a fixed-price add-on.",
    },
    {
      id: "faqs",
      text: "Where does the activity take place? Pattaya, Thailand. Which package to choose? ECO for standard jump, Deluxe for handy cam video and photos, VIP for full media coverage with personal cameraman. Bangkok pickup? Available as a fixed-price add-on.",
    },
  ],
};

export const packages = [
  {
    name: "ECO",
    price: "9,500",
    subtitle: "THE JUMP, NOTHING ELSE",
    image: "https://pub-89f493a2b50b4e43b99552a737bef138.r2.dev/offerings/apex-gallery/tandem-with-sea-view.webp",
    detail: "The complete tandem experience",
    features: [
      "Tandem skydive experience in Pattaya, Thailand",
      "Safety briefing and tandem instructor support",
      "Aircraft ascent and ocean-view jump experience",
      "Certificate of completion",
    ],
  },
  {
    name: "DELUXE",
    price: "12,500",
    subtitle: "VIDEO AND PHOTOS INCLUDED",
    image: "https://pub-89f493a2b50b4e43b99552a737bef138.r2.dev/offerings/apex-gallery/instrcutor-with-customer.webp",
    detail: "Relive your jump with video and photos",
    features: [
      "Tandem skydive experience in Pattaya, Thailand",
      "Safety briefing and tandem instructor support",
      "Aircraft ascent and ocean-view jump experience",
      "Certificate of completion",
    ],
  },
  {
    name: "VIP",
    price: "14,000",
    subtitle: "PERSONAL CAMERAMAN AND EDITED FILM",
    image: "https://pub-89f493a2b50b4e43b99552a737bef138.r2.dev/offerings/apex-gallery/jump-after-exit.webp",
    detail: "A personal cameraman and an edited film",
    features: [
      "Tandem skydive experience in Pattaya, Thailand",
      "Safety briefing and tandem instructor support",
      "Aircraft ascent and ocean-view jump experience",
      "Certificate of completion",
    ],
  },
];

export const planSteps = [
  {
    step: 1,
    title: "Arrival and check-in",
    desc: "Sign in at the dropzone and bring your photo ID.",
    image: "https://www.greedyadventures.com/greedy/trips/dropzone-thailand-check-in.jpg",
  },
  {
    step: 2,
    title: "Safety briefing and gear fitting",
    desc: "Meet your instructor for the safety briefing and harness fitting.",
    image: "https://pub-89f493a2b50b4e43b99552a737bef138.r2.dev/offerings/sea-view-tandem-skydive-pattaya/108d38.jpg",
  },
  {
    step: 3,
    title: "Boarding and the climb",
    desc: "Board the aircraft and climb to jump altitude.",
    image: "https://pub-89f493a2b50b4e43b99552a737bef138.r2.dev/offerings/apex-gallery/plane.webp",
  },
  {
    step: 4,
    title: "Exit and freefall",
    desc: "Exit with your instructor for freefall over the Gulf of Thailand.",
    image: "https://pub-89f493a2b50b4e43b99552a737bef138.r2.dev/offerings/apex-gallery/tandem-with-sea-view.webp",
  },
  {
    step: 5,
    title: "Canopy flight and landing",
    desc: "Fly under the parachute with your instructor and land back at the dropzone.",
    image: "https://www.greedyadventures.com/greedy/trips/tandem-canopy-landing-g0250281.jpg",
  },
];

export const experienceDetails = {
  highlights: [
    "Exit at 13,000 ft with the Gulf of Thailand on the horizon",
    "Around sixty seconds of freefall, then five to seven minutes under canopy along the coast",
    "No experience needed: your USPA-certified instructor flies the jump",
    "Same aircraft, altitude and instructors in every package",
  ],
  included: [
    "Tandem skydive experience in Pattaya, Thailand",
    "Safety briefing and tandem instructor support",
    "Aircraft ascent and ocean-view jump experience",
    "Certificate of completion",
  ],
  description:
    "A tandem skydiving experience over Pattaya with ocean views. Guests receive a safety briefing, fly to jump altitude, complete the tandem jump with a certified instructor, and choose from ECO, Deluxe, or VIP package options depending on the media coverage they want.",
  location: {
    name: "Pattaya Sea View, Pattaya, Thailand",
    address: "95 M.4, Chakphong, Klaeng District, Rayong 21190, Thailand",
    operator: "Dropzone Thailand",
  },
};

export const faqs = [
  {
    question: "Where does the activity take place?",
    answer: "The tandem skydive is listed for Pattaya, Thailand.",
  },
  {
    question: "Which package should I choose?",
    answer:
      "Choose ECO for the standard jump, Deluxe if you want handy cam video, and VIP if you want full media coverage.",
  },
  {
    question: "Is Bangkok pickup available?",
    answer: "Yes. Bangkok pickup is available as a fixed-price add-on.",
  },
];

export const media = [
  {
    id: "brochure",
    kind: "pdf",
    title: "Sea View experience brochure",
    url: "/api/brochure",
    demo: true,
  },
  {
    id: "video",
    kind: "video",
    title: "Watch the Sea View jump",
    url: "https://pub-89f493a2b50b4e43b99552a737bef138.r2.dev/offerings/sea-view-tandem-skydive-pattaya/25a24e5b-c0f8-45a2-bba0-56e5b3ff5500.mp4",
    demo: false,
  },
] as const;

export const heroImage =
  "https://pub-89f493a2b50b4e43b99552a737bef138.r2.dev/offerings/apex-gallery/tandem-with-sea-view.webp";
