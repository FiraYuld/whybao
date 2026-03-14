import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [{ pathname: "/logo.webp" }],
  },
};

export default nextConfig;
