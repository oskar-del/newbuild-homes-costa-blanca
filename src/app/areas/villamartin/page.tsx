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
  title: 'Living in Villamartín 2025 | Golf Community Guide | Restaurants, Schools, Expat Life',
  description: 'Complete guide to Villamartín Golf Community in Orihuela Costa. Championship golf course, Villamartín Plaza restaurants, established British expat community. Villas from €350,000. 15 min to beaches.',
  keywords: 'Villamartín property, Villamartín Golf Course, Costa Blanca golf villas, Orihuela Costa, golf lifestyle Spain, expat community, buy property Villamartín',
  openGraph: {
    title: 'Villamartín Golf Community - Complete Living Guide 2025',
    description: 'Everything about Villamartín: championship golf, social hub, British expats, restaurants. Prestigious location with premium lifestyle.',
    type: 'website',
  },
};

// Schema markup
const placeSchema = {
  '@context': 'https://schema.org',
  '@type': 'Place',
  name: 'Villamartín',
  description: 'Villamartín is a prestigious golf community in Orihuela Costa, Spain. Home to the famous Villamartín Golf Course and a vibrant expat community.',
  geo: { '@type': 'GeoCoordinates', latitude: '37.9380', longitude: '-0.7920' },
  address: { '@context': 'https://schema.org', '@type': 'PostalAddress', addressLocality: 'Villamartín', addressRegion: 'Alicante', addressCountry: 'ES' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What makes Villamartín special?', acceptedAnswer: { '@type': 'Answer', text: 'Villamartín is renowned for its championship golf course, vibrant social hub (Villamartín Plaza with restaurants and bars), and well-established British expat community. It offers a premium golf lifestyle with excellent amenities and proximity to beaches.' }},
    { '@type': 'Question', name: 'How close is Villamartín to the beach?', acceptedAnswer: { '@type': 'Answer', text: 'Villamartín is approximately 15 minutes from beautiful beaches including Zenia and Cabo Roig. Despite being set around the golf course, the coast is easily accessible for beach days.' }},
    { '@type': 'Question', name: 'What schools are near Villamartín?', acceptedAnswer: { '@type': 'Answer', text: 'El Limonar International School is located in Villamartín itself, making it the top choice for expat families. It offers British curriculum with GCSE and A-Level programs. Kings College Alicante is 50 minutes away.' }},
    { '@type': 'Question', name: 'Is Villamartín good for golf?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Villamartín Golf Course is a championship 18-hole course that has hosted professional tournaments. Las Ramblas and Campoamor golf courses are also nearby. The area is considered one of Costa Blanca\'s premier golf destinations.' }},
  ],
};

// Property data - Villamartín Golf properties
const golfProperties = [
  // Villamartín Golf properties (prioritized)
  { reference: 'N8920', title: 'Villamartín Frontline Golf Villa', price: 575000, type: 'Villa', bedrooms: 3, bathrooms: 3, builtArea: 175, location: 'Villamartín Golf', image: 'https://fotos15.apinmo.com/7515/20011159/9-1.jpg', features: ['Private Pool', 'Frontline Golf', 'Solarium'], status: 'key-ready' as const, badge: 'Golf Course', slug: 'villamartin-frontline-golf' },
  { reference: 'N9105', title: 'Contemporary Golf Villa', price: 495000, type: 'Villa', bedrooms: 3, bathrooms: 3, builtArea: 160, location: 'Villamartín Golf', image: 'https://fotos15.apinmo.com/7515/24361541/10-1.jpg', features: ['Private Pool', 'Modern Design', 'Golf Views'], status: 'key-ready' as const, badge: 'Premium Build', slug: 'contemporary-villamartin-golf' },
  { reference: 'N8652', title: 'Luxury Golf Residence', price: 685000, type: 'Villa', bedrooms: 4, bathrooms: 3, builtArea: 200, location: 'Villamartín Golf', image: 'https://fotos15.apinmo.com/7515/21616952/3-1.jpg', features: ['Private Pool', 'Spa', 'Golf Views'], status: 'key-ready' as const, badge: 'Luxury', slug: 'luxury-golf-residence-villamartin' },
  // Nearby Campoamor and Las Ramblas
  { reference: 'N7890', title: 'Campoamor Golf Villa', price: 520000, type: 'Villa', bedrooms: 3, bathrooms: 3, builtArea: 170, location: 'Campoamor Golf', image: 'https://fotos15.apinmo.com/7515/13526381/24-1.jpg', features: ['Private Pool', 'Golf Views', 'Garage'], status: 'key-ready' as const, badge: 'Nearby Golf', slug: 'campoamor-golf-villa' },
  { reference: 'N8340', title: 'Las Ramblas Golf Home', price: 445000, type: 'Townhouse', bedrooms: 3, bathrooms: 2, builtArea: 140, location: 'Las Ramblas Golf', image: 'https://fotos15.apinmo.com/7515/16689067/12-1.jpg', features: ['Community Pool', 'Golf Course', 'Low Fees'], status: 'key-ready' as const, badge: 'Great Value', slug: 'las-ramblas-golf-home' },
  { reference: 'N9234', title: 'Coastal Golf Villa', price: 625000, type: 'Villa', bedrooms: 4, bathrooms: 4, builtArea: 210, location: 'Campoamor Golf', image: 'https://fotos15.apinmo.com/7515/19432786/9-1.jpg', features: ['Private Pool', 'Golf Views', 'Underbuild'], status: 'key-ready' as const, badge: 'Premium', slug: 'coastal-golf-villa' },
];

