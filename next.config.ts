import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  async redirects() {
    return [
      {
        source: "/wedding-photography-florence-sc",
        destination: "/florence-sc-wedding-photography",
        permanent: true,
      },
      {
        source: "/pricing",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/experience",
        destination: "/services/wedding-photography",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/services/wedding-photography",
        permanent: true,
      },
      // Legacy wedding shoot URLs → location-wedding-venue slugs
      {
        source: "/portfolio/weddings/tennessee-wedding",
        destination: "/portfolio/weddings/tennessee-wedding-emerald-ridge",
        permanent: true,
      },
      {
        source: "/portfolio/weddings/mount-pleasant-sc-wedding",
        destination:
          "/portfolio/weddings/mount-pleasant-sc-wedding-dunes-west-golf-river-club",
        permanent: true,
      },
      {
        source: "/portfolio/weddings/patrick-sc-wedding",
        destination: "/portfolio/weddings/patrick-sc-wedding-griggs-farm",
        permanent: true,
      },
      {
        source: "/portfolio/weddings/pamplico-sc-wedding",
        destination: "/portfolio/weddings/pamplico-sc-wedding-sawtooth-acres",
        permanent: true,
      },
      {
        source: "/portfolio/weddings/florence-sc-wedding",
        destination: "/portfolio/weddings/florence-sc-wedding-glenview-farms",
        permanent: true,
      },
      {
        source: "/portfolio/weddings/timmonsville-sc-wedding",
        destination:
          "/portfolio/weddings/timmonsville-sc-wedding-the-cabin-at-old-spur",
        permanent: true,
      },
      {
        source: "/portfolio/weddings/latta-sc-wedding-the-lees",
        destination: "/portfolio/weddings/latta-sc-wedding-parker-pines-lee",
        permanent: true,
      },
      {
        source: "/portfolio/weddings/latta-sc-wedding-the-flowers",
        destination:
          "/portfolio/weddings/latta-sc-wedding-parker-pines-flowers",
        permanent: true,
      },
      {
        source: "/portfolio/weddings/darlington-sc-wedding",
        destination: "/portfolio/weddings/darlington-sc-wedding-murphy-farms",
        permanent: true,
      },
    ];
  },
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
