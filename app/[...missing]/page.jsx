import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { after } from 'next/server';

import { trackNotFound } from '@/lib/looku/next.js';
import { LOOKU_OPTIONS } from '@/lib/looku/options.js';

// Addresses that match no page end up here and get the site's own not-found page (app/not-found.jsx).
export const metadata = {
  robots: { index: false, follow: false },
};

export default async function MissingPage() {
  // Looku lists the address under missing pages instead of pages. This route is
  // rendered for each request anyway, so reading the headers costs nothing here.
  const requestHeaders = await headers();
  after(() => trackNotFound(requestHeaders, LOOKU_OPTIONS));
  notFound();
}
