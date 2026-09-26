import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: ["*.space-z.ai", "localhost"],
  images: {
    // Allow the quality props used by the hero (85) and about (80) portraits
    qualities: [75, 80, 85],
  },
};

export default nextConfig;
