import BlogPage from './sivu/[pageIndex]/page';

export { default as generateMetadata } from '../blogi/sivu/[pageIndex]/generateMetadata';

export default async function BlogRoot() {
  return await BlogPage({ params: { pageIndex: '1' } });
}
