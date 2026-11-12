// Looku connector for Next.js, copied from the Looku repository (packages/next/src/index.js, version 0.9.2, MIT
// license) and formatted with this repository's Prettier settings. Looku is not on npm, so the file is kept here.

// Looku connector for Next.js proxy.js (Next 16) or middleware.js (Next 14-15).
// It records a page view on the server for each real page request and stores
// nothing in the browser. Works in the Edge and Node runtimes: only fetch and
// Web Crypto are used.

export const BOT_USER_AGENT_PATTERN =
  /bot|crawl|spider|slurp|preview|monitor|headless|lighthouse|pagespeed|facebookexternalhit|embedly|curl|wget|python|httpclient|okhttp|axios|node-fetch|go-http|java\//i;

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const FILE_PATH_PATTERN = /\/[^/]+\.[a-z0-9]+$/i;
const SKIPPED_PREFIXES = ['/api/', '/_next/'];

// Next.js removes the prefetch headers before proxy.js runs, so there only the
// matcher can leave prefetches out. This check covers other setups.
function isPrefetch(headers) {
  return (
    headers.has('next-router-prefetch') ||
    headers.get('purpose') === 'prefetch' ||
    /prefetch/i.test(headers.get('sec-purpose') || '')
  );
}

// Browsers that send Fetch Metadata (Sec-Fetch-*) with every request over
// HTTPS: Chromium 76, Firefox 90 and Safari 16.4 (every browser on iOS uses
// Safari's engine). A request that names one of these but has no
// Sec-Fetch-Mode comes from a crawler that copies a browser's user agent.
// Older browsers are counted as before.
function sendsFetchMetadata(userAgent) {
  const atLeast = (major, minor, needMajor, needMinor) =>
    Number(major) > needMajor ||
    (Number(major) === needMajor && Number(minor || 0) >= needMinor);
  const ios = userAgent.match(/(?:iPhone|iPad|iPod).*? OS (\d+)_(\d+)/);
  if (ios) {
    return atLeast(ios[1], ios[2], 16, 4);
  }
  const chromium = userAgent.match(/Chrome\/(\d+)/);
  if (chromium) {
    return Number(chromium[1]) >= 76;
  }
  const firefox = userAgent.match(/Firefox\/(\d+)/);
  if (firefox) {
    return Number(firefox[1]) >= 90;
  }
  const safari = userAgent.match(/Version\/(\d+)(?:\.(\d+))?.*Safari\//);
  if (safari) {
    return atLeast(safari[1], safari[2], 16, 4);
  }
  return false;
}

// Browsers send Fetch Metadata only to secure origins.
function overHttps(request) {
  const proto = String(request.headers.get('x-forwarded-proto') || '')
    .split(',')[0]
    .trim();
  return (proto || new URL(request.url).protocol.replace(':', '')) === 'https';
}

function lacksFetchMetadata(request, userAgent) {
  return (
    !request.headers.get('sec-fetch-mode') &&
    overHttps(request) &&
    sendsFetchMetadata(userAgent)
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
      return { ip: value, header: name };
    }
  }
  return { ip: '', header: '' };
}

