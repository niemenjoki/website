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

function createItemListNode({
  pageUrl,
  itemListName,
  itemListElement = [],
  itemListOrder,
}) {
  return {
    '@type': 'ItemList',
    '@id': `${pageUrl}#itemlist`,
    ...(itemListName ? { name: itemListName } : {}),
    ...(itemListOrder ? { itemListOrder } : {}),
    numberOfItems: itemListElement.length,
    itemListElement,
  };
}

export function createCollectionStructuredData({
  pageUrl,
  pageName,
  description,
  itemListName,
  itemListElement = [],
  itemListOrder,
  breadcrumbItems = [],
  pageIdSuffix = '#collectionpage',
  includeAuthor = false,
}) {
  const graph = [
    {
      '@type': 'CollectionPage',
      '@id': `${pageUrl}${pageIdSuffix}`,
      url: pageUrl,
      name: pageName,
      description,
      isPartOf: { '@id': WEBSITE_ID },
      mainEntity: { '@id': `${pageUrl}#itemlist` },
      ...(breadcrumbItems.length > 0
        ? { breadcrumb: { '@id': `${pageUrl}#breadcrumb` } }
        : {}),
      ...(includeAuthor ? { author: { '@id': AUTHOR_ID } } : {}),
      inLanguage: SCHEMA_LANGUAGE,
    },
    createItemListNode({
      pageUrl,
      itemListName,
      itemListElement,
      itemListOrder,
    }),
  ];

  if (breadcrumbItems.length > 0) {
    graph.push(createBreadcrumbNode({ pageUrl, breadcrumbItems }));
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
