import type { Metadata, Viewport } from "next";
import { Allura, Great_Vibes, Lora } from "next/font/google";
import "./globals.css";
import ContactRibbon from "./components/ContactRibbon";

/** Warm readable serif — body, forms, eyebrows */
const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/** Flowing script for titles & nav — pairs with Great Vibes brand */
const allura = Allura({
  weight: "400",
  variable: "--font-heading-script",
  subsets: ["latin"],
});

/** “Taylor Rose Reels” in the header — signature style */
const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-brand-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taylor Rose Reels | Golden Hour Wedding & Portrait Photography",
  description:
    "Photography inspired by open fields, cedar arches, and soft film light—sage greens, wheat gold, and airy romance for Southern and boho-modern love stories.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${allura.variable} ${greatVibes.variable} antialiased`}
      >
        <div className="relative z-10 min-h-dvh overflow-x-hidden max-sm:pb-[calc(7.5rem+env(safe-area-inset-bottom,0px))]">
          {children}
          <ContactRibbon />
        </div>
      </body>
    </html>
  );
}
