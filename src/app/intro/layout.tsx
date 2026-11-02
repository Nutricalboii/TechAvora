import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Avora Ventures — AI Data Operations',
  description: 'Avora Ventures helps enterprises prepare high-quality AI data and build production-ready AI solutions.',
  alternates: { canonical: '/' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Avora Ventures — AI Data Operations',
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: `${siteConfig.url}/og`, width: 1200, height: 630, alt: 'Avora Ventures AI data operations' }],
    type: 'website',
  },
};

export default function IntroLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
