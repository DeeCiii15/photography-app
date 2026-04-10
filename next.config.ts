import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /** Allow max quality for full-bleed heroes (default list tops out below 100). */
    qualities: [75, 80, 85, 90, 92, 95, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
