import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Nybyggen Costa Blanca | Moderna Bostäder i Spanien',
    template: '%s | Nybyggen Costa Blanca',
  },
  description: 'Hitta din drömbostad på Costa Blanca, Spanien. Villor, lägenheter och radhus från pålitliga byggherrar.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/sv',
    languages: {
      'en': 'https://newbuildhomescostablanca.com',
      'sv': 'https://newbuildhomescostablanca.com/sv',
      'x-default': 'https://newbuildhomescostablanca.com',
    },
  },
};

export default function SwedishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
