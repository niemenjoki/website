import { getAllContent } from './getAllContent.mjs';

/**
 * Get all unique tags from all posts
 */
export function getAllPostTags() {
  const allPosts = getAllContent();
  const tagsSet = new Set();

  allPosts.forEach((post) => {
    post.tags.map((t) => t.trim()).forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}
