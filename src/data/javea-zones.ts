// Jávea Super Guide - Zone definitions
// 4 distinct neighborhoods covering the Jávea municipality

export interface JaveaZoneStats {
  avgPrice: string;
  distanceToBeach: string;
  character: string;
}

export interface JaveaAmenity {
  name: string;
  distance?: string;
  type: 'beach' | 'shopping' | 'dining' | 'healthcare' | 'transport' | 'park' | 'school' | 'sport' | 'golf';
}

export interface JaveaZone {
  id: string;
  name: string;
  subtitle: string;
  description: string[];
  stats: JaveaZoneStats;
  highlights: string[];
  amenities: JaveaAmenity[];
  propertyTypes: string[];
  priceRange: string;
  propertyLink: string;
  blogLinks: { title: string; slug: string }[];
  seoKeywords: string[];
}

export const javeaZones: JaveaZone[] = [
  {
    id: 'arenal',
    name: 'Arenal Beach & Promenade',
    subtitle: 'The golden crescent — family-friendly beachfront living at its finest',
    description: [
      'Arenal is the beating heart of Jávea\'s social scene and the area most international buyers picture when they dream of Mediterranean life. The wide, sandy beach sweeps in a perfect crescent around a turquoise bay, backed by a bustling promenade lined with restaurants, boutiques, and ice cream parlors. Unlike the pebble coves that define much of the northern Costa Blanca, Arenal delivers that classic golden-sand beach experience — and it draws visitors and residents year-round.',
      'The promenade (Paseo Marítimo) is the daily stage for morning joggers, evening strollers, and families spilling out of beachfront restaurants as the sun sets behind the Montgó. Property along and behind the Arenal commands the highest prices in Jávea, with modern apartments and penthouses offering front-row views of the bay. Side streets host a dense concentration of international restaurants, real estate agencies, and upscale shops catering to the predominantly Northern European clientele.',
      'Living at the Arenal means you can walk to the beach in flip-flops, dine at a different restaurant every night for a month, and still have the old town\'s authentic Spanish charm just a 10-minute drive away. The Arenal is also the base for water sports — paddleboarding, kayaking, diving — and the departure point for boat trips to the dramatic cliffs of Cabo de la Nao and the hidden beaches beyond.',
    ],
    stats: {
      avgPrice: '€350,000–€1,200,000',
      distanceToBeach: '0–500m',
      character: 'Premium beachfront',
    },
    highlights: [
      'Wide sandy beach — the best on the northern Costa Blanca for families',
      'Paseo Marítimo promenade with 50+ restaurants and bars',
      'Water sports hub: paddleboarding, kayaking, sailing, and diving',
      'Blue Flag beach with lifeguards, showers, and accessibility ramps',
      'Walking distance to Cabo de la Nao cliff path and hidden coves',
      'Year-round social scene with outdoor dining until late',
    ],
    amenities: [
      { name: 'Arenal Beach', distance: '0–300m', type: 'beach' },
      { name: 'Paseo Marítimo restaurants', distance: '0–200m', type: 'dining' },
      { name: 'Arenal Supermercado', distance: '200m', type: 'shopping' },
      { name: 'Club Náutico de Jávea', distance: '1.5km', type: 'sport' },
      { name: 'Hospital de Dénia', distance: '12km', type: 'healthcare' },
      { name: 'Dive centers & water sports', distance: '100m', type: 'sport' },
      { name: 'Bus to Old Town & Port', distance: '200m', type: 'transport' },
    ],
    propertyTypes: ['Beachfront apartments', 'Penthouses', 'Luxury villas', 'Holiday homes'],
    priceRange: '€250,000–€2,500,000',
    propertyLink: '/developments?town=javea',
    blogLinks: [
      { title: 'Jávea Property Guide', slug: 'javea-property-guide' },
      { title: 'Best Beaches Costa Blanca', slug: 'best-beaches-costa-blanca-south' },
    ],
    seoKeywords: [
      'Arenal beach Jávea property', 'Jávea beachfront apartment', 'Arenal Jávea villas',
      'buy apartment Arenal Jávea', 'Jávea sandy beach property', 'Paseo Marítimo Jávea',
    ],
  },
  {
    id: 'old-town',
    name: 'Old Town (Pueblo Antiguo)',
    subtitle: 'Medieval charm meets modern living — Jávea\'s historic heart beneath Montgó',
    description: [
      'The old town of Jávea, known locally as the Pueblo, is one of the most atmospheric historic centers on the Costa Blanca. Perched on a hill 2 kilometers inland from the coast, its medieval streets were originally designed to confuse Berber pirates who raided the coastline for centuries. Today, those winding lanes of honey-colored stone are home to artisan shops, traditional tapas bars, and one of the finest Gothic churches in the Valencia region — the Iglesia de San Bartolomé.',
      'The Pueblo is where Spanish life continues largely unchanged. The weekly Thursday market fills the streets with produce from the Jalón Valley, local almonds, honey, and handmade ceramics. Old men play dominoes in the plaza, and the rhythm of the church bells still marks the hours. For buyers who want authentic Spain rather than the expat bubble, the old town delivers a depth of culture that the coast cannot match.',
      'Property in the old town is predominantly traditional townhouses (casas de pueblo), many dating from the 18th and 19th centuries and now beautifully renovated. Prices are significantly lower than the Arenal, and the reward is a genuinely Spanish neighborhood where you will learn the language, know your neighbors by name, and experience fiestas from the inside. The Montgó mountain rises directly behind the pueblo, offering hiking trails and jaw-dropping views of the coastline from its 753-meter summit.',
    ],
    stats: {
      avgPrice: '€180,000–€500,000',
      distanceToBeach: '2–3km',
      character: 'Historic & authentic',
    },
    highlights: [
      'Medieval street layout with Gothic Iglesia de San Bartolomé (14th century)',
      'Thursday market — one of the region\'s best for local produce',
      'Renovated townhouses (casas de pueblo) with traditional character',
      'Montgó Natural Park hiking trails starting from the old town',
      'Authentic Spanish atmosphere with traditional tapas bars',
      'Panoramic views from the mirador toward the sea and mountains',
    ],
    amenities: [
      { name: 'Arenal Beach', distance: '2.5km', type: 'beach' },
      { name: 'Thursday market', distance: '0m', type: 'shopping' },
      { name: 'Plaza de la Constitución', distance: '0m', type: 'dining' },
      { name: 'Centro de Salud Jávea', distance: '500m', type: 'healthcare' },
      { name: 'Montgó Natural Park trailhead', distance: '1km', type: 'park' },
      { name: 'International schools', distance: '3km', type: 'school' },
      { name: 'Supermarkets (Mercadona, Consum)', distance: '500m', type: 'shopping' },
    ],
    propertyTypes: ['Townhouses', 'Casas de pueblo', 'Renovated apartments', 'Character homes'],
    priceRange: '€120,000–€600,000',
    propertyLink: '/developments?town=javea',
    blogLinks: [
      { title: 'Jávea Property Guide', slug: 'javea-property-guide' },
      { title: 'North vs South Costa Blanca', slug: 'north-vs-south-costa-blanca-comparison' },
    ],
    seoKeywords: [
      'Jávea old town property', 'pueblo Jávea house', 'townhouse Jávea',
      'historic property Jávea', 'Montgó Jávea', 'casa de pueblo Xàbia',
    ],
  },
  {
    id: 'port',
    name: 'Port (Puerto de Jávea)',
    subtitle: 'Where fishing tradition meets waterfront luxury — the original Jávea',
    description: [
      'The port of Jávea is where the town began. Long before tourists discovered the Arenal, generations of Jávea families lived from the sea, and that maritime heritage is still woven into every corner of the port district. The fishing boats still come in each morning, unloading the catch that goes straight to the lonja (fish auction) and then to the restaurants that line the waterfront. Eating grilled seafood overlooking the harbor while boats rock gently in the dusk is one of the defining Jávea experiences.',
      'The port area has evolved into a sophisticated mix of traditional and modern. The Club Náutico de Jávea is the social anchor — a prestigious yacht club with berths for boats up to 25 meters, a sailing school, and a popular restaurant. Around it, you will find boutique apartment buildings, a small pebble beach (Playa de la Grava), and the elegant Paseo del Marinero promenade. The Parador de Jávea, one of Spain\'s government-run luxury hotels, stands at the harbor entrance.',
      'Property prices in the port fall between the premium Arenal and the affordable old town, making it an attractive option for buyers who want waterfront living without the tourist intensity. Many properties offer direct harbor views, and the neighborhood retains a year-round residential population — the port never fully empties in winter the way some beach areas do. From here, it is a short walk along the Paseo to the Arenal, or a drive up to the old town for market day.',
    ],
    stats: {
      avgPrice: '€220,000–€700,000',
      distanceToBeach: '0–400m',
      character: 'Maritime & sophisticated',
    },
    highlights: [
      'Working fishing port with daily fish auction and fresh seafood restaurants',
      'Club Náutico de Jávea — yacht club with sailing school and marina',
      'Parador de Jávea — government luxury hotel on the harbor',
      'Playa de la Grava pebble beach with calm, crystal-clear water',
      'Walking distance along Paseo del Marinero to Arenal beach',
      'Year-round residential community — not seasonal or tourist-dependent',
    ],
    amenities: [
      { name: 'Playa de la Grava', distance: '0–200m', type: 'beach' },
      { name: 'Club Náutico de Jávea', distance: '200m', type: 'sport' },
      { name: 'Port seafood restaurants', distance: '0–100m', type: 'dining' },
      { name: 'Arenal Beach', distance: '1.5km', type: 'beach' },
      { name: 'Port supermarkets', distance: '300m', type: 'shopping' },
      { name: 'Parador de Jávea', distance: '400m', type: 'dining' },
      { name: 'Bus connections', distance: '200m', type: 'transport' },
    ],
    propertyTypes: ['Harbor-view apartments', 'Penthouses', 'Modern townhouses', 'Waterfront villas'],
    priceRange: '€180,000–€1,200,000',
    propertyLink: '/developments?town=javea',
    blogLinks: [
      { title: 'Jávea Property Guide', slug: 'javea-property-guide' },
    ],
    seoKeywords: [
      'Jávea port property', 'Puerto Jávea apartment', 'harbor view Jávea',
      'Club Náutico Jávea', 'waterfront property Xàbia', 'fishing port Jávea living',
    ],
  },
  {
    id: 'montanar',
    name: 'Montañar & Cap Martí',
    subtitle: 'Cliff-top exclusivity — where Montgó meets the sea in dramatic fashion',
    description: [
      'Montañar and Cap Martí occupy the dramatic headland between the Arenal and the wild cliffs of Cabo de la Nao, where the Montgó mountain drops almost vertically into the Mediterranean. This is Jávea\'s most exclusive residential zone — low-density villas set among pine trees on steep hillsides, many with infinity pools that seem to merge with the sea below. The views from Cap Martí are among the most spectacular on the entire Spanish Mediterranean coast.',
      'The area\'s exclusivity is protected by geography. The narrow roads wind up the mountainside through gates and private drives, revealing occasional glimpses of the sea between the trees. Properties here are predominantly luxury villas built on large plots (1,000-5,000m²), many by prestigious developers like Miralbo and GV Real Estate. The Montgó Nature Reserve borders the northern edge, ensuring the pine forest backdrop will never be developed.',
      'Living in Montañar means trading walkability for privacy and natural beauty. You are 5-10 minutes by car from the Arenal and the old town, but your daily reality is hiking trails through Mediterranean forest, watching the sunrise over the sea from your terrace, and a level of peace that the lower zones simply cannot offer. This is where Jávea\'s most discerning buyers — those choosing between Jávea and Mallorca, Jávea and the French Riviera — ultimately settle.',
    ],
    stats: {
      avgPrice: '€800,000–€3,500,000',
      distanceToBeach: '1–3km',
      character: 'Luxury & exclusive',
    },
    highlights: [
      'Most exclusive residential zone in Jávea — hilltop villa plots of 1,000-5,000m²',
      'Panoramic sea views from elevated positions along the Cap Martí headland',
      'Direct access to Montgó Natural Park hiking trails',
      'Cabo de la Nao lighthouse — the easternmost point of mainland Spain',
      'Pine forest setting with protected natural environment',
      'Premium new build villas by Miralbo and leading developers',
    ],
    amenities: [
      { name: 'Arenal Beach', distance: '2km', type: 'beach' },
      { name: 'Cabo de la Nao cliffs', distance: '2km', type: 'park' },
      { name: 'Montgó Nature Reserve', distance: '0m', type: 'park' },
      { name: 'La Granadella beach', distance: '8km', type: 'beach' },
      { name: 'Club de Golf Jávea', distance: '5km', type: 'golf' },
      { name: 'Arenal restaurants', distance: '2km', type: 'dining' },
      { name: 'Hospital de Dénia', distance: '15km', type: 'healthcare' },
    ],
    propertyTypes: ['Luxury villas', 'Designer homes', 'New build exclusives', 'Sea-view estates'],
    priceRange: '€695,000–€4,500,000',
    propertyLink: '/developments?town=javea',
    blogLinks: [
      { title: 'Jávea Property Guide', slug: 'javea-property-guide' },
      { title: 'La Sella Golf Resort', slug: 'la-sella-golf-resort-javea' },
    ],
    seoKeywords: [
      'luxury villa Jávea', 'Cap Martí property', 'Montañar Jávea villa',
      'sea view villa Xàbia', 'exclusive property Jávea', 'Montgó mountain villa',
      'new build luxury Jávea', 'premium villa Costa Blanca North',
    ],
  },
];

