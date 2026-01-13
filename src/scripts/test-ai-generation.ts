/**
 * Test AI Content Generation - Single Property
 * 
 * Run this to test the AI generation with one property before running full batch.
 * 
 * Usage:
 *   ANTHROPIC_API_KEY=sk-xxx npx ts-node src/scripts/test-ai-generation.ts
 */

import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Sample property for testing
const testProperty = {
  reference: 'TEST-001',
  propertyType: 'Apartment',
  bedrooms: 2,
  bathrooms: 2,
  builtArea: 85,
  plotArea: 0,
  price: 245000,
  town: 'Torrevieja',
  locationDetail: 'Playa del Cura',
  region: 'Costa Blanca South',
  descriptions: {
    en: 'Modern apartment with 2 bedrooms near the beach. Community pool and parking included.'
  },
  features: ['Pool', 'Terrace', 'Air conditioning', 'Parking'],
  hasPool: true,
  hasTerrace: true,
  hasSeaview: false,
  images: [
    { url: 'https://example.com/image1.jpg' },
    { url: 'https://example.com/image2.jpg' },
    { url: 'https://example.com/image3.jpg' },
  ]
};

async function testGeneration() {
  console.log('🧪 Testing AI Content Generation\n');
  console.log('Property:', testProperty.reference);
  console.log('Location:', testProperty.town);
  console.log('Type:', testProperty.propertyType);
  console.log('');
  
  const prompt = `You are an expert real estate SEO copywriter specializing in Spanish Costa Blanca properties. Generate comprehensive, unique, SEO-optimized content for this property listing.

PROPERTY DATA:
- Reference: ${testProperty.reference}
- Type: ${testProperty.propertyType}
- Bedrooms: ${testProperty.bedrooms}
- Bathrooms: ${testProperty.bathrooms}
- Built Area: ${testProperty.builtArea}m²
- Price: €${testProperty.price.toLocaleString()}
- Location: ${testProperty.locationDetail}, ${testProperty.town}
- Region: ${testProperty.region}
- Features: ${testProperty.features.join(', ')}
- Has Pool: Yes
- Original Description: ${testProperty.descriptions.en}

REQUIREMENTS:
1. Write unique, engaging content - NOT generic templates
2. Include local knowledge about ${testProperty.town} and Costa Blanca South
3. Target keywords: "2 bedroom apartment Torrevieja", "new build Torrevieja", "property for sale Torrevieja"
4. Write for international buyers (British, Scandinavian, Dutch, German)
5. Mention specific nearby amenities, beaches
6. Focus on lifestyle benefits, not just features

Generate the following JSON (respond ONLY with valid JSON, no markdown):
{
  "metaTitle": "SEO title under 60 chars",
  "metaDescription": "Meta description 150-160 chars",
  "h1Title": "Unique H1 title - NOT starting with 'Stunning' or 'Beautiful'",
  "heroIntro": "2-3 engaging sentences (150-200 words)",
  "propertyDescription": "Detailed description (250-350 words)",
  "locationSection": {
    "title": "Creative section title about Torrevieja",
    "content": "About Torrevieja - lifestyle, amenities (200-300 words)",
    "highlights": ["6 nearby attractions with distances"]
  },
  "featuresSection": {
    "intro": "Brief intro to features",
    "highlights": ["8-10 feature benefit statements"]
  },
  "investmentSection": "Investment potential analysis (150-200 words)",
  "lifestyleSection": "Daily life description (150-200 words)",
  "faqs": [
    {"question": "Property-specific question 1", "answer": "Detailed answer"},
    {"question": "Property-specific question 2", "answer": "Detailed answer"},
    {"question": "Property-specific question 3", "answer": "Detailed answer"}
  ],
  "imageAlts": ["Alt text for image 1", "Alt text for image 2", "Alt text for image 3"],
  "whyBuyReasons": ["Reason 1", "Reason 2", "Reason 3", "Reason 4", "Reason 5"]
}`;

  console.log('📤 Sending request to Claude...\n');
  
  try {
    const startTime = Date.now();
    
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }]
    });
    
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    
    const textContent = response.content.find(block => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text content in response');
    }
    
    // Parse JSON
    let jsonText = textContent.text.trim();
    if (jsonText.startsWith('```json')) jsonText = jsonText.slice(7);
    if (jsonText.startsWith('```')) jsonText = jsonText.slice(3);
    if (jsonText.endsWith('```')) jsonText = jsonText.slice(0, -3);
    
    const content = JSON.parse(jsonText.trim());
    
    console.log('✅ SUCCESS! Generated in', elapsed, 'seconds\n');
    console.log('='.repeat(60));
    console.log('GENERATED CONTENT:');
    console.log('='.repeat(60));
    console.log('\n📌 Meta Title:', content.metaTitle);
    console.log('\n📌 Meta Description:', content.metaDescription);
    console.log('\n📌 H1 Title:', content.h1Title);
    console.log('\n📌 Hero Intro:\n', content.heroIntro);
    console.log('\n📌 Property Description:\n', content.propertyDescription?.substring(0, 500) + '...');
    console.log('\n📌 Location Section Title:', content.locationSection?.title);
    console.log('\n📌 Location Highlights:', content.locationSection?.highlights?.join('\n  - '));
    console.log('\n📌 FAQs:');
    content.faqs?.forEach((faq: any, i: number) => {
      console.log(`  ${i + 1}. Q: ${faq.question}`);
      console.log(`     A: ${faq.answer?.substring(0, 100)}...`);
    });
    console.log('\n📌 Why Buy Reasons:', content.whyBuyReasons?.join('\n  - '));
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ TEST PASSED - AI generation working correctly!');
    console.log('='.repeat(60));
    
    // Show usage stats
    console.log('\n📊 API Usage:');
    console.log('  Input tokens:', response.usage.input_tokens);
    console.log('  Output tokens:', response.usage.output_tokens);
    
  } catch (error) {
    console.error('❌ TEST FAILED:', error);
    process.exit(1);
  }
}

testGeneration();
