import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [];
  },
  output: "export", // Enable static export
  distDir: "dist", // Specify the output directory
  images: {
    unoptimized: true, // Disable Next.js Image Optimization for static exports
  },
  /* config options here */
};

export default nextConfig;
