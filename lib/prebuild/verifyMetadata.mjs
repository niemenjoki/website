import { POSTS_PER_PAGE, SITE_URL } from '../../data/site/constants.mjs';
import { defaultMetadata } from '../../data/site/defaultMetadata.js';
import { AUTHOR_ID } from '../../data/site/schema.mjs';
import {
  getAllContent,
  getAllContentSlugs,
  getAllPostTags,
  getBlogPageData,
  getBlogTagPageData,
  getPaginatedPosts,
  getPostsByTag,
  slugifyTag,
} from '../content/index.mjs';
import {
  aboutPage,
  blogIndexPage,
  compressCreateReactAppPage,
  homePage,
  lieromaaProjectPage,
  privacyPolicyPage,
  rauToolsAlarmPage,
  rauToolsModbusDevicesPage,
  rauToolsPage,
  rauToolsStVariablesPage,
  staticSitePages,
} from '../site/pageRecords.mjs';
import { createCollectionStructuredData } from '../structuredData/createCollectionStructuredData.mjs';
import { createPageStructuredData } from '../structuredData/createPageStructuredData.js';
import { createProjectStructuredData } from '../structuredData/createProjectStructuredData.js';
import {
  createAuthorStructuredDataNode,
  createSiteStructuredData,
} from '../structuredData/createSiteStructuredData.js';

const TITLE_MIN = 50;
const TITLE_MAX = 60;
const DESCRIPTION_MIN = 110;
const DESCRIPTION_MAX = 160;

let hasError = false;

function fail(message) {
  console.error(`❌ ${message}`);
  hasError = true;
}

function validateLength(value, min, max, field, label) {
  const length = value?.length || 0;
  if (!value || length < min || length > max) {
    fail(`[${label}] ${field} length invalid (${length} chars, expected ${min}-${max})`);
  }
}

function validateTitleAndDescription(title, description, label) {
  validateLength(title, TITLE_MIN, TITLE_MAX, 'title', label);
  validateLength(description, DESCRIPTION_MIN, DESCRIPTION_MAX, 'description', label);
}

function normalizeWhitespace(value = '') {
  return value.replace(/\s+/g, ' ').trim();
}

function textsMatch(left, right) {
  return normalizeWhitespace(left) === normalizeWhitespace(right);
}

function isValidDate(value) {
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}

function getDatePrefix(value) {
  if (typeof value !== 'string') {
    return '';
  }

  const match = value.match(/^\d{4}-\d{2}-\d{2}/);
  if (match) {
    return match[0];
  }

  if (!isValidDate(value)) {
    return '';
  }

  return new Date(value).toISOString().slice(0, 10);
}

function validatePrimaryNodeUrl(value, label, expectedUrl) {
  if (typeof value !== 'string' || value.trim() === '') {
    fail(`[${label}] JSON-LD primary node is missing a url`);
    return;
  }

  if (expectedUrl && value !== expectedUrl) {
    fail(`[${label}] JSON-LD url mismatch (${value}, expected ${expectedUrl})`);
  }

  if (!value.startsWith(SITE_URL)) {
    fail(`[${label}] JSON-LD url must start with ${SITE_URL}`);
  }
}

function validatePrimaryNodeId(value, label, expectedUrl) {
  if (typeof value !== 'string' || value.trim() === '') {
    fail(`[${label}] JSON-LD primary node is missing an @id`);
    return;
  }

  if (expectedUrl && !value.startsWith(`${expectedUrl}#`)) {
    fail(`[${label}] JSON-LD @id should start with ${expectedUrl}#`);
  }
}

function findGraphNode(graph, types) {
  const typeList = Array.isArray(types) ? types : [types];
  return graph.find((node) => typeList.includes(node?.['@type']));
}

