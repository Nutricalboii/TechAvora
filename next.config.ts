import type { NextConfig } from "next";

// Engineered by Vaibhav Sharma · github.com/Nutricalboii

const isDev = process.env.NODE_ENV === "development";

const cspDirectives = [
  "default-src 'self'",
  // unsafe-eval only in dev (HMR), unsafe-inline is required by Next.js RSC inline scripts
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  // Vercel analytics + Speed Insights endpoints
  "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://www.google-analytics.com https://region1.google-analytics.com",
  "worker-src 'none'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
];

const securityHeaders = [
  // Disable DNS pre-fetching to avoid leaking navigation intent
  { key: "X-DNS-Prefetch-Control", value: "off" },
  // Vercel currently adds a wildcard CORS header; pin browser access to Avora.
  { key: "Access-Control-Allow-Origin", value: "https://www.avoraventure.com" },
  // Clickjacking protection (belt-and-suspenders alongside CSP frame-ancestors)
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent MIME sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Limit referrer information sent cross-origin
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restrict browser features — scope to only what the site actually uses
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "interest-cohort=()",
      "payment=()",
      "usb=()",
    ].join(", "),
  },
  // Content-Security-Policy
  {
    key: "Content-Security-Policy",
    value: cspDirectives.join("; "),
  },
  // HSTS — 2 years, include subdomains, preload
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Opt out of Google's FLoC / Topics API
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  // Cross-Origin policies — harden against Spectre/side-channel leaks
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
];

const nextConfig: NextConfig = {
  compress: true,
  images: {
    // Prefer AVIF first (better compression), fall back to WebP
    formats: ["image/avif", "image/webp"],
    // Do not allow arbitrary remote image optimisation without explicit domains
    remotePatterns: [],
    // Limit SVG optimization — SVGs can carry XSS payloads
    dangerouslyAllowSVG: false,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      // Keep the legacy route discoverable but consolidate it into the clean root URL.
      { source: "/home", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // Apply to every route including API routes and static assets
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  // Disable x-powered-by: Next.js header to reduce server fingerprinting
  poweredByHeader: false,
};

export default nextConfig;