// Essential amenities
const essentialAmenities = {
  beaches: [
    { name: 'Playa de Zenia', googleMaps: 'https://maps.google.com/?q=Playa+Zenia+Orihuela', distance: '15 min', description: 'Long blue flag beach with crystal-clear water. Promenade with beach bars and restaurants. Very popular and well-maintained.' },
    { name: 'Playa de Cabo Roig', googleMaps: 'https://maps.google.com/?q=Playa+Cabo+Roig', distance: '15 min', description: 'Picturesque rocky coves and sandy beach. Stunning sunsets. More exclusive feel than Zenia.' },
    { name: 'Playa del Bol Nou', googleMaps: 'https://maps.google.com/?q=Playa+Bol+Nou+Orihuela', distance: '12 min', description: 'Quieter, family-friendly beach. Less crowded than main beaches. Good facilities.' },
  ],
  healthcare: {
    name: 'Hospital Universitario de Torrevieja',
    googleMaps: 'https://maps.google.com/?q=Hospital+de+Torrevieja',
    website: 'https://torrevieja-salud.com/',
    distance: '20 km (25 min)',
    description: 'Full-service hospital with 24hr emergency, English-speaking staff. Private and public healthcare options.',
  },
  airport: {
    name: 'Alicante-Elche Miguel Hernández Airport',
    googleMaps: 'https://maps.google.com/?q=Alicante+Airport',
    website: 'https://www.alicante-airport.net/',
    code: 'ALC',
    distance: '55 km (45 min)',
    description: 'Major international airport. Easy motorway access from Villamartín.',
  },
  shopping: {
    name: 'Zenia Boulevard',
    googleMaps: 'https://maps.google.com/?q=Zenia+Boulevard',
    website: 'https://www.zeniaboulevard.es/',
    distance: '10 min',
    description: 'One of Europe\'s largest open-air shopping centres. 150+ stores, restaurants, cinema.',
  },
  golf: {
    name: 'Villamartín Golf Course',
    googleMaps: 'https://maps.google.com/?q=Villamartin+Golf+Course',
    website: 'https://www.villamartingolf.com/',
    distance: 'In Villamartín',
    description: 'Championship 18-hole course. Historic venue for professional tournaments. Clubhouse with restaurant and pro shop.',
  },
};

// Schools data
const schools = [
  { name: 'El Limonar International School', type: 'British International', distance: 'In Villamartín', location: 'Villamartín', curriculum: 'British (GCSE, A-Level)', fees: '€5,000-8,000/year', ages: '3-18', url: 'https://www.ellimonarinternational.com/', note: 'Located right in Villamartín. Excellent facilities, strong academic results, and large expat parent community. Perfect for families moving to the area.' },
  { name: 'Kings College Alicante', type: 'British International', distance: '50 min', location: 'Alicante', curriculum: 'British (IB available)', fees: '€8,000-12,000/year', ages: '2-18', url: 'https://alicante.kingscollegeschools.org/', note: 'Premium option with IB programme. Worth considering for families wanting international baccalaureate.' },
  { name: 'Colegio La Finca', type: 'Spanish/Bilingual', distance: '10 min', location: 'Orihuela Costa', curriculum: 'Spanish/Bilingual', fees: '€4,000-6,000/year', ages: '3-16', note: 'Bilingual school offering Spanish education with English component.' },
  { name: 'IES Vega Baja', type: 'Spanish Public Secondary', distance: '15 min', location: 'Orihuela', curriculum: 'Spanish National', fees: 'Free', ages: '12-18', note: 'Well-regarded secondary school serving the region.' },
];

// Local markets
const markets = [
  { name: 'Villamartín Plaza Market', day: 'Weekly', time: 'Various', type: 'Plaza & Events', distance: 'In Villamartín', description: 'The social hub of Villamartín! Plaza with weekly quiz nights, social events, and occasional markets. Surrounded by restaurants, bars, and cafes. This is where the community gathers.', googleMaps: 'https://maps.google.com/?q=Villamartin+Plaza+Orihuela' },
  { name: 'Zenia Boulevard Market', day: 'Weekly', time: '9am - 2pm', type: 'Outdoor Market', distance: '10 min', description: 'Modern open-air shopping centre with regular weekly market vendors. Great for fresh produce and sundries.', googleMaps: 'https://maps.google.com/?q=Zenia+Boulevard' },
  { name: 'Torrevieja Friday Market', day: 'Friday', time: '8am - 2pm', type: 'General', distance: '20 min', description: 'Large market near the seafront. Fresh fish, fruit, and Spanish products. Busier in summer.', googleMaps: 'https://maps.google.com/?q=Mercadillo+Torrevieja' },
  { name: 'Orihuela Saturday Market', day: 'Saturday', time: '8am - 2pm', type: 'Traditional Spanish', distance: '15 min', description: 'Traditional Spanish market in the historic town center. Authentic local atmosphere and products.', googleMaps: 'https://maps.google.com/?q=Mercado+Orihuela' },
];

// Local events & fiestas
const events = [
  { name: 'Villamartín Quiz Nights', when: 'Weekly', description: 'Held at venues around Villamartín Plaza. The centerpiece of social life! Teams from around the golf community compete. Great way to meet neighbors and make friends.' },
  { name: 'Villamartín Golf Social Events', when: 'Year-round', description: 'Regular competitions, tournaments, and dinners at the golf club. Member events and open tournaments. Strong social calendar.' },
  { name: 'Fiestas Patronales (nearby towns)', when: 'Various dates', description: 'Nearby Orihuela and Guardamar host spectacular patron saint festivals with street parties, music, and fireworks.' },
  { name: 'Moors & Christians Parades', when: 'Various dates', description: 'Costumed historical reenactment parades in nearby towns. Spectacular events worth attending.' },
  { name: 'Noche de San Juan', when: 'June 23rd', description: 'Beach bonfires and celebrations! Head to nearby Zenia or Cabo Roig beaches for all-night parties.' },
  { name: 'Semana Santa (Easter)', when: 'March/April', description: 'Religious processions in nearby Orihuela. Historic and impressive celebrations.' },
];

