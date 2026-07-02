"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { getVendorForUser } from "@/lib/queries";
import { vendorCategoryLabels, keralaLocations } from "@/lib/data/categories";
import { slugify } from "@/lib/utils";
import type { EventCategorySlug, VendorCategorySlug } from "@/lib/types";

export interface ListingResult {
  ok: boolean;
  error?: string;
}

export interface VendorListingInput {
  name: string;
  category: string;
  tagline: string;
  about: string;
  city: string; // keralaLocations slug or city name
  startingPrice: number;
  priceUnit: string;
  yearsActive: number;
  responseTime: string;
  services: string[];
  serviceAreas: string[];
  highlights: string[];
  eventTypes: string[];
  packages: { name: string; price: number; unit?: string; features: string[] }[];
  /** Optional cover photo as a data URL (e.g. "data:image/jpeg;base64,..."). */
  coverImage?: string | null;
}

// Client-side resizing keeps this small, but reject anything unreasonable server-side too.
const MAX_COVER_IMAGE_LENGTH = 3_000_000; // ~2.2MB decoded

// Deterministic brand gradient + gallery seeds so new listings look on-brand.
const GRADIENTS: [string, string, string][] = [
  ["#7b1e3b", "#9a2f50", "#c9a227"],
  ["#1f4d3a", "#2c6044", "#d4b246"],
  ["#b8476a", "#d97c92", "#74ab8a"],
  ["#a9851c", "#c9a227", "#1f4d3a"],
  ["#5f162d", "#a9851c", "#3f7d5c"],
  ["#2c6044", "#3f7d5c", "#d4b246"],
];

function hashInt(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/** Self-serve vendor listing creation. New listings go live immediately (no admin approval gate). */
export async function createVendorListing(input: VendorListingInput): Promise<ListingResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "Please sign in as a vendor first." };
  if (session.user.role === "family")
    return { ok: false, error: "Family accounts can't list services. Sign up as a vendor." };

  const already = await getVendorForUser(session.user.id);
  if (already) return { ok: false, error: "You already have a listing." };

  const name = input.name?.trim();
  const category = input.category as VendorCategorySlug;
  const loc = keralaLocations.find((l) => l.slug === input.city || l.city === input.city);
  const eventTypes = (input.eventTypes ?? []).filter(Boolean) as EventCategorySlug[];
  const packages = (input.packages ?? []).filter((p) => p.name?.trim() && p.price > 0);

  if (!name) return { ok: false, error: "Please enter your business name." };
  if (!vendorCategoryLabels[category]) return { ok: false, error: "Please choose a category." };
  if (!input.tagline?.trim()) return { ok: false, error: "Please add a short tagline." };
  if (!input.about?.trim()) return { ok: false, error: "Please describe your services." };
  if (!loc) return { ok: false, error: "Please choose your city." };
  if (!input.startingPrice || input.startingPrice <= 0)
    return { ok: false, error: "Please enter a starting price." };
  if (eventTypes.length === 0) return { ok: false, error: "Pick at least one occasion you serve." };
  if (packages.length === 0) return { ok: false, error: "Add at least one package with a price." };

  // Cover photo is optional. When present, only accept a well-formed image data URL of a sane size.
  let coverImage: string | null = null;
  if (input.coverImage) {
    if (!/^data:image\/(png|jpe?g|webp);base64,/.test(input.coverImage)) {
      return { ok: false, error: "That photo format isn't supported. Try a JPG, PNG or WebP." };
    }
    if (input.coverImage.length > MAX_COVER_IMAGE_LENGTH) {
      return { ok: false, error: "That photo is too large. Please choose a smaller image." };
    }
    coverImage = input.coverImage;
  }

  // Unique slug.
  const base = slugify(name) || "vendor";
  let slug = base;
  let n = 2;
  while (await prisma.vendor.findUnique({ where: { slug }, select: { id: true } })) {
    slug = `${base}-${n++}`;
  }

  const gradient = GRADIENTS[hashInt(slug) % GRADIENTS.length];
  const galleryBase = (hashInt(slug) % 140) + 1;
  const gallerySeeds = Array.from({ length: 6 }, (_, i) => galleryBase + i);
  const cleanAreas = input.serviceAreas.filter(Boolean);

  await prisma.vendor.create({
    data: {
      slug,
      name,
      category,
      categoryLabel: vendorCategoryLabels[category],
      tagline: input.tagline.trim(),
      about: input.about.trim(),
      city: loc.city,
      district: loc.district,
      rating: 0,
      reviewCount: 0,
      startingPrice: Math.round(input.startingPrice),
      priceUnit: input.priceUnit || "package",
      verified: true,
      responseTime: input.responseTime || "within a day",
      bookings: 0,
      yearsActive: Math.max(0, Math.round(input.yearsActive || 0)),
      gradient,
      coverImage,
      services: input.services.filter(Boolean),
      highlights: input.highlights.filter(Boolean),
      serviceAreas: cleanAreas.length ? cleanAreas : [loc.city],
      gallerySeeds,
      eventTypes,
      order: 0,
      userId: session.user.id,
      packages: {
        create: packages.map((p, j) => ({
          name: p.name.trim(),
          price: Math.round(p.price),
          unit: p.unit?.trim() || input.priceUnit || null,
          popular: j === 0,
          features: p.features.filter(Boolean),
          order: j,
        })),
      },
    },
  });

  revalidatePath("/vendor");
  revalidatePath("/vendors");
  return { ok: true };
}

/** Admin-only: manually hide/unhide a vendor listing from the marketplace (by unique slug). */
export async function setVendorApproval(slug: string, approved: boolean): Promise<ListingResult> {
  const session = await auth();
  if (session?.user?.role !== "admin") return { ok: false, error: "Not authorized." };
  await prisma.vendor.update({ where: { slug }, data: { verified: approved } });
  revalidatePath("/admin");
  revalidatePath("/vendors");
  revalidatePath("/");
  return { ok: true };
}

/**
 * Admin-only: permanently delete a vendor listing (by unique slug). Cascades to its
 * packages/reviews; any CRM leads that pointed at it are detached (kept, vendor unset).
 */
export async function deleteVendorListing(slug: string): Promise<ListingResult> {
  const session = await auth();
  if (session?.user?.role !== "admin") return { ok: false, error: "Not authorized." };
  await prisma.vendor.delete({ where: { slug } });
  revalidatePath("/admin");
  revalidatePath("/vendors");
  revalidatePath("/");
  return { ok: true };
}
