import { getAllPostTags, slugifyTag } from './content/index.mjs';
import {
  aboutPage,
  blogIndexPage,
  homePage,
  primaryProjectPages,
  privacyPolicyPage,
  projectsIndexPage,
} from './site/pageRecords.mjs';

const searchableSitePages = [
  blogIndexPage,
  aboutPage,
  privacyPolicyPage,
  projectsIndexPage,
  ...primaryProjectPages,
];

const RSS_LINK = { href: '/rss', label: 'RSS-syöte', external: true };

function createLink({ canonicalUrl, navigationLabel, shortLabel }) {
  return {
    href: canonicalUrl,
    label: navigationLabel ?? shortLabel,
  };
}

function createTopicLink(tag) {
  return {
    href: `/blogi/${slugifyTag(tag)}/sivu/1`,
    label: tag.charAt(0).toLocaleUpperCase('fi-FI') + tag.slice(1),
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
  const projectLinks = [projectsIndexPage, ...primaryProjectPages].map((page) =>
    createLink(page)
  );
  const topicLinks = getAllPostTags().map(createTopicLink);

  return {
    // The first item whose exact paths include the current path is the active one. The home page lists the
    // blog posts, so Blogi comes first and is active on the home page too.
    primaryItems: [
      {
        id: 'blog',
        href: blogIndexPage.canonicalUrl,
        label: blogIndexPage.navigationLabel,
        icon: 'blog',
        exactPaths: [homePage.canonicalUrl],
        matchPrefixes: [blogIndexPage.canonicalUrl],
      },
      {
        id: 'home',
        href: homePage.canonicalUrl,
        label: homePage.shortLabel,
        icon: 'home',
      },
      {
        id: 'projects',
        href: projectsIndexPage.canonicalUrl,
        label: projectsIndexPage.shortLabel,
        icon: 'projects',
        matchPrefixes: [projectsIndexPage.canonicalUrl],
      },
      {
        id: 'about',
        href: aboutPage.canonicalUrl,
        label: 'Tietoa',
        icon: 'about',
      },
    ],
    desktopPrimaryIds: ['blog', 'projects', 'about'],
    mobileDockIds: ['blog', 'projects', 'about'],
    secondarySections: [
      { heading: 'Aiheet', items: topicLinks },
      { heading: 'Projektit', items: projectLinks },
      { heading: 'Sivusto', items: [createLink(privacyPolicyPage), RSS_LINK] },
    ],
    footerColumns: [
      {
        heading: 'Blogi',
        items: [
          { href: blogIndexPage.canonicalUrl, label: 'Kaikki julkaisut' },
          ...topicLinks,
          RSS_LINK,
        ],
      },
      { heading: 'Projektit', items: projectLinks },
      {
        heading: 'Sivusto',
        items: [createLink(aboutPage), createLink(privacyPolicyPage)],
      },
    ],
  };
}

export function getSearchableSitePages({ context }) {
  return searchableSitePages
    .filter((page) => page.search?.contexts?.includes(context))
    .map((page) => createSearchEntry(page))
    .filter(Boolean);
}
