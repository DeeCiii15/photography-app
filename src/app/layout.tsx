import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Dancing_Script, Lora } from "next/font/google";
import "./globals.css";
import ContactRibbon from "./components/ContactRibbon";
import SiteJsonLd from "./components/SiteJsonLd";
import {
  DEFAULT_OG_IMAGE_PATH,
  getSiteUrl,
  LOCAL_KEYWORDS,
  PHOTOGRAPHER_IMAGE_ALT,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/siteConfig";

/** Warm readable serif — body, forms, eyebrows */
const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/** Casual connected script — headlines, brand name, and decorative UI */
const signatureScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} | ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} Wedding & Portrait Photographer`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [...LOCAL_KEYWORDS],
  authors: [{ name: SITE_NAME, url: siteUrl }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} Wedding & Portrait Photographer`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE_PATH,
        alt: PHOTOGRAPHER_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} Photographer`,
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
        className={`${lora.variable} ${signatureScript.variable} antialiased`}
      >
        <SiteJsonLd />
        <div className="relative z-10 min-h-dvh overflow-x-hidden max-sm:pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))]">
          {children}
          <ContactRibbon />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
