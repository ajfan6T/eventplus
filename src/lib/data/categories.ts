import type { EventCategory, KeralaLocation, VendorCategorySlug } from "@/lib/types";

export const eventCategories: EventCategory[] = [
  {
    slug: "weddings",
    name: "Weddings",
    tagline: "Kalyanam done right",
    description:
      "From the nilavilakku to the sadhya, plan every ritual and reception detail with verified Kerala vendors.",
    gradient: ["#7b1e3b", "#9a2f50", "#c9a227"],
    icon: "Gem",
    popularBudget: "₹8L – ₹40L",
    avgGuests: "300–800 guests",
    vendorTypes: ["venues", "catering", "photography", "decor", "makeup", "mehendi", "music", "invitations"],
  },
  {
    slug: "housewarmings",
    name: "Housewarmings",
    tagline: "Gruhapravesam blessings",
    description:
      "Auspicious paal kaachal, pujas and a warm sadhya for your new home — organised end to end.",
    gradient: ["#1f4d3a", "#2c6044", "#c9a227"],
    icon: "Home",
    popularBudget: "₹1.5L – ₹6L",
    avgGuests: "50–200 guests",
    vendorTypes: ["catering", "decor", "photography", "music", "transport"],
  },
  {
    slug: "birthdays",
    name: "Birthdays",
    tagline: "Make a wish, we'll do the rest",
    description:
      "First birthdays to milestone bashes — themed decor, cakes, entertainment and capture-worthy moments.",
    gradient: ["#b8476a", "#d4b246", "#3f7d5c"],
    icon: "Cake",
    popularBudget: "₹40K – ₹3L",
    avgGuests: "30–150 guests",
    vendorTypes: ["venues", "decor", "catering", "photography", "music"],
  },
  {
    slug: "baby-showers",
    name: "Baby Showers",
    tagline: "Seemantham & valaikappu joy",
    description:
      "Gentle, glowing celebrations for the mum-to-be — soft decor, intimate catering and keepsake photos.",
    gradient: ["#d97c92", "#e3c766", "#74ab8a"],
    icon: "Baby",
    popularBudget: "₹50K – ₹2.5L",
    avgGuests: "30–120 guests",
    vendorTypes: ["decor", "catering", "photography", "makeup"],
  },
  {
    slug: "inaugurations",
    name: "Inaugurations",
    tagline: "Open with auspicious flair",
    description:
      "Shop, clinic or studio launches — ribbon ceremonies, nadaswaram, traditional lamp lighting and footfall buzz.",
    gradient: ["#a9851c", "#c9a227", "#7b1e3b"],
    icon: "Sparkles",
    popularBudget: "₹75K – ₹5L",
    avgGuests: "50–300 guests",
    vendorTypes: ["decor", "catering", "photography", "music", "invitations"],
  },
];

export const vendorCategoryLabels: Record<VendorCategorySlug, string> = {
  venues: "Venues & Mandapams",
  catering: "Catering & Sadhya",
  photography: "Photography & Film",
  decor: "Decor & Florals",
  makeup: "Makeup & Mehendi",
  music: "Music & Performers",
  mehendi: "Mehendi Artists",
  invitations: "Invitations",
  planning: "Event Planners",
  transport: "Transport",
};

export const keralaLocations: KeralaLocation[] = [
  { slug: "kochi", city: "Kochi", district: "Ernakulam" },
  { slug: "trivandrum", city: "Thiruvananthapuram", district: "Thiruvananthapuram" },
  { slug: "kozhikode", city: "Kozhikode", district: "Kozhikode" },
  { slug: "thrissur", city: "Thrissur", district: "Thrissur" },
  { slug: "kottayam", city: "Kottayam", district: "Kottayam" },
  { slug: "kannur", city: "Kannur", district: "Kannur" },
  { slug: "alappuzha", city: "Alappuzha", district: "Alappuzha" },
  { slug: "palakkad", city: "Palakkad", district: "Palakkad" },
];

export function getEventCategory(slug: string) {
  return eventCategories.find((c) => c.slug === slug);
}
