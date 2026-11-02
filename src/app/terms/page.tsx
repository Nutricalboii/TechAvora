import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using Avora Ventures services and website.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service',
    description: 'Terms for using the Avora Ventures website and services.',
    url: 'https://www.avoraventure.com/terms',
    images: [{ url: 'https://www.avoraventure.com/og', width: 1200, height: 630, alt: 'Avora Ventures' }],
    type: 'website',
  },
};

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="text-sm text-[var(--foreground-muted)] mb-12">
          Last updated: October 29, 2026
        </p>

        <div className="space-y-8 text-[var(--foreground)]">
          <section>
            <h2 className="text-xl font-heading font-semibold tracking-wide text-[var(--foreground)] mb-3">
              1. Services
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed">
              Avora Ventures provides data generation, annotation, labeling, quality auditing,
              and AI implementation services. Specific terms, deliverables, and pricing are
              defined in individual service agreements with each client.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold tracking-wide text-[var(--foreground)] mb-3">
              2. Website use
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed">
              This website is for informational purposes only. By using this site, you agree not
              to reproduce, distribute, or create derivative works from its content without
              written permission from Avora Ventures.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold tracking-wide text-[var(--foreground)] mb-3">
              3. Contact form
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed">
              Submitting the contact form does not constitute a binding agreement. All
              engagements are subject to a separate signed agreement between Avora Ventures and
              the client.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold tracking-wide text-[var(--foreground)] mb-3">
              4. Intellectual property
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed">
              All website content, design, and branding are the intellectual property of Avora
              Ventures or their respective rights holders. Work product delivered to clients under service agreements is governed
              by those agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold tracking-wide text-[var(--foreground)] mb-3">
              5. Limitation of liability
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed">
              Avora Ventures is not liable for indirect, incidental, or consequential damages
              arising from use of this website or its services beyond what is specified in a
              signed client agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold tracking-wide text-[var(--foreground)] mb-3">
              6. Governing law
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed">
              These terms are governed by applicable law. Specific jurisdiction is defined in
              individual client service agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold tracking-wide text-[var(--foreground)] mb-3">
              7. Contact
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed">
              For questions about these terms, contact{' '}
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
