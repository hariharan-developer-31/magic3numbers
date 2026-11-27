import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/icon.png" },
    ],
    shortcut: ["/favicon.ico"],
  },
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
