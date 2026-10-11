'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ExternalLink } from 'lucide-react';

if (typeof window !== 'undefined') { gsap.registerPlugin(ScrollTrigger); }

const posts = [
  {
    href: 'https://www.ibm.com/topics/synthetic-data',
    title: 'What Is Synthetic Data?',
    excerpt:
      'How artificially generated datasets solve the AI data scarcity problem — covering privacy-safe simulation, domain transfer, and the fidelity checks that make synthetic data usable for model training.',
    source: 'IBM',
    date: '2024',
    category: 'Data Generation',
    readTime: '7 min',
    featured: true,
  },
  {
    href: 'https://www.ibm.com/topics/data-annotation',
    title: 'What Is Data Annotation?',
    excerpt:
      'A full breakdown of how data annotation works — image labeling, NLP tagging, bounding boxes — and why precision ontologies are the backbone of every well-performing AI model.',
    source: 'IBM',
    date: '2024',
    category: 'Data Annotation',
    readTime: '6 min',
    featured: false,
  },
  {
    href: 'https://en.wikipedia.org/wiki/Inter-rater_reliability',
    title: 'Inter-Rater Reliability & Cohen\'s Kappa',
    excerpt:
      'The statistical foundation behind measuring labeling agreement. Cohen\'s Kappa is the standard quality gate that determines whether annotated data is actually fit for training.',
    source: 'Wikipedia',
    date: 'Reference',
    category: 'Data Auditing',
    readTime: '8 min',
    featured: false,
  },
  {
    href: 'https://www.ibm.com/topics/ai-model-deployment',
    title: 'What Is AI Model Deployment?',
    excerpt:
      'The full engineering story behind production AI — infrastructure choices, monitoring, drift detection, and the operational decisions that determine whether a deployed model actually holds up.',
    source: 'IBM',
    date: '2024',
    category: 'AI Implementation',
    readTime: '7 min',
    featured: false,
  },
  {
    href: 'https://www.ibm.com/topics/data-quality',
    title: 'What Is Data Quality?',
    excerpt:
      'Why data quality governs model performance more than architecture. Covers the six core dimensions — completeness, consistency, accuracy — and the governance frameworks that enforce them.',
    source: 'IBM',
    date: '2024',
    category: 'Data Auditing',
    readTime: '6 min',
    featured: false,
  },
  {
    href: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai',
    title: 'The State of AI — McKinsey Survey',
    excerpt:
      'McKinsey\'s annual global survey on enterprise AI adoption: where companies are seeing ROI, what\'s blocking deployment, and why data infrastructure remains the primary bottleneck to scale.',
    source: 'McKinsey & Company',
    date: '2024',
    category: 'AI Implementation',
    readTime: '10 min',
    featured: false,
  },
];

const categoryColors: Record<string, string> = {
  'Data Generation': 'bg-amber-50 text-amber-700 border-amber-200',
  'Data Annotation': 'bg-blue-50 text-blue-700 border-blue-200',
  'Data Auditing': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'AI Implementation': 'bg-purple-50 text-purple-700 border-purple-200',
};

export default function BlogPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.blog-header > *',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' }
    );
    gsap.fromTo('.blog-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.blog-grid', start: 'top 85%' }
      }
    );
  }, { scope: container });

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <main ref={container} className="min-h-screen" style={{ backgroundColor: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px)' }}>

      {/* Page Header */}
      <div className="pt-24 pb-12 md:pt-32 md:pb-16 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="blog-header max-w-2xl mx-auto text-center">
          <span className="font-mono text-[10px] font-semibold tracking-[0.25em] uppercase text-[#B8860B] mb-5 block">
            Intelligence
          </span>
          <h1 className="font-heading uppercase tracking-wide text-slate-900 leading-[0.9] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            Insights &amp;<br/>Research
          </h1>
          <p className="font-sans text-slate-600 text-lg md:text-[19px] leading-[1.7] max-w-lg mx-auto">
            Curated articles on synthetic data, annotation frameworks, quality auditing, and the engineering of production AI.
          </p>
        </div>
      </div>
    </div>

      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-14 md:py-20">

        {/* Featured Article */}
        <a
          href={featured.href}
          target="_blank"
          rel="noopener noreferrer"
          className="blog-card group block mb-12 md:mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-slate-200/80 bg-white/90 hover:shadow-lg transition-all duration-300 overflow-hidden rounded-sm">
            {/* Image side */}
            <div className="lg:col-span-5 min-h-[240px] lg:min-h-0 relative overflow-hidden bg-slate-800">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                role="img"
                aria-label={`${featured.title} featured illustration`}
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85&fit=crop&auto=format')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
              <div className="absolute top-5 left-5">
                <span className={`inline-block text-[10px] font-mono font-semibold uppercase tracking-[0.18em] border px-2.5 py-1 rounded-sm ${categoryColors[featured.category]}`}>
                  {featured.category}
                </span>
              </div>
            </div>
            {/* Text side */}
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{featured.source}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-[0.15em]">{featured.date}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-[0.15em]">{featured.readTime} read</span>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl uppercase tracking-wide text-slate-900 group-hover:text-[#B8860B] transition-colors leading-tight mb-5">
                  {featured.title}
                </h2>
                <p className="text-slate-600 text-base md:text-[17px] leading-[1.75] font-sans">
                  {featured.excerpt}
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-900 group-hover:text-[#B8860B] transition-colors">
                  Read Article
                </span>
                <div className="w-10 h-10 border border-slate-200 flex items-center justify-center group-hover:border-[#B8860B] group-hover:text-[#B8860B] transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </a>

        {/* Grid */}
        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {rest.map((post, i) => (
            <a
              key={i}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-card group flex flex-col border border-slate-200/80 bg-white/90 hover:shadow-md hover:border-slate-300 transition-all duration-300 rounded-sm overflow-hidden"
            >
              <div className="px-6 pt-6">
                <span className={`inline-block text-[10px] font-mono font-semibold uppercase tracking-[0.18em] border px-2.5 py-1 rounded-sm mb-4 ${categoryColors[post.category]}`}>
                  {post.category}
                </span>
              </div>
              <div className="px-6 pb-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-400">{post.source}</span>
                  <span className="w-0.5 h-0.5 rounded-full bg-slate-300" />
                  <span className="font-mono text-[9px] text-slate-400 uppercase tracking-[0.12em]">{post.date}</span>
                </div>
                <h3 className="font-heading text-xl md:text-2xl uppercase tracking-wide text-slate-900 group-hover:text-[#B8860B] transition-colors leading-tight mb-3 flex-1">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm md:text-[15px] leading-[1.7] font-sans mb-5">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-[0.15em]">{post.readTime} read</span>
                  <div className="w-8 h-8 border border-slate-200 flex items-center justify-center group-hover:border-[#B8860B] group-hover:text-[#B8860B] transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-12 font-mono text-[10px] text-slate-400 tracking-[0.15em] uppercase text-center">
          Articles sourced from IBM, McKinsey & Company, and Wikipedia for educational purposes.
        </p>
      </div>
    </main>
  );
}
