import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'AI Data Operations Resources',
  description:
    'A curated collection of external references on synthetic data, data labeling, reliability, data quality, and AI deployment.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'AI Data Operations Resources',
    description: 'Curated external references on synthetic data, annotation, data quality, and AI deployment.',
    url: `${siteConfig.url}/blog`,
    type: 'website',
    images: [{ url: `${siteConfig.url}/og`, width: 1200, height: 630, alt: 'Tech Avora AI data operations insights' }],
  },
};

export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
