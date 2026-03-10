import { withDefaultMetadata } from '@/lib/metadata/withDefaultMetadata';

export default function generateMetadata() {
  const title = 'ST-muuttujat | RAU-työkalut | Joonas Niemenjoki';
  const description =
    'RAU-työkalu, joka muuntaa IEC ST -koodin kopioitavaksi muuttujalistaksi prefixipohjaisella tyyppipäättelyllä.';
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
