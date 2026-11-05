import { NextResponse } from 'next/server';

import {
  ANALYTICS_OPT_OUT_COOKIE,
  ANALYTICS_OPT_OUT_PATH,
} from '@/lib/analytics/optOut.js';
import { trackPageview } from '@/lib/looku/next.js';

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

// Page views are recorded on the server with Looku, and nothing is stored in visitors' browsers. The receiver address and
// keys come from the environment variables LOOKU_ENDPOINT, LOOKU_SITE_ID and LOOKU_SIGNING_KEY. Only production sends
// data. The owner's browser is left out with the opt-out cookie.
const LOOKU_OPTIONS = {
  excludePaths: ['/k3v9q7t2', ANALYTICS_OPT_OUT_PATH],
  optOutCookie: ANALYTICS_OPT_OUT_COOKIE,
};

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

export function proxy(request, event) {
  const pathname = normalizePathname(request.nextUrl.pathname);

  if (!GONE_PATHS.has(pathname)) {
    trackPageview(request, event, LOOKU_OPTIONS);
    return NextResponse.next();
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
    '/blog/:path*',
    '/blogi/:path*',
    '/projects/:path*',
  ],
};