function validateJsonLdStructure(data, label, options = {}) {
  const {
    expectedUrl,
    allowedPrimaryTypes = [],
    requireName = false,
    requireDescription = false,
  } = options;

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    fail(`[${label}] JSON-LD must be an object`);
    return null;
  }

  if (data['@context'] !== 'https://schema.org') {
    fail(`[${label}] JSON-LD @context must be "https://schema.org"`);
  }

  if (!Array.isArray(data['@graph']) || data['@graph'].length === 0) {
    fail(`[${label}] JSON-LD must contain a non-empty @graph array`);
    return null;
  }

  const primaryNode = data['@graph'][0];

  if (!primaryNode?.['@type']) {
    fail(`[${label}] JSON-LD primary node is missing an @type`);
    return null;
  }

  if (
    allowedPrimaryTypes.length > 0 &&
    !allowedPrimaryTypes.includes(primaryNode['@type'])
  ) {
    fail(
      `[${label}] JSON-LD primary node type ${primaryNode['@type']} is invalid (expected ${allowedPrimaryTypes.join(
        ' or '
      )})`
    );
  }

  validatePrimaryNodeUrl(primaryNode.url, label, expectedUrl);
  validatePrimaryNodeId(primaryNode['@id'], label, expectedUrl);

  if (!primaryNode.inLanguage) {
    fail(`[${label}] JSON-LD primary node is missing inLanguage`);
  }

  if (requireName && !primaryNode.name && !primaryNode.headline) {
    fail(`[${label}] JSON-LD primary node is missing a name/headline`);
  }

  if (requireDescription && !primaryNode.description) {
    fail(`[${label}] JSON-LD primary node is missing a description`);
  }

  return {
    graph: data['@graph'],
    primaryNode,
  };
}

function validateSiteStructuredData() {
  const label = 'site';
  const data = createSiteStructuredData();
  const jsonLd = validateJsonLdStructure(data, label, {
    expectedUrl: null,
    allowedPrimaryTypes: ['WebSite'],
    requireName: true,
    requireDescription: true,
  });

  if (!jsonLd) {
    return;
  }

  validatePrimaryNodeUrl(jsonLd.primaryNode.url, label, SITE_URL);

  if (
    !jsonLd.primaryNode['@id']?.startsWith(`${SITE_URL}#`) &&
    !jsonLd.primaryNode['@id']?.startsWith(`${SITE_URL}/#`)
  ) {
    fail(`[${label}] JSON-LD @id should start with ${SITE_URL}# or ${SITE_URL}/#`);
  }

  if (!findGraphNode(jsonLd.graph, 'Person')) {
    fail('[site] JSON-LD is missing a Person node');
  }
}

function createBlogCollectionStructuredData({ pagePath, pageName, description, posts }) {
  return createCollectionStructuredData({
    pageUrl: `${SITE_URL}${pagePath}`,
    pageName,
    description,
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: post.title,
      url: `${SITE_URL}/blogi/julkaisu/${post.slug}`,
    })),
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
  });
}

function validateCollectionStructuredData(data, label, expectedUrl) {
  const jsonLd = validateJsonLdStructure(data, label, {
    expectedUrl,
    allowedPrimaryTypes: ['CollectionPage'],
    requireName: true,
    requireDescription: true,
  });

  if (!jsonLd) {
    return;
  }

  if (!findGraphNode(jsonLd.graph, 'ItemList')) {
    fail(`[${label}] Collection JSON-LD is missing an ItemList node`);
  }
}

