"use server";

import { randomUUID } from "node:crypto";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { sendEmail } from "@/lib/email";
import { site } from "@/lib/data/site";

export interface BookingResult {
  ok: boolean;
  error?: string;
}

/** A vendor booking request from the public vendor page → persisted as a Lead. */
export async function createBookingRequest(input: {
  vendorSlug: string;
  name: string;
  phone: string;
  message?: string;
  packageName?: string;
  date?: string;
  guests?: string;
}): Promise<BookingResult> {
  const name = input.name?.trim();
  const phone = input.phone?.trim();
  if (!name) return { ok: false, error: "Please enter your name." };
  if (!phone) return { ok: false, error: "Please enter a phone number." };

  const vendor = await prisma.vendor.findUnique({
    where: { slug: input.vendorSlug },
    select: { id: true, name: true },
  });
  if (!vendor) return { ok: false, error: "Sorry, that vendor could not be found." };

  // If a logged-in family user is enquiring, attribute the lead to them.
  const session = await auth();
  const customer = session?.user?.name || name;

  const extras = [
    input.guests ? `${input.guests} guests` : null,
    input.date ? `date ${input.date}` : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const message = [
    input.message?.trim() || `Booking request for ${input.packageName ?? "a package"}.`,
    extras ? `(${extras})` : null,
    `Contact: ${phone}`,
  ]
    .filter(Boolean)
    .join(" ");

  await prisma.lead.create({
    data: {
      leadKey: `L-${randomUUID().slice(0, 8)}`,
      vendorId: vendor.id,
      customer,
      event: input.packageName || "Booking enquiry",
      date: input.date || "To be decided",
      location: session?.user?.email ? "From account" : "Website enquiry",
      budget: 0,
      status: "new",
      message,
      receivedAt: "Just now",
    },
  });

  // Notify (dev: logged to console; prod: emailed).
  await sendEmail({
    to: site.founderEmail,
    subject: `New booking request · ${vendor.name}`,
    html: `<p><strong>${customer}</strong> (${phone}) requested <strong>${input.packageName ?? "a booking"}</strong> from <strong>${vendor.name}</strong>.</p><p>${message}</p>`,
  });

  return { ok: true };
}
