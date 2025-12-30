import Anthropic from '@anthropic-ai/sdk';
import { XMLParser } from 'fast-xml-parser';
import * as fs from 'fs';
import * as path from 'path';

// Initialize Anthropic client
const anthropic = new Anthropic();

const FEED_URL = 'http://feeds.transporter.janeladigital.com/423E0F5F-30FC-4E01-8FE1-99BD7E14B021/0500015622.xml';

// Standard contact info
const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
  habeno: 'https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e',
};

interface PropertyData {
  id: string;
  ref: string;
  price: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  builtSize: number | null;
  plotSize: number | null;
  town: string;
  province: string;
  locationDetail: string;
  propertyType: string;
  description: string;
  images: string[];
  developer: string;
  projectName: string;
  slug: string;
}

interface GeneratedContent {
  slug: string;
  projectName: string;
  metaTitle: string;
  metaDescription: string;
  htmlContent: string;
  schemaProduct: object;
  schemaFAQ: object;
  schemaBreadcrumb: object;
  imageAlts: { url: string; alt: string }[];
}

function slugify(text: string): string {
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

function extractProjectName(description: string, propertyType: string, ref: string): string {
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

async function fetchFeedData(): Promise<PropertyData[]> {
  console.log('Fetching feed data...');
  const response = await fetch(FEED_URL);
  const xml = await response.text();
  
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
  });
  
  const data = parser.parse(xml);
  const properties = data?.root?.property || [];
  const agent = data?.root?.agent || {};
  
  const developerName = agent.name || 'Miralbo Urbana';
  const propArray = Array.isArray(properties) ? properties : [properties];
  
  return propArray
    .filter((p: any) => p.new_build === 1 || p.new_build === '1')
    .map((p: any) => {
      const descEn = p.desc?.en || '';
      const description = descEn.replace(/#ref:\w+/gi, '').trim();
      const projectName = extractProjectName(description, p.type || 'Property', p.ref || p.id);
      
      const images: string[] = [];
      if (p.images?.image) {
        const imgArray = Array.isArray(p.images.image) ? p.images.image : [p.images.image];
        imgArray.forEach((img: any) => {
          if (img?.url) images.push(img.url);
          else if (typeof img === 'string') images.push(img);
        });
      }
      
      return {
        id: String(p.id || ''),
        ref: p.ref || p.id || '',
        price: p.price ? Number(p.price) : null,
        bedrooms: p.beds ? Number(p.beds) : null,
        bathrooms: p.baths ? Number(p.baths) : null,
        builtSize: p.surface_area?.built ? Number(p.surface_area.built) : null,
        plotSize: p.surface_area?.plot ? Number(p.surface_area.plot) : null,
        town: p.town || '',
        province: p.province || 'Alicante',
        locationDetail: p.location_detail || '',
        propertyType: p.type || 'Property',
        description,
        images,
        developer: developerName,
        projectName,
        slug: slugify(projectName),
      };
    });
}

async function generateDevelopmentContent(property: PropertyData): Promise<GeneratedContent> {
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
${property.description}

CONTACT INFO TO USE:
- WhatsApp: ${CONTACT.whatsapp}
- Phone: ${CONTACT.phone}
- Habeno Mortgage Link: ${CONTACT.habeno}

Generate the following in JSON format:

{
  "metaTitle": "55-60 character SEO title",
  "metaDescription": "150-160 character meta description",
  "heroIntro": "2-3 compelling paragraphs introducing the property (use the developer description as base but enhance it)",
  "locationSection": {
    "intro": "2 paragraphs about why this location in ${property.town} is special",
    "highlights": ["5 location highlights as bullet points"]
  },
  "propertyFeatures": {
    "intro": "1 paragraph about the property's key features",
    "features": ["8-10 key features as bullet points"]
  },
  "investmentSection": "2 paragraphs about investment potential, rental yields in ${property.town}, and why this is a good investment",
  "whyBuySection": ["5-7 compelling reasons to buy this property"],
  "faqs": [
    {"question": "relevant FAQ question", "answer": "comprehensive answer (2-3 sentences)"}
  ],
  "conclusion": "1 paragraph with strong CTA"
}

Generate 8-10 FAQs covering: price/payment, location benefits, buying process, mortgage availability, rental potential, completion/availability, what's included, and how to view.

Make content unique, engaging, and optimized for "new build villa ${property.town}" and "${property.projectName}" keywords. Avoid generic filler - be specific about this property and location.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  });

  const textContent = response.content.find(c => c.type === 'text');
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text response from Claude');
  }
  
  // Extract JSON from response
  const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Could not parse JSON from response');
  }
  
  const content = JSON.parse(jsonMatch[0]);
  
  // Generate image alt tags
  const imageAlts = await generateImageAlts(property);
  
  // Build HTML content
  const htmlContent = buildDevelopmentHTML(property, content);
  
  // Build schema markup
  const schemaProduct = buildProductSchema(property);
  const schemaFAQ = buildFAQSchema(content.faqs);
  const schemaBreadcrumb = buildBreadcrumbSchema(property);
  
  return {
    slug: property.slug,
    projectName: property.projectName,
    metaTitle: content.metaTitle,
    metaDescription: content.metaDescription,
    htmlContent,
    schemaProduct,
    schemaFAQ,
    schemaBreadcrumb,
    imageAlts,
  };
}

