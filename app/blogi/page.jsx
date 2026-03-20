import { renderBlogCollectionPage } from './sivu/[pageIndex]/page';

export { default as generateMetadata } from '../blogi/sivu/[pageIndex]/generateMetadata';

export default async function BlogRoot() {
  return renderBlogCollectionPage({ pageIndex: '1' });
}