// FAQ data for schema markup and FAQ section
export const javeaFaqs = [
  {
    question: 'Is Jávea a good place to buy property in 2026?',
    answer: 'Jávea is one of the most sought-after locations on the Costa Blanca North, with property values that have consistently appreciated over the past decade. The combination of a UNESCO-recognized microclimate, dramatic Montgó mountain scenery, three distinct living zones (Arenal, Old Town, Port), and a 50% international population creates a stable, premium property market. Prices range from €120,000 for a townhouse to €4.5M for a luxury villa.',
  },
  {
    question: 'What is the average property price in Jávea?',
    answer: 'Jávea property prices vary significantly by zone. Old town townhouses start from €120,000-€300,000. Port apartments range from €180,000-€700,000. Arenal beachfront apartments command €350,000-€1,200,000. Luxury villas in Montañar and Cap Martí start at €695,000 and can exceed €4,500,000 for prime cliff-top positions with sea views.',
  },
  {
    question: 'Which area of Jávea is best for families?',
    answer: 'The Arenal zone is most popular with families thanks to the wide sandy beach (the only one in Jávea), the promenade with child-friendly restaurants, and proximity to international schools. The old town is also excellent for families who prefer a more Spanish cultural immersion — the weekly market, neighborhood parks, and local school integration programs are outstanding.',
  },
  {
    question: 'How far is Jávea from the airport?',
    answer: 'Alicante-Elche Airport (ALC) is approximately 90 minutes by car (100km) via the AP-7 motorway. Valencia Airport (VLC) is 110 minutes (120km). Both airports have extensive European connections year-round. Many residents also use Denia\'s ferry terminal for quick crossings to Ibiza and Mallorca.',
  },
  {
    question: 'What is Montgó and why does it matter?',
    answer: 'Montgó is a 753-meter mountain that dominates the Jávea-Denia landscape. It is a protected Natural Park (Parque Natural del Montgó) with marked hiking trails, endemic plant species, and panoramic summit views stretching to Ibiza on clear days. Properties near Montgó benefit from the mountain\'s microclimate shield and the guarantee that the surrounding landscape can never be developed.',
  },
  {
    question: 'Can foreigners get a mortgage to buy in Jávea?',
    answer: 'Yes. Spanish banks offer mortgages to non-residents, typically up to 70% loan-to-value (LTV) for properties under €500,000 and 60% LTV for luxury properties. Interest rates in 2026 average 3-4% for fixed-rate mortgages. For Jávea\'s premium market, several banks have specialist international mortgage departments experienced with high-value transactions.',
  },
  {
    question: 'What is the cost of living in Jávea?',
    answer: 'Jávea is more expensive than the southern Costa Blanca but offers excellent value compared to similar Mediterranean destinations. Monthly costs for a couple: rent €800-€1,400, utilities €100-€150, groceries €350-€450, dining out €300-€500, health insurance €100-€150 per person. Total monthly costs range from €1,600-€2,500 excluding rent.',
  },
  {
    question: 'What are the best beaches in Jávea?',
    answer: 'Jávea has three main beaches: Playa del Arenal (sandy, family-friendly, Blue Flag), Playa de la Grava (pebble beach at the port), and La Granadella (dramatic cliff cove, rated among Spain\'s best). Additionally, Cabo de la Nao offers numerous hidden coves accessible by foot or kayak, including Portitxol and Cala Ambolo.',
  },
  {
    question: 'Does Jávea have good healthcare?',
    answer: 'Jávea has a public health center (Centro de Salud) for primary care and several private clinics. The main hospital is Hospital de Dénia-Marina Salud, just 12 km north, which is a modern public-private hospital with emergency services and specialist departments. Many doctors and dentists in the area speak English and other European languages.',
  },
  {
    question: 'Is Jávea good for retirement?',
    answer: 'Jávea is one of Spain\'s premier retirement destinations. The World Health Organization has recognized its microclimate as one of the healthiest in the world, with 320+ sunny days, mild winters (rarely below 10°C), and low humidity. The large international community means English is widely spoken, social clubs are abundant, and cultural integration is gentle.',
  },
  {
    question: 'What are the buying costs for property in Jávea?',
    answer: 'For new build properties: 10% IVA (VAT) plus 1.5% stamp duty (AJD), plus approximately 1-2% for notary, registry, and legal fees — totaling around 13-14%. For resale properties: 10% transfer tax (ITP) in the Valencia region, plus legal and registry fees. Budget approximately €40,000-€60,000 in costs on a €400,000 property.',
  },
  {
    question: 'Can I rent out my property in Jávea?',
    answer: 'Yes. Jávea is one of the strongest holiday rental markets on the Costa Blanca North. A well-located 2-3 bedroom villa with pool can achieve €1,500-€3,000 per week in peak summer. A tourist rental license (VT - Vivienda Turística) is required. Rental yields of 4-6% gross are typical for quality properties in the Arenal and port areas.',
  },
  {
    question: 'What is the expat community like in Jávea?',
    answer: 'Approximately 50% of Jávea\'s population is international, predominantly British, German, Dutch, and Scandinavian. This creates a cosmopolitan atmosphere with international social clubs, language exchanges, charity organizations, and sporting groups. Key gathering points include the Arenal promenade cafés, the yacht club, and the many charity shops and community centers.',
  },
  {
    question: 'What events and festivals happen in Jávea?',
    answer: 'Major events include the Moors & Christians festival (July), Fogueres de Sant Joan fireworks (June), the Arenal Jazz Festival (summer), the International Piano Competition, and the traditional Bous a la Mar (bulls by the sea) during July fiestas. The weekly Thursday market in the old town runs year-round and is one of the best on the Costa Blanca.',
  },
  {
    question: 'Is there golf near Jávea?',
    answer: 'Club de Golf Jávea is a scenic 9-hole course just 5km from the Arenal, set against the Montgó mountain. La Sella Golf Resort in nearby Denia offers 27 holes designed by José María Olazábal with a Marriott hotel. Club de Golf Ifach in Benissa and Don Cayo in Altea are also within 20-30 minutes, giving Jávea residents access to 4+ courses.',
  },
];

