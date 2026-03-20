import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import { rauToolsAlarmPage } from '@/lib/site/pageRecords.mjs';

export default function generateMetadata() {
  return createPageMetadata(rauToolsAlarmPage.metadata);
}
