'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useSyncExternalStore } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CONSENT_KEY = 'avora-analytics-consent';
const CONSENT_COOKIE = 'avora_analytics_consent';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function readAnalyticsConsent(): 'granted' | 'denied' | null {
  if (typeof document !== 'undefined') {
    const cookie = document.cookie
      .split('; ')
      .find((entry) => entry.startsWith(`${CONSENT_COOKIE}=`))
      ?.split('=')[1];

    if (cookie === 'granted' || cookie === 'denied') return cookie;
  }

  if (typeof window !== 'undefined') {
    try {
      const stored = window.localStorage.getItem(CONSENT_KEY);
      if (stored === 'granted' || stored === 'denied') return stored;
    } catch {
      return null;
    }
  }

  return null;
}

function subscribeToAnalyticsConsent(onChange: () => void) {
  window.addEventListener('avora:analytics-consent', onChange);
  return () => window.removeEventListener('avora:analytics-consent', onChange);
}

function cleanLabel(value: string, fallback: string): string {
  const label = value.replace(/\s+/g, ' ').trim().slice(0, 80);
  return label || fallback;
}

function getInteractionDetails(element: HTMLElement) {
  const anchor = element.closest('a');
  const isButton = element.matches('button, [role="button"], input[type="button"], input[type="submit"]');
  const rawLabel = element.dataset.analyticsName || element.getAttribute('aria-label') || element.textContent || '';
  const label = anchor?.getAttribute('href')?.startsWith('mailto:')
    ? 'email_contact'
    : cleanLabel(rawLabel, isButton ? 'button' : 'link');

  const href = anchor?.getAttribute('href');
  let destinationType = isButton ? 'button' : 'link';
  let destination = '';

  if (href) {
    if (href.startsWith('mailto:')) {
      destinationType = 'email';
    } else if (href.startsWith('#')) {
      destinationType = 'anchor';
      destination = href.slice(0, 80);
    } else {
      try {
        const url = new URL(href, window.location.href);
        destinationType = url.origin === window.location.origin ? 'internal' : 'external';
        destination = url.origin === window.location.origin ? `${url.pathname}${url.hash}` : url.hostname;
      } catch {
        destinationType = 'link';
      }
    }
  }

  return {
    element_type: isButton ? 'button' : 'link',
    element_label: label,
    destination_type: destinationType,
    ...(destination ? { destination } : {}),
  };
}

export function trackAnalyticsEvent(
  action: string,
  parameters: Record<string, string | number | boolean> = {},
) {
  if (
    typeof window === 'undefined' ||
    !GA_ID ||
    readAnalyticsConsent() !== 'granted' ||
    typeof window.gtag !== 'function'
  ) {
    return;
  }

  window.gtag('event', action, parameters);
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(
    subscribeToAnalyticsConsent,
    () => readAnalyticsConsent() ?? 'unset',
    () => 'unset',
  );

  useEffect(() => {
    if (!GA_ID) return;

    let pageViewSent = false;
    const sendPageView = () => {
      if (
        pageViewSent ||
        readAnalyticsConsent() !== 'granted' ||
        typeof window.gtag !== 'function'
      ) return;
      pageViewSent = true;
      window.gtag('config', GA_ID, {
        page_path: pathname,
        page_title: document.title,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });
    };

    const handleConsent = (event: Event) => {
      if (typeof window.gtag !== 'function') return;
      const consent = (event as CustomEvent<'granted' | 'denied'>).detail;
      window.gtag('consent', 'update', {
        analytics_storage: consent === 'granted' ? 'granted' : 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
      if (consent === 'granted') sendPageView();
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>(
        'a, button, [role="button"], input[type="button"], input[type="submit"]',
      ) : null;

      if (!target || target.closest('[data-analytics-ignore="true"]')) return;

      trackAnalyticsEvent('ui_interaction', {
        page_path: pathname,
        ...getInteractionDetails(target),
      });
    };

    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const form = target?.closest<HTMLFormElement>('[data-analytics-form]');
      if (!form || form.dataset.analyticsStarted === 'true') return;

      form.dataset.analyticsStarted = 'true';
      trackAnalyticsEvent('form_start', {
        form_name: form.dataset.analyticsForm || 'form',
        page_path: pathname,
      });
    };

    const handleChange = (event: Event) => {
      const target = event.target instanceof HTMLSelectElement ? event.target : null;
      const form = target?.closest<HTMLFormElement>('[data-analytics-form]');
      if (!target || !form) return;

      trackAnalyticsEvent('form_option_change', {
        form_name: form.dataset.analyticsForm || 'form',
        option_name: target.name || 'select',
        option_value: target.value || 'empty',
        page_path: pathname,
      });
    };

    const handleSubmit = (event: SubmitEvent) => {
      const form = event.target instanceof HTMLFormElement ? event.target : null;
      if (!form?.matches('[data-analytics-form]')) return;

      trackAnalyticsEvent('form_submit_attempt', {
        form_name: form.dataset.analyticsForm || 'form',
        page_path: pathname,
      });
    };

    window.addEventListener('avora:analytics-consent', handleConsent);
    document.addEventListener('click', handleClick);
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('change', handleChange);
    document.addEventListener('submit', handleSubmit, true);

    if (readAnalyticsConsent() === 'granted') sendPageView();
    const pageViewRetry = window.setTimeout(sendPageView, 1000);

    return () => {
      window.clearTimeout(pageViewRetry);
      window.removeEventListener('avora:analytics-consent', handleConsent);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('change', handleChange);
      document.removeEventListener('submit', handleSubmit, true);
    };
  }, [pathname, consent]);

  if (!GA_ID || consent !== 'granted') return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
