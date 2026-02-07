// ISR: Regenerate pages every hour for fresh data
export const revalidate = 3600;

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getGolfCourseBySlug,
  getAllGolfSlugs,
  GOLF_COURSES,
  GolfCourse,
  getGolfCoursesByRegion,
} from '@/lib/golf-courses';
import { getDevelopmentsByGolfCourse } from '@/lib/development-service';
import LeadForm from '@/components/LeadForm';
import InteractiveAreaMap from '@/components/area/InteractiveAreaMap';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

// ============================================
// RICH LIFESTYLE DATA FOR EACH GOLF COURSE
// ============================================
interface GolfCourseLifestyle {
  heroImage: string;
  introduction: string;
  whyLiveHere: string[];
  lifestyle: {
    overview: string;
    dailyLife: string;
    community: string;
  };
  schools: Array<{
    name: string;
    type: string;
    distance: string;
    curriculum: string;
    fees: string;
    ages: string;
    url?: string;
    note: string;
  }>;
  healthcare: {
    hospital: { name: string; distance: string; description: string; googleMaps: string };
    healthCenter: { name: string; distance: string };
    pharmacies: string;
    privateOptions: string;
  };
  beaches: Array<{
    name: string;
    distance: string;
    description: string;
    googleMaps: string;
  }>;
  markets: Array<{
    name: string;
    day: string;
    time: string;
    distance: string;
    description: string;
    googleMaps: string;
  }>;
  events: Array<{
    name: string;
    when: string;
    description: string;
  }>;
  expat: {
    population: string;
    nationalities: string;
    socialHub: string;
    facebookGroups: string[];
    integration: string;
  };
  costOfLiving: Array<{
    category: string;
    cost: string;
    notes: string;
  }>;
  investment: {
    overview: string;
    priceGrowth: string;
    rentalYield: string;
    outlook: string;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  mapLocations: Array<{
    id: string;
    name: string;
    type: 'golf' | 'beach' | 'hospital' | 'airport' | 'shopping' | 'school' | 'market';
    coordinates: [number, number];
    distance: string;
    description: string;
    googleMapsLink?: string;
    internalLink?: string;
  }>;
}

// Lifestyle data for each golf course
const GOLF_LIFESTYLE_DATA: Record<string, GolfCourseLifestyle> = {
  'la-finca-golf': {
    heroImage: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1600&q=80',
    introduction: 'La Finca Golf Resort is more than just a golf course - it\'s a lifestyle. This thriving international community in Algorfa offers the perfect blend of quality golf, Spanish culture, and modern amenities. With a 4-star hotel on-site and excellent new build developments from quality builders, La Finca has become one of Costa Blanca\'s most sought-after golf destinations.',
    whyLiveHere: [
      '18-hole championship course designed by Pepe Gancedo',
      '4-star hotel with spa and restaurants on-site',
      '40% international residents - welcoming expat community',
      'Properties 30-40% cheaper than coastal resorts',
      '15 minutes to beautiful Guardamar beaches',
      'Excellent new build villas from €150,000'
    ],
    lifestyle: {
      overview: 'La Finca offers a relaxed yet social lifestyle centered around the golf club. The clubhouse serves as the community hub where neighbors become friends over breakfast after their morning round.',
      dailyLife: 'A typical day might start with early golf before the heat, followed by breakfast on the terrace. Afternoons could be spent at the pool, exploring nearby markets, or at the beach. Evenings bring socializing at the clubhouse or dining in Algorfa village.',
      community: 'The community is predominantly British, Scandinavian, and Belgian, with a welcoming atmosphere. Quiz nights, golf competitions, and social events make it easy to integrate. The golf club has active ladies\' and men\'s sections with regular competitions.',
    },
    schools: [
      { name: 'El Limonar International School', type: 'British International', distance: '20 min', curriculum: 'British (GCSE, A-Level)', fees: '€5,000-8,000/year', ages: '3-18', url: 'https://www.ellimonarinternational.com/', note: 'Most popular choice for expat families. Excellent results, strong community.' },
      { name: 'Kings College Alicante', type: 'British International', distance: '45 min', curriculum: 'British (IB available)', fees: '€8,000-12,000/year', ages: '2-18', url: 'https://alicante.kingscollegeschools.org/', note: 'Premium option with IB programme.' },
      { name: 'CEIP Virgen del Rosario', type: 'Spanish Public', distance: '5 min', curriculum: 'Spanish National', fees: 'Free', ages: '3-12', note: 'Local village school, great for Spanish immersion.' },
    ],
    healthcare: {
      hospital: { name: 'Hospital Universitario de Torrevieja', distance: '18 min', description: 'Full-service hospital with 24hr emergency, English-speaking staff available.', googleMaps: 'https://maps.google.com/?q=Hospital+de+Torrevieja' },
      healthCenter: { name: 'Centro de Salud Algorfa', distance: '5 min' },
      pharmacies: 'Pharmacies in Algorfa village and all nearby towns',
      privateOptions: 'Most expats use private insurance (Sanitas, Adeslas) - €80-150/month for comprehensive cover',
    },
    beaches: [
      { name: 'Playa de Guardamar', distance: '15 min', description: 'Beautiful dune-backed Blue Flag beach with crystal-clear water and pine forest for natural shade.', googleMaps: 'https://maps.google.com/?q=Playa+de+Guardamar+del+Segura' },
      { name: 'Playa de La Mata', distance: '20 min', description: 'Long natural beach with protected dunes. Less crowded, great for walks.', googleMaps: 'https://maps.google.com/?q=Playa+de+La+Mata+Torrevieja' },
      { name: 'Torrevieja Beaches', distance: '25 min', description: 'Urban beaches with promenade, restaurants, and full facilities.', googleMaps: 'https://maps.google.com/?q=Playa+del+Cura+Torrevieja' },
    ],
    markets: [
      { name: 'Rojales Sunday Market', day: 'Sunday', time: '9am - 2pm', distance: '10 min', description: 'Huge expat favorite! Hundreds of stalls selling everything. Great atmosphere, live music.', googleMaps: 'https://maps.google.com/?q=Mercadillo+Rojales+Sunday+Market' },
      { name: 'Guardamar Wednesday Market', day: 'Wednesday', time: '8am - 1pm', distance: '15 min', description: 'Traditional Spanish market with fresh produce and fish.', googleMaps: 'https://maps.google.com/?q=Mercado+Guardamar+del+Segura' },
      { name: 'Torrevieja Friday Market', day: 'Friday', time: '8am - 2pm', distance: '20 min', description: 'Large market near the seafront. Great for fresh fish and Spanish products.', googleMaps: 'https://maps.google.com/?q=Mercadillo+Torrevieja' },
    ],
    events: [
      { name: 'Algorfa Fiestas Patronales', when: 'Mid-August', description: 'Week-long village festival with street parties, music, fireworks, and traditional events. The whole village celebrates!' },
      { name: 'La Finca Golf Tournament Season', when: 'October - May', description: 'Regular competitions and social events at the golf club. Great way to meet the community.' },
      { name: 'Moors & Christians Festivals', when: 'Various dates', description: 'Spectacular costumed parades in nearby Orihuela and Guardamar.' },
      { name: 'Noche de San Juan', when: 'June 23rd', description: 'Beach bonfires at Guardamar and Torrevieja. All-night parties and fireworks!' },
    ],
    expat: {
      population: 'Approximately 40% international residents in La Finca area',
      nationalities: 'Predominantly British, Scandinavian (Norwegian, Swedish), Belgian, Dutch',
      socialHub: 'La Finca Golf clubhouse - quiz nights, competitions, social dinners',
      facebookGroups: ['La Finca Golf Community', 'Algorfa Expats', 'Vega Baja Expats'],
      integration: 'Easy through the golf club which is the social hub. English widely spoken. Village fiestas welcome everyone.',
    },
    costOfLiving: [
      { category: 'Property Tax (IBI)', cost: '€400 - €800/year', notes: 'Algorfa rates lower than coastal towns' },
      { category: 'Community Fees', cost: '€80 - €120/month', notes: 'Includes pool, gardens, security' },
      { category: 'Utilities (Electric/Water)', cost: '€100 - €200/month', notes: 'Higher in summer (AC)' },
      { category: 'Golf Membership', cost: '€1,500 - €3,000/year', notes: 'Significant discount vs green fees' },
      { category: 'Health Insurance', cost: '€80 - €150/month', notes: 'Private cover recommended' },
      { category: 'Weekly Shop (2 people)', cost: '€80 - €120', notes: '20-30% cheaper than UK' },
    ],
    investment: {
      overview: 'La Finca properties have outperformed the wider market with consistent demand from golf-focused buyers. Limited buildable land constrains supply while demand remains strong.',
      priceGrowth: '+42% over 5 years',
      rentalYield: '4-6% achievable',
      outlook: 'Expected 5-8% annual appreciation. New developments from Contrimar continue to sell well.',
    },
    faqs: [
      { question: 'Do I need to be a golf member to live at La Finca?', answer: 'No, golf membership is optional. Many residents don\'t play golf but enjoy the community, restaurants, and lifestyle. However, membership offers great value if you play regularly.' },
      { question: 'How far is La Finca from the beach?', answer: 'Guardamar beach is 15 minutes drive. Torrevieja beaches are 20-25 minutes. Most residents find this an acceptable trade-off for the value and lifestyle.' },
      { question: 'Is there public transport from La Finca?', answer: 'Limited. A car is essential for living at La Finca. Roads are excellent and parking is free. Most residents find this worthwhile for the peace and value.' },
      { question: 'What is the expat community like?', answer: 'Very welcoming! Around 40% international, mainly British and Scandinavian. The golf club is the social hub with regular events. Easy to make friends quickly.' },
      { question: 'Can I rent out my property?', answer: 'Yes, golf properties are popular rentals, especially September to June. Rental yields of 4-6% are achievable. Many owners use their property part-year and rent during other periods.' },
    ],
    mapLocations: [
      { id: 'la-finca', name: 'La Finca Golf', type: 'golf', coordinates: [38.0647, -0.7928], distance: 'Center', description: 'Championship 18-hole course', googleMapsLink: 'https://maps.google.com/?q=La+Finca+Golf+Resort+Algorfa' },
      { id: 'guardamar-beach', name: 'Playa de Guardamar', type: 'beach', coordinates: [38.0892, -0.6553], distance: '15 min', description: 'Blue Flag beach', googleMapsLink: 'https://maps.google.com/?q=Playa+de+Guardamar+del+Segura' },
      { id: 'hospital', name: 'Hospital Torrevieja', type: 'hospital', coordinates: [37.9780, -0.6847], distance: '18 min', description: '24hr emergency', googleMapsLink: 'https://maps.google.com/?q=Hospital+de+Torrevieja' },
      { id: 'airport', name: 'Alicante Airport', type: 'airport', coordinates: [38.2822, -0.5582], distance: '30 min', description: 'International flights', googleMapsLink: 'https://maps.google.com/?q=Alicante+Airport' },
      { id: 'zenia', name: 'Zenia Boulevard', type: 'shopping', coordinates: [37.9150, -0.7464], distance: '25 min', description: '150+ stores', googleMapsLink: 'https://maps.google.com/?q=Zenia+Boulevard' },
      { id: 'el-limonar', name: 'El Limonar School', type: 'school', coordinates: [37.9383, -0.7925], distance: '20 min', description: 'British curriculum', googleMapsLink: 'https://maps.google.com/?q=El+Limonar+International+School' },
    ],
  },

  // SERENA GOLF
  'serena-golf': {
    heroImage: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1600&q=80',
    introduction: 'Serena Golf has become the hottest new build destination in the Costa Cálida. Located near Los Alcázares on the Mar Menor, it combines links-style golf with beach access in under 10 minutes. Multiple quality builders are creating modern apartments and villas, making this the go-to location for buyers seeking value without compromising on lifestyle.',
    whyLiveHere: [
      '18-hole links-style course with sea breezes',
      'Mar Menor beaches just 10 minutes away',
      'Murcia region\'s best value new builds',
      '34+ properties available from €180,000',
      'Multiple quality builders (Grupo Vermell, AMAL)',
      'Year-round Mediterranean climate'
    ],
    lifestyle: {
      overview: 'Serena Golf offers a laid-back lifestyle combining golf and beach. The Mar Menor\'s warm, shallow waters are perfect for families, while Los Alcázares has a charming promenade with restaurants.',
      dailyLife: 'Morning golf followed by lunch at the clubhouse, then afternoon at the Mar Menor beaches. Evening tapas in Los Alcázares or Santiago de la Ribera. A perfect blend of active and relaxed living.',
      community: 'Growing international community, predominantly Spanish, British, and Nordic. Newer than established resorts, so you\'ll be part of building the community. Multiple developments creating a diverse neighborhood.',
    },
    schools: [
      { name: 'CEIP Santiago el Mayor', type: 'Spanish Public', distance: '10 min', curriculum: 'Spanish National', fees: 'Free', ages: '3-12', note: 'Local school in Los Alcázares.' },
      { name: 'King\'s College Murcia', type: 'British International', distance: '30 min', curriculum: 'British', fees: '€6,000-10,000/year', ages: '3-18', note: 'British curriculum in Murcia city.' },
      { name: 'IES Antonio Menárguez Costa', type: 'Spanish Public Secondary', distance: '10 min', curriculum: 'Spanish National', fees: 'Free', ages: '12-18', note: 'Secondary school in Los Alcázares.' },
    ],
    healthcare: {
      hospital: { name: 'Hospital General Universitario Los Arcos del Mar Menor', distance: '15 min', description: 'Modern hospital in San Javier with excellent facilities.', googleMaps: 'https://maps.google.com/?q=Hospital+Los+Arcos+Mar+Menor' },
      healthCenter: { name: 'Centro de Salud Los Alcázares', distance: '8 min' },
      pharmacies: 'Multiple pharmacies in Los Alcázares and San Javier',
      privateOptions: 'Private clinics in Murcia and Cartagena. Sanitas, Adeslas available.',
    },
    beaches: [
      { name: 'Los Alcázares Beach', distance: '8 min', description: 'Mar Menor beach with warm, calm waters. Perfect for families and water sports.', googleMaps: 'https://maps.google.com/?q=Playa+Los+Alcazares' },
      { name: 'Santiago de la Ribera', distance: '12 min', description: 'Beautiful promenade and shallow waters. Popular with families.', googleMaps: 'https://maps.google.com/?q=Santiago+de+la+Ribera+beach' },
      { name: 'La Manga Mediterranean', distance: '25 min', description: 'Mediterranean sea beaches with bigger waves and open water.', googleMaps: 'https://maps.google.com/?q=La+Manga+del+Mar+Menor+beaches' },
    ],
    markets: [
      { name: 'Los Alcázares Market', day: 'Tuesday & Saturday', time: '8am - 1pm', distance: '8 min', description: 'Traditional Spanish market with fresh produce, fish, and local products.', googleMaps: 'https://maps.google.com/?q=Mercado+Los+Alcazares' },
      { name: 'San Javier Market', day: 'Wednesday', time: '8am - 1pm', distance: '15 min', description: 'Larger market with good variety.', googleMaps: 'https://maps.google.com/?q=Mercado+San+Javier' },
    ],
    events: [
      { name: 'Los Alcázares Fiestas', when: 'August', description: 'Week of celebrations with concerts, fireworks, and traditional events.' },
      { name: 'Mar Menor Water Sports', when: 'Year-round', description: 'Kitesurfing, sailing, and paddle boarding events on the lagoon.' },
      { name: 'Semana Santa', when: 'March/April', description: 'Easter processions in Cartagena are among Spain\'s finest.' },
    ],
    expat: {
      population: 'Growing international community, estimated 25% expat',
      nationalities: 'Mix of Spanish, British, Nordic, and Eastern European',
      socialHub: 'Golf clubhouse and Los Alcázares promenade restaurants',
      facebookGroups: ['Mar Menor Expats', 'Murcia Region Property'],
      integration: 'Newer community so still forming. Great opportunity to be a founding member.',
    },
    costOfLiving: [
      { category: 'Property Tax (IBI)', cost: '€350 - €700/year', notes: 'Murcia region very competitive' },
      { category: 'Community Fees', cost: '€60 - €100/month', notes: 'New developments with modern facilities' },
      { category: 'Utilities', cost: '€80 - €180/month', notes: 'Good solar potential in this region' },
      { category: 'Weekly Shop', cost: '€70 - €100', notes: 'Mercadona, Lidl, local markets' },
    ],
    investment: {
      overview: 'Serena Golf is experiencing rapid growth with multiple new developments launching. The Mar Menor location offers unique dual appeal of golf and beach.',
      priceGrowth: '+35% over 5 years',
      rentalYield: '5-7% achievable',
      outlook: 'Strong growth expected as new developments complete and community matures.',
    },
    faqs: [
      { question: 'How warm is the Mar Menor?', answer: 'The Mar Menor is Europe\'s largest saltwater lagoon and is significantly warmer than the Mediterranean - often 5-7°C warmer. The shallow, calm waters are ideal for families.' },
      { question: 'Is Serena Golf good for beginners?', answer: 'Yes! The links-style course is accessible for all levels with wide fairways. Sea breezes add challenge for better players.' },
      { question: 'What are the flight connections?', answer: 'Murcia-Corvera airport is 20 minutes away with Ryanair flights to UK and Europe. Alicante is 50 minutes with more options.' },
    ],
    mapLocations: [
      { id: 'serena-golf', name: 'Serena Golf', type: 'golf', coordinates: [37.7456, -0.8456], distance: 'Center', description: 'Links-style course' },
      { id: 'los-alcazares', name: 'Los Alcázares Beach', type: 'beach', coordinates: [37.7389, -0.8522], distance: '8 min', description: 'Mar Menor beach' },
      { id: 'hospital', name: 'Hospital Los Arcos', type: 'hospital', coordinates: [37.7923, -0.8367], distance: '15 min', description: 'Modern hospital' },
    ],
  },

  // VISTABELLA GOLF
  'vistabella-golf': {
    heroImage: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1600&q=80',
    introduction: 'Vistabella Golf is a championship course designed by Ryder Cup legend Manuel Piñero, set against a stunning mountain backdrop. This growing resort offers new build developments at excellent value, combining quality golf with the peaceful inland lifestyle of Costa Blanca South.',
    whyLiveHere: [
      'Championship course by Ryder Cup captain Manuel Piñero',
      'Stunning mountain views from course and homes',
      'New developments with modern Spanish design',
      '30-40% cheaper than coastal golf resorts',
      '20 minutes to Guardamar and Torrevieja beaches',
      'Growing international community'
    ],
    lifestyle: {
      overview: 'Vistabella offers a relaxed resort lifestyle in a beautiful mountain setting. The course is the social hub, with a friendly mix of residents and visitors creating an inclusive atmosphere.',
      dailyLife: 'Morning golf with mountain views, lunch on the clubhouse terrace, afternoon by the pool or exploring local villages. Evenings bring socializing at the club or tapas in nearby Quesada.',
      community: 'A growing international community with British, Scandinavian, and Dutch residents. The golf club runs regular competitions and social events, making it easy to integrate.',
    },
    schools: [
      { name: 'El Limonar International School', type: 'British International', distance: '25 min', curriculum: 'British (GCSE, A-Level)', fees: '€5,000-8,000/year', ages: '3-18', url: 'https://www.ellimonarinternational.com/', note: 'Most popular for expat families in the region.' },
      { name: 'CEIP Virgen del Rosario', type: 'Spanish Public', distance: '10 min', curriculum: 'Spanish National', fees: 'Free', ages: '3-12', note: 'Local school in Algorfa, good for Spanish immersion.' },
      { name: 'IES Azud de Alfeitamí', type: 'Spanish Secondary', distance: '15 min', curriculum: 'Spanish National', fees: 'Free', ages: '12-18', note: 'Secondary school in Almoradí.' },
    ],
    healthcare: {
      hospital: { name: 'Hospital Universitario de Torrevieja', distance: '20 min', description: 'Full-service public hospital with 24hr emergency and English-speaking staff.', googleMaps: 'https://maps.google.com/?q=Hospital+de+Torrevieja' },
      healthCenter: { name: 'Centro de Salud Quesada', distance: '10 min' },
      pharmacies: 'Pharmacies in Quesada and all nearby towns',
      privateOptions: 'Most expats use private insurance - Sanitas, Adeslas clinics in Torrevieja',
    },
    beaches: [
      { name: 'Playa de Guardamar', distance: '20 min', description: 'Beautiful dune-backed Blue Flag beach with pine forest shade.', googleMaps: 'https://maps.google.com/?q=Playa+de+Guardamar+del+Segura' },
      { name: 'Torrevieja Beaches', distance: '25 min', description: 'Urban beaches with promenade, restaurants, and full facilities.', googleMaps: 'https://maps.google.com/?q=Playa+del+Cura+Torrevieja' },
      { name: 'La Zenia Beach', distance: '30 min', description: 'Popular beach near Zenia Boulevard shopping center.', googleMaps: 'https://maps.google.com/?q=Playa+La+Zenia' },
    ],
    markets: [
      { name: 'Quesada Street Market', day: 'Wednesday', time: '9am - 2pm', distance: '10 min', description: 'Good local market with fresh produce and household items.', googleMaps: 'https://maps.google.com/?q=Ciudad+Quesada+market' },
      { name: 'Rojales Sunday Market', day: 'Sunday', time: '9am - 2pm', distance: '15 min', description: 'Huge expat favorite with hundreds of stalls and live music.', googleMaps: 'https://maps.google.com/?q=Mercadillo+Rojales+Sunday+Market' },
      { name: 'Torrevieja Friday Market', day: 'Friday', time: '8am - 2pm', distance: '25 min', description: 'Large market near the seafront with excellent fresh fish.', googleMaps: 'https://maps.google.com/?q=Mercadillo+Torrevieja' },
    ],
    events: [
      { name: 'Vistabella Golf Championships', when: 'Year-round', description: 'Regular competitions at the club for all handicap levels.' },
      { name: 'Orihuela Medieval Market', when: 'February', description: 'Historic city transforms with medieval themed market and events.' },
      { name: 'Moors & Christians Orihuela', when: 'July', description: 'Spectacular costumed parades celebrating regional history.' },
      { name: 'San Juan Bonfires', when: 'June 23rd', description: 'Beach bonfires and all-night parties at Guardamar and Torrevieja.' },
    ],
    expat: {
      population: 'Approximately 30% international residents in Vistabella area',
      nationalities: 'British, Scandinavian (Norwegian, Swedish), Dutch, Belgian',
      socialHub: 'Vistabella Golf clubhouse and nearby Quesada restaurants',
      facebookGroups: ['Vistabella Golf Community', 'Quesada Expats', 'Vega Baja Living'],
      integration: 'The golf club is the social center. English widely spoken in the area.',
    },
    costOfLiving: [
      { category: 'Property Tax (IBI)', cost: '€400 - €800/year', notes: 'Orihuela municipality rates' },
      { category: 'Community Fees', cost: '€70 - €110/month', notes: 'Varies by development' },
      { category: 'Utilities', cost: '€100 - €200/month', notes: 'Higher in summer (AC)' },
      { category: 'Golf Membership', cost: '€1,200 - €2,500/year', notes: 'Great value vs green fees' },
      { category: 'Weekly Shop (2 people)', cost: '€80 - €120', notes: 'Similar to La Finca area' },
    ],
    investment: {
      overview: 'Vistabella is growing with new developments releasing regularly. The Piñero course design adds prestige while inland location keeps prices accessible.',
      priceGrowth: '+38% over 5 years',
      rentalYield: '4-6% achievable',
      outlook: 'Continued growth expected as resort matures. New phases bring fresh inventory.',
    },
    faqs: [
      { question: 'Who designed Vistabella Golf?', answer: 'The course was designed by Manuel Piñero, a Ryder Cup legend who captained the European team. His courses are known for being challenging but fair for all levels.' },
      { question: 'How far is Vistabella from the beach?', answer: 'Guardamar beach is about 20 minutes drive. Torrevieja beaches are 25 minutes. The trade-off is better value properties and a quieter lifestyle.' },
      { question: 'Is there a clubhouse at Vistabella?', answer: 'Yes, the modern clubhouse has a restaurant, bar, pro shop, and terrace with mountain views. It serves as the social hub for residents.' },
      { question: 'What new developments are at Vistabella?', answer: 'Several new developments are underway with apartments and villas. Contact us for the latest availability and launch information.' },
    ],
    mapLocations: [
      { id: 'vistabella', name: 'Vistabella Golf', type: 'golf', coordinates: [38.0234, -0.7856], distance: 'Center', description: 'Manuel Piñero design' },
      { id: 'guardamar-beach', name: 'Playa de Guardamar', type: 'beach', coordinates: [38.0892, -0.6553], distance: '20 min', description: 'Blue Flag beach' },
      { id: 'hospital', name: 'Hospital Torrevieja', type: 'hospital', coordinates: [37.9780, -0.6847], distance: '20 min', description: '24hr emergency' },
      { id: 'zenia', name: 'Zenia Boulevard', type: 'shopping', coordinates: [37.9150, -0.7464], distance: '25 min', description: '150+ stores' },
    ],
  },

  // HACIENDA DEL ÁLAMO
  'hacienda-del-alamo': {
    heroImage: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1600&q=80',
    introduction: 'Hacienda del Álamo is an expansive resort in the Murcia countryside offering a desert-style championship golf experience. Wide open spaces, mountain views, and excellent value make this resort popular with families and golfers seeking the Spanish lifestyle without the coastal crowds.',
    whyLiveHere: [
      '18-hole desert-style championship course',
      'Expansive resort with spacious properties',
      'Mountain backdrop and spectacular views',
      'Excellent value - significantly below coastal prices',
      'Full resort facilities: pools, spa, tennis',
      '30 minutes to beaches, 20 minutes to Cartagena'
    ],
    lifestyle: {
      overview: 'Hacienda del Álamo offers space and tranquility. The desert-style setting feels distinctly different from coastal resorts, with wide open views and a relaxed pace of life.',
      dailyLife: 'Golf in the cooler morning hours, followed by relaxation at the pools or spa. Afternoons might include exploring historic Cartagena or heading to Mazarrón beaches. A self-contained resort lifestyle with easy access to more.',
      community: 'Mix of permanent residents and holiday home owners. Mainly British and Spanish, with growing international interest. The resort facilities bring people together.',
    },
    schools: [
      { name: 'King\'s College Murcia', type: 'British International', distance: '35 min', curriculum: 'British (GCSE, A-Level)', fees: '€6,000-10,000/year', ages: '3-18', note: 'British curriculum school in Murcia city.' },
      { name: 'CEIP Fuente Álamo', type: 'Spanish Public', distance: '10 min', curriculum: 'Spanish National', fees: 'Free', ages: '3-12', note: 'Local village school.' },
      { name: 'IES Ricardo Ortega', type: 'Spanish Secondary', distance: '15 min', curriculum: 'Spanish National', fees: 'Free', ages: '12-18', note: 'Secondary school in Fuente Álamo.' },
    ],
    healthcare: {
      hospital: { name: 'Hospital Santa Lucía', distance: '25 min', description: 'Major hospital in Cartagena with full services and emergency care.', googleMaps: 'https://maps.google.com/?q=Hospital+Santa+Lucia+Cartagena' },
      healthCenter: { name: 'Centro de Salud Fuente Álamo', distance: '10 min' },
      pharmacies: 'Pharmacies in Fuente Álamo and nearby towns',
      privateOptions: 'Private clinics in Murcia and Cartagena. Sanitas, Adeslas available.',
    },
    beaches: [
      { name: 'Playas de Mazarrón', distance: '30 min', description: 'Beautiful cove beaches with clear water and traditional fishing village atmosphere.', googleMaps: 'https://maps.google.com/?q=Playa+Mazarron' },
      { name: 'Bolnuevo Beach', distance: '35 min', description: 'Stunning beach with unique eroded rock formations and crystal water.', googleMaps: 'https://maps.google.com/?q=Playa+Bolnuevo' },
      { name: 'La Manga', distance: '50 min', description: 'Famous strip with Mediterranean on one side, Mar Menor on other.', googleMaps: 'https://maps.google.com/?q=La+Manga+del+Mar+Menor' },
    ],
    markets: [
      { name: 'Fuente Álamo Market', day: 'Saturday', time: '8am - 1pm', distance: '10 min', description: 'Traditional Spanish market with local produce.', googleMaps: 'https://maps.google.com/?q=Fuente+Alamo+mercado' },
      { name: 'Cartagena Market Hall', day: 'Daily', time: '8am - 2pm', distance: '25 min', description: 'Indoor market hall with excellent fresh fish and meat.', googleMaps: 'https://maps.google.com/?q=Mercado+Santa+Florentina+Cartagena' },
      { name: 'Mazarrón Market', day: 'Saturday', time: '8am - 1pm', distance: '25 min', description: 'Coastal market with fresh seafood.', googleMaps: 'https://maps.google.com/?q=Mazarron+mercado' },
    ],
    events: [
      { name: 'Cartagena Semana Santa', when: 'March/April', description: 'Famous Easter processions - among the finest in Spain with Roman soldiers.' },
      { name: 'Carthagineses y Romanos', when: 'September', description: 'Spectacular 10-day festival recreating Carthaginian and Roman battles.' },
      { name: 'Hacienda Golf Events', when: 'Year-round', description: 'Regular competitions and social events at the club.' },
    ],
    expat: {
      population: 'Approximately 20% international residents on resort',
      nationalities: 'British, Spanish, Northern European',
      socialHub: 'Golf clubhouse and resort facilities',
      facebookGroups: ['Hacienda del Álamo Residents', 'Murcia Expats'],
      integration: 'Self-contained resort community with easy mixing through golf and facilities.',
    },
    costOfLiving: [
      { category: 'Property Tax (IBI)', cost: '€350 - €600/year', notes: 'Fuente Álamo has low rates' },
      { category: 'Community Fees', cost: '€80 - €140/month', notes: 'Includes resort facilities access' },
      { category: 'Utilities', cost: '€90 - €180/month', notes: 'Good solar potential' },
      { category: 'Golf Membership', cost: '€1,500 - €2,800/year', notes: 'Various options available' },
      { category: 'Weekly Shop', cost: '€70 - €100', notes: 'Cheaper than coastal areas' },
    ],
    investment: {
      overview: 'Hacienda del Álamo offers excellent value with spacious properties. The desert setting appeals to those seeking something different from typical Spanish golf.',
      priceGrowth: '+30% over 5 years',
      rentalYield: '4-5% achievable',
      outlook: 'Steady growth expected. Appeals to value-focused buyers seeking space.',
    },
    faqs: [
      { question: 'What makes Hacienda del Álamo different?', answer: 'It\'s a desert-style course - unique in this region. Wide open spaces, mountain views, and a more American feel than typical Spanish courses.' },
      { question: 'How far is Hacienda del Álamo from beaches?', answer: 'Mazarrón beaches are 30 minutes. The beautiful coves of this coast are worth the drive. Mar Menor is 40 minutes.' },
      { question: 'What facilities does the resort have?', answer: 'Multiple pools, spa, gym, tennis courts, paddle courts, clubhouse restaurant, and more. It\'s a self-contained community.' },
      { question: 'Is Cartagena worth visiting?', answer: 'Absolutely! A historic port city with Roman ruins, excellent restaurants, and a vibrant atmosphere. Only 20-25 minutes from the resort.' },
    ],
    mapLocations: [
      { id: 'hacienda', name: 'Hacienda del Álamo', type: 'golf', coordinates: [37.7234, -1.1345], distance: 'Center', description: 'Desert-style course' },
      { id: 'mazarron', name: 'Mazarrón Beach', type: 'beach', coordinates: [37.5614, -1.2614], distance: '30 min', description: 'Cove beaches' },
      { id: 'hospital', name: 'Hospital Santa Lucía', type: 'hospital', coordinates: [37.6012, -0.9834], distance: '25 min', description: 'Major hospital' },
      { id: 'cartagena', name: 'Cartagena', type: 'shopping', coordinates: [37.6057, -0.9860], distance: '25 min', description: 'Historic port city' },
    ],
  },

  // PERALEJA GOLF
  'peraleja-golf': {
    heroImage: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1600&q=80',
    introduction: 'Peraleja Golf Resort is a modern championship course with a rapidly growing residential community. Located near Sucina with easy access to both Mar Menor beaches and Murcia city, it offers the best of both worlds at competitive prices.',
    whyLiveHere: [
      '18-hole modern championship course',
      'Growing residential community',
      'New developments like Peralia Origenes',
      '15 minutes to Mar Menor beaches',
      '20 minutes to Murcia city',
      'Excellent value new builds'
    ],
    lifestyle: {
      overview: 'Peraleja offers a modern golf lifestyle in a developing community. You\'ll be part of building something new, with fresh developments and facilities.',
      dailyLife: 'Morning golf on the well-maintained course, afternoons at the pool or Mar Menor beaches nearby. Murcia city is close for shopping, dining, and culture.',
      community: 'A mix of Spanish and international residents in a growing community. The course brings people together, with regular competitions and social events.',
    },
    schools: [
      { name: 'King\'s College Murcia', type: 'British International', distance: '25 min', curriculum: 'British', fees: '€6,000-10,000/year', ages: '3-18', note: 'British curriculum in Murcia.' },
      { name: 'CEIP San José', type: 'Spanish Public', distance: '8 min', curriculum: 'Spanish National', fees: 'Free', ages: '3-12', note: 'Local school in Sucina.' },
      { name: 'IES Rambla de Nogalte', type: 'Spanish Secondary', distance: '15 min', curriculum: 'Spanish National', fees: 'Free', ages: '12-18', note: 'Secondary option in Torre Pacheco.' },
    ],
    healthcare: {
      hospital: { name: 'Hospital Los Arcos del Mar Menor', distance: '15 min', description: 'Modern hospital in San Javier with good facilities.', googleMaps: 'https://maps.google.com/?q=Hospital+Los+Arcos+Mar+Menor' },
      healthCenter: { name: 'Centro de Salud Sucina', distance: '5 min' },
      pharmacies: 'Pharmacies in Sucina and nearby towns',
      privateOptions: 'Private clinics in Murcia. Sanitas, Adeslas available.',
    },
    beaches: [
      { name: 'Los Alcázares Beach', distance: '15 min', description: 'Mar Menor beach with warm, calm waters perfect for families.', googleMaps: 'https://maps.google.com/?q=Playa+Los+Alcazares' },
      { name: 'Santiago de la Ribera', distance: '15 min', description: 'Beautiful promenade and family-friendly beach.', googleMaps: 'https://maps.google.com/?q=Santiago+de+la+Ribera+beach' },
      { name: 'La Manga Mediterranean', distance: '30 min', description: 'Mediterranean beaches with bigger waves.', googleMaps: 'https://maps.google.com/?q=La+Manga+beaches' },
    ],
    markets: [
      { name: 'Torre Pacheco Market', day: 'Wednesday', time: '8am - 1pm', distance: '10 min', description: 'Local market with fresh produce.', googleMaps: 'https://maps.google.com/?q=Mercado+Torre+Pacheco' },
      { name: 'Los Alcázares Market', day: 'Tuesday & Saturday', time: '8am - 1pm', distance: '15 min', description: 'Coastal market near the beach.', googleMaps: 'https://maps.google.com/?q=Mercado+Los+Alcazares' },
    ],
    events: [
      { name: 'Peraleja Golf Events', when: 'Year-round', description: 'Regular competitions and social events.' },
      { name: 'Torre Pacheco Fiestas', when: 'August', description: 'Local festivals with music and food.' },
      { name: 'Mar Menor Sailing Regattas', when: 'Various', description: 'Water sports events on the lagoon.' },
    ],
    expat: {
      population: 'Growing international community, approximately 25%',
      nationalities: 'Spanish, British, Scandinavian, Eastern European',
      socialHub: 'Golf clubhouse and resort facilities',
      facebookGroups: ['Peraleja Golf Community', 'Mar Menor Expats'],
      integration: 'Developing community - great opportunity to be part of growth.',
    },
    costOfLiving: [
      { category: 'Property Tax (IBI)', cost: '€350 - €650/year', notes: 'Torre Pacheco municipality' },
      { category: 'Community Fees', cost: '€60 - €100/month', notes: 'New developments have modern fees' },
      { category: 'Utilities', cost: '€80 - €170/month', notes: 'Good solar options' },
      { category: 'Weekly Shop', cost: '€70 - €100', notes: 'Mercadona, Lidl nearby' },
    ],
    investment: {
      overview: 'Peraleja is developing rapidly with new releases like Peralia Origenes. Early buyers benefit from growth as community matures.',
      priceGrowth: '+32% over 5 years',
      rentalYield: '5-6% achievable',
      outlook: 'Strong growth potential as developments complete and community grows.',
    },
    faqs: [
      { question: 'What developments are at Peraleja?', answer: 'Peralia Origenes is the latest development offering modern apartments and villas with golf views. Contact us for current availability.' },
      { question: 'How close is Peraleja to beaches?', answer: 'Mar Menor beaches at Los Alcázares are just 15 minutes. You get both golf and beach lifestyle easily.' },
      { question: 'What is the course like?', answer: 'Modern championship layout by European Golf Design. Well-maintained with challenging but fair holes for all levels.' },
    ],
    mapLocations: [
      { id: 'peraleja', name: 'Peraleja Golf', type: 'golf', coordinates: [37.8123, -0.9567], distance: 'Center', description: 'Modern course' },
      { id: 'los-alcazares', name: 'Los Alcázares', type: 'beach', coordinates: [37.7389, -0.8522], distance: '15 min', description: 'Mar Menor beach' },
      { id: 'hospital', name: 'Hospital Los Arcos', type: 'hospital', coordinates: [37.7923, -0.8367], distance: '15 min', description: 'Modern hospital' },
    ],
  },

  // ALTORREAL GOLF
  'altorreal-golf': {
    heroImage: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1600&q=80',
    introduction: 'Altorreal Golf Club is an established parkland course in the hills near Murcia city, featuring mature trees and championship conditioning. Taylor Wimpey España\'s luxury Allure development brings prestige living to this exclusive setting.',
    whyLiveHere: [
      'Established 1995 parkland course by Dave Thomas',
      'Mature landscaping with established trees',
      'Prestigious location near Murcia city',
      'Taylor Wimpey Allure luxury development',
      '15 minutes to Murcia city center',
      'Quiet, exclusive residential atmosphere'
    ],
    lifestyle: {
      overview: 'Altorreal offers a more exclusive, established lifestyle. Mature gardens, quiet streets, and a quality course attract discerning buyers.',
      dailyLife: 'Morning golf on the immaculate parkland course, lunch at the traditional clubhouse. Murcia city offers world-class tapas, culture, and shopping just 15 minutes away.',
      community: 'A mix of affluent Spanish families and international residents. More established and quieter than newer resorts. Quality over quantity.',
    },
    schools: [
      { name: 'King\'s College Murcia', type: 'British International', distance: '20 min', curriculum: 'British', fees: '€6,000-10,000/year', ages: '3-18', note: 'Excellent British school in Murcia.' },
      { name: 'CEIP Maestro Francisco Martínez Bernal', type: 'Spanish Public', distance: '10 min', curriculum: 'Spanish National', fees: 'Free', ages: '3-12', note: 'Good local school in Molina.' },
      { name: 'International School of Murcia', type: 'International', distance: '20 min', curriculum: 'IB', fees: '€8,000-12,000/year', ages: '3-18', note: 'IB curriculum option.' },
    ],
    healthcare: {
      hospital: { name: 'Hospital Universitario Reina Sofía', distance: '15 min', description: 'Major university hospital in Murcia with all specialties.', googleMaps: 'https://maps.google.com/?q=Hospital+Reina+Sofia+Murcia' },
      healthCenter: { name: 'Centro de Salud Molina de Segura', distance: '10 min' },
      pharmacies: 'Multiple pharmacies in Molina de Segura',
      privateOptions: 'Excellent private clinics in Murcia city - Quirónsalud, Virgen de la Vega.',
    },
    beaches: [
      { name: 'Mar Menor Beaches', distance: '40 min', description: 'Warm lagoon beaches at Los Alcázares and San Javier.', googleMaps: 'https://maps.google.com/?q=Los+Alcazares+beach' },
      { name: 'Mazarrón Coves', distance: '45 min', description: 'Beautiful Mediterranean cove beaches.', googleMaps: 'https://maps.google.com/?q=Playa+Bolnuevo' },
      { name: 'La Manga', distance: '50 min', description: 'Famous strip with dual coastlines.', googleMaps: 'https://maps.google.com/?q=La+Manga+del+Mar+Menor' },
    ],
    markets: [
      { name: 'Murcia Central Market', day: 'Daily', time: '8am - 2pm', distance: '15 min', description: 'Historic market hall with exceptional produce.', googleMaps: 'https://maps.google.com/?q=Mercado+Verónicas+Murcia' },
      { name: 'Molina de Segura Market', day: 'Friday', time: '8am - 1pm', distance: '10 min', description: 'Good local market.', googleMaps: 'https://maps.google.com/?q=Mercado+Molina+de+Segura' },
    ],
    events: [
      { name: 'Murcia Bando de la Huerta', when: 'Spring', description: 'Famous festival celebrating regional culture with parade of traditional costumes.' },
      { name: 'Semana Santa Murcia', when: 'March/April', description: 'Renowned Easter processions with spectacular floats.' },
      { name: 'Altorreal Golf Championships', when: 'Year-round', description: 'Club competitions in a prestigious setting.' },
    ],
    expat: {
      population: 'Approximately 15% international, mostly established residents',
      nationalities: 'Spanish majority, British, German, Scandinavian',
      socialHub: 'Altorreal clubhouse and Murcia city dining scene',
      facebookGroups: ['Murcia Expats', 'Costa Cálida Living'],
      integration: 'More Spanish atmosphere than coastal resorts. Good Spanish helpful.',
    },
    costOfLiving: [
      { category: 'Property Tax (IBI)', cost: '€500 - €1,000/year', notes: 'Higher value properties' },
      { category: 'Community Fees', cost: '€100 - €180/month', notes: 'Premium developments' },
      { category: 'Utilities', cost: '€100 - €200/month', notes: 'Similar to city living' },
      { category: 'Golf Membership', cost: '€2,000 - €4,000/year', notes: 'Prestigious club' },
      { category: 'Dining out (Murcia)', cost: '€15-25/person', notes: 'Excellent value tapas' },
    ],
    investment: {
      overview: 'Altorreal attracts premium buyers. Taylor Wimpey\'s Allure development brings luxury specification to an established setting.',
      priceGrowth: '+35% over 5 years',
      rentalYield: '3-5% achievable',
      outlook: 'Stable appreciation in this prestigious location. Appeals to quality-focused buyers.',
    },
    faqs: [
      { question: 'What makes Altorreal different?', answer: 'It\'s an established 1995 course with mature trees and traditional clubhouse. More prestigious and quieter than newer coastal resorts.' },
      { question: 'Who is Taylor Wimpey Allure for?', answer: 'Discerning buyers seeking quality construction, premium specifications, and an exclusive setting near Murcia city.' },
      { question: 'How close is Murcia city?', answer: 'Just 15 minutes to the historic center. Murcia offers excellent gastronomy, culture, shopping, and medical facilities.' },
    ],
    mapLocations: [
      { id: 'altorreal', name: 'Altorreal Golf', type: 'golf', coordinates: [38.0712, -1.1234], distance: 'Center', description: 'Parkland course' },
      { id: 'murcia', name: 'Murcia City', type: 'shopping', coordinates: [37.9922, -1.1307], distance: '15 min', description: 'Regional capital' },
      { id: 'hospital', name: 'Hospital Reina Sofía', type: 'hospital', coordinates: [37.9878, -1.1234], distance: '15 min', description: 'University hospital' },
    ],
  },

  // RODA GOLF
  'roda-golf': {
    heroImage: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1600&q=80',
    introduction: 'Roda Golf & Beach Resort perfectly combines quality golf with proximity to the Mar Menor beaches. Just minutes from the warm lagoon waters, this resort offers the best of both worlds - play golf in the morning, swim in the afternoon.',
    whyLiveHere: [
      'Championship Dave Thomas course',
      'Mar Menor beaches 5 minutes away',
      'Water features throughout the course',
      'Beach club lifestyle with golf',
      'San Javier airport 15 minutes',
      'Family-friendly atmosphere'
    ],
    lifestyle: {
      overview: 'Roda Golf is about lifestyle flexibility - golf one day, beach the next, or both in the same day. The Mar Menor\'s warm, calm waters are perfect for families.',
      dailyLife: 'Morning golf with water hazard challenges, lunch at the clubhouse, afternoon on the Mar Menor beaches or trying water sports. The combination is unbeatable.',
      community: 'Active mix of golfers and beach lovers. Families appreciate the water sports options on the Mar Menor. International with Spanish, British, and Nordic residents.',
    },
    schools: [
      { name: 'CEIP Santiago el Mayor', type: 'Spanish Public', distance: '10 min', curriculum: 'Spanish National', fees: 'Free', ages: '3-12', note: 'Local school in San Javier.' },
      { name: 'King\'s College Murcia', type: 'British International', distance: '35 min', curriculum: 'British', fees: '€6,000-10,000/year', ages: '3-18', note: 'British curriculum school.' },
      { name: 'IES Mar Menor', type: 'Spanish Secondary', distance: '10 min', curriculum: 'Spanish National', fees: 'Free', ages: '12-18', note: 'Secondary school in San Javier.' },
    ],
    healthcare: {
      hospital: { name: 'Hospital Los Arcos del Mar Menor', distance: '10 min', description: 'Modern hospital in San Javier.', googleMaps: 'https://maps.google.com/?q=Hospital+Los+Arcos+Mar+Menor' },
      healthCenter: { name: 'Centro de Salud San Javier', distance: '8 min' },
      pharmacies: 'Multiple pharmacies in San Javier and Santiago de la Ribera',
      privateOptions: 'Private clinics available in the area.',
    },
    beaches: [
      { name: 'Santiago de la Ribera', distance: '5 min', description: 'Beautiful Mar Menor beach with promenade and restaurants.', googleMaps: 'https://maps.google.com/?q=Santiago+de+la+Ribera+beach' },
      { name: 'Los Alcázares Beach', distance: '10 min', description: 'Warm Mar Menor waters, perfect for families and water sports.', googleMaps: 'https://maps.google.com/?q=Playa+Los+Alcazares' },
      { name: 'La Manga Mediterranean', distance: '20 min', description: 'Open Mediterranean beaches.', googleMaps: 'https://maps.google.com/?q=La+Manga+beaches' },
    ],
    markets: [
      { name: 'San Javier Market', day: 'Wednesday', time: '8am - 1pm', distance: '10 min', description: 'Good local market.', googleMaps: 'https://maps.google.com/?q=Mercado+San+Javier' },
      { name: 'Los Alcázares Market', day: 'Tuesday & Saturday', time: '8am - 1pm', distance: '10 min', description: 'Coastal market with fresh fish.', googleMaps: 'https://maps.google.com/?q=Mercado+Los+Alcazares' },
    ],
    events: [
      { name: 'San Javier Jazz Festival', when: 'July', description: 'Renowned international jazz festival on the Mar Menor waterfront.' },
      { name: 'Semana Santa San Javier', when: 'March/April', description: 'Easter processions in the town.' },
      { name: 'Mar Menor Water Sports', when: 'Year-round', description: 'Kitesurfing, sailing, and paddle boarding on the lagoon.' },
    ],
    expat: {
      population: 'Approximately 30% international on the resort',
      nationalities: 'Spanish, British, Nordic, German',
      socialHub: 'Golf clubhouse and beach promenade at Santiago',
      facebookGroups: ['Mar Menor Expats', 'Roda Golf Community'],
      integration: 'Active community with golf and beach activities.',
    },
    costOfLiving: [
      { category: 'Property Tax (IBI)', cost: '€400 - €750/year', notes: 'San Javier rates' },
      { category: 'Community Fees', cost: '€70 - €120/month', notes: 'Varies by development' },
      { category: 'Utilities', cost: '€80 - €180/month', notes: 'Standard for the area' },
      { category: 'Golf Membership', cost: '€1,500 - €2,800/year', notes: 'Resident discounts available' },
      { category: 'Weekly Shop', cost: '€70 - €100', notes: 'Good supermarket options' },
    ],
    investment: {
      overview: 'Roda Golf\'s unique beach+golf combination maintains appeal. The Mar Menor location is increasingly valued.',
      priceGrowth: '+36% over 5 years',
      rentalYield: '5-7% achievable',
      outlook: 'Strong rental potential from dual golf/beach appeal.',
    },
    faqs: [
      { question: 'How close are the beaches?', answer: 'Santiago de la Ribera beach is just 5 minutes. You can genuinely play golf in the morning and be on the beach for lunch.' },
      { question: 'What is the Mar Menor like?', answer: 'Europe\'s largest saltwater lagoon - warm (5-7°C warmer than Mediterranean), calm, shallow. Perfect for families and water sports.' },
      { question: 'Is San Javier airport useful?', answer: 'Very! Just 15 minutes away with Ryanair flights to UK and Europe. Alicante is 45 minutes for more options.' },
    ],
    mapLocations: [
      { id: 'roda', name: 'Roda Golf', type: 'golf', coordinates: [37.7845, -0.8012], distance: 'Center', description: 'Beach & golf' },
      { id: 'santiago', name: 'Santiago de la Ribera', type: 'beach', coordinates: [37.8012, -0.8145], distance: '5 min', description: 'Mar Menor beach' },
      { id: 'hospital', name: 'Hospital Los Arcos', type: 'hospital', coordinates: [37.7923, -0.8367], distance: '10 min', description: 'Modern hospital' },
      { id: 'airport', name: 'San Javier Airport', type: 'airport', coordinates: [37.7750, -0.8120], distance: '15 min', description: 'Ryanair flights' },
    ],
  },

  // VILLAITANA (PUIG CAMPANA)
  'puig-campana-golf': {
    heroImage: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1600&q=80',
    introduction: 'Villaitana is Costa Blanca\'s only 36-hole resort, featuring courses designed by golfing legends Jack Nicklaus and Severiano Ballesteros. With the dramatic Puig Campana mountain as a backdrop and a 5-star Meliá hotel on-site, this is premium golf living at its finest.',
    whyLiveHere: [
      '36 holes - Jack Nicklaus & Seve Ballesteros designs',
      'Dramatic Puig Campana mountain backdrop',
      '5-star Meliá Villaitana hotel on-site',
      'Prime Home Alicante luxury developments',
      '10 minutes to Benidorm beaches',
      'Premium amenities: spa, restaurants, pools'
    ],
    lifestyle: {
      overview: 'Villaitana offers a luxury lifestyle with world-class golf, 5-star hotel amenities, and stunning mountain scenery. This is premium living for discerning buyers.',
      dailyLife: 'Choose between two championship courses each day. Enjoy lunch at the Meliá hotel, spa treatments in the afternoon, and fine dining in the evening. Benidorm beaches are just 10 minutes away.',
      community: 'A more exclusive community of premium property owners. International with Spanish, British, and Northern European residents. The resort attracts serious golfers and those seeking quality.',
    },
    schools: [
      { name: 'Elian\'s British School', type: 'British International', distance: '15 min', curriculum: 'British', fees: '€5,000-9,000/year', ages: '3-18', url: 'https://www.eliansbritishschool.com/', note: 'Well-regarded British school in La Nucia.' },
      { name: 'Laude Lady Elizabeth', type: 'British International', distance: '25 min', curriculum: 'British/IB', fees: '€8,000-14,000/year', ages: '2-18', note: 'Premium school with IB program.' },
      { name: 'CEIP Puig Campana', type: 'Spanish Public', distance: '10 min', curriculum: 'Spanish National', fees: 'Free', ages: '3-12', note: 'Local village school in Finestrat.' },
    ],
    healthcare: {
      hospital: { name: 'Hospital Vithas Benidorm', distance: '12 min', description: 'Modern private hospital with English-speaking staff and all specialties.', googleMaps: 'https://maps.google.com/?q=Hospital+Vithas+Benidorm' },
      healthCenter: { name: 'Centro de Salud Finestrat', distance: '10 min' },
      pharmacies: 'Pharmacies in Finestrat and extensive options in Benidorm',
      privateOptions: 'Vithas and IMED hospitals in Benidorm. Excellent private healthcare.',
    },
    beaches: [
      { name: 'Poniente Beach Benidorm', distance: '10 min', description: 'Quieter of Benidorm\'s two main beaches with 3km of golden sand.', googleMaps: 'https://maps.google.com/?q=Playa+Poniente+Benidorm' },
      { name: 'Levante Beach Benidorm', distance: '12 min', description: 'Famous beach with promenade, restaurants, and full facilities.', googleMaps: 'https://maps.google.com/?q=Playa+Levante+Benidorm' },
      { name: 'Altea Beach', distance: '15 min', description: 'Charming pebble beach in picturesque Altea old town.', googleMaps: 'https://maps.google.com/?q=Playa+Altea' },
    ],
    markets: [
      { name: 'Finestrat Market', day: 'Friday', time: '8am - 1pm', distance: '10 min', description: 'Local village market.', googleMaps: 'https://maps.google.com/?q=Mercado+Finestrat' },
      { name: 'Benidorm Market', day: 'Wednesday & Sunday', time: '8am - 2pm', distance: '10 min', description: 'Large markets with everything from produce to clothing.', googleMaps: 'https://maps.google.com/?q=Mercadillo+Benidorm' },
      { name: 'Altea Market', day: 'Tuesday', time: '8am - 1pm', distance: '15 min', description: 'Charming market in the artistic town of Altea.', googleMaps: 'https://maps.google.com/?q=Mercado+Altea' },
    ],
    events: [
      { name: 'Benidorm Fiestas', when: 'November', description: 'Week of celebrations honoring the town\'s patron saint with parades and fireworks.' },
      { name: 'Villaitana Golf Events', when: 'Year-round', description: 'Premium tournaments on Nicklaus and Ballesteros courses.' },
      { name: 'Altea Art Festivals', when: 'Various', description: 'Cultural events in the nearby artistic town of Altea.' },
      { name: 'Low Festival', when: 'July', description: 'Major music festival in Benidorm featuring international acts.' },
    ],
    expat: {
      population: 'Approximately 20% international on resort',
      nationalities: 'Spanish, British, Scandinavian, German',
      socialHub: 'Meliá Villaitana facilities and golf clubhouses',
      facebookGroups: ['Benidorm Expats', 'Costa Blanca North Community'],
      integration: 'Premium community with hotel-style services. English widely spoken.',
    },
    costOfLiving: [
      { category: 'Property Tax (IBI)', cost: '€800 - €1,500/year', notes: 'Premium properties' },
      { category: 'Community Fees', cost: '€150 - €300/month', notes: 'Premium resort facilities' },
      { category: 'Utilities', cost: '€120 - €250/month', notes: 'Larger properties' },
      { category: 'Golf Membership', cost: '€3,000 - €6,000/year', notes: '36 holes access' },
      { category: 'Meliá Spa Access', cost: '€80 - €150/month', notes: 'Optional membership' },
    ],
    investment: {
      overview: 'Villaitana commands premium prices due to its unique 36-hole offering and Nicklaus/Ballesteros pedigree. Prime Home Alicante\'s Green & Blue development targets discerning buyers.',
      priceGrowth: '+45% over 5 years',
      rentalYield: '4-6% achievable',
      outlook: 'Premium segment with strong demand. Unique 36-hole proposition maintains value.',
    },
    faqs: [
      { question: 'What makes Villaitana special?', answer: 'It\'s Costa Blanca\'s only 36-hole resort with courses by Jack Nicklaus and Severiano Ballesteros - two golfing legends. Plus the dramatic Puig Campana mountain backdrop.' },
      { question: 'Which course is better, Levante or Poniente?', answer: 'Levante (Nicklaus design) is more challenging and dramatic. Poniente (Ballesteros) suits more levels. Most members enjoy alternating between both!' },
      { question: 'Is the Meliá hotel accessible to residents?', answer: 'Yes, resort residents can access hotel facilities including restaurants, spa, and pools - often with resident discounts.' },
      { question: 'How close is Benidorm?', answer: 'Just 10 minutes to Benidorm\'s beaches, restaurants, and entertainment. Close enough to enjoy, far enough for peace.' },
    ],
    mapLocations: [
      { id: 'villaitana', name: 'Villaitana Golf', type: 'golf', coordinates: [38.5523, -0.0934], distance: 'Center', description: '36 holes - Nicklaus & Seve' },
      { id: 'poniente', name: 'Poniente Beach', type: 'beach', coordinates: [38.5394, -0.1223], distance: '10 min', description: 'Benidorm beach' },
      { id: 'hospital', name: 'Hospital Vithas', type: 'hospital', coordinates: [38.5367, -0.1234], distance: '12 min', description: 'Private hospital' },
      { id: 'altea', name: 'Altea Old Town', type: 'shopping', coordinates: [38.5988, -0.0499], distance: '15 min', description: 'Artistic village' },
    ],
  },

  // LO ROMERO GOLF
  'lo-romero-golf': {
    heroImage: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1600&q=80',
    introduction: 'Lo Romero Golf offers a modern championship experience in a strategic location between Costa Blanca South and the Mar Menor. Wide fairways and thoughtful design make it enjoyable for all levels while the area develops with new build opportunities.',
    whyLiveHere: [
      '18-hole championship course by David Thomas',
      'Strategic location - beaches both sides',
      'Wide fairways suit all levels',
      'Growing area with new developments',
      '15 minutes to Pilar de la Horadada coast',
      'Good value in developing area'
    ],
    lifestyle: {
      overview: 'Lo Romero offers golf in a developing area with access to both Costa Blanca and Mar Menor beaches. Less crowded than established resorts with good growth potential.',
      dailyLife: 'Uncrowded morning golf, choice of Mediterranean or Mar Menor beaches in the afternoon. Local villages offer authentic Spanish dining.',
      community: 'Developing community with Spanish and international residents. Quieter than established resorts but growing.',
    },
    schools: [
      { name: 'CEIP Virgen del Pilar', type: 'Spanish Public', distance: '10 min', curriculum: 'Spanish National', fees: 'Free', ages: '3-12', note: 'Local school in Pilar de la Horadada.' },
      { name: 'El Limonar International', type: 'British International', distance: '25 min', curriculum: 'British', fees: '€5,000-8,000/year', ages: '3-18', note: 'British school in Torrevieja area.' },
      { name: 'IES Antonio García Besco', type: 'Spanish Secondary', distance: '10 min', curriculum: 'Spanish National', fees: 'Free', ages: '12-18', note: 'Secondary school in Pilar.' },
    ],
    healthcare: {
      hospital: { name: 'Hospital de Torrevieja', distance: '25 min', description: 'Full-service public hospital.', googleMaps: 'https://maps.google.com/?q=Hospital+de+Torrevieja' },
      healthCenter: { name: 'Centro de Salud Pilar de la Horadada', distance: '10 min' },
      pharmacies: 'Pharmacies in Pilar de la Horadada',
      privateOptions: 'Private clinics in Torrevieja and Cartagena.',
    },
    beaches: [
      { name: 'Mil Palmeras Beach', distance: '12 min', description: 'Beautiful Mediterranean beach with good facilities.', googleMaps: 'https://maps.google.com/?q=Playa+Mil+Palmeras' },
      { name: 'Torre de la Horadada', distance: '15 min', description: 'Traditional fishing village beach with excellent seafood restaurants.', googleMaps: 'https://maps.google.com/?q=Torre+de+la+Horadada+beach' },
      { name: 'Lo Pagán (Mar Menor)', distance: '20 min', description: 'Mar Menor beach famous for therapeutic mud.', googleMaps: 'https://maps.google.com/?q=Lo+Pagan+beach' },
    ],
    markets: [
      { name: 'Pilar de la Horadada Market', day: 'Saturday', time: '8am - 1pm', distance: '10 min', description: 'Local market with fresh produce.', googleMaps: 'https://maps.google.com/?q=Mercado+Pilar+Horadada' },
      { name: 'San Pedro del Pinatar Market', day: 'Monday', time: '8am - 1pm', distance: '15 min', description: 'Good coastal market.', googleMaps: 'https://maps.google.com/?q=Mercado+San+Pedro+del+Pinatar' },
    ],
    events: [
      { name: 'Lo Romero Golf Events', when: 'Year-round', description: 'Club competitions and social golf.' },
      { name: 'Pilar de la Horadada Fiestas', when: 'October', description: 'Local festival celebrating the town\'s patron saint.' },
      { name: 'Mud Baths Festival', when: 'Summer', description: 'The famous Mar Menor mud treatments at Lo Pagán.' },
    ],
    expat: {
      population: 'Growing international presence, approximately 20%',
      nationalities: 'Spanish, British, Nordic',
      socialHub: 'Golf clubhouse and coastal restaurants',
      facebookGroups: ['Pilar de la Horadada Expats', 'Costa Cálida Living'],
      integration: 'Developing community with good potential to grow.',
    },
    costOfLiving: [
      { category: 'Property Tax (IBI)', cost: '€350 - €600/year', notes: 'Reasonable rates' },
      { category: 'Community Fees', cost: '€50 - €90/month', notes: 'Lower than established resorts' },
      { category: 'Utilities', cost: '€80 - €160/month', notes: 'Standard costs' },
      { category: 'Weekly Shop', cost: '€70 - €100', notes: 'Good value locally' },
    ],
    investment: {
      overview: 'Lo Romero offers value in a strategic location. As the area develops, early buyers may benefit from growth.',
      priceGrowth: '+28% over 5 years',
      rentalYield: '4-6% achievable',
      outlook: 'Good value entry point with development potential.',
    },
    faqs: [
      { question: 'What is special about Lo Romero\'s location?', answer: 'You can reach both Mediterranean beaches (Mil Palmeras) and Mar Menor beaches (Lo Pagán) in 15-20 minutes. Best of both worlds!' },
      { question: 'Is Lo Romero busy?', answer: 'Less crowded than established coastal courses. Quicker rounds and a more relaxed atmosphere.' },
      { question: 'What is Lo Pagán\'s mud famous for?', answer: 'The Mar Menor mud at Lo Pagán has been used for centuries for therapeutic benefits. People cover themselves in mud at the beach!' },
    ],
    mapLocations: [
      { id: 'lo-romero', name: 'Lo Romero Golf', type: 'golf', coordinates: [37.8456, -0.7812], distance: 'Center', description: 'Modern course' },
      { id: 'mil-palmeras', name: 'Mil Palmeras', type: 'beach', coordinates: [37.8678, -0.7523], distance: '12 min', description: 'Mediterranean beach' },
      { id: 'lo-pagan', name: 'Lo Pagán', type: 'beach', coordinates: [37.8234, -0.7834], distance: '20 min', description: 'Mar Menor mud baths' },
    ],
  },

  // LA MARQUESA GOLF
  'la-marquesa-golf': {
    heroImage: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1600&q=80',
    introduction: 'Golf La Marquesa is an established parkland course in the heart of the Vega Baja region. Tree-lined fairways, water features, and a friendly atmosphere make this an accessible and enjoyable golf experience at great value prices.',
    whyLiveHere: [
      'Established 1989 parkland course',
      'Mature tree-lined fairways',
      'Central Vega Baja location',
      'Most affordable golf resort option',
      'Friendly, welcoming atmosphere',
      '15 minutes to Guardamar beach'
    ],
    lifestyle: {
      overview: 'La Marquesa offers accessible golf living at great value. The mature parkland course and friendly clubhouse create a welcoming environment.',
      dailyLife: 'Relaxed morning golf among mature trees, affordable lunch at the clubhouse. Close to all Vega Baja amenities and beaches.',
      community: 'Mixed Spanish and international community with a friendly, unpretentious atmosphere. Regular social golf brings people together.',
    },
    schools: [
      { name: 'CEIP Azorín', type: 'Spanish Public', distance: '10 min', curriculum: 'Spanish National', fees: 'Free', ages: '3-12', note: 'Local school in Rojales.' },
      { name: 'El Limonar International', type: 'British International', distance: '20 min', curriculum: 'British', fees: '€5,000-8,000/year', ages: '3-18', note: 'Most popular British school in the area.' },
      { name: 'IES Azud de Alfeitamí', type: 'Spanish Secondary', distance: '15 min', curriculum: 'Spanish National', fees: 'Free', ages: '12-18', note: 'Secondary school in Almoradí.' },
    ],
    healthcare: {
      hospital: { name: 'Hospital de Torrevieja', distance: '18 min', description: 'Public hospital with 24hr emergency.', googleMaps: 'https://maps.google.com/?q=Hospital+de+Torrevieja' },
      healthCenter: { name: 'Centro de Salud Rojales', distance: '5 min' },
      pharmacies: 'Multiple pharmacies in Rojales and Quesada',
      privateOptions: 'Private clinics in Torrevieja. Sanitas, Adeslas available.',
    },
    beaches: [
      { name: 'Playa de Guardamar', distance: '15 min', description: 'Beautiful Blue Flag beach with pine-backed dunes.', googleMaps: 'https://maps.google.com/?q=Playa+de+Guardamar+del+Segura' },
      { name: 'Torrevieja Beaches', distance: '20 min', description: 'Urban beaches with promenade and facilities.', googleMaps: 'https://maps.google.com/?q=Playa+del+Cura+Torrevieja' },
      { name: 'La Mata Beach', distance: '22 min', description: 'Natural beach with dunes and nature reserve.', googleMaps: 'https://maps.google.com/?q=Playa+de+La+Mata' },
    ],
    markets: [
      { name: 'Rojales Sunday Market', day: 'Sunday', time: '9am - 2pm', distance: '5 min', description: 'Huge expat favorite - hundreds of stalls, live music.', googleMaps: 'https://maps.google.com/?q=Mercadillo+Rojales+Sunday+Market' },
      { name: 'Rojales Thursday Market', day: 'Thursday', time: '8am - 1pm', distance: '5 min', description: 'Local produce market.', googleMaps: 'https://maps.google.com/?q=Mercado+Rojales' },
      { name: 'Guardamar Wednesday Market', day: 'Wednesday', time: '8am - 1pm', distance: '15 min', description: 'Traditional coastal market.', googleMaps: 'https://maps.google.com/?q=Mercado+Guardamar' },
    ],
    events: [
      { name: 'La Marquesa Golf Days', when: 'Year-round', description: 'Regular social golf events at accessible prices.' },
      { name: 'Rojales Fiestas', when: 'August', description: 'Village festivals with music and traditional events.' },
      { name: 'Moors & Christians', when: 'Various', description: 'Historic parades in nearby Orihuela and Guardamar.' },
    ],
    expat: {
      population: 'High expat population in surrounding Quesada/Rojales area',
      nationalities: 'British, Scandinavian, Dutch, Belgian',
      socialHub: 'La Marquesa clubhouse and nearby Quesada restaurants',
      facebookGroups: ['Quesada Expats', 'Rojales Community', 'Vega Baja Living'],
      integration: 'Very welcoming expat community. English widely spoken.',
    },
    costOfLiving: [
      { category: 'Property Tax (IBI)', cost: '€300 - €500/year', notes: 'Very affordable' },
      { category: 'Community Fees', cost: '€40 - €80/month', notes: 'Lower than newer resorts' },
      { category: 'Utilities', cost: '€80 - €150/month', notes: 'Standard costs' },
      { category: 'Golf Membership', cost: '€800 - €1,500/year', notes: 'Great value memberships' },
      { category: 'Weekly Shop', cost: '€70 - €100', notes: 'Mercadona, Lidl, Aldi nearby' },
    ],
    investment: {
      overview: 'La Marquesa offers the most affordable entry to golf resort living. The Terrazas Golf development provides modern apartments at accessible prices.',
      priceGrowth: '+25% over 5 years',
      rentalYield: '5-7% achievable',
      outlook: 'Steady affordable option. Good rental potential from budget-conscious golfers.',
    },
    faqs: [
      { question: 'Is La Marquesa suitable for beginners?', answer: 'Absolutely! The forgiving parkland layout and friendly atmosphere make it perfect for golfers of all levels. Green fees are very reasonable too.' },
      { question: 'How old is the course?', answer: 'Established in 1989, La Marquesa has beautifully mature trees and established landscaping that newer courses lack.' },
      { question: 'What is the community like?', answer: 'Friendly and unpretentious. A mix of retired expats and Spanish families. The Sunday market brings everyone together!' },
    ],
    mapLocations: [
      { id: 'la-marquesa', name: 'La Marquesa Golf', type: 'golf', coordinates: [38.0512, -0.7823], distance: 'Center', description: 'Parkland course' },
      { id: 'guardamar', name: 'Guardamar Beach', type: 'beach', coordinates: [38.0892, -0.6553], distance: '15 min', description: 'Blue Flag beach' },
      { id: 'rojales-market', name: 'Rojales Sunday Market', type: 'market', coordinates: [38.0867, -0.7234], distance: '5 min', description: 'Famous expat market' },
    ],
  },

  // AGUILÓN GOLF
  'aguilon-golf': {
    heroImage: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1600&q=80',
    introduction: 'Aguilón Golf Resort offers a unique desert-links experience designed by Ryder Cup captain Manuel Piñero. Set in the unspoilt Almería landscape with dramatic mountain and sea views, this is golf and property buying for those seeking something genuinely different.',
    whyLiveHere: [
      'Desert-links course by Manuel Piñero',
      'Dramatic mountain AND sea views',
      'Unspoilt Almería province - authentic Spain',
      'Excellent value compared to Costa Blanca',
      'Year-round sunshine - 320+ days',
      'Quieter, less commercialized area'
    ],
    lifestyle: {
      overview: 'Aguilón offers escape from the crowds. The dramatic Almería landscape, empty beaches, and authentic Spanish atmosphere attract those seeking tranquility.',
      dailyLife: 'Golf with sea and mountain views, lunch overlooking the course. Afternoons exploring unspoilt beaches or the fascinating Almería province. Authentic Spanish dining in local villages.',
      community: 'Smaller, tight-knit community. Mix of Spanish and Northern European residents seeking peace and value. Less commercialized than coastal resorts.',
    },
    schools: [
      { name: 'British School of Almería', type: 'British International', distance: '45 min', curriculum: 'British', fees: '€4,500-7,500/year', ages: '3-18', note: 'The main British school option in Almería province.' },
      { name: 'CEIP San Juan', type: 'Spanish Public', distance: '10 min', curriculum: 'Spanish National', fees: 'Free', ages: '3-12', note: 'Local school in Pulpí.' },
      { name: 'IES Mar Serena', type: 'Spanish Secondary', distance: '15 min', curriculum: 'Spanish National', fees: 'Free', ages: '12-18', note: 'Secondary school option.' },
    ],
    healthcare: {
      hospital: { name: 'Hospital de la Inmaculada', distance: '40 min', description: 'Hospital in Huércal-Overa with emergency services.', googleMaps: 'https://maps.google.com/?q=Hospital+Inmaculada+Huercal-Overa' },
      healthCenter: { name: 'Centro de Salud Pulpí', distance: '10 min' },
      pharmacies: 'Pharmacies in Pulpí and San Juan de los Terreros',
      privateOptions: 'Private clinics in Vera and Mojácar. Limited but growing.',
    },
    beaches: [
      { name: 'San Juan de los Terreros', distance: '10 min', description: 'Quiet beaches with crystal clear water and dramatic cliffs.', googleMaps: 'https://maps.google.com/?q=San+Juan+de+los+Terreros+beach' },
      { name: 'Playa de Vera', distance: '25 min', description: 'Famous naturist beach but also regular beach sections.', googleMaps: 'https://maps.google.com/?q=Playa+de+Vera' },
      { name: 'Águilas Beaches', distance: '20 min', description: 'Pretty cove beaches in this traditional Murcian town.', googleMaps: 'https://maps.google.com/?q=Playas+Aguilas' },
    ],
    markets: [
      { name: 'Pulpí Market', day: 'Sunday', time: '8am - 1pm', distance: '10 min', description: 'Traditional local market.', googleMaps: 'https://maps.google.com/?q=Mercado+Pulpi' },
      { name: 'Vera Market', day: 'Saturday', time: '8am - 2pm', distance: '25 min', description: 'Larger market in nearby Vera.', googleMaps: 'https://maps.google.com/?q=Mercado+Vera+Almeria' },
      { name: 'Garrucha Fish Market', day: 'Daily', time: 'Morning', distance: '30 min', description: 'Fresh fish auction and market in fishing village.', googleMaps: 'https://maps.google.com/?q=Lonja+Garrucha' },
    ],
    events: [
      { name: 'Aguilón Golf Events', when: 'Year-round', description: 'Club competitions in stunning setting.' },
      { name: 'Pulpí Fiestas', when: 'August', description: 'Traditional village celebrations.' },
      { name: 'Geode of Pulpí Tours', when: 'Year-round', description: 'Visit Europe\'s largest accessible geode - a unique geological wonder.' },
    ],
    expat: {
      population: 'Approximately 15% international residents',
      nationalities: 'British, German, Dutch, Scandinavian',
      socialHub: 'Golf clubhouse and San Juan de los Terreros restaurants',
      facebookGroups: ['Almería Expats', 'Costa de Almería Living'],
      integration: 'Smaller community where everyone knows each other. Some Spanish helpful.',
    },
    costOfLiving: [
      { category: 'Property Tax (IBI)', cost: '€300 - €500/year', notes: 'Very competitive rates' },
      { category: 'Community Fees', cost: '€50 - €100/month', notes: 'Lower than coastal resorts' },
      { category: 'Utilities', cost: '€70 - €150/month', notes: 'Solar very effective here' },
      { category: 'Golf Membership', cost: '€1,000 - €2,000/year', notes: 'Excellent value' },
      { category: 'Weekly Shop', cost: '€60 - €90', notes: 'Lower cost of living generally' },
    ],
    investment: {
      overview: 'Aguilón offers excellent value in an unspoilt setting. Lower profile means lower prices, but increasing interest in Almería is driving appreciation.',
      priceGrowth: '+30% over 5 years',
      rentalYield: '4-6% achievable',
      outlook: 'Growing interest in Almería province. Early buyers may benefit as area develops.',
    },
    faqs: [
      { question: 'Why choose Almería over Costa Blanca?', answer: 'Fewer tourists, unspoilt landscapes, lower prices, more authentic Spanish life. If you want peace and value over nightlife and crowds, Almería delivers.' },
      { question: 'What is the Geode of Pulpí?', answer: 'Europe\'s largest accessible geode - a giant crystal cave you can visit! One of many unique attractions in this fascinating area.' },
      { question: 'How is the weather in Almería?', answer: 'The driest region in Europe with 320+ sunny days. Perfect for year-round golf. Mild winters and hot (but dry) summers.' },
      { question: 'Are there good beaches near Aguilón?', answer: 'Yes! San Juan de los Terreros has beautiful quiet beaches just 10 minutes away. Less crowded than Costa Blanca with crystal clear water.' },
    ],
    mapLocations: [
      { id: 'aguilon', name: 'Aguilón Golf', type: 'golf', coordinates: [37.4012, -1.6823], distance: 'Center', description: 'Desert-links course' },
      { id: 'san-juan', name: 'San Juan de los Terreros', type: 'beach', coordinates: [37.3567, -1.6789], distance: '10 min', description: 'Quiet beaches' },
      { id: 'hospital', name: 'Hospital Huércal-Overa', type: 'hospital', coordinates: [37.3923, -1.9412], distance: '40 min', description: 'Main hospital' },
    ],
  },

  // DESERT SPRINGS
  'desert-springs': {
    heroImage: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1600&q=80',
    introduction: 'Desert Springs is Europe\'s only desert golf course - an award-winning Arizona-style layout unlike anything else on the continent. Cacti, dry river beds, and mountain scenery create a truly unique experience in the sunshine capital of Spain.',
    whyLiveHere: [
      'Europe\'s ONLY desert golf course',
      'Arizona-style landscape unique in Europe',
      'Award-winning design with cacti & dry washes',
      'Almería - 320+ sunny days per year',
      'Full resort with pools, spa, restaurants',
      'Something genuinely different'
    ],
    lifestyle: {
      overview: 'Desert Springs offers a truly unique experience. The Arizona-style setting feels like nowhere else in Spain. This is for those who want something different.',
      dailyLife: 'Golf among cacti with mountain views, relaxation at the resort pools and spa. The unique setting makes every day feel like an adventure. Year-round perfect weather.',
      community: 'A mix of golfers seeking the unique experience and property owners who fell in love with the setting. International with British, German, and Dutch residents.',
    },
    schools: [
      { name: 'British School of Almería', type: 'British International', distance: '35 min', curriculum: 'British', fees: '€4,500-7,500/year', ages: '3-18', note: 'British curriculum school.' },
      { name: 'CEIP Cuevas del Almanzora', type: 'Spanish Public', distance: '15 min', curriculum: 'Spanish National', fees: 'Free', ages: '3-12', note: 'Local Spanish school.' },
      { name: 'IES Cura Valera', type: 'Spanish Secondary', distance: '15 min', curriculum: 'Spanish National', fees: 'Free', ages: '12-18', note: 'Secondary school option.' },
    ],
    healthcare: {
      hospital: { name: 'Hospital La Inmaculada', distance: '25 min', description: 'Hospital in Huércal-Overa.', googleMaps: 'https://maps.google.com/?q=Hospital+Inmaculada+Huercal-Overa' },
      healthCenter: { name: 'Centro de Salud Cuevas del Almanzora', distance: '15 min' },
      pharmacies: 'Pharmacies in Cuevas del Almanzora and Vera',
      privateOptions: 'Private clinics in Vera. Limited but adequate.',
    },
    beaches: [
      { name: 'Mojácar Beaches', distance: '25 min', description: 'Beautiful beaches below the iconic white hilltop village.', googleMaps: 'https://maps.google.com/?q=Playa+de+Mojacar' },
      { name: 'Garrucha Beach', distance: '20 min', description: 'Traditional fishing village with authentic seafood restaurants.', googleMaps: 'https://maps.google.com/?q=Playa+Garrucha' },
      { name: 'Vera Beaches', distance: '25 min', description: 'Long beaches including famous naturist section.', googleMaps: 'https://maps.google.com/?q=Playa+Vera' },
    ],
    markets: [
      { name: 'Mojácar Market', day: 'Wednesday', time: '8am - 1pm', distance: '25 min', description: 'Market in charming Mojácar village.', googleMaps: 'https://maps.google.com/?q=Mercado+Mojacar' },
      { name: 'Vera Market', day: 'Saturday', time: '8am - 2pm', distance: '25 min', description: 'Good sized market.', googleMaps: 'https://maps.google.com/?q=Mercado+Vera' },
      { name: 'Garrucha Fish Auction', day: 'Daily', time: 'Morning', distance: '20 min', description: 'Authentic fish auction at the port.', googleMaps: 'https://maps.google.com/?q=Lonja+Garrucha' },
    ],
    events: [
      { name: 'Desert Springs Golf Events', when: 'Year-round', description: 'Tournaments in the unique desert setting.' },
      { name: 'Mojácar Fiestas', when: 'June', description: 'Moors and Christians celebrations in the iconic village.' },
      { name: 'Almería Western Film Locations', when: 'Year-round', description: 'Visit Tabernas Desert where Sergio Leone westerns were filmed.' },
    ],
    expat: {
      population: 'Approximately 20% international on resort',
      nationalities: 'British, German, Dutch, Scandinavian',
      socialHub: 'Resort clubhouse and facilities',
      facebookGroups: ['Desert Springs Community', 'Almería Expats'],
      integration: 'Unique community of people who chose something different. Strong sense of identity.',
    },
    costOfLiving: [
      { category: 'Property Tax (IBI)', cost: '€400 - €700/year', notes: 'Resort properties' },
      { category: 'Community Fees', cost: '€80 - €150/month', notes: 'Full resort facilities' },
      { category: 'Utilities', cost: '€70 - €150/month', notes: 'Excellent solar conditions' },
      { category: 'Golf Membership', cost: '€1,500 - €2,500/year', notes: 'Unique course access' },
      { category: 'Weekly Shop', cost: '€60 - €90', notes: 'Lower cost region' },
    ],
    investment: {
      overview: 'Desert Springs is unique in Europe - there is literally nothing else like it. This uniqueness maintains appeal but also creates a specific buyer profile.',
      priceGrowth: '+28% over 5 years',
      rentalYield: '4-5% achievable',
      outlook: 'Unique proposition maintains value. Appeals to those seeking something different.',
    },
    faqs: [
      { question: 'What makes Desert Springs unique?', answer: 'It\'s Europe\'s only desert golf course. Arizona-style landscape with cacti, dry washes, and mountain backdrop. Nothing else like it on the continent.' },
      { question: 'Isn\'t it too hot in summer?', answer: 'Almería is dry heat - much more bearable than humid coast. Morning golf is comfortable even in summer, and the resort pools provide relief.' },
      { question: 'What is Mojácar like?', answer: 'A stunning whitewashed hilltop village with art galleries, restaurants, and incredible views. One of Spain\'s most beautiful pueblos blancos, just 25 minutes away.' },
      { question: 'Can I visit film locations?', answer: 'Yes! The Tabernas Desert nearby is where spaghetti westerns were filmed. You can visit preserved film sets - a unique day out.' },
    ],
    mapLocations: [
      { id: 'desert-springs', name: 'Desert Springs', type: 'golf', coordinates: [37.3156, -1.7234], distance: 'Center', description: 'Europe\'s only desert course' },
      { id: 'mojacar', name: 'Mojácar Beach', type: 'beach', coordinates: [37.1456, -1.8456], distance: '25 min', description: 'Below white village' },
      { id: 'garrucha', name: 'Garrucha', type: 'shopping', coordinates: [37.1845, -1.8234], distance: '20 min', description: 'Fishing village' },
    ],
  },
};

// Generate default lifestyle data for courses without specific data
function getDefaultLifestyle(course: GolfCourse): GolfCourseLifestyle {
  return {
    heroImage: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1600&q=80',
    introduction: course.description,
    whyLiveHere: course.highlights,
    lifestyle: {
      overview: course.story,
      dailyLife: `Life at ${course.shortName} revolves around golf, sunshine, and relaxation. Morning rounds, afternoon relaxation, and evenings enjoying the Mediterranean lifestyle.`,
      community: `${course.shortName} attracts an international community of golf enthusiasts seeking the Spanish lifestyle.`,
    },
    schools: [
      { name: 'Local International School', type: 'International', distance: '20-40 min', curriculum: 'British/Spanish', fees: '€5,000-10,000/year', ages: '3-18', note: 'Contact us for specific recommendations for this area.' },
    ],
    healthcare: {
      hospital: { name: 'Regional Hospital', distance: '15-30 min', description: 'Full-service hospital with English-speaking staff available.', googleMaps: '' },
      healthCenter: { name: 'Local Health Center', distance: '10 min' },
      pharmacies: 'Pharmacies in nearby towns',
      privateOptions: 'Private insurance recommended (Sanitas, Adeslas)',
    },
    beaches: [
      { name: 'Nearest Beach', distance: '15-30 min', description: 'Beautiful Mediterranean beaches within easy reach.', googleMaps: '' },
    ],
    markets: [
      { name: 'Local Weekly Market', day: 'Weekly', time: 'Morning', distance: '10-15 min', description: 'Traditional Spanish market with fresh produce.', googleMaps: '' },
    ],
    events: [
      { name: 'Golf Club Events', when: 'Year-round', description: 'Regular competitions, social events, and tournaments at the club.' },
      { name: 'Local Fiestas', when: 'August', description: 'Traditional Spanish festivals in nearby towns.' },
    ],
    expat: {
      population: 'Significant international community',
      nationalities: 'British, Nordic, German, Dutch',
      socialHub: 'Golf clubhouse',
      facebookGroups: ['Costa Blanca Expats', 'Golf Spain'],
      integration: 'The golf club is the social hub - easy to meet people through competitions and events.',
    },
    costOfLiving: [
      { category: 'Property Tax (IBI)', cost: '€400 - €800/year', notes: 'Varies by municipality' },
      { category: 'Community Fees', cost: '€60 - €150/month', notes: 'Depends on development' },
      { category: 'Utilities', cost: '€100 - €200/month', notes: 'AC adds to summer costs' },
    ],
    investment: {
      overview: 'Golf properties in this region consistently perform well due to limited supply and steady international demand.',
      priceGrowth: '+30-40% over 5 years',
      rentalYield: '4-6% achievable',
      outlook: 'Positive outlook with continued interest from international buyers.',
    },
    faqs: [
      { question: `Do I need a car at ${course.shortName}?`, answer: 'Yes, a car is essential for golf resort living. Roads are excellent and parking is typically free.' },
      { question: `What is the weather like at ${course.shortName}?`, answer: 'Over 300 sunny days per year. Golf playable year-round with mild winters and hot summers.' },
      { question: `Can I rent out my property at ${course.shortName}?`, answer: 'Yes, golf properties are popular rentals, especially September to June during the main golf season.' },
    ],
    mapLocations: [
      { id: course.slug, name: course.name, type: 'golf', coordinates: [course.lat, course.lng], distance: 'Center', description: course.description.slice(0, 50) },
    ],
  };
}

// Contact info
const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

// Generate static params
export async function generateStaticParams() {
  const slugs = getAllGolfSlugs();
  return slugs.map(slug => ({ slug }));
}

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = getGolfCourseBySlug(slug);

