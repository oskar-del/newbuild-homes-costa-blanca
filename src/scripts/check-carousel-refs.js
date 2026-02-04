/**
 * Check which carousel refs exist in the feed
 * Run: NODE_TLS_REJECT_UNAUTHORIZED=0 node src/scripts/check-carousel-refs.js
 */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const https = require('https');
const fs = require('fs');
const path = require('path');

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
  
  // Build map of REF -> property data
  const refMap = new Map();
  const propertyMatches = xml.match(/<property>[\s\S]*?<\/property>/g) || [];
  
  for (const propXml of propertyMatches) {
    const refMatch = propXml.match(/<ref>([^<]+)<\/ref>/);
    const idMatch = propXml.match(/<id>([^<]+)<\/id>/);
    const townMatch = propXml.match(/<town>([^<]+)<\/town>/);
    const priceMatch = propXml.match(/<price>([^<]+)<\/price>/);
    const imgMatch = propXml.match(/https?:\/\/fotos\d*\.apinmo\.com\/[^\s<>"]+/);
    
    if (refMatch) {
      refMap.set(refMatch[1].toUpperCase(), {
        ref: refMatch[1],
        id: idMatch ? idMatch[1] : '',
        town: townMatch ? townMatch[1] : '',
        price: priceMatch ? priceMatch[1] : '',
        image: imgMatch ? imgMatch[0] : '',
      });
    }
  }
  
  console.log(`Feed has ${refMap.size} properties with REF numbers\n`);
  
  // Load carousel JSON
  const carouselPath = path.join(__dirname, '..', 'content', 'homepage-carousels.json');
  const carouselData = JSON.parse(fs.readFileSync(carouselPath, 'utf-8'));
  
  // Check each carousel
  for (const [carouselId, carousel] of Object.entries(carouselData.carousels)) {
    console.log(`\n📦 ${carouselId}:`);
    
    for (const prop of carousel.properties) {
      const ref = prop.reference.toUpperCase();
      const feedProp = refMap.get(ref);
      
      if (feedProp) {
        console.log(`   ✓ ${prop.reference} EXISTS - ${feedProp.town} €${feedProp.price} ${feedProp.image ? '(has image)' : '(no image)'}`);
      } else {
        console.log(`   ✗ ${prop.reference} NOT FOUND`);
      }
    }
  }
  
  // Show some available golf properties
  console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('AVAILABLE PROPERTIES (samples):');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  let count = 0;
  for (const [ref, prop] of refMap) {
    if (count < 30 && prop.image) {
      console.log(`${prop.ref} | ${prop.town} | €${prop.price} | ID: ${prop.id}`);
      count++;
    }
  }
}

main().catch(console.error);
