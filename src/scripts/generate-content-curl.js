const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const FEED_URL = 'http://feeds.transporter.janeladigital.com/423E0F5F-30FC-4E01-8FE1-99BD7E14B021/0500015622.xml';
const API_KEY = process.env.ANTHROPIC_API_KEY;

// Standard contact info
const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
  habeno: 'https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e',
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractProjectName(description, propertyType, ref) {
  const patterns = [
    /present\s+(Villa\s+\w+)/i,
    /presenting\s+(Villa\s+\w+)/i,
    /(Villa\s+\w+),/i,
    /(Villa\s+\w+)\s+is/i,
    /(Villa\s+\w+)\s+offers/i,
    /welcome\s+to\s+(Villa\s+\w+)/i,
    /discover\s+(Villa\s+\w+)/i,
  ];

  for (const pattern of patterns) {
    const match = description.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  return `${propertyType} ${ref}`;
}

function parseXML(xml) {
  const properties = [];
  const propertyMatches = xml.match(/<property>[\s\S]*?<\/property>/g) || [];
  
  for (const propXml of propertyMatches) {
    const getValue = (tag) => {
      const match = propXml.match(new RegExp(`<${tag}><!\\\[CDATA\\\[(.*?)\\\]\\\]><\/${tag}>`)) ||
                    propXml.match(new RegExp(`<${tag}>(.*?)<\/${tag}>`));
      return match ? match[1] : '';
    };
    
    const getNestedValue = (parent, tag) => {
      const parentMatch = propXml.match(new RegExp(`<${parent}>[\\s\\S]*?<${tag}>(.*?)<\\/${tag}>[\\s\\S]*?<\\/${parent}>`));
      return parentMatch ? parentMatch[1] : '';
    };
    
    const newBuild = getValue('new_build');
    if (newBuild !== '1') continue;
    
    const images = [];
    const imageMatches = propXml.match(/<url>(https?:\/\/[^<]+)<\/url>/g) || [];
    for (const imgMatch of imageMatches) {
      const url = imgMatch.replace(/<\/?url>/g, '');
      if (url.includes('media.egorealestate.com')) {
        images.push(url);
      }
    }
    
    const descMatch = propXml.match(/<desc>[\s\S]*?<en><!\[CDATA\[([\s\S]*?)\]\]><\/en>/);
    const description = descMatch ? descMatch[1].replace(/#ref:\w+/gi, '').trim() : '';
    
    const id = getValue('id');
    const ref = getValue('ref') || id;
    const propertyType = getValue('type');
    const projectName = extractProjectName(description, propertyType, ref);
    
    properties.push({
      id,
      ref,
      price: parseInt(getValue('price')) || null,
      bedrooms: parseInt(getValue('beds')) || null,
      bathrooms: parseInt(getValue('baths')) || null,
      builtSize: parseInt(getNestedValue('surface_area', 'built')) || null,
      plotSize: parseInt(getNestedValue('surface_area', 'plot')) || null,
      town: getValue('town'),
      province: getValue('province') || 'Alicante',
      locationDetail: getValue('location_detail'),
      propertyType,
      description,
      images,
      developer: 'Miralbo Urbana',
      projectName,
      slug: slugify(projectName),
    });
  }
  
  return properties;
}

function callClaudeAPI(prompt, maxTokens = 4000) {
  const requestBody = JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: maxTokens,
    messages: [{ role: 'user', content: prompt }],
  });
  
  // Write request body to temp file to avoid shell escaping issues
  const tempFile = '/tmp/claude-request.json';
  fs.writeFileSync(tempFile, requestBody);
  
  const curlCmd = `curl -s https://api.anthropic.com/v1/messages \
    -H "Content-Type: application/json" \
    -H "x-api-key: ${API_KEY}" \
    -H "anthropic-version: 2023-06-01" \
    -d @${tempFile}`;
  
  const response = execSync(curlCmd, { maxBuffer: 10 * 1024 * 1024 }).toString();
  const parsed = JSON.parse(response);
  
  if (parsed.error) {
    throw new Error(parsed.error.message);
  }
  
  return parsed.content[0].text;
}

