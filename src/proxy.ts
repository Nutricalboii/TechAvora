import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Edge middleware — runs before any route handler or page render.
// Responsibilities:
//   1. Block obviously malicious request patterns early
//   2. Stamp security headers that Next.js config cannot set at the edge

export default function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // ── 1. Block common vulnerability scanner / path-traversal probes ─────────
  const BLOCKED_PATTERNS = [
    /\.\.\//,              // Path traversal
    /<script/i,            // Reflected XSS in URL
    /\beval\b/i,           // JS injection probe
    /\bphpmyadmin\b/i,     // Common scan target
    /\bwp-admin\b/i,       // WordPress scanner
    /\.env/i,              // .env file probe
    /\bselect\b.*\bfrom\b/i, // SQL injection probe
  ];

  if (BLOCKED_PATTERNS.some(p => p.test(pathname))) {
    return new NextResponse(null, { status: 400 });
  }

  // ── 2. Continue, stamping security headers ────────────────────────────────
  const response = NextResponse.next();

  // These are already in next.config.ts but stamping at the edge ensures
  // they are present even before the Node runtime handles the request.
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  // Run on every path except Next.js internals and static files
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
