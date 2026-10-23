import type { Metadata } from 'next';
import ServicesPage from './ServicesPage';

export const metadata: Metadata = {
  title: 'AI Data Operations & Implementation Services',
  description:
    'Explore Avora Ventures services across synthetic data generation, data annotation, data labeling, AI quality assurance, and production AI implementation.',
  alternates: { canonical: '/services' },
};

type ServicesRouteProps = {
  searchParams: Promise<{ stage?: string | string[] }>;
};

export default async function ServicesRoute({ searchParams }: ServicesRouteProps) {
  const { stage } = await searchParams;
  return <ServicesPage initialStageParam={Array.isArray(stage) ? stage[0] : stage} />;
}
