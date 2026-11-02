import { Suspense } from 'react';
import type { Metadata, Viewport } from "next";
import { DM_Sans, Bebas_Neue, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import { siteConfig } from '@/config/site';
import { generateSchema } from '@/app/schema';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import AnalyticsConsent from '@/components/AnalyticsConsent';
import GlobalElements from '@/components/GlobalElements';
import { ThemeProvider } from '@/components/ThemeProvider';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import ShaderBackground from '@/components/ShaderBackground';
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas-neue',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Production AI Data Operations`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: 'technology',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: `${siteConfig.name} | Production AI Data Operations`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — AI Infrastructure & Data Operations`,
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Production AI Data Operations`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og`],
  },
  metadataBase: new URL(siteConfig.url),
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: '/logo.png',
    shortcut: '/logo.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#FBF8F1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${dmSans.variable} ${bebasNeue.variable} ${ibmPlexMono.variable}`}>
      <head>
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <script
            id="google-analytics-consent-default"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} window.gtag = gtag; gtag('js', new Date()); gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });`,
            }}
          />
        ) : null}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans text-[var(--foreground)]">
        {/* WebGL shader background — only on home page */}
        <ShaderBackground />
        {/* Skip to content — for keyboard/screen reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-slate-900 focus:text-white focus:rounded-lg focus:shadow-lg focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm font-medium"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <SmoothScrollProvider>
            <GlobalElements type='header' />
            <main id="main-content" className="flex-grow flex flex-col relative z-0 animate-in fade-in slide-in-from-bottom-2 duration-700">
              <Suspense fallback={<div className="min-h-screen" />}>
                {children}
              </Suspense>
            </main>
            <GlobalElements type='footer' />
          </SmoothScrollProvider>
        </ThemeProvider>
        <GoogleAnalytics />
        <AnalyticsConsent />
        <Analytics />
      </body>
    </html>
  );
}
