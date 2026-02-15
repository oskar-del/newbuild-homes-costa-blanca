import LeadForm from './LeadForm';

interface LeadFormSectionProps {
  area?: string;
  language?: string;
  propertyType?: string;
  budgetRange?: string;
  developmentName?: string;
  formType?: string;
  sourcePage?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  compact?: boolean;
}

const subtitleTranslations: Record<string, string> = {
  en: 'Fill in your details and we\'ll match you with the best properties',
  sv: 'Fyll i dina uppgifter så matchar vi dig med de bästa fastigheterna',
  nl: 'Vul uw gegevens in en wij matchen u met de beste woningen',
  'nl-be': 'Vul uw gegevens in en wij matchen u met de beste woningen',
  fr: 'Remplissez vos coordonnées et nous vous proposerons les meilleures propriétés',
  de: 'Geben Sie Ihre Daten ein und wir finden die besten Immobilien für Sie',
  no: 'Fyll inn dine opplysninger så matcher vi deg med de beste boligene',
  pl: 'Wpisz swoje dane, a my dopasujemy Cię do najlepszych nieruchomości',
  ru: 'Заполните свои данные, и мы подберем вам лучшие объекты недвижимости',
};

const titleTranslations: Record<string, { interested: string; getInTouch: string }> = {
  en: { interested: 'Interested in {area}?', getInTouch: 'Get in Touch' },
  sv: { interested: 'Intresserad av {area}?', getInTouch: 'Kontakta Oss' },
  nl: { interested: 'Geïnteresseerd in {area}?', getInTouch: 'Neem Contact Op' },
  'nl-be': { interested: 'Geïnteresseerd in {area}?', getInTouch: 'Neem Contact Op' },
  fr: { interested: 'Intéressé par {area} ?', getInTouch: 'Contactez-Nous' },
  de: { interested: 'Interesse an {area}?', getInTouch: 'Kontaktieren Sie Uns' },
  no: { interested: 'Interessert i {area}?', getInTouch: 'Kontakt Oss' },
  pl: { interested: 'Zainteresowany {area}?', getInTouch: 'Skontaktuj Się' },
  ru: { interested: 'Интересует {area}?', getInTouch: 'Свяжитесь с Нами' },
};

export default function LeadFormSection({
  area,
  language = 'en',
  propertyType,
  budgetRange,
  developmentName,
  formType = 'General Contact',
  sourcePage,
  title,
  subtitle,
  className = '',
  compact = false,
}: LeadFormSectionProps) {
  const lang = (language || 'en').toLowerCase();

  // Generate default title if not provided, translated
  const titleT = titleTranslations[lang] || titleTranslations.en;
  const defaultTitle = area
    ? titleT.interested.replace('{area}', area)
    : titleT.getInTouch;

  const finalTitle = title || defaultTitle;
  const finalSubtitle = subtitle || subtitleTranslations[lang] || subtitleTranslations.en;

  return (
    <section className={`bg-warm-100 py-12 md:py-16 ${className}`}>
      <div className="max-w-md mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-3">
            {finalTitle}
          </h2>
          <p className="text-warm-600 text-lg">
            {finalSubtitle}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <LeadForm
            area={area}
            language={language}
            propertyType={propertyType}
            budgetRange={budgetRange}
            developmentName={developmentName}
            formType={formType}
            sourcePage={sourcePage}
            compact={compact}
          />
        </div>
      </div>
    </section>
  );
}