// Cost of living data for the practical info section
export const javeaCostOfLiving = [
  { category: 'Rent (2-bed apartment)', cost: '€800–€1,400/month', notes: 'Higher at Arenal, lower in old town' },
  { category: 'Rent (3-bed villa with pool)', cost: '€1,200–€2,500/month', notes: 'Year-round lease, unfurnished' },
  { category: 'Utilities (electricity, water, gas)', cost: '€100–€150/month', notes: 'Pool maintenance adds €80-100/month' },
  { category: 'Groceries', cost: '€350–€450/month', notes: 'Mercadona, Consum, Aldi, plus Thursday market' },
  { category: 'Dining out', cost: '€12–€25/meal', notes: 'Menú del día €12-€15, Arenal restaurants €20-€40' },
  { category: 'Private health insurance', cost: '€80–€180/month', notes: 'Per person, age-dependent' },
  { category: 'Community fees (apartment)', cost: '€50–€120/month', notes: 'Varies by urbanization and amenities' },
  { category: 'IBI property tax', cost: '€400–€1,500/year', notes: 'Based on cadastral value, higher for villas' },
  { category: 'Home insurance', cost: '€200–€500/year', notes: 'Contents and building, higher for luxury' },
  { category: 'Internet + mobile', cost: '€30–€50/month', notes: 'Fibre available in most areas' },
];

