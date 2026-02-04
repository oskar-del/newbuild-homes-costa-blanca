'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

interface LeadFormAdvancedProps {
  title?: string;
  subtitle?: string;
  propertyInterest?: string;
  formName?: string;
  variant?: 'default' | 'sidebar' | 'hero';
  showBudget?: boolean;
  showTimeline?: boolean;
  showCallbackDate?: boolean;
  ctaText?: string;
  source?: string;
}

const BUDGET_OPTIONS = [
  { value: 'under-200k', label: 'Under €200,000' },
  { value: '200k-300k', label: '€200,000 - €300,000' },
  { value: '300k-500k', label: '€300,000 - €500,000' },
  { value: '500k-800k', label: '€500,000 - €800,000' },
  { value: '800k-plus', label: '€800,000+' },
];

const TIMELINE_OPTIONS = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '3-months', label: 'Within 3 months' },
  { value: '6-months', label: 'Within 6 months' },
  { value: '12-months', label: 'Within 12 months' },
  { value: 'just-looking', label: 'Just researching' },
];

const CONTACT_PREFERENCES = [
  { value: 'email', label: 'Email', icon: '✉️' },
  { value: 'whatsapp', label: 'WhatsApp', icon: '💬' },
  { value: 'phone', label: 'Phone call', icon: '📞' },
];

