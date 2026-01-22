import { getContentMetadata } from '@/lib/content/index.mjs';
import { withDefaultMetadata } from '@/lib/metadata/withDefaultMetadata';

export default async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = getContentMetadata({ slug });

  const title = data.title || '';
  const description = data.description || '';
  const url = `/blogi/julkaisu/${slug}`;
  const image = data.image || {
    url: '/images/portrait2024.avif',
    width: 1024,
    height: 1024,
    alt: 'Kasvokuva Joonas Niemenjoesta',
  };

  const customMetadata = {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      images: [image],
    },
    twitter: {
      title,
      description,
      images: [image.url],
    },
  };

  return withDefaultMetadata(customMetadata);
}
