/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // This is required to allow the Next.js dev server to be accessed from the Project IDX preview window.
    // The glob pattern is required to allow all possible ports that may be used by the dev server.
    allowedDevOrigins: ["*.cloudworkstations.dev"],
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.tile.openstreetmap.org',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
