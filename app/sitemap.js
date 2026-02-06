import fs from 'fs';
import path from 'path';

import safeLinks from '@/data/generated/safeRoutes.json';
import { getAllContent, getAllPostTags, getPostsByTag } from '@/lib/content/index.mjs';

import { POSTS_PER_PAGE, SITE_URL } from '../data/vars.mjs';

const APP_DIR = path.join(process.cwd(), 'app');

const toISODate = (d) => new Date(d).toISOString().split('T')[0];
const slugify = (s) => s.replaceAll(' ', '-').trim().toLowerCase();

const isPageFile = (name) => name === 'page.jsx';
const isDynamicRoute = (route) => /\[[^/]+\]/.test(route);

const toRoute = (fullPath) => {
  let route = fullPath.replace(APP_DIR, '').replace(/[/\\]page\.jsx$/, '');
  route = route.replace(/\\/g, '/');
  route = route.replace(/\/\([^/]+\)/g, '');
  route = route.replace(/\/@[^/]+/g, '');
  route = path.posix.normalize(route);
  if (route === '' || route === '.') route = '/';
  if (route !== '/' && route.endsWith('/')) route = route.slice(0, -1);
  return route;
};

const getStaticPages = () => {
  const pages = [];

  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name.startsWith('@')) continue;
        walk(full);
        continue;
      }

      if (!isPageFile(entry.name)) continue;

      const route = toRoute(full);
      if (isDynamicRoute(route)) continue;

      const { mtime } = fs.statSync(full);
      pages.push({ route, lastModified: mtime });
    }
  };

  walk(APP_DIR);

  const deduped = new Map();
  for (const page of pages) {
    const prev = deduped.get(page.route);
    if (!prev || page.lastModified > prev.lastModified) deduped.set(page.route, page);
  }

  return Array.from(deduped.values());
};

export const revalidate = 3600;

export default async function sitemap() {
  const urls = [];
  const posts = getAllContent();
  const postTags = getAllPostTags();
  const staticPages = getStaticPages();

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

  // --- Paginated blog index (include page 1)
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  for (let i = 1; i <= totalPages; i++) add(`/blogi/sivu/${i}`, latestPost);

  // --- Validate paths
  urls.forEach(({ url }) => {
    const path = url.replace(SITE_URL, '');
    if (!safeLinks.includes(path)) {
      throw new Error(`Invalid url defined in sitemap: "${path}"`);
    }
  });

  return urls.sort((a, b) => a.url.localeCompare(b.url, 'fi'));
}
