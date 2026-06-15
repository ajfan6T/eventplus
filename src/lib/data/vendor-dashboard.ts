import type { CalendarBooking, Lead } from "@/lib/types";

/** Seed data for the vendor (CRM) dashboard — viewed as "Marigold Decor Studio". */
export const vendorProfile = {
  name: "Marigold Decor Studio",
  category: "Decor & Florals",
  city: "Thrissur",
  rating: 4.7,
  reviewCount: 142,
  responseRate: 96,
  memberSince: "2023",
};

export const vendorStats = [
  { label: "New leads", value: "7", change: "+3 this week", icon: "Inbox", tone: "maroon" },
  { label: "This month's earnings", value: "₹3.4L", change: "+18% vs last", icon: "TrendingUp", tone: "green" },
  { label: "Confirmed bookings", value: "11", change: "Next: 22 Jun", icon: "CalendarCheck", tone: "gold" },
  { label: "Profile views", value: "1,284", change: "+212 this week", icon: "Eye", tone: "maroon" },
];

export const leads: Lead[] = [
  { id: "L-2041", customer: "Anjali & Vishnu", event: "Wedding", date: "6 Dec 2026", location: "Kochi", budget: 220000, status: "new", message: "Looking for a full floral mandapam + reception stage. Saw your jasmine setup — love it!", receivedAt: "2 hours ago" },
  { id: "L-2039", customer: "Steffi Roy", event: "1st Birthday", date: "12 Jul 2026", location: "Aluva", budget: 48000, status: "new", message: "Jungle theme for my son's first birthday, around 30 kids. Need soft-play + balloons.", receivedAt: "5 hours ago" },
  { id: "L-2036", customer: "Mathew Philip", event: "Housewarming", date: "28 Jun 2026", location: "Thrissur", budget: 65000, status: "contacted", message: "Gruhapravesam decor for ~120 guests. Traditional with nilavilakku setup.", receivedAt: "Yesterday" },
  { id: "L-2034", customer: "Deepa Jose", event: "Baby Shower", date: "19 Jul 2026", location: "Kochi", budget: 55000, status: "quoted", message: "Soft pastel theme, intimate gathering of 40. Quote sent, awaiting confirmation.", receivedAt: "2 days ago" },
  { id: "L-2030", customer: "Lakshmi S.", event: "Wedding", date: "14 Feb 2026", location: "Thrissur", budget: 185000, status: "booked", message: "Grand affair venue-wide theming. Advance received, finalising flowers.", receivedAt: "1 week ago" },
  { id: "L-2025", customer: "Arjun V.", event: "Inauguration", date: "3 Jun 2026", location: "Palakkad", budget: 40000, status: "lost", message: "Clinic launch decor. Went with a local vendor on budget.", receivedAt: "2 weeks ago" },
];

export const calendarBookings: CalendarBooking[] = [
  { id: "b1", title: "Mathew — Housewarming", date: "2026-06-22", type: "hold", value: 65000 },
  { id: "b2", title: "Deepa — Baby Shower", date: "2026-07-19", type: "inquiry", value: 55000 },
  { id: "b3", title: "Steffi — Birthday", date: "2026-07-12", type: "inquiry", value: 48000 },
  { id: "b4", title: "Anjali — Wedding", date: "2026-12-06", type: "hold", value: 220000 },
  { id: "b5", title: "Corporate — Annual Day", date: "2026-06-28", type: "booked", value: 140000 },
];

export const earningsByMonth = [
  { month: "Jan", value: 210000 },
  { month: "Feb", value: 340000 },
  { month: "Mar", value: 295000 },
  { month: "Apr", value: 410000 },
  { month: "May", value: 380000 },
  { month: "Jun", value: 340000 },
];

export const leadStatusMeta: Record<
  Lead["status"],
  { label: string; badge: "default" | "gold" | "green" | "maroon" | "muted" | "outline" }
> = {
  new: { label: "New", badge: "maroon" },
  contacted: { label: "Contacted", badge: "gold" },
  quoted: { label: "Quoted", badge: "outline" },
  booked: { label: "Booked", badge: "green" },
  lost: { label: "Lost", badge: "muted" },
};
