import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';
import ParallaxPropertySection from '@/components/area/ParallaxPropertySection';
import SplitScrollShowcase from '@/components/area/SplitScrollShowcase';
import InvestmentAnalysis from '@/components/area/InvestmentAnalysis';
import DayInTheLife from '@/components/area/DayInTheLife';
import FullWidthPropertyGrid from '@/components/area/FullWidthPropertyGrid';
import InteractiveAreaMap from '@/components/area/InteractiveAreaMap';
import AreaDevelopments from '@/components/area/AreaDevelopments';
import { LifestyleBanner, SectionCardImage, ImageGrid } from '@/components/area/SectionImage';
import { beachImages, golfImages, marketFoodImages, marinaImages, oldTownImages, getImageUrl } from '@/data/stock-images';

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

export const metadata: Metadata = {
  title: 'Living in Algorfa 2025 | La Finca Golf Property Guide | Schools, Cost of Living',
  description: 'Complete guide to living in Algorfa, home of La Finca Golf Resort. Schools, cost of living, healthcare, markets, expat community. Golf villas from €195,000. 15 min to beaches.',
  keywords: 'Algorfa property, La Finca Golf, Costa Blanca golf villas, Algorfa schools, expat life Spain, buy property Algorfa',
  openGraph: {
    title: 'Algorfa & La Finca Golf - Complete Living Guide 2025',
    description: 'Everything you need to know about living in Algorfa. Golf lifestyle, schools, costs, community. New build villas 30% cheaper than coast.',
    type: 'website',
  },
};

// Schema markup
const placeSchema = {
  '@context': 'https://schema.org',
  '@type': 'Place',
  name: 'Algorfa',
  description: 'Algorfa is an inland municipality in Costa Blanca South, Spain, home to La Finca Golf Resort. Known for golf lifestyle, quality new builds, and excellent value.',
  geo: { '@type': 'GeoCoordinates', latitude: '38.0647', longitude: '-0.7928' },
  address: { '@type': 'PostalAddress', addressLocality: 'Algorfa', addressRegion: 'Alicante', addressCountry: 'ES' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What schools are near Algorfa?', acceptedAnswer: { '@type': 'Answer', text: 'El Limonar International School (20 min), Kings College Alicante (45 min), and several Spanish public schools in nearby towns. Most expat families choose El Limonar for British curriculum.' }},
    { '@type': 'Question', name: 'Is Algorfa safe?', acceptedAnswer: { '@type': 'Answer', text: 'Algorfa is very safe with low crime rates typical of small Spanish villages. La Finca Golf resort has additional security. Most crime is petty theft in tourist areas, not residential Algorfa.' }},
    { '@type': 'Question', name: 'What is the cost of living in Algorfa?', acceptedAnswer: { '@type': 'Answer', text: 'Monthly costs: IBI tax €400-800/year, community fees €50-150/month, utilities €100-200/month, groceries 20-30% cheaper than UK. Overall 30-40% lower than coastal resorts.' }},
    { '@type': 'Question', name: 'Is there an expat community in Algorfa?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, large British and Scandinavian expat community centered around La Finca Golf. Active Facebook groups, social clubs, and regular events. Easy to integrate.' }},
  ],
};

// Property data - La Finca Golf properties FIRST
const golfProperties = [
  // La Finca Golf properties (prioritized for this area)
  { reference: 'N7666', title: 'Oasis Villas La Finca', price: 445000, type: 'Villa', bedrooms: 3, bathrooms: 3, builtArea: 140, location: 'La Finca Golf Resort', image: 'https://fotos15.apinmo.com/7515/20011159/9-1.jpg', features: ['Private Pool', 'Frontline Golf', 'Solarium'], status: 'key-ready' as const, badge: 'La Finca', slug: 'oasis-villas-la-finca' },
  { reference: 'N8806', title: 'Arena Golf Villa', price: 465000, type: 'Villa', bedrooms: 3, bathrooms: 3, builtArea: 160, location: 'La Finca Golf', image: 'https://fotos15.apinmo.com/7515/24361541/10-1.jpg', features: ['Private Pool', 'Golf Views', 'Modern Design'], status: 'key-ready' as const, badge: 'New Build', slug: 'arena-golf' },
  { reference: 'N8094', title: 'La Vista Apartment', price: 164425, type: 'Apartment', bedrooms: 2, bathrooms: 2, builtArea: 65, location: 'La Finca Golf', image: 'https://fotos15.apinmo.com/7515/21616952/3-1.jpg', features: ['Communal Pool', 'Near Clubhouse', 'Terrace'], status: 'key-ready' as const, badge: 'Great Value', slug: 'la-vista' },
  // Nearby golf properties (secondary)
  { reference: 'N6034', title: 'Vega Golf Villa', price: 598000, type: 'Villa', bedrooms: 3, bathrooms: 3, builtArea: 180, location: 'Vistabella Golf', image: 'https://fotos15.apinmo.com/7515/13526381/24-1.jpg', features: ['Private Pool', 'Frontline Golf', 'Underbuild'], status: 'key-ready' as const, badge: 'Premium', slug: 'vega-golf' },
  { reference: 'N6673', title: 'Orange Valley Villa', price: 399000, type: 'Villa', bedrooms: 3, bathrooms: 3, builtArea: 150, location: 'Lo Romero Golf', image: 'https://fotos15.apinmo.com/7515/16689067/12-1.jpg', features: ['Private Pool', 'Golf Views', 'Garage'], status: 'key-ready' as const, badge: 'Nearby Golf', slug: 'orange-valley' },
  { reference: 'N7417', title: 'Luxury Oceanic Villa', price: 599000, type: 'Villa', bedrooms: 4, bathrooms: 3, builtArea: 200, location: 'La Marquesa Golf', image: 'https://fotos15.apinmo.com/7515/19432786/9-1.jpg', features: ['Private Pool', 'Golf Views', '4 Bedrooms'], status: 'key-ready' as const, badge: 'Luxury', slug: 'oceanic-villas' },
];

