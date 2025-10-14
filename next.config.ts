import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "your-domain.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "be-beautiful-backend.onrender.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "example.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
