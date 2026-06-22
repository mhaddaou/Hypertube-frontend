import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    qualities: [75, 90, 92],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yts.am",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "yts.mx",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.yts.mx",
        pathname: "/assets/images/movies/**",
      },
      {
        protocol: "https",
        hostname: "yts.bz",
        pathname: "/assets/images/movies/**",
      },
      {
        protocol: "https",
        hostname: "yts.gg",
        pathname: "/assets/images/movies/**",
      },
    ],
  },
};

export default nextConfig;
