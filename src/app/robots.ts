import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/data/',  // Block API data routes but allow static assets (CSS/JS) for proper rendering
          '/admin/',
        ],
      },
    ],
    sitemap: [
      'https://newbuildhomescostablanca.com/sitemap.xml',
      'https://newbuildhomescostablanca.com/video-sitemap.xml',
    ],
  };
}
