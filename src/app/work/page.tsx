'use client';
import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') { gsap.registerPlugin(ScrollTrigger); }

const cases = [
  {
    id: '01',
    sector: 'Healthcare',
    service: 'Data Generation',
    tag: 'Rare Disease Diagnostics',
    metric: '0.72→0.91',
    metricLabel: 'Diagnostic AUC',
    what: 'Engineered a physics-informed synthetic MRI volume library to address severe scarcity in confirmed training cases for a rare oncological condition.',
    how: 'Applied parametric copula modeling to capture inter-slice spatial correlations. Differential privacy budget (ε = 1.2) enforced throughout generation. Wasserstein distance validated below 0.04 before sign-off.',
    result: 'Training corpus scaled from 87 confirmed cases to 50,000 synthetic volumes, enabling the first statistically valid model training run.',
  },
  {
    id: '02',
    sector: 'Precision Agriculture',
    service: 'Data Annotation',
    tag: 'Drone Telemetry',
    metric: '3h→25min',
    metricLabel: 'Field scouting time',
    what: 'Annotated high-density multispectral drone imagery across 14 distinct crop stress classes for a precision agriculture platform.',
    how: "Built a domain ontology covering stress type, severity stage, and spectral band signature. Model-assisted pre-labeling reduced manual load by 58%. Fleiss' Kappa target ≥ 0.91 required before batch sign-off.",
    result: '800,000 multispectral frames delivered at a final inter-annotator Kappa of 0.93.',
  },
  {
    id: '03',
    sector: 'Pharmaceutical',
    service: 'Data Labeling',
    tag: 'Clinical Document Processing',
    metric: 'F1: 0.94',
    metricLabel: 'Kappa: 0.90',
    what: 'Operationalized OCR-based layout-analysis extraction and structured labeling across multi-format clinical trial data collection sheets.',
    how: "Deployed a consensus verification protocol with triple-review on ambiguous table regions. Statistical QA gate: minimum F1 ≥ 0.93 and Cohen's Kappa ≥ 0.90 required per category before delivery.",
    result: '2.1 million pages processed across 47 distinct data point categories. Zero pages required re-extraction post-delivery.',
  },
  {
    id: '04',
    sector: 'Retail',
    service: 'AI Implementation',
    tag: 'Multi-SKU Demand Forecasting',
    metric: '680%',
    metricLabel: 'ROI at 36-month horizon',
    what: "Designed and integrated a custom predictive ensemble model into the client's on-premise cloud infrastructure for multi-horizon demand forecasting.",
    how: 'Structured discovery mapped existing data pipelines, identified distribution shift patterns, and defined forecast horizons. Enterprise-grade model explainability layer added to satisfy internal procurement audit requirements.',
    result: '40% reduction in manual planning overhead in the first quarter. 680% ROI demonstrated at the 36-month projection horizon.',
  },
];

export default function WorkPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(16px)' }}>
      {/* Page header */}
      <div className="border-b border-slate-200 pt-36 pb-16 md:pb-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="work-header flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p className="font-mono text-[13px] tracking-[0.25em] uppercase text-[#B8860B] mb-4">
                Avora / Delivered Outcomes
              </p>
              <h1 className="font-heading text-7xl md:text-9xl lg:text-[9rem] leading-none text-slate-900 tracking-wide uppercase">
                Work From<br/>The Field.
              </h1>
            </div>
            <p className="text-lg md:text-xl text-slate-900 max-w-sm leading-relaxed md:pb-4 font-sans font-medium">
              Anonymized engagement outcomes. No client names — sector, methodology, and verified result only. All engagements are NDA-protected.
            </p>
          </div>
        </div>
      </div>

      {/* Case study rows */}
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
        {cases.map((c) => (
          <article key={c.id} className="work-row group block border border-slate-200/80 bg-white/95 hover:bg-white rounded-sm p-8 md:p-12 mb-12 shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 xl:grid-cols-12 gap-10 md:gap-6 items-start"
          >
            {/* Left: Big metric */}
            <div className="xl:col-span-4 mb-8 xl:mb-0">
              <p className="font-mono text-[13px] tracking-[0.2em] text-slate-700 uppercase mb-4">
                {c.id} / {c.service.toUpperCase()}
              </p>
              <div className="font-heading text-7xl md:text-8xl lg:text-[7rem] leading-none text-[#B8860B] tracking-tight">
                {c.metric}
              </div>
              <p className="font-mono text-[13px] tracking-[0.15em] text-slate-700 uppercase mt-3">{c.metricLabel}</p>
            </div>

            

            {/* Right: content */}
            <div className="xl:col-span-8 xl:pl-8">
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="font-mono text-[12px] tracking-[0.2em] uppercase text-[#B8860B] border border-[#B8860B]/30 px-3 py-1.5">
                  {c.service}
                </span>
                <span className="font-mono text-[12px] tracking-[0.2em] uppercase text-slate-900">
                  {c.sector} — {c.tag}
                </span>
              </div>

              <h2 className="font-heading text-4xl md:text-5xl uppercase tracking-wide text-slate-900 mb-10 leading-tight">
                {c.tag}
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-0 border-t border-slate-200">
                {[
                  { label: 'What we did', body: c.what },
                  { label: 'How', body: c.how },
                  { label: 'Result', body: c.result },
                ].map((row, i) => (
                  <div key={i} className="pt-8 pr-0 lg:pr-10 pb-4 lg:border-r border-slate-200 last:border-r-0 mr-0 lg:mr-10 last:mr-0">
                    <p className="font-mono text-[12px] tracking-[0.2em] uppercase text-[#B8860B] mb-4">{row.label}</p>
                    <p className="font-sans font-medium text-lg text-slate-900 leading-relaxed">{row.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}

        <p className="py-10 font-mono text-[13px] text-slate-700 tracking-[0.15em] uppercase">
          Metrics verified through partner delivery logs. Client names withheld by default under NDA.
        </p>
      </div>
    </main>
  );
}
