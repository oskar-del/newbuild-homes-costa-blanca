/**
 * Find Background Properties refs for North Costa Blanca
 * Uses the same logic as your unified-feed-service.ts
 * 
 * Run: node src/scripts/find-background-north.js
 */

const https = require('https');

const BACKGROUND_FEED_URL = 'https://backgroundproperties.com/wp-load.php?security_token=23f0185aeb5102e7&export_id=19&action=get_data';

const NORTH_TOWNS = ['calpe', 'altea', 'benidorm', 'finestrat', 'polop', 'la nucia', 'nucia', 'alfas', 'albir', 'villajoyosa', 'benissa', 'moraira', 'javea', 'jávea', 'xabia', 'denia', 'ondara', 'pedreguer', 'mutxamel', 'campello', 'teulada', 'benitachell', 'cumbre del sol'];

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

function isNorthTown(town) {
  if (!town) return false;
  const townLower = town.toLowerCase();
  return NORTH_TOWNS.some(t => townLower.includes(t));
}

async function main() {
  console.log('Fetching Background Properties feed...\n');
  
  try {
    const data = await fetchUrl(BACKGROUND_FEED_URL);
    
    if (!data || data.length < 100) {
      console.log('Feed empty or error. Trying to parse as XML...');
      return;
    }
    
    console.log(`Feed size: ${(data.length / 1024).toFixed(0)} KB\n`);
    
    let properties = [];
    
    // Try JSON first
    try {
      const json = JSON.parse(data);
      const items = Array.isArray(json) ? json : json.properties || json.listings || json.data || [];
      
      for (const item of items) {
        const ref = item.reference || item.ref || item.id || item.property_id || '';
        const town = item.town || item.location || item.city || item.area || '';
        const price = parseFloat(item.price) || 0;
        const type = item.type || item.property_type || '';
        const beds = item.bedrooms || item.beds || item.rooms || '';
        const images = item.images || item.photos || item.gallery || [];
        const hasImage = Array.isArray(images) ? images.length > 0 : !!images;
        const imageUrl = Array.isArray(images) && images.length > 0 
          ? (typeof images[0] === 'string' ? images[0] : images[0].url || images[0].src || '')
          : '';
        
        if (ref) {
          properties.push({ ref: String(ref), town, price, type, beds, hasImage, imageUrl });
        }
      }
      
      console.log(`Parsed ${properties.length} properties from JSON\n`);
      
    } catch (e) {
      // Try XML
      console.log('Not JSON, trying XML...\n');
      
      const matches = data.match(/<property>[\s\S]*?<\/property>/g) || 
                      data.match(/<listing>[\s\S]*?<\/listing>/g) || 
                      data.match(/<item>[\s\S]*?<\/item>/g) || [];
      
      for (const propXml of matches) {
        const ref = propXml.match(/<(?:ref|reference|id)>([^<]+)<\//)?.[1] || '';
        const town = propXml.match(/<(?:town|city|location)>([^<]+)<\//)?.[1] || '';
        const price = propXml.match(/<price>([^<]+)<\//)?.[1] || '';
        const type = propXml.match(/<type>([^<]+)<\//)?.[1] || '';
        const beds = propXml.match(/<(?:beds|bedrooms)>([^<]+)<\//)?.[1] || '';
        const imageUrl = propXml.match(/<(?:image|photo|url)>([^<]+)<\//)?.[1] || '';
        
        if (ref) {
          properties.push({ 
            ref, town, price: parseInt(price) || 0, type, beds, 
            hasImage: !!imageUrl, imageUrl 
          });
        }
      }
      
      console.log(`Parsed ${properties.length} properties from XML\n`);
    }
    
    // Filter North properties
    const northProps = properties.filter(p => isNorthTown(p.town));
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`NORTH COSTA BLANCA PROPERTIES: ${northProps.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    northProps.sort((a, b) => a.price - b.price).forEach(p => {
      const img = p.hasImage ? '✓' : '✗';
      console.log(`${p.ref} | ${p.town} | €${p.price?.toLocaleString()} | ${p.type} | ${p.beds} bed | img:${img}`);
    });
    
    // Show ALL properties if no North found
    if (northProps.length === 0) {
      console.log('\nNo North properties found. Showing all properties:\n');
      properties.slice(0, 30).forEach(p => {
        console.log(`${p.ref} | ${p.town} | €${p.price?.toLocaleString()} | ${p.type}`);
      });
    }
    
    // Suggestions for carousel replacements
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('SUGGESTED REPLACEMENTS:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\nFor SP0195 (Calpe Penthouse ~€559k):');
    const calpeProps = northProps.filter(p => 
      p.town.toLowerCase().includes('calpe') && p.price >= 400000 && p.price <= 700000
    );
    calpeProps.slice(0, 5).forEach(p => {
      console.log(`  ${p.ref} | ${p.town} | €${p.price?.toLocaleString()} | ${p.type}`);
    });
    
    console.log('\nFor SP1297 (Finestrat Villa ~€650k):');
    const finestratProps = northProps.filter(p => 
      (p.town.toLowerCase().includes('finestrat') || p.town.toLowerCase().includes('altea')) && 
      p.price >= 500000 && p.price <= 800000
    );
    finestratProps.slice(0, 5).forEach(p => {
      console.log(`  ${p.ref} | ${p.town} | €${p.price?.toLocaleString()} | ${p.type}`);
    });
    
  } catch (e) {
    console.log('Error:', e.message);
  }
}

main();
