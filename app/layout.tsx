import type { Metadata } from "next";
import "./globals.css";
import "./rainier.css";

export const metadata: Metadata = {
  title: "Rainier Plumbing — Seattle's Trusted Plumber",
  description: "Licensed, bonded, and insured plumbing for Seattle and the Puget Sound. Emergency and scheduled service. Call (206) 420-1188.",
  openGraph: {
    title: "Rainier Plumbing — Seattle's Trusted Plumber",
    description: "Licensed, bonded, and insured plumbing for Seattle and the Puget Sound. Emergency and scheduled service.",
    type: "website",
  },
};

// DEMO DATA — this is the pitch demo, not a real business. Swap every value
// here (and the matching copy in components/) when cloning for a real client.
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  name: "Rainier Plumbing",
  description:
    "Licensed, bonded, and insured plumbing for Seattle and the Puget Sound. Emergency and scheduled service.",
  telephone: "+1-206-420-1188",
  priceRange: "$$",
  areaServed: { "@type": "City", name: "Seattle" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Seattle",
    addressRegion: "WA",
    addressCountry: "US",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "500",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=Inter+Tight:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
