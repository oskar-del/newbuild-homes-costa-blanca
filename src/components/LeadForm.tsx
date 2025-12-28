'use client';

import { useState } from 'react';
import { siteConfig } from '@/lib/config';

interface LeadFormProps {
  propertyInterest?: string;
  source?: string;
  compact?: boolean;
  className?: string;
}

export default function LeadForm({ 
  propertyInterest, 
  source = 'website',
  compact = false,
  className = ''
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Get UTM parameters from URL
      const urlParams = typeof window !== 'undefined' 
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams();

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          propertyInterest,
          source,
          utmSource: urlParams.get('utm_source') || '',
          utmMedium: urlParams.get('utm_medium') || '',
          utmCampaign: urlParams.get('utm_campaign') || '',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Submission failed');
      }
      
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={`bg-success-50 border border-success-200 rounded-xl p-6 text-center ${className}`}>
        <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display font-semibold text-lg text-success-800 mb-2">
          Thank You!
        </h3>
        <p className="text-success-700 mb-4">
          We've received your enquiry and will contact you within 24 hours.
        </p>
        <p className="text-sm text-success-600">
          Need faster assistance? 
          <a 
            href={siteConfig.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline ml-1"
          >
            WhatsApp us now
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className={compact ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-4'}>
        <div>
          <label htmlFor="name" className="form-label">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            required
            className="form-input"
            placeholder="John Smith"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="email" className="form-label">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            required
            className="form-input"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="phone" className="form-label">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          required
          className="form-input"
          placeholder="+44 7XXX XXXXXX"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      {!compact && (
        <div>
          <label htmlFor="message" className="form-label">
            Message (Optional)
          </label>
          <textarea
            id="message"
            rows={4}
            className="form-input resize-none"
            placeholder="Tell us about your requirements..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </>
        ) : (
          'Request Information'
        )}
      </button>

      {status === 'error' && (
        <p className="text-red-600 text-sm text-center">
          Something went wrong. Please try again or contact us via WhatsApp.
        </p>
      )}

      <p className="text-xs text-slate-500 text-center">
        By submitting this form, you agree to our{' '}
        <a href="/privacy" className="underline">Privacy Policy</a>.
      </p>
    </form>
  );
}
