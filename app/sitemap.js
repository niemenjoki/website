import path from 'path';

import safeLinks from '@/data/generated/safeRoutes.json';
import { getAllContent, getAllPostTags, getPostsByTag } from '@/lib/content/index.mjs';
import { getStaticAppRoutes } from '@/lib/routes/getStaticAppRoutes.mjs';

import { POSTS_PER_PAGE, SITE_URL } from '../data/vars.mjs';

const APP_DIR = path.join(process.cwd(), 'app');

const toISODate = (d) => new Date(d).toISOString().split('T')[0];
const slugify = (s) => s.replaceAll(' ', '-').trim().toLowerCase();

export const revalidate = 3600;

export default async function sitemap() {
  const urls = [];
  const posts = getAllContent();
  const postTags = getAllPostTags();
  const staticPages = getStaticAppRoutes(APP_DIR);

  const latestPost = posts.reduce((latest, post) => {
    const d = new Date(post.updated || post.date);
    return d > latest ? d : latest;
  }, new Date(0));

  const add = (url, lastmod) => {
    urls.push({ url: `${SITE_URL}${url}`, lastModified: toISODate(lastmod) });
  };

  const staticLastModified = (route, fallback) => {
    if (route === '/' || route === '/blogi') return latestPost;
    if (route === '/tietoa') return '2025-09-08';
    return fallback ?? latestPost;
  };

  // --- Static pages
  staticPages.forEach(({ route, lastModified }) =>
    add(route, staticLastModified(route, lastModified))
  );

  // --- Tag pages
  for (const tag of postTags) {
    const slug = slugify(tag);
    const { numPages } = getPostsByTag(slug, 1, POSTS_PER_PAGE);
    for (let i = 1; i <= numPages; i++) add(`/blogi/${slug}/sivu/${i}`, latestPost);
  }

  // --- Blog posts
  posts.forEach((p) => add(`/blogi/julkaisu/${p.slug}`, p.updated || p.date));

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
