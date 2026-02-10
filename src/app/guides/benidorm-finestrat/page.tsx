import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPostsForArea } from '@/lib/blog-area-mapping';
import { breadcrumbSchema, faqSchema, articleSchema, placeSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Living in Benidorm & Finestrat 2026: Complete Guide to Property & Lifestyle',
  description: 'The definitive guide to Benidorm and Finestrat — from beachfront high-rises to hillside luxury villas. New build developments, beaches, nightlife, and practical buyer advice.',
  keywords: 'Benidorm property, Finestrat villas, Costa Blanca real estate, new build apartments, beachfront living, luxury homes',
  openGraph: {
    title: 'Living in Benidorm & Finestrat 2026: Complete Guide to Property & Lifestyle',
    description: 'The definitive guide to Benidorm and Finestrat — from beachfront high-rises to hillside luxury villas. New build developments, beaches, nightlife, and practical buyer advice.',
    type: 'article',
    locale: 'en_US',
    url: 'https://newbuildhomescostablanca.com/guides/benidorm-finestrat',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/guides/benidorm-finestrat',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/benidorm-finestrat',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/benidorm-finestrat',
      'x-default': 'https://newbuildhomescostablanca.com/guides/benidorm-finestrat',
    },
  },
};

const schemaMarkup = toJsonLd([
  breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com' },
    { name: 'Guides', url: 'https://newbuildhomescostablanca.com/guides' },
    { name: 'Benidorm & Finestrat', url: 'https://newbuildhomescostablanca.com/guides/benidorm-finestrat' },
  ]),
  articleSchema({
    headline: 'Living in Benidorm & Finestrat 2026: Complete Guide to Property & Lifestyle',
    description: 'The definitive guide to Benidorm and Finestrat — from beachfront high-rises to hillside luxury villas.',
    image: 'https://newbuildhomescostablanca.com/images/areas/benidorm.jpg',
    datePublished: new Date().toISOString(),
    author: 'New Build Homes Costa Blanca',
    url: 'https://newbuildhomescostablanca.com/guides/benidorm-finestrat',
  }),
  placeSchema({
    name: 'Benidorm & Finestrat',
    description: 'Coastal and hillside destination on the Costa Blanca',
    image: 'https://newbuildhomescostablanca.com/images/areas/benidorm.jpg',
    url: 'https://newbuildhomescostablanca.com/guides/benidorm-finestrat',
    address: { region: 'Alicante', country: 'ES' },
    geo: { lat: 38.5410, lng: -0.1225 },
    containedIn: 'Costa Blanca North, Spain',
    population: 70000,
    amenities: ['Beaches', 'Theme Parks', 'Nightlife', 'Shopping', 'Golf', 'Water Sports'],
    touristAttractions: ['Levante Beach', 'Balcon del Mediterraneo', 'Terra Mitica', 'Puig Campana'],
  }),
  faqSchema([
    {
      question: 'Is Benidorm good for permanent living?',
      answer: 'Yes, Benidorm offers excellent infrastructure, healthcare, international schools, and a genuine community beyond the tourist areas. Finestrat is particularly popular for permanent residents seeking a quieter lifestyle with mountain views.',
    },
    {
      question: 'What\'s the difference between Benidorm and Finestrat?',
      answer: 'Benidorm is a vibrant beachfront city with modern infrastructure, nightlife, and high-rise apartments. Finestrat is a hillside village offering traditional charm, panoramic views, and a more relaxed pace of life, with many new luxury developments.',
    },
    {
      question: 'Can I rent out my Benidorm apartment?',
      answer: 'Yes, Benidorm has strong rental yields (5-8% annually) from tourist rentals. Many owners use property management companies to handle bookings and maintenance.',
    },
    {
      question: 'What are property prices in Benidorm and Finestrat?',
      answer: 'Benidorm apartments range €120k-400k depending on location and sea views. Finestrat villas start at €350k with luxury properties reaching €700k+. Both areas offer good value compared to other Costa Blanca destinations.',
    },
    {
      question: 'Is Benidorm safe?',
      answer: 'Benidorm is considered one of the safest destinations on the Costa Blanca. It has a significant police presence, good infrastructure, and well-lit streets, especially in main tourist and residential areas.',
    },
    {
      question: 'How far is the airport?',
      answer: 'Alicante-Elche Airport is 45 minutes away by car. The area also has direct access to Valencia airport (90 minutes) and Madrid for connections.',
    },
  ]),
]);

