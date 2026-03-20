import { createBlogPageMetadata } from '../../../../lib/metadata/routeMetadata.js';

export default async function generateMetadata({ params }) {
  const { pageIndex } = await params;

  return createBlogPageMetadata(pageIndex);
}