function validateStaticPageStructuredData() {
  const entries = [
    {
      label: aboutPage.canonicalUrl,
      data: createPageStructuredData({
        pageUrl: aboutPage.pageUrl,
        pageName: aboutPage.title,
        description: aboutPage.description,
        pageType: aboutPage.pageType,
        pageIdSuffix: aboutPage.pageIdSuffix,
        mainEntity: { '@id': AUTHOR_ID },
        primaryImageOfPage: aboutPage.imageUrl,
        extraGraph: [createAuthorStructuredDataNode()],
      }),
      expectedUrl: aboutPage.pageUrl,
      allowedPrimaryTypes: ['ProfilePage'],
    },
    {
      label: privacyPolicyPage.canonicalUrl,
      data: createPageStructuredData({
        pageUrl: privacyPolicyPage.pageUrl,
        pageName: privacyPolicyPage.title,
        description: privacyPolicyPage.description,
        pageType: privacyPolicyPage.pageType,
        pageIdSuffix: privacyPolicyPage.pageIdSuffix,
      }),
      expectedUrl: privacyPolicyPage.pageUrl,
      allowedPrimaryTypes: ['WebPage'],
    },
    {
      label: lieromaaProjectPage.canonicalUrl,
      data: createProjectStructuredData({
        page: lieromaaProjectPage,
        breadcrumbItems: [
          { name: 'Etusivu', href: '/' },
          { name: lieromaaProjectPage.shortLabel },
        ],
      }),
      expectedUrl: lieromaaProjectPage.pageUrl,
      allowedPrimaryTypes: ['ItemPage'],
    },
    {
      label: compressCreateReactAppPage.canonicalUrl,
      data: createProjectStructuredData({
        page: compressCreateReactAppPage,
        breadcrumbItems: [
          { name: 'Etusivu', href: '/' },
          { name: compressCreateReactAppPage.shortLabel },
        ],
      }),
      expectedUrl: compressCreateReactAppPage.pageUrl,
      allowedPrimaryTypes: ['ItemPage'],
    },
    {
      label: rauToolsPage.canonicalUrl,
      data: createCollectionStructuredData({
        pageUrl: rauToolsPage.pageUrl,
        pageName: rauToolsPage.title,
        description: rauToolsPage.description,
        itemListName: rauToolsPage.mainEntityName,
        itemListElement: [
          rauToolsAlarmPage,
          rauToolsStVariablesPage,
          rauToolsModbusDevicesPage,
        ].map((page, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: page.shortLabel,
          url: page.pageUrl,
        })),
        breadcrumbItems: [
          { name: 'Etusivu', href: '/' },
          { name: rauToolsPage.shortLabel },
        ],
        includeAuthor: true,
      }),
      expectedUrl: rauToolsPage.pageUrl,
      allowedPrimaryTypes: ['CollectionPage'],
    },
    ...[rauToolsAlarmPage, rauToolsModbusDevicesPage, rauToolsStVariablesPage].map(
      (page) => ({
        label: page.canonicalUrl,
        data: createProjectStructuredData({
          page,
          breadcrumbItems: [
            { name: 'Etusivu', href: '/' },
            { name: rauToolsPage.shortLabel, href: rauToolsPage.canonicalUrl },
            { name: page.shortLabel },
          ],
        }),
        expectedUrl: page.pageUrl,
        allowedPrimaryTypes: ['ItemPage'],
      })
    ),
  ];

  for (const entry of entries) {
    const jsonLd = validateJsonLdStructure(entry.data, entry.label, {
      expectedUrl: entry.expectedUrl,
      allowedPrimaryTypes: entry.allowedPrimaryTypes,
      requireName: true,
      requireDescription: true,
    });

    if (!jsonLd) {
      continue;
    }

    if (jsonLd.primaryNode.breadcrumb && !findGraphNode(jsonLd.graph, 'BreadcrumbList')) {
      fail(
        `[${entry.label}] JSON-LD references breadcrumb but is missing a BreadcrumbList`
      );
    }
  }
}

