/**
 * Debug script to see what XML tags exist in the REDSP feed
 * Run with: node scripts/debug-xml-tags.js
 */

// Bypass SSL certificate issues
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const https = require('https');

const FEED_URL = 'https://xml.redsp.net/file/450/23a140q0551/general-zone-1-kyero.xml';

https.get(FEED_URL, { rejectUnauthorized: false }, (res) => {
  let data = '';

  res.on('data', chunk => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Feed size:', data.length, 'bytes');

    // Find first property
    const propertyMatch = data.match(/<property>([\s\S]*?)<\/property>/);

    if (!propertyMatch) {
      console.log('No <property> tag found. First 2000 chars:');
      console.log(data.substring(0, 2000));
      return;
    }

    const propertyXml = propertyMatch[1];

    console.log('\n=== ALL TAGS IN FIRST PROPERTY ===\n');

    // Extract all tag names
    const tagMatches = propertyXml.matchAll(/<([a-zA-Z_][a-zA-Z0-9_-]*)[^>]*>/g);
    const tags = new Set();

    for (const match of tagMatches) {
      tags.add(match[1]);
    }

    console.log('Tags found:', Array.from(tags).sort().join(', '));

    console.log('\n=== SEARCHING FOR DEVELOPMENT/BUILDER RELATED TAGS ===\n');

    // Search for anything that might be development/builder related
    const searchTerms = ['develop', 'builder', 'promot', 'project', 'deliv', 'complet', 'status', 'phase', 'const', 'ready', 'new_build', 'newbuild', 'obra'];

    for (const term of searchTerms) {
      const regex = new RegExp(`<([^>]*${term}[^>]*)>([^<]*)<`, 'gi');
      const matches = propertyXml.matchAll(regex);
      for (const m of matches) {
        console.log(`Found: <${m[1]}> = "${m[2].substring(0, 100)}"`);
      }
    }

    console.log('\n=== FULL FIRST PROPERTY XML ===\n');
    console.log(propertyXml.substring(0, 5000));
  });

}).on('error', (e) => {
  console.error('Error fetching feed:', e.message);
});
