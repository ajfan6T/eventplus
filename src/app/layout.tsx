import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://eventplus.in"),
  title: {
    default: "Eventplus — Plan unforgettable celebrations in Kerala",
    template: "%s · Eventplus",
  },
  description:
    "Eventplus connects Kerala families with verified event vendors. Plan weddings, housewarmings, birthdays, baby showers and inaugurations with an AI-powered checklist, live budget tracking, curated vendors and one-place booking.",
  keywords: [
    "Kerala wedding planner",
    "event vendors Kerala",
    "wedding vendors Kochi",
    "housewarming Kerala",
    "corporate events Infopark Technopark",
    "Eventplus",
  ],
  openGraph: {
    title: "Eventplus — Plan unforgettable celebrations in Kerala",
    description:
      "AI-powered event planning for Kerala families. Verified vendors, live budgets and one-place booking.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
