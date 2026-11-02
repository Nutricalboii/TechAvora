'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stages = [
  {
    id: '01',
    stageIndex: 0,
    title: 'AI Solutions',
    desc: 'Turn quality data into production-ready AI systems.',
  },
  {
    id: '02',
    stageIndex: 1,
    title: 'Data Generation',
    desc: 'Address data scarcity with realistic, privacy-aware synthetic data.',
  },
  {
    id: '03',
    stageIndex: 2,
    title: 'Data Annotation',
    desc: 'Give raw data its ground truth through expert annotation.',
  },
  {
    id: '04',
    stageIndex: 3,
    title: 'Data Labeling',
    desc: 'Convert unstructured inputs into structured training sets.',
  },
  {
    id: '05',
    stageIndex: 4,
    title: 'Data Quality Assurance',
    desc: 'Validate datasets across eight dimensions before model training.',
  },
];

export default function Services() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      '.services-header-el',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.services-header-el', start: 'top 85%' },
      }
    );

    gsap.fromTo(
      '.pipeline-step',
      { opacity: 0, x: -24 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.pipeline-step', start: 'top 80%' },
      }
    );
  }, { scope: container });

  return (
    <section id="services" ref={container} aria-labelledby="services-heading" className="bg-slate-50 py-12 sm:py-20 lg:py-28 border-t border-slate-100">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16">

        {/* Header */}
        <div className="services-header-el max-w-3xl mx-auto text-center mb-10 sm:mb-16 lg:mb-20">
          <h2 id="services-heading" className="font-heading text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide text-slate-900 leading-tight mb-3 sm:mb-5">
            Five disciplines.
            <br />
            <span className="text-[#B8860B]">One delivery framework.</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed font-medium max-w-2xl mx-auto">
            Start with the outcome you need. Avora supports the full AI lifecycle, from data generation and preparation through production-ready AI systems. One integrated delivery framework.
          </p>
        </div>

        {/* Services List — standalone cards */}
        <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
          {stages.map((stage) => (
            <div key={stage.title} className="pipeline-step">
              <Link
                href={`/services?stage=${stage.stageIndex}`}
                className="flex items-start gap-3 sm:gap-4 rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all duration-300 group bg-white border-slate-200 hover:border-[#B8860B]/50 hover:shadow-md"
              >
                {/* Icon badge */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-300 mt-0.5 bg-[#B8860B]/10 border-[#B8860B]/30 group-hover:bg-[#B8860B] group-hover:border-[#B8860B]">
                  <span className="text-[#B8860B] group-hover:text-white font-bold text-xs">
                    ❖
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-heading text-sm sm:text-base lg:text-lg uppercase tracking-wide leading-tight text-slate-900">
                      {stage.title}
                    </h3>
                    <span className="font-bold text-sm text-[#B8860B] group-hover:translate-x-1 transition-transform shrink-0">→</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed font-medium mt-1 text-slate-600">
                    {stage.desc}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-slate-200 max-w-xl mx-auto">
          <p className="text-slate-700 text-xs sm:text-base mb-4 sm:mb-6 font-medium">
            Explore methodologies, service details, and lifecycle information across all five disciplines.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-[#B8860B] hover:bg-[#a07508] text-slate-950 font-mono text-[11px] sm:text-xs tracking-widest uppercase px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-200 font-bold w-full sm:w-auto"
          >
            <span>Explore Our Services</span>
            <span className="text-sm sm:text-base">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
