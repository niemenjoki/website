import { SITE_URL } from '../../data/site/constants.mjs';
import { AUTHOR_ID, SCHEMA_LANGUAGE, WEBSITE_ID } from '../../data/site/schema.mjs';

function toAbsoluteUrl(value) {
  if (!value) {
    return null;
  }

  return value.startsWith('http') ? value : `${SITE_URL}${value}`;
}

function createBreadcrumbNode({ pageUrl, breadcrumbItems }) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: breadcrumbItems.map((item, index) => {
      const itemUrl = toAbsoluteUrl(item.url ?? item.href);
      const isLast = index === breadcrumbItems.length - 1;

      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        ...(itemUrl && !isLast ? { item: itemUrl } : {}),
      };
    }),
  };
}

export function createPageStructuredData({
  pageUrl,
  pageName,
  description,
  pageType = 'WebPage',
  pageIdSuffix = '#webpage',
  breadcrumbItems = [],
  mainEntity = null,
  primaryImageOfPage = null,
  includeAuthor = false,
  extraPrimaryProperties = {},
  extraGraph = [],
}) {
  const graph = [
    {
      '@type': pageType,
      '@id': `${pageUrl}${pageIdSuffix}`,
      url: pageUrl,
      name: pageName,
      description,
      isPartOf: { '@id': WEBSITE_ID },
      ...(mainEntity ? { mainEntity } : {}),
      ...(breadcrumbItems.length > 0
        ? { breadcrumb: { '@id': `${pageUrl}#breadcrumb` } }
        : {}),
      ...(primaryImageOfPage
        ? { primaryImageOfPage: toAbsoluteUrl(primaryImageOfPage) }
        : {}),
      ...(includeAuthor ? { author: { '@id': AUTHOR_ID } } : {}),
      inLanguage: SCHEMA_LANGUAGE,
      ...extraPrimaryProperties,
    },
    ...extraGraph,
  ];

  if (breadcrumbItems.length > 0) {
    graph.push(createBreadcrumbNode({ pageUrl, breadcrumbItems }));
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
