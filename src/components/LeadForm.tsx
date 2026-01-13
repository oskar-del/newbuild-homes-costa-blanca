'use client';

import { useState, FormEvent } from 'react';

interface LeadFormProps {
  compact?: boolean;
  propertyReference?: string;
  customMessage?: string;
  onSuccess?: () => void;
  title?: string;
  subtitle?: string;
  propertyInterest?: string;
  formName?: string;
}

export default function LeadForm({ 
  compact = false, 
  propertyReference,
  customMessage,
  onSuccess,
  title,
  subtitle,
  propertyInterest,
  formName = 'property-inquiry'
}: LeadFormProps) {
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
      // Prepare form data for Netlify
      const formBody = new URLSearchParams();
      formBody.append('form-name', formName);
      formBody.append('name', formData.name);
      formBody.append('email', formData.email);
      formBody.append('phone', formData.phone);
      formBody.append('message', formData.message);
      if (propertyReference) {
        formBody.append('propertyReference', propertyReference);
      }
      if (propertyInterest) {
        formBody.append('propertyInterest', propertyInterest);
      }

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString(),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: customMessage || '' });
        if (onSuccess) {
          setTimeout(onSuccess, 2000); // Give user time to see success message
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
      <div className={`${compact ? 'p-4' : 'p-6'} bg-green-50 border border-green-200 rounded-lg text-center`}>
        <div className="text-green-600 text-2xl mb-2">✓</div>
        <p className="font-semibold text-green-800">Thank you!</p>
        <p className="text-sm text-green-600 mt-1">
          We&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit}
      name={formName}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      className="space-y-4"
    >
      {/* Netlify form hidden fields */}
      <input type="hidden" name="form-name" value={formName} />
      <input type="hidden" name="bot-field" />
      {propertyReference && (
        <input type="hidden" name="propertyReference" value={propertyReference} />
      )}
      {propertyInterest && (
        <input type="hidden" name="propertyInterest" value={propertyInterest} />
      )}

      {title && (
        <h4 className="font-semibold text-[#1e3a5f] mb-1">{title}</h4>
      )}
      
      {subtitle && (
        <p className="text-sm text-stone-600 mb-3">{subtitle}</p>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
          Your Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#e8913a] focus:border-transparent outline-none transition-all"
          placeholder="John Smith"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#e8913a] focus:border-transparent outline-none transition-all"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#e8913a] focus:border-transparent outline-none transition-all"
          placeholder="+44 7123 456789"
        />
      </div>

      {!compact && (
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#e8913a] focus:border-transparent outline-none transition-all resize-none"
            placeholder="I'm interested in this property..."
          />
        </div>
      )}

      {status === 'error' && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">
            Something went wrong. Please try again or contact us directly.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-[#e8913a] hover:bg-[#d4792c] disabled:bg-stone-400 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {status === 'submitting' ? (
          <>
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </>
        ) : (
          'Send Enquiry'
        )}
      </button>

      <p className="text-xs text-stone-500 text-center">
        We respect your privacy. Your information will only be used to respond to your enquiry.
      </p>
    </form>
  );
}
