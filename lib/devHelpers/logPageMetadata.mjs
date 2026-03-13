import fs from 'fs';
import path from 'path';

import { POSTS_PER_PAGE } from '../../data/vars.mjs';
import {
  getAllContent,
  getAllContentSlugs,
  getAllPostTags,
  getPostsByTag,
} from '../content/index.mjs';

const APP_DIR = path.join(process.cwd(), 'app');
const DEFAULT_METADATA_FILE = path.join(process.cwd(), 'data', 'defaultMetadata.js');
const PAGE_FILE_REGEX = /^page\.(js|jsx|ts|tsx)$/;
const NOT_FOUND_FILE_REGEX = /^not-found\.(js|jsx|ts|tsx)$/;

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

function getDefaultPageMetadata() {
  const source = fs.readFileSync(DEFAULT_METADATA_FILE, 'utf8');

  return {
    title: extractConstString(source, 'title'),
    description: extractConstString(source, 'description'),
  };
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
    return null;
  }

  return { kind: 'generateMetadata', filePath: resolved };
}

function getStaticPageEntries() {
  const pages = [];

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (entry.name.startsWith('@')) {
          continue;
        }

        walk(fullPath);
        continue;
      }

      if (PAGE_FILE_REGEX.test(entry.name)) {
        const route = toRoute(APP_DIR, fullPath);

        if (!isDynamicRoute(route)) {
          pages.push({ kind: 'page', filePath: fullPath, route });
        }

        continue;
      }

      if (NOT_FOUND_FILE_REGEX.test(entry.name)) {
        pages.push({ kind: 'not-found', filePath: fullPath, route: '/404' });
      }
    }
  }

  walk(APP_DIR);

  return pages;
}

function getStaticPageMetadata(entry) {
  const pageSource = fs.readFileSync(entry.filePath, 'utf8');
  const metadataSource = getMetadataSource(entry.filePath, pageSource);

  if (!metadataSource) {
    return null;
  }

  if (metadataSource.kind === 'inline') {
    return {
      route: entry.route,
      title: extractObjectString(pageSource, 'title'),
      description: extractObjectString(pageSource, 'description'),
    };
  }

  const metadataPath = metadataSource.filePath.replace(/\\/g, '/');

  if (metadataPath.endsWith('app/blogi/sivu/[pageIndex]/generateMetadata.js')) {
    const defaultPageMetadata = getDefaultPageMetadata();
    return {
      route: entry.route,
      title: defaultPageMetadata.title,
      description: defaultPageMetadata.description,
    };
  }

  const metadataSourceCode = fs.readFileSync(metadataSource.filePath, 'utf8');

  return {
    route: entry.route,
    title: extractConstString(metadataSourceCode, 'title'),
    description: extractConstString(metadataSourceCode, 'description'),
  };
}

function getContentPageMetadata() {
  return getAllContent().map((post) => ({
    route: `/blogi/julkaisu/${post.slug}`,
    title: post.title,
    description: post.description,
  }));
}

function getBlogPaginationMetadata() {
  const entries = [];
  const defaultPageMetadata = getDefaultPageMetadata();
  const numPages = Math.ceil(getAllContentSlugs().length / POSTS_PER_PAGE);

  for (let pageIndex = 1; pageIndex <= numPages; pageIndex++) {
    entries.push({
      route: `/blogi/sivu/${pageIndex}`,
      title: defaultPageMetadata.title,
      description: defaultPageMetadata.description,
    });
  }

  return entries;
}

function getTagPageMetadata() {
  const entries = [];

  for (const rawTag of getAllPostTags()) {
    const tag = rawTag.trim().toLowerCase().replaceAll(' ', '-');
    const decodedTag = decodeURIComponent(tag).replaceAll('-', ' ');
    const { numPages } = getPostsByTag(tag, 1, POSTS_PER_PAGE);

    for (let pageIndex = 1; pageIndex <= numPages; pageIndex++) {
      entries.push({
        route: `/blogi/${tag}/sivu/${pageIndex}`,
        title: `Julkaisut avainsanalla ${decodedTag} | Niemenjoki blogi`,
        description: `Julkaisut avainsanalla ${decodedTag}: Blogi käsittelee pääasiassa rakennusautomaatiota, lämpöpumppuja ja tekniikkaa.`,
      });
    }
  }

  return entries;
}

function formatPage({ route, title, description }) {
  return [`Path: ${route}`, `Title: ${title}`, `Description: ${description}`].join('\n');
}

function main() {
  const staticPages = getStaticPageEntries().map(getStaticPageMetadata).filter(Boolean);
  const contentPages = getContentPageMetadata();
  const paginatedPages = getBlogPaginationMetadata();
  const tagPages = getTagPageMetadata();

  const pages = [...staticPages, ...contentPages, ...paginatedPages, ...tagPages].sort(
    (a, b) => a.route.localeCompare(b.route, 'fi')
  );

  console.log(pages.map(formatPage).join('\n\n'));
}

main();
