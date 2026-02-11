import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Nieuwbouw Costa Blanca | Moderne Woningen in Spanje',
    template: '%s | Nieuwbouw Costa Blanca',
  },
  description: 'Ontdek uw droomwoning aan de Costa Blanca, Spanje. Villa\'s, appartementen en woningen van betrouwbare promotoren.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl-be',
    languages: {
      'en': 'https://newbuildhomescostablanca.com',
      'sv': 'https://newbuildhomescostablanca.com/sv',
      'nl': 'https://newbuildhomescostablanca.com/nl',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be',
      'fr': 'https://newbuildhomescostablanca.com/fr',
      'no': 'https://newbuildhomescostablanca.com/no',
      'de': 'https://newbuildhomescostablanca.com/de',
      'pl': 'https://newbuildhomescostablanca.com/pl',
      'ru': 'https://newbuildhomescostablanca.com/ru',
      'x-default': 'https://newbuildhomescostablanca.com',
    },
  },
};

export default function FlemishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
