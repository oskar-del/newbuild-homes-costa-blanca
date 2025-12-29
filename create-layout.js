const fs = require('fs');

const content = `import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'New Build Homes Costa Blanca | New Construction Properties Spain',
  description: 'Discover new build properties on Spain\\'s Costa Blanca. Apartments, villas, and townhouses from trusted developers. Contact us for availability and pricing.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
`;

fs.writeFileSync('src/app/layout.tsx', content);
console.log('layout.tsx created');
