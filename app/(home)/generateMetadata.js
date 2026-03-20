import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import { homePage } from '@/lib/site/pageRecords.mjs';

export default function generateMetadata() {
  return createPageMetadata(homePage.metadata);
}