// Essential amenities with external links (important for SEO)
const essentialAmenities = {
  beaches: [
    { name: 'Playa de Guardamar', googleMaps: 'https://maps.google.com/?q=Playa+de+Guardamar+del+Segura', distance: '15 min', description: 'Beautiful dune-backed beach with crystal-clear water. Blue flag, natural shade from pine forest.' },
    { name: 'Playa de La Mata', googleMaps: 'https://maps.google.com/?q=Playa+de+La+Mata+Torrevieja', distance: '20 min', description: 'Long natural beach with protected dunes. Less crowded, great for walks.' },
    { name: 'Playa del Cura (Torrevieja)', googleMaps: 'https://maps.google.com/?q=Playa+del+Cura+Torrevieja', distance: '25 min', description: 'Urban beach with promenade, restaurants, full facilities.' },
  ],
  healthcare: {
    name: 'Hospital Universitario de Torrevieja',
    googleMaps: 'https://maps.google.com/?q=Hospital+de+Torrevieja',
    website: 'https://torrevieja-salud.com/',
    distance: '15 km (18 min)',
    description: 'Full-service hospital with 24hr emergency, English-speaking staff. Private and public options.',
  },
  airport: {
    name: 'Alicante-Elche Miguel Hernández Airport',
    googleMaps: 'https://maps.google.com/?q=Alicante+Airport',
    website: 'https://www.alicante-airport.net/',
    code: 'ALC',
    distance: '40 km (30 min)',
    description: 'Major international airport with flights to all European destinations. Easy motorway access.',
  },
  shopping: {
    name: 'Zenia Boulevard',
    googleMaps: 'https://maps.google.com/?q=Zenia+Boulevard',
    website: 'https://www.zeniaboulevard.es/',
    distance: '25 min',
    description: 'One of Europe\'s largest open-air shopping centres. 150+ stores, restaurants, cinema.',
  },
  golf: {
    name: 'La Finca Golf Resort',
    googleMaps: 'https://maps.google.com/?q=La+Finca+Golf+Algorfa',
    website: 'https://www.lafincagolf.com/',
    distance: 'In Algorfa',
    description: 'Championship 18-hole course designed by Pepe Gancedo. Clubhouse, restaurant, pro shop.',
  },
};

// Schools data
const schools = [
  { name: 'El Limonar International School', type: 'British International', distance: '20 min', location: 'Villamartín', curriculum: 'British (GCSE, A-Level)', fees: '€5,000-8,000/year', ages: '3-18', url: 'https://www.ellimonarinternational.com/', note: 'Most popular choice for expat families. Excellent results, strong community.' },
  { name: 'Kings College Alicante', type: 'British International', distance: '45 min', location: 'Alicante', curriculum: 'British (IB available)', fees: '€8,000-12,000/year', ages: '2-18', url: 'https://alicante.kingscollegeschools.org/', note: 'Premium option with IB programme. Worth the drive for some families.' },
  { name: 'CEIP Virgen del Rosario', type: 'Spanish Public', distance: '5 min', location: 'Algorfa', curriculum: 'Spanish National', fees: 'Free', ages: '3-12', note: 'Local village school. Good for Spanish immersion. Small class sizes.' },
  { name: 'IES Thader', type: 'Spanish Public Secondary', distance: '15 min', location: 'Orihuela', curriculum: 'Spanish National', fees: 'Free', ages: '12-18', note: 'Well-regarded secondary school serving the region.' },
];

// Local markets with Google Maps links
const markets = [
  { name: 'Rojales Sunday Market', day: 'Sunday', time: '9am - 2pm', type: 'General/Flea', distance: '10 min', description: 'Huge expat favorite! Hundreds of stalls selling everything from clothes to plants to antiques. Great atmosphere, live music, English spoken everywhere.', googleMaps: 'https://maps.google.com/?q=Mercadillo+Rojales+Sunday+Market' },
  { name: 'Guardamar Wednesday Market', day: 'Wednesday', time: '8am - 1pm', type: 'General', distance: '15 min', description: 'Traditional Spanish market with fresh produce, fish, clothes, and household goods. More local feel than Rojales.', googleMaps: 'https://maps.google.com/?q=Mercado+Guardamar+del+Segura' },
  { name: 'Torrevieja Friday Market', day: 'Friday', time: '8am - 2pm', type: 'General', distance: '20 min', description: 'Large market near the seafront. Great for fresh fish, fruit, and Spanish products. Busier in summer.', googleMaps: 'https://maps.google.com/?q=Mercadillo+Torrevieja' },
  { name: 'La Mata Saturday Market', day: 'Saturday', time: '9am - 1pm', type: 'Street Market', distance: '18 min', description: 'Smaller, more relaxed market. Good mix of produce and general goods.', googleMaps: 'https://maps.google.com/?q=Mercado+La+Mata+Torrevieja' },
];

// Local events & fiestas
const events = [
  { name: 'Fiestas Patronales de Algorfa', when: 'August (around 15th)', description: 'Village patron saint festival. Street parties, music, fireworks, bull-running, and traditional events. The whole village celebrates for a week. Amazing experience.' },
  { name: 'Moors & Christians', when: 'Various dates (nearby towns)', description: 'Spectacular costumed parades reenacting the historical battles. Nearby Orihuela and Guardamar have impressive celebrations. Worth seeing!' },
  { name: 'Semana Santa (Easter)', when: 'March/April', description: 'Solemn religious processions through nearby towns. Orihuela has particularly impressive celebrations dating back centuries.' },
  { name: 'La Finca Golf Tournament Season', when: 'Oct - May', description: 'Regular competitions and social events at the golf club. Great way to meet the community. Member and open events available.' },
  { name: 'Torrevieja Habaneras Festival', when: 'August', description: 'International choral music festival. Free concerts on the seafront. Beautiful summer evenings with world-class performances.' },
  { name: 'Noche de San Juan', when: 'June 23rd', description: 'Midsummer beach bonfires! Head to Guardamar or Torrevieja beaches for all-night parties, fireworks, and traditional jumping over fires for good luck.' },
];

// Cost of living data
const costOfLiving = [
  { category: 'Property Tax (IBI)', cost: '€400 - €800/year', notes: 'Based on cadastral value. Algorfa rates are lower than coastal towns.' },
  { category: 'Community Fees', cost: '€50 - €150/month', notes: 'Varies by development. La Finca averages €80-120. Includes pool, gardens, security.' },
  { category: 'Utilities (Electric/Water)', cost: '€100 - €200/month', notes: 'Higher in summer (AC). Solar panels common on new builds, reducing costs.' },
  { category: 'Internet + Mobile', cost: '€50 - €80/month', notes: 'Fibre available in most areas. Movistar, Orange, Vodafone all operate.' },
  { category: 'Weekly Shop (2 people)', cost: '€80 - €120', notes: 'Mercadona, Lidl, Consum nearby. 20-30% cheaper than UK.' },
  { category: 'Dining Out (meal for 2)', cost: '€30 - €50', notes: 'Menu del día at local restaurants €10-15 per person. Excellent value.' },
  { category: 'Golf Membership (La Finca)', cost: '€1,500 - €3,000/year', notes: 'Various membership levels. Significant discount vs green fee rates.' },
  { category: 'Health Insurance', cost: '€80 - €150/month', notes: 'Private cover recommended. Sanitas, Adeslas popular with expats.' },
];

// Expat community info
const expatInfo = {
  population: 'Approx. 40% international residents in La Finca area',
  nationalities: 'Predominantly British, Scandinavian (Norwegian, Swedish), Belgian, Dutch, German',
  language: 'English widely spoken in La Finca, golf club, and expat businesses. Basic Spanish helpful for village life.',
  facebookGroups: ['La Finca Golf Community', 'Algorfa Expats', 'Vega Baja Expats', 'Costa Blanca South British'],
  socialClubs: ['La Finca Golf Ladies & Mens sections', 'Walking groups', 'Book clubs', 'Various nationality clubs'],
  integration: 'Easy to integrate through golf club, which is the social hub. Regular quiz nights, competitions, and dinners. Village fiestas welcome everyone.',
};

