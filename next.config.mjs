/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/**": ["./content/**/*"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/images/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/best-sciatica-pain-relief-exercises-2026",
        destination: "/sciatica-exercises",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
