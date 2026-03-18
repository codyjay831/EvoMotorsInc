import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    localPatterns: [
      { pathname: "/hero/**" },
      { pathname: "/logo-transparent-2048.png" },
      { pathname: "/road-transition-4k.jpg" },
      { pathname: "/placeholder-vehicle.svg" },
    ],
  },
};

export default nextConfig;
