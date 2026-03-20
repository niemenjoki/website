import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import { rauToolsStVariablesPage } from '@/lib/site/pageRecords.mjs';

export default function generateMetadata() {
  return createPageMetadata(rauToolsStVariablesPage.metadata);
}
