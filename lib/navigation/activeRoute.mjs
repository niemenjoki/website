function stripNavigationSuffix(value) {
  return String(value || '').split(/[?#]/, 1)[0];
}

function safelyDecodePathSegments(path) {
  return path
    .split('/')
    .map((segment) => {
      try {
        return decodeURIComponent(segment);
      } catch {
        return segment;
      }
    })
    .join('/');
}

export function normalizeNavigationPath(value) {
  const path = stripNavigationSuffix(value).trim();

  if (!path || path === '/') {
    return '/';
  }

  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
  const decodedPath = safelyDecodePathSegments(withLeadingSlash).normalize('NFC');
  return decodedPath.replace(/\/+$/, '') || '/';
}

function getExactPaths(item) {
  return [...new Set([item?.href, ...(item?.exactPaths ?? [])])]
    .filter(Boolean)
    .map(normalizeNavigationPath);
}

function getMatchPrefixes(item) {
  return [...new Set(item?.matchPrefixes ?? [])]
    .filter(Boolean)
    .map(normalizeNavigationPath)
    .sort((left, right) => right.length - left.length);
}

function pathMatchesPrefix(pathname, prefix) {
  if (prefix === '/') {
    return pathname === '/';
  }

  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function navigationItemMatchesPath(item, pathname) {
  const normalizedPath = normalizeNavigationPath(pathname);

  if (getExactPaths(item).includes(normalizedPath)) {
    return true;
  }

  return getMatchPrefixes(item).some((prefix) =>
    pathMatchesPrefix(normalizedPath, prefix)
  );
}

export function findActiveNavigationItem(primaryItems = [], pathname = '/') {
  const normalizedPath = normalizeNavigationPath(pathname);
  const exactMatch = primaryItems.find((item) =>
    getExactPaths(item).includes(normalizedPath)
  );

  if (exactMatch) {
    return exactMatch;
  }

  return (
    primaryItems
      .flatMap((item) => getMatchPrefixes(item).map((prefix) => ({ item, prefix })))
      .filter(({ prefix }) => pathMatchesPrefix(normalizedPath, prefix))
      .sort((left, right) => right.prefix.length - left.prefix.length)[0]?.item ?? null
  );
}

export function findPrimaryNavigationIdForHref(primaryItems = [], href = '/') {
  return (
    findActiveNavigationItem(primaryItems, normalizeNavigationPath(href))?.id ?? null
  );
}
