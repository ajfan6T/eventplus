"use server";

import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { site } from "@/lib/data/site";

export interface InquiryResult {
  ok: boolean;
  error?: string;
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Corporate lead-capture → persisted + routed to the founder's email. */
export async function submitCorporateInquiry(input: {
  company: string;
  contactName: string;
  email: string;
  phone?: string;
  itPark?: string;
  eventType?: string;
  headcount?: string;
  budgetBand?: string;
  preferredAt?: string;
  message?: string;
}): Promise<InquiryResult> {
  const company = input.company?.trim();
  const contactName = input.contactName?.trim();
  const email = input.email?.trim();

  if (!company) return { ok: false, error: "Please enter your company name." };
  if (!contactName) return { ok: false, error: "Please enter a contact name." };
  if (!email || !EMAIL_RE.test(email))
    return { ok: false, error: "Please enter a valid work email." };

  await prisma.corporateInquiry.create({
    data: {
      company,
      contactName,
      email,
      phone: input.phone?.trim() || null,
      itPark: input.itPark || null,
      eventType: input.eventType || null,
      headcount: input.headcount || null,
      budgetBand: input.budgetBand || null,
      preferredAt: input.preferredAt || null,
      message: input.message?.trim() || null,
    },
  });

  const row = (label: string, value?: string | null) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#7d6a5d">${label}</td><td style="padding:4px 0;font-weight:600">${value || "—"}</td></tr>`;

  await sendEmail({
    to: site.founderEmail,
    replyTo: email,
    subject: `Corporate enquiry · ${company}${input.eventType ? ` (${input.eventType})` : ""}`,
    html: `
      <h2 style="font-family:Georgia,serif;color:#7b1e3b">New corporate enquiry</h2>
      <table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
        ${row("Company", company)}
        ${row("Contact", contactName)}
        ${row("Email", email)}
        ${row("Phone", input.phone)}
        ${row("IT park", input.itPark)}
        ${row("Event type", input.eventType)}
        ${row("Headcount", input.headcount)}
        ${row("Budget", input.budgetBand)}
        ${row("Preferred date", input.preferredAt)}
      </table>
      <p style="font-family:Arial,sans-serif;font-size:14px"><strong>Brief:</strong><br/>${(input.message ?? "").replace(/\n/g, "<br/>") || "—"}</p>
    `,
  });

  return { ok: true };
}
