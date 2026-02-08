// Torrevieja Super Guide - Zone definitions
// 7 distinct neighborhoods covering the entire Torrevieja municipality

export interface ZoneStats {
  avgPrice: string;
  distanceToBeach: string;
  character: string;
}

export interface ZoneAmenity {
  name: string;
  distance?: string;
  type: 'beach' | 'shopping' | 'dining' | 'healthcare' | 'transport' | 'park' | 'school' | 'sport';
}

export interface TorreviejaZone {
  id: string;
  name: string;
  subtitle: string;
  description: string[];
  stats: ZoneStats;
  highlights: string[];
  amenities: ZoneAmenity[];
  propertyTypes: string[];
  priceRange: string;
  propertyLink: string;
  blogLinks: { title: string; slug: string }[];
  seoKeywords: string[];
}

export const torreviejaZones: TorreviejaZone[] = [
  {
    id: 'centro',
    name: 'Centro & Playa del Cura',
    subtitle: 'The beating heart of Torrevieja — beachfront living meets city convenience',
    description: [
      'Centro is where Torrevieja comes alive. The main city beach, Playa del Cura, stretches along a beautiful promenade lined with palm trees, restaurants, and cafes. This is the Torrevieja most visitors fall in love with — the Blue Flag beach just steps from the Paseo Maritimo, the iconic Habaneras shopping boulevard, and the lively harbor where fishing boats come in each morning.',
      'Living in Centro means everything is walkable. The Mercado Municipal, one of the finest indoor markets on the Costa Blanca, is just two blocks from the beach. You have the Club Nautico yacht club, multiple pharmacies, medical centers, and the main bus station within a 10-minute stroll. Properties range from renovated apartments along the Paseo Vista Alegre to modern builds near the marina.',
      'For buyers who want the full Mediterranean lifestyle without a car, Centro delivers. Morning coffee on the promenade, fresh fish from the market for lunch, an evening paseo along the harbor — this is the daily rhythm of thousands of happy expats and Spanish residents who call this neighborhood home.',
    ],
    stats: {
      avgPrice: '€120,000–€220,000',
      distanceToBeach: '0–500m',
      character: 'Urban beachfront',
    },
    highlights: [
      'Playa del Cura Blue Flag beach on your doorstep',
      'Paseo Maritimo — 6km seafront promenade for walking and cycling',
      'Habaneras shopping center and Avenida de las Habaneras boutiques',
      'Mercado Municipal fresh food market open every morning',
      'Club Nautico yacht club and Marina Salinas luxury port',
      'Direct bus connections to Alicante Airport and surrounding towns',
    ],
    amenities: [
      { name: 'Playa del Cura', distance: '0–300m', type: 'beach' },
      { name: 'CC Habaneras', distance: '200m', type: 'shopping' },
      { name: 'Mercado Municipal', distance: '400m', type: 'shopping' },
      { name: 'Hospital de Torrevieja', distance: '3km', type: 'healthcare' },
      { name: 'Club Nautico', distance: '500m', type: 'sport' },
      { name: 'Bus Station', distance: '600m', type: 'transport' },
      { name: 'Parque de las Naciones', distance: '1.2km', type: 'park' },
    ],
    propertyTypes: ['Apartments', 'Penthouses', 'Renovated townhouses'],
    priceRange: '€89,000–€350,000',
    propertyLink: '/developments?town=torrevieja',
    blogLinks: [
      { title: 'Torrevieja Property Guide', slug: 'torrevieja-property-guide' },
      { title: 'Cost of Living in Spain', slug: 'cost-of-living-spain-2026' },
    ],
    seoKeywords: [
      'Playa del Cura apartments', 'Torrevieja center property', 'beachfront apartment Torrevieja',
      'Paseo Maritimo Torrevieja', 'Club Nautico Torrevieja', 'Torrevieja city center living',
    ],
  },
  {
    id: 'naufragos',
    name: 'Los Naufragos & Puerto',
    subtitle: 'Harbor views and golden sand — where the marina meets the beach',
    description: [
      'Los Naufragos sits south of the city center where the harbor opens onto one of Torrevieja\'s most loved beaches. Playa de Los Naufragos earned its Blue Flag status for crystal-clear water, excellent facilities, and a gently sloping shoreline that makes it perfect for families. The beach promenade connects directly to the port area, where fresh seafood restaurants line the waterfront.',
      'The harbor district has undergone significant development in recent years. Marina Salinas provides world-class berths for boats up to 40 meters, and the surrounding streets offer a blend of traditional Spanish architecture and modern apartment complexes. Many buyers are drawn here for the unique combination of a working fishing port atmosphere with premium amenities.',
      'Property prices in the Los Naufragos area offer strong value compared to the pure city center, while being just a 10-minute walk from the Habaneras shopping area. You are also closer to the southern coastal path that leads toward Playa del Acequion and the dramatic cliffs of Cabo Cervera.',
    ],
    stats: {
      avgPrice: '€110,000–€200,000',
      distanceToBeach: '0–400m',
      character: 'Harbor & beach',
    },
    highlights: [
      'Playa de Los Naufragos — Blue Flag beach with calm, shallow water',
      'Marina Salinas — 700-berth luxury yacht port',
      'Fresh seafood restaurants along the harbor promenade',
      'Walking distance to city center and Habaneras shopping',
      'Southern coastal path toward Cabo Cervera cliffs',
      'Fishing port atmosphere with daily fish auction',
    ],
    amenities: [
      { name: 'Playa Los Naufragos', distance: '0–200m', type: 'beach' },
      { name: 'Marina Salinas', distance: '300m', type: 'sport' },
      { name: 'Puerto seafood restaurants', distance: '100m', type: 'dining' },
      { name: 'CC Habaneras', distance: '800m', type: 'shopping' },
      { name: 'Playa del Acequion', distance: '600m', type: 'beach' },
      { name: 'Bus routes to La Mata & Orihuela Costa', distance: '400m', type: 'transport' },
    ],
    propertyTypes: ['Apartments', 'Penthouses', 'Sea-view studios'],
    priceRange: '€79,000–€280,000',
    propertyLink: '/developments?town=torrevieja',
    blogLinks: [
      { title: 'Torrevieja Property Guide', slug: 'torrevieja-property-guide' },
    ],
    seoKeywords: [
      'Los Naufragos beach apartments', 'Torrevieja harbor property', 'Marina Salinas living',
      'Torrevieja port area', 'beachfront property Los Naufragos', 'Torrevieja marina apartments',
    ],
  },
  {
    id: 'la-mata',
    name: 'La Mata',
    subtitle: 'Two kilometers of natural beach, flamingos at sunrise, and authentic village charm',
    description: [
      'La Mata is Torrevieja\'s hidden gem. Located 5 kilometers north of the city center, this former fishing village has preserved its authentic Spanish character while attracting a growing international community. The star attraction is the beach: over 2 kilometers of wide, golden sand backed by natural dunes — one of the few undeveloped stretches of coastline left on the Costa Blanca.',
      'What makes La Mata truly special is the Laguna de La Mata, a protected salt lake that is home to flamingos, herons, and hundreds of bird species. The Parque Natural de las Lagunas de La Mata y Torrevieja offers marked walking and cycling trails around the lagoon, with the surreal sight of pink flamingos just minutes from your front door. The therapeutic properties of the salt lake mud have attracted visitors for centuries.',
      'The village itself centers around the Plaza de la Iglesia, where you will find traditional tapas bars, a Saturday morning market, and a genuine sense of community. La Mata has its own schools, pharmacies, supermarkets, and medical center. New build developments like Molino Blanco and the Moncayo area offer modern apartments and bungalows at prices significantly below the city center, while still delivering the beach lifestyle buyers are looking for.',
    ],
    stats: {
      avgPrice: '€95,000–€195,000',
      distanceToBeach: '0–800m',
      character: 'Natural & authentic',
    },
    highlights: [
      'Over 2km of natural sandy beach backed by dunes — the Costa Blanca\'s best',
      'Laguna de La Mata natural park with flamingos and walking trails',
      'Authentic Spanish village atmosphere with traditional tapas bars',
      'Parque Aromatico — aromatic herb garden and community park',
      'Significantly lower property prices than Torrevieja center',
      'Active local community with year-round events and fiestas',
      'Marked cycling and hiking trails around the salt lagoon',
    ],
    amenities: [
      { name: 'Playa de La Mata', distance: '0–500m', type: 'beach' },
      { name: 'Laguna de La Mata', distance: '800m', type: 'park' },
      { name: 'La Mata town square', distance: '300m', type: 'dining' },
      { name: 'Consum supermarket', distance: '200m', type: 'shopping' },
      { name: 'Medical center', distance: '400m', type: 'healthcare' },
      { name: 'Parque Aromatico', distance: '500m', type: 'park' },
      { name: 'CEIP La Mata school', distance: '600m', type: 'school' },
      { name: 'Parque Molino de Agua', distance: '700m', type: 'park' },
    ],
    propertyTypes: ['Apartments', 'Bungalows', 'Townhouses', 'New build developments'],
    priceRange: '€69,000–€250,000',
    propertyLink: '/developments?town=torrevieja',
    blogLinks: [
      { title: 'Torrevieja Property Guide', slug: 'torrevieja-property-guide' },
      { title: 'Best Beaches Costa Blanca', slug: 'best-beaches-costa-blanca-south' },
    ],
    seoKeywords: [
      'La Mata beach property', 'La Mata Torrevieja apartments', 'natural beach Costa Blanca',
      'flamingos La Mata salt lake', 'La Mata village Spain', 'affordable beach property Torrevieja',
      'Laguna de La Mata', 'La Mata new build',
    ],
  },
  {
    id: 'los-balcones',
    name: 'Los Balcones & Los Altos',
    subtitle: 'Elevated living with panoramic sea views and a thriving expat community',
    description: [
      'Los Balcones and Los Altos are the elevated residential neighborhoods south of Torrevieja that have become the most popular choice for British, Scandinavian, and Northern European buyers. Sitting on a gentle hillside 3-4 kilometers from the coast, these areas offer something the beachfront does not: panoramic views stretching from the salt lakes to the Mediterranean, more space, community pools, and a relaxed suburban feel.',
      'The neighborhoods are built around a series of urbanizations — each with their own communal swimming pools, gardens, and social scene. Dream Hills, Los Altos del Edén, and Los Balcones itself are among the best known. You will find English-language bars, international restaurants, and a social calendar packed with quiz nights, charity events, and sports clubs. This is where the expat community is strongest.',
      'New build development in this area focuses on modern townhouses and villas with private pools, many delivering sea views from roof solariums. The La Zenia Boulevard shopping center is just a 10-minute drive, and the beaches of Torrevieja and Orihuela Costa are equally accessible. For buyers who want community, space, and value without sacrificing beach proximity, Los Balcones and Los Altos are hard to beat.',
    ],
    stats: {
      avgPrice: '€130,000–€280,000',
      distanceToBeach: '2–4km',
      character: 'Expat community',
    },
    highlights: [
      'Panoramic sea and salt lake views from elevated hillside position',
      'Thriving international expat community with social clubs and events',
      'Community pools and gardens in every urbanization',
      'Dream Hills — one of the most popular expat urbanizations in Spain',
      'New build villas and townhouses with private pools',
      'Equidistant to Torrevieja center and Orihuela Costa beaches',
    ],
    amenities: [
      { name: 'Torrevieja beaches', distance: '3km', type: 'beach' },
      { name: 'La Zenia Boulevard', distance: '6km', type: 'shopping' },
      { name: 'Community pools (per urbanization)', distance: '0m', type: 'sport' },
      { name: 'International restaurants & bars', distance: '200m', type: 'dining' },
      { name: 'Hospital de Torrevieja', distance: '4km', type: 'healthcare' },
      { name: 'Carrefour supermarket', distance: '2km', type: 'shopping' },
    ],
    propertyTypes: ['Villas', 'Townhouses', 'Bungalows', 'Apartments with solarium'],
    priceRange: '€89,000–€450,000',
    propertyLink: '/developments?town=torrevieja',
    blogLinks: [
      { title: 'Torrevieja Property Guide', slug: 'torrevieja-property-guide' },
      { title: 'British Buyers Guide', slug: 'british-buyers-brexit-guide' },
    ],
    seoKeywords: [
      'Los Balcones property', 'Los Altos Torrevieja', 'Dream Hills Torrevieja',
      'expat community Torrevieja', 'sea view villa Torrevieja', 'Los Balcones apartments',
      'new build Los Altos', 'Torrevieja hillside property',
    ],
  },
  {
    id: 'torretas',
    name: 'Torretas & Aguas Nuevas',
    subtitle: 'Genuine Spanish neighborhoods with local flavor and excellent value',
    description: [
      'If you want to live like a local, Torretas and Aguas Nuevas deliver the most authentic Spanish living experience in Torrevieja. These residential neighborhoods west of the city center are where Spanish families have lived for generations. Tree-lined avenues, neighborhood bakeries, local tapas bars where menus are in Spanish only, and a pace of life that revolves around family, food, and fiestas.',
      'The Torretas area is divided into several sub-neighborhoods (Torreta I through V, plus Torreta Florida), each with its own small commercial center and community feel. Aguas Nuevas, immediately west, is one of Torrevieja\'s fastest-growing residential areas with significant new build activity. Modern apartment complexes here offer underground parking, communal pools, and high energy ratings at prices 30-40% below the beachfront.',
      'Both neighborhoods sit just 2-3 kilometers from the city center and the coast, with excellent bus connections. The Torrevieja sports complex and Friday market are within walking distance. For buyers who prioritize value, integration with Spanish culture, and a genuine neighborhood feel over tourist infrastructure, Torretas and Aguas Nuevas are the smart choice.',
    ],
    stats: {
      avgPrice: '€85,000–€170,000',
      distanceToBeach: '2–3km',
      character: 'Authentic Spanish',
    },
    highlights: [
      'Most affordable zone in Torrevieja with genuine value for money',
      'Authentic Spanish neighborhood atmosphere and local culture',
      'Torreta Florida — parkland urbanization with green spaces',
      'Close to Torrevieja sports complex and Friday market area',
      'Significant new build development with modern specifications',
      'Excellent bus connections to beaches and city center',
      'Lower community fees than coastal urbanizations',
    ],
    amenities: [
      { name: 'Torrevieja city beaches', distance: '2.5km', type: 'beach' },
      { name: 'Friday market & sports center', distance: '800m', type: 'shopping' },
      { name: 'Local tapas bars', distance: '100m', type: 'dining' },
      { name: 'Consum / Mercadona', distance: '300m', type: 'shopping' },
      { name: 'Hospital de Torrevieja', distance: '2km', type: 'healthcare' },
      { name: 'Municipal sports complex', distance: '1km', type: 'sport' },
      { name: 'CEIP schools', distance: '500m', type: 'school' },
    ],
    propertyTypes: ['Apartments', 'Ground floor with garden', 'New build complexes'],
    priceRange: '€65,000–€220,000',
    propertyLink: '/developments?town=torrevieja',
    blogLinks: [
      { title: 'Cost of Living in Spain', slug: 'cost-of-living-spain-2026' },
      { title: 'Torrevieja Property Guide', slug: 'torrevieja-property-guide' },
    ],
    seoKeywords: [
      'Torretas Torrevieja property', 'Aguas Nuevas apartments', 'affordable Torrevieja homes',
      'Spanish neighborhood Torrevieja', 'Torreta Florida', 'cheap property Torrevieja',
      'new build Aguas Nuevas', 'local living Torrevieja',
    ],
  },
  {
    id: 'cabo-cervera',
    name: 'Cabo Cervera & Playa Los Locos',
    subtitle: 'Dramatic cliffs, hidden coves, and the most stunning coastline in Torrevieja',
    description: [
      'Cabo Cervera is where Torrevieja shows its wild side. This rocky headland south of the city center delivers the most dramatic coastal scenery on the southern Costa Blanca — jagged cliffs dropping into turquoise water, hidden coves accessible only by foot, and the historic Torre del Moro watchtower standing guard over the Mediterranean. Playa Los Locos, nestled between the rocks, is a Blue Flag beach loved by locals for its crystal-clear water and sheltered position.',
      'The residential area behind the coast is a mix of established low-rise apartments and premium new builds. Properties closest to Cabo Cervera command the highest prices in Torrevieja outside the beachfront — and for good reason. Waking up to views of the rocky coastline, walking down to Playa Los Locos for a morning swim, and watching the sunset from Torre del Moro is a daily routine that most people only experience on holiday.',
      'This zone also includes Calas Blancas and the natural swimming pools carved into the rock by centuries of waves. The coastal walking path from Playa Los Locos to La Mata is one of the most scenic walks in the Alicante province. For buyers seeking natural beauty, premium coastal living, and a quieter alternative to the city center, Cabo Cervera is the finest address in Torrevieja.',
    ],
    stats: {
      avgPrice: '€150,000–€320,000',
      distanceToBeach: '0–500m',
      character: 'Premium coastal',
    },
    highlights: [
      'Playa Los Locos — Blue Flag beach with crystal-clear water and rock coves',
      'Torre del Moro — historic 14th-century watchtower with panoramic views',
      'Calas Blancas natural rock swimming pools',
      'Most dramatic cliff coastline on the southern Costa Blanca',
      'Scenic coastal walking path extending north and south',
      'Premium new build developments with uninterrupted sea views',
      'Quieter, more exclusive atmosphere than the city center',
    ],
    amenities: [
      { name: 'Playa Los Locos', distance: '0–300m', type: 'beach' },
      { name: 'Torre del Moro viewpoint', distance: '500m', type: 'park' },
      { name: 'Calas Blancas coves', distance: '400m', type: 'beach' },
      { name: 'Torrevieja center', distance: '2km', type: 'shopping' },
      { name: 'Coastal walking path', distance: '0m', type: 'sport' },
      { name: 'Hospital de Torrevieja', distance: '3km', type: 'healthcare' },
    ],
    propertyTypes: ['Sea-view apartments', 'Villas', 'Premium penthouses'],
    priceRange: '€110,000–€500,000',
    propertyLink: '/developments?town=torrevieja',
    blogLinks: [
      { title: 'Best Beaches Costa Blanca', slug: 'best-beaches-costa-blanca-south' },
      { title: 'Torrevieja Property Guide', slug: 'torrevieja-property-guide' },
    ],
    seoKeywords: [
      'Cabo Cervera property', 'Playa Los Locos apartments', 'Torre del Moro Torrevieja',
      'sea view property Torrevieja', 'premium coastal Torrevieja', 'cliff apartment Costa Blanca',
      'Calas Blancas Torrevieja', 'luxury beachfront Torrevieja',
    ],
  },
  {
    id: 'la-siesta',
    name: 'La Siesta & El Limonar',
    subtitle: 'Family-friendly neighborhoods with the best value in greater Torrevieja',
    description: [
      'La Siesta and El Limonar are the practical choice for families and budget-conscious buyers who want the Torrevieja lifestyle at the lowest entry price. Located 3-4 kilometers southwest of the city center, these established residential neighborhoods have grown significantly over the past two decades, evolving from quiet urbanizations into fully serviced communities with their own schools, supermarkets, and medical facilities.',
      'La Siesta is the larger of the two, centered around a commercial area with a Mercadona supermarket, pharmacies, banks, and a mix of Spanish and international restaurants. The Rosaleda urbanization within La Siesta is particularly popular with Northern European buyers, offering community pools, landscaped gardens, and a friendly social scene. El Limonar, adjacent to the north, is quieter and more residential.',
      'Property prices here represent the best value in Torrevieja municipality. A modern 2-bedroom apartment with a communal pool can be found from €70,000-€90,000, and new build developments are pushing modern specifications at prices that seem impossible to buyers coming from Northern Europe. The trade-off is distance to the beach — you are 15-20 minutes on foot or a quick bus ride — but for many buyers, the savings and space make it worthwhile.',
    ],
    stats: {
      avgPrice: '€75,000–€150,000',
      distanceToBeach: '3–4km',
      character: 'Family & value',
    },
    highlights: [
      'Lowest property prices in the Torrevieja municipality',
      'Full community infrastructure — shops, schools, medical center',
      'Rosaleda urbanization with pool, gardens, and social community',
      'Mercadona, Consum, and local shops within walking distance',
      'Regular bus service to Torrevieja center and beaches',
      'Family-friendly with parks and playgrounds',
      'Strong rental yields due to affordable entry prices',
    ],
    amenities: [
      { name: 'Torrevieja beaches', distance: '3.5km', type: 'beach' },
      { name: 'Mercadona La Siesta', distance: '200m', type: 'shopping' },
      { name: 'La Siesta medical center', distance: '300m', type: 'healthcare' },
      { name: 'Community pools (Rosaleda)', distance: '0m', type: 'sport' },
      { name: 'CEIP La Siesta school', distance: '400m', type: 'school' },
      { name: 'Local restaurants & bars', distance: '100m', type: 'dining' },
      { name: 'Bus stop to center', distance: '200m', type: 'transport' },
    ],
    propertyTypes: ['Apartments', 'Bungalows', 'Townhouses', 'Ground floor with garden'],
    priceRange: '€55,000–€180,000',
    propertyLink: '/developments?town=torrevieja',
    blogLinks: [
      { title: 'Torrevieja Property Guide', slug: 'torrevieja-property-guide' },
      { title: 'Investment Property Spain', slug: 'property-investment-spain-guide' },
    ],
    seoKeywords: [
      'La Siesta Torrevieja property', 'El Limonar apartments', 'cheap property Torrevieja',
      'affordable homes Costa Blanca', 'Rosaleda Torrevieja', 'family property Torrevieja',
      'budget apartment Torrevieja', 'investment property Torrevieja',
    ],
  },
];

