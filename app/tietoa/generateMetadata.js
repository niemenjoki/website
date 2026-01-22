import { withDefaultMetadata } from '@/lib/metadata/withDefaultMetadata';

export default function generateMetadata() {
  const title = 'Tietoa | Joonas Niemenjoki';
  const description =
    'Kirjoitan käytännön kokemuksiin perustuvia havaintoja ja vinkkejä rakennusautomaatiosta ja sitä sivuavista aiheista.';
  const canonicalUrl = '/tietoa';

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
