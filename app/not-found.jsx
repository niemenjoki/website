import ClientNotFoundPage from '@/components/NotFoundClient/NotFoundClient';
import { getAllContent } from '@/lib/content/index.mjs';
import { getSearchableSitePages } from '@/lib/siteStructure.mjs';

import { notFoundPageMetadata } from '../lib/metadata/routeMetadata.js';

export const metadata = notFoundPageMetadata;

export default async function NotFound() {
  const posts = getAllContent();
  const sitePages = getSearchableSitePages({ context: 'notFound' });

  return <ClientNotFoundPage content={[...sitePages, ...posts]} />;
}
