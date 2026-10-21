import { notFound } from 'next/navigation';

import { createContentPageMetadata } from '../../../../lib/metadata/routeMetadata.js';

export default async function generateMetadata({ params }) {
  const { slug } = await params;

  // Unknown slugs must return 404 like the page itself. Next.js 16 reports a metadata error as 500.
  try {
    return createContentPageMetadata(slug);
  } catch {
    notFound();
  }
}
