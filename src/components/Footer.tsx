import Link from 'next/link';

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
  habeno: 'https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e',
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🏡</span>
              <span className="font-bold text-lg">
                New Build Homes<br />Costa Blanca
              </span>
            </Link>
            <p className="text-gray-400 text-sm">
              Your trusted partner for new build properties in Costa Blanca, Spain.
            </p>
          </div>

          {/* Properties */}
          <div>
            <h3 className="font-bold mb-4 text-white">Properties</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/developments" className="hover:text-white transition-colors">
                  All Developments
                </Link>
              </li>
              <li>
                <Link href="/areas/javea-xabia" className="hover:text-white transition-colors">
                  Jávea Properties
                </Link>
              </li>
              <li>
                <Link href="/areas/moraira" className="hover:text-white transition-colors">
                  Moraira Properties
                </Link>
              </li>
              <li>
                <Link href="/builders" className="hover:text-white transition-colors">
                  View Builders
                </Link>
              </li>
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h3 className="font-bold mb-4 text-white">Areas</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/areas/javea-xabia" className="hover:text-white transition-colors">
                  Jávea / Xàbia
                </Link>
              </li>
              <li>
                <Link href="/areas/moraira" className="hover:text-white transition-colors">
                  Moraira
                </Link>
              </li>
              <li>
                <Link href="/areas" className="hover:text-white transition-colors">
                  All Area Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 text-white">Contact</h3>
            <ul className="space-y-3 text-gray-400">
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
                  📱 WhatsApp
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
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p>© {currentYear} New Build Homes Costa Blanca. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
