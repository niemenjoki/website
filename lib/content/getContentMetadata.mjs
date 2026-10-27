import fs from 'fs';
import path from 'path';

import { CONTENT_TYPES, SITE_URL } from '../../data/site/constants.mjs';
import { createContentStructuredData } from '../structuredData/createContentStructuredData.mjs';

const CONTENT_PATH = path.join(process.cwd(), 'content', 'posts');
const METADATA_FILE_NAMES = ['meta.json', 'data.json'];

function findMetadataPath(contentDir) {
  return METADATA_FILE_NAMES.map((fileName) => path.join(contentDir, fileName)).find(
    (file) => fs.existsSync(file)
  );
}

/**
 * Get metadata for a single piece of content
 */
export function getContentMetadata({ slug }) {
  const contentDir = path.join(CONTENT_PATH, slug);
  const metadataPath = findMetadataPath(contentDir);

  if (!metadataPath) {
    throw new Error(`No data.json or meta.json found for content: ${slug}`);
  }

  let metadata;
  try {
    const raw = fs.readFileSync(metadataPath, 'utf-8');
    metadata = JSON.parse(raw);
  } catch (err) {
    throw new Error(
      `Failed to parse ${path.basename(metadataPath)} for content: ${slug} - ${err.message}`
    );
  }

  const publishedAt = metadata.publishedAt ?? metadata.date;
  const updatedAt = metadata.updatedAt ?? metadata.updated ?? publishedAt;
  const image = metadata.image ?? null;
  // Without a custom image, opengraph-image.jsx generates the preview image for the post.
  const metadataImage = image ?? {
    url: `/blogi/julkaisu/${slug}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: metadata.title,
  };

  const contentMetadata = {
    ...metadata,
    type: CONTENT_TYPES.POST,
    slug,
    canonicalUrl: metadata.canonicalUrl ?? `/blogi/julkaisu/${slug}`,
    pageUrl: `${SITE_URL}${metadata.canonicalUrl ?? `/blogi/julkaisu/${slug}`}`,
    date: publishedAt,
    publishedAt,
    updated: metadata.updatedAt ?? metadata.updated,
    updatedAt,
    image,
    metadataImage,
  };

  return {
    ...contentMetadata,
    structuredData: createContentStructuredData({
      slug,
      content: contentMetadata,
    }),
  };
}
