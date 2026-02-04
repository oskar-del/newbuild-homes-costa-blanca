interface LifestyleQuoteProps {
  quote: string;
  variant?: 'warm' | 'primary' | 'accent';
}

export default function LifestyleQuote({ quote, variant = 'warm' }: LifestyleQuoteProps) {
  const variants = {
    warm: 'bg-warm-100 border-warm-200 text-warm-700',
    primary: 'bg-primary-50 border-primary-100 text-primary-800',
    accent: 'bg-accent-50 border-accent-200 text-accent-800',
  };

  return (
    <div className={`py-8 border-y ${variants[variant]}`}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-lg italic leading-relaxed">
          "{quote}"
        </p>
      </div>
    </div>
  );
}
