/** Global site configuration: brand, navigation, marketing content. */

export const site = {
  name: "Eventplus",
  tagline: "Plan unforgettable celebrations in Kerala",
  /** Corporate inquiries route here (phase one: mock submit + mailto fallback). */
  founderEmail: "founder@eventplus.in",
  phone: "+91 95000 12345",
  city: "Kochi, Kerala",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
};

export const primaryNav = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Browse vendors", href: "/vendors" },
  { label: "Plan an event", href: "/plan" },
  { label: "Corporate", href: "/corporate" },
  { label: "For vendors", href: "/for-vendors" },
];

export const heroStats = [
  { value: "1,200+", label: "Verified vendors" },
  { value: "9,500+", label: "Events planned" },
  { value: "4.9★", label: "Avg. rating" },
  { value: "14", label: "Kerala districts" },
];

export const howItWorks = [
  {
    step: "01",
    title: "Tell us about your event",
    description:
      "Share your occasion, date, location, guest count and budget. Our AI builds a tailored plan in seconds.",
    icon: "Wand2",
  },
  {
    step: "02",
    title: "Get your living checklist & budget",
    description:
      "A smart checklist with deadlines and a live budget tracker keep every ritual and rupee on track.",
    icon: "ListChecks",
  },
  {
    step: "03",
    title: "Discover curated vendors",
    description:
      "We recommend verified vendors matched to your style, budget and dates — compare, shortlist and chat.",
    icon: "Sparkles",
  },
  {
    step: "04",
    title: "Book everything in one place",
    description:
      "Confirm vendors, track payments and manage your whole celebration from a single dashboard.",
    icon: "CalendarCheck",
  },
];

export const valueProps = [
  {
    title: "Verified, only",
    description: "Every vendor is background-checked, reviewed and rated by real Kerala families.",
    icon: "ShieldCheck",
  },
  {
    title: "AI that plans with you",
    description: "Smart checklists, budgets and recommendations tuned to your occasion and customs.",
    icon: "BrainCircuit",
  },
  {
    title: "Live budget tracking",
    description: "Watch every rupee in real time, with alerts before you go over on any category.",
    icon: "Wallet",
  },
  {
    title: "One-place booking",
    description: "Chat, shortlist, book and pay across all your vendors from a single dashboard.",
    icon: "LayoutDashboard",
  },
];

export const trustLogos = [
  "Infopark Kochi",
  "Technopark Trivandrum",
  "Cyberpark Kozhikode",
  "Kerala Tourism",
  "FSSAI Verified",
];

export const footerNav = {
  Plan: [
    { label: "How it works", href: "/how-it-works" },
    { label: "Plan an event", href: "/plan" },
    { label: "Pricing", href: "/how-it-works#pricing" },
    { label: "Your dashboard", href: "/dashboard" },
  ],
  Discover: [
    { label: "All vendors", href: "/vendors" },
    { label: "Weddings", href: "/events/weddings" },
    { label: "Housewarmings", href: "/events/housewarmings" },
    { label: "Birthdays", href: "/events/birthdays" },
  ],
  Business: [
    { label: "Corporate events", href: "/corporate" },
    { label: "Become a vendor", href: "/for-vendors" },
    { label: "Vendor dashboard", href: "/vendor" },
  ],
  Company: [
    { label: "About us", href: "/about" },
    { label: "Contact", href: "/corporate#inquiry" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};
