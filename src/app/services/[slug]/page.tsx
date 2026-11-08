import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { serviceBySlug, services } from '@/config/serviceContent';

type ServicePageProps = { params: Promise<{ slug: string }> };

function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug[slug];
  if (!service) return {};

  const url = `${siteConfig.url}/services/${service.slug}`;
  return {
    title: service.pageTitle,
    description: service.description,
    alternates: { canonical: url },
    openGraph: {
      title: service.pageTitle,
      description: service.description,
      url,
      type: 'website',
      siteName: siteConfig.name,
      images: [{ url: `${siteConfig.url}/og`, width: 1200, height: 630, alt: service.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.pageTitle,
      description: service.description,
      images: [`${siteConfig.url}/og`],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = serviceBySlug[slug];
  if (!service) notFound();

  const relatedServices = service.related
    .map((relatedSlug) => serviceBySlug[relatedSlug])
    .filter(Boolean);
  const url = `${siteConfig.url}/services/${service.slug}`;
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: service.title,
      serviceType: service.title,
      description: service.description,
      url,
      provider: { '@id': `${siteConfig.url}/#organization` },
      areaServed: 'Worldwide',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteConfig.url}/services` },
        { '@type': 'ListItem', position: 3, name: service.title, item: url },
      ],
    },
  ];

  return (
    <article className="min-h-screen bg-[#FBF8F1] pt-28 pb-20 sm:pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(structuredData) }} />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-600">
          <Link href="/" className="hover:text-[#8a6200] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Home</Link>
          <span aria-hidden="true" className="px-2 text-slate-400">/</span>
          <Link href="/services" className="hover:text-[#8a6200] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Services</Link>
          <span aria-hidden="true" className="px-2 text-slate-400">/</span>
          <span aria-current="page" className="text-slate-800">{service.title}</span>
        </nav>

        <header className="max-w-4xl border-b border-[#d8c9a8] pb-10 sm:pb-14">
          <p className="mb-4 text-sm font-semibold tracking-wide text-[#8a6200]">Tech Avora services</p>
          <h1 className="font-heading text-4xl uppercase leading-[1.02] tracking-wide text-[#24180f] sm:text-6xl lg:text-7xl">
            {service.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-700 sm:text-xl">{service.intro}</p>
          <Link
            href="/#contact"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#B8860B] px-7 py-3 font-semibold text-white transition-colors hover:bg-[#946b08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24180f]"
          >
            Discuss this service
          </Link>
        </header>

        <div className="grid gap-12 border-b border-[#d8c9a8] py-12 md:grid-cols-[minmax(0,1fr)_18rem] md:gap-16 md:py-16">
          <section aria-labelledby="fit-heading">
            <h2 id="fit-heading" className="font-heading text-2xl uppercase tracking-wide text-[#24180f] sm:text-3xl">When this work fits</h2>
            <ul className="mt-6 space-y-4">
              {service.fit.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-relaxed text-slate-700">
                  <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#B8860B]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <aside className="h-fit border-l-2 border-[#B8860B] pl-5 text-sm leading-relaxed text-slate-600">
            <p className="font-semibold text-[#24180f]">Start with the use case</p>
            <p className="mt-2">The scope, checks, and delivery approach depend on the data, users, and risks involved. We begin by clarifying those conditions.</p>
          </aside>
        </div>

        <section aria-labelledby="approach-heading" className="border-b border-[#d8c9a8] py-12 md:py-16">
          <h2 id="approach-heading" className="font-heading text-2xl uppercase tracking-wide text-[#24180f] sm:text-3xl">How the work is structured</h2>
          <ol className="mt-8 divide-y divide-[#d8c9a8]">
            {service.approach.map((step, index) => (
              <li key={step.title} className="grid gap-3 py-6 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6">
                <span aria-label={`Step ${index + 1}`} className="font-mono text-sm text-[#8a6200]">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-lg font-semibold text-[#24180f]">{step.title}</h3>
                  <p className="mt-2 max-w-3xl leading-relaxed text-slate-700">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="checks-heading" className="grid gap-8 border-b border-[#d8c9a8] py-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16 md:py-16">
          <div>
            <h2 id="checks-heading" className="font-heading text-2xl uppercase tracking-wide text-[#24180f] sm:text-3xl">What to check</h2>
            <p className="mt-4 max-w-md leading-relaxed text-slate-700">Set acceptance criteria against the intended use. These checks are starting points; thresholds should reflect the data and the cost of errors.</p>
          </div>
          <ul className="space-y-4">
            {service.checks.map((check) => (
              <li key={check} className="border-b border-[#d8c9a8] pb-4 leading-relaxed text-slate-700 last:border-0">{check}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="faq-heading" className="border-b border-[#d8c9a8] py-12 md:py-16">
          <h2 id="faq-heading" className="font-heading text-2xl uppercase tracking-wide text-[#24180f] sm:text-3xl">Questions about {service.title.toLowerCase()}</h2>
          <div className="mt-6 divide-y divide-[#d8c9a8]">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="cursor-pointer list-none pr-8 text-base font-semibold text-[#24180f] marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8a6200]">
                  {faq.question}
                </summary>
                <p className="mt-3 max-w-3xl leading-relaxed text-slate-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {service.reading.length > 0 && (
          <section aria-labelledby="references-heading" className="border-b border-[#d8c9a8] py-10">
            <h2 id="references-heading" className="text-sm font-semibold text-[#24180f]">Further reading</h2>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {service.reading.map((item) => (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-[#785600] underline decoration-[#b8860b]/50 underline-offset-4 hover:text-[#24180f]">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="related-heading" className="py-12 md:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="related-heading" className="font-heading text-2xl uppercase tracking-wide text-[#24180f] sm:text-3xl">Related services</h2>
              <p className="mt-2 text-slate-600">Explore connected parts of the AI data lifecycle.</p>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-[#785600] underline decoration-[#b8860b]/50 underline-offset-4 hover:text-[#24180f]">Read Tech Avora insights</Link>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((related) => (
              <li key={related.slug}>
                <Link href={`/services/${related.slug}`} className="block h-full border border-[#d8c9a8] bg-white/70 p-5 text-base font-semibold text-[#24180f] transition-colors hover:border-[#B8860B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a6200]">
                  {related.title}<span aria-hidden="true" className="ml-2 text-[#8a6200]">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
