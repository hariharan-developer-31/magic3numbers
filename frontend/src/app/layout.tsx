import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "magic3numbers — Your Cosmic Identity. Your Three Sacred Numbers.",
  description:
    "Unified Personal Astrology, Numerology & Cosmic Number Discovery Platform combining Sidereal Vedic Jyotish, Tropical Western Natal Geometry, and Pythagorean Numerology.",
  keywords: [
    "astrology",
    "numerology",
    "magic3numbers",
    "vedic astrology",
    "life path number",
    "nakshatra",
    "rashi",
    "cosmic identity",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-[#5B3BD1] selection:text-white">
        {children}
      </body>
    </html>
  );
}
