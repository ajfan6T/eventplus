import "server-only";
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.RESEND_FROM || "Eventplus <onboarding@resend.dev>";

export interface SendEmailInput {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Send a transactional email via Resend. With no RESEND_API_KEY (dev), the
 * email is logged to the server console instead of sent — so flows work offline.
 */
export async function sendEmail({ to, subject, html, replyTo }: SendEmailInput) {
  if (!apiKey) {
    console.log(
      `\n[email:dev] (no RESEND_API_KEY — not sent)\n  to: ${Array.isArray(to) ? to.join(", ") : to}\n  subject: ${subject}\n  reply-to: ${replyTo ?? "—"}\n`
    );
    return { ok: true, delivered: false as const };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({ from, to, subject, html, replyTo });
    if (error) {
      console.error("[email] Resend error:", error);
      return { ok: false, delivered: false as const };
    }
    return { ok: true, delivered: true as const };
  } catch (err) {
    console.error("[email] send failed:", err);
    return { ok: false, delivered: false as const };
  }
}
