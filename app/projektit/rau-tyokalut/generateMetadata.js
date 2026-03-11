import { withDefaultMetadata } from '@/lib/metadata/withDefaultMetadata';

export default function generateMetadata() {
  const title = 'RAU-työkalut rakennusautomaatioon | Joonas Niemenjoki';
  const description =
    'RAU-työkalujen koontisivu, josta löytyvät rakennusautomaation käytännölliset aputyökalut eri käyttötarkoituksiin ja työvaiheisiin.';
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
