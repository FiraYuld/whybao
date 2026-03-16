import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    localPatterns: [
      { pathname: "/logo.webp" },
      { pathname: "/apple-touch-icon.png" },
      { pathname: "/products/**" },
      { pathname: "/hero/**" },
    ],
  },
};

export default nextConfig;
