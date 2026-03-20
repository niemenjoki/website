import ClientNotFoundPage from '@/components/NotFoundClient/NotFoundClient';
import { getAllContent } from '@/lib/content/index.mjs';
import { getSearchableSitePages } from '@/lib/siteStructure.mjs';

export const metadata = {
  title: 'Hakemaasi sivua ei löytynyt | Joonas Niemenjoki blogi',
  description:
    'Hakemaasi sivua ei löytynyt tältä sivustolta. Palaa etusivulle tai selaa blogin julkaisuja ja projektisivuja löytääksesi etsimäsi sisällön.',
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const posts = getAllContent();
  const sitePages = getSearchableSitePages({ context: 'notFound' });

  return <ClientNotFoundPage content={[...sitePages, ...posts]} />;
}