function validateBlogCollectionStructuredData() {
  const numPages = Math.ceil(getAllContentSlugs().length / POSTS_PER_PAGE);

  for (let pageIndex = 1; pageIndex <= numPages; pageIndex++) {
    const pageData = getBlogPageData(String(pageIndex));
    const { posts } = getPaginatedPosts(pageIndex, POSTS_PER_PAGE);
    const data = createCollectionStructuredData({
      pageUrl: pageData.pageUrl,
      pageName: pageData.pageName,
      description: pageData.description,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: (pageIndex - 1) * POSTS_PER_PAGE + (index + 1),
        name: post.title,
        url: `${SITE_URL}/blogi/julkaisu/${post.slug}`,
      })),
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      breadcrumbItems: pageData.breadcrumbItems,
    });

    validateCollectionStructuredData(data, pageData.pagePath, pageData.pageUrl);
  }

  const homePageData = getBlogPageData('1', { baseCanonicalUrl: '/' });
  const homePosts = getPaginatedPosts(1, POSTS_PER_PAGE).posts;
  validateCollectionStructuredData(
    createBlogCollectionStructuredData({
      pagePath: homePage.canonicalUrl,
      pageName: homePage.title,
      description: homePage.description,
      posts: homePosts,
    }),
    homePage.canonicalUrl,
    homePageData.pageUrl
  );
}

function validateTagCollectionStructuredData() {
  for (const rawTag of getAllPostTags()) {
    const tag = slugifyTag(rawTag);
    const { numPages } = getPostsByTag(tag, 1, POSTS_PER_PAGE);

    for (let pageIndex = 1; pageIndex <= numPages; pageIndex++) {
      const pageData = getBlogTagPageData({ tag, pageIndex: String(pageIndex) });
      const { posts } = getPostsByTag(tag, pageIndex, POSTS_PER_PAGE);
      const data = createCollectionStructuredData({
        pageUrl: pageData.pageUrl,
        pageName: pageData.pageName,
        description: pageData.description,
        itemListElement: posts.map((post, index) => ({
          '@type': 'ListItem',
          position: (pageIndex - 1) * POSTS_PER_PAGE + (index + 1),
          name: post.title,
          url: `${SITE_URL}/blogi/julkaisu/${post.slug}`,
        })),
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        breadcrumbItems: pageData.breadcrumbItems,
      });

      validateCollectionStructuredData(data, pageData.pagePath, pageData.pageUrl);
    }
  }
}

function validateContentJsonLd(post) {
  const label = `content/${post.slug}`;
  const expectedUrl = `${SITE_URL}${post.canonicalUrl}`;
  const jsonLd = validateJsonLdStructure(post.structuredData, label, {
    expectedUrl,
    allowedPrimaryTypes: ['BlogPosting'],
    requireName: true,
    requireDescription: true,
  });

  if (!jsonLd) {
    return;
  }

  const article = findGraphNode(jsonLd.graph, 'BlogPosting');

  if (!article) {
    fail(`[${label}] JSON-LD is missing a BlogPosting node`);
    return;
  }

  const schemaTitle = article.headline || article.name || '';
  if (!textsMatch(post.title, schemaTitle)) {
    fail(`[${label}] metadata title does not match JSON-LD title/headline`);
  }

  if (!textsMatch(post.description, article.description || '')) {
    fail(`[${label}] metadata description does not match JSON-LD description`);
  }

  const publishedDate = getDatePrefix(article.datePublished);
  if (!publishedDate || publishedDate !== post.date) {
    fail(`[${label}] datePublished does not match content metadata date`);
  }

  const expectedModifiedDate = post.updatedAt ?? post.date;
  const modifiedDate = getDatePrefix(article.dateModified);
  if (!modifiedDate || modifiedDate !== expectedModifiedDate) {
    fail(`[${label}] dateModified does not match content metadata updated/date`);
  }

  if (post.language && article.inLanguage !== post.language) {
    fail(`[${label}] inLanguage does not match content metadata language`);
  }

  if (!Array.isArray(post.tags) || post.tags.length < 1) {
    fail(`[${label}] Must have at least 1 tag`);
  } else if (article.articleSection && article.articleSection !== post.tags[0]) {
    fail(`[${label}] articleSection does not match the first content tag`);
  }

  const schemaKeywords = Array.isArray(article.keywords)
    ? article.keywords
    : typeof article.keywords === 'string'
      ? article.keywords.split(',').map((keyword) => keyword.trim())
      : [];

  if (schemaKeywords.length === 0) {
    fail(`[${label}] JSON-LD BlogPosting is missing keywords`);
  } else {
    const normalizedKeywords = new Set(
      (post.keywords || []).map((keyword) => keyword.trim().toLowerCase())
    );
    const missingKeywords = schemaKeywords.filter(
      (keyword) => !normalizedKeywords.has(keyword.trim().toLowerCase())
    );

    if (missingKeywords.length > 0) {
      fail(`[${label}] JSON-LD keywords are missing from content metadata keywords`);
    }
  }
}

