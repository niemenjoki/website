import { getAllContent } from './getAllContent.mjs';

const MAX_RECOMMENDATIONS = 2;
const MIN_COMMON_KEYWORDS = 3;

/**
 * Get an array of recommended posts based on keyword likeness
 */
export async function getPostRecommendations({ self, keywords }) {
  const targetKeywords = keywords.map((k) => k.trim().toLowerCase());

  const posts = getAllContent();

  const recommendations = posts
    .filter((post) => post.slug !== self)
    .map((post) => {
      const postKeywords = (post.keywords || []).map((k) => k.trim().toLowerCase());
      const commonKeywords = postKeywords.filter((k) =>
        targetKeywords.includes(k)
      ).length;

      return { ...post, commonKeywords };
    })
    .filter((post) => post.commonKeywords >= MIN_COMMON_KEYWORDS)
    .sort((a, b) => b.commonKeywords - a.commonKeywords)
    .slice(0, MAX_RECOMMENDATIONS);

  return recommendations;
}
