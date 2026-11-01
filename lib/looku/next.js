// Looku connector for Next.js, copied from the Looku repository (packages/next/src/index.js, commit 0acd83e) and
// formatted with this repository's Prettier settings. Looku is not published yet, so the file is kept here.

// Looku connector for Next.js proxy.js (Next 16) or middleware.js (Next 14-15).
// It records a page view on the server for each real page request and stores
// nothing in the browser. Works in the Edge and Node runtimes: only fetch and
// Web Crypto are used.

export const BOT_USER_AGENT_PATTERN =
  /bot|crawl|spider|slurp|preview|monitor|headless|lighthouse|pagespeed|facebookexternalhit|embedly|curl|wget|python|httpclient|okhttp|axios|node-fetch|go-http|java\//i;

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const FILE_PATH_PATTERN = /\/[^/]+\.[a-z0-9]+$/i;
const SKIPPED_PREFIXES = ['/api/', '/_next/'];

function isPrefetch(headers) {
  return (
    headers.has('next-router-prefetch') ||
    headers.get('purpose') === 'prefetch' ||
    /prefetch/i.test(headers.get('sec-purpose') || '')
  );
}

// Behind Cloudflare, Vercel's x-forwarded-for can hold Cloudflare's edge
// address, so Cloudflare's own header is read first. List only headers that
// your own proxy sets: a visitor can send any of these directly.
export const DEFAULT_IP_HEADERS = [
  'cf-connecting-ip',
  'x-vercel-forwarded-for',
  'x-forwarded-for',
  'x-real-ip',
];

function clientIp(headers, ipHeaders) {
  for (const name of ipHeaders) {
    const value = String(headers.get(name) || '')
      .split(',')[0]
      .trim();
    if (value) {
      return value;
    }
  }
  return '';
}

function matchesAny(path, patterns) {
  return patterns.some((pattern) =>
    pattern instanceof RegExp
      ? pattern.test(path)
      : path === pattern || path.startsWith(`${pattern.replace(/\/$/, '')}/`)
  );
}

function getCookie(request, name) {
  if (request.cookies?.get) {
    return request.cookies.get(name)?.value;
  }
  const match = String(request.headers.get('cookie') || '')
    .split(';')
    .map((part) => part.trim().split('='))
    .find(([key]) => key === name);
  if (!match) {
    return undefined;
  }
  try {
    return decodeURIComponent(match.slice(1).join('='));
  } catch {
    return match.slice(1).join('=');
  }
}

/**
 * Builds the page view payload, or returns null when the request should not be
 * counted: not a GET page request, a prefetch, a file, an excluded path, a
 * bot, a request without Accept-Language, Do Not Track or Global Privacy
 * Control, or the owner's opt-out cookie.
 */
export function buildPageview(request, options = {}) {
  const {
    excludePaths = [],
    optOutCookie,
    respectDoNotTrack = true,
    requireAcceptLanguage = true,
    ipHeaders = DEFAULT_IP_HEADERS,
  } = options;

  if (request.method !== 'GET') {
    return null;
  }
  const headers = request.headers;
  const url = new URL(request.url);
  const path = url.pathname;
  const userAgent = String(headers.get('user-agent') || '').trim();
  const ip = clientIp(headers, ipHeaders);

  if (
    isPrefetch(headers) ||
    SKIPPED_PREFIXES.some((prefix) => path.startsWith(prefix)) ||
    FILE_PATH_PATTERN.test(path) ||
    matchesAny(path, excludePaths) ||
    !ip ||
    !userAgent ||
    BOT_USER_AGENT_PATTERN.test(userAgent) ||
    (requireAcceptLanguage && !headers.get('accept-language')) ||
    (respectDoNotTrack &&
      (headers.get('sec-gpc') === '1' || headers.get('dnt') === '1')) ||
    (optOutCookie && getCookie(request, optOutCookie.name) === optOutCookie.value)
  ) {
    return null;
  }

  const payload = {
    type: 'pageview',
    source: 'server',
    ts: new Date().toISOString(),
    path,
    referrer: String(headers.get('referer') || ''),
    ip,
    ua: userAgent,
    country: String(
      headers.get('x-vercel-ip-country') || headers.get('cf-ipcountry') || ''
    ),
  };
  for (const key of UTM_KEYS) {
    const value = url.searchParams.get(key);
    if (value) {
      payload[key] = value.slice(0, 120);
    }
  }
  return payload;
}

async function hmacHex(key, message) {
  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(message));
  return [...new Uint8Array(signature)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

/** Sends a signed payload to the Looku receiver. Never throws. */
export async function sendToLooku(
  payload,
  { endpoint, siteId, signingKey, timeoutMs = 3000, fetchImpl = fetch }
) {
  if (!endpoint || !siteId || !signingKey) {
    return false;
  }
  try {
    const body = JSON.stringify(payload);
    const timestamp = Math.floor(Date.now() / 1000);
    const mac = await hmacHex(signingKey, `${timestamp}.${body}`);
    const response = await fetchImpl(`${endpoint.replace(/\/+$/, '')}/ingest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Looku-Site': siteId,
        'X-Looku-Signature': `t=${timestamp},v1=${mac}`,
      },
      body,
      signal: AbortSignal.timeout(timeoutMs),
      cache: 'no-store',
    });
    return response.ok;
  } catch {
    // Analytics must never affect the page. The error is not logged because
    // the request carries the visitor's IP address.
    return false;
  }
}

/**
 * Records a page view in the background. Call from proxy.js/middleware.js:
 *
 *   export function proxy(request, event) {
 *     trackPageview(request, event, lookuOptions);
 *     return NextResponse.next();
 *   }
 *
 * `enabled` defaults to production only (VERCEL_ENV, or NODE_ENV when not on
 * Vercel), so previews and local development do not send data.
 */
export function trackPageview(request, event, options = {}) {
  const env = options.env || (typeof process !== 'undefined' ? process.env : {});
  const enabled =
    options.enabled ??
    (env.VERCEL_ENV ? env.VERCEL_ENV === 'production' : env.NODE_ENV === 'production');
  if (!enabled) {
    return null;
  }

  let payload;
  try {
    payload = buildPageview(request, options);
  } catch {
    // A malformed request must not break the page.
    return null;
  }
  if (!payload) {
    return null;
  }
  const sending = sendToLooku(payload, {
    endpoint: options.endpoint ?? env.LOOKU_ENDPOINT,
    siteId: options.siteId ?? env.LOOKU_SITE_ID,
    signingKey: options.signingKey ?? env.LOOKU_SIGNING_KEY,
    timeoutMs: options.timeoutMs,
    fetchImpl: options.fetchImpl,
  });
  if (event?.waitUntil) {
    event.waitUntil(sending);
  }
  return sending;
}

/**
 * Recommended matcher. Next.js requires `config` to be a literal in the
 * proxy file, so copy this there instead of importing it.
 */
export const RECOMMENDED_MATCHER = [
  {
    source: '/((?!api|_next/static|_next/image|.*\\..*).*)',
    missing: [
      { type: 'header', key: 'next-router-prefetch' },
      { type: 'header', key: 'purpose', value: 'prefetch' },
      { type: 'header', key: 'sec-purpose', value: '(.*)prefetch(.*)' },
    ],
  },
];
