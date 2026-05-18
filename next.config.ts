import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/off-plan/:path*",
        destination: "/off-plan-properties/in-dubai/:path*",
        permanent: true,
      },
      {
        source: "/buy/:path*",
        destination: "/properties/buy/in-dubai/:path*",
        permanent: true,
      },
      {
        source: "/rent/:path*",
        destination: "/properties/rent/in-dubai/:path*",
        permanent: true,
      },
      { source: "/about", destination: "/who-we-are", permanent: true },
      { source: "/about/:path*", destination: "/who-we-are", permanent: true },
      {
        source: "/areas",
        destination: "/properties/buy/in-dubai",
        permanent: false,
      },
    ];
  },
  images: {
    // formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "rrelistingimages.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "rrelistingimages.s3.eu-north-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