// Beach data
export const javeaBeaches = [
  { name: 'Playa del Arenal', zone: 'arenal', blueFlag: true, character: 'Wide sandy beach, family-friendly, promenade restaurants', length: '500m' },
  { name: 'Playa de la Grava', zone: 'port', blueFlag: true, character: 'Pebble beach at the port, crystal-clear water', length: '200m' },
  { name: 'La Granadella', zone: 'montanar', blueFlag: false, character: 'Dramatic cliff cove, rated among Spain\'s most beautiful', length: '160m' },
  { name: 'Cala Portitxol', zone: 'montanar', blueFlag: false, character: 'Hidden pebble cove with snorkeling paradise', length: '80m' },
  { name: 'Cala Ambolo', zone: 'montanar', blueFlag: false, character: 'Secluded cliff beach beneath towering pines', length: '300m' },
  { name: 'Cala Barraca (Portitxol)', zone: 'montanar', blueFlag: false, character: 'Traditional fishing cove with restaurant', length: '100m' },
  { name: 'Cala Blanca', zone: 'arenal', blueFlag: false, character: 'White pebble cove south of the Arenal', length: '100m' },
];

// Events calendar
export const javeaEvents = [
  { name: 'Fogueres de Sant Joan', month: 'June', description: 'Spectacular bonfire and fireworks festival marking the summer solstice' },
  { name: 'Moors & Christians Festival', month: 'July', description: 'Week-long celebration with parades, costumes, and mock battles' },
  { name: 'Bous a la Mar', month: 'July', description: 'Traditional bulls by the sea — unique fiesta at the port' },
  { name: 'International Music Festival', month: 'Summer', description: 'Jazz, classical, and contemporary music throughout the season' },
  { name: 'Thursday Market', month: 'Year-round', description: 'Weekly market in the old town with local produce and artisan goods' },
  { name: 'Virgen del Carmen', month: 'July', description: 'Maritime procession honoring the patron saint of fishermen' },
];

