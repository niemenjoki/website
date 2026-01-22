import { withDefaultMetadata } from '@/lib/metadata/withDefaultMetadata';

export default function generateMetadata() {
  const title = 'compress-create-react-app | Joonas Niemenjoki';
  const description =
    'compress-create-react-app on React-kehittäjille tarkoitettu apuohjelma, joka helpottaa verkkosivujen tiedostojen pakkaamista Create React App -ympäristössä.';
  const canonicalUrl = '/projektit/compress-create-react-app';

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
