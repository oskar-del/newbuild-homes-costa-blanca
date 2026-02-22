/** @type {import('next').NextConfig} */
const nextConfig = {
  // Reduce memory usage during build
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  // Include article JSON files in serverless function bundles (needed for Netlify ISR)
  outputFileTracingIncludes: {
    '/blog/[slug]': ['./src/content/articles/**/*.json'],
    '/sv/blog/[slug]': ['./src/content/articles/**/*.json'],
    '/de/blog/[slug]': ['./src/content/articles/**/*.json'],
    '/nl/blog/[slug]': ['./src/content/articles/**/*.json'],
    '/nl-be/blog/[slug]': ['./src/content/articles/**/*.json'],
    '/fr/blog/[slug]': ['./src/content/articles/**/*.json'],
    '/no/blog/[slug]': ['./src/content/articles/**/*.json'],
    '/pl/blog/[slug]': ['./src/content/articles/**/*.json'],
    '/ru/blog/[slug]': ['./src/content/articles/**/*.json'],
  },
  // Reduce timeout for static page generation to speed up build
  staticPageGenerationTimeout: 120, // 2 minutes instead of 5 minutes
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
