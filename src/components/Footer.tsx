import Link from 'next/link';

// Brand Colors
const BRAND = {
  navy: '#1e3a5f',
  orange: '#e8913a',
  orangeDark: '#d4792c',
};

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
  habeno: 'https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e',
  googleReviews: 'https://www.google.com/search?q=hansson+hertzell+reviews',
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Orange CTA Section */}
      <section 
        className="py-12 px-4"
        style={{ background: `linear-gradient(135deg, ${BRAND.orange} 0%, ${BRAND.orangeDark} 100%)` }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Browse our selection of new build properties across Costa Blanca or contact us for personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/properties"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#e8913a] font-bold px-8 py-4 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <span>🏠</span>
              View All Properties
            </Link>
            <a 
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
            <a 
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors"
            >
              <span>📞</span>
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer style={{ backgroundColor: BRAND.navy }} className="text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🏡</span>
                <span className="font-bold text-lg">
                  New Build Homes<br />
                  <span style={{ color: BRAND.orange }}>Costa Blanca</span>
                </span>
              </Link>
              <p className="text-gray-300 text-sm mb-4">
                Your trusted partner for new build properties in Costa Blanca, Spain.
              </p>
              <a 
                href={CONTACT.googleReviews}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors"
                style={{ color: BRAND.orange }}
              >
                ⭐ See Our Google Reviews
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* Costa Blanca South */}
            <div>
              <h3 className="font-bold mb-4" style={{ color: BRAND.orange }}>Costa Blanca South</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>
                  <Link href="/areas/torrevieja" className="hover:text-white transition-colors">
                    Torrevieja
                  </Link>
                </li>
                <li>
                  <Link href="/areas/orihuela-costa" className="hover:text-white transition-colors">
                    Orihuela Costa
                  </Link>
                </li>
                <li>
                  <Link href="/areas/villamartin" className="hover:text-white transition-colors">
                    Villamartin
                  </Link>
                </li>
                <li>
                  <Link href="/areas/guardamar" className="hover:text-white transition-colors">
                    Guardamar del Segura
                  </Link>
                </li>
                <li>
                  <Link href="/areas/algorfa" className="hover:text-white transition-colors">
                    Algorfa
                  </Link>
                </li>
                <li>
                  <Link href="/golf" className="hover:text-white transition-colors">
                    Golf Properties
                  </Link>
                </li>
              </ul>
            </div>

            {/* Costa Blanca North */}
            <div>
              <h3 className="font-bold mb-4" style={{ color: BRAND.orange }}>Costa Blanca North</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>
                  <Link href="/areas/javea" className="hover:text-white transition-colors">
                    Javea / Xabia
                  </Link>
                </li>
                <li>
                  <Link href="/areas/moraira" className="hover:text-white transition-colors">
                    Moraira
                  </Link>
                </li>
                <li>
                  <Link href="/areas/calpe" className="hover:text-white transition-colors">
                    Calpe
                  </Link>
                </li>
                <li>
                  <Link href="/areas/altea" className="hover:text-white transition-colors">
                    Altea
                  </Link>
                </li>
                <li>
                  <Link href="/areas/denia" className="hover:text-white transition-colors">
                    Denia
                  </Link>
                </li>
                <li>
                  <Link href="/areas/benidorm" className="hover:text-white transition-colors">
                    Benidorm
                  </Link>
                </li>
              </ul>
            </div>

            {/* Buyer Guides */}
            <div>
              <h3 className="font-bold mb-4" style={{ color: BRAND.orange }}>Buyer Guides</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>
                  <Link href="/guides/buying-process" className="hover:text-white transition-colors">
                    Buying Process
                  </Link>
                </li>
                <li>
                  <Link href="/guides/nie-number" className="hover:text-white transition-colors">
                    NIE Number Guide
                  </Link>
                </li>
                <li>
                  <Link href="/guides/mortgages" className="hover:text-white transition-colors">
                    Spanish Mortgages
                  </Link>
                </li>
                <li>
                  <Link href="/guides/taxes-costs" className="hover:text-white transition-colors">
                    Taxes &amp; Costs
                  </Link>
                </li>
                <li>
                  <Link href="/guides/golden-visa" className="hover:text-white transition-colors">
                    Golden Visa Spain
                  </Link>
                </li>
                <li>
                  <Link href="/builders" className="hover:text-white transition-colors">
                    View Builders
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold mb-4" style={{ color: BRAND.orange }}>Contact Us</h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li>
                  <a 
                    href={`tel:${CONTACT.phone}`}
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    📞 {CONTACT.phone}
                  </a>
                </li>
                <li>
                  <a 
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    📱 WhatsApp Us
                  </a>
                </li>
                <li>
                  <a 
                    href={CONTACT.habeno}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    💰 Get Mortgage Quote
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-2">
                    ✉️ Contact Form
                  </Link>
                </li>
              </ul>
              
              {/* Trust badges */}
              <div className="mt-6 pt-4 border-t border-gray-700">
                <p className="text-xs text-gray-400 mb-2">Specialist in Costa Blanca since 2020</p>
                <p className="text-xs text-gray-400">EN | SE | ES support</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <p>&copy; {currentYear} New Build Homes Costa Blanca. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
