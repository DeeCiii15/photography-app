import type { Metadata, Viewport } from "next";
import { Allura, Great_Vibes, Lora } from "next/font/google";
import "./globals.css";
import ContactRibbon from "./components/ContactRibbon";
import SiteJsonLd from "./components/SiteJsonLd";
import {
  DEFAULT_OG_IMAGE_PATH,
  getSiteUrl,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/siteConfig";

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

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} | Golden Hour Wedding & Portrait Photography`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "wedding photographer",
    "portrait photographer",
    "Southern wedding photography",
    "natural light photography",
    "elopement photographer",
    "engagement photographer",
    SITE_NAME,
  ],
  authors: [{ name: SITE_NAME, url: siteUrl }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Golden Hour Wedding & Portrait Photography`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE_PATH,
        alt: `${SITE_NAME} — photographer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Wedding & Portrait Photography`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE_PATH],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    telephone: false,
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
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
        <SiteJsonLd />
        <div className="relative z-10 min-h-dvh overflow-x-hidden max-sm:pb-[calc(8.75rem+env(safe-area-inset-bottom,0px))]">
          {children}
          <ContactRibbon />
        </div>
      </body>
    </html>
  );
}
