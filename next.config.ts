import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        // WordPress had an empty Uncategorized archive — send to blog.
        source: "/category/uncategorized",
        destination: "/blog",
        permanent: false,
      },
      {
        source: "/category/uncategorized/",
        destination: "/blog",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
