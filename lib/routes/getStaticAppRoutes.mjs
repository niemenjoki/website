import fs from 'fs';
import path from 'path';

const PAGE_FILE_REGEX = /^page\.(js|jsx|ts|tsx)$/;

function isPageFile(fileName) {
  return PAGE_FILE_REGEX.test(fileName);
}

function isDynamicRoute(route) {
  return /\[[^/]+\]/.test(route);
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

export function getStaticAppRoutes(appDir) {
  const pages = [];

  function walk(dir) {
    if (!fs.existsSync(dir)) {
      return;
    }

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

      if (!isPageFile(entry.name)) {
        continue;
      }

      const route = toRoute(appDir, fullPath);

      if (isDynamicRoute(route)) {
        continue;
      }

      const { mtime } = fs.statSync(fullPath);
      pages.push({ route, lastModified: mtime });
    }
  }

  walk(appDir);

  const deduped = new Map();

  for (const page of pages) {
    const previous = deduped.get(page.route);

    if (!previous || page.lastModified > previous.lastModified) {
      deduped.set(page.route, page);
    }
  }

  return Array.from(deduped.values());
}