  if (!course) {
    return { title: 'Golf Course Not Found' };
  }

  return {
    title: `Living at ${course.name} 2026 | ${course.propertyCount} Properties from ${formatPrice(course.priceFrom)} | Complete Guide`,
    description: `Complete guide to living at ${course.name}, ${course.town}. ${course.propertyCount} properties from ${formatPrice(course.priceFrom)}. Schools, beaches, cost of living, expat community. ${course.holes}-hole course.`,
    keywords: `${course.name}, ${course.town} property, Costa Blanca golf, golf villa Spain, expat Spain, buy property ${course.town}`,
    openGraph: {
      title: `${course.name} - Complete Living Guide 2026`,
      description: `Everything you need to know about living at ${course.name}. Golf lifestyle, schools, costs, community.`,
      type: 'website',
    },
    alternates: {
      canonical: `https://newbuildhomescostablanca.com/golf/${slug}`,
    },
  };
}

export default async function GolfCoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getGolfCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  // Get rich lifestyle data or default
  const lifestyle = GOLF_LIFESTYLE_DATA[slug] || getDefaultLifestyle(course);

  // Get developments near this golf course
  const developments = await getDevelopmentsByGolfCourse(course.nearbyTowns);

  // Get other golf courses in same region
  const sameRegionCourses = getGolfCoursesByRegion(course.region).filter(c => c.slug !== course.slug);
  const otherCourses = sameRegionCourses.length > 0
    ? sameRegionCourses.slice(0, 4)
    : GOLF_COURSES.filter(c => c.slug !== course.slug).slice(0, 4);

  // Generate schemas
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Golf', url: 'https://newbuildhomescostablanca.com/golf/' },
    { name: course.name, url: `https://newbuildhomescostablanca.com/golf/${course.slug}/` },
  ]);

  const faqSchemaData = faqSchema(lifestyle.faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchemaData) }} />

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary-900 border-t border-primary-700 z-50 lg:hidden">
        <div className="flex">
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 font-medium">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
          <a href="#properties" className="flex-1 flex items-center justify-center gap-2 bg-accent-500 text-white py-4 font-medium">
            View Properties
          </a>
        </div>
      </div>

      <main className="min-h-screen bg-warm-50 pb-20 lg:pb-0">
        {/* ============================================ */}
        {/* HERO SECTION */}
        {/* ============================================ */}
        <section className={`relative bg-gradient-to-br ${course.gradient} py-20 md:py-28 overflow-hidden`}>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <nav className="text-white/70 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/golf" className="hover:text-white transition-colors">Golf</Link>
              <span className="mx-2">›</span>
              <span className="text-white">{course.name}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="bg-white/20 backdrop-blur text-white text-xs font-medium px-3 py-1 rounded-full">
                    {course.regionDisplay}
                  </span>
                  <span className="bg-success-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {course.propertyCount} Properties Available
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Living at {course.name}
                </h1>

                <p className="text-white/90 text-lg leading-relaxed mb-6">
                  {lifestyle.introduction}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">{course.holes}</div>
                    <div className="text-white/70 text-sm">Holes</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">{course.propertyCount}</div>
                    <div className="text-white/70 text-sm">Properties</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-accent-300">{formatPrice(course.priceFrom)}</div>
                    <div className="text-white/70 text-sm">From</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">{lifestyle.beaches[0]?.distance || '15 min'}</div>
                    <div className="text-white/70 text-sm">To Beach</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Discuss {course.shortName}
                  </a>
                  <a href="#properties" className="bg-white text-primary-900 hover:bg-warm-100 px-6 py-3 rounded-lg font-medium transition-colors">
                    View Properties →
                  </a>
                </div>
              </div>

              {/* Quick inquiry form */}
              <div className="hidden lg:block">
                <div className="bg-white rounded-xl p-6 shadow-2xl">
                  <h3 className="text-xl font-semibold text-primary-900 mb-1">Get {course.shortName} Properties</h3>
                  <p className="text-warm-500 text-sm mb-5">{course.propertyCount} homes available from {formatPrice(course.priceFrom)}</p>
                  <LeadForm propertyInterest={`Golf property near ${course.name}`} compact={true} formName="golf-course-inquiry" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* WHY LIVE HERE */}
        {/* ============================================ */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-6">
              Why Live at <span className="font-semibold">{course.shortName}</span>?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lifestyle.whyLiveHere.map((reason, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-warm-50 rounded-lg">
                  <svg className="w-6 h-6 text-success-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-warm-700">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* LIFESTYLE SECTION */}
        {/* ============================================ */}
        <section className="py-12 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-8">
              The <span className="font-semibold">{course.shortName} Lifestyle</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-3">🏌️ Golf & Resort</h3>
                <p className="text-warm-600 text-sm">{lifestyle.lifestyle.overview}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-3">☀️ Daily Life</h3>
                <p className="text-warm-600 text-sm">{lifestyle.lifestyle.dailyLife}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-3">👥 Community</h3>
                <p className="text-warm-600 text-sm">{lifestyle.lifestyle.community}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SCHOOLS */}
        {/* ============================================ */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              Schools Near <span className="font-semibold">{course.shortName}</span>
            </h2>
            <p className="text-warm-600 mb-6">Education options for families</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lifestyle.schools.map((school, i) => (
                <div key={i} className="bg-warm-50 p-5 rounded-xl border border-warm-200">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primary-900">{school.name}</h3>
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">{school.distance}</span>
                  </div>
                  <p className="text-warm-500 text-sm mb-2">{school.type} • Ages {school.ages}</p>
                  <p className="text-accent-600 font-medium text-sm mb-2">{school.fees}</p>
                  <p className="text-warm-600 text-sm">{school.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* BEACHES */}
        {/* ============================================ */}
        <section className="py-12 bg-blue-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              🏖️ Nearest <span className="font-semibold">Beaches</span>
            </h2>
            <p className="text-warm-600 mb-6">Mediterranean beaches within easy reach</p>
            <div className="grid md:grid-cols-3 gap-4">
              {lifestyle.beaches.map((beach, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-warm-200">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primary-900">{beach.name}</h3>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{beach.distance}</span>
                  </div>
                  <p className="text-warm-600 text-sm mb-3">{beach.description}</p>
                  {beach.googleMaps && (
                    <a href={beach.googleMaps} target="_blank" rel="noopener noreferrer" className="text-accent-600 text-sm hover:underline">
                      View on Google Maps →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* HEALTHCARE */}
        {/* ============================================ */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-6">
              🏥 Healthcare & <span className="font-semibold">Medical</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-warm-50 p-6 rounded-xl border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-2">{lifestyle.healthcare.hospital.name}</h3>
                <p className="text-accent-600 font-medium mb-2">{lifestyle.healthcare.hospital.distance}</p>
                <p className="text-warm-600 text-sm mb-3">{lifestyle.healthcare.hospital.description}</p>
                {lifestyle.healthcare.hospital.googleMaps && (
                  <a href={lifestyle.healthcare.hospital.googleMaps} target="_blank" rel="noopener noreferrer" className="text-accent-600 text-sm hover:underline">
                    View on Google Maps →
                  </a>
                )}
              </div>
              <div className="space-y-4">
                <div className="bg-warm-50 p-4 rounded-lg">
                  <p className="font-medium text-primary-900">Local Health Center</p>
                  <p className="text-warm-600 text-sm">{lifestyle.healthcare.healthCenter.name} - {lifestyle.healthcare.healthCenter.distance}</p>
                </div>
                <div className="bg-warm-50 p-4 rounded-lg">
                  <p className="font-medium text-primary-900">Pharmacies</p>
                  <p className="text-warm-600 text-sm">{lifestyle.healthcare.pharmacies}</p>
                </div>
                <div className="bg-warm-50 p-4 rounded-lg">
                  <p className="font-medium text-primary-900">Private Options</p>
                  <p className="text-warm-600 text-sm">{lifestyle.healthcare.privateOptions}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* MARKETS */}
        {/* ============================================ */}
        <section className="py-12 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              🛒 Local <span className="font-semibold">Markets</span>
            </h2>
            <p className="text-warm-600 mb-6">Weekly markets are a highlight of Spanish life</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lifestyle.markets.map((market, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-warm-200">
                  <h3 className="font-semibold text-primary-900 mb-1">{market.name}</h3>
                  <p className="text-accent-600 font-medium text-sm mb-1">{market.day}, {market.time}</p>
                  <p className="text-warm-500 text-xs mb-2">{market.distance} drive</p>
                  <p className="text-warm-600 text-sm">{market.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* EVENTS & FIESTAS */}
        {/* ============================================ */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              🎉 Events & <span className="font-semibold">Fiestas</span>
            </h2>
            <p className="text-warm-600 mb-6">Local celebrations and golf club events</p>
            <div className="grid md:grid-cols-2 gap-4">
              {lifestyle.events.map((event, i) => (
                <div key={i} className="flex gap-4 p-4 bg-warm-50 rounded-xl border border-warm-200">
                  <div className="flex-shrink-0 w-24">
                    <p className="text-accent-600 font-semibold text-sm">{event.when}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-900 mb-1">{event.name}</h3>
                    <p className="text-warm-600 text-sm">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* EXPAT COMMUNITY */}
        {/* ============================================ */}
        <section className="py-12 bg-primary-900 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-light mb-6">
              👥 The <span className="font-semibold">Expat Community</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/10 p-5 rounded-xl">
                <p className="text-warm-300 text-sm mb-1">International Population</p>
                <p className="text-white font-medium">{lifestyle.expat.population}</p>
              </div>
              <div className="bg-white/10 p-5 rounded-xl">
                <p className="text-warm-300 text-sm mb-1">Main Nationalities</p>
                <p className="text-white font-medium">{lifestyle.expat.nationalities}</p>
              </div>
              <div className="bg-white/10 p-5 rounded-xl">
                <p className="text-warm-300 text-sm mb-1">Social Hub</p>
                <p className="text-white font-medium">{lifestyle.expat.socialHub}</p>
              </div>
              <div className="bg-white/10 p-5 rounded-xl">
                <p className="text-warm-300 text-sm mb-1">Integration</p>
                <p className="text-white font-medium text-sm">{lifestyle.expat.integration}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* COST OF LIVING */}
        {/* ============================================ */}
        <section className="py-12 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              💰 Cost of <span className="font-semibold">Living</span>
            </h2>
            <p className="text-warm-600 mb-6">Monthly expenses for golf resort living</p>
            <div className="bg-white rounded-xl border border-warm-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-primary-900 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Category</th>
                    <th className="px-4 py-3 text-left font-medium">Cost</th>
                    <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {lifestyle.costOfLiving.map((item, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-warm-50'}>
                      <td className="px-4 py-3 font-medium text-primary-900">{item.category}</td>
                      <td className="px-4 py-3 text-accent-600 font-medium">{item.cost}</td>
                      <td className="px-4 py-3 text-warm-600 text-sm hidden md:table-cell">{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* INVESTMENT */}
        {/* ============================================ */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-6">
              📈 Investment <span className="font-semibold">Potential</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-success-50 p-6 rounded-xl border border-success-200 text-center">
                <p className="text-4xl font-bold text-success-600">{lifestyle.investment.priceGrowth}</p>
                <p className="text-success-700">5-Year Growth</p>
              </div>
              <div className="bg-accent-50 p-6 rounded-xl border border-accent-200 text-center">
                <p className="text-4xl font-bold text-accent-600">{lifestyle.investment.rentalYield}</p>
                <p className="text-accent-700">Rental Yield</p>
              </div>
              <div className="bg-primary-50 p-6 rounded-xl border border-primary-200 text-center">
                <p className="text-2xl font-bold text-primary-900">Strong</p>
                <p className="text-primary-700">Market Outlook</p>
              </div>
            </div>
            <div className="bg-warm-50 p-6 rounded-xl">
              <p className="text-warm-700 mb-4">{lifestyle.investment.overview}</p>
              <p className="text-warm-700"><strong>Outlook:</strong> {lifestyle.investment.outlook}</p>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* PROPERTIES */}
        {/* ============================================ */}
        <section className="py-12 bg-warm-100" id="properties">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              🏠 Properties at <span className="font-semibold">{course.shortName}</span>
            </h2>
            <p className="text-warm-600 mb-8">
              {developments.length > 0 ? `${developments.length} developments with new build homes` : 'Contact us for the latest availability'}
            </p>

            {developments.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {developments.slice(0, 9).map((dev, i) => (
                  <Link key={i} href={`/developments/${dev.slug}`} className="group bg-white border border-warm-200 rounded-xl overflow-hidden hover:shadow-xl transition-all">
                    <div className="relative h-48 bg-warm-200">
                      {dev.images[0] && (
                        <Image src={dev.images[0]} alt={dev.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {dev.status === 'off-plan' ? 'Off-Plan' : dev.status === 'key-ready' ? 'Key Ready' : 'Under Construction'}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-primary-900 mb-1 group-hover:text-accent-600 transition-colors">{dev.name}</h3>
                      <p className="text-warm-500 text-sm mb-2">{dev.town}</p>
                      {dev.priceFrom && <p className="text-accent-600 font-bold text-lg">From {formatPrice(dev.priceFrom)}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 text-center border border-warm-200">
                <p className="text-4xl mb-4">🏌️</p>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">Properties Coming Soon</h3>
                <p className="text-warm-600 mb-6">New developments near {course.name} are added regularly.</p>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-medium">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Register Interest
                </a>
              </div>
            )}
          </div>
        </section>

        {/* ============================================ */}
        {/* INTERACTIVE MAP */}
        {/* ============================================ */}
        {lifestyle.mapLocations.length > 0 && (
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-6">
                📍 Area <span className="font-semibold">Map</span>
              </h2>
              <div className="h-[400px] rounded-xl overflow-hidden border border-warm-200">
                <InteractiveAreaMap
                  centerCoordinates={[course.lat, course.lng]}
                  locations={lifestyle.mapLocations}
                  areaName={course.name}
                />
              </div>
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* FAQs */}
        {/* ============================================ */}
        <section className="py-12 bg-warm-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-6 text-center">
              ❓ Frequently Asked <span className="font-semibold">Questions</span>
            </h2>
            <div className="space-y-3">
              {lifestyle.faqs.map((faq, i) => (
                <details key={i} className="group bg-white border border-warm-200 rounded-lg overflow-hidden">
                  <summary className="flex justify-between items-center cursor-pointer p-5 font-medium text-primary-900 hover:bg-warm-50 transition-colors">
                    {faq.question}
                    <svg className="w-5 h-5 text-warm-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-warm-700 border-t border-warm-100 pt-4">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* OTHER COURSES */}
        {/* ============================================ */}
        {otherCourses.length > 0 && (
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-2xl font-light text-primary-900 mb-6">
                Other <span className="font-semibold">Golf Courses</span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {otherCourses.map((c) => (
                  <Link key={c.slug} href={`/golf/${c.slug}`} className={`group rounded-xl overflow-hidden border border-warm-200 hover:shadow-lg transition-all`}>
                    <div className={`h-32 bg-gradient-to-br ${c.gradient} relative`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="font-semibold text-white group-hover:text-accent-300 transition-colors">{c.shortName}</h3>
                        <p className="text-white/70 text-sm">{c.town}</p>
                      </div>
                    </div>
                    <div className="p-3 bg-white flex justify-between">
                      <span className="text-success-600 font-medium text-sm">{c.propertyCount} properties</span>
                      <span className="text-accent-600 font-medium text-sm">From {formatPrice(c.priceFrom)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* FINAL CTA */}
        {/* ============================================ */}
        <section className="py-16 bg-primary-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4">Ready to Live at {course.shortName}?</h2>
                <p className="text-warm-300 leading-relaxed mb-6">
                  {course.propertyCount} properties available from {formatPrice(course.priceFrom)}. Contact us today to find your perfect golf home.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp Us
                  </a>
                  <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg transition-colors border border-white/20">
                    {CONTACT.phone}
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-primary-900 mb-1">Get {course.shortName} Matches</h3>
                <p className="text-warm-500 text-sm mb-5">We'll send properties matching your criteria</p>
                <LeadForm propertyInterest={`Golf property at ${course.name}`} formName="golf-course-footer" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
