import type { Metadata } from 'next';
import ServicesPage from './ServicesPage';

export const metadata: Metadata = {
  title: 'AI Data Operations & Implementation Services',
  description:
    'Explore Tech Avora services across synthetic data generation, data annotation, data labeling, data quality assurance, and AI implementation.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'AI Data Operations & Implementation Services',
    description: 'Explore Tech Avora services across synthetic data generation, data annotation, data labeling, AI quality assurance, and production AI implementation.',
    url: 'https://techavora.com/services',
    images: [{ url: 'https://techavora.com/og', width: 1200, height: 630, alt: 'Tech Avora AI data operations services' }],
    type: 'website',
  },
};

type ServicesRouteProps = {
  searchParams: Promise<{ stage?: string | string[] }>;
};

export default async function ServicesRoute({ searchParams }: ServicesRouteProps) {
  const { stage } = await searchParams;
  return <ServicesPage initialStageParam={Array.isArray(stage) ? stage[0] : stage} />;
}
