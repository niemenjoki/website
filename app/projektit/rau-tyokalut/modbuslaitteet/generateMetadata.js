import { withDefaultMetadata } from '@/lib/metadata/withDefaultMetadata';

export default function generateMetadata() {
  const title = 'Modbus-laitteet | RAU-työkalut | Joonas Niemenjoki';
  const description =
    'RAU-työkalu, joka muodostaa Modbus-funktiolohkosta kaikki ja tarvittavat Modbus-laitelistat sekä FX-Editor XML:n.';
  const canonicalUrl = '/projektit/rau-tyokalut/modbuslaitteet';

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
