import fs from 'fs';
import path from 'path';

import { POSTS_PER_PAGE, SITE_URL } from '../../data/vars.mjs';
import {
  getAllContent,
  getAllContentSlugs,
  getAllPostTags,
  getPostsByTag,
} from '../content/index.mjs';

const APP_DIR = path.join(process.cwd(), 'app');
const CONTENT_DIR = path.join(process.cwd(), 'content', 'posts');
const DEFAULT_METADATA_FILE = path.join(process.cwd(), 'data', 'defaultMetadata.js');
const PAGE_FILE_REGEX = /^page\.(js|jsx|ts|tsx)$/;
const NOT_FOUND_FILE_REGEX = /^not-found\.(js|jsx|ts|tsx)$/;
const TITLE_MIN = 50;
const TITLE_MAX = 60;
const DESCRIPTION_MIN = 110;
const DESCRIPTION_MAX = 160;

let hasError = false;
let defaultPageMetadataCache = null;

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

function toProjectPath(filePath) {
  return path.relative(process.cwd(), filePath).replace(/\\/g, '/');
}

function toRoute(appDir, fullPath) {
  let route = fullPath.replace(appDir, '').replace(/[/\\]page\.(js|jsx|ts|tsx)$/, '');
  route = route.replace(/\\/g, '/');
  route = route.replace(/\/\([^/]+\)/g, '');
  route = route.replace(/\/@[^/]+/g, '');
  route = path.posix.normalize(route);

  if (route === '' || route === '.') {
    return '/';
  }

  if (route !== '/' && route.endsWith('/')) {
    return route.slice(0, -1);
  }

  return route;
}

function isDynamicRoute(route) {
  return /\[[^/]+\]/.test(route);
}

function absoluteUrl(route) {
  return route === '/' ? SITE_URL : `${SITE_URL}${route}`;
}

function readJson(filePath, label) {
  if (!fs.existsSync(filePath)) {
    fail(`[${label}] Missing file: ${toProjectPath(filePath)}`);
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    fail(`[${label}] Failed to parse ${toProjectPath(filePath)}: ${error.message}`);
    return null;
  }
}

function extractString(source, patterns) {
  for (const pattern of patterns) {
    const match = source.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return '';
}

function extractConstString(source, name) {
  return extractString(source, [
    new RegExp(`const\\s+${name}\\s*=\\s*'([^']*)'\\s*;`, 's'),
    new RegExp(`const\\s+${name}\\s*=\\s*"([^"]*)"\\s*;`, 's'),
    new RegExp('const\\s+' + name + '\\s*=\\s*`([\\s\\S]*?)`\\s*;', 's'),
  ]);
}

function extractObjectString(source, name) {
  return extractString(source, [
    new RegExp(`${name}\\s*:\\s*'([^']*)'`, 's'),
    new RegExp(`${name}\\s*:\\s*"([^"]*)"`, 's'),
    new RegExp(name + '\\s*:\\s*`([\\s\\S]*?)`', 's'),
  ]);
}

function resolveModulePath(fromFile, specifier) {
  if (!specifier.startsWith('.')) {
    return null;
  }

  const basePath = path.resolve(path.dirname(fromFile), specifier);
  const candidates = [
    basePath,
    `${basePath}.js`,
    `${basePath}.jsx`,
    `${basePath}.mjs`,
    `${basePath}.ts`,
    `${basePath}.tsx`,
    path.join(basePath, 'index.js'),
    path.join(basePath, 'index.jsx'),
    path.join(basePath, 'index.mjs'),
    path.join(basePath, 'index.ts'),
    path.join(basePath, 'index.tsx'),
  ];

  return candidates.find((candidate) => fs.existsSync(candidate)) || null;
}

function getDefaultPageMetadata() {
  if (defaultPageMetadataCache) {
    return defaultPageMetadataCache;
  }

  const source = fs.readFileSync(DEFAULT_METADATA_FILE, 'utf8');
  const title = extractConstString(source, 'title');
  const description = extractConstString(source, 'description');

  if (!title || !description) {
    fail('[data/defaultMetadata.js] Could not extract default title/description');
  }

  defaultPageMetadataCache = {
    title,
    description,
  };

  return defaultPageMetadataCache;
}

function getMetadataSource(pageFilePath, pageSource) {
  if (/export\s+const\s+metadata\s*=/.test(pageSource)) {
    return { kind: 'inline', filePath: pageFilePath };
  }

  const reExportMatch = pageSource.match(
    /export\s*\{\s*default\s+as\s+generateMetadata\s*\}\s*from\s*['"]([^'"]+)['"]/
  );

  if (!reExportMatch) {
    return null;
  }

  const resolved = resolveModulePath(pageFilePath, reExportMatch[1]);

  if (!resolved) {
    fail(
      `[${toProjectPath(pageFilePath)}] Could not resolve generateMetadata source: ${reExportMatch[1]}`
    );
    return null;
  }

  return { kind: 'generateMetadata', filePath: resolved };
}

function getPageEntries(appDir) {
  const entries = [];

  function walk(dir) {
    if (!fs.existsSync(dir)) {
      return;
    }

    const dirEntries = fs.readdirSync(dir, { withFileTypes: true });

    for (const dirEntry of dirEntries) {
      const fullPath = path.join(dir, dirEntry.name);

      if (dirEntry.isDirectory()) {
        if (dirEntry.name.startsWith('@')) {
          continue;
        }

        walk(fullPath);
        continue;
      }

      if (PAGE_FILE_REGEX.test(dirEntry.name)) {
        const route = toRoute(appDir, fullPath);
        entries.push({
          kind: 'page',
          filePath: fullPath,
          route,
          dynamic: isDynamicRoute(route),
        });
        continue;
      }

      if (NOT_FOUND_FILE_REGEX.test(dirEntry.name)) {
        entries.push({
          kind: 'not-found',
          filePath: fullPath,
          route: '/404',
          dynamic: false,
        });
      }
    }
  }

  walk(appDir);

  return entries.sort((left, right) => left.filePath.localeCompare(right.filePath));
}

function getAllowedPlaceholders(value) {
  return value.match(/\[[^\]]+\]/g) || [];
}

