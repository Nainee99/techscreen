import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable strict mode for React
  reactStrictMode: true,

  // Ignore TypeScript errors during build (use cautiously)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Ignore ESLint errors during build (use cautiously)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Additional configurations can be added here
};

export default nextConfig;
