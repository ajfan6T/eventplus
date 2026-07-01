/** Shared domain types for Eventplus. */

export type EventCategorySlug =
  | "weddings"
  | "housewarmings"
  | "birthdays"
  | "baby-showers"
  | "inaugurations";

export type VendorCategorySlug =
  | "venues"
  | "catering"
  | "photography"
  | "decor"
  | "makeup"
  | "music"
  | "mehendi"
  | "invitations"
  | "planning"
  | "transport";

export interface EventCategory {
  slug: EventCategorySlug;
  name: string;
  tagline: string;
  description: string;
  /** gradient seed colors [from, via, to] in hex */
  gradient: [string, string, string];
  icon: string; // lucide icon name
  popularBudget: string;
  avgGuests: string;
  vendorTypes: VendorCategorySlug[];
}

export interface KeralaLocation {
  slug: string;
  city: string;
  district: string;
}

export interface VendorPackage {
  name: string;
  price: number;
  unit?: string; // e.g. "per plate", "per day", "package"
  popular?: boolean;
  features: string[];
}

export interface VendorReview {
  author: string;
  location: string;
  rating: number;
  event: string;
  date: string;
  body: string;
}

export interface Vendor {
  slug: string;
  name: string;
  category: VendorCategorySlug;
  categoryLabel: string;
  tagline: string;
  about: string;
  city: string;
  district: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  priceUnit: string;
  verified: boolean;
  responseTime: string;
  bookings: number;
  yearsActive: number;
  /** gradient seed colors for cover + gallery */
  gradient: [string, string, string];
  /** optional user-uploaded cover photo (data URL); falls back to `gradient` when absent */
  coverImage?: string | null;
  services: string[];
  highlights: string[];
  serviceAreas: string[];
  packages: VendorPackage[];
  reviews: VendorReview[];
  gallerySeeds: number[];
  eventTypes: EventCategorySlug[];
}

export interface Testimonial {
  name: string;
  role: string;
  location: string;
  rating: number;
  quote: string;
  event: string;
  initials: string;
}

export interface ChecklistTask {
  id: string;
  title: string;
  phase: string;
  done: boolean;
  dueLabel: string;
  category: VendorCategorySlug | "general";
  aiSuggested?: boolean;
}

export interface BudgetLine {
  category: string;
  icon: string;
  allocated: number;
  spent: number;
  status: "on-track" | "over" | "unspent";
}

export interface Lead {
  id: string;
  customer: string;
  event: string;
  date: string;
  location: string;
  budget: number;
  status: "new" | "contacted" | "quoted" | "booked" | "lost";
  message: string;
  receivedAt: string;
}

export interface CalendarBooking {
  id: string;
  title: string;
  date: string; // ISO
  type: "booked" | "hold" | "inquiry";
  value: number;
}