async function fetchFeedData() {
  console.log('Fetching feed data...');
  const response = await fetch(FEED_URL);
  const xml = await response.text();
  return parseXML(xml);
}

function generateDevelopmentContent(property) {
  console.log(`Generating content for ${property.projectName}...`);
  
  const prompt = `You are an expert real estate copywriter specializing in Costa Blanca luxury properties. Generate comprehensive, SEO-optimized content for a property listing page.

PROPERTY DATA:
- Project Name: ${property.projectName}
- Property Type: ${property.propertyType}
- Location: ${property.locationDetail}, ${property.town}, ${property.province}
- Price: ${property.price ? `€${property.price.toLocaleString()}` : 'Price on request'}
- Bedrooms: ${property.bedrooms || 'N/A'}
- Bathrooms: ${property.bathrooms || 'N/A'}
- Built Size: ${property.builtSize ? `${property.builtSize} m²` : 'N/A'}
- Plot Size: ${property.plotSize ? `${property.plotSize} m²` : 'N/A'}
- Developer: ${property.developer}
- Reference: ${property.ref}

ORIGINAL DESCRIPTION FROM DEVELOPER:
${property.description.substring(0, 2000)}

CONTACT INFO TO USE:
- WhatsApp: ${CONTACT.whatsapp}
- Phone: ${CONTACT.phone}
- Habeno Mortgage Link: ${CONTACT.habeno}

Generate the following in JSON format only (no other text):

{
  "metaTitle": "55-60 character SEO title",
  "metaDescription": "150-160 character meta description",
  "heroIntro": "2-3 compelling paragraphs introducing the property",
  "locationSection": {
    "intro": "2 paragraphs about why this location is special",
    "highlights": ["5 location highlights"]
  },
  "propertyFeatures": {
    "intro": "1 paragraph about key features",
    "features": ["8-10 key features"]
  },
  "investmentSection": "2 paragraphs about investment potential",
  "whyBuySection": ["5-7 reasons to buy"],
  "faqs": [
    {"question": "FAQ question", "answer": "answer"}
  ],
  "conclusion": "1 paragraph with CTA"
}

Generate 8-10 FAQs covering: price/payment, location, buying process, mortgage, rental potential, completion, what's included, viewing.`;

  const responseText = callClaudeAPI(prompt);
  
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Could not parse JSON from response');
  }
  
  const content = JSON.parse(jsonMatch[0]);
  
  const imageAlts = generateImageAlts(property);
  const schemaProduct = buildProductSchema(property);
  const schemaFAQ = buildFAQSchema(content.faqs);
  const schemaBreadcrumb = buildBreadcrumbSchema(property);
  
  return {
    slug: property.slug,
    projectName: property.projectName,
    metaTitle: content.metaTitle,
    metaDescription: content.metaDescription,
    content,
    property: {
      ref: property.ref,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      builtSize: property.builtSize,
      plotSize: property.plotSize,
      town: property.town,
      province: property.province,
      propertyType: property.propertyType,
      developer: property.developer,
      developerSlug: slugify(property.developer),
      images: property.images,
    },
    schemaProduct,
    schemaFAQ,
    schemaBreadcrumb,
    imageAlts,
  };
}

function generateImageAlts(property) {
  const alts = [];
  const imageTypes = ['exterior view', 'interior living area', 'kitchen', 'bedroom', 'bathroom', 'terrace', 'pool area', 'garden'];
  
  for (let i = 0; i < property.images.length; i++) {
    const imageType = imageTypes[i] || `view ${i + 1}`;
    alts.push({
      url: property.images[i],
      alt: `${property.projectName} ${property.town} - ${imageType} of this new build ${property.propertyType.toLowerCase()} in Costa Blanca`,
    });
  }
  
  return alts;
}

function buildProductSchema(property) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": property.projectName,
    "image": property.images.slice(0, 3),
    "description": `New build ${property.propertyType.toLowerCase()} in ${property.town}, Costa Blanca. ${property.bedrooms} bedrooms, ${property.bathrooms} bathrooms, ${property.builtSize} m² built size.`,
    "brand": {
      "@type": "Brand",
      "name": property.developer
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.newbuildhomescostablanca.com/developments/${property.slug}/`,
      "priceCurrency": "EUR",
      "price": property.price || undefined,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "RealEstateAgent",
        "name": "New Build Homes Costa Blanca"
      }
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.town,
      "addressRegion": property.province,
      "addressCountry": "ES"
    }
  };
}

function buildFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

function buildBreadcrumbSchema(property) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.newbuildhomescostablanca.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Developments",
        "item": "https://www.newbuildhomescostablanca.com/developments/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": property.projectName,
        "item": `https://www.newbuildhomescostablanca.com/developments/${property.slug}/`
      }
    ]
  };
}