function validatePrimaryNodeUrl(value, label, expectedUrl, allowedPlaceholders = []) {
  if (typeof value !== 'string' || value.trim() === '') {
    fail(`[${label}] JSON-LD primary node is missing a url`);
    return;
  }

  const placeholders = getAllowedPlaceholders(value);
  const invalidPlaceholder = placeholders.find(
    (placeholder) => !allowedPlaceholders.includes(placeholder)
  );

  if (invalidPlaceholder) {
    fail(`[${label}] Unexpected placeholder ${invalidPlaceholder} in JSON-LD url`);
  }

  if (expectedUrl && placeholders.length === 0 && value !== expectedUrl) {
    fail(`[${label}] JSON-LD url mismatch (${value}, expected ${expectedUrl})`);
  }

  if (placeholders.length === 0 && !value.startsWith(SITE_URL)) {
    fail(`[${label}] JSON-LD url must be absolute and start with ${SITE_URL}`);
  }
}

function validatePrimaryNodeId(value, label, expectedUrl, allowedPlaceholders = []) {
  if (typeof value !== 'string' || value.trim() === '') {
    fail(`[${label}] JSON-LD primary node is missing an @id`);
    return;
  }

  const placeholders = getAllowedPlaceholders(value);
  const invalidPlaceholder = placeholders.find(
    (placeholder) => !allowedPlaceholders.includes(placeholder)
  );

  if (invalidPlaceholder) {
    fail(`[${label}] Unexpected placeholder ${invalidPlaceholder} in JSON-LD @id`);
  }

  if (expectedUrl && placeholders.length === 0 && !value.startsWith(`${expectedUrl}#`)) {
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
    allowedPlaceholders = [],
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

  if (!primaryNode || typeof primaryNode !== 'object') {
    fail(`[${label}] JSON-LD primary node is missing`);
    return null;
  }

  if (!primaryNode['@type']) {
    fail(`[${label}] JSON-LD primary node is missing an @type`);
  }

  if (allowedPrimaryTypes.length > 0 && !allowedPrimaryTypes.includes(primaryNode['@type'])) {
    fail(
      `[${label}] JSON-LD primary node type ${primaryNode['@type']} is invalid (expected ${allowedPrimaryTypes.join(
        ' or '
      )})`
    );
  }

  validatePrimaryNodeUrl(primaryNode.url, label, expectedUrl, allowedPlaceholders);
  validatePrimaryNodeId(primaryNode['@id'], label, expectedUrl, allowedPlaceholders);

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

function validateContentJsonLd(post, structuredData) {
  const label = `content/${post.slug}`;
  const expectedUrl = absoluteUrl(`/blogi/julkaisu/${post.slug}`);
  const jsonLd = validateJsonLdStructure(structuredData, label, {
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
    fail(`[${label}] data.json title does not match structuredData title/headline`);
  }

  if (!textsMatch(post.description, article.description || '')) {
    fail(`[${label}] data.json description does not match structuredData description`);
  }

  const publishedDate = getDatePrefix(article.datePublished);
  if (!publishedDate || publishedDate !== post.date) {
    fail(`[${label}] datePublished does not match data.json date`);
  }

  const expectedModifiedDate = post.updated || post.date;
  const modifiedDate = getDatePrefix(article.dateModified);
  if (!modifiedDate || modifiedDate !== expectedModifiedDate) {
    fail(`[${label}] dateModified does not match data.json updated/date`);
  }

  if (post.language && article.inLanguage !== post.language) {
    fail(`[${label}] inLanguage does not match data.json language`);
  }

  if (!Array.isArray(post.tags) || post.tags.length < 1) {
    fail(`[${label}] Must have at least 1 tag`);
  } else if (article.articleSection) {
    const normalizedSections = post.tags.map((tag) => tag.trim().toLowerCase());
    if (!normalizedSections.includes(article.articleSection.trim().toLowerCase())) {
      fail(`[${label}] articleSection does not match any data.json tag`);
    }
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
      fail(`[${label}] structuredData keywords are missing from data.json keywords`);
    }
  }
}

function validateContentPages() {
  const posts = getAllContent();

  console.log(`🔍 Checking ${posts.length} content pages for metadata mistakes...`);

  for (const post of posts) {
    const label = `content/${post.slug}`;
    const structuredDataPath = path.join(CONTENT_DIR, post.slug, 'structuredData.json');
    const structuredData = readJson(structuredDataPath, label);

    if (!post.title) {
      fail(`[${label}] Missing title`);
    }

    if (!post.description) {
      fail(`[${label}] Missing description`);
    }

    if (!post.date || !isValidDate(post.date)) {
      fail(`[${label}] Invalid or missing date: ${post.date}`);
    }

    if (post.updated && !isValidDate(post.updated)) {
      fail(`[${label}] Invalid updated date: ${post.updated}`);
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

    if (structuredData) {
      validateContentJsonLd(post, structuredData);
    }
  }
}

function validateStaticStructuredDataFile(filePath, route) {
  const label = toProjectPath(filePath);
  const data = readJson(filePath, label);

  if (!data) {
    return;
  }

  return validateJsonLdStructure(data, label, {
    expectedUrl: absoluteUrl(route),
    allowedPrimaryTypes: ['WebPage', 'AboutPage'],
    requireName: true,
    requireDescription: true,
  });
}

function validateDynamicStructuredDataTemplate(filePath, route) {
  const label = toProjectPath(filePath);
  const data = readJson(filePath, label);

  if (!data) {
    return;
  }

  const allowedPlaceholders = route.includes('[tag]')
    ? ['[tag]', '[pageIndex]']
    : ['[pageIndex]'];

  const jsonLd = validateJsonLdStructure(data, label, {
    expectedUrl: absoluteUrl(route),
    allowedPrimaryTypes: ['WebPage'],
    allowedPlaceholders,
    requireName: true,
  });

  if (!jsonLd) {
    return;
  }

  if (!findGraphNode(jsonLd.graph, 'ItemList')) {
    fail(`[${label}] JSON-LD template is missing an ItemList node`);
  }
}

function validatePageJsonLd(entry, pageSource) {
  const importMatch = pageSource.match(
    /import\s+structuredData\s+from\s+['"](\.\/structuredData\.json)['"]/
  );

  if (importMatch) {
    if (!/type=["']application\/ld\+json["']/.test(pageSource)) {
      fail(`[${toProjectPath(entry.filePath)}] structuredData.json is imported but not rendered`);
    }

    const jsonPath = path.resolve(path.dirname(entry.filePath), importMatch[1]);

    if (entry.dynamic) {
      validateDynamicStructuredDataTemplate(jsonPath, entry.route);
    } else {
      validateStaticStructuredDataFile(jsonPath, entry.route);
    }

    return;
  }

  if (toProjectPath(entry.filePath) === 'app/blogi/julkaisu/[slug]/page.jsx') {
    if (!/type=["']application\/ld\+json["']/.test(pageSource)) {
      fail(`[${toProjectPath(entry.filePath)}] Content page is missing JSON-LD rendering`);
    }

    if (!pageSource.includes('structuredData')) {
      fail(`[${toProjectPath(entry.filePath)}] Content page does not render content JSON-LD`);
    }
  }
}

function validateInlineMetadataSource(entry, source) {
  const label = toProjectPath(entry.filePath);
  const title = extractObjectString(source, 'title');
  const description = extractObjectString(source, 'description');

  if (!title) {
    fail(`[${label}] Inline metadata is missing title`);
  }

  if (!description) {
    fail(`[${label}] Inline metadata is missing description`);
  }

  if (title && description) {
    validateTitleAndDescription(title, description, label);
  }

  if (entry.kind === 'not-found') {
    if (!/robots\s*:\s*\{\s*index\s*:\s*false,\s*follow\s*:\s*false\s*\}/s.test(source)) {
      fail(`[${label}] not-found metadata must set robots to noindex,nofollow`);
    }
  }
}

function validateStaticGenerateMetadataSource(entry, source, metadataPath) {
  const label = toProjectPath(metadataPath);
  const title = extractConstString(source, 'title');
  const description = extractConstString(source, 'description');
  const canonicalUrl = extractConstString(source, 'canonicalUrl');

  if (!title) {
    fail(`[${label}] Missing title constant`);
  }

  if (!description) {
    fail(`[${label}] Missing description constant`);
  }

  if (!canonicalUrl) {
    fail(`[${label}] Missing canonicalUrl constant`);
  }

  if (title && description) {
    validateTitleAndDescription(title, description, label);
  }

  if (canonicalUrl && entry.route !== '/' && canonicalUrl !== entry.route) {
    fail(`[${label}] canonicalUrl does not match page route ${entry.route}`);
  }

  if (!source.includes('alternates')) {
    fail(`[${label}] Metadata is missing alternates.canonical`);
  }

  if (!source.includes('openGraph')) {
    fail(`[${label}] Metadata is missing openGraph data`);
  }

  if (!source.includes('twitter')) {
    fail(`[${label}] Metadata is missing twitter data`);
  }

  const structuredDataPath = path.join(path.dirname(metadataPath), 'structuredData.json');
  if (fs.existsSync(structuredDataPath)) {
    const jsonLd = validateStaticStructuredDataFile(structuredDataPath, entry.route);

    if (jsonLd?.primaryNode) {
      const jsonLdName = jsonLd.primaryNode.name || jsonLd.primaryNode.headline || '';
      const jsonLdDescription = jsonLd.primaryNode.description || '';

      if (title && jsonLdName !== title) {
        fail(
          `[${label}] Metadata title does not match structuredData.json name (${jsonLdName})`
        );
      }

      if (description && jsonLdDescription !== description) {
        fail(`[${label}] Metadata description does not match structuredData.json description`);
      }
    }
  }
}

function validateGenerateMetadataSource(entry, metadataPath) {
  const source = fs.readFileSync(metadataPath, 'utf8');
  const metadataProjectPath = toProjectPath(metadataPath);

  if (metadataProjectPath === 'app/blogi/julkaisu/[slug]/generateMetadata.js') {
    if (!source.includes('data.title')) {
      fail(`[${metadataProjectPath}] generateMetadata must use content title`);
    }

    if (!source.includes('data.description')) {
      fail(`[${metadataProjectPath}] generateMetadata must use content description`);
    }

    if (!source.includes("type: 'article'")) {
      fail(`[${metadataProjectPath}] openGraph type should be article`);
    }

    if (!source.includes('alternates: { canonical: url }')) {
      fail(`[${metadataProjectPath}] Missing canonical URL mapping`);
    }

    if (!source.includes('twitter')) {
      fail(`[${metadataProjectPath}] Missing twitter metadata`);
    }

    return;
  }

  if (metadataProjectPath === 'app/blogi/sivu/[pageIndex]/generateMetadata.js') {
    if (!source.includes('alternates')) {
      fail(`[${metadataProjectPath}] Missing alternates.canonical`);
    }

    if (!source.includes('openGraph')) {
      fail(`[${metadataProjectPath}] Missing openGraph data`);
    }

    if (!source.includes('pagination')) {
      fail(`[${metadataProjectPath}] Missing pagination metadata`);
    }

    return;
  }

  if (metadataProjectPath === 'app/blogi/[tag]/sivu/[pageIndex]/generateMetadata.js') {
    if (!source.includes('const title =')) {
      fail(`[${metadataProjectPath}] Missing title definition`);
    }

    if (!source.includes('const description =')) {
      fail(`[${metadataProjectPath}] Missing description definition`);
    }

    if (!source.includes('alternates')) {
      fail(`[${metadataProjectPath}] Missing alternates.canonical`);
    }

    if (!source.includes('openGraph')) {
      fail(`[${metadataProjectPath}] Missing openGraph data`);
    }

    if (!source.includes('pagination')) {
      fail(`[${metadataProjectPath}] Missing pagination metadata`);
    }

    return;
  }

  validateStaticGenerateMetadataSource(entry, source, metadataPath);
}

function validatePageFiles() {
  const pageEntries = getPageEntries(APP_DIR);

  console.log(`🔍 Checking ${pageEntries.length} page files for metadata coverage...`);

  for (const entry of pageEntries) {
    const source = fs.readFileSync(entry.filePath, 'utf8');
    const metadataSource = getMetadataSource(entry.filePath, source);

    if (!metadataSource) {
      fail(`[${toProjectPath(entry.filePath)}] Missing metadata export`);
    } else if (metadataSource.kind === 'inline') {
      validateInlineMetadataSource(entry, source);
    } else {
      validateGenerateMetadataSource(entry, metadataSource.filePath);
    }

    validatePageJsonLd(entry, source);
  }
}

function validateStaticPageLengths(pageEntries) {
  for (const entry of pageEntries) {
    if (entry.kind === 'not-found') {
      const source = fs.readFileSync(entry.filePath, 'utf8');
      const title = extractObjectString(source, 'title');
      const description = extractObjectString(source, 'description');
      if (title && description) {
        validateTitleAndDescription(title, description, entry.route);
      }
      continue;
    }

    if (entry.dynamic) {
      continue;
    }

    const source = fs.readFileSync(entry.filePath, 'utf8');
    const metadataSource = getMetadataSource(entry.filePath, source);

    if (!metadataSource) {
      continue;
    }

    if (
      metadataSource.kind === 'generateMetadata' &&
      toProjectPath(metadataSource.filePath) === 'app/blogi/sivu/[pageIndex]/generateMetadata.js'
    ) {
      const defaultPageMetadata = getDefaultPageMetadata();
      validateTitleAndDescription(
        defaultPageMetadata.title,
        defaultPageMetadata.description,
        entry.route
      );
      continue;
    }

    if (metadataSource.kind === 'generateMetadata') {
      const metadataSourceCode = fs.readFileSync(metadataSource.filePath, 'utf8');
      const title = extractConstString(metadataSourceCode, 'title');
      const description = extractConstString(metadataSourceCode, 'description');

      if (title && description) {
        validateTitleAndDescription(title, description, entry.route);
      }
    }
  }
}

function validateBlogPaginationLengths() {
  const numPages = Math.ceil(getAllContentSlugs().length / POSTS_PER_PAGE);
  const defaultPageMetadata = getDefaultPageMetadata();

  for (let pageIndex = 1; pageIndex <= numPages; pageIndex++) {
    const route = pageIndex === 1 ? '/blogi' : `/blogi/sivu/${pageIndex}`;
    validateTitleAndDescription(
      defaultPageMetadata.title,
      defaultPageMetadata.description,
      route
    );
  }
}

function validateTagPageLengths() {
  for (const rawTag of getAllPostTags()) {
    const tag = rawTag.trim().toLowerCase().replaceAll(' ', '-');
    const decodedTag = decodeURIComponent(tag).replaceAll('-', ' ');
    const { numPages } = getPostsByTag(tag, 1, POSTS_PER_PAGE);

    for (let pageIndex = 1; pageIndex <= numPages; pageIndex++) {
      const title = `Julkaisut avainsanalla ${decodedTag} | Niemenjoki blogi`;
      const description = `Julkaisut avainsanalla ${decodedTag}: Blogi käsittelee pääasiassa rakennusautomaatiota, lämpöpumppuja ja tekniikkaa.`;
      validateTitleAndDescription(title, description, `/blogi/${tag}/sivu/${pageIndex}`);
    }
  }
}

function validateAllPageLengths() {
  const pageEntries = getPageEntries(APP_DIR);

  console.log('🔍 Checking title and description lengths for every page...');

  validateStaticPageLengths(pageEntries);
  validateBlogPaginationLengths();
  validateTagPageLengths();
}

try {
  validatePageFiles();
  validateContentPages();
  validateAllPageLengths();
} catch (error) {
  fail(`Metadata verification crashed: ${error.message}`);
}

if (hasError) {
  console.error('\n❌ Metadata verification failed.\n');
  process.exit(1);
} else {
  console.log('✅ All metadata checks passed.\n');
}
