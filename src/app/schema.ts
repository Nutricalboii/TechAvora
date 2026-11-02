import { siteConfig } from '@/config/site';

export function generateSchema() {
  const organizationId = `${siteConfig.url}/#organization`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': organizationId,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
      description: siteConfig.description,
      areaServed: 'Worldwide',
      knowsAbout: siteConfig.keywords,
      // Only official brand profiles belong here; the code repository is not
      // an organizational identity profile.
      sameAs: [siteConfig.links.linkedin, siteConfig.links.twitter].filter(Boolean),
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: siteConfig.contactEmail,
        availableLanguage: 'English',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'AI data operations and implementation services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI solutions and implementation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Synthetic data generation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Data annotation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Data labeling' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Data quality assurance' } },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: { '@id': organizationId },
      inLanguage: 'en-US',
    },
  ];
}
