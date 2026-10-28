import fs from 'fs';
import path from 'path';

const POSTS_PATH = path.join('content', 'posts');

const slugs = fs
  .readdirSync(POSTS_PATH)
  .filter((f) => fs.statSync(path.join(POSTS_PATH, f)).isDirectory());

const tags = [];
const keywords = [];

slugs.forEach((slug) => {
  const postDataRaw = fs.readFileSync(path.join(POSTS_PATH, slug, 'data.json'), 'utf-8');
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
