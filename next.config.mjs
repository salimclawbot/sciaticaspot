/** @type {import('next').NextConfig} */
const nextConfig = {
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
        source: "/best-sleeping-positions-for-sciatica",
        destination: "/best-sleeping-position-for-sciatica",
        permanent: true,
      },
      {
        source: "/best-sciatica-pain-relief-exercises-2026",
        destination: "/sciatica-exercises",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
