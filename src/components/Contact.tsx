'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/cn';
import { siteConfig } from '@/config/site';
import { useReveal } from '@/hooks/useInView';
import { trackAnalyticsEvent } from '@/components/GoogleAnalytics';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    focusArea: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { ref, visible } = useReveal<HTMLDivElement>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputCls = (field: string) =>
    cn(
      'w-full px-4 py-3 text-sm md:text-[15px] rounded-xl transition-all duration-200 outline-none bg-white/70 border',
      focusedField === field
        ? 'border-[#B8860B] ring-2 ring-[#B8860B]/20 bg-white text-slate-900'
        : 'border-slate-200 hover:border-[#B8860B]/40 text-slate-900 placeholder:text-slate-500'
    );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError('Please enter your Name / Entity.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid Corporate Email.');
      return;
    }
    if (!formData.message.trim()) {
      setError('Please provide Context / Market Gap to Address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, _honeypot: '' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed.');
      trackAnalyticsEvent('generate_lead', {
        form_name: 'project_conversation',
        focus_area: formData.focusArea || 'unspecified',
      });
      setSuccess(true);
      setFormData({ name: '', email: '', focusArea: '', message: '' });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectStyle = {
    backgroundImage:
      "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23B8860B' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
    backgroundPosition: 'right 1rem center',
    backgroundSize: '1.25em 1.25em',
    paddingRight: '3rem',
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-16 sm:py-24 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(16px)' }}
    >
      {/* Screen reader live region — announces form success/error without page reload */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {success && 'Your inquiry was submitted successfully. Our team will review the information.'}
        {error && `Form error: ${error}`}
      </div>
      <div className="max-w-4xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 relative z-10">
        
        <div
          ref={ref}
          className={`transition-all duration-1000 text-center mb-10 sm:mb-14 md:mb-16 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Big Gold Heading */}
          <h2
            id="contact-heading"
            className="font-heading uppercase tracking-wide text-[#B8860B] leading-tight mb-3 sm:mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            Let&apos;s Build
          </h2>
          {/* Small Subheading */}
          <span className="font-mono text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.2em] text-slate-900 mb-4 sm:mb-6 block">
            Start a Project Conversation
          </span>
          <p className="font-sans text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Tell us what you&apos;re building, where you are in the AI lifecycle, and what&apos;s blocking you. We&apos;ll identify where Avora can help.
          </p>
        </div>

        {/* Centered Form */}
        <div className={`transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="glass-panel-strong rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm bg-white/80 max-w-2xl mx-auto">
            {success ? (
              <div className="text-center py-12 space-y-5 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-14 h-14 rounded-full bg-[#B8860B]/10 border border-[#B8860B]/30 flex items-center justify-center mx-auto">
                  <svg
                    className="w-7 h-7 text-[#B8860B]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-900">
                  Submission received
                </h3>
                <p className="text-base text-slate-700 max-w-sm mx-auto">
                  We have received your details. Our team will review the provided context and follow up.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                data-analytics-form="project_conversation"
                className="space-y-5"
              >
                {error && (
                  <div
                    role="alert"
                    aria-atomic="true"
                    className="p-3 rounded-xl border border-red-300/40 bg-red-50 text-red-700 text-sm"
                  >
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs md:text-sm font-mono font-semibold uppercase tracking-[0.16em] text-slate-900 mb-2.5"
                    >
                      Name <span className="text-[#B8860B]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      placeholder="Your full name"
                      className={inputCls('name')}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs md:text-sm font-mono font-semibold uppercase tracking-[0.16em] text-slate-900 mb-2.5"
                    >
                      Work Email <span className="text-[#B8860B]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      placeholder="you@company.com"
                      className={inputCls('email')}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="focusArea"
                    className="block text-xs md:text-sm font-mono font-semibold uppercase tracking-[0.16em] text-slate-900 mb-2.5"
                  >
                    What do you need help with?
                  </label>
                  <select
                    id="focusArea"
                    name="focusArea"
                    value={formData.focusArea}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('focusArea')}
                    onBlur={() => setFocusedField(null)}
                    className={cn(inputCls('focusArea'), 'appearance-none bg-no-repeat')}
                    style={selectStyle}
                  >
                    <option value="">Select an option</option>
                    <option value="ai-solutions">AI Solutions</option>
                    <option value="data-generation">Data Generation</option>
                    <option value="data-annotation">Data Annotation</option>
                    <option value="data-labeling">Data Labeling</option>
                    <option value="data-qa">Data Quality Assurance</option>
                    <option value="not-sure">Not sure yet</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs md:text-sm font-mono font-semibold uppercase tracking-[0.16em] text-slate-900 mb-2.5"
                  >
                    Tell us about your project <span className="text-[#B8860B]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={4}
                    placeholder="Describe what you are building, your timeline, and where you need support..."
                    className={cn(inputCls('message'), 'resize-none')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-analytics-name="Start a Conversation"
                  className="btn-primary w-full py-3.5 md:py-4 text-base font-medium disabled:opacity-60 bg-[#1e293b] text-white rounded-xl hover:bg-[#B8860B] transition-colors font-mono tracking-wider"
                >
                  {isSubmitting ? 'Sending...' : 'Start a Conversation'}
                </button>
                <p className="text-center text-sm text-slate-600">
                  Prefer email?{' '}
                  <a
                    href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent('Project inquiry — Avora Ventures')}`}
                    className="font-semibold text-[#8a6200] underline underline-offset-2"
                  >
                    Contact Avora directly
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
