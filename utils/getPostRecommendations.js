const fs = require('fs').promises;
const extractFrontMatter = require('../utils/extractFrontMatter.js');
const MAX_RECOMMENDATIONS = 2;
const MIN_COMMON_KEYWORDS = 3;

const getPostRecommendations = async ({ self, keywords, lang }) => {
  const posts = await fs.readdir('posts/' + lang);
  const postsWithKeywords = await Promise.all(
    posts.map(async (postSlug) => {
      const rawPost = await fs.readFile(
        'posts/' + lang + '/' + postSlug,
        'utf-8'
      );
      const { data } = extractFrontMatter(rawPost);

      const post = {
        ...data,
        slug: postSlug.replace('.md', ''),
      };
      return post;
    })
  );

  const recommendations = postsWithKeywords
    .filter((post) => post.slug !== self)
    .map((post) => ({
      ...post,
      commonKeywords: post.keywords
        .split(',')
        .filter((keyword) => keywords.split(',').includes(keyword)).length,
    }))
    .filter((post) => post.commonKeywords >= MIN_COMMON_KEYWORDS)
    .sort((a, b) => b.commonKeywords - a.commonKeywords)
    .slice(0, MAX_RECOMMENDATIONS);

  return recommendations;
};

module.exports = getPostRecommendations;