// Nature & outdoor activities
const outdoorActivities = [
  { name: 'Guardamar Dunes & Pine Forest', type: 'Nature Reserve', distance: '15 min', description: 'Beautiful dune system with 800 hectares of planted pine forest. Walking trails, cycling paths, stunning beach access. Unique ecosystem.' },
  { name: 'Pink Salt Lakes (Torrevieja)', type: 'Natural Wonder', distance: '20 min', description: 'Famous pink-hued salt lakes. Great for photos, mud treatments, and birdwatching (flamingos!). Unique to this region.' },
  { name: 'La Mata Natural Park', type: 'Nature Reserve', distance: '18 min', description: 'Wetland reserve with walking trails, birdwatching hides, and pristine beach. Quieter alternative to main beaches.' },
  { name: 'Cycling Routes', type: 'Sport', distance: 'From door', description: 'Flat terrain perfect for cycling. Via Verde greenway nearby. Many expats cycle regularly. Bike hire available.' },
  { name: 'Vía Verde del Maigmó', type: 'Trail', distance: '35 min', description: 'Former railway line converted to cycling/walking path. Tunnels, bridges, mountain scenery. Popular day trip.' },
  { name: 'Sierra de Orihuela', type: 'Hiking', distance: '25 min', description: 'Dramatic mountain hiking close to coast. Various difficulty trails. Spectacular views over the Vega Baja.' },
];

// All FAQs
const faqs = [
  { question: 'What schools are near Algorfa?', answer: 'El Limonar International School (British curriculum) is 20 minutes away in Villamartín - the most popular choice for expat families. Kings College Alicante offers IB programme (45 min). Local Spanish schools include CEIP Virgen del Rosario in Algorfa village (free, good for language immersion). Most families with school-age children choose El Limonar for its excellent results and strong community.' },
  { question: 'Is Algorfa safe to live?', answer: 'Yes, Algorfa is very safe. Crime rates are typical of small Spanish villages - essentially minimal. La Finca Golf resort has additional security measures. Most crime in the region is petty theft targeting tourists in busy coastal areas, not residential areas like Algorfa. Neighbors look out for each other, and the community feel adds to security.' },
  { question: 'What is the cost of living in Algorfa compared to the coast?', answer: 'Algorfa is 30-40% cheaper than coastal resorts. Property taxes (IBI) are lower, community fees average €80-120/month (vs €150-250 on coast), and local restaurants are more affordable. Groceries are similar throughout the region. You will need a car, so factor in €100-150/month for fuel. Overall, a couple can live comfortably on €1,500-2,000/month excluding mortgage.' },
  { question: 'Is there fibre internet in Algorfa?', answer: 'Yes, fibre optic internet is available in most of Algorfa and La Finca Golf. Movistar, Orange, and Vodafone all offer services. Speeds up to 600Mbps available. Mobile coverage is excellent with all Spanish networks. Working from home is very feasible.' },
  { question: 'What is the expat community like in Algorfa?', answer: 'Large and welcoming! Around 40% of La Finca residents are international - predominantly British, Scandinavian, Belgian, and Dutch. The golf club is the social hub with regular events, quiz nights, and competitions. Several Facebook groups help newcomers. English is widely spoken in the resort area. Integration is easy, especially if you play golf.' },
  { question: 'What local markets are near Algorfa?', answer: 'Rojales Sunday Market (10 min) is a huge expat favorite with hundreds of stalls. Guardamar Wednesday Market (15 min) is more traditionally Spanish. Torrevieja Friday Market (20 min) is great for fresh fish. These markets are social events as much as shopping - you will bump into neighbors!' },
  { question: 'What are the best restaurants near Algorfa?', answer: 'La Finca Golf clubhouse offers excellent dining with views. In Algorfa village, Bar Alejandro and Casa Pepe serve authentic Spanish food. Nearby Rojales has El Mesón (great tapas), La Herradura (paella), and Quesada has numerous expat-friendly restaurants. For seafood, head to Guardamar or Santa Pola.' },
  { question: 'Do I need a car in Algorfa?', answer: 'Yes, a car is essential. Algorfa is inland without public transport to the coast. However, many residents find this a worthwhile trade-off for the peace, value, and lifestyle. Roads are excellent, parking is free, and you are only 15-30 minutes from beaches, airports, and shopping.' },
  { question: 'What about healthcare in Algorfa?', answer: 'Hospital Universitario de Torrevieja (18 min) has excellent facilities and English-speaking staff. Algorfa has a local health center for routine care. Many expats take private insurance (Sanitas, Adeslas - €80-150/month) for faster access and English service. Pharmacies in village and nearby towns. Emergency response is quick.' },
  { question: 'When is the best time to buy in Algorfa?', answer: 'Year-round, but autumn (Sept-Nov) often sees motivated sellers and less competition. Spring (March-May) is popular for viewings with pleasant weather. Summer can be slow. Winter has fewer buyers but also less stock. New developments launch regularly - get on mailing lists for early access to best plots.' },
  { question: 'What outdoor activities are there beyond golf?', answer: 'Plenty! Guardamar Dunes offer beautiful walks and cycling. Pink Salt Lakes of Torrevieja are unique. La Mata Natural Park has birdwatching. Via Verde trails for cycling. Sierra de Orihuela for hiking. Beaches 15 min away. Padel courts, tennis, gyms in nearby towns. The climate supports outdoor life year-round.' },
  { question: 'What local fiestas should I know about?', answer: 'Algorfa Fiestas Patronales (mid-August) is the big village celebration - week of parties, music, fireworks. Moors & Christians parades in nearby towns are spectacular. Semana Santa (Easter) processions in Orihuela. Noche de San Juan (June 23) beach bonfires. La Finca Golf has its own social calendar throughout the year.' },
];

// Market context for investment section
const marketContext = {
  spainOverview: 'Spain remains one of Europe\'s most attractive property markets for international buyers. Post-pandemic demand has driven sustained price growth, particularly in coastal regions. The Costa Blanca South benefits from excellent infrastructure, established expat communities, and year-round appeal. Spanish property law offers strong buyer protections, and the Golden Visa program (€500k+) provides residency options for non-EU buyers.',
  regionalTrends: 'Costa Blanca South has seen 8-12% annual price growth since 2021. The Vega Baja region (including Algorfa) offers exceptional value compared to the saturated Northern Costa Blanca. Golf properties outperform the general market due to limited supply and consistent international demand.',
  localDevelopments: 'La Finca Golf continues to attract new development with Contrimar\'s Oasis villa series expanding. New infrastructure improvements including road upgrades and the planned Torrevieja hospital expansion enhance the area\'s appeal. Several new phases planned for 2025-2026 indicate developer confidence.',
  futureOutlook: 'Algorfa is positioned for continued growth. Limited buildable land around La Finca Golf constrains supply while demand from golf-focused buyers remains strong. The extended golf season (11+ months playable) differentiates this area from seasonal coastal markets. Expect 5-8% annual appreciation.',
  priceGrowth5Year: '+42%',
  foreignBuyerPercent: '38%',
  averageDaysOnMarket: '45',
};

