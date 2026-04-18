import type { Metadata } from "next";
import "./globals.css";
import "./rainier.css";

export const metadata: Metadata = {
  title: "Rainier Plumbing — Seattle's Trusted Plumber",
  description: "Licensed, bonded, and insured plumbing for Seattle and the Puget Sound. Emergency and scheduled service. Call (206) 420-1188.",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Inter+Tight:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
