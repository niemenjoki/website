import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import { rauToolsModbusInterfacePage } from '@/lib/site/pageRecords.mjs';

export default function generateMetadata() {
  return createPageMetadata(rauToolsModbusInterfacePage.metadata);
}
