#!/usr/bin/env node

/**
 * AI Property Content Generator
 * Uses the existing unified-feed-service from the project
 * 
 * Usage:
 *   node src/scripts/generate-property-content.js --limit=50
 *   node src/scripts/generate-property-content.js --area=torrevieja --limit=20
 *   node src/scripts/generate-property-content.js --regenerate
 */

const Anthropic = require('@anthropic-ai/sdk').default;
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  });
}

// Priority areas from footer
const PRIORITY_AREAS = [
  // Costa Blanca South
  'torrevieja', 'orihuela costa', 'villamartin', 'los dolses', 'guardamar',
  'algorfa', 'san miguel de salinas', 'ciudad quesada', 'rojales', 
  'pilar de la horadada', 'la zenia', 'playa flamenca', 'cabo roig',
  // Costa Blanca North  
  'javea', 'moraira', 'calpe', 'altea', 'denia', 'benidorm', 'finestrat',
  'benitachell', 'albir', 'alfas del pi'
];

// Golf locations for detection
const GOLF_LOCATIONS = [
  'villamartin', 'las ramblas', 'campoamor', 'las colinas', 'la finca',
  'la marquesa', 'vistabella', 'lo romero', 'la torre golf', 'hacienda del alamo',
  'roda golf', 'mar menor golf', 'altorreal', 'mosa trajectum', 'el valle',
  'algorfa', 'quesada', 'ciudad quesada', 'don cayo', 'javea golf',
  'ifach golf', 'oliva nova', 'el saler', 'alicante golf', 'bonalba',
  'villaitana', 'puig campana', 'alenda golf'
];

const CONTENT_PROMPT = `You are an expert real estate copywriter specializing in Costa Blanca, Spain properties. Generate comprehensive, SEO-optimized content for this property listing.

PROPERTY DATA:
- Reference: {reference}
- Type: {propertyType}
- Bedrooms: {bedrooms}
- Bathrooms: {bathrooms}
- Price: €{price}
- Location: {town}, {province}
- Region: {region}
- Built Area: {builtArea}m²
- Plot Area: {plotArea}m²
- Features: {features}
- Has Pool: {hasPool}
- Has Terrace: {hasTerrace}
- Has Parking: {hasParking}
- Has Sea View: {hasSeaview}
- Has Golf View: {hasGolfview}
- Is Golf Property: {isGolf}
- Original Description: {description}
- Number of Images: {imageCount}

GENERATE JSON with these exact fields:

{
  "metaTitle": "60 chars max, include beds, type, town, price range - SEO optimized",
  "metaDescription": "150-160 chars, compelling summary with call-to-action",
  "h1Title": "Unique, keyword-rich title - NOT generic like 'Stunning' or 'Beautiful'",
  "heroIntro": "150-200 words, engaging introduction highlighting key selling points",
  "propertyDescription": "250-350 words, detailed description of layout, features, quality",
  "locationSection": {
    "title": "Living in [Town]: Your Costa Blanca Lifestyle",
    "content": "200-300 words about the location benefits",
    "nearbyAttractions": [
      {"name": "Specific Place Name", "distance": "X km", "type": "beach/golf/shopping/dining/airport"},
      // Include 6 real, specific nearby attractions
    ]
  },
  "featuresSection": {
    "intro": "Brief intro to features",
    "highlights": ["8-10 specific benefit statements about this property"]
  },
  "investmentSection": "150-200 words on rental potential, yields, market trends for this area",
  "lifestyleSection": "150-200 words painting vivid picture of daily life here",
  "faqs": [
    {"question": "Property-specific question", "answer": "Detailed answer"},
    // Include 8 FAQs covering: price, location, features, financing, viewing, timeline, rental potential, buying process
  ],
  "imageAlts": ["Descriptive alt text for image 1", "Alt for image 2", ...],
  "whyBuyReasons": ["8 compelling, specific reasons to buy THIS property"]
}

CRITICAL RULES:
1. Use REAL place names near {town} - research actual beaches, golf courses, shopping centers
2. Be SPECIFIC - mention actual distances, real amenities, true market data
3. NO generic phrases like "stunning", "amazing", "perfect" - be descriptive instead
4. Write for UK/Scandinavian buyers relocating or buying holiday homes
5. Include local knowledge that shows expertise in Costa Blanca
6. FAQs must be property-specific, not generic real estate questions
7. All content must be unique and not templated-feeling

Return ONLY valid JSON, no markdown or explanation.`;

