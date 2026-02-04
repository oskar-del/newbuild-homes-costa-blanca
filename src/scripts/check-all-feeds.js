/**
 * Check ALL feeds for North properties
 * Run: node src/scripts/check-all-feeds.js
 */

const https = require('https');
const http = require('http');

const FEEDS = {
  redsp: 'https://xml.redsp.net/file/450/23a140q0551/general-zone-1-kyero.xml',
  background: 'https://backgroundproperties.com/wp-load.php?security_token=23f0185aeb5102e7&export_id=19&action=get_data',
  miralbo: 'http://feeds.transporter.janeladigital.com/423E0F5F-30FC-4E01-8FE1-99BD7E14B021/0500015622.xml'
};

const NORTH_TOWNS = ['calpe', 'altea', 'benidorm', 'finestrat', 'polop', 'la nucia', 'nucia', 'alfas', 'albir', 'villajoyosa', 'benissa', 'moraira', 'javea', 'jávea', 'xabia', 'denia', 'ondara', 'pedreguer', 'mutxamel', 'campello', 'teulada', 'benitachell'];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const options = { rejectUnauthorized: false };
    
    protocol.get(url, options, (res) => {
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

async function checkRedsp() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('REDSP FEED - North Properties');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  try {
    const xml = await fetchUrl(FEEDS.redsp);
    const properties = [];
    const matches = xml.match(/<property>[\s\S]*?<\/property>/g) || [];
    
    for (const propXml of matches) {
      const ref = propXml.match(/<ref>([^<]+)<\/ref>/)?.[1] || '';
      const town = propXml.match(/<town>([^<]+)<\/town>/)?.[1] || '';
      const price = propXml.match(/<price>([^<]+)<\/price>/)?.[1] || '';
      const type = propXml.match(/<type>([^<]+)<\/type>/)?.[1] || '';
      const beds = propXml.match(/<beds>([^<]+)<\/beds>/)?.[1] || '';
      const hasImage = propXml.includes('apinmo.com');
      
      if (isNorthTown(town) && hasImage) {
        properties.push({ ref, town, price: parseInt(price), type, beds });
      }
    }
    
    // Also check for SP refs
    const spRefs = xml.match(/<ref>SP\d+<\/ref>/g) || [];
    console.log(`SP-prefixed refs in REDSP: ${spRefs.length}`);
    if (spRefs.length > 0) {
      spRefs.slice(0, 10).forEach(r => console.log('  ' + r.replace(/<\/?ref>/g, '')));
    }
    
    console.log(`\nNorth properties with images: ${properties.length}\n`);
    properties.sort((a, b) => a.price - b.price).slice(0, 15).forEach(p => {
      console.log(`${p.ref} | ${p.town} | €${p.price?.toLocaleString()} | ${p.type} | ${p.beds} bed`);
    });
  } catch (e) {
    console.log('Error:', e.message);
  }
}

async function checkMiralbo() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('MIRALBO FEED - All Properties');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  try {
    const xml = await fetchUrl(FEEDS.miralbo);
    
    if (xml.includes('not found') || xml.length < 1000) {
      console.log('Feed returned error or empty:', xml.substring(0, 200));
      return;
    }
    
    console.log(`Feed size: ${(xml.length / 1024).toFixed(0)} KB`);
    
    // Try different property tag patterns
    let matches = xml.match(/<property>[\s\S]*?<\/property>/g) || 
                  xml.match(/<listing>[\s\S]*?<\/listing>/g) ||
                  xml.match(/<item>[\s\S]*?<\/item>/g) || [];
    
    console.log(`Properties found: ${matches.length}\n`);
    
    if (matches.length === 0) {
      // Show sample of XML structure
      console.log('Sample of feed structure:');
      console.log(xml.substring(0, 1500));
      return;
    }
    
    const properties = [];
    for (const propXml of matches) {
      // Try multiple patterns for ref
      const ref = propXml.match(/<ref[^>]*>([^<]+)<\/ref>/)?.[1] ||
                  propXml.match(/<reference[^>]*>([^<]+)<\/reference>/)?.[1] ||
                  propXml.match(/<id[^>]*>([^<]+)<\/id>/)?.[1] || '';
      
      const town = propXml.match(/<town[^>]*>([^<]+)<\/town>/)?.[1] ||
                   propXml.match(/<city[^>]*>([^<]+)<\/city>/)?.[1] ||
                   propXml.match(/<location[^>]*>([^<]+)<\/location>/)?.[1] || '';
      
      const price = propXml.match(/<price[^>]*>([^<]+)<\/price>/)?.[1] || '';
      const type = propXml.match(/<type[^>]*>([^<]+)<\/type>/)?.[1] || '';
      const beds = propXml.match(/<beds[^>]*>([^<]+)<\/beds>/)?.[1] ||
                   propXml.match(/<bedrooms[^>]*>([^<]+)<\/bedrooms>/)?.[1] || '';
      
      // Check for images
      const hasImage = propXml.match(/https?:\/\/[^\s<>"]+\.(jpg|jpeg|png|webp)/i);
      
      if (ref) {
        properties.push({ ref, town, price: parseInt(price) || 0, type, beds, hasImage: !!hasImage });
      }
    }
    
    console.log('All Miralbo properties:\n');
    properties.slice(0, 20).forEach(p => {
      const img = p.hasImage ? '✓' : '✗';
      console.log(`${p.ref} | ${p.town} | €${p.price?.toLocaleString()} | ${p.type} | ${p.beds} bed | img:${img}`);
    });
    
    // Show North properties
    const north = properties.filter(p => isNorthTown(p.town));
    if (north.length > 0) {
      console.log(`\n\nNORTH properties in Miralbo: ${north.length}`);
      north.forEach(p => {
        console.log(`${p.ref} | ${p.town} | €${p.price?.toLocaleString()} | ${p.type}`);
      });
    }
    
  } catch (e) {
    console.log('Error:', e.message);
  }
}

async function checkBackground() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('BACKGROUND PROPERTIES FEED');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  try {
    const data = await fetchUrl(FEEDS.background);
    
    if (data.length < 100) {
      console.log('Feed returned:', data);
      return;
    }
    
    console.log(`Feed size: ${(data.length / 1024).toFixed(0)} KB`);
    
    // Try to parse as JSON first
    try {
      const json = JSON.parse(data);
      const items = Array.isArray(json) ? json : json.properties || json.listings || [];
      console.log(`Properties found: ${items.length}`);
      
      items.slice(0, 15).forEach(item => {
        const ref = item.reference || item.ref || item.id || '';
        const town = item.town || item.location || item.city || '';
        const price = item.price || 0;
        const type = item.type || item.property_type || '';
        console.log(`${ref} | ${town} | €${price?.toLocaleString()} | ${type}`);
      });
    } catch {
      // Not JSON, might be XML
      console.log('Not JSON, checking if XML...');
      console.log('First 500 chars:', data.substring(0, 500));
    }
    
  } catch (e) {
    console.log('Error:', e.message);
  }
}

async function main() {
  console.log('Checking all 3 feeds for North Costa Blanca properties...\n');
  
  await checkRedsp();
  await checkMiralbo();
  await checkBackground();
  
  console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('DONE - Use refs from above to replace SP0195 and SP1297');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main();
