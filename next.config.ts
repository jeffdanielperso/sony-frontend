import type { NextConfig } from "next";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const strapiHost = new URL(strapiUrl).hostname;

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
        search: "",
      },
      ...(strapiHost !== "localhost"
        ? [
            {
              protocol: "https" as const,
              hostname: strapiHost,
              pathname: "/uploads/**",
              search: "",
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