// Cost of living data
const costOfLiving = [
  { category: 'Property Tax (IBI)', cost: '€600 - €1,200/year', notes: 'Higher than inland areas due to premium location and property values.' },
  { category: 'Community Fees', cost: '€100 - €200/month', notes: 'Varies by development. Golf developments higher. Includes amenities and maintenance.' },
  { category: 'Utilities (Electric/Water)', cost: '€120 - €220/month', notes: 'Higher in summer (AC). Solar panels reduce costs on newer builds.' },
  { category: 'Internet + Mobile', cost: '€50 - €80/month', notes: 'Fibre widely available. All major Spanish networks.' },
  { category: 'Weekly Shop (2 people)', cost: '€90 - €140', notes: 'Zenia Boulevard nearby. 15-20% cheaper than UK.' },
  { category: 'Dining Out (meal for 2)', cost: '€40 - €70', notes: 'Villamartín Plaza has excellent restaurants. Premium pricing but quality.' },
  { category: 'Golf Membership', cost: '€2,000 - €4,000/year', notes: 'Villamartín Golf membership higher than inland courses but justified by prestige.' },
  { category: 'Health Insurance', cost: '€90 - €160/month', notes: 'Private cover recommended. Fast access to English-speaking doctors.' },
];

// Expat community info
const expatInfo = {
  population: 'Approx. 50%+ international residents in Villamartín',
  nationalities: 'Predominantly British, large Scandinavian presence, Belgian, Dutch, German',
  language: 'English widely spoken in golf club, restaurants, and throughout Villamartín',
  facebookGroups: ['Villamartín Golf Community', 'Orihuela Costa Expats', 'British Expats Costa Blanca', 'Golf Lifestyle Spain'],
  socialClubs: ['Villamartín Golf Club social events', 'Ladies & Mens golf sections', 'Quiz night teams', 'Walking groups', 'Dining clubs'],
  integration: 'Very easy! Quiz nights, golf events, and plaza social gatherings make integration natural. Strong sense of community.',
};

// Nature & outdoor activities
const outdoorActivities = [
  { name: 'Zenia & Cabo Roig Beaches', type: 'Beach', distance: '15 min', description: 'Beautiful beaches with blue flag status. Long sandy stretches or rocky coves depending on your preference.' },
  { name: 'Villamartín Golf Course', type: 'Golf', distance: 'On-site', description: 'Championship 18-hole course. Historic venue. Walking distance from many properties.' },
  { name: 'Las Ramblas Golf', type: 'Golf', distance: '8 min', description: 'Modern course with excellent views and facilities.' },
  { name: 'Campoamor Golf', type: 'Golf', distance: '10 min', description: 'Prestigious course with championship credentials.' },
  { name: 'Coastal Walking Paths', type: 'Walking', distance: '15 min', description: 'Beautiful promenades along Zenia and surrounding beaches. Sunset walks are popular.' },
  { name: 'Sierra de Orihuela', type: 'Hiking', distance: '20 min', description: 'Mountain hiking with spectacular views over the coast. Various difficulty levels.' },
];

// All FAQs
const faqs = [
  { question: 'What makes Villamartín different from other golf communities?', answer: 'Villamartín is the most established and prestigious golf community on Costa Blanca South. The championship golf course, Villamartín Plaza as a social hub, and the long-established British expat community set it apart. It\'s more mature and developed than newer inland golf areas, with better amenities and a stronger sense of established community.' },
  { question: 'How close are the beaches?', answer: 'Villamartín is just 15 minutes from beautiful beaches at Zenia and Cabo Roig. While the community is built around the golf course, beach access is quick and easy. Many residents visit beaches regularly for swimming, dining, or sunset walks.' },
  { question: 'What school options are there?', answer: 'El Limonar International School is located in Villamartín itself - the top choice for expat families. It offers British curriculum with GCSE and A-Level programs, excellent facilities, and strong academic results. The school is also a social hub for families. Kings College Alicante (50 min) is an alternative with IB program.' },
  { question: 'Is the golf course a good investment?', answer: 'Yes, for serious golfers. Villamartín Golf Course is championship-level and playable year-round (11+ months). It has hosted professional tournaments and maintains excellent standards. If golf is important to you, this is the premier destination on the coast. Membership is higher than inland courses but justified by course quality and prestige.' },
  { question: 'What is the expat community like?', answer: 'Large and very welcoming! Over 50% of Villamartín residents are international, predominantly British. The golf club is the natural social center with constant events. Quiz nights at Villamartín Plaza are legendary - a great way to meet people. Facebook groups are active and helpful. English is widely spoken. Integration is easy, especially for golfers.' },
  { question: 'Is there a food and restaurant scene?', answer: 'Villamartín Plaza is surrounded by excellent restaurants and bars - this is the social hub. You\'ll find everything from traditional Spanish to international cuisine. Many restaurants offer premium dining with good wine lists. For shopping, Zenia Boulevard is 10 minutes away with 150+ stores and restaurants.' },
  { question: 'What is the cost of living?', answer: 'Villamartín is more expensive than inland golf areas, but still good value vs UK/Northern Europe. Monthly budget for a couple: €2,000-2,500/month excluding mortgage. Community fees are higher (€100-200/month), property taxes higher, and premium restaurant dining. But property prices are lower than coastal resorts further east.' },
  { question: 'Do I need a car?', answer: 'Strongly recommended, though less critical than inland areas. Most daily needs are walkable (golf club, some restaurants), but beach visits, shopping, and airport require a car. Roads are excellent and stress-free compared to northern Europe.' },
  { question: 'What property types are available?', answer: 'Mix of villas (most common), townhouses, and apartments. Most properties include private pools. Golf frontline properties command premium prices. Many are new builds from established developers. Prices range €350k-€700k+ for quality properties.' },
  { question: 'When is the best time to buy?', answer: 'Year-round, but autumn (Sept-Nov) often has motivated sellers. Spring (March-May) is popular for viewings. Golf season (Oct-May) sees higher demand. New development launches happen regularly - get on mailing lists for early access.' },
  { question: 'How far to the airport?', answer: 'Alicante Airport is approximately 45 minutes away by motorway. Easy access for frequent travelers or visits from family. Regular flights to all European destinations.' },
  { question: 'What about healthcare?', answer: 'Hospital Universitario de Torrevieja is 25 minutes away with excellent facilities and English-speaking staff. Private healthcare is readily available with good insurance options (€90-160/month). Many doctors in Villamartín speak English.' },
];

