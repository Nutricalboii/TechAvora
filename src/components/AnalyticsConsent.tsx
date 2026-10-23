'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';

const CONSENT_KEY = 'avora-analytics-consent';
const CONSENT_COOKIE = 'avora_analytics_consent';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type Consent = 'granted' | 'denied' | null;

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

function subscribeToConsent(onChange: () => void) {
  window.addEventListener('avora:analytics-consent', onChange);
  window.addEventListener('avora:open-consent', onChange);
  return () => {
    window.removeEventListener('avora:analytics-consent', onChange);
    window.removeEventListener('avora:open-consent', onChange);
  };
}

export default function AnalyticsConsent() {
  const consent = useSyncExternalStore(subscribeToConsent, readConsent, () => null);

  const saveConsent = (value: Exclude<Consent, null>) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // The consent cookie remains the source of truth if storage is restricted.
    }
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`;
    window.dispatchEvent(new CustomEvent('avora:analytics-consent', { detail: value }));
  };

  if (!GA_ID || consent !== null) return null;

  return (
    <aside
      role="dialog"
      aria-label="Analytics preferences"
      data-analytics-ignore="true"
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:flex sm:items-center sm:gap-6"
    >
      <p className="flex-1 text-sm leading-relaxed text-slate-700">
        We use Google Analytics only to understand aggregate site usage and improve Avora. Read our{' '}
        <Link href="/privacy" className="font-semibold text-[#8a6200] underline">
          Privacy Policy
        </Link>{' '}
        for details.
      </p>
      <div className="mt-4 flex shrink-0 gap-3 sm:mt-0">
        <button
          type="button"
          onClick={() => saveConsent('denied')}
          className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-700"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => saveConsent('granted')}
          className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white"
        >
          Allow analytics
        </button>
      </div>
    </aside>
  );
}