// Map locations with real coordinates for interactive Leaflet map
const mapLocations = [
  { id: 'la-finca', name: 'La Finca Golf', type: 'golf' as const, coordinates: [38.0647, -0.7928] as [number, number], distance: 'In Algorfa', description: 'Championship 18-hole course designed by Pepe Gancedo', googleMapsLink: 'https://maps.google.com/?q=La+Finca+Golf+Resort+Algorfa', internalLink: '/golf/la-finca' },
  { id: 'vistabella', name: 'Vistabella Golf', type: 'golf' as const, coordinates: [38.0420, -0.8050] as [number, number], distance: '8 min', description: 'Modern 18-hole course with great views', googleMapsLink: 'https://maps.google.com/?q=Vistabella+Golf', internalLink: '/golf/vistabella' },
  { id: 'la-marquesa', name: 'La Marquesa Golf', type: 'golf' as const, coordinates: [38.0100, -0.8280] as [number, number], distance: '10 min', description: 'Challenging 18-hole layout', googleMapsLink: 'https://maps.google.com/?q=La+Marquesa+Golf', internalLink: '/golf/la-marquesa' },
  { id: 'lo-romero', name: 'Lo Romero Golf', type: 'golf' as const, coordinates: [37.9567, -0.7850] as [number, number], distance: '15 min', description: 'Scenic inland course', googleMapsLink: 'https://maps.google.com/?q=Lo+Romero+Golf', internalLink: '/golf/lo-romero' },
  { id: 'guardamar-beach', name: 'Playa de Guardamar', type: 'beach' as const, coordinates: [38.0892, -0.6553] as [number, number], distance: '15 min', description: 'Dune-backed Blue Flag beach with pine forest', googleMapsLink: 'https://maps.google.com/?q=Playa+de+Guardamar+del+Segura' },
  { id: 'la-mata-beach', name: 'Playa de La Mata', type: 'beach' as const, coordinates: [38.0134, -0.6483] as [number, number], distance: '20 min', description: 'Natural beach with protected dunes', googleMapsLink: 'https://maps.google.com/?q=Playa+de+La+Mata+Torrevieja' },
  { id: 'torrevieja-beach', name: 'Torrevieja Beaches', type: 'beach' as const, coordinates: [37.9789, -0.6822] as [number, number], distance: '25 min', description: 'Urban beaches, full facilities & promenade', googleMapsLink: 'https://maps.google.com/?q=Playa+del+Cura+Torrevieja' },
  { id: 'hospital', name: 'Hospital Torrevieja', type: 'hospital' as const, coordinates: [37.9780, -0.6847] as [number, number], distance: '18 min', description: '24hr emergency, English-speaking staff', googleMapsLink: 'https://maps.google.com/?q=Hospital+de+Torrevieja' },
  { id: 'airport', name: 'Alicante Airport', type: 'airport' as const, coordinates: [38.2822, -0.5582] as [number, number], distance: '30 min', description: 'International flights to all Europe', googleMapsLink: 'https://maps.google.com/?q=Alicante+Airport' },
  { id: 'zenia', name: 'Zenia Boulevard', type: 'shopping' as const, coordinates: [37.9150, -0.7464] as [number, number], distance: '25 min', description: '150+ stores, restaurants, cinema', googleMapsLink: 'https://maps.google.com/?q=Zenia+Boulevard' },
  { id: 'el-limonar', name: 'El Limonar School', type: 'school' as const, coordinates: [37.9383, -0.7925] as [number, number], distance: '20 min', description: 'British International School (GCSE, A-Level)', googleMapsLink: 'https://maps.google.com/?q=El+Limonar+International+School' },
  { id: 'rojales-market', name: 'Rojales Sunday Market', type: 'market' as const, coordinates: [38.0817, -0.7247] as [number, number], distance: '10 min', description: 'Huge expat favorite! 100s of stalls', googleMapsLink: 'https://maps.google.com/?q=Mercadillo+Rojales+Sunday+Market' },
];

