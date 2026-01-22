import { getAllContent } from './getAllContent.mjs';

/**
 * Get posts for a specific tag with pagination
 */
export function getPostsByTag(tag, pageIndex, postsPerPage) {
  const allPosts = getAllContent();

  const postsForTag = allPosts.filter((post) => {
    const tags = post.tags.map((t) => t.trim().toLowerCase().replaceAll(' ', '-'));
    return tags.includes(tag.toLowerCase());
  });

  const numPages = Math.ceil(postsForTag.length / postsPerPage);
  const pageIdx = pageIndex - 1;
  const pagePosts = postsForTag.slice(
    pageIdx * postsPerPage,
    (pageIdx + 1) * postsPerPage
  );

  return { posts: pagePosts, numPages, total: postsForTag.length };
}
