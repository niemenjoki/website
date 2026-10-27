import { getAllContentSlugs } from '@/lib/content/index.mjs';
import { renderPostImage } from '@/lib/metadata/postImage';

export const alt = 'Blogijulkaisun otsikkokuva';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getAllContentSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  return renderPostImage(slug);
}
