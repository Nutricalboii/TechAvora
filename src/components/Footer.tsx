'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from './Logo';
import { siteConfig } from '@/config/site';

// Computed once at module load — no need to call new Date() on every render
const CURRENT_YEAR = new Date().getFullYear();

function useScrollTo() {
  const pathname = usePathname();
  const router = useRouter();

  return (sectionId: string) => {
    const scrollNow = () => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (pathname === '/') {
      // Already on home — always force scroll (fixes repeated-click issue)
      scrollNow();
    } else {
      router.push(`/#${sectionId}`);
      // After navigation, wait for DOM then scroll
      setTimeout(scrollNow, 400);
    }
  };
}

export default function Footer() {
  const scrollTo = useScrollTo();

  return (
    <footer
      className="relative z-20"
      style={{ backgroundColor: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(16px)' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-5 hover:opacity-80 transition-opacity">
              <Logo size="md" className="h-9 w-auto text-[var(--foreground)]" />
            </Link>
            <p className="text-base text-[var(--foreground-muted)] leading-relaxed max-w-xs">
              Data generation, annotation, labeling, quality assurance, and AI implementation —
              five disciplines, one continuous pipeline.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)] mb-5">
              Services
            </h3>
            <ul className="space-y-4">
              {[
                { label: 'AI Solutions', stage: 0 },
                { label: 'Data Generation', stage: 1 },
                { label: 'Data Annotation', stage: 2 },
                { label: 'Data Labeling', stage: 3 },
                { label: 'Data Quality Assurance', stage: 4 },
              ].map(({ label, stage }) => (
                <li key={label}>
                  <Link
                    href={`/services?stage=${stage}`}
                    className="text-[15px] text-[var(--foreground)] hover:text-[#B8860B] transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)] mb-5">
              Company
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/blog"
                  className="text-[15px] text-[var(--foreground)] hover:text-[#B8860B] transition-colors duration-200"
                >
                  Blog
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('contact')}
                  className="text-[15px] text-[var(--foreground)] hover:text-[#B8860B] transition-colors duration-200 text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)] mb-5">
              Legal
            </h3>
            <ul className="space-y-4">
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[15px] text-[var(--foreground)] hover:text-[#B8860B] transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event('avora:open-consent'))}
                  className="text-[15px] text-[var(--foreground)] hover:text-[#B8860B] transition-colors duration-200 text-left"
                >
                  Cookie settings
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[14px] text-[var(--foreground-muted)]">
            © {CURRENT_YEAR} Avora Ventures Inc. All rights reserved.
          </p>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="text-[14px] text-[var(--foreground-muted)] hover:text-[#B8860B] transition-colors duration-200"
          >
            {siteConfig.contactEmail}
          </a>
        </div>
      </div>
    </footer>
  );
}
