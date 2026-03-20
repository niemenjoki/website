import { withDefaultMetadata } from './withDefaultMetadata';

export function createPageMetadata({
  title,
  description,
  canonicalUrl,
  image,
  openGraph = {},
  twitter,
}) {
  const customMetadata = {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      ...(image ? { images: [image] } : {}),
      ...openGraph,
    },
  };

  if (image || twitter) {
    customMetadata.twitter = {
      title,
      description,
      ...(image ? { images: [image.url] } : {}),
      ...twitter,
    };
  }

  return withDefaultMetadata(customMetadata);
}
