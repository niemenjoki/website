import { renderBlogCollectionPage } from '../blogi/sivu/[pageIndex]/page';

export { default as generateMetadata } from './generateMetadata';

export default async function BlogRoot() {
  return renderBlogCollectionPage({
    pageIndex: '1',
    baseCanonicalUrl: '/',
  });
}
