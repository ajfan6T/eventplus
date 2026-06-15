import type { BudgetLine, ChecklistTask } from "@/lib/types";

/** A sample active event used to seed the planning dashboard. */
export const sampleEvent = {
  type: "Wedding",
  coupleNames: "Anjali & Vishnu",
  date: "2026-12-06",
  dateLabel: "6 December 2026",
  daysAway: 173,
  location: "Kochi, Ernakulam",
  guests: 450,
  totalBudget: 1800000,
  spent: 1045000,
  booked: 6,
  shortlisted: 9,
};

export const checklistTasks: ChecklistTask[] = [
  { id: "t1", title: "Lock the wedding date & muhurtham", phase: "6+ months out", done: true, dueLabel: "Done", category: "general" },
  { id: "t2", title: "Set total budget & family contributions", phase: "6+ months out", done: true, dueLabel: "Done", category: "general", aiSuggested: true },
  { id: "t3", title: "Book the venue", phase: "6+ months out", done: true, dueLabel: "Done", category: "venues" },
  { id: "t4", title: "Finalise the caterer & sadhya menu", phase: "4–5 months out", done: true, dueLabel: "Done", category: "catering" },
  { id: "t5", title: "Book photographer & videographer", phase: "4–5 months out", done: true, dueLabel: "Done", category: "photography" },
  { id: "t6", title: "Confirm decor theme & mandapam", phase: "3–4 months out", done: true, dueLabel: "Done", category: "decor" },
  { id: "t7", title: "Send digital save-the-dates", phase: "3 months out", done: false, dueLabel: "Due in 6 days", category: "invitations", aiSuggested: true },
  { id: "t8", title: "Book bridal makeup artist (trial too)", phase: "2–3 months out", done: false, dueLabel: "Due in 12 days", category: "makeup" },
  { id: "t9", title: "Finalise mehendi artist & guest team", phase: "2 months out", done: false, dueLabel: "Due in 20 days", category: "mehendi", aiSuggested: true },
  { id: "t10", title: "Confirm nadaswaram & reception band", phase: "2 months out", done: false, dueLabel: "Due in 24 days", category: "music" },
  { id: "t11", title: "Arrange bridal car & guest transport", phase: "1 month out", done: false, dueLabel: "Due in 38 days", category: "transport" },
  { id: "t12", title: "Send final invitations & track RSVPs", phase: "1 month out", done: false, dueLabel: "Due in 42 days", category: "invitations" },
  { id: "t13", title: "Share final guest count with caterer", phase: "2 weeks out", done: false, dueLabel: "Due in 56 days", category: "catering", aiSuggested: true },
  { id: "t14", title: "Confirm timeline with all vendors", phase: "1 week out", done: false, dueLabel: "Due in 64 days", category: "general" },
];

export const budgetLines: BudgetLine[] = [
  { category: "Venue", icon: "Building2", allocated: 400000, spent: 320000, status: "on-track" },
  { category: "Catering", icon: "UtensilsCrossed", allocated: 540000, spent: 495000, status: "on-track" },
  { category: "Photography", icon: "Camera", allocated: 200000, spent: 165000, status: "on-track" },
  { category: "Decor", icon: "Flower2", allocated: 220000, spent: 240000, status: "over" },
  { category: "Makeup & Mehendi", icon: "Sparkles", allocated: 90000, spent: 0, status: "unspent" },
  { category: "Music", icon: "Music", allocated: 120000, spent: 95000, status: "on-track" },
  { category: "Invitations", icon: "Mail", allocated: 50000, spent: 28000, status: "on-track" },
  { category: "Transport", icon: "Car", allocated: 80000, spent: 0, status: "unspent" },
  { category: "Buffer", icon: "PiggyBank", allocated: 100000, spent: 0, status: "unspent" },
];

/** Event types offered by the AI planner intake. */
export const plannerEventTypes = [
  { value: "weddings", label: "Wedding", icon: "Gem", blurb: "The full kalyanam, start to finish" },
  { value: "housewarmings", label: "Housewarming", icon: "Home", blurb: "Gruhapravesam & blessings" },
  { value: "birthdays", label: "Birthday", icon: "Cake", blurb: "First birthdays to milestones" },
  { value: "baby-showers", label: "Baby Shower", icon: "Baby", blurb: "Seemantham & valaikappu" },
  { value: "inaugurations", label: "Inauguration", icon: "Sparkles", blurb: "Shop, clinic & studio launches" },
];

export const guestRanges = ["Under 50", "50–150", "150–300", "300–500", "500–800", "800+"];

export const budgetRanges = [
  "Under ₹1 lakh",
  "₹1–3 lakh",
  "₹3–8 lakh",
  "₹8–20 lakh",
  "₹20–40 lakh",
  "₹40 lakh+",
];

export const planStyles = [
  "Traditional",
  "Modern",
  "Minimalist",
  "Grand & luxe",
  "Intimate",
  "Eco-friendly",
];
