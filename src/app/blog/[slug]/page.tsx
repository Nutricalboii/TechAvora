import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { insightBySlug, insights } from '@/config/insights';
import { serviceBySlug } from '@/config/serviceContent';
import { siteConfig } from '@/config/site';

type InsightPageProps = { params: Promise<{ slug: string }> };

function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function formatDate(value: string) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function generateStaticParams() {
  return insights.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = insightBySlug[slug];
  if (!insight) return {};

  const url = `${siteConfig.url}/blog/${insight.slug}`;
  return {
    title: insight.title,
    description: insight.description,
    alternates: { canonical: url },
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    openGraph: {
      title: insight.title,
      description: insight.description,
      url,
      type: 'article',
      siteName: siteConfig.name,
      publishedTime: `${insight.publishedAt}T00:00:00.000Z`,
      authors: [siteConfig.name],
      section: insight.topic,
      images: [{ url: `${siteConfig.url}/og`, width: 1200, height: 630, alt: insight.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: insight.title,
      description: insight.description,
      images: [`${siteConfig.url}/og`],
    },
  };
}

export default async function InsightArticlePage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = insightBySlug[slug];
  if (!insight) notFound();

  const service = serviceBySlug[insight.serviceSlug];
  const url = `${siteConfig.url}/blog/${insight.slug}`;
  const organization = { '@id': `${siteConfig.url}/#organization` };
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: insight.title,
      description: insight.description,
      articleSection: insight.topic,
      datePublished: `${insight.publishedAt}T00:00:00.000Z`,
      dateModified: `${insight.publishedAt}T00:00:00.000Z`,
      inLanguage: 'en',
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      author: organization,
      publisher: organization,
      image: `${siteConfig.url}/og`,
      isPartOf: { '@id': `${siteConfig.url}/blog#collection` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'Insights', item: `${siteConfig.url}/blog` },
        { '@type': 'ListItem', position: 3, name: insight.title, item: url },
      ],
    },
  ];

  return (
    <article className="min-h-screen bg-[#FBF8F1] pt-28 pb-20 sm:pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(structuredData) }} />
      <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-600">
          <Link href="/" className="hover:text-[#8a6200] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Home</Link>
          <span aria-hidden="true" className="px-2 text-slate-400">/</span>
          <Link href="/blog" className="hover:text-[#8a6200] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Insights</Link>
          <span aria-hidden="true" className="px-2 text-slate-400">/</span>
          <span aria-current="page" className="text-slate-800">{insight.topic}</span>
        </nav>

        <header className="border-b border-[#d8c9a8] pb-9 sm:pb-12">
          <p className="mb-4 text-sm font-semibold tracking-wide text-[#8a6200]">{insight.topic} · Tech Avora insights</p>
          <h1 className="font-heading text-4xl uppercase leading-[1.02] tracking-wide text-[#24180f] sm:text-6xl">{insight.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-700">{insight.summary}</p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
            <span>By {siteConfig.name}</span>
            <time dateTime={insight.publishedAt}>{formatDate(insight.publishedAt)}</time>
          </div>
        </header>

        <div className="divide-y divide-[#d8c9a8]">
          {insight.sections.map((section, index) => (
            <section key={section.heading} aria-labelledby={`section-${index + 1}`} className="py-8 sm:py-10">
              <h2 id={`section-${index + 1}`} className="font-heading text-2xl uppercase tracking-wide text-[#24180f] sm:text-3xl">{section.heading}</h2>
              <div className="mt-5 space-y-4 text-base leading-8 text-slate-700 sm:text-lg">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {section.bullets && (
                <ul className="mt-5 space-y-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 leading-relaxed text-slate-700">
                      <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#B8860B]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <section aria-labelledby="further-reading" className="border-t border-[#d8c9a8] py-8">
          <h2 id="further-reading" className="text-sm font-semibold text-[#24180f]">Sources and further reading</h2>
          <ul className="mt-3 space-y-2">
            {insight.references.map((reference) => (
              <li key={reference.url}>
                <a href={reference.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#785600] underline decoration-[#b8860b]/50 underline-offset-4 hover:text-[#24180f]">{reference.title}</a>
              </li>
            ))}
          </ul>
        </section>

        {service && (
          <aside className="border-y border-[#d8c9a8] bg-white/60 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#8a6200]">Related service</p>
            <h2 className="mt-3 font-heading text-2xl uppercase tracking-wide text-[#24180f]">{service.title}</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-slate-700">{service.description}</p>
            <div className="mt-5 flex flex-wrap gap-5">
              <Link href={`/services/${service.slug}`} className="font-semibold text-[#785600] underline underline-offset-4 hover:text-[#24180f]">Explore the service</Link>
              <Link href="/#contact" className="font-semibold text-[#785600] underline underline-offset-4 hover:text-[#24180f]">Contact Tech Avora</Link>
            </div>
          </aside>
        )}

        <p className="mt-8 text-sm text-slate-500"><Link href="/blog" className="underline underline-offset-4 hover:text-[#24180f]">← All insights</Link></p>
      </div>
    </article>
  );
}
