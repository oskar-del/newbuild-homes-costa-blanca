import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Privacy Policy | New Build Homes Costa Blanca',
  description: 'Privacy Policy for New Build Homes Costa Blanca. Learn how we collect, use, and protect your personal data.',
};

export default function PrivacyPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Privacy Policy', url: 'https://newbuildhomescostablanca.com/privacy/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />

      <main className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="bg-primary-900 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Privacy Policy</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-light text-white">
              Privacy Policy
            </h1>
            <p className="text-warm-300 mt-4">
              Last updated: February 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 prose prose-warm max-w-none">

              <h2 className="text-2xl font-semibold text-primary-900 mt-0">1. Introduction</h2>
              <p className="text-warm-700">
                New Build Homes Costa Blanca (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you
                visit our website newbuildhomescostablanca.com.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">2. Information We Collect</h2>

              <h3 className="text-lg font-semibold text-primary-900">Personal Information</h3>
              <p className="text-warm-700">
                When you fill out our contact forms or inquiry forms, we may collect:
              </p>
              <ul className="text-warm-700">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Property preferences and requirements</li>
                <li>Budget range</li>
                <li>Timeline for purchase</li>
              </ul>

              <h3 className="text-lg font-semibold text-primary-900">Automatically Collected Information</h3>
              <p className="text-warm-700">
                When you visit our website, we may automatically collect certain information including:
              </p>
              <ul className="text-warm-700">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
                <li>Device information</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary-900">3. Cookies</h2>
              <p className="text-warm-700">
                We use cookies and similar tracking technologies to improve your browsing experience.
                You can control cookie preferences through our cookie consent banner.
              </p>

              <h3 className="text-lg font-semibold text-primary-900">Types of Cookies We Use</h3>
              <ul className="text-warm-700">
                <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site (Google Analytics)</li>
                <li><strong>Marketing Cookies:</strong> Used to track visitors across websites for advertising purposes</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary-900">4. How We Use Your Information</h2>
              <p className="text-warm-700">We use the information we collect to:</p>
              <ul className="text-warm-700">
                <li>Respond to your inquiries and property requests</li>
                <li>Send you information about properties that match your criteria</li>
                <li>Improve our website and services</li>
                <li>Analyze website usage patterns</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary-900">5. Data Sharing</h2>
              <p className="text-warm-700">
                We may share your information with:
              </p>
              <ul className="text-warm-700">
                <li>Property developers and builders when you express interest in specific developments</li>
                <li>Our trusted partners (lawyers, mortgage advisors) when requested</li>
                <li>Service providers who help us operate our website</li>
                <li>Legal authorities when required by law</li>
              </ul>
              <p className="text-warm-700">
                We will never sell your personal information to third parties.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">6. Your Rights (GDPR)</h2>
              <p className="text-warm-700">
                Under the General Data Protection Regulation (GDPR), you have the right to:
              </p>
              <ul className="text-warm-700">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Restrict Processing:</strong> Request limitation of how we use your data</li>
                <li><strong>Data Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Object:</strong> Object to processing of your personal data</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent at any time</li>
              </ul>
              <p className="text-warm-700">
                To exercise any of these rights, please contact us at{' '}
                <a href="mailto:info@newbuildhomescostablanca.com" className="text-accent-600 hover:underline">
                  info@newbuildhomescostablanca.com
                </a>
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">7. Data Security</h2>
              <p className="text-warm-700">
                We implement appropriate technical and organizational measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction. However,
                no method of transmission over the Internet is 100% secure.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">8. Data Retention</h2>
              <p className="text-warm-700">
                We retain your personal information for as long as necessary to fulfill the purposes
                outlined in this policy, unless a longer retention period is required by law. Inquiry
                data is typically retained for 3 years after your last interaction with us.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">9. Third-Party Services</h2>
              <p className="text-warm-700">
                Our website may use third-party services including:
              </p>
              <ul className="text-warm-700">
                <li>Google Analytics (website analytics)</li>
                <li>Google Tag Manager (tag management)</li>
                <li>Netlify (website hosting and form processing)</li>
                <li>WhatsApp (messaging service)</li>
              </ul>
              <p className="text-warm-700">
                These services have their own privacy policies governing the use of your information.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">10. Children&apos;s Privacy</h2>
              <p className="text-warm-700">
                Our website is not intended for children under 16 years of age. We do not knowingly
                collect personal information from children under 16.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">11. Changes to This Policy</h2>
              <p className="text-warm-700">
                We may update this Privacy Policy from time to time. We will notify you of any changes
                by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">12. Contact Us</h2>
              <p className="text-warm-700">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="text-warm-700">
                <li>Email: <a href="mailto:info@newbuildhomescostablanca.com" className="text-accent-600 hover:underline">info@newbuildhomescostablanca.com</a></li>
                <li>Phone: <a href="tel:+34634044970" className="text-accent-600 hover:underline">+34 634 044 970</a></li>
                <li>WhatsApp: <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:underline">Message us</a></li>
              </ul>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}
