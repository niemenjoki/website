import { withDefaultMetadata } from '@/lib/metadata/withDefaultMetadata';

export default function generateMetadata() {
  const title = 'Hälytystyökalu hälytyssivulle | RAU-työkalut | Joonas';
  const description =
    'Muuntaa FX-Editorista kopioidut pisteet hälytyssivun grafiikkakuvaksi ja generoi IEC koodin samassa muodossa kuin FX-Editorin template manager.';
  const canonicalUrl = '/projektit/rau-tyokalut/halytystyokalu';

  const customMetadata = {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };

  return withDefaultMetadata(customMetadata);
}