function isGolfProperty(property) {
  const town = (property.town || '').toLowerCase();
  const locationDetail = (property.locationDetail || '').toLowerCase();
  const description = (property.descriptions?.en || '').toLowerCase();
  const features = (property.features || []).join(' ').toLowerCase();
  
  // Check if location is known golf area
  const inGolfArea = GOLF_LOCATIONS.some(loc => 
    town.includes(loc) || locationDetail.includes(loc)
  );
  
  // Check features/description for golf mentions
  const hasGolfFeature = property.hasGolfview || 
    features.includes('golf') ||
    description.includes('golf');
  
  return inGolfArea || hasGolfFeature;
}

function isPriorityArea(town) {
  const townLower = (town || '').toLowerCase();
  return PRIORITY_AREAS.some(area => townLower.includes(area));
}

async function fetchPropertiesFromAPI() {
  console.log('📥 Fetching properties from live site API...');
  
  // Fetch from the live site's API endpoint
  const apiUrl = 'https://www.newbuildhomescostablanca.com/api/properties';
  
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    const data = await response.json();
    console.log(`   Found ${data.length || data.properties?.length || 0} properties from API`);
    return data.properties || data || [];
  } catch (error) {
    console.log(`   API fetch failed: ${error.message}`);
    return null;
  }
}

async function fetchPropertiesFromXML() {
  console.log('📥 Fetching properties from REDSP XML feed...');
  
  const xmlUrl = 'https://xml.redsp.net/file/450/23a140q0551/general-zone-1-kyero.xml';
  
  try {
    const response = await fetch(xmlUrl);
    if (!response.ok) {
      throw new Error(`XML feed returned ${response.status}`);
    }
    const xmlText = await response.text();
    
    // Simple XML parsing - extract properties
    const properties = [];
    const propertyMatches = xmlText.match(/<property>[\s\S]*?<\/property>/g) || [];
    
    for (const propXml of propertyMatches.slice(0, 500)) { // Limit to first 500
      const getValue = (tag) => {
        const match = propXml.match(new RegExp(`<${tag}>([^<]*)</${tag}>`));
        return match ? match[1].trim() : '';
      };
      
      const getDescValue = (lang) => {
        const match = propXml.match(new RegExp(`<desc>.*?<${lang}>([\\s\\S]*?)</${lang}>`, 'm'));
        return match ? match[1].trim().replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1') : '';
      };
      
      const ref = getValue('ref');
      if (!ref) continue;
      
      const property = {
        reference: ref,
        propertyType: getValue('type') || 'Property',
        bedrooms: parseInt(getValue('beds')) || 0,
        bathrooms: parseInt(getValue('baths')) || 0,
        price: parseFloat(getValue('price')) || 0,
        currency: 'EUR',
        town: getValue('town') || getValue('location'),
        province: getValue('province') || 'Alicante',
        region: 'Costa Blanca',
        builtArea: parseFloat(getValue('built')) || 0,
        plotArea: parseFloat(getValue('plot')) || 0,
        features: [],
        hasPool: propXml.includes('<pool>1</pool>') || propXml.toLowerCase().includes('pool'),
        hasTerrace: propXml.toLowerCase().includes('terrace'),
        hasParking: propXml.toLowerCase().includes('parking') || propXml.toLowerCase().includes('garage'),
        hasSeaview: propXml.toLowerCase().includes('sea view') || propXml.toLowerCase().includes('sea_view'),
        hasGolfview: propXml.toLowerCase().includes('golf view') || propXml.toLowerCase().includes('golf_view'),
        descriptions: {
          en: getDescValue('en') || getValue('desc')
        },
        images: []
      };
      
      // Extract images
      const imgMatches = propXml.match(/<url>([^<]+)<\/url>/g) || [];
      property.images = imgMatches.slice(0, 10).map(m => ({
        url: m.replace(/<\/?url>/g, '')
      }));
      
      if (property.price > 0 && property.town) {
        properties.push(property);
      }
    }
    
    console.log(`   Parsed ${properties.length} properties from XML`);
    return properties;
    
  } catch (error) {
    console.log(`   XML fetch failed: ${error.message}`);
    return null;
  }
}

