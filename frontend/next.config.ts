import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/portal",
        permanent: true,
      },
      {
        source: "/app",
        destination: "/portal",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
