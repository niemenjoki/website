import { withDefaultMetadata } from '@/lib/metadata/withDefaultMetadata';

export default function generateMetadata() {
  const title = 'RAU-työkalut | Joonas Niemenjoki';
  const description =
    'RAU-työkalujen koontisivu, josta löytyvät rakennusautomaation apuvälineet eri käyttötarkoituksiin.';
  const canonicalUrl = '/projektit/rau-tyokalut';

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
