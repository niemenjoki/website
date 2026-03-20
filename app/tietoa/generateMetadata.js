import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import { aboutPage } from '@/lib/site/pageRecords.mjs';

export default function generateMetadata() {
  return createPageMetadata(aboutPage.metadata);
}
