import { SITE_URL } from '../../data/site/constants.mjs';
import { AUTHOR_ID } from '../../data/site/schema.mjs';
import { createPageStructuredData } from './createPageStructuredData.js';

function toAbsoluteUrl(value) {
  if (!value) {
    return undefined;
  }

  return value.startsWith('http') ? value : `${SITE_URL}${value}`;
}

function createMainEntityNode(page) {
  if (!page.mainEntity) {
    return null;
  }

  const { idSuffix, node } = page.mainEntity;
  const entityId = `${page.pageUrl}${idSuffix}`;

  return {
    '@id': entityId,
    ...node,
    ...(node.image ? { image: toAbsoluteUrl(node.image) } : {}),
    ...(node['@type'] === 'Project' ? { creator: { '@id': AUTHOR_ID } } : {}),
    ...(node['@type'] === 'SoftwareSourceCode' ? { author: { '@id': AUTHOR_ID } } : {}),
  };
}

export function createProjectStructuredData({ page, breadcrumbItems }) {
  const mainEntityNode = createMainEntityNode(page);

  return createPageStructuredData({
    pageUrl: page.pageUrl,
    pageName: page.title,
    description: page.description,
    pageType: page.pageType,
    pageIdSuffix: page.pageIdSuffix,
    breadcrumbItems,
    mainEntity: mainEntityNode ? { '@id': mainEntityNode['@id'] } : null,
    primaryImageOfPage: page.imageUrl,
    includeAuthor: true,
    extraGraph: mainEntityNode ? [mainEntityNode] : [],
  });
}
