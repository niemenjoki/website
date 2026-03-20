import { POSTS_PER_PAGE } from '../../data/site/constants.mjs';
import {
  getAllContent,
  getAllContentSlugs,
  getAllPostTags,
  getBlogTagPageData,
  getPostsByTag,
  slugifyTag,
} from '../content/index.mjs';
import { staticSitePages } from '../site/pageRecords.mjs';

function formatPage({ route, title, description }) {
  return [`Path: ${route}`, `Title: ${title}`, `Description: ${description}`].join('\n');
}

function getStaticPageMetadata() {
  return staticSitePages.map((page) => ({
    route: page.canonicalUrl,
    title: page.title,
    description: page.description,
  }));
}

function getContentPageMetadata() {
  return getAllContent().map((post) => ({
    route: post.canonicalUrl,
    title: post.title,
    description: post.description,
  }));
}

function getBlogPaginationMetadata() {
  const entries = [];
  const numPages = Math.ceil(getAllContentSlugs().length / POSTS_PER_PAGE);

  for (let pageIndex = 2; pageIndex <= numPages; pageIndex++) {
    entries.push({
      route: `/blogi/sivu/${pageIndex}`,
      title: staticSitePages.find((page) => page.canonicalUrl === '/blogi')?.title,
      description: staticSitePages.find((page) => page.canonicalUrl === '/blogi')
        ?.description,
    });
  }

  return entries;
}

function getTagPageMetadata() {
  const entries = [];

  for (const rawTag of getAllPostTags()) {
    const tag = slugifyTag(rawTag);
    const { numPages } = getPostsByTag(tag, 1, POSTS_PER_PAGE);

    for (let pageIndex = 1; pageIndex <= numPages; pageIndex++) {
      const pageData = getBlogTagPageData({ tag, pageIndex: String(pageIndex) });
      entries.push({
        route: pageData.pagePath,
        title: pageData.title,
        description: pageData.description,
      });
    }
  }

  return entries;
}

function main() {
  const pages = [
    ...getStaticPageMetadata(),
    ...getContentPageMetadata(),
    ...getBlogPaginationMetadata(),
    ...getTagPageMetadata(),
  ].sort((a, b) => a.route.localeCompare(b.route, 'fi'));

  console.log(pages.map(formatPage).join('\n\n'));
}

main();
