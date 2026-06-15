import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { KasavuDivider, Mandala } from "@/components/decor/motifs";
import { footerNav, site } from "@/lib/data/site";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M14 9h3l.5-3H14V4.5c0-.9.3-1.5 1.6-1.5H17V.3A22 22 0 0 0 14.7 0C12.2 0 10.5 1.5 10.5 4.2V6H8v3h2.5v9H14V9Z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 0 0 1 7.5 31 31 0 0 0 .6 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.4 12 31 31 0 0 0 23 7.5ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border bg-maroon-900 text-cream-200">
      <Mandala className="pointer-events-none absolute -right-20 -top-24 size-80 text-gold-500/10" />
      <Mandala className="pointer-events-none absolute -left-24 bottom-0 size-72 text-gold-500/[0.07]" />
      <Container className="relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="flex flex-col gap-5">
            <Logo tone="light" />
            <p className="max-w-xs text-sm leading-relaxed text-cream-200/70">
              The all-in-one way for Kerala families to plan weddings, housewarmings and
              celebrations — with verified vendors and an AI co-planner.
            </p>
            <div className="flex flex-col gap-2 text-sm text-cream-200/70">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-gold-400" /> {site.city}
              </span>
              <a href={`tel:${site.phone}`} className="inline-flex items-center gap-2 hover:text-cream-50">
                <Phone className="size-4 text-gold-400" /> {site.phone}
              </a>
              <a href={`mailto:${site.founderEmail}`} className="inline-flex items-center gap-2 hover:text-cream-50">
                <Mail className="size-4 text-gold-400" /> {site.founderEmail}
              </a>
            </div>
            <div className="flex gap-3">
              {[
                { href: site.social.instagram, icon: InstagramIcon, label: "Instagram" },
                { href: site.social.facebook, icon: FacebookIcon, label: "Facebook" },
                { href: site.social.youtube, icon: YoutubeIcon, label: "YouTube" },
              ].map(({ href, icon: SocialIcon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-cream-200/15 text-cream-200/80 transition-colors hover:border-gold-400 hover:text-gold-300"
                >
                  <SocialIcon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerNav).map(([group, links]) => (
            <div key={group} className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-300">
                {group}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream-200/70 transition-colors hover:text-cream-50"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <KasavuDivider className="my-10 opacity-60" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-cream-200/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Eventplus. Crafted in Kerala with care.</p>
          <p className="inline-flex items-center gap-2">
            <span className="inline-block size-2 rounded-full bg-green-400" />
            Phase one · Built for the Kerala market
          </p>
        </div>
      </Container>
    </footer>
  );
}