export default function AlgorfaPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Areas', url: 'https://newbuildhomescostablanca.com/areas/' },
    { name: 'Algorfa', url: 'https://newbuildhomescostablanca.com/areas/algorfa/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center bg-primary-900">
          <div className="absolute inset-0">
            <Image
              src="https://fotos15.apinmo.com/7515/20011159/9-1.jpg"
              alt="La Finca Golf Resort villa with pool - Algorfa, Costa Blanca"
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/80 to-primary-900/60" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
            <nav className="text-white/60 text-sm mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/areas" className="hover:text-white transition-colors">Areas</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Algorfa & La Finca Golf</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-block bg-accent-500 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6">
                Costa Blanca South • Golf Lifestyle
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
                Living in <span className="font-semibold">Algorfa</span><br />
                <span className="text-accent-400">& La Finca Golf</span>
              </h1>

              <p className="text-xl text-warm-300 mb-4 leading-relaxed">
                The complete guide to golf lifestyle living in Costa Blanca South. Championship golf,
                new build villas 30% below coastal prices, and a thriving international community.
              </p>
              <p className="text-lg text-warm-400 mb-8">
                Just 15 minutes to Guardamar beaches • 30 minutes to Alicante Airport • 300+ days of sunshine
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <span className="text-2xl">⛳</span>
                  <p className="text-white font-semibold mt-1">4+ Golf Courses</p>
                  <p className="text-white/60 text-sm">Within 15 min</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <span className="text-2xl">🏫</span>
                  <p className="text-white font-semibold mt-1">Int&apos;l Schools</p>
                  <p className="text-white/60 text-sm">British curriculum</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <span className="text-2xl">👥</span>
                  <p className="text-white font-semibold mt-1">40% Expat</p>
                  <p className="text-white/60 text-sm">International community</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <span className="text-accent-400 font-bold text-xl">€195k</span>
                  <p className="text-white font-semibold mt-1">From</p>
                  <p className="text-white/60 text-sm">New builds</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="#properties" className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                  View Properties
                </Link>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg transition-colors backdrop-blur-sm border border-white/20">
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="bg-white border-b border-warm-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-1 overflow-x-auto py-3 text-sm font-medium">
              <a href="#lifestyle" className="px-4 py-2 rounded-full bg-warm-100 hover:bg-accent-100 text-warm-700 hover:text-accent-700 whitespace-nowrap transition-colors">Lifestyle</a>
              <a href="#developments" className="px-4 py-2 rounded-full hover:bg-warm-100 text-warm-600 whitespace-nowrap transition-colors">Developments</a>
              <a href="#schools" className="px-4 py-2 rounded-full hover:bg-warm-100 text-warm-600 whitespace-nowrap transition-colors">Schools</a>
              <a href="#costs" className="px-4 py-2 rounded-full hover:bg-warm-100 text-warm-600 whitespace-nowrap transition-colors">Costs</a>
              <a href="#amenities" className="px-4 py-2 rounded-full hover:bg-warm-100 text-warm-600 whitespace-nowrap transition-colors">Amenities</a>
              <a href="#markets" className="px-4 py-2 rounded-full hover:bg-warm-100 text-warm-600 whitespace-nowrap transition-colors">Markets</a>
              <a href="#events" className="px-4 py-2 rounded-full hover:bg-warm-100 text-warm-600 whitespace-nowrap transition-colors">Events</a>
              <a href="#expat" className="px-4 py-2 rounded-full hover:bg-warm-100 text-warm-600 whitespace-nowrap transition-colors">Expat Life</a>
              <a href="#outdoor" className="px-4 py-2 rounded-full hover:bg-warm-100 text-warm-600 whitespace-nowrap transition-colors">Nature</a>
              <a href="#map" className="px-4 py-2 rounded-full hover:bg-warm-100 text-warm-600 whitespace-nowrap transition-colors">Map</a>
              <a href="#investment" className="px-4 py-2 rounded-full hover:bg-warm-100 text-warm-600 whitespace-nowrap transition-colors">Investment</a>
              <a href="#properties" className="px-4 py-2 rounded-full hover:bg-warm-100 text-warm-600 whitespace-nowrap transition-colors">Properties</a>
              <a href="#faqs" className="px-4 py-2 rounded-full hover:bg-warm-100 text-warm-600 whitespace-nowrap transition-colors">FAQs</a>
            </div>
          </div>
        </section>

        {/* Lifestyle Overview */}
        <section id="lifestyle" className="py-16 bg-white scroll-mt-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">The Lifestyle</span>
                <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-6">
                  Why People Choose <span className="font-semibold">Algorfa</span>
                </h2>

                <div className="prose prose-lg text-warm-700 max-w-none">
                  <p>
                    <strong>Algorfa isn&apos;t trying to be a resort town.</strong> That&apos;s exactly why people love it. This inland
                    municipality has grown organically around La Finca Golf Resort, attracting buyers who want the golf
                    lifestyle without the tourist crowds and inflated prices of the coast.
                  </p>
                  <p>
                    Life here revolves around the outdoors. Morning rounds of golf while the greens are still dewy.
                    Coffee at the clubhouse with friends you&apos;ve made through the weekly competitions. Afternoons by your
                    private pool - because at these prices, most villas have one. Evening drives to Guardamar for
                    seafood, or tapas in the village square where the barman knows your name.
                  </p>
                  <p>
                    The value proposition is hard to argue with: <strong>a 3-bedroom villa with pool and golf views costs
                    €350-400k here versus €550-650k in Villamartín or Campoamor</strong>. You&apos;re 15 minutes from the same
                    beaches, using the same airport. The only difference? Peace, quiet, and money in your pocket.
                  </p>
                  <p>
                    Yes, you&apos;ll need a car. For most buyers - especially golfers who travel with clubs - that&apos;s barely
                    a consideration. Roads are excellent, parking is free, and the driving is stress-free compared to
                    anywhere in northern Europe.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div className="bg-accent-50 rounded-2xl p-6">
                  <h3 className="font-bold text-primary-900 text-lg mb-4">At a Glance</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-warm-600">Population</span><span className="font-semibold text-primary-900">~4,500</span></div>
                    <div className="flex justify-between"><span className="text-warm-600">Expat %</span><span className="font-semibold text-primary-900">~40% (La Finca)</span></div>
                    <div className="flex justify-between"><span className="text-warm-600">To Beach</span><span className="font-semibold text-primary-900">15 min</span></div>
                    <div className="flex justify-between"><span className="text-warm-600">To Airport</span><span className="font-semibold text-primary-900">30 min</span></div>
                    <div className="flex justify-between"><span className="text-warm-600">Golf Courses (15 min)</span><span className="font-semibold text-primary-900">4+</span></div>
                    <div className="flex justify-between"><span className="text-warm-600">Sunny Days/Year</span><span className="font-semibold text-primary-900">300+</span></div>
                    <div className="flex justify-between"><span className="text-warm-600">Property From</span><span className="font-semibold text-accent-600">€165,000</span></div>
                  </div>
                </div>

                <div className="bg-warm-50 rounded-2xl p-6">
                  <h3 className="font-bold text-primary-900 text-lg mb-4">Golf Courses Nearby</h3>

                  {/* Featured: La Finca Golf */}
                  <Link href="/golf/la-finca" className="block bg-accent-500 text-white rounded-xl p-4 mb-4 hover:bg-accent-600 transition-colors group">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wide text-white/80">Featured Course</span>
                        <h4 className="font-bold text-lg">La Finca Golf Resort</h4>
                        <p className="text-white/80 text-sm mt-1">Championship 18-hole course by Pepe Gancedo. Clubhouse, restaurant, pro shop. The social hub of the community.</p>
                      </div>
                      <span className="text-white/60 group-hover:text-white transition-colors">→</span>
                    </div>
                    <div className="flex gap-3 mt-3 text-xs">
                      <span className="bg-white/20 px-2 py-1 rounded">18 Holes</span>
                      <span className="bg-white/20 px-2 py-1 rounded">Par 72</span>
                      <span className="bg-white/20 px-2 py-1 rounded">In Algorfa</span>
                    </div>
                  </Link>

                  {/* Other nearby courses */}
                  <div className="space-y-2">
                    {[
                      { name: 'Vistabella Golf', slug: 'vistabella', time: '8 min', holes: 18 },
                      { name: 'La Marquesa Golf', slug: 'la-marquesa', time: '10 min', holes: 18 },
                      { name: 'Lo Romero Golf', slug: 'lo-romero', time: '15 min', holes: 18 },
                    ].map((course) => (
                      <Link
                        key={course.name}
                        href={`/golf/${course.slug}`}
                        className="flex justify-between items-center hover:bg-warm-100 rounded-lg p-2 -mx-2 transition-colors"
                      >
                        <span className="text-warm-700 hover:text-accent-600">{course.name}</span>
                        <span className="text-warm-500 text-sm">{course.holes}H • {course.time}</span>
                      </Link>
                    ))}
                  </div>

                  <Link href="/golf" className="block text-center text-accent-600 hover:text-accent-700 font-medium text-sm mt-4 pt-3 border-t border-warm-200">
                    View All Golf Courses →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Build Developments Section */}
        <AreaDevelopments
          areaName="Algorfa"
          areaSlug="algorfa"
          maxDevelopments={6}
          showLifestyleGuide={true}
          relatedBlogPosts={[
            { slug: 'why-buy-new-build-spain', title: 'Why Buy New Build in Spain?', description: 'Bank guarantees, warranties, and what to expect.' },
            { slug: 'la-finca-golf-guide', title: 'La Finca Golf: Complete Guide', description: 'Everything about the resort and community.' },
            { slug: 'off-plan-buying-guide', title: 'Buying Off-Plan in Spain', description: 'Payment schedules, contracts, and protection.' },
          ]}
        />

        {/* Properties Section */}
        <ParallaxPropertySection
          title="Golf Properties at La Finca"
          subtitle="Featured Villas"
          narrative="New build developments from established Spanish builders offer modern Mediterranean villas with private pools, landscaped gardens, and direct golf course access. Prices start from €300,000 for detached villas—30-40% below what you'd pay for equivalent properties on the coast."
          backgroundImage="/images/areas/algorfa-golf-villas.webp"
          properties={golfProperties}
          ctaText="View All Golf Properties"
          ctaLink="/golf"
          theme="dark"
        />

        {/* Schools Section */}
        <section id="schools" className="py-16 bg-white scroll-mt-16">
          <div className="max-w-7xl mx-auto px-6">
            <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Education</span>
            <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-4">
              Schools Near <span className="font-semibold">Algorfa</span>
            </h2>
            <p className="text-warm-600 text-lg mb-10 max-w-3xl">
              Families with children have several excellent options, from British international schools with
              GCSE and A-Level curricula to local Spanish schools for full immersion.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {schools.map((school) => (
                <div key={school.name} className="bg-warm-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-primary-900 text-lg">{school.name}</h3>
                      <p className="text-accent-600 text-sm font-medium">{school.type}</p>
                    </div>
                    <span className="bg-white text-warm-600 text-sm px-3 py-1 rounded-full">{school.distance}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div><span className="text-warm-500">Curriculum:</span> <span className="text-warm-700">{school.curriculum}</span></div>
                    <div><span className="text-warm-500">Ages:</span> <span className="text-warm-700">{school.ages}</span></div>
                    <div><span className="text-warm-500">Fees:</span> <span className="text-warm-700">{school.fees}</span></div>
                    <div><span className="text-warm-500">Location:</span> <span className="text-warm-700">{school.location}</span></div>
                  </div>
                  <p className="text-warm-600 text-sm">{school.note}</p>
                  {school.url && (
                    <a href={school.url} target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:text-accent-700 text-sm font-medium mt-3 inline-block">
                      Visit website →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cost of Living Section */}
        <section id="costs" className="py-16 bg-warm-50 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-6">
            <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Finances</span>
            <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-4">
              Cost of Living in <span className="font-semibold">Algorfa</span>
            </h2>
            <p className="text-warm-600 text-lg mb-10 max-w-3xl">
              One of the key advantages of inland living: <strong>costs are 30-40% lower than coastal resorts</strong>.
              Here&apos;s what to budget for monthly and annual expenses.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {costOfLiving.map((item) => (
                <div key={item.category} className="bg-white rounded-xl p-5 shadow-sm">
                  <h3 className="font-semibold text-primary-900 mb-1">{item.category}</h3>
                  <p className="text-accent-600 font-bold text-lg mb-2">{item.cost}</p>
                  <p className="text-warm-500 text-sm">{item.notes}</p>
                </div>
              ))}
            </div>

            <div className="bg-accent-500 text-white rounded-2xl p-8">
              <h3 className="font-bold text-xl mb-4">💡 Budget Summary for Couple</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-white/70 text-sm uppercase tracking-wide mb-1">Comfortable Living</p>
                  <p className="text-3xl font-bold">€1,500-2,000<span className="text-lg font-normal">/month</span></p>
                  <p className="text-white/70 text-sm mt-1">Excluding mortgage/rent</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm uppercase tracking-wide mb-1">With Golf Membership</p>
                  <p className="text-3xl font-bold">€1,800-2,300<span className="text-lg font-normal">/month</span></p>
                  <p className="text-white/70 text-sm mt-1">Including La Finca membership</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm uppercase tracking-wide mb-1">Savings vs. Coast</p>
                  <p className="text-3xl font-bold">€500-800<span className="text-lg font-normal">/month</span></p>
                  <p className="text-white/70 text-sm mt-1">Lower taxes, fees, dining</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Markets Section */}
        <section id="markets" className="scroll-mt-16">
          {/* Market Image Banner */}
          <div className="relative h-64 md:h-80">
            <Image
              src={getImageUrl(marketFoodImages[0], 1920)}
              alt={marketFoodImages[0].alt}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/70 to-primary-900/40" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-6 w-full">
                <span className="text-accent-400 text-sm font-semibold uppercase tracking-wide">Shopping & Social</span>
                <h2 className="text-3xl lg:text-4xl font-light text-white mt-2 mb-4">
                  Local <span className="font-semibold">Markets</span>
                </h2>
                <p className="text-warm-300 text-lg max-w-2xl">
                  Weekly markets are a highlight of expat life. Part shopping, part social event—you&apos;ll bump into
                  half the neighborhood and discover everything from fresh produce to antiques.
                </p>
              </div>
            </div>
          </div>

          <div className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-6">
                {markets.map((market) => (
                  <div key={market.name} className="flex gap-4 bg-warm-50 rounded-xl p-5">
                    <div className="flex-shrink-0 w-16 h-16 bg-accent-100 rounded-xl flex flex-col items-center justify-center">
                      <span className="text-accent-700 text-xs font-bold uppercase">{market.day.slice(0, 3)}</span>
                      <span className="text-accent-600 text-lg">🛒</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-primary-900">{market.name}</h3>
                      <p className="text-warm-500 text-sm mb-2">{market.time} • {market.distance} drive</p>
                      <p className="text-warm-600 text-sm mb-2">{market.description}</p>
                      <a
                        href={market.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-600 hover:text-accent-700 text-sm font-medium inline-flex items-center gap-1"
                      >
                        📍 Get Directions
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Essential Amenities Section - with external links for SEO */}
        <section id="amenities" className="py-16 bg-warm-50 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-6">
            <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Essential Amenities</span>
            <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-4">
              Beaches, Healthcare & <span className="font-semibold">Connections</span>
            </h2>
            <p className="text-warm-600 text-lg mb-10 max-w-3xl">
              Everything you need is within easy reach. Beautiful beaches, excellent healthcare, international
              airport, and major shopping—all accessible in under 30 minutes.
            </p>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Beaches Card */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                {/* Beach Image Header */}
                <div className="relative h-40">
                  <Image
                    src={getImageUrl(beachImages[0], 800)}
                    alt={beachImages[0].alt}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="text-2xl">🏖️</span>
                    <h3 className="font-bold text-white text-xl">Nearest Beaches</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-warm-600 text-sm mb-4">
                    While Algorfa is inland, stunning beaches are just 15-25 minutes away. Guardamar offers
                    dune-backed natural beauty; Torrevieja has urban beaches with full facilities.
                  </p>
                  <div className="space-y-3">
                    {essentialAmenities.beaches.map((beach) => (
                      <a
                        key={beach.name}
                        href={beach.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-2 text-sm group"
                      >
                        <span className="text-accent-500">📍</span>
                        <div>
                          <span className="font-medium text-primary-900 group-hover:text-accent-600 transition-colors">
                            {beach.name}
                          </span>
                          <span className="text-warm-500 ml-2">({beach.distance})</span>
                          <p className="text-warm-500 text-xs mt-0.5">{beach.description}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Healthcare Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🏥</span>
                  <h3 className="font-bold text-primary-900 text-xl">Healthcare</h3>
                </div>
                <p className="text-warm-600 text-sm mb-4">
                  {essentialAmenities.healthcare.description}
                </p>
                <div className="bg-warm-50 rounded-xl p-4">
                  <p className="font-semibold text-primary-900">{essentialAmenities.healthcare.name}</p>
                  <p className="text-warm-500 text-sm mb-3">{essentialAmenities.healthcare.distance}</p>
                  <div className="flex gap-3">
                    <a
                      href={essentialAmenities.healthcare.googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-600 hover:text-accent-700 text-sm font-medium"
                    >
                      📍 View on Map
                    </a>
                    <a
                      href={essentialAmenities.healthcare.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-600 hover:text-accent-700 text-sm font-medium"
                    >
                      🌐 Website
                    </a>
                  </div>
                </div>
                <p className="text-warm-500 text-xs mt-4">
                  Local health centers in Algorfa for routine care. Private clinics and pharmacies nearby.
                </p>
              </div>

              {/* Airport Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">✈️</span>
                  <h3 className="font-bold text-primary-900 text-xl">Airport & Transport</h3>
                </div>
                <p className="text-warm-600 text-sm mb-4">
                  {essentialAmenities.airport.description}
                </p>
                <div className="bg-warm-50 rounded-xl p-4">
                  <p className="font-semibold text-primary-900">{essentialAmenities.airport.name}</p>
                  <p className="text-warm-500 text-sm mb-1">Code: {essentialAmenities.airport.code} • {essentialAmenities.airport.distance}</p>
                  <div className="flex gap-3 mt-3">
                    <a
                      href={essentialAmenities.airport.googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-600 hover:text-accent-700 text-sm font-medium"
                    >
                      📍 View on Map
                    </a>
                    <a
                      href={essentialAmenities.airport.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-600 hover:text-accent-700 text-sm font-medium"
                    >
                      🌐 Flight Info
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Golf & Shopping Row */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Golf */}
              <div className="bg-white rounded-xl p-5 shadow-sm flex gap-4">
                <span className="text-3xl">⛳</span>
                <div>
                  <h3 className="font-bold text-primary-900">{essentialAmenities.golf.name}</h3>
                  <p className="text-warm-500 text-sm">{essentialAmenities.golf.distance}</p>
                  <p className="text-warm-600 text-sm mt-2">{essentialAmenities.golf.description}</p>
                  <div className="flex gap-3 mt-3">
                    <a href={essentialAmenities.golf.googleMaps} target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:text-accent-700 text-sm font-medium">📍 Map</a>
                    <a href={essentialAmenities.golf.website} target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:text-accent-700 text-sm font-medium">🌐 Website</a>
                  </div>
                </div>
              </div>

              {/* Shopping */}
              <div className="bg-white rounded-xl p-5 shadow-sm flex gap-4">
                <span className="text-3xl">🛍️</span>
                <div>
                  <h3 className="font-bold text-primary-900">{essentialAmenities.shopping.name}</h3>
                  <p className="text-warm-500 text-sm">{essentialAmenities.shopping.distance}</p>
                  <p className="text-warm-600 text-sm mt-2">{essentialAmenities.shopping.description}</p>
                  <div className="flex gap-3 mt-3">
                    <a href={essentialAmenities.shopping.googleMaps} target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:text-accent-700 text-sm font-medium">📍 Map</a>
                    <a href={essentialAmenities.shopping.website} target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:text-accent-700 text-sm font-medium">🌐 Website</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events & Fiestas Section */}
        <section id="events" className="py-16 bg-white scroll-mt-16">
          <div className="max-w-7xl mx-auto px-6">
            <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Culture</span>
            <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-4">
              Events & <span className="font-semibold">Fiestas</span>
            </h2>
            <p className="text-warm-600 text-lg mb-10 max-w-3xl">
              Spain knows how to celebrate. From village patron saint festivals to spectacular Moors & Christians
              parades, there&apos;s always something happening nearby.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.name} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-accent-600 text-sm font-medium mb-2">{event.when}</p>
                  <h3 className="font-bold text-primary-900 text-lg mb-2">{event.name}</h3>
                  <p className="text-warm-600 text-sm">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Expat Community Section */}
        <section id="expat" className="py-16 bg-white scroll-mt-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Community</span>
                <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-6">
                  The <span className="font-semibold">Expat Community</span>
                </h2>

                <div className="prose prose-lg text-warm-700 max-w-none">
                  <p>
                    <strong>You won&apos;t feel like an outsider here.</strong> Around 40% of La Finca residents are
                    international—predominantly British, Scandinavian, Belgian, and Dutch. The golf club is the
                    natural social hub, but there&apos;s much more than golf bringing the community together.
                  </p>
                  <p>
                    Facebook groups like &quot;La Finca Golf Community&quot; and &quot;Vega Baja Expats&quot; are incredibly active—
                    newcomers get advice on everything from best plumbers to where to watch Premier League football.
                    Quiz nights at the clubhouse, walking groups, book clubs, nationality-specific social clubs...
                    there&apos;s no shortage of ways to meet people.
                  </p>
                  <p>
                    <strong>Language:</strong> English is widely spoken in the La Finca area and expat-oriented
                    businesses. For village life and dealing with Spanish bureaucracy, basic Spanish helps
                    enormously. Many expats take classes—it&apos;s a social activity in itself.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-warm-50 rounded-xl p-6">
                  <h3 className="font-bold text-primary-900 mb-4">Community Snapshot</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">🌍</span>
                      <div>
                        <p className="font-semibold text-primary-900">Main Nationalities</p>
                        <p className="text-warm-600 text-sm">{expatInfo.nationalities}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">💬</span>
                      <div>
                        <p className="font-semibold text-primary-900">Language</p>
                        <p className="text-warm-600 text-sm">{expatInfo.language}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">👥</span>
                      <div>
                        <p className="font-semibold text-primary-900">Social Clubs</p>
                        <p className="text-warm-600 text-sm">{expatInfo.socialClubs.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="font-bold text-primary-900 mb-3">📱 Facebook Groups to Join</h3>
                  <div className="flex flex-wrap gap-2">
                    {expatInfo.facebookGroups.map((group) => (
                      <span key={group} className="bg-white text-warm-700 text-sm px-3 py-1 rounded-full">
                        {group}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Day in the Life */}
        <DayInTheLife
          areaName="Algorfa"
          intro="What does daily life really look like? Here's a typical day for La Finca residents."
          timeline={[
            { time: '7:30 AM', title: 'Morning Coffee, Fairway Views', description: 'The terrace catches the first light. Coffee and quiet—just birdsong and the distant whir of mowers preparing the greens.', icon: '☕' },
            { time: '9:00 AM', title: 'Tee Time at La Finca', description: 'A leisurely walk to the clubhouse—no car needed. 18 holes with the regular group. The kind of unhurried golf retirement allows.', icon: '⛳' },
            { time: '1:30 PM', title: 'Clubhouse Lunch', description: 'Patatas bravas, cold beers, and debates about putts that should have dropped. The social heart of the community.', icon: '🍺' },
            { time: '4:00 PM', title: 'Pool Time', description: 'The afternoon heat calls for your private pool. The Mediterranean way respects the rhythm of the day.', icon: '🏊' },
            { time: '7:00 PM', title: 'Village Evening', description: 'Drive to Algorfa village for dinner. Local wine, familiar faces, evenings that make you forget you ever lived anywhere else.', icon: '🌅' },
          ]}
          featuredProperty={golfProperties[1]}
        />

        {/* Outdoor Activities Section */}
        <section id="outdoor" className="py-16 bg-warm-50 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-6">
            <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Beyond Golf</span>
            <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-4">
              Nature & <span className="font-semibold">Outdoor Activities</span>
            </h2>
            <p className="text-warm-600 text-lg mb-10 max-w-3xl">
              Golf might be the headline act, but there&apos;s plenty more to do outdoors. Natural parks, unique
              landscapes, and year-round sunshine make this a paradise for active lifestyles.
            </p>

            {/* Lifestyle Image Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="relative aspect-square rounded-xl overflow-hidden group">
                <Image
                  src={getImageUrl(golfImages[0], 600)}
                  alt={golfImages[0].alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white font-semibold text-sm">Golf</span>
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden group">
                <Image
                  src={getImageUrl(beachImages[3], 600)}
                  alt={beachImages[3].alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white font-semibold text-sm">Beaches</span>
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden group">
                <Image
                  src={getImageUrl(marinaImages[0], 600)}
                  alt={marinaImages[0].alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white font-semibold text-sm">Sailing</span>
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden group">
                <Image
                  src={getImageUrl(oldTownImages[0], 600)}
                  alt={oldTownImages[0].alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white font-semibold text-sm">Old Towns</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {outdoorActivities.map((activity) => (
                <div key={activity.name} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-primary-900">{activity.name}</h3>
                    <span className="bg-accent-100 text-accent-700 text-xs px-2 py-1 rounded-full">{activity.distance}</span>
                  </div>
                  <p className="text-accent-600 text-sm font-medium mb-2">{activity.type}</p>
                  <p className="text-warm-600 text-sm">{activity.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Area Map */}
        <InteractiveAreaMap
          areaName="Algorfa"
          centerCoordinates={[38.0647, -0.7928]}
          zoom={12}
          locations={mapLocations}
        />

        {/* Investment Analysis */}
        <InvestmentAnalysis
          areaName="Algorfa"
          priceData={[
            { type: '2-Bed Apartment', priceRange: '€160,000 - €220,000', avgPrice: 185000, trend: 'up', trendPercent: 6.2 },
            { type: '3-Bed Townhouse', priceRange: '€220,000 - €280,000', avgPrice: 245000, trend: 'up', trendPercent: 5.8 },
            { type: '3-Bed Villa with Pool', priceRange: '€300,000 - €450,000', avgPrice: 375000, trend: 'up', trendPercent: 7.5 },
            { type: '4-Bed Luxury Villa', priceRange: '€450,000 - €600,000', avgPrice: 525000, trend: 'stable', trendPercent: 3.2 },
          ]}
          comparisonAreas={[
            { name: 'Algorfa / La Finca', slug: 'algorfa', avgPrice: 375000, rentalYield: 6.8, distanceToBeach: '15 min', distanceToAirport: '30 min' },
            { name: 'Villamartín', slug: 'villamartin', avgPrice: 485000, rentalYield: 5.2, distanceToBeach: '10 min', distanceToAirport: '40 min' },
            { name: 'Campoamor', slug: 'campoamor', avgPrice: 525000, rentalYield: 5.5, distanceToBeach: '5 min', distanceToAirport: '45 min' },
            { name: 'Guardamar', slug: 'guardamar-del-segura', avgPrice: 295000, rentalYield: 5.0, distanceToBeach: '5 min', distanceToAirport: '35 min' },
          ]}
          rentalYield={{ shortTerm: '6-8%', longTerm: '4-5%', occupancy: '75-85%' }}
          investmentHighlights={[
            '30-40% cheaper than equivalent coastal golf properties',
            'Year-round rental demand from golf tourists (playable 11+ months)',
            'Strong capital appreciation—7%+ annually in recent years',
            'Established developers (Contrimar, Grupo Vapf) ensure build quality',
          ]}
          marketInsight="Algorfa represents exceptional value. While coastal golf developments command premium prices, La Finca offers the same quality at significantly lower entry points—with strong rental yields from the extended golf season."
          marketContext={marketContext}
        />

        {/* Full Property Grid */}
        <div id="properties">
          <FullWidthPropertyGrid
            title="Properties in Algorfa & La Finca"
            subtitle="New Build Homes"
            properties={golfProperties}
            showFilters={true}
            columns={3}
            ctaText="View All Properties"
            ctaLink="/developments?area=algorfa"
            theme="light"
          />
        </div>

        {/* FAQs */}
        <section id="faqs" className="py-16 bg-white scroll-mt-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Questions Answered</span>
              <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2">
                Algorfa <span className="font-semibold">FAQs</span>
              </h2>
              <p className="text-warm-600 mt-4">Everything you need to know about living in and buying property in Algorfa</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="group border border-warm-200 rounded-xl overflow-hidden">
                  <summary className="flex justify-between items-center cursor-pointer p-5 font-semibold text-primary-900 hover:bg-warm-50 transition-colors">
                    <span className="pr-4">{faq.question}</span>
                    <span className="text-warm-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-5 pb-5 text-warm-700 leading-relaxed border-t border-warm-100 pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
              Ready to Explore <span className="font-semibold">Algorfa?</span>
            </h2>
            <p className="text-warm-300 text-lg mb-8 max-w-2xl mx-auto">
              Let us show you La Finca Golf and the available properties. We&apos;ll arrange viewings,
              answer your questions, and help you find the perfect home in this exceptional location.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link href="/consultation" className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors inline-flex items-center gap-2">
                📅 Book Free Consultation
              </Link>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-8 py-4 rounded-lg transition-colors inline-flex items-center gap-2">
                💬 WhatsApp
              </a>
              <a href={`tel:${CONTACT.phone}`} className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg transition-colors border border-white/20">
                📞 {CONTACT.phone}
              </a>
            </div>

            <div className="pt-8 border-t border-white/20">
              <p className="text-warm-400 text-sm mb-4">Explore More Areas</p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/areas/orihuela-costa" className="text-white/70 hover:text-white transition-colors">Orihuela Costa →</Link>
                <Link href="/areas/la-zenia" className="text-white/70 hover:text-white transition-colors">La Zenia →</Link>
                <Link href="/areas/guardamar-del-segura" className="text-white/70 hover:text-white transition-colors">Guardamar →</Link>
                <Link href="/areas/villamartin" className="text-white/70 hover:text-white transition-colors">Villamartín →</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