async function generateImageAlts(property: PropertyData): Promise<{ url: string; alt: string }[]> {
  const alts: { url: string; alt: string }[] = [];
  
  for (let i = 0; i < property.images.length; i++) {
    const imageType = i === 0 ? 'exterior view' : 
                      i === 1 ? 'interior living area' :
                      i === 2 ? 'kitchen' :
                      i === 3 ? 'bedroom' :
                      i === 4 ? 'bathroom' :
                      i === 5 ? 'terrace' :
                      i === 6 ? 'pool area' :
                      `view ${i + 1}`;
    
    alts.push({
      url: property.images[i],
      alt: `${property.projectName} ${property.town} - ${imageType} of this new build ${property.propertyType.toLowerCase()} in Costa Blanca`,
    });
  }
  
  return alts;
}

function buildDevelopmentHTML(property: PropertyData, content: any): string {
  const price = property.price ? `€${property.price.toLocaleString()}` : 'Price on request';
  
  return `
<article class="development-content">
  <section class="hero-intro">
    ${content.heroIntro.split('\n\n').map((p: string) => `<p>${p}</p>`).join('\n    ')}
  </section>

  <section class="cta-box">
    <h3>Interested in ${property.projectName}?</h3>
    <p><strong>For the latest availability and pricing:</strong></p>
    <ul>
      <li>📱 <a href="${CONTACT.whatsapp}">WhatsApp us</a> for instant answers</li>
      <li>📞 Call <a href="tel:${CONTACT.phone.replace(/\s/g, '')}">${CONTACT.phone}</a></li>
      <li>🎥 Book a video visit to see the property remotely</li>
    </ul>
  </section>

  <section class="location">
    <h2>Location: ${property.locationDetail || property.town}</h2>
    ${content.locationSection.intro.split('\n\n').map((p: string) => `<p>${p}</p>`).join('\n    ')}
    <ul>
      ${content.locationSection.highlights.map((h: string) => `<li>${h}</li>`).join('\n      ')}
    </ul>
  </section>

  <section class="features">
    <h2>Property Features</h2>
    <p>${content.propertyFeatures.intro}</p>
    <ul>
      ${content.propertyFeatures.features.map((f: string) => `<li>${f}</li>`).join('\n      ')}
    </ul>
    
    <div class="specs-table">
      <table>
        <tr><th>Property Type</th><td>${property.propertyType}</td></tr>
        <tr><th>Bedrooms</th><td>${property.bedrooms || 'N/A'}</td></tr>
        <tr><th>Bathrooms</th><td>${property.bathrooms || 'N/A'}</td></tr>
        <tr><th>Built Size</th><td>${property.builtSize ? `${property.builtSize} m²` : 'N/A'}</td></tr>
        <tr><th>Plot Size</th><td>${property.plotSize ? `${property.plotSize} m²` : 'N/A'}</td></tr>
        <tr><th>Location</th><td>${property.town}, ${property.province}</td></tr>
        <tr><th>Reference</th><td>${property.ref}</td></tr>
      </table>
    </div>
  </section>

  <section class="investment">
    <h2>Investment Potential</h2>
    ${content.investmentSection.split('\n\n').map((p: string) => `<p>${p}</p>`).join('\n    ')}
    
    <div class="mortgage-cta">
      <h3>💰 Financing Available</h3>
      <p>We partner with <strong>Habeno</strong>, a specialized mortgage aggregator for international buyers. <a href="${CONTACT.habeno}">Start your mortgage application</a> - they'll compare rates from multiple Spanish banks.</p>
    </div>
  </section>

  <section class="why-buy">
    <h2>Why Choose ${property.projectName}?</h2>
    <ol>
      ${content.whyBuySection.map((r: string) => `<li>${r}</li>`).join('\n      ')}
    </ol>
  </section>

  <section class="faqs">
    <h2>Frequently Asked Questions</h2>
    ${content.faqs.map((faq: any) => `
    <div class="faq-item">
      <h3>${faq.question}</h3>
      <p>${faq.answer}</p>
    </div>`).join('\n    ')}
  </section>

  <section class="conclusion">
    <h2>Ready to Learn More?</h2>
    <p>${content.conclusion}</p>
    
    <div class="final-cta">
      <h3>📞 Contact Us Today</h3>
      <p><strong>📱 WhatsApp:</strong> <a href="${CONTACT.whatsapp}">Message us directly</a></p>
      <p><strong>📞 Call:</strong> <a href="tel:${CONTACT.phone.replace(/\s/g, '')}">${CONTACT.phone}</a></p>
      <p><strong>💰 Mortgage:</strong> <a href="${CONTACT.habeno}">Start application with Habeno</a></p>
    </div>
  </section>
</article>`;
}

