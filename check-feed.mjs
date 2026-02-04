// Check the XML feed structure
import { XMLParser } from 'fast-xml-parser';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const FEED_URL = 'https://xml.redsp.net/file/450/23a140q0551/general-zone-1-kyero.xml';

async function checkFeed() {
  try {
    console.log('Fetching feed...');
    const response = await fetch(FEED_URL);
    const xml = await response.text();

    console.log('Feed fetched, size:', xml.length, 'bytes');

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });

    const data = parser.parse(xml);
    const properties = data?.root?.property || [];
    const propArray = Array.isArray(properties) ? properties : [properties];

    console.log('\nTotal properties:', propArray.length);

    // Show first property's full structure
    if (propArray.length > 0) {
      const first = propArray[0];
      console.log('\n=== FIRST PROPERTY FIELDS ===');
      console.log('Keys:', Object.keys(first).join(', '));
      console.log('\n=== FIRST PROPERTY DATA ===');
      console.log(JSON.stringify(first, null, 2).substring(0, 2000));

      // Check for location/region fields specifically
      console.log('\n=== LOCATION-RELATED FIELDS ===');
      console.log('town:', first.town);
      console.log('province:', first.province);
      console.log('location:', first.location);
      console.log('location_detail:', first.location_detail);
      console.log('region:', first.region);
      console.log('area:', first.area);
      console.log('costa:', first.costa);
      console.log('zone:', first.zone);
      console.log('country:', first.country);

      // List all unique towns
      const towns = [...new Set(propArray.map(p => p.town))].sort();
      console.log('\n=== ALL UNIQUE TOWNS ===');
      console.log(towns.join(', '));
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkFeed();
