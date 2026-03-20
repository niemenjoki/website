import { getAllContent } from './getAllContent.mjs';
import { slugifyTag } from './getCollectionPageData.mjs';

/**
 * Get posts for a specific tag with pagination
 */
export function getPostsByTag(tag, pageIndex, postsPerPage) {
  const allPosts = getAllContent();

  const postsForTag = allPosts.filter((post) => {
    const tags = post.tags.map((postTag) => slugifyTag(postTag));
    return tags.includes(slugifyTag(tag));
  });

  const numPages = Math.ceil(postsForTag.length / postsPerPage);
  const pageIdx = pageIndex - 1;
  const pagePosts = postsForTag.slice(
    pageIdx * postsPerPage,
    (pageIdx + 1) * postsPerPage
  );

  return { posts: pagePosts, numPages, total: postsForTag.length };
}
