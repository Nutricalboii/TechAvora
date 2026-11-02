import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Tech Avora collects, uses, and protects your personal information.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy',
    description: 'How Tech Avora handles contact inquiries, analytics, and privacy preferences.',
    url: 'https://techavora.com/privacy',
    images: [{ url: 'https://techavora.com/og', width: 1200, height: 630, alt: 'Tech Avora' }],
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <div className="pt-36 pb-24 min-h-screen bg-[var(--background)]">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors mb-10"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to home
        </Link>

        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-wide text-[var(--foreground)] mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-[var(--foreground-muted)] mb-12">
          Last updated: October 29, 2026
        </p>

        <div className="space-y-8 text-[var(--foreground)]">
          <section>
            <h2 className="text-xl font-heading font-semibold tracking-wide text-[var(--foreground)] mb-3">
              1. Information we collect
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed">
              When you submit the contact form, we collect your name, email address, selected
              service area, and message. Do not include sensitive personal or confidential
              information in the form. We use these details to respond to your inquiry and
              discuss a potential engagement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold tracking-wide text-[var(--foreground)] mb-3">
              2. How we use your information
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed">
              We use your contact form submissions only to respond to your inquiry and discuss
              potential engagements. We do not sell, rent, or share your personal information
              with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold tracking-wide text-[var(--foreground)] mb-3">
              3. Data storage
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed">
              The contact form sends submissions through the website API to a Tech Avora-configured
              Google Apps Script endpoint for delivery and storage. Google may process the
              information as part of that service. Access to resulting records is controlled
              through Tech Avora&apos;s Google account and script permissions. Inquiry information is
              retained only as long as needed to respond, manage a potential engagement, or meet
              legal obligations; contact us to request deletion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold tracking-wide text-[var(--foreground)] mb-3">
              4. Cookies
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed">
              We use one first-party preference cookie, <code className="text-xs">techavora_analytics_consent</code>,
              and matching browser storage to remember whether you allowed or declined analytics.
              If you choose “Allow analytics,” Google Analytics may use analytics cookies and
              similar technologies to measure aggregate visits, page views, and interactions.
              You can change your choice at any time using “Cookie settings” in the footer or by
              clearing your browser storage.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold tracking-wide text-[var(--foreground)] mb-3">
              5. Your rights
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed">
              You have the right to request access to, correction of, or deletion of your
              personal data. To exercise these rights, contact us at{' '}
              <a
                href="mailto:avoraglobalus@gmail.com"
                className="text-[var(--accent)] hover:underline"
              >
                avoraglobalus@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold tracking-wide text-[var(--foreground)] mb-3">
              6. Analytics
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed">
              Vercel Analytics is used for aggregate website usage measurement and is designed
              to operate without analytics cookies. Google Analytics loads only after you choose
              to allow it; declining prevents Tech Avora&apos;s Google Analytics events from being sent.
              With permission, Tech Avora measures page views, traffic sources, and limited interaction
              events such as service selection and successful form submission. Contact form names,
              email addresses, and message text are not sent to Google Analytics. You can change
              your Google Analytics choice using Cookie settings in the site footer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold tracking-wide text-[var(--foreground)] mb-3">
              7. Contact
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed">
              For privacy inquiries, email{' '}
              <a
                href="mailto:avoraglobalus@gmail.com"
                className="text-[var(--accent)] hover:underline"
              >
                avoraglobalus@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