export default function LeadFormAdvanced({
  title = 'Get Personalized Recommendations',
  subtitle = "Tell us what you're looking for and we'll match you with suitable properties.",
  propertyInterest,
  formName = 'advanced-inquiry',
  variant = 'default',
  showBudget = true,
  showTimeline = true,
  showCallbackDate = true,
  ctaText = 'Send My Request',
  source,
}: LeadFormAdvancedProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    timeline: '',
    contactPreference: 'email',
    callbackDate: '',
    callbackTime: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const formBody = new URLSearchParams();
      formBody.append('form-name', formName);
      Object.entries(formData).forEach(([key, value]) => {
        if (value) formBody.append(key, value);
      });
      if (propertyInterest) formBody.append('propertyInterest', propertyInterest);
      if (source) formBody.append('source', source);

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString(),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  // Generate next 14 days for date picker
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }),
        });
      }
    }
    return dates;
  };

  const TIME_SLOTS = [
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '17:00', label: '5:00 PM' },
  ];

  if (status === 'success') {
    return (
      <div className={`rounded-2xl p-8 text-center ${variant === 'hero' ? 'bg-white/10 backdrop-blur' : 'bg-success-50 border border-success-200'}`}>
        <div className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className={`text-xl font-bold mb-2 ${variant === 'hero' ? 'text-white' : 'text-success-800'}`}>
          Thank You!
        </h3>
        <p className={`mb-4 ${variant === 'hero' ? 'text-white/80' : 'text-success-700'}`}>
          We've received your request and will be in touch within 24 hours.
        </p>
        <p className={`text-sm ${variant === 'hero' ? 'text-white/60' : 'text-success-600'}`}>
          {formData.contactPreference === 'whatsapp' && 'Expect a WhatsApp message from us soon.'}
          {formData.contactPreference === 'phone' && formData.callbackDate && `We'll call you on ${formData.callbackDate} at ${formData.callbackTime || 'a convenient time'}.`}
          {formData.contactPreference === 'email' && 'Check your inbox for our response.'}
        </p>
      </div>
    );
  }

  const isHero = variant === 'hero';
  const inputClasses = isHero
    ? 'w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none transition-all'
    : 'w-full px-4 py-3 bg-white border border-warm-200 rounded-xl text-primary-900 placeholder-warm-400 focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all';

  const labelClasses = isHero ? 'text-white/80' : 'text-warm-700';
  const selectClasses = isHero
    ? 'w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-accent-400 focus:border-transparent outline-none transition-all appearance-none cursor-pointer'
    : 'w-full px-4 py-3 bg-white border border-warm-200 rounded-xl text-primary-900 focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer';

  return (
    <div className={`rounded-2xl ${isHero ? 'bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8' : 'bg-white shadow-xl border border-warm-100 p-6 md:p-8'}`}>
      {/* Header */}
      <div className="mb-6">
        <h3 className={`text-xl md:text-2xl font-bold mb-2 ${isHero ? 'text-white' : 'text-primary-900'}`}>
          {title}
        </h3>
        <p className={`text-sm ${isHero ? 'text-white/70' : 'text-warm-600'}`}>
          {subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} name={formName} method="POST" data-netlify="true" className="space-y-5">
        <input type="hidden" name="form-name" value={formName} />
        <input type="hidden" name="bot-field" />
        {propertyInterest && <input type="hidden" name="propertyInterest" value={propertyInterest} />}
        {source && <input type="hidden" name="source" value={source} />}

        {/* Name & Email Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${labelClasses}`}>
              Your Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClasses}
              placeholder="John Smith"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${labelClasses}`}>
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClasses}
              placeholder="john@example.com"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className={`block text-sm font-medium mb-1.5 ${labelClasses}`}>
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={inputClasses}
            placeholder="+44 7XXX XXX XXX"
          />
        </div>

        {/* Budget */}
        {showBudget && (
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${labelClasses}`}>
              Budget Range
            </label>
            <div className="relative">
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className={selectClasses}
              >
                <option value="">Select your budget</option>
                {BUDGET_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className={`w-4 h-4 ${isHero ? 'text-white/60' : 'text-warm-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Timeline */}
        {showTimeline && (
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${labelClasses}`}>
              When are you looking to buy?
            </label>
            <div className="relative">
              <select
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                className={selectClasses}
              >
                <option value="">Select timeline</option>
                {TIMELINE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className={`w-4 h-4 ${isHero ? 'text-white/60' : 'text-warm-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Contact Preference */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${labelClasses}`}>
            How would you like us to contact you?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {CONTACT_PREFERENCES.map((pref) => (
              <button
                key={pref.value}
                type="button"
                onClick={() => setFormData({ ...formData, contactPreference: pref.value })}
                className={`p-3 rounded-xl border-2 transition-all text-center ${
                  formData.contactPreference === pref.value
                    ? isHero
                      ? 'border-accent-400 bg-accent-500/20 text-white'
                      : 'border-accent-500 bg-accent-50 text-accent-700'
                    : isHero
                      ? 'border-white/20 text-white/70 hover:border-white/40'
                      : 'border-warm-200 text-warm-600 hover:border-warm-300'
                }`}
              >
                <span className="text-lg block mb-1">{pref.icon}</span>
                <span className="text-xs font-medium">{pref.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Callback Date/Time - Only show if phone selected */}
        {showCallbackDate && formData.contactPreference === 'phone' && (
          <div className={`p-4 rounded-xl ${isHero ? 'bg-white/5 border border-white/10' : 'bg-warm-50 border border-warm-100'}`}>
            <label className={`block text-sm font-medium mb-3 ${labelClasses}`}>
              📅 Preferred callback time
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <select
                  value={formData.callbackDate}
                  onChange={(e) => setFormData({ ...formData, callbackDate: e.target.value })}
                  className={selectClasses}
                >
                  <option value="">Select date</option>
                  {getAvailableDates().map((date) => (
                    <option key={date.value} value={date.value}>{date.label}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className={`w-4 h-4 ${isHero ? 'text-white/60' : 'text-warm-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <select
                  value={formData.callbackTime}
                  onChange={(e) => setFormData({ ...formData, callbackTime: e.target.value })}
                  className={selectClasses}
                >
                  <option value="">Select time</option>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot.value} value={slot.value}>{slot.label}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className={`w-4 h-4 ${isHero ? 'text-white/60' : 'text-warm-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <p className={`text-xs mt-2 ${isHero ? 'text-white/50' : 'text-warm-500'}`}>
              Times are in Spanish time (CET). We'll confirm via email.
            </p>
          </div>
        )}

        {/* Message */}
        <div>
          <label className={`block text-sm font-medium mb-1.5 ${labelClasses}`}>
            Any specific requirements? (optional)
          </label>
          <textarea
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className={`${inputClasses} resize-none`}
            placeholder="E.g., Looking for a 2-bed apartment near the beach with sea views..."
          />
        </div>

        {/* Error */}
        {status === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-sm text-red-700">
              Something went wrong. Please try again or contact us directly via WhatsApp.
            </p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={`w-full font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 ${
            isHero
              ? 'bg-accent-500 hover:bg-accent-600 text-white shadow-lg hover:shadow-xl'
              : 'bg-accent-500 hover:bg-accent-600 text-white shadow-md hover:shadow-lg'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
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
            <>
              {ctaText}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>

        {/* WhatsApp Alternative */}
        <div className={`text-center pt-2 ${isHero ? 'text-white/60' : 'text-warm-500'}`}>
          <span className="text-sm">or message us directly on </span>
          <a
            href="https://wa.me/34634044970?text=Hi%2C%20I%27m%20interested%20in%20properties%20on%20Costa%20Blanca"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-semibold hover:underline ${isHero ? 'text-[#25D366]' : 'text-[#25D366]'}`}
          >
            WhatsApp →
          </a>
        </div>

        {/* Privacy */}
        <p className={`text-xs text-center ${isHero ? 'text-white/40' : 'text-warm-400'}`}>
          By submitting, you agree to our{' '}
          <Link href="/privacy" className="underline hover:no-underline">privacy policy</Link>.
          We'll never share your data.
        </p>
      </form>
    </div>
  );
}
