import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Production AI Data Operations & Solutions',
  description:
    'Tech Avora prepares high-quality AI data and builds production-ready AI solutions through one integrated delivery framework.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Production AI Data Operations & Solutions',
    description:
      'High-quality AI data and production-ready AI solutions from Tech Avora.',
    url: siteConfig.url,
    type: 'website',
    images: [{ url: `${siteConfig.url}/og`, width: 1200, height: 630, alt: 'Tech Avora AI data operations' }],
  },
};

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
