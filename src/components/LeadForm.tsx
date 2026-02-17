'use client';

import { useState, FormEvent } from 'react';

interface LeadFormProps {
  area?: string;
  language?: string;
  propertyType?: string;
  budgetRange?: string;
  developmentName?: string;
  formType?: string;
  className?: string;
  sourcePage?: string;
  compact?: boolean;
  propertyReference?: string;
  customMessage?: string;
  onSuccess?: () => void;
  title?: string;
  subtitle?: string;
  propertyInterest?: string;
  formName?: string;
}

const translations = {
  en: {
    name: 'Your Name',
    email: 'Email Address',
    phone: 'Phone (optional)',
    message: 'Message',
    submit: 'Send Inquiry',
    sending: 'Sending...',
    thankYou: 'Thank you!',
    wellBeInTouch: 'We\'ll be in touch within 24 hours.',
    privacy: 'We respect your privacy. Your data is handled securely.',
  },
  sv: {
    name: 'Ditt namn',
    email: 'E-postadress',
    phone: 'Telefon (valfritt)',
    message: 'Meddelande',
    submit: 'Skicka förfrågan',
    sending: 'Skickar...',
    thankYou: 'Tack!',
    wellBeInTouch: 'Vi kommer att kontakta dig inom 24 timmar.',
    privacy: 'Vi respekterar din integritet. Dina data hanteras säkert.',
  },
  nl: {
    name: 'Uw naam',
    email: 'E-mailadres',
    phone: 'Telefoon (optioneel)',
    message: 'Bericht',
    submit: 'Verstuur aanvraag',
    sending: 'Versturen...',
    thankYou: 'Dank u!',
    wellBeInTouch: 'We nemen binnen 24 uur contact met u op.',
    privacy: 'Wij respecteren uw privacy. Uw gegevens worden veilig verwerkt.',
  },
  'nl-be': {
    name: 'Uw naam',
    email: 'E-mailadres',
    phone: 'Telefoon (optioneel)',
    message: 'Bericht',
    submit: 'Verstuur aanvraag',
    sending: 'Versturen...',
    thankYou: 'Dank u!',
    wellBeInTouch: 'We nemen binnen 24 uur contact met u op.',
    privacy: 'Wij respecteren uw privacy. Uw gegevens worden veilig verwerkt.',
  },
  fr: {
    name: 'Votre nom',
    email: 'Adresse e-mail',
    phone: 'Téléphone (optionnel)',
    message: 'Message',
    submit: 'Envoyer la demande',
    sending: 'Envoi...',
    thankYou: 'Merci!',
    wellBeInTouch: 'Nous vous contacterons dans les 24 heures.',
    privacy: 'Nous respectons votre vie privée. Vos données sont traitées de manière sécurisée.',
  },
  de: {
    name: 'Ihr Name',
    email: 'E-Mail-Adresse',
    phone: 'Telefon (optional)',
    message: 'Nachricht',
    submit: 'Anfrage senden',
    sending: 'Wird gesendet...',
    thankYou: 'Danke!',
    wellBeInTouch: 'Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.',
    privacy: 'Wir respektieren Ihre Privatsphäre. Ihre Daten werden sicher behandelt.',
  },
  no: {
    name: 'Ditt navn',
    email: 'E-postadresse',
    phone: 'Telefon (valgfritt)',
    message: 'Melding',
    submit: 'Send forespørsel',
    sending: 'Sender...',
    thankYou: 'Takk!',
    wellBeInTouch: 'Vi kontakter deg innen 24 timer.',
    privacy: 'Vi respekterer personvernet ditt. Dataene dine behandles sikkert.',
  },
  pl: {
    name: 'Twoje imię',
    email: 'Adres e-mail',
    phone: 'Telefon (opcjonalnie)',
    message: 'Wiadomość',
    submit: 'Wyślij zapytanie',
    sending: 'Wysyłanie...',
    thankYou: 'Dziękuję!',
    wellBeInTouch: 'Skontaktujemy się z Tobą w ciągu 24 godzin.',
    privacy: 'Szanujemy Twoją prywatność. Twoje dane są bezpiecznie przechowywane.',
  },
  ru: {
    name: 'Ваше имя',
    email: 'Адрес электронной почты',
    phone: 'Телефон (опционально)',
    message: 'Сообщение',
    submit: 'Отправить запрос',
    sending: 'Отправка...',
    thankYou: 'Спасибо!',
    wellBeInTouch: 'Мы свяжемся с вами в течение 24 часов.',
    privacy: 'Мы уважаем вашу конфиденциальность. Ваши данные обрабатываются безопасно.',
  },
};

export default function LeadForm({
  area,
  language = 'en',
  propertyType,
  budgetRange,
  developmentName,
  formType = 'General Contact',
  className = '',
  sourcePage,
  compact = false,
  propertyReference,
  customMessage,
  onSuccess,
  title,
  subtitle,
  propertyInterest,
  formName = 'property-inquiry'
}: LeadFormProps) {
  const lang = (language || 'en').toLowerCase() as keyof typeof translations;
  const t = translations[lang] || translations.en;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: customMessage || '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          area,
          propertyType,
          budgetRange,
          developmentName,
          formType,
          sourcePage,
          language,
          propertyReference,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: customMessage || '' });
        if (onSuccess) {
          setTimeout(onSuccess, 2000);
        }
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={`${compact ? 'p-4' : 'p-6'} bg-success-100 border border-success-300 rounded-lg text-center ${className}`}>
        <div className="text-success-500 text-2xl mb-2">✓</div>
        <p className="font-medium text-success-700">{t.thankYou}</p>
        <p className="text-sm text-success-600 mt-1">
          {t.wellBeInTouch}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 ${className}`}
    >
      {title && (
        <h4 className="font-medium text-primary-900 mb-1">{title}</h4>
      )}

      {subtitle && (
        <p className="text-sm text-warm-600 mb-3">{subtitle}</p>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-warm-700 mb-1">
          {t.name} *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-warm-300 rounded-md focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all bg-white text-warm-900"
          placeholder={t.name}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-warm-700 mb-1">
          {t.email} *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 border border-warm-300 rounded-md focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all bg-white text-warm-900"
          placeholder={t.email}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-warm-700 mb-1">
          {t.phone}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-3 py-2 border border-warm-300 rounded-md focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all bg-white text-warm-900"
          placeholder={t.phone}
        />
      </div>

      {!compact && (
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-warm-700 mb-1">
            {t.message}
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-3 py-2 border border-warm-300 rounded-md focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all resize-none bg-white text-warm-900"
            placeholder={t.message}
          />
        </div>
      )}

      {status === 'error' && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">
            Something went wrong. Please try again or contact us directly.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-warm-400 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
      >
        {status === 'submitting' ? (
          <>
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {t.sending}
          </>
        ) : (
          t.submit
        )}
      </button>

      <p className="text-xs text-warm-500 text-center">
        {t.privacy}
      </p>
    </form>
  );
}
