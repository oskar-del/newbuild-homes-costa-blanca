const fs = require('fs');

const content = `import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">New Build Homes Costa Blanca</h3>
            <p className="text-gray-400 mb-4">
              Your trusted partner for new build properties on Spain's Costa Blanca. 
              We help international buyers find their perfect home.
            </p>
            <div className="flex space-x-4">
              
                href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300"
              >
                WhatsApp
              </a>
              <a href="tel:+34634044970" className="text-blue-400 hover:text-blue-300">
                +34 634 044 970
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/developments" className="hover:text-white">Developments</Link></li>
              <li><Link href="/builders" className="hover:text-white">Builders</Link></li>
              <li><Link href="/areas" className="hover:text-white">Areas</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="mailto:oskar@hanssonhertzell.com" className="hover:text-white">
                  oskar@hanssonhertzell.com
                </a>
              </li>
              <li>
                <a href="tel:+34634044970" className="hover:text-white">
                  +34 634 044 970
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} New Build Homes Costa Blanca. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
`;

fs.writeFileSync('src/components/Footer.tsx', content);
console.log('Footer.tsx created');
