// Quick test to check what inland properties we're getting
import { XMLParser } from 'fast-xml-parser';

const GENERAL_FEED_URL = 'https://xml.redsp.net/file/450/23a140q0551/general-zone-1-kyero.xml';

const INLAND_TOWNS = [
  'algorfa', 'benijofar', 'formentera del segura', 'san fulgencio', 'daya nueva', 'daya vieja',
  'rojales', 'almoradi', 'catral', 'dolores', 'bigastro', 'jacarilla', 'benejuzar',
  'redovan', 'callosa de segura', 'cox', 'rafal', 'benferri', 'orihuela',
  'san miguel de salinas', 'pilar de la horadada', 'los montesinos',
  'jalon', 'xalo', 'lliber', 'parcent', 'murla', 'alcalali', 'pedreguer',
  'ondara', 'gata de gorgos', 'benissa', 'polop', 'la nucia', 'relleu',
  'finestrat', 'sella', 'orxeta', "callosa d'en sarria", 'tarbena', 'benigembla',
  'sucina', 'roldan', 'balsicas', 'torre pacheco', 'san javier', 'san pedro del pinatar',
  'fuente alamo', 'alhama de murcia', 'totana', 'librilla', 'mula',
];

function isInlandProperty(town) {
  const townLower = (town || '').toLowerCase().trim();
  return INLAND_TOWNS.some(t => townLower.includes(t));
}

async function main() {
  try {
    console.log('Fetching feed...');
    const response = await fetch(GENERAL_FEED_URL);
    const text = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });
    const data = parser.parse(text);

    const properties = data?.root?.property || [];
    const propArray = Array.isArray(properties) ? properties : [properties];

    console.log('Total properties in feed:', propArray.length);

    // Extract all unique towns
    const towns = propArray.map(p => {
      const town = p.town || '';
      return town;
    });

    const uniqueTowns = [...new Set(towns)].sort();
    console.log('\nAll towns in feed:', uniqueTowns.length);
    uniqueTowns.forEach(t => console.log(' -', t));

    // Check which are inland
    const inlandTowns = uniqueTowns.filter(t => isInlandProperty(t));
    console.log('\nInland towns found:', inlandTowns.length);
    inlandTowns.forEach(t => console.log(' -', t));

    // Count properties per town
    const inlandProperties = propArray.filter(p => isInlandProperty(p.town || ''));
    console.log('\nTotal inland properties:', inlandProperties.length);

    // Group by town
    const byTown = {};
    inlandProperties.forEach(p => {
      const town = p.town || 'Unknown';
      byTown[town] = (byTown[town] || 0) + 1;
    });

    console.log('\nInland properties by town:');
    Object.entries(byTown).sort((a, b) => b[1] - a[1]).forEach(([town, count]) => {
      console.log(` - ${town}: ${count}`);
    });

  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
