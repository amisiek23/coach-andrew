import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wpstrona.wpmudev.host",
        pathname: "/coachandrew/**",
      },
    ],
  },
};

export default nextConfig;
