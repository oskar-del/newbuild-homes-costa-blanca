// Simple feed test
const FEEDS = {
  general: 'https://xml.redsp.net/file/450/23a140q0551/general-zone-1-kyero.xml',
  background: 'https://backgroundproperties.com/wp-load.php?security_token=23f0185aeb5102e7&export_id=19&action=get_data',
  miralbo: 'https://mifrfrede.mfrpro.com/inmuebles/xml/56b76456fab7c',
};

async function testFeed(name, url) {
  console.log('Testing ' + name + '...');
  try {
    const start = Date.now();
    const res = await fetch(url, {
      signal: AbortSignal.timeout(30000),
      headers: { 'User-Agent': 'NewBuildHomes/1.0' }
    });
    const elapsed = Date.now() - start;
    const text = await res.text();
    console.log('  ' + name + ': ' + res.status + ' - ' + text.length + ' bytes in ' + elapsed + 'ms');

    // Count properties
    const propMatches = text.match(/<property|<inmueble/gi);
    const count = propMatches ? propMatches.length : 0;
    console.log('  Properties found: ' + count);

    // Sample towns
    const townMatches = text.matchAll(/<town>([^<]+)<\/town>/gi);
    const towns = new Set();
    for (const m of townMatches) {
      towns.add(m[1]);
    }
    console.log('  Towns: ' + Array.from(towns).slice(0,15).join(', '));

  } catch (e) {
    console.log('  ' + name + ': ERROR - ' + e.message);
  }
}

async function main() {
  console.log('Feed connectivity test...\n');
  for (const [name, url] of Object.entries(FEEDS)) {
    await testFeed(name, url);
    console.log('');
  }
}

main();