export default function BenidormFinestratGuide() {
  const relatedArticles = getBlogPostsForArea('benidorm', 3) || [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaMarkup }}
      />

      {/* Hero Section */}
      <section className="relative w-full h-96 md:h-[500px] overflow-hidden">
        <Image
          src="/images/areas/benidorm.jpg"
          alt="Benidorm skyline and Mediterranean coast"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />

        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-warm-200">
            <Link href="/" className="hover:text-accent-500 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-accent-500 transition-colors">Guides</Link>
            <span>/</span>
            <span className="text-accent-500">Benidorm & Finestrat</span>
          </nav>

          {/* Title and Stats */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white leading-tight">
              Benidorm & Finestrat
              <span className="block text-accent-500 font-normal">The Complete Buyer's Guide 2026</span>
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-black/30 backdrop-blur-md p-4 rounded-sm border border-accent-500/20">
                <div className="text-2xl md:text-3xl font-light text-accent-500">70,000+</div>
                <div className="text-xs tracking-widest uppercase text-warm-200 mt-1">Population</div>
              </div>
              <div className="bg-black/30 backdrop-blur-md p-4 rounded-sm border border-accent-500/20">
                <div className="text-2xl md:text-3xl font-light text-accent-500">3</div>
                <div className="text-xs tracking-widest uppercase text-warm-200 mt-1">Iconic Beaches</div>
              </div>
              <div className="bg-black/30 backdrop-blur-md p-4 rounded-sm border border-accent-500/20">
                <div className="text-2xl md:text-3xl font-light text-accent-500">2</div>
                <div className="text-xs tracking-widest uppercase text-warm-200 mt-1">Theme Parks</div>
              </div>
              <div className="bg-black/30 backdrop-blur-md p-4 rounded-sm border border-accent-500/20">
                <div className="text-2xl md:text-3xl font-light text-accent-500">365</div>
                <div className="text-xs tracking-widest uppercase text-warm-200 mt-1">Days of Sun</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="bg-warm-50">
        {/* Introduction Section */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-20">
          <div className="space-y-6 max-w-3xl">
            <div className="h-1 w-16 bg-gradient-to-r from-accent-500 to-accent-400 rounded-full" />

            <h2 className="text-3xl md:text-4xl font-light text-primary-900">
              Welcome to the Costa Blanca's Most Dynamic Destination
            </h2>

            <p className="text-lg text-primary-700 font-light leading-relaxed">
              Benidorm has undergone a remarkable transformation. Once known as a package-holiday destination, it has evolved into a genuine lifestyle hub where international residents enjoy world-class infrastructure, pristine beaches, and sophisticated entertainment options. The high-rise skyline that defines Levante Beach represents modern Spanish architecture at its finest, while the charming Old Town reveals the authentic tapas bars and local culture that existed long before the towers.
            </p>

            <p className="text-lg text-primary-700 font-light leading-relaxed">
              Just behind Benidorm, perched on the hillside, sits Finestrat — a traditional mountain village that offers a completely different experience. Here you'll find traditional Spanish charm combined with luxury new build developments, panoramic sea and mountain views, and a more relaxed pace of life. Together, these two destinations offer every lifestyle imaginable: from beachfront apartment living in modern towers to hillside villa luxury with private pools and gardens.
            </p>

            <p className="text-lg text-primary-700 font-light leading-relaxed">
              Benidorm is the most-searched Costa Blanca destination on Google, and for good reason. This is a destination that works for beach lovers, families, retirees, entrepreneurs, and investors alike. Whether you're seeking a holiday home with strong rental potential or a permanent residence in a vibrant community, Benidorm and Finestrat deliver on every level.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="h-px bg-gradient-to-r from-accent-500/0 via-accent-500/30 to-accent-500/0" />
        </div>

        {/* Benidorm Neighborhoods */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-20">
          <div className="space-y-12">
            <div className="space-y-2">
              <div className="h-1 w-16 bg-gradient-to-r from-accent-500 to-accent-400 rounded-full" />
              <h2 className="text-3xl md:text-4xl font-light text-primary-900">
                Exploring Benidorm's Neighborhoods
              </h2>
            </div>

            {/* Levante Beach Area */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-light text-primary-900">Levante Beach Area</h3>
                <div className="h-0.5 w-12 bg-accent-500" />
                <p className="text-primary-700 leading-relaxed">
                  Home to Benidorm's famous promenade and iconic high-rise apartments, Levante Beach is the beating heart of the city. This is where you'll find the most vibrant nightlife, international restaurants, bustling markets, and non-stop entertainment. Every attraction is within walking distance. Perfect for those who want to be in the center of the action.
                </p>
                <ul className="space-y-2 text-primary-700">
                  <li className="flex items-start gap-3">
                    <span className="text-accent-500 mt-1">•</span>
                    <span><strong>Beach Length:</strong> 2km of pristine Blue Flag beach</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent-500 mt-1">•</span>
                    <span><strong>Nightlife:</strong> World-class clubs and bars</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent-500 mt-1">•</span>
                    <span><strong>Price Range:</strong> Apartments from €200,000</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent-500 mt-1">•</span>
                    <span><strong>Best For:</strong> Young professionals, investors, party-goers</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-96 bg-primary-100 rounded-sm overflow-hidden border border-primary-200">
                <Image
                  src="/images/areas/benidorm.jpg"
                  alt="Levante Beach promenade"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Poniente Beach Area */}
            <div className="grid md:grid-cols-2 gap-8 items-center md:grid-flow-dense">
              <div className="relative h-96 bg-primary-100 rounded-sm overflow-hidden border border-primary-200">
                <Image
                  src="/images/areas/benidorm.jpg"
                  alt="Poniente Beach"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-light text-primary-900">Poniente Beach Area</h3>
                <div className="h-0.5 w-12 bg-accent-500" />
                <p className="text-primary-700 leading-relaxed">
                  If you prefer a quieter, more relaxed atmosphere, Poniente is your ideal choice. With a wider, more spacious beach and newer residential developments, this area attracts families and those seeking a more peaceful Mediterranean lifestyle. The beach is less crowded than Levante, and there's excellent access to local amenities.
                </p>
                <ul className="space-y-2 text-primary-700">
                  <li className="flex items-start gap-3">
                    <span className="text-accent-500 mt-1">•</span>
                    <span><strong>Beach Length:</strong> 3.5km of sandy beach</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent-500 mt-1">•</span>
                    <span><strong>Vibe:</strong> Family-friendly, peaceful</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent-500 mt-1">•</span>
                    <span><strong>Price Range:</strong> Apartments from €180,000</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent-500 mt-1">•</span>
                    <span><strong>Best For:</strong> Families, retirees, quiet living</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Old Town */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-light text-primary-900">Old Town (Casco Antiguo)</h3>
                <div className="h-0.5 w-12 bg-accent-500" />
                <p className="text-primary-700 leading-relaxed">
                  Discover the real Benidorm in the charming Old Town, where narrow winding streets lead to authentic tapas bars, family-run restaurants, and the legendary Balcon del Mediterraneo viewpoint. This is where locals live and socialize, offering genuine Spanish Mediterranean culture away from the tourist bustle. Perfect for those seeking authenticity and character.
                </p>
                <ul className="space-y-2 text-primary-700">
                  <li className="flex items-start gap-3">
                    <span className="text-accent-500 mt-1">•</span>
                    <span><strong>Character:</strong> Historic buildings, steep streets, local life</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent-500 mt-1">•</span>
                    <span><strong>Attractions:</strong> Balcon del Mediterraneo, tapas bars</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent-500 mt-1">•</span>
                    <span><strong>Best For:</strong> Cultural enthusiasts, authentic experience seekers</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-96 bg-primary-100 rounded-sm overflow-hidden border border-primary-200">
                <Image
                  src="/images/areas/benidorm.jpg"
                  alt="Benidorm Old Town"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Rincon de Loix */}
            <div className="grid md:grid-cols-2 gap-8 items-center md:grid-flow-dense">
              <div className="relative h-96 bg-primary-100 rounded-sm overflow-hidden border border-primary-200">
                <Image
                  src="/images/areas/benidorm.jpg"
                  alt="Rincon de Loix neighborhood"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-light text-primary-900">Rincon de Loix</h3>
                <div className="h-0.5 w-12 bg-accent-500" />
                <p className="text-primary-700 leading-relaxed">
                  Located behind Levante Beach, Rincon de Loix offers the best value for everyday living. This residential neighborhood features modern supermarkets, local shops, gyms, and all the amenities you need without the premium beachfront prices. It's a genuine working residential area where many locals live, offering authentic neighborhood life.
                </p>
                <ul className="space-y-2 text-primary-700">
                  <li className="flex items-start gap-3">
                    <span className="text-accent-500 mt-1">•</span>
                    <span><strong>Character:</strong> Residential, practical, everyday amenities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent-500 mt-1">•</span>
                    <span><strong>Accessibility:</strong> 5-minute walk to Levante Beach</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent-500 mt-1">•</span>
                    <span><strong>Price Range:</strong> Apartments from €120,000</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent-500 mt-1">•</span>
                    <span><strong>Best For:</strong> Budget-conscious buyers, permanent residents</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* La Cala */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-light text-primary-900">La Cala</h3>
                <div className="h-0.5 w-12 bg-accent-500" />
                <p className="text-primary-700 leading-relaxed">
                  This intimate cove beach area represents premium Benidorm living. Smaller and more exclusive than the main beaches, La Cala attracts those seeking sophistication, privacy, and direct beach access in an upscale setting. The curved sandy beach is sheltered and perfect for swimming. This is where luxury meets comfort.
                </p>
                <ul className="space-y-2 text-primary-700">
                  <li className="flex items-start gap-3">
                    <span className="text-accent-500 mt-1">•</span>
                    <span><strong>Beach Character:</strong> Small, intimate, sheltered cove</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent-500 mt-1">•</span>
                    <span><strong>Vibe:</strong> Exclusive, upscale, sophisticated</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent-500 mt-1">•</span>
                    <span><strong>Price Range:</strong> Apartments from €250,000</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent-500 mt-1">•</span>
                    <span><strong>Best For:</strong> Luxury seekers, privacy-conscious buyers</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-96 bg-primary-100 rounded-sm overflow-hidden border border-primary-200">
                <Image
                  src="/images/areas/benidorm.jpg"
                  alt="La Cala beach"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="h-px bg-gradient-to-r from-accent-500/0 via-accent-500/30 to-accent-500/0" />
        </div>

        {/* Finestrat Section */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-20">
          <div className="space-y-12">
            <div className="space-y-2">
              <div className="h-1 w-16 bg-gradient-to-r from-accent-500 to-accent-400 rounded-full" />
              <h2 className="text-3xl md:text-4xl font-light text-primary-900">
                Finestrat: Where Tradition Meets Modern Luxury
              </h2>
            </div>

            <p className="text-lg text-primary-700 font-light leading-relaxed max-w-3xl">
              Perched on the hillside behind Benidorm, Finestrat represents a completely different lifestyle. This traditional Valencian mountain village combines authentic Spanish charm with contemporary luxury developments, offering panoramic sea and mountain views, a slower pace of life, and a genuine community atmosphere.
            </p>

            {/* Finestrat Village */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-light text-primary-900">Finestrat Village</h3>
                <div className="h-0.5 w-12 bg-accent-500" />
                <p className="text-primary-700 leading-relaxed">
                  The heart of Finestrat is a traditional mountain village where time moves slower. Narrow cobblestone streets, local shops selling fresh produce, and family-run restaurants serving regional cuisine create an authentically Spanish atmosphere. The village square becomes lively on market days, and the 360-degree views from the hilltop viewpoint are simply breathtaking.
                </p>
                <div className="bg-accent-500/10 border border-accent-500/30 rounded-sm p-4">
                  <p className="text-primary-700 font-light">
                    <strong className="text-accent-600">Local Experience:</strong> Visit the weekly market, enjoy fresh tapas at local bars, hike Puig Campana mountain from the village center.
                  </p>
                </div>
              </div>
              <div className="relative h-96 bg-primary-100 rounded-sm overflow-hidden border border-primary-200">
                <Image
                  src="/images/areas/benidorm.jpg"
                  alt="Finestrat village"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* New Build Developments */}
            <div className="grid md:grid-cols-2 gap-8 items-center md:grid-flow-dense">
              <div className="relative h-96 bg-primary-100 rounded-sm overflow-hidden border border-primary-200">
                <Image
                  src="/images/areas/benidorm.jpg"
                  alt="New build developments in Finestrat"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-light text-primary-900">New Build Developments</h3>
                <div className="h-0.5 w-12 bg-accent-500" />
                <p className="text-primary-700 leading-relaxed">
                  Major developers including TM Group and Grupo Presto have created world-class modern developments that respect Finestrat's traditional character while offering contemporary luxury. These projects feature modern infrastructure, innovative design, and stunning views. Options range from spacious villas with private pools to elegant apartments with sea and mountain panoramas.
                </p>
                <ul className="space-y-2 text-primary-700">
                  <li className="flex items-start gap-3">
                    <span className="text-accent-500 mt-1">•</span>
                    <span>Villas from €350,000</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent-500 mt-1">•</span>
                    <span>Apartments from €250,000</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent-500 mt-1">•</span>
                    <span>Luxury properties €700,000+</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sierra Cortina */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-light text-primary-900">Sierra Cortina</h3>
                <div className="h-0.5 w-12 bg-accent-500" />
                <p className="text-primary-700 leading-relaxed">
                  Sierra Cortina is the premium hillside address in Finestrat. This exclusive gated development offers architectural elegance, panoramic Mediterranean views, 24-hour security, and access to championship golf courses. Villas feature private pools, manicured gardens, and smart home technology. This is luxury living at its finest with a strong sense of community.
                </p>
                <div className="bg-warm-200 border border-primary-200 rounded-sm p-4 space-y-2">
                  <p className="text-primary-900 font-light text-sm">
                    <strong>Sierra Cortina Premium Features:</strong>
                  </p>
                  <ul className="text-primary-800 text-sm space-y-1">
                    <li>• Panoramic sea and mountain views</li>
                    <li>• Championship golf courses nearby</li>
                    <li>• 24-hour security and gated community</li>
                    <li>• Modern villas with private pools</li>
                    <li>• Developments from €300,000</li>
                  </ul>
                </div>
              </div>
              <div className="relative h-96 bg-primary-100 rounded-sm overflow-hidden border border-primary-200">
                <Image
                  src="/images/areas/benidorm.jpg"
                  alt="Sierra Cortina luxury development"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Terra Mitica Area */}
            <div className="bg-accent-500/5 border border-accent-500/20 rounded-sm p-8 space-y-4">
              <h3 className="text-2xl font-light text-primary-900">Terra Mitica & Family Entertainment Area</h3>
              <div className="h-0.5 w-12 bg-accent-500" />
              <p className="text-primary-700 leading-relaxed">
                Located between Benidorm and Finestrat, this area combines entertainment with residential living. Terra Mitica theme park, Aqualandia water park, and Terra Natura wildlife park make it ideal for families. Modern developments in this area offer excellent infrastructure and quick access to both attractions and the traditional village atmosphere of Finestrat.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="h-px bg-gradient-to-r from-accent-500/0 via-accent-500/30 to-accent-500/0" />
        </div>

        {/* Property Market */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-20">
          <div className="space-y-12">
            <div className="space-y-2">
              <div className="h-1 w-16 bg-gradient-to-r from-accent-500 to-accent-400 rounded-full" />
              <h2 className="text-3xl md:text-4xl font-light text-primary-900">
                Property Market & Investment Guide
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Benidorm Market */}
              <div className="border border-primary-200 rounded-sm p-8 space-y-6 bg-warm-100/50">
                <h3 className="text-2xl font-light text-primary-900">Benidorm Market</h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm tracking-widest uppercase text-accent-600 font-semibold">Apartment Pricing</h4>
                    <p className="text-3xl font-light text-primary-900">€120k - €400k</p>
                    <p className="text-sm text-primary-600">Depending on location, sea views, and proximity to beach</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm tracking-widest uppercase text-accent-600 font-semibold">Penthouses</h4>
                    <p className="text-3xl font-light text-primary-900">€300k - €800k</p>
                    <p className="text-sm text-primary-600">Luxury rooftop residences with panoramic views</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm tracking-widest uppercase text-accent-600 font-semibold">Rental Yields</h4>
                    <p className="text-lg font-light text-accent-600">5-8% annually</p>
                    <p className="text-sm text-primary-600">Strong returns from short-term tourist rentals</p>
                  </div>
                </div>

                <div className="bg-white border border-primary-200 rounded-sm p-4 space-y-3">
                  <h4 className="text-sm font-semibold text-primary-900 tracking-widest uppercase">Why Benidorm Investment Works</h4>
                  <ul className="space-y-2 text-sm text-primary-700">
                    <li className="flex items-start gap-2">
                      <span className="text-accent-500 mt-0.5">•</span>
                      <span>Year-round tourism generates consistent rental income</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-500 mt-0.5">•</span>
                      <span>Strong international buyer demand keeps prices stable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-500 mt-0.5">•</span>
                      <span>Complete infrastructure and services for property management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-500 mt-0.5">•</span>
                      <span>Professional property management companies available</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Finestrat Market */}
              <div className="border border-accent-500/30 rounded-sm p-8 space-y-6 bg-accent-500/5">
                <h3 className="text-2xl font-light text-primary-900">Finestrat Market</h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm tracking-widest uppercase text-accent-600 font-semibold">Apartments</h4>
                    <p className="text-3xl font-light text-primary-900">€200k - €350k</p>
                    <p className="text-sm text-primary-600">New build with sea and mountain views</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm tracking-widest uppercase text-accent-600 font-semibold">Villas</h4>
                    <p className="text-3xl font-light text-primary-900">€350k - €700k</p>
                    <p className="text-sm text-primary-600">Private pools, gardens, panoramic views</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm tracking-widest uppercase text-accent-600 font-semibold">Luxury Properties</h4>
                    <p className="text-3xl font-light text-primary-900">€700k+</p>
                    <p className="text-sm text-primary-600">Sierra Cortina and exclusive developments</p>
                  </div>
                </div>

                <div className="bg-white border border-accent-500/20 rounded-sm p-4 space-y-3">
                  <h4 className="text-sm font-semibold text-primary-900 tracking-widest uppercase">Perfect For</h4>
                  <ul className="space-y-2 text-sm text-primary-700">
                    <li className="flex items-start gap-2">
                      <span className="text-accent-500 mt-0.5">•</span>
                      <span>Permanent residents seeking quiet luxury</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-500 mt-0.5">•</span>
                      <span>Families wanting space and panoramic views</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-500 mt-0.5">•</span>
                      <span>Retirees valuing quality of life and community</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-500 mt-0.5">•</span>
                      <span>Long-term lifestyle investment rather than rental yields</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="h-px bg-gradient-to-r from-accent-500/0 via-accent-500/30 to-accent-500/0" />
        </div>

        {/* Beaches Section */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-20">
          <div className="space-y-12">
            <div className="space-y-2">
              <div className="h-1 w-16 bg-gradient-to-r from-accent-500 to-accent-400 rounded-full" />
              <h2 className="text-3xl md:text-4xl font-light text-primary-900">
                Beaches & Coastal Living
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="border border-primary-200 rounded-sm overflow-hidden hover:border-accent-500 transition-colors">
                <div className="relative h-48 bg-primary-100 overflow-hidden">
                  <Image
                    src="/images/areas/benidorm.jpg"
                    alt="Levante Beach"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-light text-primary-900">Levante Beach</h3>
                  <p className="text-sm text-primary-700">The iconic 2km Blue Flag beach with perfect sandy shores, lifeguards, and complete facilities. Most vibrant, most developed.</p>
                  <ul className="text-xs text-primary-600 space-y-1">
                    <li><strong>Length:</strong> 2km</li>
                    <li><strong>Character:</strong> Iconic, vibrant, facilities</li>
                    <li><strong>Best For:</strong> Activity seekers</li>
                  </ul>
                </div>
              </div>

              <div className="border border-primary-200 rounded-sm overflow-hidden hover:border-accent-500 transition-colors">
                <div className="relative h-48 bg-primary-100 overflow-hidden">
                  <Image
                    src="/images/areas/benidorm.jpg"
                    alt="Poniente Beach"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-light text-primary-900">Poniente Beach</h3>
                  <p className="text-sm text-primary-700">Spacious 3.5km sandy beach, quieter and more family-oriented than Levante. Wider sand, excellent for children.</p>
                  <ul className="text-xs text-primary-600 space-y-1">
                    <li><strong>Length:</strong> 3.5km</li>
                    <li><strong>Character:</strong> Spacious, peaceful, family</li>
                    <li><strong>Best For:</strong> Families, swimmers</li>
                  </ul>
                </div>
              </div>

              <div className="border border-primary-200 rounded-sm overflow-hidden hover:border-accent-500 transition-colors">
                <div className="relative h-48 bg-primary-100 overflow-hidden">
                  <Image
                    src="/images/areas/benidorm.jpg"
                    alt="La Cala Beach"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-light text-primary-900">La Cala Beach</h3>
                  <p className="text-sm text-primary-700">Intimate sheltered cove with premium setting. Smaller, more exclusive, perfect for those seeking privacy and sophistication.</p>
                  <ul className="text-xs text-primary-600 space-y-1">
                    <li><strong>Character:</strong> Intimate cove, upscale</li>
                    <li><strong>Water:</strong> Sheltered, calm</li>
                    <li><strong>Best For:</strong> Luxury seekers</li>
                  </ul>
                </div>
              </div>

              <div className="border border-primary-200 rounded-sm overflow-hidden hover:border-accent-500 transition-colors">
                <div className="relative h-48 bg-primary-100 overflow-hidden">
                  <Image
                    src="/images/areas/benidorm.jpg"
                    alt="Mal Pas Beach"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-light text-primary-900">Mal Pas Beach</h3>
                  <p className="text-sm text-primary-700">Historic small beach near the Old Town. Authentic local character, traditional fishing heritage, traditional restaurants.</p>
                  <ul className="text-xs text-primary-600 space-y-1">
                    <li><strong>Character:</strong> Historic, authentic local</li>
                    <li><strong>Atmosphere:</strong> Traditional fishing village</li>
                    <li><strong>Best For:</strong> Cultural experiences</li>
                  </ul>
                </div>
              </div>

              <div className="border border-primary-200 rounded-sm overflow-hidden hover:border-accent-500 transition-colors">
                <div className="relative h-48 bg-primary-100 overflow-hidden">
                  <Image
                    src="/images/areas/benidorm.jpg"
                    alt="Finestrat Beach"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-light text-primary-900">Finestrat Beach (Cala Finestrat)</h3>
                  <p className="text-sm text-primary-700">Sandy cove beach in the village area. Quieter setting with direct access from Finestrat developments, perfect for residents.</p>
                  <ul className="text-xs text-primary-600 space-y-1">
                    <li><strong>Character:</strong> Sandy, quiet, residential</li>
                    <li><strong>Access:</strong> Easy from village</li>
                    <li><strong>Best For:</strong> Finestrat residents</li>
                  </ul>
                </div>
              </div>

              <div className="border border-primary-200 rounded-sm overflow-hidden hover:border-accent-500 transition-colors">
                <div className="relative h-48 bg-primary-100 overflow-hidden">
                  <Image
                    src="/images/areas/benidorm.jpg"
                    alt="Puig Campana hiking"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-light text-primary-900">Puig Campana Mountain</h3>
                  <p className="text-sm text-primary-700">Not a beach, but essential experience. Hiking the iconic mountain offers 360-degree views of coast and countryside.</p>
                  <ul className="text-xs text-primary-600 space-y-1">
                    <li><strong>Activity:</strong> Hiking, adventure</li>
                    <li><strong>Views:</strong> 360-degree panoramas</li>
                    <li><strong>Best For:</strong> Nature lovers, hikers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="h-px bg-gradient-to-r from-accent-500/0 via-accent-500/30 to-accent-500/0" />
        </div>

        {/* Lifestyle & Entertainment */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-20">
          <div className="space-y-12">
            <div className="space-y-2">
              <div className="h-1 w-16 bg-gradient-to-r from-accent-500 to-accent-400 rounded-full" />
              <h2 className="text-3xl md:text-4xl font-light text-primary-900">
                Lifestyle & Entertainment
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div className="border-l-4 border-accent-500 pl-6 space-y-3">
                  <h3 className="text-xl font-light text-primary-900">Theme Parks & Attractions</h3>
                  <p className="text-primary-700 leading-relaxed">
                    Three world-class parks offer year-round entertainment. Terra Mitica features Greek, Egyptian, and Roman themed attractions. Aqualandia is one of Europe's premier water parks. Terra Natura combines wildlife viewing with adventure activities. Perfect for families and regular entertainment.
                  </p>
                </div>

                <div className="border-l-4 border-accent-500 pl-6 space-y-3">
                  <h3 className="text-xl font-light text-primary-900">Benidorm Palace Shows</h3>
                  <p className="text-primary-700 leading-relaxed">
                    Legendary flamenco and cabaret performances in an intimate theater setting. Professional productions with international talent, Spanish cuisine, and complete entertainment packages. A must-experience Benidorm tradition.
                  </p>
                </div>

                <div className="border-l-4 border-accent-500 pl-6 space-y-3">
                  <h3 className="text-xl font-light text-primary-900">Water Sports & Activities</h3>
                  <p className="text-primary-700 leading-relaxed">
                    From paddleboarding and kayaking to parasailing and jet-skiing, all water sports are available. Multiple providers offer lessons for beginners and professional equipment for experienced enthusiasts. Mediterranean waters are perfect year-round.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="border-l-4 border-accent-500 pl-6 space-y-3">
                  <h3 className="text-xl font-light text-primary-900">Nightlife Scene</h3>
                  <p className="text-primary-700 leading-relaxed">
                    Benidorm's nightlife is legendary. Levante Beach area features world-class nightclubs with international DJs, cocktail bars with Mediterranean views, and themed venues. From sophisticated rooftop bars to dance clubs, there's something for every preference.
                  </p>
                </div>

                <div className="border-l-4 border-accent-500 pl-6 space-y-3">
                  <h3 className="text-xl font-light text-primary-900">Dining & Tapas Culture</h3>
                  <p className="text-primary-700 leading-relaxed">
                    Experience authentic Spanish dining in the Old Town, international cuisine along the beachfront, or Michelin-worthy restaurants throughout the city. The tapas culture is alive and well, particularly in traditional neighborhoods and local bars.
                  </p>
                </div>

                <div className="border-l-4 border-accent-500 pl-6 space-y-3">
                  <h3 className="text-xl font-light text-primary-900">Golf & Sports</h3>
                  <p className="text-primary-700 leading-relaxed">
                    Championship golf courses near Sierra Cortina and throughout the region. Tennis clubs, fitness centers, yoga studios, and water sports facilities cater to every fitness level and interest. The mild climate allows year-round outdoor activities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="h-px bg-gradient-to-r from-accent-500/0 via-accent-500/30 to-accent-500/0" />
        </div>

        {/* Practical Living */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-20">
          <div className="space-y-12">
            <div className="space-y-2">
              <div className="h-1 w-16 bg-gradient-to-r from-accent-500 to-accent-400 rounded-full" />
              <h2 className="text-3xl md:text-4xl font-light text-primary-900">
                Practical Living Guide
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-warm-100/50 border border-primary-200 rounded-sm p-8 space-y-4">
                <h3 className="text-lg font-semibold text-primary-900 tracking-widest uppercase">Healthcare</h3>
                <p className="text-primary-700 leading-relaxed">
                  Hospital Marina Baixa offers comprehensive modern medical facilities. Numerous private clinics and specialist doctors. Healthcare system is excellent and very affordable compared to Northern European standards. Many medical professionals speak English.
                </p>
              </div>

              <div className="bg-warm-100/50 border border-primary-200 rounded-sm p-8 space-y-4">
                <h3 className="text-lg font-semibold text-primary-900 tracking-widest uppercase">Education</h3>
                <p className="text-primary-700 leading-relaxed">
                  Multiple international schools follow British, American, and International Baccalaureate curricula. Local Spanish schools are well-regarded. Quality education is available at all levels, making Benidorm ideal for families with children.
                </p>
              </div>

              <div className="bg-warm-100/50 border border-primary-200 rounded-sm p-8 space-y-4">
                <h3 className="text-lg font-semibold text-primary-900 tracking-widest uppercase">Transportation</h3>
                <p className="text-primary-700 leading-relaxed">
                  Alicante-Elche Airport: 45 minutes by car. Direct tram to Alicante city. Modern bus system throughout the area. Motorway connects to Valencia (90 min) and Madrid (4.5 hours). Excellent connectivity.
                </p>
              </div>

              <div className="bg-primary-100/30 border border-primary-300 rounded-sm p-8 space-y-4">
                <h3 className="text-lg font-semibold text-primary-900 tracking-widest uppercase">Climate</h3>
                <p className="text-primary-700 leading-relaxed">
                  Year-round mild Mediterranean climate. Average 320 days of sunshine annually. Winters rarely drop below 10°C. Summers moderate by sea breezes. Perfect for outdoor activities and beachside living throughout the year.
                </p>
              </div>

              <div className="bg-primary-100/30 border border-primary-300 rounded-sm p-8 space-y-4">
                <h3 className="text-lg font-semibold text-primary-900 tracking-widest uppercase">Cost of Living</h3>
                <p className="text-primary-700 leading-relaxed">
                  Generally lower than Northern Europe. Groceries, dining, and utilities are affordable. Property prices vary significantly by neighborhood. Excellent value for beachfront living compared to other Mediterranean destinations.
                </p>
              </div>

              <div className="bg-primary-100/30 border border-primary-300 rounded-sm p-8 space-y-4">
                <h3 className="text-lg font-semibold text-primary-900 tracking-widest uppercase">Community</h3>
                <p className="text-primary-700 leading-relaxed">
                  Large international expatriate community. English widely spoken in tourist and residential areas. Many social clubs, sports groups, and community organizations. Easy to make friends and integrate into international network.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="h-px bg-gradient-to-r from-accent-500/0 via-accent-500/30 to-accent-500/0" />
        </div>

        {/* Related Blog Articles */}
        {relatedArticles.length > 0 && (
          <section className="max-w-6xl mx-auto px-6 md:px-12 py-20">
            <div className="space-y-12">
              <div className="space-y-2">
                <div className="h-1 w-16 bg-gradient-to-r from-accent-500 to-accent-400 rounded-full" />
                <h2 className="text-3xl md:text-4xl font-light text-primary-900">
                  Related Resources
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedArticles.map((article) => (
                  <Link key={article.slug} href={`/blog/${article.slug}`} className="group bg-white rounded-lg border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all overflow-hidden">
                    <div className="p-5">
                      <span className="text-accent-600 text-xs font-medium uppercase tracking-wider">{article.category}</span>
                      <h3 className="text-primary-900 font-semibold mt-2 mb-2 group-hover:text-accent-600 transition-colors">{article.title}</h3>
                      <p className="text-warm-600 text-sm line-clamp-2">{article.description}</p>
                      <span className="text-warm-400 text-xs mt-2 block">{article.readTime} min read</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="h-px bg-gradient-to-r from-accent-500/0 via-accent-500/30 to-accent-500/0" />
        </div>

        {/* FAQ Section */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-20">
          <div className="space-y-12">
            <div className="space-y-2">
              <div className="h-1 w-16 bg-gradient-to-r from-accent-500 to-accent-400 rounded-full" />
              <h2 className="text-3xl md:text-4xl font-light text-primary-900">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              <details className="group border border-primary-200 rounded-sm overflow-hidden hover:border-accent-500 transition-colors">
                <summary className="flex items-center justify-between p-6 cursor-pointer bg-warm-100/50 hover:bg-warm-200/50 transition-colors">
                  <span className="text-lg font-light text-primary-900">
                    Is Benidorm good for permanent living?
                  </span>
                  <span className="text-accent-500 text-2xl group-open:rotate-180 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 space-y-3 border-t border-primary-200 pt-6 bg-white">
                  <p className="text-primary-700 leading-relaxed">
                    Absolutely. Benidorm has evolved far beyond its reputation as a tourist destination. The city offers excellent healthcare facilities, international schools, reliable infrastructure, and a genuine community of both locals and international residents. The climate is perfect for year-round living, and there's genuine entertainment and cultural options beyond nightlife. Finestrat is particularly popular for permanent residents seeking a quieter mountain lifestyle with panoramic views.
                  </p>
                </div>
              </details>

              <details className="group border border-primary-200 rounded-sm overflow-hidden hover:border-accent-500 transition-colors">
                <summary className="flex items-center justify-between p-6 cursor-pointer bg-warm-100/50 hover:bg-warm-200/50 transition-colors">
                  <span className="text-lg font-light text-primary-900">
                    What's the difference between Benidorm and Finestrat?
                  </span>
                  <span className="text-accent-500 text-2xl group-open:rotate-180 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 space-y-3 border-t border-primary-200 pt-6 bg-white">
                  <p className="text-primary-700 leading-relaxed">
                    Benidorm is a vibrant beachfront city with high-rise modern architecture, world-class infrastructure, nightlife, and tourism. Finestrat is a traditional Valencian mountain village offering authentic charm, panoramic views, a slower pace of life, and a strong community atmosphere. Benidorm is about energy and activity; Finestrat is about tranquility and lifestyle. Many buyers choose both — a beach apartment in Benidorm for excitement and rental income, and a villa in Finestrat for peaceful living.
                  </p>
                </div>
              </details>

              <details className="group border border-primary-200 rounded-sm overflow-hidden hover:border-accent-500 transition-colors">
                <summary className="flex items-center justify-between p-6 cursor-pointer bg-warm-100/50 hover:bg-warm-200/50 transition-colors">
                  <span className="text-lg font-light text-primary-900">
                    Can I rent out my Benidorm apartment?
                  </span>
                  <span className="text-accent-500 text-2xl group-open:rotate-180 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 space-y-3 border-t border-primary-200 pt-6 bg-white">
                  <p className="text-primary-700 leading-relaxed">
                    Yes, and this is one of Benidorm's strongest investment advantages. Year-round tourism generates reliable rental income from short-term tourist rentals, typically 5-8% annually. Many professional property management companies handle all bookings, maintenance, and guest communication. You maintain ownership while earning passive income. This model works exceptionally well for beachfront and well-located apartments. Finestrat properties are better for permanent residency than rental investment.
                  </p>
                </div>
              </details>

              <details className="group border border-primary-200 rounded-sm overflow-hidden hover:border-accent-500 transition-colors">
                <summary className="flex items-center justify-between p-6 cursor-pointer bg-warm-100/50 hover:bg-warm-200/50 transition-colors">
                  <span className="text-lg font-light text-primary-900">
                    What are property prices in Benidorm and Finestrat?
                  </span>
                  <span className="text-accent-500 text-2xl group-open:rotate-180 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 space-y-3 border-t border-primary-200 pt-6 bg-white">
                  <p className="text-primary-700 leading-relaxed">
                    Benidorm apartments range from €120,000 (good value neighborhoods like Rincon de Loix) to €400,000 (beachfront sea-view locations). Penthouses command €300,000-€800,000. Finestrat apartments start at €200,000, villas from €350,000, with luxury Sierra Cortina properties reaching €700,000+. Prices vary significantly by location, sea view, property size, and amenities. Both areas offer excellent value compared to other Mediterranean destinations.
                  </p>
                </div>
              </details>

              <details className="group border border-primary-200 rounded-sm overflow-hidden hover:border-accent-500 transition-colors">
                <summary className="flex items-center justify-between p-6 cursor-pointer bg-warm-100/50 hover:bg-warm-200/50 transition-colors">
                  <span className="text-lg font-light text-primary-900">
                    Is Benidorm safe?
                  </span>
                  <span className="text-accent-500 text-2xl group-open:rotate-180 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 space-y-3 border-t border-primary-200 pt-6 bg-white">
                  <p className="text-primary-700 leading-relaxed">
                    Benidorm is considered one of the safest destinations on the Costa Blanca. It has significant police presence, well-lit streets, good infrastructure, and modern security systems in residential areas and developments. The main tourist areas, residential neighborhoods, and established expat communities are particularly safe. Standard travel precautions apply, as with any popular tourist destination, but serious crime is rare.
                  </p>
                </div>
              </details>

              <details className="group border border-primary-200 rounded-sm overflow-hidden hover:border-accent-500 transition-colors">
                <summary className="flex items-center justify-between p-6 cursor-pointer bg-warm-100/50 hover:bg-warm-200/50 transition-colors">
                  <span className="text-lg font-light text-primary-900">
                    How far is the nearest airport?
                  </span>
                  <span className="text-accent-500 text-2xl group-open:rotate-180 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 space-y-3 border-t border-primary-200 pt-6 bg-white">
                  <p className="text-primary-700 leading-relaxed">
                    Alicante-Elche Airport is just 45 minutes away by car and serves hundreds of international destinations. Valencia Airport is 90 minutes away with additional options. Madrid is 4.5 hours by car or high-speed train for worldwide connections. The area has excellent international connectivity making it ideal for those needing regular travel access.
                  </p>
                </div>
              </details>

              <details className="group border border-primary-200 rounded-sm overflow-hidden hover:border-accent-500 transition-colors">
                <summary className="flex items-center justify-between p-6 cursor-pointer bg-warm-100/50 hover:bg-warm-200/50 transition-colors">
                  <span className="text-lg font-light text-primary-900">
                    What visa and residency options are available?
                  </span>
                  <span className="text-accent-500 text-2xl group-open:rotate-180 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 space-y-3 border-t border-primary-200 pt-6 bg-white">
                  <p className="text-primary-700 leading-relaxed">
                    EU/EEA citizens have unrestricted residence rights. Non-EU citizens can obtain residency through various visa programs including the Golden Visa (property investment), Digital Nomad Visa, student visas, and work visas. Retirement visas are available for those with sufficient passive income. We recommend consulting with an immigration specialist to explore options for your specific situation. Our team can provide referrals to qualified advisors.
                  </p>
                </div>
              </details>

              <details className="group border border-primary-200 rounded-sm overflow-hidden hover:border-accent-500 transition-colors">
                <summary className="flex items-center justify-between p-6 cursor-pointer bg-warm-100/50 hover:bg-warm-200/50 transition-colors">
                  <span className="text-lg font-light text-primary-900">
                    Are there property taxes and ongoing costs?
                  </span>
                  <span className="text-accent-500 text-2xl group-open:rotate-180 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 space-y-3 border-t border-primary-200 pt-6 bg-white">
                  <p className="text-primary-700 leading-relaxed">
                    Annual property tax (IBI) is modest, typically 0.4-0.7% of cadastral value. Community fees for apartments (if applicable) range €50-200 monthly depending on amenities. Utilities (electricity, water, gas) cost €80-150 monthly. No inheritance tax between spouses. You will pay purchase taxes (6-10% depending on property status) at acquisition. Overall ongoing costs are significantly lower than Northern European countries. We provide detailed cost estimates for specific properties.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="h-px bg-gradient-to-r from-accent-500/0 via-accent-500/30 to-accent-500/0" />
        </div>

        {/* CTA Section */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-20">
          <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-sm p-12 md:p-16 space-y-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
                Ready to Explore Benidorm & Finestrat?
              </h2>
              <p className="text-lg text-warm-200 font-light leading-relaxed">
                Our expert team specializes in new build developments throughout Benidorm and Finestrat. Whether you're seeking a beachfront apartment investment, a permanent residence with panoramic views, or a luxury villa, we'll guide you through every step of the process.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent-500 hover:bg-accent-600 text-white font-light px-8 py-4 rounded-sm text-center transition-colors tracking-wide"
              >
                WhatsApp Us
              </a>
              <a
                href="tel:+34634044970"
                className="bg-warm-500 hover:bg-warm-600 text-white font-light px-8 py-4 rounded-sm text-center transition-colors tracking-wide"
              >
                Call +34 634 044 970
              </a>
              <Link
                href="/contact"
                className="bg-white/20 hover:bg-white/30 text-white font-light px-8 py-4 rounded-sm text-center transition-colors tracking-wide border border-white/30"
              >
                Contact Form
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div className="space-y-2">
                <h3 className="text-sm tracking-widest uppercase text-accent-300">Our Expertise</h3>
                <p className="text-warm-100 font-light">
                  15+ years in Costa Blanca property market. Specialist in new build developments. Fluent in 12 languages. Commission-free consultations for property buyers.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm tracking-widest uppercase text-accent-300">What We Offer</h3>
                <p className="text-warm-100 font-light">
                  Property search and viewings. Financial planning and mortgage guidance. Legal support and documentation. Rental management setup. Ongoing property support.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
