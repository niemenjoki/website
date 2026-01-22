import { withDefaultMetadata } from '@/lib/metadata/withDefaultMetadata';

export default function generateMetadata() {
  const title = 'Lieromaa-projekti | Joonas Niemenjoki';
  const description =
    'Lieromaa on sivuprojektini, joka keskittyy vermikompostointiin, kompostimatoihin ja käytännönläheiseen kestävään arkeen.';
  const canonicalUrl = '/projektit/lieromaa';

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
