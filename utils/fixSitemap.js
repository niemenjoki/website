const fs = require('fs');
const path = require('path');
const extractFrontMatter = require('./extractFrontMatter');

const sitemap = fs.readFileSync(path.join('public', 'sitemap.xml'), 'utf-8');
const lines = sitemap.split('\n');

const englishFilepaths = fs
  .readdirSync(path.join('posts', 'en'))
  .filter((filename) => filename.substring(0, 5) !== 'draft')
  .map((filename) => path.join('posts', 'en', filename));
const finnishFilepaths = fs
  .readdirSync(path.join('posts', 'fi'))
  .filter((filename) => filename.substring(0, 5) !== 'draft')
  .map((filename) => path.join('posts', 'fi', filename));

const filepaths = finnishFilepaths.concat(englishFilepaths);
const dates = filepaths.map((filepath) => {
  const post = fs.readFileSync(filepath, 'utf-8');
  const { data } = extractFrontMatter(post);
  return new Date(data.date);
});

const lastBlogpostDate = new Date(Math.max(...dates)).toISOString();

const updatedLines = lines.map((line, i) => {
  const isFinnishPost = line.includes('/blogi/julkaisu/');
  const isEnglishPost = line.includes('/blog/post/');
  const isPost = isEnglishPost || isFinnishPost;
  const isLandingPage = [
    '.fi</loc>',
    '.fi/en</loc>',
    '.fi/blogi</loc>',
    '.fi/blog</loc>',
    '.fi/blog</loc>',
    '/sivu/',
    '/page/',
  ].some((subStr) => line.includes(subStr));

  if (isPost) {
    let slugStart;
    if (isEnglishPost) slugStart = line.indexOf('/blog/post/') + 11;
    if (isFinnishPost) slugStart = line.indexOf('/blogi/julkaisu/') + 16;
    const slugEnd = line.indexOf('</loc>');
    const slug = line.slice(slugStart, slugEnd);

    const dateStart = line.indexOf('<lastmod>') + 9;
    const dateEnd = line.indexOf('</lastmod>');
    const wrongDate = line.slice(dateStart, dateEnd);

    const post = fs.readFileSync(
      path.join('posts', isFinnishPost ? 'fi' : 'en', slug + '.md'),
      'utf-8'
    );
    const { data } = extractFrontMatter(post);
    const realDate = new Date(data.date).toISOString();
    return line.replace(wrongDate, realDate).replace('monthly', 'yearly');
  }

  if (isLandingPage) {
    const dateStart = line.indexOf('<lastmod>') + 9;
    const dateEnd = line.indexOf('</lastmod>');
    const wrongDate = line.slice(dateStart, dateEnd);

    return line
      .replace(wrongDate, lastBlogpostDate)
      .replace('<priority>0.7', '<priority>1.0');
  }

  return line
    .replace('<priority>0.7', '<priority>0.5')
    .replace('monthly', 'yearly');
});

const updatedSitemap = updatedLines.join('\n');
fs.writeFileSync(path.join('public', 'sitemap.xml'), updatedSitemap);
