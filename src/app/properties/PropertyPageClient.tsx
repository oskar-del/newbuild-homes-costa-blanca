'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LeadForm from '@/components/LeadForm';
import { InvestmentChart, AreaPriceComparison } from '@/components/InvestmentCharts';

interface PropertyPageClientProps {
  property: any;
  seoTitle: string;
  lifestyle: { title: string; description: string };
  investmentContent: string;
  highlights: string[];
  description: string;
}

export default function PropertyPageClient({
  property,
  seoTitle,
  lifestyle,
  investmentContent,
  highlights,
  description,
}: PropertyPageClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const images = property.images || [];
  const price = property.price || 0;
  const town = property.town || 'Costa Blanca';
  const bedrooms = property.bedrooms || 2;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // FAQ data
  const faqs = [
    {
      question: `What is the buying process for this property in ${town}?`,
      answer: `The buying process typically takes 6-8 weeks. It includes: obtaining an NIE (foreigner ID number), opening a Spanish bank account, signing a reservation contract with deposit, completing due diligence, and signing at the notary. We guide you through every step.`
    },
    {
      question: 'What additional costs should I budget for?',
      answer: `For new builds, budget approximately 13-14% on top of the purchase price: 10% IVA (VAT), 1.5% stamp duty (AJD), plus notary, registry, and legal fees. For resales, transfer tax (ITP) is 10% instead of IVA.`
    },
    {
      question: 'Can I get a mortgage as a foreign buyer?',
      answer: 'Yes! Spanish banks offer mortgages to non-residents, typically up to 70% of the purchase price. We work with Habeno, a mortgage aggregator who can compare offers from multiple banks to find you the best rates and terms.'
    },
    {
      question: `Is ${town} good for rental income?`,
      answer: `${town} is popular with tourists year-round, especially from Northern Europe. Properties here can achieve strong rental yields, particularly during summer and the "winter sun" season from November to March.`
    },
    {
      question: 'How do I arrange a viewing?',
      answer: 'Contact us via WhatsApp, phone, or the form on this page. We can arrange in-person viewings or live video tours if you cannot travel. Most viewings can be scheduled within 24-48 hours.'
    },
    {
      question: 'What are the ongoing costs of ownership?',
      answer: 'Annual costs include: IBI (property tax, typically €300-800), community fees if applicable (€50-150/month for developments with pools), home insurance, and utilities. We can provide detailed estimates for this specific property.'
    },
    {
      question: 'Can I live in Spain after purchasing?',
      answer: 'EU citizens have freedom of movement. Non-EU buyers can apply for a Golden Visa with purchases over €500,000, or explore non-lucrative visa options. We can connect you with immigration specialists.'
    },
    {
      question: 'Is this property suitable for holiday rentals?',
      answer: 'Holiday rentals are permitted in most areas but require a tourist license. Regulations vary by municipality. We can advise on the specific rules for this location and connect you with property management services.'
    }
  ];

  return (
    <>
      {/* Lightbox */}
      {lightboxOpen && images.length > 0 && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-50"
          >
            ×
          </button>
          
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl hover:text-gray-300 z-50 p-4"
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl hover:text-gray-300 z-50 p-4"
              >
                ›
              </button>
            </>
          )}
          
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] m-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[lightboxIndex]?.url || '/placeholder-property.jpg'}
              alt={`Property image ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-lg">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="min-h-screen bg-stone-50">
        {/* Breadcrumb */}
        <nav className="bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <Link href="/" className="hover:text-amber-700">Home</Link>
              <span>/</span>
              <Link href="/properties" className="hover:text-amber-700">Properties</Link>
              <span>/</span>
              <span className="text-stone-900">{property.reference}</span>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Image Gallery */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {images.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
                    {/* Main Image */}
                    <div 
                      className="md:col-span-2 relative aspect-video cursor-pointer group"
                      onClick={() => openLightbox(0)}
                    >
                      <Image
                        src={images[0]?.url || '/placeholder-property.jpg'}
                        alt={seoTitle}
                        fill
                        className="object-cover rounded-lg group-hover:brightness-95 transition"
                        priority
                      />
                      <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                        Click to view all {images.length} photos
                      </div>
                    </div>
                    
                    {/* Thumbnail Grid */}
                    {images.slice(1, 5).map((img: any, idx: number) => (
                      <div 
                        key={idx}
                        className="relative aspect-video cursor-pointer group"
                        onClick={() => openLightbox(idx + 1)}
                      >
                        <Image
                          src={img.url || '/placeholder-property.jpg'}
                          alt={`View ${idx + 2}`}
                          fill
                          className="object-cover rounded-lg group-hover:brightness-95 transition"
                        />
                        {idx === 3 && images.length > 5 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                            <span className="text-white text-lg font-semibold">+{images.length - 5} more</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="aspect-video bg-stone-200 flex items-center justify-center">
                    <span className="text-stone-500">No images available</span>
                  </div>
                )}
              </div>

              {/* Title & Price */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-stone-800 mb-4">
                  {seoTitle}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-amber-700">
                    €{price.toLocaleString()}
                  </span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                    {property.propertyType}
                  </span>
                  <span className="text-stone-600">
                    📍 {town}, {property.region || 'Costa Blanca'}
                  </span>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-stone-100 rounded-lg">
                  {property.bedrooms && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-stone-800">{property.bedrooms}</div>
                      <div className="text-sm text-stone-600">Bedrooms</div>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-stone-800">{property.bathrooms}</div>
                      <div className="text-sm text-stone-600">Bathrooms</div>
                    </div>
                  )}
                  {property.builtArea && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-stone-800">{property.builtArea}</div>
                      <div className="text-sm text-stone-600">m² Built</div>
                    </div>
                  )}
                  {property.plotArea > 0 && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-stone-800">{property.plotArea}</div>
                      <div className="text-sm text-stone-600">m² Plot</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Highlights */}
              {highlights.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-stone-800 mb-4">Property Highlights</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {highlights.map((highlight, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-2 p-3 bg-stone-100 rounded-lg"
                      >
                        <span className="text-amber-600">✓</span>
                        <span className="text-stone-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-stone-800 mb-4">Property Description</h2>
                <div className="prose prose-stone max-w-none">
                  <p className="text-stone-700 leading-relaxed whitespace-pre-line">
                    {description}
                  </p>
                </div>
              </div>

              {/* Lifestyle Section */}
              <div className="bg-gradient-to-br from-amber-50 to-stone-100 rounded-xl shadow-sm p-6 border border-amber-200">
                <h2 className="text-xl font-bold text-stone-800 mb-4">{lifestyle.title}</h2>
                <p className="text-stone-700 leading-relaxed">
                  {lifestyle.description}
                </p>
              </div>

              {/* ============================================ */}
              {/* INVESTMENT SECTION WITH CHARTS */}
              {/* ============================================ */}
              <div className="bg-gradient-to-br from-emerald-50 to-stone-100 rounded-xl shadow-sm p-6 border border-emerald-200">
                <h2 className="text-xl font-bold text-stone-800 mb-4">💰 Investment Potential</h2>
                <p className="text-stone-700 leading-relaxed mb-6">
                  {investmentContent}
                </p>
                
                {/* Investment Charts Grid */}
                <div className="grid grid-cols-1 gap-6 mt-6">
                  {/* Price Growth Chart */}
                  <div className="bg-white rounded-lg p-4">
                    <InvestmentChart area={town} />
                  </div>
                </div>
                
                {/* Area Price Comparison - Full Width */}
                <div className="bg-white rounded-lg p-4 mt-6">
                  <AreaPriceComparison />
                </div>
              </div>

              {/* Features List */}
              {property.features && property.features.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-stone-800 mb-4">All Features</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {property.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-stone-700">
                        <span className="text-amber-600">•</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Helpful Resources - Internal Links */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-stone-800 mb-4">Helpful Resources for Buyers</h2>
                <p className="text-stone-600 mb-4">
                  New to buying property in Spain? These guides will help you understand the process:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Link 
                    href="/guides/buying-process" 
                    className="flex items-center gap-2 p-3 bg-stone-100 rounded-lg hover:bg-amber-50 hover:border-amber-200 border border-transparent transition"
                  >
                    <span className="text-amber-600">📋</span>
                    <span className="text-stone-700 hover:text-amber-700">Complete Buying Guide</span>
                  </Link>
                  <Link 
                    href="/guides/nie-number" 
                    className="flex items-center gap-2 p-3 bg-stone-100 rounded-lg hover:bg-amber-50 hover:border-amber-200 border border-transparent transition"
                  >
                    <span className="text-amber-600">🪪</span>
                    <span className="text-stone-700 hover:text-amber-700">NIE Number Guide</span>
                  </Link>
                  <Link 
                    href="/guides/mortgages" 
                    className="flex items-center gap-2 p-3 bg-stone-100 rounded-lg hover:bg-amber-50 hover:border-amber-200 border border-transparent transition"
                  >
                    <span className="text-amber-600">🏦</span>
                    <span className="text-stone-700 hover:text-amber-700">Mortgage Guide</span>
                  </Link>
                  <Link 
                    href="/guides/taxes-costs" 
                    className="flex items-center gap-2 p-3 bg-stone-100 rounded-lg hover:bg-amber-50 hover:border-amber-200 border border-transparent transition"
                  >
                    <span className="text-amber-600">💶</span>
                    <span className="text-stone-700 hover:text-amber-700">Taxes & Costs Guide</span>
                  </Link>
                  <Link 
                    href={`/areas/${town.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center gap-2 p-3 bg-stone-100 rounded-lg hover:bg-amber-50 hover:border-amber-200 border border-transparent transition"
                  >
                    <span className="text-amber-600">📍</span>
                    <span className="text-stone-700 hover:text-amber-700">About {town}</span>
                  </Link>
                  <Link 
                    href="/properties" 
                    className="flex items-center gap-2 p-3 bg-stone-100 rounded-lg hover:bg-amber-50 hover:border-amber-200 border border-transparent transition"
                  >
                    <span className="text-amber-600">🏠</span>
                    <span className="text-stone-700 hover:text-amber-700">More Properties</span>
                  </Link>
                </div>
              </div>

              {/* FAQs */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-stone-800 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <details key={idx} className="group border-b border-stone-200 pb-4">
                      <summary className="flex justify-between items-center cursor-pointer text-stone-800 font-medium hover:text-amber-700">
                        {faq.question}
                        <span className="text-amber-600 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="mt-3 text-stone-600 pl-4">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                {/* Contact Card */}
                <div className="bg-gradient-to-br from-stone-100 to-stone-200 rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-stone-800 mb-4">Interested in this property?</h3>
                  <p className="text-stone-600 mb-6">
                    Get in touch for viewings, more information, or to make an offer.
                  </p>
                  
                  <div className="space-y-3">
                    <a 
                      href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
                    >
                      <span>💬</span> WhatsApp Us
                    </a>
                    
                    <a 
                      href="tel:+34634044970"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition"
                    >
                      <span>📞</span> Call +34 634 044 970
                    </a>
                  </div>
                </div>

                {/* Lead Form */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-stone-800 mb-4">Request Information</h3>
                  <LeadForm />
                  <h3 className="text-lg font-bold text-stone-800 mb-2">Need Financing?</h3>
                  <p className="text-stone-600 text-sm mb-4">
                    Get mortgage quotes from multiple Spanish banks through our partner Habeno.
                  </p>
                  <a 
                    href="https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                  >
                    Get Mortgage Quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": seoTitle,
              "description": description.substring(0, 500),
              "image": images[0]?.url,
              "brand": {
                "@type": "Brand",
                "name": "New Build Homes Costa Blanca"
              },
              "offers": {
                "@type": "Offer",
                "priceCurrency": "EUR",
                "price": price,
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@type": "RealEstateAgent",
                  "name": "New Build Homes Costa Blanca",
                  "telephone": "+34634044970"
                }
              }
            })
          }}
        />
      </main>
    </>
  );
}
