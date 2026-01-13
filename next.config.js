/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
      {
        protocol: 'https',
        hostname: '**.apinmo.com',
      },
      {
        protocol: 'https',
        hostname: 'hanssonhertzell.se',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
}

module.exports = nextConfig
