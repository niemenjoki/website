import { getAllContentSlugs } from './getAllContentSlugs.mjs';
import { getContentMetadata } from './getContentMetadata.mjs';

/**
 * Get all content by type with metadata (excluding drafts)
 */
export function getAllContent() {
  const slugs = getAllContentSlugs();
  const content = slugs
    .map((slug) => getContentMetadata({ slug }))
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
  return content;
}
