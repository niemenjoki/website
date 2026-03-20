import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import { lieromaaProjectPage } from '@/lib/site/pageRecords.mjs';

export default function generateMetadata() {
  return createPageMetadata(lieromaaProjectPage.metadata);
}