function buildProductSchema(property: PropertyData): object {
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

function buildFAQSchema(faqs: { question: string; answer: string }[]): object {
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

function buildBreadcrumbSchema(property: PropertyData): object {
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

async function generateBuilderContent(properties: PropertyData[]): Promise<object> {
  console.log('Generating builder profile...');
  
  const developer = properties[0].developer;
  const towns = [...new Set(properties.map(p => p.town))];
  const propertyTypes = [...new Set(properties.map(p => p.propertyType))];
  const priceRange = properties.filter(p => p.price).map(p => p.price!);
  const minPrice = Math.min(...priceRange);
  const maxPrice = Math.max(...priceRange);
  
  const prompt = `You are an expert real estate copywriter. Generate a comprehensive builder profile page for a Spanish property developer.

BUILDER DATA:
- Name: ${developer}
- Location: ${towns.join(', ')}, Costa Blanca, Spain
- Property Types: ${propertyTypes.join(', ')}
- Number of Current Projects: ${properties.length}
- Price Range: €${minPrice.toLocaleString()} - €${maxPrice.toLocaleString()}

PROJECT LIST:
${properties.map(p => `- ${p.projectName}: ${p.propertyType} in ${p.town}, ${p.bedrooms} bed, €${p.price?.toLocaleString() || 'POA'}`).join('\n')}

Generate the following in JSON format:

{
  "metaTitle": "55-60 character SEO title for builder page",
  "metaDescription": "150-160 character meta description",
  "heroIntro": "2 compelling paragraphs introducing the builder and their reputation",
  "aboutSection": "2-3 paragraphs about the company, their experience, quality standards",
  "qualitySection": {
    "intro": "1 paragraph about construction quality",
    "standards": ["5-6 quality standards/features"]
  },
  "whyChooseSection": ["5-6 reasons to choose this builder"],
  "faqs": [
    {"question": "FAQ about the builder", "answer": "comprehensive answer"}
  ],
  "conclusion": "1 paragraph with CTA"
}

Generate 6-8 FAQs covering: experience, warranty, property types, viewing process, quality standards, payment plans.

Focus on ${developer} as a luxury villa specialist in ${towns.join('/')}, Costa Blanca.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 3000,
    messages: [{ role: 'user', content: prompt }],
  });

  const textContent = response.content.find(c => c.type === 'text');
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text response');
  }
  
  const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Could not parse JSON');
  }
  
  const content = JSON.parse(jsonMatch[0]);
  
  return {
    slug: slugify(developer),
    name: developer,
    ...content,
    projects: properties.map(p => ({
      name: p.projectName,
      slug: p.slug,
      town: p.town,
      propertyType: p.propertyType,
      price: p.price,
      bedrooms: p.bedrooms,
    })),
    schema: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": developer,
      "url": `https://www.newbuildhomescostablanca.com/builders/${slugify(developer)}/`,
      "description": content.metaDescription,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": towns[0],
        "addressRegion": "Alicante",
        "addressCountry": "ES"
      }
    }
  };
}

