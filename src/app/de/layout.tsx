import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Neubau Costa Blanca | Moderne Immobilien in Spanien',
    template: '%s | Neubau Costa Blanca',
  },
  description: 'Entdecken Sie Ihre Traumimmobilie an der Costa Blanca, Spanien. Villen, Apartments und Reihenhäuser von zuverlässigen Bauträgern.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/de',
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

export default function GermanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
