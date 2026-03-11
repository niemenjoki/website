import ClientNotFoundPage from '@/components/NotFoundClient/NotFoundClient';
import { getAllContent } from '@/lib/content/index.mjs';

export const metadata = {
  title: 'Hakemaasi sivua ei löytynyt | Joonas Niemenjoki blogi',
  description:
    'Hakemaasi sivua ei löytynyt tältä sivustolta. Palaa etusivulle tai selaa blogin julkaisuja ja projektisivuja löytääksesi etsimäsi sisällön.',
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const posts = getAllContent();

  return <ClientNotFoundPage content={[...posts]} />;
}
