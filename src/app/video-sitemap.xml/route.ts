/**
 * Video Sitemap for Google Search Console
 *
 * Google requires video information in sitemap format to discover and index videos.
 * This generates a video sitemap with <video:video> tags per Google's specification:
 * https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps
 */

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface VideoData {
  slug: string;
  title: string;
  youtubeId: string;
  description: string;
  category: string;
  tags: string[];
  relatedAreas: string[];
  relatedDevelopments: string[];
  relatedProperties: string[];
  propertyRef: string | null;
  price: number | null;
  publishedAt: string;
  duration: string;
  featured: boolean;
}

function parseDuration(duration: string): string {
  // Convert "4:30" to ISO 8601 "PT4M30S"
  const parts = duration.split(':');
  if (parts.length === 2) {
    return `PT${parts[0]}M${parts[1]}S`;
  }
  if (parts.length === 3) {
    return `PT${parts[0]}H${parts[1]}M${parts[2]}S`;
  }
  return 'PT0M0S';
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function loadVideos(): VideoData[] {
  const videosDir = path.join(process.cwd(), 'src/content/videos');
  if (!fs.existsSync(videosDir)) return [];

  return fs.readdirSync(videosDir)
    .filter(f => f.endsWith('.json') && !f.startsWith('_'))
    .map(file => {
      try {
        return JSON.parse(fs.readFileSync(path.join(videosDir, file), 'utf-8'));
      } catch {
        return null;
      }
    })
    .filter((v): v is VideoData => v !== null && v.youtubeId);
}

export async function GET() {
  const baseUrl = 'https://newbuildhomescostablanca.com';
  const videos = loadVideos();

  // Build video sitemap entries
  // Each video can appear on multiple pages (development page, area page, property pages)
  const entries: string[] = [];

  for (const video of videos) {
    const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;
    const contentUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;
    const playerLoc = `https://www.youtube.com/embed/${video.youtubeId}`;
    const isoDuration = parseDuration(video.duration);
    const tags = video.tags.map(t => `      <video:tag>${escapeXml(t)}</video:tag>`).join('\n');

    // Video on development pages
    for (const dev of video.relatedDevelopments) {
      entries.push(`
  <url>
    <loc>${baseUrl}/developments/${dev}</loc>
    <video:video>
      <video:thumbnail_loc>${thumbnailUrl}</video:thumbnail_loc>
      <video:title>${escapeXml(video.title)}</video:title>
      <video:description>${escapeXml(video.description)}</video:description>
      <video:content_loc>${contentUrl}</video:content_loc>
      <video:player_loc>${playerLoc}</video:player_loc>
      <video:duration>${Math.floor(parseInt(video.duration.split(':')[0]) * 60 + parseInt(video.duration.split(':')[1] || '0'))}</video:duration>
      <video:publication_date>${video.publishedAt}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:category>${escapeXml(video.category)}</video:category>
${tags}
    </video:video>
  </url>`);
    }

    // Video on area pages
    for (const area of video.relatedAreas) {
      entries.push(`
  <url>
    <loc>${baseUrl}/areas/${area}</loc>
    <video:video>
      <video:thumbnail_loc>${thumbnailUrl}</video:thumbnail_loc>
      <video:title>${escapeXml(video.title)}</video:title>
      <video:description>${escapeXml(video.description)}</video:description>
      <video:content_loc>${contentUrl}</video:content_loc>
      <video:player_loc>${playerLoc}</video:player_loc>
      <video:duration>${Math.floor(parseInt(video.duration.split(':')[0]) * 60 + parseInt(video.duration.split(':')[1] || '0'))}</video:duration>
      <video:publication_date>${video.publishedAt}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:category>${escapeXml(video.category)}</video:category>
${tags}
    </video:video>
  </url>`);
    }

    // Video on property pages
    for (const propRef of video.relatedProperties) {
      entries.push(`
  <url>
    <loc>${baseUrl}/properties/${propRef}</loc>
    <video:video>
      <video:thumbnail_loc>${thumbnailUrl}</video:thumbnail_loc>
      <video:title>${escapeXml(video.title)}</video:title>
      <video:description>${escapeXml(video.description)}</video:description>
      <video:content_loc>${contentUrl}</video:content_loc>
      <video:player_loc>${playerLoc}</video:player_loc>
      <video:duration>${Math.floor(parseInt(video.duration.split(':')[0]) * 60 + parseInt(video.duration.split(':')[1] || '0'))}</video:duration>
      <video:publication_date>${video.publishedAt}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:category>${escapeXml(video.category)}</video:category>
${tags}
    </video:video>
  </url>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${entries.join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
