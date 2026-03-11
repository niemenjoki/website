import { NextResponse } from 'next/server';

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
  const decodedPathname = decodeURIComponent(pathname);

  if (decodedPathname.length > 1 && decodedPathname.endsWith('/')) {
    return decodedPathname.slice(0, -1);
  }

  return decodedPathname;
}

export function middleware(request) {
  const pathname = normalizePathname(request.nextUrl.pathname);

  if (!GONE_PATHS.has(pathname)) {
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

export const config = {
  matcher: ['/blog/:path*', '/blogi/:path*', '/projects/:path*'],
};
