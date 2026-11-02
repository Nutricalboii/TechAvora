import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Tech Avora — AI Data Operations',
  description: 'Tech Avora helps enterprises prepare high-quality AI data and build production-ready AI solutions.',
  alternates: { canonical: '/' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Tech Avora — AI Data Operations',
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: `${siteConfig.url}/og`, width: 1200, height: 630, alt: 'Tech Avora AI data operations' }],
    type: 'website',
  },
};

export default function IntroLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