async function generateAreaContent(properties: PropertyData[], area: string): Promise<object> {
  console.log(`Generating area guide for ${area}...`);
  
  const areaProperties = properties.filter(p => p.town.includes(area) || area.includes(p.town));
  const propertyTypes = [...new Set(areaProperties.map(p => p.propertyType))];
  const priceRange = areaProperties.filter(p => p.price).map(p => p.price!);
  const minPrice = priceRange.length ? Math.min(...priceRange) : 0;
  const maxPrice = priceRange.length ? Math.max(...priceRange) : 0;
  
  const prompt = `You are an expert Costa Blanca real estate writer. Generate a comprehensive area guide for property buyers.

AREA DATA:
- Area: ${area}, Costa Blanca, Spain
- Region: Costa Blanca North, Alicante Province
- Number of New Build Properties: ${areaProperties.length}
- Property Types Available: ${propertyTypes.join(', ')}
- Price Range: €${minPrice.toLocaleString()} - €${maxPrice.toLocaleString()}

CURRENT DEVELOPMENTS IN AREA:
${areaProperties.map(p => `- ${p.projectName}: ${p.propertyType}, ${p.bedrooms} bed`).join('\n')}

Generate the following in JSON format:

{
  "metaTitle": "55-60 character SEO title for area guide",
  "metaDescription": "150-160 character meta description",
  "heroIntro": "2-3 paragraphs introducing ${area} as a place to live and buy property",
  "lifestyleSection": {
    "intro": "2 paragraphs about the lifestyle in ${area}",
    "highlights": ["6-8 lifestyle highlights"]
  },
  "amenitiesSection": {
    "beaches": "1 paragraph about nearby beaches",
    "dining": "1 paragraph about restaurants and nightlife", 
    "shopping": "1 paragraph about shopping options",
    "healthcare": "1 paragraph about medical facilities",
    "transport": "1 paragraph about airports and getting around"
  },
  "propertyMarketSection": "2 paragraphs about the property market, prices, trends",
  "whyLiveHereSection": ["6-8 reasons to live in ${area}"],
  "faqs": [
    {"question": "FAQ about living/buying in ${area}", "answer": "comprehensive answer"}
  ],
  "conclusion": "1 paragraph encouraging buyers to explore properties"
}

Generate 8-10 FAQs covering: cost of living, expat community, climate, safety, healthcare, language, property prices, rental potential.

Be specific about ${area} - mention actual beaches, restaurants areas, local landmarks. This is Costa Blanca North - upmarket, less touristy than the south.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  });

  const textContent = response.content.find(c => c.type === 'text');
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text response');
  }
  
  const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Could not parse JSON');
  }
  
  const content = JSON.parse(jsonMatch[0]);
  
  return {
    slug: slugify(area),
    name: area,
    ...content,
    developments: areaProperties.map(p => ({
      name: p.projectName,
      slug: p.slug,
      propertyType: p.propertyType,
      price: p.price,
      bedrooms: p.bedrooms,
    })),
    schema: {
      "@context": "https://schema.org",
      "@type": "Place",
      "name": area,
      "description": content.metaDescription,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": area,
        "addressRegion": "Alicante",
        "addressCountry": "ES"
      }
    }
  };
}

async function main() {
  console.log('Starting content generation...\n');
  
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
  const developmentContents: GeneratedContent[] = [];
  for (const property of properties) {
    try {
      const content = await generateDevelopmentContent(property);
      developmentContents.push(content);
      
      // Save individual development content
      const filePath = path.join(developmentsDir, `${property.slug}.json`);
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
      console.log(`✓ Saved ${property.projectName}`);
      
      // Rate limiting - wait between API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`✗ Error generating ${property.projectName}:`, error);
    }
  }
  
  // Generate builder content
  try {
    const builderContent = await generateBuilderContent(properties);
    const builderPath = path.join(buildersDir, `${slugify(properties[0].developer)}.json`);
    fs.writeFileSync(builderPath, JSON.stringify(builderContent, null, 2));
    console.log(`\n✓ Saved builder profile: ${properties[0].developer}`);
  } catch (error) {
    console.error('✗ Error generating builder content:', error);
  }
  
  // Generate area content for unique areas
  const areas = [...new Set(properties.map(p => p.town))];
  for (const area of areas) {
    try {
      const areaContent = await generateAreaContent(properties, area);
      const areaPath = path.join(areasDir, `${slugify(area)}.json`);
      fs.writeFileSync(areaPath, JSON.stringify(areaContent, null, 2));
      console.log(`✓ Saved area guide: ${area}`);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`✗ Error generating ${area} guide:`, error);
    }
  }
  
  // Save index files
  fs.writeFileSync(
    path.join(developmentsDir, 'index.json'),
    JSON.stringify(developmentContents.map(d => ({
      slug: d.slug,
      name: d.projectName,
      metaTitle: d.metaTitle,
    })), null, 2)
  );
  
  console.log('\n✓ Content generation complete!');
  console.log(`  - ${developmentContents.length} developments`);
  console.log(`  - 1 builder profile`);
  console.log(`  - ${areas.length} area guides`);
}

main().catch(console.error);
