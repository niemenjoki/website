import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import { compressCreateReactAppPage } from '@/lib/site/pageRecords.mjs';

export default function generateMetadata() {
  return createPageMetadata(compressCreateReactAppPage.metadata);
}
