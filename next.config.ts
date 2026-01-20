import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
      }
    ],
    unoptimized: false,
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