function generateBuilderContent(properties) {
  console.log('Generating builder profile...');
  
  const developer = properties[0].developer;
  const towns = [...new Set(properties.map(p => p.town))];
  const propertyTypes = [...new Set(properties.map(p => p.propertyType))];
  const priceRange = properties.filter(p => p.price).map(p => p.price);
  const minPrice = Math.min(...priceRange);
  const maxPrice = Math.max(...priceRange);
  
  const prompt = `You are an expert real estate copywriter. Generate a builder profile page for a Spanish property developer.

BUILDER DATA:
- Name: ${developer}
- Location: ${towns.join(', ')}, Costa Blanca, Spain
- Property Types: ${propertyTypes.join(', ')}
- Current Projects: ${properties.length}
- Price Range: €${minPrice.toLocaleString()} - €${maxPrice.toLocaleString()}

PROJECT LIST:
${properties.slice(0, 10).map(p => `- ${p.projectName}: ${p.propertyType} in ${p.town}, ${p.bedrooms} bed`).join('\n')}

Generate in JSON format only:

{
  "metaTitle": "55-60 character SEO title",
  "metaDescription": "150-160 character meta description",
  "heroIntro": "2 compelling paragraphs introducing the builder",
  "aboutSection": "2-3 paragraphs about the company",
  "qualitySection": {
    "intro": "1 paragraph about construction quality",
    "standards": ["5-6 quality standards"]
  },
  "whyChooseSection": ["5-6 reasons to choose this builder"],
  "faqs": [{"question": "FAQ", "answer": "answer"}],
  "conclusion": "1 paragraph with CTA"
}

Generate 6-8 FAQs about experience, warranty, property types, viewings, quality, payment plans.`;

  const responseText = callClaudeAPI(prompt, 3000);
  
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Could not parse JSON');
  
  const content = JSON.parse(jsonMatch[0]);
  
  return {
    slug: slugify(developer),
    name: developer,
    towns,
    propertyTypes,
    propertyCount: properties.length,
    priceRange: { min: minPrice, max: maxPrice },
    content,
    projects: properties.map(p => ({
      name: p.projectName,
      slug: p.slug,
      town: p.town,
      propertyType: p.propertyType,
      price: p.price,
      bedrooms: p.bedrooms,
      image: p.images[0],
    })),
    schema: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": developer,
      "url": `https://www.newbuildhomescostablanca.com/builders/${slugify(developer)}/`,
      "description": content.metaDescription,
    },
    schemaFAQ: buildFAQSchema(content.faqs),
  };
}

