import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import { rauToolsModbusDevicesPage } from '@/lib/site/pageRecords.mjs';

export default function generateMetadata() {
  return createPageMetadata(rauToolsModbusDevicesPage.metadata);
}
