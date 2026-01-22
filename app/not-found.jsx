import ClientNotFoundPage from '@/components/NotFoundClient/NotFoundClient';
import { getAllContent } from '@/lib/content/index.mjs';

export const metadata = {
  title: 'Sivua ei löytynyt | Joonas Niemenjoki',
  description: 'Hakemaasi sivua ei löytynyt. Palaa etusivulle tai selaa blogia.',
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const posts = getAllContent();

  return <ClientNotFoundPage content={[...posts]} />;
}
