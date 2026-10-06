import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  poweredByHeader: false,
  async redirects() {
    return [
      // WordPress Academy URL → new Academy path (nav label was already “Academy”)
      {
        source: "/courses",
        destination: "/academy",
        permanent: true,
      },
      // Empty Uncategorized archive
      {
        source: "/category/uncategorized",
        destination: "/blog",
        permanent: false,
      },
      // Common aliases → preserved WordPress slugs
      {
        source: "/thank-you",
        destination: "/thanks",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/terms-and-conditions",
        destination: "/terms",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
