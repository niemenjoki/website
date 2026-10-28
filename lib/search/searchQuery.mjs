export function decodeSearchText(value = '') {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function normalizeSearchQuery(value = '') {
  return decodeSearchText(value)
    .toLocaleLowerCase('fi-FI')
    .replace(/https?:\/\/[^/\s]+/g, ' ')
    .replace(/[/?#&=+_.:;()[\]{}"'`|\\]+/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