// Behind Cloudflare, Vercel sees Cloudflare's server, and its country header
// names the country of that server (often a neighbouring one). When the
// address comes from Cloudflare, so does the country.
function clientCountry(headers, ipHeader) {
  const names =
    ipHeader === 'cf-connecting-ip'
      ? ['cf-ipcountry']
      : ['x-vercel-ip-country', 'cf-ipcountry'];
  for (const name of names) {
    const value = String(headers.get(name) || '').trim();
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
 * bot, a request without Accept-Language, a modern browser's user agent
 * without Fetch Metadata, Do Not Track or Global Privacy Control, or the
 * owner's opt-out cookie.
 */
export function buildPageview(request, options = {}) {
  const {
    excludePaths = [],
    optOutCookie,
    respectDoNotTrack = true,
    requireAcceptLanguage = true,
    requireFetchMetadata = true,
    ipHeaders = DEFAULT_IP_HEADERS,
  } = options;

  if (request.method !== 'GET') {
    return null;
  }
  const headers = request.headers;
  const url = new URL(request.url);
  const path = url.pathname;
  const userAgent = String(headers.get('user-agent') || '').trim();
  const { ip, header: ipHeader } = clientIp(headers, ipHeaders);

  if (
    isPrefetch(headers) ||
    SKIPPED_PREFIXES.some((prefix) => path.startsWith(prefix)) ||
    FILE_PATH_PATTERN.test(path) ||
    matchesAny(path, excludePaths) ||
    !ip ||
    !userAgent ||
    BOT_USER_AGENT_PATTERN.test(userAgent) ||
    (requireAcceptLanguage && !headers.get('accept-language')) ||
    (requireFetchMetadata && lacksFetchMetadata(request, userAgent)) ||
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
    country: clientCountry(headers, ipHeader),
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

/** Sends a signed payload to the Looku receiver (POST /ingest, or `path`). Never throws. */
export async function sendToLooku(
  payload,
  { endpoint, siteId, signingKey, timeoutMs = 3000, fetchImpl = fetch, path = '/ingest' }
) {
  if (!endpoint || !siteId || !signingKey) {
    return false;
  }
  try {
    const body = JSON.stringify(payload);
    const timestamp = Math.floor(Date.now() / 1000);
    const mac = await hmacHex(signingKey, `${timestamp}.${body}`);
    const response = await fetchImpl(`${endpoint.replace(/\/+$/, '')}${path}`, {
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
function settings(options) {
  const env = options.env || (typeof process !== 'undefined' ? process.env : {});
  return {
    enabled:
      options.enabled ??
      (env.VERCEL_ENV ? env.VERCEL_ENV === 'production' : env.NODE_ENV === 'production'),
    send: {
      endpoint: options.endpoint ?? env.LOOKU_ENDPOINT,
      siteId: options.siteId ?? env.LOOKU_SITE_ID,
      signingKey: options.signingKey ?? env.LOOKU_SIGNING_KEY,
      timeoutMs: options.timeoutMs,
      fetchImpl: options.fetchImpl,
    },
  };
}

export function trackPageview(request, event, options = {}) {
  const { enabled, send } = settings(options);
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
  const sending = sendToLooku(payload, send);
  if (event?.waitUntil) {
    event.waitUntil(sending);
  }
  return sending;
}

// ---------- pages that do not exist ----------

// A page does not see the requested address the way the proxy does, so the
// proxy passes it on in this request header. The header carries an HMAC made
// with the site's signing key: a visitor can send the header too, on paths
// where the proxy does not run, but cannot make one that Looku would accept.
export const PATH_HEADER = 'x-looku-path';

/**
 * Headers for NextResponse.next() that pass the requested path on to the
 * catch-all page (see trackNotFound). A copy of the header sent by the
 * visitor is always replaced or removed.
 *
 *   export async function proxy(request, event) {
 *     trackPageview(request, event, lookuOptions);
 *     return NextResponse.next({ request: { headers: await lookuRequestHeaders(request, lookuOptions) } });
 *   }
 */
export async function lookuRequestHeaders(request, options = {}) {
  const headers = new Headers(request.headers);
  headers.delete(PATH_HEADER);
  const { enabled, send } = settings(options);
  if (!enabled || !send.signingKey) {
    return headers;
  }
  try {
    const path = new URL(request.url).pathname;
    headers.set(PATH_HEADER, `${await hmacHex(send.signingKey, `path:${path}`)}:${path}`);
  } catch {
    // A malformed request must not break the page.
  }
  return headers;
}

function sameText(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  let difference = 0;
  for (let i = 0; i < a.length; i += 1) {
    difference |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return difference === 0;
}

/**
 * Builds the not-found message from the request headers of the catch-all
 * page, or returns null when the header is missing or not made with the
 * signing key, or the request would not have been counted as a page view
 * (see buildPageview). Only the path, the time and the user agent are sent;
 * Looku uses the user agent to leave out bots and does not store it.
 */
export async function buildNotFound(headers, options = {}) {
  const { send } = settings(options);
  const value = String(headers.get(PATH_HEADER) || '');
  const split = value.indexOf(':');
  if (!send.signingKey || split < 0) {
    return null;
  }
  const path = value.slice(split + 1);
  if (
    !path.startsWith('/') ||
    !sameText(value.slice(0, split), await hmacHex(send.signingKey, `path:${path}`))
  ) {
    return null;
  }
  const pageview = buildPageview(
    { method: 'GET', url: `https://looku.invalid${path}`, headers },
    options
  );
  if (!pageview) {
    return null;
  }
  return { type: 'notfound', ts: pageview.ts, path: pageview.path, ua: pageview.ua };
}

/**
 * Tells Looku that the requested page does not exist, so its page views are
 * listed under missing pages instead of pages. Call it from a catch-all page,
 * app/[...missing]/page.js, which Next.js uses only for addresses that match
 * no other page, after the response (Next.js 15.1 or newer):
 *
 *   export default async function MissingPage() {
 *     const requestHeaders = await headers();
 *     after(() => trackNotFound(requestHeaders, lookuOptions));
 *     notFound();
 *   }
 *
 * Not from app/not-found.js: reading the headers there makes every page of the
 * site render for each request. Use the same options as in the proxy. Never
 * throws.
 */
export async function trackNotFound(headers, options = {}) {
  const { enabled, send } = settings(options);
  if (!enabled) {
    return false;
  }
  let payload;
  try {
    payload = await buildNotFound(headers, options);
  } catch {
    return false;
  }
  return payload ? sendToLooku(payload, send) : false;
}

/**
 * Recommended matcher. Next.js requires `config` to be a literal in the
 * proxy file, so copy this there instead of importing it. A dot is written
 * as [.] because it needs no escaping: a dot escaped with a single
 * backslash in a JavaScript string becomes a plain dot that matches any
 * character, and the pattern then excludes every page except the front page.
 */
export const RECOMMENDED_MATCHER = [
  {
    source: '/((?!api|_next/static|_next/image|.*[.]).*)',
    missing: [
      { type: 'header', key: 'next-router-prefetch' },
      { type: 'header', key: 'purpose', value: 'prefetch' },
      { type: 'header', key: 'sec-purpose', value: '(.*)prefetch(.*)' },
    ],
  },
];

const MAX_COLLECT_BYTES = 4096;
const EVENT_NAME_PATTERN = /^[a-z0-9_.-]{1,40}$/;

function cleanString(value, max) {
  return typeof value === 'string' ? value.slice(0, max) : undefined;
}

// Reads the body up to `max` bytes; returns null when it is longer.
async function readLimited(request, max) {
  if (!request.body) {
    return '';
  }
  const reader = request.body.getReader();
  const chunks = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > max) {
      await reader.cancel().catch(() => {});
      return null;
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

// Behind a proxy or in `next start`, request.url can name an internal host,
// so the Origin is compared with the Host the browser used.
function sameOrigin(request) {
  const site = request.headers.get('sec-fetch-site');
  if (site) {
    return site === 'same-origin';
  }
  const origin = request.headers.get('origin');
  const host =
    request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    new URL(request.url).host;
  try {
    return Boolean(origin) && new URL(origin).host === host.split(',')[0].trim();
  } catch {
    return false;
  }
}

/**
 * Builds the payload from a browser collector request, or returns null when
 * it is not accepted. Only known fields are passed on, and never the IP
 * address or user agent, so the data cannot be linked to a visitor.
 */
export function buildCollected(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return null;
  }
  const path = cleanString(data.path, 500);
  if (!path?.startsWith('/')) {
    return null;
  }
  if (data.type === 'engagement') {
    const dwell = Math.trunc(Number(data.dwell_ms));
    const scroll = Math.trunc(Number(data.max_scroll_pct));
    if (!(dwell >= 0) || !(scroll >= 0)) {
      return null;
    }
    return {
      type: 'engagement',
      source: 'client',
      path,
      dwell_ms: dwell,
      max_scroll_pct: Math.min(scroll, 100),
    };
  }
  if (data.type === 'event' && EVENT_NAME_PATTERN.test(String(data.name))) {
    const payload = { type: 'event', name: data.name, path };
    const target = cleanString(data.target, 200);
    if (target) payload.target = target;
    if (Number.isFinite(data.value)) payload.value = data.value;
    if (Array.isArray(data.items)) {
      payload.items = data.items.slice(0, 50).map((item) => ({
        sku: cleanString(item?.sku, 80),
        quantity: Math.trunc(Number(item?.quantity)),
      }));
    }
    if (
      data.props &&
      typeof data.props === 'object' &&
      !Array.isArray(data.props) &&
      JSON.stringify(data.props).length <= 1000
    ) {
      payload.props = data.props;
    }
    return payload;
  }
  return null;
}

/**
 * Route handler for the browser collector (@looku/browser). In
 * app/api/looku/route.js:
 *
 *   import { createCollectHandler } from "@looku/next";
 *   export const POST = createCollectHandler();
 *
 * Accepts same-origin requests only and answers 204 also when data is
 * dropped, so the page never sees an error.
 */
export function createCollectHandler(options = {}) {
  return async function POST(request) {
    const { enabled, send } = settings(options);
    if (!sameOrigin(request)) {
      return new Response(null, { status: 403 });
    }
    const userAgent = String(request.headers.get('user-agent') || '');
    const doNotTrack =
      (options.respectDoNotTrack ?? true) &&
      (request.headers.get('sec-gpc') === '1' || request.headers.get('dnt') === '1');
    if (!enabled || !userAgent || doNotTrack || BOT_USER_AGENT_PATTERN.test(userAgent)) {
      return new Response(null, { status: 204 });
    }
    if (Number(request.headers.get('content-length')) > MAX_COLLECT_BYTES) {
      return new Response(null, { status: 413 });
    }
    let payload;
    try {
      const text = await readLimited(request, MAX_COLLECT_BYTES);
      payload = text === null ? null : buildCollected(JSON.parse(text));
    } catch {
      payload = null;
    }
    if (payload) {
      await sendToLooku({ ...payload, ts: new Date().toISOString() }, send);
    }
    return new Response(null, { status: 204 });
  };
}

/**
 * Sends an order from the shop to Looku (POST /orders), for example from the
 * order system after payment (production only, like trackPageview). Send only the fields below: no names,
 * addresses or emails. Resending the same id replaces the order, and
 * { id, status: "cancelled" } removes it.
 *
 *   await sendOrder({ id: "1001", ts, total: 34.9, utm_campaign: "syksy",
 *     items: [{ sku: "MATO-250", name: "Kompostimadot", quantity: 2, price: 17.45 }] });
 */
export async function sendOrder(order, options = {}) {
  const { enabled, send } = settings(options);
  if (!enabled) {
    return false;
  }
  return sendToLooku(order, { ...send, path: '/orders' });
}
