import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import { privacyPolicyPage } from '@/lib/site/pageRecords.mjs';

export default function generateMetadata() {
  return createPageMetadata(privacyPolicyPage.metadata);
}
