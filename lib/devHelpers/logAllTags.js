const fs = require('fs');
const path = require('path');

const slugs = fs
  .readdirSync('posts')
  .filter(
    (f) => !f.startsWith('draft') && fs.statSync(path.join('posts', f)).isDirectory()
  )
  .map((f) => f);

const tags = [];
const keywords = [];

slugs.forEach((slug) => {
  const postDataRaw = fs.readFileSync(`posts/${slug}/data.json`, 'utf-8');
  const postData = JSON.parse(postDataRaw);
  postData.tags.forEach((tag) => {
    tags.push(tag);
  });
  postData.keywords.forEach((keyword) => {
    keywords.push(keyword);
  });
});

const uniqueTags = [...new Set(tags)].sort();
const uniqueKeywords = [...new Set(keywords)].sort();

console.log({ uniqueTags, uniqueKeywords });
