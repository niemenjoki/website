import { withDefaultMetadata } from '@/lib/metadata/withDefaultMetadata';

export default function generateMetadata() {
  const title = 'ST-muuttujat-työkalu | RAU-työkalut | Joonas Niemenjoki';
  const description =
    'RAU-työkalu, joka muuntaa koodin kopioitavaksi muuttujalistaksi ja tekee tyyppipäättelyn automaattisesti etuliitteiden perusteella.';
  const canonicalUrl = '/projektit/rau-tyokalut/st-muuttujat';

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
