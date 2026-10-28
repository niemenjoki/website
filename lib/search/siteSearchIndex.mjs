import { getAllContent } from '../content/index.mjs';
import {
  aboutPage,
  primaryProjectPages,
  privacyPolicyPage,
} from '../site/pageRecords.mjs';

const toArray = (value) =>
  Array.isArray(value)
    ? value
    : String(value ?? '')
        .split(',')
        .filter(Boolean);

function createPostSearchItem(post) {
  return {
    id: `post:${post.slug}`,
    type: 'post',
    typeLabel: 'Julkaisu',
    title: post.title,
    description: post.description,
    href: `/blogi/julkaisu/${post.slug}`,
    section: toArray(post.tags)[0] ?? 'blogi',
    tags: toArray(post.tags),
    keywords: toArray(post.keywords),
    headings: [],
    searchText: post.description,
  };
}

function createPageSearchItem(page) {
  return {
    id: `page:${page.canonicalUrl}`,
    type: 'page',
    typeLabel: 'Sivu',
    title: page.search?.title ?? page.shortLabel ?? page.pageName,
    description: page.search?.description ?? page.description,
    href: page.canonicalUrl,
    section: 'sivu',
    tags: page.search?.tags ?? [],
    keywords: page.search?.keywords ?? [],
    headings: [],
    searchText: page.description,
  };
}

export function getSiteSearchIndex() {
  return [
    ...getAllContent().map(createPostSearchItem),
    ...[aboutPage, ...primaryProjectPages, privacyPolicyPage].map(createPageSearchItem),
  ];
}
