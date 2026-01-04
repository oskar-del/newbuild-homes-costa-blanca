/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.redsp.net',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'feedmedia.egorealestate.com',
      },
      {
        protocol: 'https',
        hostname: 'backgroundproperties.com',
      },
    ],
  },
}

module.exports = nextConfig
