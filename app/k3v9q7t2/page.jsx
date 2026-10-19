import fs from 'fs';
import path from 'path';

import CompressorRotationDemo from '@/components/CompressorRotationDemo/CompressorRotationDemo';
import InfoBox from '@/components/InfoBox/InfoBox';
import MdxArticlePage from '@/components/MdxArticlePage/MdxArticlePage';
import PasswordGate from '@/components/PasswordGate/PasswordGate';
import SafeImage from '@/components/SafeImage/SafeImage';
import SafeLink from '@/components/SafeLink/SafeLink';
import rehypeHeadingIds from '@/lib/mdx/rehypeHeadingIds.mjs';

// Piilotettu luonnos kommentoitavaksi ennen julkaisua. Ei listauksissa eikä sivukartassa.
const DRAFT_DIR = path.join(
  process.cwd(),
  'content',
  'luonnokset',
  'lampopumppujen-kompressorien-vuorottelu'
);

const draftData = JSON.parse(fs.readFileSync(path.join(DRAFT_DIR, 'data.json'), 'utf-8'));

export const metadata = {
  title: draftData.title,
  robots: { index: false, follow: false, nocache: true },
};

export default function DraftPage() {
  const source = fs.readFileSync(path.join(DRAFT_DIR, 'content.mdx'), 'utf-8');

  return (
    <PasswordGate password="24680">
      <MdxArticlePage
        title={draftData.title}
        dateContent="Luonnos, ei vielä julkaistu"
        source={source}
        components={{ SafeLink, SafeImage, InfoBox, CompressorRotationDemo }}
        mdxOptions={{ mdxOptions: { rehypePlugins: [rehypeHeadingIds] } }}
      />
    </PasswordGate>
  );
}