// Schools data
export const javeaSchools = [
  { name: 'Xàbia International College (XIC)', type: 'British International', curriculum: 'UK National Curriculum, GCSE, A-Levels', notes: 'English-medium, established 1994' },
  { name: 'Colegio Público Trenc d\'Alba', type: 'Spanish Public', curriculum: 'Spanish national curriculum in Valencian/Spanish', notes: 'Integration programs for international children' },
  { name: 'Graüll School (IES Antoni Llidó)', type: 'Spanish Public Secondary', curriculum: 'ESO and Bachillerato', notes: 'State secondary school with good reputation' },
];

// Nature & activities
export const javeaActivities = [
  { name: 'Montgó Summit Hike', type: 'Hiking', description: '753m peak with 360° views — see Ibiza on clear days. 3-4 hour return trip.' },
  { name: 'Cabo de la Nao Cliff Walk', type: 'Walking', description: 'Coastal path to the lighthouse, the easternmost point of mainland Spain.' },
  { name: 'La Granadella Kayaking', type: 'Water Sports', description: 'Kayak and paddleboard along dramatic cliff coastline with hidden caves.' },
  { name: 'Scuba Diving', type: 'Water Sports', description: 'Multiple dive centers offering courses and guided dives in marine reserves.' },
  { name: 'Club de Golf Jávea', type: 'Golf', description: '9-hole course with Montgó views. La Sella (27 holes, Olazábal) is 15km away.' },
  { name: 'Sailing & Yacht Club', type: 'Sailing', description: 'Club Náutico de Jávea offers berths, sailing courses, and social events.' },
];
