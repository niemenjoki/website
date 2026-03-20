import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import { rauToolsPage } from '@/lib/site/pageRecords.mjs';

export default function generateMetadata() {
  return createPageMetadata(rauToolsPage.metadata);
}
