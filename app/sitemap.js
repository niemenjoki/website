import path from 'path';

import safeLinks from '@/generated/site/safeRoutes.json';
import {
  getAllContent,
  getAllPostTags,
  getPostsByTag,
  slugifyTag,
} from '@/lib/content/index.mjs';
import { getStaticAppRoutes } from '@/lib/routes/getStaticAppRoutes.mjs';
import {
  blogIndexPage,
  getPageLastModified,
  homePage,
  staticSitePages,
} from '@/lib/site/pageRecords.mjs';

import { POSTS_PER_PAGE, SITE_URL } from '../data/site/constants.mjs';

const APP_DIR = path.join(process.cwd(), 'app');

const toISODate = (d) => new Date(d).toISOString().split('T')[0];
const getLatestPostDate = (posts) =>
  posts.reduce((latest, post) => {
    const d = new Date(post.updated || post.date);
    return d > latest ? d : latest;
  }, new Date(0));

export const revalidate = 3600;

export default async function sitemap() {
  const posts = getAllContent();
  const postTags = getAllPostTags();
  const staticPages = getStaticAppRoutes(APP_DIR);
  const urls = new Map();
  const staticRouteMap = new Map(
    staticPages.map(({ route, lastModified }) => [route, lastModified])
  );

  const latestPost = getLatestPostDate(posts);

  // The path is kept as written for the route check. The address is percent-encoded, because tag names contain ä and ö.
  const add = (path, lastmod) => {
    urls.set(path, {
      path,
      url: `${SITE_URL}${encodeURI(path)}`,
      lastModified: toISODate(lastmod),
    });
  };

  const staticLastModified = (route, fallback) => {
    if (route === homePage.canonicalUrl || route === blogIndexPage.canonicalUrl) {
      return latestPost;
    }

    return fallback ?? latestPost;
  };

  // --- Static pages (the blog index repeats the home page and points to it as canonical, so it is left out)
  staticSitePages
    .filter((page) => page.canonicalUrl !== blogIndexPage.canonicalUrl)
    .forEach((page) =>
      add(
        page.canonicalUrl,
        staticLastModified(
          page.canonicalUrl,
          getPageLastModified(page) ?? staticRouteMap.get(page.canonicalUrl)
        )
      )
    );

  // --- Tag pages
  for (const tag of postTags) {
    const slug = slugifyTag(tag);
    const { numPages } = getPostsByTag(slug, 1, POSTS_PER_PAGE);
    for (let i = 1; i <= numPages; i++) add(`/blogi/${slug}/sivu/${i}`, latestPost);
  }

  // --- Blog posts
  posts.forEach((p) => add(`/blogi/julkaisu/${p.slug}`, p.updated || p.date));

  // --- Paginated blog index
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  for (let i = 2; i <= totalPages; i++) add(`/blogi/sivu/${i}`, latestPost);

  const entries = Array.from(urls.values());

  // --- Validate paths
  entries.forEach(({ path }) => {
    if (!safeLinks.includes(path)) {
      throw new Error(`Invalid url defined in sitemap: "${path}"`);
    }
  });

  return entries
    .sort((a, b) => a.path.localeCompare(b.path, 'fi'))
    .map(({ url, lastModified }) => ({ url, lastModified }));
}
