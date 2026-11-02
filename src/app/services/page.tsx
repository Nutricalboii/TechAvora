import type { Metadata } from 'next';
import ServicesPage from './ServicesPage';

export const metadata: Metadata = {
  title: 'AI Data Operations & Implementation Services',
  description:
    'Explore Avora Ventures services across synthetic data generation, data annotation, data labeling, data quality assurance, and AI implementation.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'AI Data Operations & Implementation Services',
    description: 'Explore Avora Ventures services across synthetic data generation, data annotation, data labeling, AI quality assurance, and production AI implementation.',
    url: 'https://www.avoraventure.com/services',
    images: [{ url: 'https://www.avoraventure.com/og', width: 1200, height: 630, alt: 'Avora Ventures AI data operations services' }],
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
