#!/usr/bin/env node

/**
 * Simple AI Content Generation Test
 * CommonJS version - works with any Node version
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

// Sample property for testing
const sampleProperty = {
  reference: 'TEST001',
  propertyType: 'Apartment',
  bedrooms: 2,
  bathrooms: 2,
  price: 189000,
  currency: 'EUR',
  town: 'Torrevieja',
  province: 'Alicante',
  region: 'Costa Blanca South',
  builtArea: 75,
  plotArea: 0,
  features: ['Pool', 'Air Conditioning', 'Terrace', 'Parking'],
  hasPool: true,
  hasTerrace: true,
  hasParking: true,
  hasSeaview: false,
  hasGolfview: false,
  descriptions: {
    en: 'Beautiful 2 bedroom apartment in a modern complex with communal pool. Features include air conditioning, fitted wardrobes, and a sunny terrace. Walking distance to local amenities.'
  },
  images: [
    { url: 'https://example.com/image1.jpg' },
    { url: 'https://example.com/image2.jpg' }
  ]
};

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

async function testGeneration() {
  console.log('='.repeat(60));
  console.log('AI CONTENT GENERATION TEST');
  console.log('='.repeat(60));
  
  // Check API key
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('\n❌ ERROR: ANTHROPIC_API_KEY not found in .env.local');
    console.log('\nMake sure your .env.local file contains:');
    console.log('ANTHROPIC_API_KEY=sk-ant-api03-...');
    process.exit(1);
  }
  
  console.log('\n✅ API Key found:', apiKey.substring(0, 20) + '...');
  console.log('\n📋 Test Property:', sampleProperty.reference);
  console.log('   Type:', sampleProperty.propertyType);
  console.log('   Location:', sampleProperty.town);
  console.log('   Price: €' + sampleProperty.price.toLocaleString());
  
  // Build prompt
  const prompt = CONTENT_PROMPT
    .replace('{reference}', sampleProperty.reference)
    .replace('{propertyType}', sampleProperty.propertyType)
    .replace('{bedrooms}', sampleProperty.bedrooms.toString())
    .replace('{bathrooms}', sampleProperty.bathrooms.toString())
    .replace('{price}', sampleProperty.price.toLocaleString())
    .replace('{town}', sampleProperty.town)
    .replace('{province}', sampleProperty.province)
    .replace('{region}', sampleProperty.region)
    .replace('{builtArea}', sampleProperty.builtArea.toString())
    .replace('{plotArea}', sampleProperty.plotArea.toString())
    .replace('{features}', sampleProperty.features.join(', '))
    .replace('{hasPool}', sampleProperty.hasPool ? 'Yes' : 'No')
    .replace('{hasTerrace}', sampleProperty.hasTerrace ? 'Yes' : 'No')
    .replace('{hasParking}', sampleProperty.hasParking ? 'Yes' : 'No')
    .replace('{hasSeaview}', sampleProperty.hasSeaview ? 'Yes' : 'No')
    .replace('{hasGolfview}', sampleProperty.hasGolfview ? 'Yes' : 'No')
    .replace('{description}', sampleProperty.descriptions.en || 'No description available')
    .replace('{imageCount}', sampleProperty.images.length.toString());
  
  console.log('\n🤖 Calling Claude API...');
  console.log('   (This may take 10-20 seconds)\n');
  
  try {
    const client = new Anthropic({ apiKey });
    
    const startTime = Date.now();
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [
        { role: 'user', content: prompt }
      ]
    });
    const endTime = Date.now();
    
    console.log('✅ Response received in', ((endTime - startTime) / 1000).toFixed(1), 'seconds');
    console.log('   Tokens used:', response.usage.input_tokens, 'in /', response.usage.output_tokens, 'out');
    
    // Parse response
    const content = response.content[0].text;
    
    // Try to extract JSON from response
    let jsonContent = content;
    if (content.includes('```json')) {
      jsonContent = content.split('```json')[1].split('```')[0].trim();
    } else if (content.includes('```')) {
      jsonContent = content.split('```')[1].split('```')[0].trim();
    }
    
    const generated = JSON.parse(jsonContent);
    
    console.log('\n' + '='.repeat(60));
    console.log('GENERATED CONTENT PREVIEW');
    console.log('='.repeat(60));
    
    console.log('\n📝 META TITLE:');
    console.log('   ' + generated.metaTitle);
    
    console.log('\n📝 META DESCRIPTION:');
    console.log('   ' + generated.metaDescription);
    
    console.log('\n📝 H1 TITLE:');
    console.log('   ' + generated.h1Title);
    
    console.log('\n📝 HERO INTRO (first 200 chars):');
    console.log('   ' + generated.heroIntro.substring(0, 200) + '...');
    
    console.log('\n📍 NEARBY ATTRACTIONS:');
    if (generated.locationSection && generated.locationSection.nearbyAttractions) {
      generated.locationSection.nearbyAttractions.slice(0, 4).forEach(attr => {
        console.log('   - ' + attr.name + ' (' + attr.distance + ')');
      });
    }
    
    console.log('\n❓ SAMPLE FAQ:');
    if (generated.faqs && generated.faqs.length > 0) {
      console.log('   Q: ' + generated.faqs[0].question);
      console.log('   A: ' + generated.faqs[0].answer.substring(0, 150) + '...');
    }
    
    // Save to file
    const outputDir = path.join(process.cwd(), 'src', 'content', 'properties');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputPath = path.join(outputDir, sampleProperty.reference + '.json');
    fs.writeFileSync(outputPath, JSON.stringify(generated, null, 2));
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ SUCCESS! Content saved to:');
    console.log('   ' + outputPath);
    console.log('='.repeat(60));
    
    // Cost estimate
    const inputCost = (response.usage.input_tokens / 1000000) * 3;
    const outputCost = (response.usage.output_tokens / 1000000) * 15;
    console.log('\n💰 Estimated cost: $' + (inputCost + outputCost).toFixed(4));
    console.log('   (About $0.01-0.02 per property)');
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    if (error.message.includes('API key')) {
      console.log('\nCheck that your ANTHROPIC_API_KEY is correct in .env.local');
    }
    process.exit(1);
  }
}

testGeneration();
