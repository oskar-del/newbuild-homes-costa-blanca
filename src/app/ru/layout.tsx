import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Новостройки Коста Бланка | Современная Недвижимость в Испании',
    template: '%s | Новостройки Коста Бланка',
  },
  description: 'Найдите дом своей мечты на Коста Бланка, Испания. Виллы, апартаменты и таунхаусы от надёжных застройщиков.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/ru',
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

export default function RussianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
