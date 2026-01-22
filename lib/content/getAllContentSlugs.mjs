import fs from 'fs';
import path from 'path';

/**
 * Get all content slugs
 */
export function getAllContentSlugs() {
  let contentPath = path.join(process.cwd(), 'content', 'posts');
  const files = fs.readdirSync(contentPath);
  return files.filter((f) => fs.statSync(path.join(contentPath, f)).isDirectory());
}