// FAQ data for schema markup and FAQ section
export const torreviejaFaqs = [
  {
    question: 'Is Torrevieja a good place to buy property in 2026?',
    answer: 'Torrevieja offers some of the best value on the Costa Blanca with property prices 30-50% below Alicante city and the northern Costa Blanca. With 80,000+ residents, over 10 beaches, an international hospital, year-round sunshine (320+ days), and excellent transport links to Alicante-Elche airport (40 minutes), it combines affordability with a complete infrastructure that few Spanish coastal cities can match.',
  },
  {
    question: 'What is the average property price in Torrevieja?',
    answer: 'Property prices in Torrevieja range from €55,000 for a studio apartment in La Siesta to €500,000+ for a premium sea-view villa near Cabo Cervera. The average apartment price is around €120,000-€150,000. New build properties with communal pools and modern energy ratings typically start from €130,000 for a 2-bedroom apartment.',
  },
  {
    question: 'Which area of Torrevieja is best for expats?',
    answer: 'Los Balcones and Los Altos are the most popular with British and Northern European expats, offering established communities, English-speaking social clubs, and community pool urbanizations. La Mata attracts expats who prefer a more authentic Spanish atmosphere, while Centro is ideal for those who want walkability and beach proximity above all.',
  },
  {
    question: 'How far is Torrevieja from the airport?',
    answer: 'Alicante-Elche Airport (ALC) is 40 minutes by car (55km) via the AP-7 motorway. Murcia-Corvera Airport (RMU) is 30 minutes (35km). Both airports have direct flights to most European capitals year-round, with additional routes in summer.',
  },
  {
    question: 'Is Torrevieja good for retirement?',
    answer: 'Torrevieja is one of Spain\'s top retirement destinations. The World Health Organization has recognized it as having one of the healthiest microclimates in Europe thanks to the salt lakes. The Hospital de Torrevieja is one of the best-equipped in the Valencia region, and the city has a large international community with clubs, activities, and services in multiple languages.',
  },
  {
    question: 'What are the best beaches in Torrevieja?',
    answer: 'Torrevieja has over 10 beaches. The most popular are Playa del Cura (city center, Blue Flag), Playa de Los Naufragos (family-friendly, Blue Flag), Playa de La Mata (2km natural beach), and Playa Los Locos (crystal-clear coves). Cabo Cervera and Calas Blancas offer dramatic rocky coastline with natural swimming pools.',
  },
  {
    question: 'What is the cost of living in Torrevieja?',
    answer: 'Torrevieja is one of the most affordable cities on the Costa Blanca. Monthly costs for a couple: rent €500-€800, utilities €80-€120, groceries €300-€400, dining out €200-€300, health insurance €100-€150 per person. Total monthly costs range from €1,200-€1,800 excluding rent, making it significantly cheaper than northern Costa Blanca or major Spanish cities.',
  },
  {
    question: 'Does Torrevieja have good healthcare?',
    answer: 'Yes. Hospital de Torrevieja is a modern, fully equipped hospital serving the southern Costa Blanca. It has emergency services, specialist departments, and treats both public and private patients. There are also numerous private clinics and dental practices, many with English-speaking staff.',
  },
  {
    question: 'What is the weather like in Torrevieja?',
    answer: 'Torrevieja enjoys 320+ sunny days per year with an average temperature of 20°C. Summer highs reach 30-34°C with sea breezes, and winter temperatures rarely drop below 10°C. The salt lakes create a unique microclimate that keeps humidity comfortable year-round. Rainfall is minimal, averaging just 270mm per year.',
  },
  {
    question: 'Can I rent out my property in Torrevieja?',
    answer: 'Yes. Torrevieja allows tourist rental with a valid VT license (Vivienda Turistica). Rental yields in popular areas average 5-8% gross. Summer weeks can command €600-€1,200 per week for a 2-bedroom apartment. Long-term rental demand is also strong, with year-round tenants seeking affordable Mediterranean living.',
  },
  {
    question: 'Is Torrevieja safe?',
    answer: 'Torrevieja is generally considered safe by Spanish standards. Like any city of 80,000+ people, basic precautions apply — especially in crowded tourist areas in summer. The expat community is well-established and neighborhoods like Los Balcones, La Mata, and La Siesta are quiet, family-oriented areas with low crime rates.',
  },
  {
    question: 'What is the salt lake in Torrevieja?',
    answer: 'The Lagunas de La Mata y Torrevieja are two connected salt lakes forming a natural park. The larger Laguna de Torrevieja turns pink due to a rare algae, while Laguna de La Mata is home to flamingos and other wetland birds. The salt has been harvested since Roman times and the therapeutic mud attracts health tourism visitors.',
  },
  {
    question: 'How do I get around Torrevieja without a car?',
    answer: 'Torrevieja has a reliable local bus network connecting all neighborhoods to the city center and beaches. The center itself is walkable. Inter-city buses connect to Alicante, Murcia, Orihuela Costa, and the airports. Many expats use electric bikes for daily errands. A car is helpful for exploring the wider region but not essential for daily life.',
  },
  {
    question: 'Are there international schools near Torrevieja?',
    answer: 'Yes. Several international schools serve the Torrevieja area: El Limonar International School (British curriculum, 5km), Colegio Internacional Costa Blanca, and options in nearby Orihuela Costa and San Miguel de Salinas. Spanish public schools also welcome international children with integration support programs.',
  },
  {
    question: 'What are the buying costs for property in Torrevieja?',
    answer: 'For new build properties: 10% IVA (VAT) + 1.5% stamp duty (AJD) + approximately 1-2% for notary, registry, and legal fees. Total buying costs are typically 13-14% on top of the purchase price. Budget €15,000-€20,000 in costs for a €130,000 property.',
  },
];

