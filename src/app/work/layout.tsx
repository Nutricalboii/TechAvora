import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Project Experience',
  description:
    'Tech Avora is reviewing case-study details and publication permissions before sharing client outcomes.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Project Experience',
    description: 'Project case studies are under review. Explore Tech Avora service methodologies.',
    url: `${siteConfig.url}/work`,
    type: 'website',
    images: [{ url: `${siteConfig.url}/og`, width: 1200, height: 630, alt: 'Tech Avora AI data operations' }],
  },
  // Keep quantified client outcome claims out of search until Tech Avora has
  // verified the metrics and approved these anonymized case details.
  robots: { index: false, follow: true },
};

export default function WorkLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