function generateAreaContent(properties, area) {
  console.log(`Generating area guide for ${area}...`);
  
  const areaProperties = properties.filter(p => p.town.includes(area) || area.includes(p.town));
  const propertyTypes = [...new Set(areaProperties.map(p => p.propertyType))];
  const priceRange = areaProperties.filter(p => p.price).map(p => p.price);
  const minPrice = priceRange.length ? Math.min(...priceRange) : 0;
  const maxPrice = priceRange.length ? Math.max(...priceRange) : 0;
  
  const prompt = `You are an expert Costa Blanca real estate writer. Generate an area guide for property buyers.

AREA DATA:
- Area: ${area}, Costa Blanca North, Alicante Province, Spain
- New Build Properties: ${areaProperties.length}
- Property Types: ${propertyTypes.join(', ')}
- Price Range: €${minPrice.toLocaleString()} - €${maxPrice.toLocaleString()}

Generate in JSON format only:

{
  "metaTitle": "55-60 character SEO title",
  "metaDescription": "150-160 character meta description",
  "heroIntro": "2-3 paragraphs introducing ${area}",
  "lifestyleSection": {
    "intro": "2 paragraphs about lifestyle",
    "highlights": ["6-8 lifestyle highlights"]
  },
  "amenitiesSection": {
    "beaches": "1 paragraph about beaches",
    "dining": "1 paragraph about restaurants",
    "shopping": "1 paragraph about shopping",
    "healthcare": "1 paragraph about medical facilities",
    "transport": "1 paragraph about airports/transport"
  },
  "propertyMarketSection": "2 paragraphs about property market",
  "whyLiveHereSection": ["6-8 reasons to live here"],
  "faqs": [{"question": "FAQ", "answer": "answer"}],
  "conclusion": "1 paragraph encouraging buyers"
}

Generate 8-10 FAQs covering: cost of living, expat community, climate, safety, healthcare, language, property prices, rental potential.`;

  const responseText = callClaudeAPI(prompt, 4000);
  
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Could not parse JSON');
  
  const content = JSON.parse(jsonMatch[0]);
  
  return {
    slug: slugify(area),
    name: area,
    propertyCount: areaProperties.length,
    propertyTypes,
    priceRange: { min: minPrice, max: maxPrice },
    content,
    developments: areaProperties.map(p => ({
      name: p.projectName,
      slug: p.slug,
      propertyType: p.propertyType,
      price: p.price,
      bedrooms: p.bedrooms,
      image: p.images[0],
    })),
    schema: {
      "@context": "https://schema.org",
      "@type": "Place",
      "name": area,
      "description": content.metaDescription,
    },
    schemaFAQ: buildFAQSchema(content.faqs),
  };
}

async function main() {
  console.log('Starting content generation...\n');
  
  if (!API_KEY) {
    console.error('ERROR: ANTHROPIC_API_KEY not set');
    process.exit(1);
  }
  
  // Create output directories
  const contentDir = path.join(process.cwd(), 'src', 'content');
  const developmentsDir = path.join(contentDir, 'developments');
  const buildersDir = path.join(contentDir, 'builders');
  const areasDir = path.join(contentDir, 'areas');
  
  fs.mkdirSync(developmentsDir, { recursive: true });
  fs.mkdirSync(buildersDir, { recursive: true });
  fs.mkdirSync(areasDir, { recursive: true });
  
  // Fetch property data
  const properties = await fetchFeedData();
  console.log(`Found ${properties.length} new build properties\n`);
  
  // Generate development content for each property
  const developmentContents = [];
  for (const property of properties) {
    try {
      const content = generateDevelopmentContent(property);
      developmentContents.push(content);
      
      const filePath = path.join(developmentsDir, `${property.slug}.json`);
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
      console.log(`✓ Saved ${property.projectName}`);
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`✗ Error generating ${property.projectName}:`, error.message);
    }
  }
  
  // Generate builder content
  try {
    const builderContent = generateBuilderContent(properties);
    const builderPath = path.join(buildersDir, `${slugify(properties[0].developer)}.json`);
    fs.writeFileSync(builderPath, JSON.stringify(builderContent, null, 2));
    console.log(`\n✓ Saved builder profile: ${properties[0].developer}`);
  } catch (error) {
    console.error('✗ Error generating builder content:', error.message);
  }
  
  // Generate area content
  const areas = [...new Set(properties.map(p => p.town))];
  for (const area of areas) {
    try {
      const areaContent = generateAreaContent(properties, area);
      const areaPath = path.join(areasDir, `${slugify(area)}.json`);
      fs.writeFileSync(areaPath, JSON.stringify(areaContent, null, 2));
      console.log(`✓ Saved area guide: ${area}`);
      
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`✗ Error generating ${area} guide:`, error.message);
    }
  }
  
  // Save index file
  fs.writeFileSync(
    path.join(developmentsDir, 'index.json'),
    JSON.stringify(developmentContents.map(d => ({
      slug: d.slug,
      name: d.projectName,
      metaTitle: d.metaTitle,
      town: d.property.town,
      price: d.property.price,
    })), null, 2)
  );
  
  console.log('\n✓ Content generation complete!');
  console.log(`  - ${developmentContents.length} developments`);
  console.log(`  - 1 builder profile`);
  console.log(`  - ${areas.length} area guides`);
}

main().catch(console.error);