// Cost of living data for the practical info section
export const costOfLiving = [
  { category: 'Rent (2-bed apartment)', cost: '€500–€800/month', notes: 'Higher in Centro, lower in La Siesta' },
  { category: 'Utilities (electricity, water, gas)', cost: '€80–€120/month', notes: 'Air conditioning adds €30-50 in summer' },
  { category: 'Groceries', cost: '€300–€400/month', notes: 'Mercadona, Consum, Aldi available' },
  { category: 'Dining out', cost: '€8–€15/meal', notes: 'Menu del dia lunch €10-€12 average' },
  { category: 'Private health insurance', cost: '€50–€150/month', notes: 'Per person, age-dependent' },
  { category: 'Community fees (apartment)', cost: '€40–€80/month', notes: 'Includes pool maintenance' },
  { category: 'IBI property tax', cost: '€200–€500/year', notes: 'Based on cadastral value' },
  { category: 'Home insurance', cost: '€150–€300/year', notes: 'Contents and building' },
  { category: 'Internet + mobile', cost: '€30–€50/month', notes: 'Fibre available in most areas' },
  { category: 'Public transport', cost: '€1.45/trip', notes: 'Local bus, discounts with TAM card' },
];

// Beach data for the carousel
export const torreviejaBeaches = [
  { name: 'Playa del Cura', zone: 'centro', blueFlag: true, character: 'City center beach, palm-lined promenade', length: '375m' },
  { name: 'Playa de Los Naufragos', zone: 'naufragos', blueFlag: true, character: 'Family beach, gentle waves, golden sand', length: '325m' },
  { name: 'Playa de La Mata', zone: 'la-mata', blueFlag: true, character: 'Natural dune beach, 2km of untouched coast', length: '2,100m' },
  { name: 'Playa Los Locos', zone: 'cabo-cervera', blueFlag: true, character: 'Crystal coves between dramatic rocks', length: '160m' },
  { name: 'Playa del Acequion', zone: 'centro', blueFlag: true, character: 'Sheltered beach near the port', length: '350m' },
  { name: 'Cabo Cervera', zone: 'cabo-cervera', blueFlag: false, character: 'Rocky headland, natural pools, cliff walks', length: 'Rocky coast' },
  { name: 'Calas Blancas', zone: 'cabo-cervera', blueFlag: false, character: 'White rock coves, snorkeling paradise', length: 'Multiple coves' },
  { name: 'Cala Ferris', zone: 'cabo-cervera', blueFlag: false, character: 'Hidden cove south of Torrevieja', length: '100m' },
  { name: 'Azul Beach (La Mata)', zone: 'la-mata', blueFlag: false, character: 'Beach bar zone, social atmosphere', length: 'Part of La Mata' },
];
