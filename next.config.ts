import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      { pathname: "/logo.webp" },
      { pathname: "/apple-touch-icon.png" },
      { pathname: "/products/**" },
    ],
  },
};

export default nextConfig;
