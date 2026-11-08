import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { insights } from '@/config/insights';
import { services } from '@/config/serviceContent';

// Engineered by Vaibhav Sharma · github.com/Nutricalboii

const BASE_URL = siteConfig.url;

// Update this when indexable page content changes, not on every deploy.
const SITE_LAST_MODIFIED = new Date('2026-11-02T00:00:00.000Z');
const CONTENT_LAST_MODIFIED = new Date('2026-11-08T00:00:00.000Z');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...services.map(({ slug }) => ({
      url: `${BASE_URL}/services/${slug}`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...insights.map(({ slug, publishedAt }) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: new Date(`${publishedAt}T00:00:00.000Z`),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    {
      url: `${BASE_URL}/privacy`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
