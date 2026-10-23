import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { siteConfig } from '@/config/site';

// ─── Schema ─────────────────────────────────────────────────────────────────

const ContactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email address').max(254),
  company: z.string().trim().max(100).optional(),
  serviceType: z.string().trim().max(50).optional(),
  focusArea: z.string().trim().max(50).optional(),
  industry: z.string().trim().max(50).optional(),
  message: z.string().trim().min(1, 'Message is required').max(2000),
  // Honeypot — bots fill this; real browsers leave it empty
  _honeypot: z.string().max(0, 'Bot detected').optional(),
});

// ─── Rate limiter ────────────────────────────────────────────────────────────
// Best-effort per-instance throttling. Use Vercel Firewall or a shared store
// for a globally enforced limit across serverless instances.

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;           // max submissions per window
const WINDOW_MS  = 15 * 60 * 1000; // 15 minutes

function pruneRateLimits(now: number): void {
  if (rateLimitMap.size < 1_000) return;

  // Prune on traffic instead of keeping a background timer alive in a serverless worker.
  for (const [key, val] of rateLimitMap.entries()) {
    if (now > val.resetAt) rateLimitMap.delete(key);
  }
  // Bound memory if a burst produces many unique IP keys before they expire.
  while (rateLimitMap.size > 5_000) {
    const oldestKey = rateLimitMap.keys().next().value;
    if (!oldestKey) break;
    rateLimitMap.delete(oldestKey);
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  pruneRateLimits(now);
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (record.count >= RATE_LIMIT) return true;
  record.count++;
  return false;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getClientIp(req: NextRequest): string {
  // Vercel sets x-real-ip at its edge. Avoid trusting a caller-supplied
  // x-forwarded-for value in production. The fallback supports local dev only.
  const trustedPlatformIp = req.headers.get('x-real-ip')?.trim();
  if (trustedPlatformIp) return trustedPlatformIp;
  if (process.env.NODE_ENV === 'development') {
    return req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'local';
  }
  return 'unknown';
}

function isTrustedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  if (!origin || origin === 'null') return process.env.NODE_ENV === 'development';

  try {
    const parsedOrigin = new URL(origin);
    if (parsedOrigin.origin === new URL(siteConfig.url).origin) return true;
    return process.env.NODE_ENV === 'development' &&
      ['localhost', '127.0.0.1'].includes(parsedOrigin.hostname);
  } catch {
    return false;
  }
}

class RequestBodyTooLargeError extends Error {}

async function readJsonBody(req: NextRequest): Promise<unknown> {
  if (!req.body) throw new SyntaxError('Missing request body.');

  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new RequestBodyTooLargeError();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return JSON.parse(new TextDecoder().decode(body));
}

function jsonError(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, {
    status,
    headers: {
      'Content-Type': 'application/json',
      // Prevent caching of error responses
      'Cache-Control': 'no-store',
    },
  });
}

// ─── Handler ──────────────────────────────────────────────────────────────────

// Refuse requests whose body exceeds this to prevent memory exhaustion
const MAX_BODY_BYTES = 8_192; // 8 KB — more than enough for a contact form

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Browser form submissions must originate from Avora itself.
  if (!isTrustedOrigin(req)) {
    return jsonError('Forbidden.', 403);
  }

  // 1. Enforce Content-Type
  const contentType = (req.headers.get('content-type') ?? '').split(';', 1)[0].trim().toLowerCase();
  if (contentType !== 'application/json') {
    return jsonError('Unsupported Media Type.', 415);
  }

  // 2. Enforce request body size
  const contentLengthHeader = req.headers.get('content-length');
  const contentLength = contentLengthHeader === null ? null : Number(contentLengthHeader);
  if (contentLength !== null && (!Number.isSafeInteger(contentLength) || contentLength < 0)) {
    return jsonError('Invalid Content-Length.', 400);
  }
  if (contentLength !== null && contentLength > MAX_BODY_BYTES) {
    return jsonError('Request body too large.', 413);
  }

  // 3. Rate limit
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(WINDOW_MS / 1000)),
          'Cache-Control': 'no-store',
        },
      }
    );
  }

  // 4. Parse JSON body
  let rawBody: unknown;
  try {
    rawBody = await readJsonBody(req);
  } catch (err) {
    if (err instanceof RequestBodyTooLargeError) {
      return jsonError('Request body too large.', 413);
    }
    return jsonError('Invalid JSON body.', 400);
  }

  // 5. Validate with Zod
  const parsed = ContactSchema.safeParse(rawBody);
  if (!parsed.success) {
    return jsonError(
      parsed.error.issues[0]?.message ?? 'Validation failed.',
      422
    );
  }

  const { _honeypot, ...data } = parsed.data;

  // 6. Honeypot trap — silent fake-success so bots never learn
  if (_honeypot && _honeypot.length > 0) {
    return NextResponse.json({ success: true }, {
      headers: { 'Cache-Control': 'no-store' },
    });
  }

  // 7. Forward to Google Apps Script backend
  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

  if (!GOOGLE_SCRIPT_URL) {
    // Dev mode can exercise the form without a configured delivery backend.
    if (process.env.NODE_ENV === 'development') {
      console.info('[Contact] GOOGLE_SCRIPT_URL not set; accepted a local development submission.');
      return NextResponse.json({ success: true }, {
        headers: { 'Cache-Control': 'no-store' },
      });
    }
    console.error('[Contact] GOOGLE_SCRIPT_URL is not configured in production.');
    return jsonError('Service unavailable. Please email us directly.', 503);
  }

  let scriptUrl: URL;
  try {
    scriptUrl = new URL(GOOGLE_SCRIPT_URL);
  } catch {
    console.error('[Contact] GOOGLE_SCRIPT_URL is invalid.');
    return jsonError('Service unavailable. Please email us directly.', 503);
  }
  if (
    scriptUrl.protocol !== 'https:' ||
    scriptUrl.hostname !== 'script.google.com' ||
    !/^\/macros\/s\/[^/]+\/exec$/.test(scriptUrl.pathname)
  ) {
    console.error('[Contact] GOOGLE_SCRIPT_URL must be an HTTPS Apps Script web app URL.');
    return jsonError('Service unavailable. Please email us directly.', 503);
  }

  try {
    const res = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      // Abort if the upstream doesn't respond in 8 seconds
      signal: AbortSignal.timeout(8_000),
    });

    const result = await res.json().catch(() => null) as { success?: unknown } | null;
    if (!res.ok || result?.success !== true) {
      console.error('[Contact] Google Script non-OK status:', res.status);
      return jsonError(
        'Submission could not be delivered. Please try again or email us directly.',
        502
      );
    }

    return NextResponse.json({ success: true }, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (err) {
    const isTimeout = err instanceof Error && err.name === 'TimeoutError';
    console.error('[Contact] Google Script request failed:', isTimeout ? 'timeout' : 'network error');
    return jsonError(
      isTimeout
        ? 'Request timed out. Please try again.'
        : 'Submission could not be delivered. Please try again or email us directly.',
      isTimeout ? 504 : 502
    );
  }
}

// Explicitly block all other HTTP methods
export function GET()    { return jsonError('Method not allowed.', 405); }
export function PUT()    { return jsonError('Method not allowed.', 405); }
export function PATCH()  { return jsonError('Method not allowed.', 405); }
export function DELETE() { return jsonError('Method not allowed.', 405); }
