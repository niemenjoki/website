import {
  aboutPage,
  blogIndexPage,
  primaryProjectPages,
  privacyPolicyPage,
  rauToolPages,
  rauToolsPage,
} from './site/pageRecords.mjs';

const secondarySitePages = [blogIndexPage, aboutPage, privacyPolicyPage];
const searchableSitePages = [
  blogIndexPage,
  aboutPage,
  privacyPolicyPage,
  ...primaryProjectPages,
  ...rauToolPages,
];

function createLink({ canonicalUrl, navigationLabel, shortLabel }) {
  return {
    href: canonicalUrl,
    label: navigationLabel ?? shortLabel,
  };
}

function createSearchEntry({ canonicalUrl, description, search, shortLabel }) {
  if (!search) {
    return null;
  }

  return {
    overrideHref: canonicalUrl,
    slug: canonicalUrl.replace(/^\/+/, ''),
    title: search.title ?? shortLabel,
    description: search.description ?? description,
    tags: search.tags ?? [],
    keywords: search.keywords ?? [],
  };
}

export function getSiteNavigation() {
  const projectLinks = primaryProjectPages.map((page) => createLink(page));
  const secondaryLinks = secondarySitePages.map((page) => createLink(page));

  return {
    desktopItems: [
      { kind: 'link', ...createLink(blogIndexPage) },
      { kind: 'menu', label: 'Projektit', items: projectLinks },
    ],
    footerColumns: [
      { heading: 'Blogi', items: [createLink(blogIndexPage)] },
      { heading: 'Projektit', items: projectLinks },
      { heading: 'Muut sivut', items: secondaryLinks.filter(Boolean) },
    ],
    mobileSections: [
      { heading: 'Blogi', items: [createLink(blogIndexPage)] },
      { heading: 'Projektit', items: projectLinks },
      { heading: 'Muut sivut', items: secondaryLinks.filter(Boolean) },
    ],
    rauToolsPage,
  };
}

export function getSearchableSitePages({ context }) {
  return searchableSitePages
    .filter((page) => page.search?.contexts?.includes(context))
    .map((page) => createSearchEntry(page))
    .filter(Boolean);
}
