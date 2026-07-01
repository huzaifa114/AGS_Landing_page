import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [256, 384, 640],
    imageSizes: [96, 128, 175, 256],
    qualities: [65, 75],
  },
  async redirects() {
    return [
      {
        source: "/verify",
        destination: "/verify-certification",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
