import { getContentMetadata } from '@/lib/content/index.mjs';
import { createPageMetadata } from '@/lib/metadata/createPageMetadata';

export default async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = getContentMetadata({ slug });

  return createPageMetadata({
    title: data.title,
    description: data.description,
    canonicalUrl: data.canonicalUrl,
    image: data.metadataImage,
    openGraph: {
      type: 'article',
      url: data.canonicalUrl,
    },
    twitter: {
      images: [data.metadataImage.url],
    },
  });
}