async function fetchPropertiesFromJSON() {
  console.log('📥 Fetching properties from Background Properties JSON...');
  
  const jsonUrl = 'https://backgroundproperties.com/wp-load.php?security_token=23f0185aeb5102e7&export_id=19&action=get_data';
  
  try {
    const response = await fetch(jsonUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; PropertyBot/1.0)'
      }
    });
    
    const text = await response.text();
    
    // Check if it's actually JSON
    if (text.trim().startsWith('<')) {
      throw new Error('Received HTML instead of JSON');
    }
    
    const data = JSON.parse(text);
    
    if (!data.properties && !Array.isArray(data)) {
      throw new Error('Invalid data format');
    }
    
    const rawProps = data.properties || data;
    
    // Transform to unified format
    const properties = rawProps.map(p => ({
      reference: p.reference || p.id || p.ref,
      propertyType: p.type || p.property_type || 'Property',
      bedrooms: parseInt(p.rooms) || parseInt(p.bedrooms) || parseInt(p.beds) || 0,
      bathrooms: parseInt(p.baths) || parseInt(p.bathrooms) || 0,
      price: parseFloat(p.price) || 0,
      currency: 'EUR',
      town: p.town || p.city || p.location || '',
      locationDetail: p.location_detail || '',
      province: p.province || 'Alicante',
      region: determineRegion(p.town || p.city || ''),
      builtArea: parseFloat(p.built) || parseFloat(p.surface_area?.built) || 0,
      plotArea: parseFloat(p.plot) || parseFloat(p.surface_area?.plot) || 0,
      features: extractFeatures(p),
      hasPool: checkFeature(p, 'pool'),
      hasTerrace: checkFeature(p, 'terrace'),
      hasParking: checkFeature(p, 'parking') || checkFeature(p, 'garage'),
      hasSeaview: checkFeature(p, 'sea view') || checkFeature(p, 'sea_view'),
      hasGolfview: checkFeature(p, 'golf view') || checkFeature(p, 'golf_view'),
      descriptions: {
        en: p.desc?.en || p.description || ''
      },
      images: (p.images || []).map(img => ({ url: typeof img === 'string' ? img : img.url }))
    })).filter(p => p.reference && p.price > 0);
    
    console.log(`   Found ${properties.length} properties`);
    return properties;
    
  } catch (error) {
    console.log(`   JSON fetch failed: ${error.message}`);
    return null;
  }
}

function determineRegion(town) {
  const south = ['torrevieja', 'orihuela', 'villamartin', 'guardamar', 'algorfa', 
                 'rojales', 'quesada', 'pilar', 'san miguel', 'los dolses', 
                 'playa flamenca', 'la zenia', 'cabo roig', 'campoamor'];
  const townLower = (town || '').toLowerCase();
  return south.some(s => townLower.includes(s)) ? 'Costa Blanca South' : 'Costa Blanca North';
}

function extractFeatures(property) {
  const features = [];
  if (property.features) {
    if (Array.isArray(property.features)) {
      features.push(...property.features);
    } else if (typeof property.features === 'object') {
      Object.entries(property.features).forEach(([key, value]) => {
        if (value === true || value === 'yes' || value === '1') {
          features.push(key.replace(/_/g, ' '));
        }
      });
    }
  }
  return features;
}

function checkFeature(property, featureName) {
  const features = extractFeatures(property);
  const desc = (property.desc?.en || property.description || '').toLowerCase();
  return features.some(f => f.toLowerCase().includes(featureName)) ||
         desc.includes(featureName);
}

async function generateContent(property, client) {
  const isGolf = isGolfProperty(property);
  
  const prompt = CONTENT_PROMPT
    .replace(/{reference}/g, property.reference)
    .replace(/{propertyType}/g, property.propertyType)
    .replace(/{bedrooms}/g, property.bedrooms.toString())
    .replace(/{bathrooms}/g, property.bathrooms.toString())
    .replace(/{price}/g, property.price.toLocaleString())
    .replace(/{town}/g, property.town)
    .replace(/{province}/g, property.province)
    .replace(/{region}/g, property.region)
    .replace(/{builtArea}/g, property.builtArea.toString())
    .replace(/{plotArea}/g, property.plotArea.toString())
    .replace(/{features}/g, property.features.join(', ') || 'Not specified')
    .replace(/{hasPool}/g, property.hasPool ? 'Yes' : 'No')
    .replace(/{hasTerrace}/g, property.hasTerrace ? 'Yes' : 'No')
    .replace(/{hasParking}/g, property.hasParking ? 'Yes' : 'No')
    .replace(/{hasSeaview}/g, property.hasSeaview ? 'Yes' : 'No')
    .replace(/{hasGolfview}/g, property.hasGolfview ? 'Yes' : 'No')
    .replace(/{isGolf}/g, isGolf ? 'Yes - near golf courses' : 'No')
    .replace(/{description}/g, property.descriptions?.en || 'No description available')
    .replace(/{imageCount}/g, property.images?.length?.toString() || '0');
  
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }]
  });
  
  const content = response.content[0].text;
  
  // Extract JSON from response
  let jsonContent = content;
  if (content.includes('```json')) {
    jsonContent = content.split('```json')[1].split('```')[0].trim();
  } else if (content.includes('```')) {
    jsonContent = content.split('```')[1].split('```')[0].trim();
  }
  
  const generated = JSON.parse(jsonContent);
  
  return {
    generated,
    usage: response.usage
  };
}

