import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { insights } from '@/config/insights';

export const metadata: Metadata = {
  title: 'AI Data Operations Insights',
  description:
    'Practical guides from Tech Avora on synthetic data evaluation, annotation quality, machine learning data checks, and moving AI pilots into production.',
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    title: 'AI Data Operations Insights | Tech Avora',
    description:
      'Practical guides on synthetic data, annotation, data quality, and production AI.',
    url: `${siteConfig.url}/blog`,
    type: 'website',
    siteName: siteConfig.name,
    images: [{ url: `${siteConfig.url}/og`, width: 1200, height: 630, alt: 'Tech Avora AI data operations insights' }],
  },
};

function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export default function BlogPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${siteConfig.url}/blog#collection`,
    name: 'AI Data Operations Insights',
    description: 'Practical guides on synthetic data, annotation, data quality, and production AI.',
    url: `${siteConfig.url}/blog`,
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: insights.map((insight, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteConfig.url}/blog/${insight.slug}`,
        name: insight.title,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-[#FBF8F1] pt-28 pb-20 sm:pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(structuredData) }} />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <header className="max-w-3xl border-b border-[#d8c9a8] pb-10 sm:pb-14">
          <p className="mb-4 text-sm font-semibold tracking-wide text-[#8a6200]">Tech Avora insights</p>
          <h1 className="font-heading text-4xl uppercase leading-[1.02] tracking-wide text-[#24180f] sm:text-6xl">
            AI data operations, explained
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-700">
            Field guides for teams preparing data, evaluating AI systems, and moving from a promising pilot to dependable operations.
          </p>
        </header>

        <section aria-label="Articles" className="pt-10 sm:pt-14">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {insights.map((insight) => (
              <li key={insight.slug}>
                <article className="flex h-full flex-col border border-[#d8c9a8] bg-white/80 p-6 transition-colors hover:border-[#B8860B] sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6200]">{insight.topic}</p>
                  <h2 className="mt-4 font-heading text-2xl uppercase leading-tight tracking-wide text-[#24180f]">
                    <Link href={`/blog/${insight.slug}`} className="rounded-sm hover:text-[#8a6200] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8a6200]">
                      {insight.title}
                    </Link>
                  </h2>
                  <p className="mt-4 flex-1 leading-relaxed text-slate-700">{insight.summary}</p>
                  <div className="mt-6 border-t border-[#e6dcc8] pt-4">
                    <p className="text-xs text-slate-500">{new Date(`${insight.publishedAt}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</p>
                    <Link href={`/blog/${insight.slug}`} className="mt-3 inline-flex min-h-10 items-center font-semibold text-[#785600] underline decoration-[#b8860b]/50 underline-offset-4 hover:text-[#24180f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a6200]">
                      Read the guide <span aria-hidden="true" className="ml-2">→</span>
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <aside className="mt-12 border-l-2 border-[#B8860B] py-2 pl-5 sm:mt-16">
          <p className="font-semibold text-[#24180f]">Need help with a specific data or AI workflow?</p>
          <p className="mt-2 text-slate-700">Explore the <Link href="/services" className="font-semibold text-[#785600] underline underline-offset-4">Tech Avora services</Link> or <Link href="/#contact" className="font-semibold text-[#785600] underline underline-offset-4">talk with our team</Link>.</p>
        </aside>
      </div>
    </div>
  );
}
