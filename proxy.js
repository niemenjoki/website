import { NextResponse } from 'next/server';

import { lookuRequestHeaders, trackPageview } from '@/lib/looku/next.js';
import { LOOKU_OPTIONS } from '@/lib/looku/options.js';

const GONE_PATHS = new Set([
  '/blogi/infrastruktuuri/sivu/1',
  '/blogi/julkaisu/onko-5g-vaarallista',
  '/blogi/julkaisu/mika-on-ihmissilman-resoluutio',
  '/blog/post/raspberry-pi-default-username-password-no-longer-work',
  '/blog/infrastruktuuri/page/1',
  '/blog/post/how-did-people-synchronize-time-in-past',
  '/blog/post/how-to-generate-rss-feed-nextjs',
  '/blogi/julkaisu/miten-1G-2G-3G-4G-5G-eroavat',
  '/blogi/tekniikka/sivu/1',
  '/blogi/javascript/sivu/1',
  '/blogi/maallikonkielellä/sivu/1',
  '/blogi/julkaisu/miten-fyysikot-muistavat-kaavat-lait',
  '/blogi/julkaisu/oikea-tapa-oppia-javascript-miten-missa',
  '/blogi/oppiminen/sivu/1',
  '/projects/LICENSE.md',
  '/blog/page/[pageIndex]',
]);

function normalizePathname(pathname) {
  let decodedPathname;
  try {
    decodedPathname = decodeURIComponent(pathname);
  } catch {
    // The proxy now runs on every page, so a malformed address must not cause an error page.
    return pathname;
  }

  if (decodedPathname.length > 1 && decodedPathname.endsWith('/')) {
    return decodedPathname.slice(0, -1);
  }

  return decodedPathname;
}

// Page views are recorded on the server with Looku, and nothing is stored in visitors' browsers. The address goes on to
// the not-found page in a signed request header, so it can tell Looku that the page does not exist.
export async function proxy(request, event) {
  const pathname = normalizePathname(request.nextUrl.pathname);

  if (!GONE_PATHS.has(pathname)) {
    trackPageview(request, event, LOOKU_OPTIONS);
    return NextResponse.next({
      request: { headers: await lookuRequestHeaders(request, LOOKU_OPTIONS) },
    });
  }

  return new NextResponse('Gone', {
    status: 410,
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex',
    },
  });
}

// The first entry is Looku's recommended matcher: pages only, without prefetches and files. The other entries keep the
// removed addresses answering 410, including /projects/LICENSE.md, which the first entry skips because of its extension.
// Every entry leaves prefetches out: Next.js removes the prefetch headers before the proxy runs, so without this each
// link that the browser loads in advance would be counted as a page view. Next.js reads the config as a literal, so the
// list is repeated.
export const config = {
  matcher: [
    {
      // A character class matches the dot without escaping.
      source: '/((?!api|_next/static|_next/image|.*[.]).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
        { type: 'header', key: 'sec-purpose', value: '(.*)prefetch(.*)' },
      ],
    },
    {
      source: '/blog/:path*',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
        { type: 'header', key: 'sec-purpose', value: '(.*)prefetch(.*)' },
      ],
    },
    {
      source: '/blogi/:path*',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
        { type: 'header', key: 'sec-purpose', value: '(.*)prefetch(.*)' },
      ],
    },
    {
      source: '/projects/:path*',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
        { type: 'header', key: 'sec-purpose', value: '(.*)prefetch(.*)' },
      ],
    },
  ],
};
