import { createContentPageMetadata } from '../../../../lib/metadata/routeMetadata.js';

export default async function generateMetadata({ params }) {
  const { slug } = await params;

  return createContentPageMetadata(slug);
}
