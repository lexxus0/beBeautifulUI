import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // this is the key change
    css: true,
  },
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
        pathname: "/**", // додай, якщо хочеш дозволити всі шляхи
      },
    ],
  },
};

export default nextConfig;
