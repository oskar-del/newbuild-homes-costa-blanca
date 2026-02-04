/**
 * Debug: Show what property references exist in the feed
 * Run: NODE_TLS_REJECT_UNAUTHORIZED=0 node src/scripts/debug-refs.js
 */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const https = require('https');

const REDSP_FEED_URL = 'https://xml.redsp.net/file/450/23a140q0551/general-zone-1-kyero.xml';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { rejectUnauthorized: false }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  console.log('Fetching feed...\n');
  const xml = await fetchUrl(REDSP_FEED_URL);
  
  const propertyMatches = xml.match(/<property>[\s\S]*?<\/property>/g) || [];
  
  console.log(`Found ${propertyMatches.length} properties\n`);
  console.log('First 20 property references:\n');
  
  for (let i = 0; i < Math.min(20, propertyMatches.length); i++) {
    const propXml = propertyMatches[i];
    
    // Get ID
    const idMatch = propXml.match(/<id>([^<]+)<\/id>/);
    const refMatch = propXml.match(/<ref>([^<]+)<\/ref>/);
    
    const id = idMatch ? idMatch[1] : 'no-id';
    const ref = refMatch ? refMatch[1] : 'no-ref';
    
    // Get first image
    const imgMatch = propXml.match(/https?:\/\/fotos\d*\.apinmo\.com\/[^\s<>"]+/);
    const hasImage = imgMatch ? '✓' : '✗';
    
    console.log(`${i+1}. ID: ${id} | REF: ${ref} | Image: ${hasImage}`);
  }
  
  // Also search for N6673 specifically
  console.log('\n\nSearching for N6673...');
  const n6673Match = xml.match(/<property>[\s\S]*?N6673[\s\S]*?<\/property>/);
  if (n6673Match) {
    console.log('Found! First 500 chars:');
    console.log(n6673Match[0].substring(0, 500));
  } else {
    console.log('N6673 NOT FOUND in feed');
  }
}

main().catch(console.error);