async function main() {
  console.log('='.repeat(60));
  console.log('AI PROPERTY CONTENT GENERATOR');
  console.log('='.repeat(60));
  
  // Parse command line arguments
  const args = process.argv.slice(2);
  let limit = 50;
  let areaFilter = null;
  let regenerate = false;
  
  args.forEach(arg => {
    if (arg.startsWith('--limit=')) {
      limit = parseInt(arg.split('=')[1]) || 50;
    } else if (arg.startsWith('--area=')) {
      areaFilter = arg.split('=')[1].toLowerCase();
    } else if (arg === '--regenerate') {
      regenerate = true;
    }
  });
  
  console.log('\nOptions:');
  console.log('   Limit:', limit);
  console.log('   Area filter:', areaFilter || 'All priority areas');
  console.log('   Regenerate existing:', regenerate);
  
  // Check API key
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('\n❌ ERROR: ANTHROPIC_API_KEY not found in .env.local');
    process.exit(1);
  }
  console.log('\n✅ API Key found');
  
  // Try multiple sources for properties
  let allProperties = null;
  
  // Try JSON feed first
  allProperties = await fetchPropertiesFromJSON();
  
  // Fall back to XML if JSON fails
  if (!allProperties || allProperties.length === 0) {
    allProperties = await fetchPropertiesFromXML();
  }
  
  // Final fallback - try live site API
  if (!allProperties || allProperties.length === 0) {
    allProperties = await fetchPropertiesFromAPI();
  }
  
  if (!allProperties || allProperties.length === 0) {
    console.error('\n❌ Could not fetch properties from any source');
    console.log('\nTroubleshooting:');
    console.log('1. Check your internet connection');
    console.log('2. Try running: curl "https://xml.redsp.net/file/450/23a140q0551/general-zone-1-kyero.xml" | head');
    console.log('3. If feeds are down, try again later');
    process.exit(1);
  }
  
  // Filter properties
  let properties = allProperties.filter(p => {
    // Must have basic data
    if (!p.reference || !p.town || p.price <= 0) return false;
    
    // Area filter
    if (areaFilter) {
      return p.town.toLowerCase().includes(areaFilter);
    }
    
    // Priority areas only
    return isPriorityArea(p.town);
  });
  
  console.log(`\n📊 Properties to process: ${properties.length} (filtered from ${allProperties.length})`);
  
  // Check existing content
  const outputDir = path.join(process.cwd(), 'src', 'content', 'properties');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  if (!regenerate) {
    const existingFiles = fs.readdirSync(outputDir).map(f => f.replace('.json', ''));
    properties = properties.filter(p => !existingFiles.includes(p.reference));
    console.log(`   After skipping existing: ${properties.length}`);
  }
  
  // Apply limit
  properties = properties.slice(0, limit);
  console.log(`   Processing: ${properties.length} properties`);
  
  if (properties.length === 0) {
    console.log('\n✅ No new properties to process!');
    return;
  }
  
  // Initialize client
  const client = new Anthropic({ apiKey });
  
  // Process properties
  let successCount = 0;
  let errorCount = 0;
  let totalInputTokens = 0;
  let totalOutputTokens = 0;
  
  console.log('\n' + '-'.repeat(60));
  
  for (let i = 0; i < properties.length; i++) {
    const property = properties[i];
    const progress = `[${i + 1}/${properties.length}]`;
    
    console.log(`\n${progress} Processing ${property.reference} - ${property.bedrooms}bed ${property.propertyType} in ${property.town}`);
    
    try {
      const { generated, usage } = await generateContent(property, client);
      
      // Save to file
      const outputPath = path.join(outputDir, `${property.reference}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(generated, null, 2));
      
      successCount++;
      totalInputTokens += usage.input_tokens;
      totalOutputTokens += usage.output_tokens;
      
      console.log(`   ✅ Saved: ${generated.h1Title.substring(0, 50)}...`);
      
      // Rate limiting - wait 1 second between calls
      if (i < properties.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
    } catch (error) {
      errorCount++;
      console.log(`   ❌ Error: ${error.message}`);
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('GENERATION COMPLETE');
  console.log('='.repeat(60));
  console.log(`\n✅ Success: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`\n📊 Token usage:`);
  console.log(`   Input: ${totalInputTokens.toLocaleString()}`);
  console.log(`   Output: ${totalOutputTokens.toLocaleString()}`);
  
  // Cost estimate
  const inputCost = (totalInputTokens / 1000000) * 3;
  const outputCost = (totalOutputTokens / 1000000) * 15;
  console.log(`\n💰 Estimated cost: $${(inputCost + outputCost).toFixed(2)}`);
  
  console.log(`\n📁 Content saved to: ${outputDir}`);
}

main().catch(console.error);