// Market context for investment section
const marketContext = {
  spainOverview: 'Spain remains one of Europe\'s most attractive property markets for international buyers. Costa Blanca South has strong demand from European investors seeking lifestyle properties. Villamartín specifically appeals to golfers and those seeking premium community amenities.',
  regionalTrends: 'Villamartín has seen steady 4-6% annual price growth, reflecting its premium positioning. Golf properties remain resilient investments due to year-round playability and international demand.',
  localDevelopments: 'Villamartín Golf Course continues to attract quality new developments. Infrastructure including nearby Zenia Boulevard shopping (10 min) and hospital facilities (25 min) support strong property values.',
  futureOutlook: 'Villamartín is well-positioned as Costa Blanca\'s premier golf community. Limited new land and strong demand support continued appreciation. The established expat community and social infrastructure make it attractive for lifestyle buyers.',
  priceGrowth5Year: '+28%',
  foreignBuyerPercent: '55%',
  averageDaysOnMarket: '38',
};

// Map locations with real coordinates
const mapLocations = [
  { id: 'villamartin-golf', name: 'Villamartín Golf Course', type: 'golf' as const, coordinates: [37.9383, -0.7925] as [number, number], distance: 'In Villamartín', description: 'Championship 18-hole course', googleMapsLink: 'https://maps.google.com/?q=Villamartin+Golf+Course', internalLink: '/golf/villamartin' },
  { id: 'las-ramblas', name: 'Las Ramblas Golf', type: 'golf' as const, coordinates: [37.9250, -0.8050] as [number, number], distance: '8 min', description: 'Modern 18-hole course', googleMapsLink: 'https://maps.google.com/?q=Las+Ramblas+Golf', internalLink: '/golf/las-ramblas' },
  { id: 'campoamor', name: 'Campoamor Golf', type: 'golf' as const, coordinates: [37.9150, -0.7800] as [number, number], distance: '10 min', description: 'Prestigious championship course', googleMapsLink: 'https://maps.google.com/?q=Campoamor+Golf', internalLink: '/golf/campoamor' },
  { id: 'zenia-beach', name: 'Playa Zenia', type: 'beach' as const, coordinates: [37.9520, -0.7520] as [number, number], distance: '15 min', description: 'Long blue flag beach with promenade', googleMapsLink: 'https://maps.google.com/?q=Playa+Zenia' },
  { id: 'cabo-roig', name: 'Cabo Roig', type: 'beach' as const, coordinates: [37.9450, -0.7380] as [number, number], distance: '15 min', description: 'Picturesque rocky coves and beach', googleMapsLink: 'https://maps.google.com/?q=Playa+Cabo+Roig' },
  { id: 'zenia-boulevard', name: 'Zenia Boulevard', type: 'shopping' as const, coordinates: [37.9150, -0.7464] as [number, number], distance: '10 min', description: '150+ stores, restaurants, cinema', googleMapsLink: 'https://maps.google.com/?q=Zenia+Boulevard' },
  { id: 'hospital', name: 'Hospital Torrevieja', type: 'hospital' as const, coordinates: [37.9780, -0.6847] as [number, number], distance: '25 min', description: '24hr emergency, English staff', googleMapsLink: 'https://maps.google.com/?q=Hospital+de+Torrevieja' },
  { id: 'airport', name: 'Alicante Airport', type: 'airport' as const, coordinates: [38.2822, -0.5582] as [number, number], distance: '45 min', description: 'International flights to Europe', googleMapsLink: 'https://maps.google.com/?q=Alicante+Airport' },
  { id: 'el-limonar', name: 'El Limonar School', type: 'school' as const, coordinates: [37.9383, -0.7925] as [number, number], distance: 'In Villamartín', description: 'British International School', googleMapsLink: 'https://maps.google.com/?q=El+Limonar+International+School' },
];

