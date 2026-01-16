import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.cryptocompare.com',
      },
      {
        protocol: 'https',
        hostname: 'qfs.developerplug.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
      },
    ],
    unoptimized: false,
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
