import { withDefaultMetadata } from '@/lib/metadata/withDefaultMetadata';

export default function generateMetadata() {
  const title = 'Hälysivu-työkalu | RAU-työkalut | Joonas Niemenjoki';
  const description =
    'RAU-työkalu, joka muuntaa FX-Editorista kopioidun pistetietokannan helposti kopioitavaksi HTML-koodiksi hälytysivua varten.';
  const canonicalUrl = '/projektit/rau-tyokalut/halysivu';

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
