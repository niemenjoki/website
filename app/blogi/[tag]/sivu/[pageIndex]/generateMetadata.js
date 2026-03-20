import { createBlogTagPageMetadata } from '../../../../../lib/metadata/routeMetadata.js';

export default async function generateMetadata({ params }) {
  const { tag, pageIndex } = await params;

  return createBlogTagPageMetadata({ tag, pageIndex });
}
