/**
 * Find replacement properties for missing carousel refs
 * Run: NODE_TLS_REJECT_UNAUTHORIZED=0 node src/scripts/find-replacements.js
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
  console.log('Fetching feed to find replacement properties...\n');
  const xml = await fetchUrl(REDSP_FEED_URL);
  
  const properties = [];
  const propertyMatches = xml.match(/<property>[\s\S]*?<\/property>/g) || [];
  
  for (const propXml of propertyMatches) {
    const getValue = (tag) => {
      const match = propXml.match(new RegExp(`<${tag}>([^<]*)</${tag}>`));
      return match ? match[1].trim() : '';
    };
    
    const ref = getValue('ref');
    const town = getValue('town');
    const price = parseInt(getValue('price')) || 0;
    const type = getValue('type');
    const beds = getValue('beds');
    const newBuild = propXml.includes('<new_build>1</new_build>');
    const hasImage = propXml.match(/https?:\/\/fotos\d*\.apinmo\.com\/[^\s<>"]+/);
    
    if (ref && hasImage && newBuild) {
      properties.push({ ref, town, price, type, beds });
    }
  }
  
  console.log(`Found ${properties.length} new build properties with images\n`);
  
  // NORTH COSTA BLANCA towns
  const northTowns = ['Calpe', 'Altea', 'Benidorm', 'Finestrat', 'Polop', 'La Nucia', 'Alfas', 'Albir', 'Villajoyosa', 'Benissa', 'Moraira', 'Javea', 'Jávea', 'Denia', 'Ondara', 'Pedreguer', 'Mutxamel', 'San Juan', 'Campello'];
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('NORTH PROPERTIES - Calpe/Finestrat/Altea area (for SP0195, SP1297 replacements)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  const northProps = properties.filter(p => 
    northTowns.some(t => p.town.toLowerCase().includes(t.toLowerCase()))
  ).sort((a, b) => a.price - b.price);
  
  // Show Calpe/Finestrat/Altea properties (mid-range €400k-€700k)
  const calpeArea = northProps.filter(p => 
    ['Calpe', 'Finestrat', 'Altea', 'Benidorm', 'Alfas', 'Albir', 'Villajoyosa'].some(t => 
      p.town.toLowerCase().includes(t.toLowerCase())
    ) && p.price >= 400000 && p.price <= 800000
  );
  
  console.log('Calpe/Altea area (€400k-€800k) - Good replacements for SP0195, SP1297:\n');
  calpeArea.slice(0, 15).forEach(p => {
    console.log(`${p.ref} | ${p.town} | €${p.price.toLocaleString()} | ${p.type} | ${p.beds} bed`);
  });
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('INLAND PROPERTIES (for N9069 replacement)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // Inland towns
  const inlandTowns = ['Hondon', 'Hondón', 'Pinoso', 'Cox', 'Catral', 'Dolores', 'Almoradi', 'Rojales', 'Benijofar', 'Algorfa', 'San Miguel', 'Fuente Álamo'];
  
  const inlandProps = properties.filter(p => 
    inlandTowns.some(t => p.town.toLowerCase().includes(t.toLowerCase()))
  ).sort((a, b) => a.price - b.price);
  
  console.log('Inland properties (budget-friendly):\n');
  inlandProps.slice(0, 15).forEach(p => {
    console.log(`${p.ref} | ${p.town} | €${p.price.toLocaleString()} | ${p.type} | ${p.beds} bed`);
  });
}

main().catch(console.error);
