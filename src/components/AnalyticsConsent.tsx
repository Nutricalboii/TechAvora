'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';

const CONSENT_KEY = 'techavora-analytics-consent';
const CONSENT_COOKIE = 'techavora_analytics_consent';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type Consent = 'granted' | 'denied' | null;

let preferencesOpen = false;

function readConsent(): Consent {
  const cookieValue = document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(`${CONSENT_COOKIE}=`))
    ?.split('=')[1];
  if (cookieValue === 'granted' || cookieValue === 'denied') return cookieValue;

  try {
    const storedValue = window.localStorage.getItem(CONSENT_KEY);
    return storedValue === 'granted' || storedValue === 'denied' ? storedValue : null;
  } catch {
    return null;
  }
}

function getSnapshot() {
  return `${readConsent() ?? 'unset'}:${preferencesOpen ? 'open' : 'closed'}`;
}

function subscribeToConsent(onChange: () => void) {
  const openPreferences = () => {
    preferencesOpen = true;
    onChange();
  };
  const closePreferences = () => {
    preferencesOpen = false;
    onChange();
  };
  const updateConsent = () => {
    preferencesOpen = false;
    onChange();
  };

  window.addEventListener('techavora:analytics-consent', updateConsent);
  window.addEventListener('techavora:open-consent', openPreferences);
  window.addEventListener('techavora:close-consent', closePreferences);
  return () => {
    window.removeEventListener('techavora:analytics-consent', updateConsent);
    window.removeEventListener('techavora:open-consent', openPreferences);
    window.removeEventListener('techavora:close-consent', closePreferences);
  };
}

export default function AnalyticsConsent() {
  const [consentValue, isOpen] = useSyncExternalStore(
    subscribeToConsent,
    getSnapshot,
    () => 'unset:closed',
  ).split(':');
  const consent: Consent = consentValue === 'granted' || consentValue === 'denied'
    ? consentValue
    : null;

  const saveConsent = (value: Exclude<Consent, null>) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // The consent cookie remains available if browser storage is restricted.
    }
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`;
    window.dispatchEvent(new CustomEvent('techavora:analytics-consent', { detail: value }));
  };

  if (!GA_ID || (consent !== null && isOpen !== 'open')) return null;

  return (
    <aside
      role="region"
      aria-label="Analytics preferences"
      data-analytics-ignore="true"
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:flex sm:items-center sm:gap-6"
    >
      <p className="flex-1 text-sm leading-relaxed text-slate-700">
        Tech Avora uses Vercel Analytics for aggregate site usage. Google Analytics is optional and runs only
        with your permission. Read our{' '}
        <Link href="/privacy" className="font-semibold text-[#8a6200] underline">
          Privacy Policy
        </Link>{' '}
        for details.
      </p>
      <div className="mt-4 flex shrink-0 flex-wrap gap-3 sm:mt-0">
        {consent !== null && (
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('techavora:close-consent'))}
            className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-700"
          >
            Close
          </button>
        )}
        <button
          type="button"
          onClick={() => saveConsent('denied')}
          className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-700"
        >
          Decline Google Analytics
        </button>
        <button
          type="button"
          onClick={() => saveConsent('granted')}
          className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white"
        >
          Allow Google Analytics
        </button>
      </div>
    </aside>
  );
}
