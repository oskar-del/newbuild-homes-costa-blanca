'use client';

import { useState } from 'react';

interface LeadFormProps {
  /** Pre-fill property of interest (e.g., from development page) */
  propertyInterest?: string;
  /** Form title */
  title?: string;
  /** Form subtitle */
  subtitle?: string;
  /** Compact mode for sidebars */
  compact?: boolean;
  /** Form name for Netlify (allows multiple forms) */
  formName?: string;
}

export default function LeadForm({
  propertyInterest = '',
  title = 'Get More Information',
  subtitle = 'Leave your details and we\'ll be in touch within 24 hours',
  compact = false,
  formName = 'lead-inquiry',
}: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please try WhatsApp or call us directly.');
      }
    } catch (err) {
      setError('Something went wrong. Please try WhatsApp or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-xl ${compact ? 'p-4' : 'p-6'}`}>
        <div className="text-center">
          <div className="text-4xl mb-3">✓</div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">Thank You!</h3>
          <p className="text-green-700 text-sm">
            We've received your inquiry and will be in touch within 24 hours.
          </p>
          <p className="text-green-600 text-sm mt-3">
            Need faster response?{' '}
            <a
              href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium"
            >
              WhatsApp us
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-50 rounded-xl ${compact ? 'p-4' : 'p-6'}`}>
      {title && (
        <h3 className={`font-bold text-gray-900 ${compact ? 'text-lg mb-1' : 'text-xl mb-2'}`}>
          {title}
        </h3>
      )}
      {subtitle && (
        <p className={`text-gray-600 ${compact ? 'text-sm mb-4' : 'mb-6'}`}>
          {subtitle}
        </p>
      )}

      <form
        name={formName}
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Hidden fields for Netlify */}
        <input type="hidden" name="form-name" value={formName} />
        <input type="hidden" name="bot-field" />
        
        {/* Property of interest (hidden if pre-filled, shown if not) */}
        {propertyInterest ? (
          <input type="hidden" name="property-interest" value={propertyInterest} />
        ) : (
          <div>
            <label htmlFor="property-interest" className="block text-sm font-medium text-gray-700 mb-1">
              Property Interest
            </label>
            <select
              id="property-interest"
              name="property-interest"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="General inquiry">General inquiry</option>
              <option value="New build villa">New build villa</option>
              <option value="New build apartment">New build apartment</option>
              <option value="Golf property">Golf property</option>
              <option value="Investment property">Investment property</option>
              <option value="Costa Blanca North">Costa Blanca North</option>
              <option value="Costa Blanca South">Costa Blanca South</option>
            </select>
          </div>
        )}

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your full name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="your@email.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="+46 70 123 4567"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Message */}
        {!compact && (
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              placeholder="Tell us about what you're looking for..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          {loading ? 'Sending...' : 'Send Inquiry'}
        </button>
      </form>

      {/* Alternative contact */}
      <div className={`text-center ${compact ? 'mt-4 pt-4' : 'mt-6 pt-6'} border-t border-gray-200`}>
        <p className="text-sm text-gray-600 mb-2">Prefer to talk directly?</p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <a
            href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
          <a
            href="tel:+34634044970"
            className="inline-flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +34 634 044 970
          </a>
        </div>
      </div>
    </div>
  );
}