export default function VillamartinPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Areas', url: 'https://newbuildhomescostablanca.com/areas/' },
    { name: 'Villamartín', url: 'https://newbuildhomescostablanca.com/areas/villamartin/' },
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
              alt="Villamartín Golf Course villa with pool - Orihuela Costa, Costa Blanca"
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
              <span className="text-white">Villamartín Golf Community</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-block bg-accent-500 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6">
                Orihuela Costa • Premium Golf Community
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
                Living in <span className="font-semibold">Villamartín</span><br />
                <span className="text-accent-400">Golf Community</span>
              </h1>

              <p className="text-xl text-warm-300 mb-4 leading-relaxed">
                Costa Blanca's most prestigious golf community. Championship course, vibrant social hub,
                established British expat community, and direct beach access. Premium lifestyle living.
              </p>
              <p className="text-lg text-warm-400 mb-8">
                15 minutes to Zenia & Cabo Roig beaches • 45 minutes to Alicante Airport • Established expat community
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <span className="text-2xl">⛳</span>
                  <p className="text-white font-semibold mt-1">Championship Golf</p>
                  <p className="text-white/60 text-sm">Historic course</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <span className="text-2xl">🏪</span>
                  <p className="text-white font-semibold mt-1">Villamartín Plaza</p>
                  <p className="text-white/60 text-sm">Social hub</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <span className="text-2xl">👥</span>
                  <p className="text-white font-semibold mt-1">50%+ Expat</p>
                  <p className="text-white/60 text-sm">British community</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <span className="text-accent-400 font-bold text-xl">€350k</span>
                  <p className="text-white font-semibold mt-1">From</p>
                  <p className="text-white/60 text-sm">Premium homes</p>
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
              <a href="#golf" className="px-4 py-2 rounded-full hover:bg-warm-100 text-warm-600 whitespace-nowrap transition-colors">Golf</a>
              <a href="#plaza" className="px-4 py-2 rounded-full hover:bg-warm-100 text-warm-600 whitespace-nowrap transition-colors">Plaza & Dining</a>
              <a href="#schools" className="px-4 py-2 rounded-full hover:bg-warm-100 text-warm-600 whitespace-nowrap transition-colors">Schools</a>
              <a href="#costs" className="px-4 py-2 rounded-full hover:bg-warm-100 text-warm-600 whitespace-nowrap transition-colors">Costs</a>
              <a href="#amenities" className="px-4 py-2 rounded-full hover:bg-warm-100 text-warm-600 whitespace-nowrap transition-colors">Amenities</a>
              <a href="#events" className="px-4 py-2 rounded-full hover:bg-warm-100 text-warm-600 whitespace-nowrap transition-colors">Events</a>
              <a href="#expat" className="px-4 py-2 rounded-full hover:bg-warm-100 text-warm-600 whitespace-nowrap transition-colors">Expat Life</a>
              <a href="#outdoor" className="px-4 py-2 rounded-full hover:bg-warm-100 text-warm-600 whitespace-nowrap transition-colors">Beach & Nature</a>
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
                  Why People Choose <span className="font-semibold">Villamartín</span>
                </h2>

                <div className="prose prose-lg text-warm-700 max-w-none">
                  <p>
                    <strong>Villamartín isn&apos;t just a golf community—it&apos;s an institution.</strong> For decades, it&apos;s been
                    Costa Blanca South&apos;s most established and prestigious golf destination. The championship course,
                    the vibrant Villamartín Plaza social hub, and the long-standing British expat community create
                    a unique sense of belonging.
                  </p>
                  <p>
                    Life here pulses around the golf course and the Plaza. Morning rounds on a world-class
                    course. Lunch at the clubhouse with familiar faces. Afternoons poolside at your villa or on
                    nearby beaches (just 15 minutes away). Evening quiz nights at the Plaza or dinner at one of
                    the excellent restaurants—where the staff knows your name.
                  </p>
                  <p>
                    The value proposition is compelling: <strong>a 3-bedroom villa in Villamartín costs
                    €400-500k, versus €600k+ in comparable coastal locations</strong>. You get the lifestyle
                    without the coastal premium pricing. Plus, you&apos;re part of something established—the community
                    is mature, integrated, and genuinely welcoming.
                  </p>
                  <p>
                    Yes, it&apos;s more expensive than inland golf areas like Algorfa. But for those seeking
                    the complete package—prestige, community, golf excellence, and beach proximity—Villamartín
                    delivers.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div className="bg-accent-50 rounded-2xl p-6">
                  <h3 className="font-bold text-primary-900 text-lg mb-4">At a Glance</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-warm-600">Community</span><span className="font-semibold text-primary-900">Established & Mature</span></div>
                    <div className="flex justify-between"><span className="text-warm-600">Expat %</span><span className="font-semibold text-primary-900">~50%+ (Predominantly British)</span></div>
                    <div className="flex justify-between"><span className="text-warm-600">To Beach</span><span className="font-semibold text-primary-900">15 min</span></div>
                    <div className="flex justify-between"><span className="text-warm-600">To Airport</span><span className="font-semibold text-primary-900">45 min</span></div>
                    <div className="flex justify-between"><span className="text-warm-600">Golf Courses (10 min)</span><span className="font-semibold text-primary-900">3+</span></div>
                    <div className="flex justify-between"><span className="text-warm-600">Sunny Days/Year</span><span className="font-semibold text-primary-900">300+</span></div>
                    <div className="flex justify-between"><span className="text-warm-600">Property From</span><span className="font-semibold text-accent-600">€350,000</span></div>
                  </div>
                </div>

                <div className="bg-warm-50 rounded-2xl p-6">
                  <h3 className="font-bold text-primary-900 text-lg mb-4">Premier Golf Courses</h3>

                  {/* Featured: Villamartín Golf */}
                  <Link href="/golf/villamartin" className="block bg-accent-500 text-white rounded-xl p-4 mb-4 hover:bg-accent-600 transition-colors group">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wide text-white/80">Championship Course</span>
                        <h4 className="font-bold text-lg">Villamartín Golf Course</h4>
                        <p className="text-white/80 text-sm mt-1">Historic 18-hole championship course. Professional tournament venue. Clubhouse, restaurant, pro shop. Heart of the community.</p>
                      </div>
                      <span className="text-white/60 group-hover:text-white transition-colors">→</span>
                    </div>
                    <div className="flex gap-3 mt-3 text-xs">
                      <span className="bg-white/20 px-2 py-1 rounded">18 Holes</span>
                      <span className="bg-white/20 px-2 py-1 rounded">Par 72</span>
                      <span className="bg-white/20 px-2 py-1 rounded">Historic</span>
                    </div>
                  </Link>

                  {/* Other nearby courses */}
                  <div className="space-y-2">
                    {[
                      { name: 'Las Ramblas Golf', slug: 'las-ramblas', time: '8 min', holes: 18 },
                      { name: 'Campoamor Golf', slug: 'campoamor', time: '10 min', holes: 18 },
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

        {/* Villamartín Plaza - Social Hub Section */}
        <section id="plaza" className="py-16 bg-accent-50 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-6">
            <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">The Heart of Community</span>
            <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-4">
              <span className="font-semibold">Villamartín Plaza</span> & Dining
            </h2>
            <p className="text-warm-600 text-lg mb-10 max-w-3xl">
              Villamartín Plaza is more than just a shopping area—it&apos;s the vibrant social epicenter of the community.
              Weekly quiz nights, excellent restaurants, lively bars, and a genuine sense of belonging.
            </p>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-bold text-primary-900 text-xl mb-3">Weekly Quiz Nights</h3>
                <p className="text-warm-600 text-sm mb-4">
                  The legendary social events of Villamartín! Teams from around the community compete in quiz
                  nights held at various Plaza venues. Incredibly popular, great fun, and the perfect way to
                  integrate and make friends. Reserved tables fill quickly.
                </p>
                <p className="text-accent-600 font-medium text-sm">The cornerstone of Villamartín social life</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="text-4xl mb-4">🍽️</div>
                <h3 className="font-bold text-primary-900 text-xl mb-3">Excellent Restaurants</h3>
                <p className="text-warm-600 text-sm mb-4">
                  Plaza is surrounded by quality restaurants and bars. Traditional Spanish, Mediterranean,
                  international cuisine. Premium dining experiences with good wine lists. Many restaurants
                  cater to the expat community with English menus and staff who understand the clientele.
                </p>
                <p className="text-accent-600 font-medium text-sm">Something for every occasion and budget</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="font-bold text-primary-900 text-xl mb-3">Social Hub</h3>
                <p className="text-warm-600 text-sm mb-4">
                  Beyond quiz nights, the Plaza hosts events, themed dinners, special occasions, and casual
                  gatherings. It&apos;s where you bump into neighbors, plan activities, and feel part of a
                  genuine community. No feeling of isolation here.
                </p>
                <p className="text-accent-600 font-medium text-sm">The real heart of Villamartín</p>
              </div>
            </div>
          </div>
        </section>

        {/* Golf Section */}
        <section id="golf" className="py-16 bg-white scroll-mt-16">
          <div className="max-w-7xl mx-auto px-6">
            <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Premier Golfing</span>
            <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-4">
              <span className="font-semibold">Championship Golf</span> at Your Doorstep
            </h2>
            <p className="text-warm-600 text-lg mb-10 max-w-3xl">
              Villamartín Golf Course is the crown jewel of Costa Blanca golf. A championship 18-hole course
              that has hosted professional tournaments and continues to attract serious golfers worldwide.
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-warm-50 rounded-2xl p-8">
                <h3 className="font-bold text-primary-900 text-xl mb-4">Villamartín Golf Course</h3>
                <div className="space-y-4 text-warm-700">
                  <p>
                    <strong>Championship 18-hole course</strong> designed by renowned architects. Par 72, challenging
                    layout suitable for all handicaps. The course is playable 11+ months per year thanks to
                    Costa Blanca&apos;s perfect climate.
                  </p>
                  <p>
                    <strong>Historic venue</strong> that has hosted professional tournaments and serious competitions.
                    Known for excellent maintenance, beautiful scenery, and world-class facilities.
                  </p>
                  <p>
                    <strong>Clubhouse with restaurant</strong>, pro shop, driving range, and practice facilities. Member
                    and visitor welcome. Membership options available with various levels and benefits.
                  </p>
                  <p>
                    <strong>Social calendar</strong> includes regular competitions, tournaments, dinners, and member events.
                    Strong ladies and men&apos;s sections with active social programs.
                  </p>
                  <a href="https://www.villamartingolf.com/" target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:text-accent-700 font-medium inline-flex items-center gap-2 mt-4">
                    Visit Golf Course Website →
                  </a>
                </div>
              </div>

              <div className="bg-accent-50 rounded-2xl p-8">
                <h3 className="font-bold text-primary-900 text-xl mb-4">Nearby Courses</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Las Ramblas Golf', time: '8 min', description: 'Modern 18-hole course with excellent facilities and views' },
                    { name: 'Campoamor Golf', time: '10 min', description: 'Prestigious championship course with great reputation' },
                    { name: 'Lo Romero Golf', time: '15 min', description: 'Scenic inland course with challenging layout' },
                  ].map((course) => (
                    <div key={course.name} className="bg-white rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-primary-900">{course.name}</h4>
                        <span className="text-warm-500 text-sm">{course.time}</span>
                      </div>
                      <p className="text-warm-600 text-sm">{course.description}</p>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 text-sm mt-4 pt-4 border-t border-warm-200">
                  3+ championship golf courses within 15 minutes. Villamartín is the heart of Costa Blanca&apos;s golf destination.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* New Build Developments Section */}
        <AreaDevelopments
          areaName="Villamartín"
          areaSlug="villamartin"
          maxDevelopments={6}
          showLifestyleGuide={true}
          relatedBlogPosts={[
            { slug: 'villamartin-golf-guide', title: 'Villamartín Golf: Complete Guide', description: 'Everything about the championship course and community.' },
            { slug: 'golf-community-living', title: 'Golf Community Lifestyle', description: 'What to expect living in a golf-focused community.' },
            { slug: 'costa-blanca-golf-comparison', title: 'Costa Blanca Golf Comparison', description: 'Villamartín vs. other golf communities.' },
          ]}
        />

        {/* Properties Section */}
        <ParallaxPropertySection
          title="Golf Villas in Villamartín"
          subtitle="Premium Properties"
          narrative="Villamartín offers a range of property types from modern villas with private pools to townhouses and apartments. Most properties are new builds or renovated to premium standards. Golf frontline properties offer direct course access. Prices reflect the premium location and established community."
          backgroundImage="/images/areas/villamartin-golf-villas.webp"
          properties={golfProperties}
          ctaText="View All Properties"
          ctaLink="/developments?area=villamartin"
          theme="dark"
        />

        {/* Schools Section */}
        <section id="schools" className="py-16 bg-white scroll-mt-16">
          <div className="max-w-7xl mx-auto px-6">
            <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Education</span>
            <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-4">
              Schools Near <span className="font-semibold">Villamartín</span>
            </h2>
            <p className="text-warm-600 text-lg mb-10 max-w-3xl">
              Excellent education options for families. El Limonar International School is based right in Villamartín,
              making it incredibly convenient for expat families.
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
              Cost of Living in <span className="font-semibold">Villamartín</span>
            </h2>
            <p className="text-warm-600 text-lg mb-10 max-w-3xl">
              Villamartín is more expensive than inland areas but offers excellent value compared to purely coastal
              resorts further east. Premium location, established community, and excellent amenities justify the cost.
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
                  <p className="text-3xl font-bold">€2,000-2,500<span className="text-lg font-normal">/month</span></p>
                  <p className="text-white/70 text-sm mt-1">Excluding mortgage/rent</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm uppercase tracking-wide mb-1">With Golf Membership</p>
                  <p className="text-3xl font-bold">€2,500-3,200<span className="text-lg font-normal">/month</span></p>
                  <p className="text-white/70 text-sm mt-1">Including course membership</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm uppercase tracking-wide mb-1">Premium Lifestyle</p>
                  <p className="text-3xl font-bold">€3,000+<span className="text-lg font-normal">/month</span></p>
                  <p className="text-white/70 text-sm mt-1">Including dining & activities</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Essential Amenities Section */}
        <section id="amenities" className="py-16 bg-warm-50 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-6">
            <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Essential Amenities</span>
            <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-4">
              Beaches, Shopping & <span className="font-semibold">Connections</span>
            </h2>
            <p className="text-warm-600 text-lg mb-10 max-w-3xl">
              Everything you need is within easy reach. Beautiful beaches, excellent shopping at Zenia Boulevard,
              world-class healthcare, and quick airport access.
            </p>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Beaches Card */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
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
                    Villamartín is just 15 minutes from beautiful beaches at Zenia and Cabo Roig. Both offer
                    excellent facilities, water sports, and beachfront dining.
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

              {/* Shopping Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🛍️</span>
                  <h3 className="font-bold text-primary-900 text-xl">Shopping</h3>
                </div>
                <p className="text-warm-600 text-sm mb-4">
                  {essentialAmenities.shopping.description}
                </p>
                <div className="bg-warm-50 rounded-xl p-4">
                  <p className="font-semibold text-primary-900">{essentialAmenities.shopping.name}</p>
                  <p className="text-warm-500 text-sm mb-3">{essentialAmenities.shopping.distance}</p>
                  <div className="flex gap-3">
                    <a
                      href={essentialAmenities.shopping.googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-600 hover:text-accent-700 text-sm font-medium"
                    >
                      📍 View on Map
                    </a>
                    <a
                      href={essentialAmenities.shopping.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-600 hover:text-accent-700 text-sm font-medium"
                    >
                      🌐 Website
                    </a>
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
              </div>
            </div>

            {/* Golf & Airport Row */}
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

              {/* Airport */}
              <div className="bg-white rounded-xl p-5 shadow-sm flex gap-4">
                <span className="text-3xl">✈️</span>
                <div>
                  <h3 className="font-bold text-primary-900">{essentialAmenities.airport.name}</h3>
                  <p className="text-warm-500 text-sm">Code: {essentialAmenities.airport.code} • {essentialAmenities.airport.distance}</p>
                  <p className="text-warm-600 text-sm mt-2">{essentialAmenities.airport.description}</p>
                  <div className="flex gap-3 mt-3">
                    <a href={essentialAmenities.airport.googleMaps} target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:text-accent-700 text-sm font-medium">📍 Map</a>
                    <a href={essentialAmenities.airport.website} target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:text-accent-700 text-sm font-medium">🌐 Info</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events & Fiestas Section */}
        <section id="events" className="py-16 bg-white scroll-mt-16">
          <div className="max-w-7xl mx-auto px-6">
            <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Culture & Events</span>
            <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-4">
              Events & <span className="font-semibold">Social Calendar</span>
            </h2>
            <p className="text-warm-600 text-lg mb-10 max-w-3xl">
              There&apos;s always something happening in and around Villamartín. From quiz nights to golf tournaments
              to local fiestas, the social calendar is full.
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
                    <strong>Villamartín has a large, established, and incredibly welcoming British expat community.</strong>
                    Over 50% of residents are international, predominantly British. This is not a place where you&apos;ll
                    feel like a newcomer—the community is mature and used to integrating expats.
                  </p>
                  <p>
                    The golf club is the natural social hub, but Villamartín Plaza takes social life to another level.
                    Weekly quiz nights are legendary—teams fill up quickly and friendships form naturally. Facebook
                    groups are active with locals happy to offer advice on everything from plumbers to restaurants.
                  </p>
                  <p>
                    <strong>Language:</strong> English is widely spoken throughout Villamartín—in the golf club,
                    restaurants, shops, and by residents. You can get by entirely in English, though learning Spanish
                    opens more doors and helps with bureaucracy.
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
                      <span className="text-xl">🎯</span>
                      <div>
                        <p className="font-semibold text-primary-900">Social Clubs & Events</p>
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
          areaName="Villamartín"
          intro="What does daily life look like in Villamartín? Here's a typical day for residents."
          timeline={[
            { time: '7:30 AM', title: 'Coffee & Golf Prep', description: 'Morning coffee on your terrace overlooking the course. Planning the day ahead, checking golf tee times.', icon: '☕' },
            { time: '9:00 AM', title: 'Golf at Villamartín', description: 'Tee time at the championship course. Familiar faces, professional service, and beautiful surroundings.', icon: '⛳' },
            { time: '1:30 PM', title: 'Clubhouse Lunch', description: 'Lunch at the clubhouse with fellow golfers. Great food, good wine, and the social heart of the community.', icon: '🍽️' },
            { time: '4:00 PM', title: 'Pool or Beach', description: 'Afternoon by the pool or a drive to Zenia beach (15 min) for a swim and sunset drinks.', icon: '🏖️' },
            { time: '7:30 PM', title: 'Quiz Night at Plaza', description: 'Weekly quiz night at Villamartín Plaza! Team competition, laughter, making friends, meeting neighbors. The essence of Villamartín.', icon: '🎯' },
          ]}
          featuredProperty={golfProperties[0]}
        />

        {/* Outdoor Activities Section */}
        <section id="outdoor" className="py-16 bg-warm-50 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-6">
            <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Beyond Golf</span>
            <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-4">
              Beach & <span className="font-semibold">Outdoor Activities</span>
            </h2>
            <p className="text-warm-600 text-lg mb-10 max-w-3xl">
              While golf is the headline act, there&apos;s plenty more. Beaches, hiking, water sports, and natural parks
              all within easy reach.
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
                <span className="absolute bottom-3 left-3 text-white font-semibold text-sm">Water Sports</span>
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
                <span className="absolute bottom-3 left-3 text-white font-semibold text-sm">Hiking</span>
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
          areaName="Villamartín"
          centerCoordinates={[37.9383, -0.7925]}
          zoom={13}
          locations={mapLocations}
        />

        {/* Investment Analysis */}
        <InvestmentAnalysis
          areaName="Villamartín"
          priceData={[
            { type: '2-Bed Apartment', priceRange: '€220,000 - €300,000', avgPrice: 255000, trend: 'up', trendPercent: 4.5 },
            { type: '3-Bed Townhouse', priceRange: '€300,000 - €400,000', avgPrice: 345000, trend: 'up', trendPercent: 4.8 },
            { type: '3-Bed Villa with Pool', priceRange: '€400,000 - €550,000', avgPrice: 475000, trend: 'up', trendPercent: 5.2 },
            { type: '4-Bed Luxury Villa', priceRange: '€550,000 - €750,000', avgPrice: 650000, trend: 'stable', trendPercent: 3.8 },
          ]}
          comparisonAreas={[
            { name: 'Villamartín', slug: 'villamartin', avgPrice: 475000, rentalYield: 5.5, distanceToBeach: '15 min', distanceToAirport: '45 min' },
            { name: 'Algorfa / La Finca', slug: 'algorfa', avgPrice: 375000, rentalYield: 6.8, distanceToBeach: '15 min', distanceToAirport: '30 min' },
            { name: 'Campoamor', slug: 'campoamor', avgPrice: 525000, rentalYield: 5.5, distanceToBeach: '5 min', distanceToAirport: '45 min' },
            { name: 'Guardamar', slug: 'guardamar-del-segura', avgPrice: 295000, rentalYield: 5.0, distanceToBeach: '5 min', distanceToAirport: '35 min' },
          ]}
          rentalYield={{ shortTerm: '5-6%', longTerm: '4-5%', occupancy: '70-80%' }}
          investmentHighlights={[
            'Prestige location with established reputation',
            'Strong British expat demand supports property values',
            'Excellent amenities and infrastructure',
            'Championship golf course enhances lifestyle value',
            'Proven long-term capital appreciation',
          ]}
          marketInsight="Villamartín commands premium pricing due to its prestige, established community, and championship golf course. While more expensive than inland alternatives, it offers superior lifestyle and proven appreciation potential."
          marketContext={marketContext}
        />

        {/* Full Property Grid */}
        <div id="properties">
          <FullWidthPropertyGrid
            title="Properties in Villamartín"
            subtitle="Premium Golf Villas & Homes"
            properties={golfProperties}
            showFilters={true}
            columns={3}
            ctaText="View All Properties"
            ctaLink="/developments?area=villamartin"
            theme="light"
          />
        </div>

        {/* FAQs */}
        <section id="faqs" className="py-16 bg-white scroll-mt-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Questions Answered</span>
              <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2">
                Villamartín <span className="font-semibold">FAQs</span>
              </h2>
              <p className="text-warm-600 mt-4">Everything you need to know about living in and buying property in Villamartín</p>
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
              Ready to Explore <span className="font-semibold">Villamartín?</span>
            </h2>
            <p className="text-warm-300 text-lg mb-8 max-w-2xl mx-auto">
              Let us show you this prestigious golf community. We&apos;ll arrange viewings, answer your questions,
              and help you find your perfect home in Villamartín.
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
              <p className="text-warm-400 text-sm mb-4">Explore More Golf Communities</p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/areas/algorfa" className="text-white/70 hover:text-white transition-colors">Algorfa →</Link>
                <Link href="/areas/campoamor" className="text-white/70 hover:text-white transition-colors">Campoamor →</Link>
                <Link href="/areas/orihuela-costa" className="text-white/70 hover:text-white transition-colors">Orihuela Costa →</Link>
                <Link href="/areas/guardamar-del-segura" className="text-white/70 hover:text-white transition-colors">Guardamar →</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
