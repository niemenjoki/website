import { withDefaultMetadata } from '@/lib/metadata/withDefaultMetadata';

export default function generateMetadata() {
  const title = 'Tietosuojaseloste | Joonas Niemenjoki';
  const description =
    'Lue, miten sivusto käsittelee henkilötietoja ja käyttää evästeitä. Sivulla kerrotaan tietosuojaperiaatteet ja käyttäjän oikeudet.';
  const canonicalUrl = '/tietosuoja';

  const customMetadata = {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: { title, description, url: canonicalUrl },
    twitter: { title, description },
  };

  return withDefaultMetadata(customMetadata);
}