function validateStaticPages() {
  console.log(`🔍 Checking ${staticSitePages.length} static page records...`);

  for (const page of staticSitePages) {
    if (!page.canonicalUrl) {
      fail(`[${page.title}] Missing canonicalUrl`);
    }

    if (!page.title) {
      fail(`[${page.canonicalUrl}] Missing title`);
    }

    if (!page.description) {
      fail(`[${page.canonicalUrl}] Missing description`);
    }

    if (page.title && page.description) {
      validateTitleAndDescription(page.title, page.description, page.canonicalUrl);
    }
  }
}

function validateContentPages() {
  const posts = getAllContent();

  console.log(`🔍 Checking ${posts.length} content pages for metadata mistakes...`);

  for (const post of posts) {
    const label = `content/${post.slug}`;

    if (!post.title) {
      fail(`[${label}] Missing title`);
    }

    if (!post.description) {
      fail(`[${label}] Missing description`);
    }

    if (!post.date || !isValidDate(post.date)) {
      fail(`[${label}] Invalid or missing date: ${post.date}`);
    }

    if (post.updatedAt && !isValidDate(post.updatedAt)) {
      fail(`[${label}] Invalid updated date: ${post.updatedAt}`);
    }

    if (!Array.isArray(post.tags) || post.tags.length < 1) {
      fail(`[${label}] Must have at least 1 tag`);
    }

    if (!Array.isArray(post.keywords) || post.keywords.length < 2) {
      fail(`[${label}] Must have at least 2 keywords`);
    }

    if (!post.language) {
      fail(`[${label}] Missing language`);
    }

    validateTitleAndDescription(post.title, post.description, label);
    validateContentJsonLd(post);
  }
}

function validatePaginatedPageLengths() {
  const blogNumPages = Math.ceil(getAllContentSlugs().length / POSTS_PER_PAGE);

  for (let pageIndex = 1; pageIndex <= blogNumPages; pageIndex++) {
    const pageData = getBlogPageData(String(pageIndex));
    validateTitleAndDescription(
      blogIndexPage.title,
      blogIndexPage.description,
      pageData.pagePath
    );
  }

  for (const rawTag of getAllPostTags()) {
    const tag = slugifyTag(rawTag);
    const { numPages } = getPostsByTag(tag, 1, POSTS_PER_PAGE);

    for (let pageIndex = 1; pageIndex <= numPages; pageIndex++) {
      const pageData = getBlogTagPageData({ tag, pageIndex: String(pageIndex) });
      validateTitleAndDescription(
        pageData.title,
        pageData.description,
        pageData.pagePath
      );
    }
  }
}

try {
  validateTitleAndDescription(
    defaultMetadata.title,
    defaultMetadata.description,
    'data/site/defaultMetadata.js'
  );
  validateSiteStructuredData();
  validateStaticPages();
  validateStaticPageStructuredData();
  validateBlogCollectionStructuredData();
  validateTagCollectionStructuredData();
  validateContentPages();
  validatePaginatedPageLengths();
} catch (error) {
  fail(`Metadata verification crashed: ${error.message}`);
}

if (hasError) {
  console.error('\n❌ Metadata verification failed.\n');
  process.exit(1);
} else {
  console.log('✅ All metadata checks passed.\n');
}
