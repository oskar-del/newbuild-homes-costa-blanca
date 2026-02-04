/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Disable image optimization to prevent memory issues (SIGKILL) during dev/build
    // External images from apinmo, unsplash, etc. were causing Out of Memory crashes
    unoptimized: true,
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
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
