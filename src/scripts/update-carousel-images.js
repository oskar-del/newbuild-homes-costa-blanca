/**
 * Homepage Carousel Image Updater - FIXED v2
 * Now looks up properties by REF (N6673) instead of ID (2886-115-10-115)
 * 
 * Run: NODE_TLS_REJECT_UNAUTHORIZED=0 node src/scripts/update-carousel-images.js
 */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const fs = require('fs');
const path = require('path');
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

async function fetchFeedProperties() {
  console.log('Fetching REDSP feed...');
  const xml = await fetchUrl(REDSP_FEED_URL);
  console.log(`Received ${(xml.length / 1024).toFixed(0)} KB of XML`);
  
  const properties = new Map();
  const propertyMatches = xml.match(/<property>[\s\S]*?<\/property>/g) || [];
  
  for (const propXml of propertyMatches) {
    const getValue = (tag) => {
      const cdataMatch = propXml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`));
      if (cdataMatch) return cdataMatch[1].trim();
      const simpleMatch = propXml.match(new RegExp(`<${tag}[^>]*>([^<]*)<\\/${tag}>`));
      if (simpleMatch) return simpleMatch[1].trim();
      return '';
    };
    
    // FIXED: Use REF as the key (N6673 format), not ID
    const ref = getValue('ref');
    const id = getValue('id');
    if (!ref) continue;
    
    // Get apinmo.com image URLs
    const images = [];
    const apinmoMatches = propXml.match(/https?:\/\/fotos\d*\.apinmo\.com\/[^\s<>"]+/g) || [];
    for (const url of apinmoMatches) {
      if (!images.includes(url)) {
        images.push(url);
      }
    }
    
    // Store by REF (uppercase for case-insensitive matching)
    properties.set(ref.toUpperCase(), {
      reference: ref,
      id: id,
      town: getValue('town') || getValue('location'),
      propertyType: getValue('type'),
      bedrooms: parseInt(getValue('beds')) || 0,
      bathrooms: parseInt(getValue('baths')) || 0,
      builtArea: parseInt(getValue('surface_area')) || parseInt(getValue('built')) || 0,
      price: parseInt(getValue('price')) || 0,
      images,
    });
  }
  
  console.log(`Parsed ${properties.size} properties from feed`);
  
  let withImages = 0;
  for (const [ref, prop] of properties) {
    if (prop.images.length > 0) withImages++;
  }
  console.log(`Properties with images: ${withImages}`);
  
  return properties;
}

async function main() {
  console.log('🏠 Homepage Carousel Image Updater (FIXED v2)\n');
  
  const feedProperties = await fetchFeedProperties();
  
  const carouselPath = path.join(__dirname, '..', 'content', 'homepage-carousels.json');
  console.log(`\nLoading: ${carouselPath}`);
  const carouselData = JSON.parse(fs.readFileSync(carouselPath, 'utf-8'));
  
  console.log('\nProcessing carousels...\n');
  
  let totalUpdated = 0;
  let totalMissing = 0;
  
  for (const [carouselId, carousel] of Object.entries(carouselData.carousels)) {
    console.log(`📦 ${carouselId}:`);
    
    for (const prop of carousel.properties) {
      const ref = prop.reference.toUpperCase();
      const feedProp = feedProperties.get(ref);
      
      if (feedProp && feedProp.images.length > 0) {
        prop.image = feedProp.images[0];
        console.log(`   ✓ ${prop.reference}: Added image`);
        totalUpdated++;
      } else if (feedProp) {
        console.log(`   ⚠ ${prop.reference}: Found but no images`);
        totalMissing++;
      } else {
        console.log(`   ✗ ${prop.reference}: Not found in feed`);
        totalMissing++;
      }
    }
    console.log('');
  }
  
  carouselData.lastUpdated = new Date().toISOString().split('T')[0];
  fs.writeFileSync(carouselPath, JSON.stringify(carouselData, null, 2));
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 Summary:');
  console.log(`   ✓ Images added: ${totalUpdated}`);
  console.log(`   ✗ Missing/issues: ${totalMissing}`);
  console.log(`\n✅ Saved to: ${carouselPath}`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
