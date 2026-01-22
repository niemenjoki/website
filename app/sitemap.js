import safeLinks from '@/data/generated/safeRoutes.json';
import { getAllContent, getAllPostTags, getPostsByTag } from '@/lib/content/index.mjs';

import { POSTS_PER_PAGE, SITE_URL } from '../data/vars.mjs';

const toISODate = (d) => new Date(d).toISOString().split('T')[0];
const slugify = (s) => s.replaceAll(' ', '-').trim().toLowerCase();

export const revalidate = 3600;

export default async function sitemap() {
  const urls = [];
  const posts = getAllContent();
  const postTags = getAllPostTags();

  const latest = (arr, field) =>
    arr.reduce((latest, item) => {
      const d = new Date(item[field]);
      return d > latest ? d : latest;
    }, new Date(0));

  const latestPost = latest(posts, 'date');

  const add = (url, lastmod) => {
    urls.push({ url: `${SITE_URL}${url}`, lastModified: toISODate(lastmod) });
  };
  // --- Static pages
  [
    ['/', latestPost],
    ['/blogi', latestPost],
    ['/tietoa', '2025-09-08'],
  ].forEach(([url, lastmod]) => add(url, lastmod));

  // --- Tag pages
  for (const tag of postTags) {
    const slug = slugify(tag);
    const { numPages } = getPostsByTag(slug, 1, POSTS_PER_PAGE);
    for (let i = 1; i <= numPages; i++) add(`/blogi/${slug}/sivu/${i}`, latestPost);
  }

  // --- Blog posts
  posts.forEach((p) => add(`/blogi/julkaisu/${p.slug}`, p.date));

  // --- Paginated blog index
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  for (let i = 2; i <= totalPages; i++) add(`/blogi/sivu/${i}`, latestPost);

  // --- Validate paths
  urls.forEach(({ url }) => {
    const path = url.replace(SITE_URL, '');
    if (!safeLinks.includes(path)) {
      throw new Error(`Invalid url defined in sitemap: "${path}"`);
    }
  });

  return urls.sort((a, b) => a.url.localeCompare(b.url, 'fi'));
}
