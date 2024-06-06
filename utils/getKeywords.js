const fs = require('fs').promises;
const extractFrontMatter = require('./extractFrontMatter.js');

(async () => {
  for (let lang of ['fi', 'en']) {
    const posts = await fs.readdir('posts/' + lang);
    const keywords = await Promise.all(
      posts.map(async (postSlug) => {
        const rawPost = await fs.readFile(
          'posts/' + lang + '/' + postSlug,
          'utf-8'
        );
        const { data } = extractFrontMatter(rawPost);
        return data.keywords.split(',').map((kw) => kw.trim().toLowerCase());
      })
    );

    const uniqueKeywords = [...new Set(keywords.flat())].sort();
    console.log(uniqueKeywords.join('\n'));
    if (lang === 'fi') console.log('\n-------------------------\n');
  }
})();
