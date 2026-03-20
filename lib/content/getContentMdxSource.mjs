import fs from 'fs';
import path from 'path';

export function getContentMdxSource(slug) {
  const mdxPath = path.join(process.cwd(), 'content', 'posts', slug, 'content.mdx');

  if (!fs.existsSync(mdxPath)) {
    throw new Error(`No content.mdx found for content: ${slug}`);
  }

  return fs.readFileSync(mdxPath, 'utf-8');
}
