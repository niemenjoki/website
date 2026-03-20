import fs from 'fs';
import path from 'path';

import { POSTS_PER_PAGE } from '../../data/site/constants.mjs';
import {
  getAllContent,
  getAllPostTags,
  getPostsByTag,
  slugifyTag,
} from '../content/index.mjs';
import { getStaticAppRoutes } from '../routes/getStaticAppRoutes.mjs';

const appDir = path.join(process.cwd(), 'app');
const postsDir = path.join(process.cwd(), 'content', 'posts');
const outFile = path.join(process.cwd(), 'generated', 'site', 'safeRoutes.json');

function getDynamicRoutes() {
  if (!fs.existsSync(postsDir)) {
    console.warn('⚠️  No /posts directory found — skipping dynamic routes.');
    return [];
  }

  const posts = getAllContent();

  const postRoutes = posts.map((post) => `/blogi/julkaisu/${post.slug}`);

  const postTagRoutes = [];
  const postTags = getAllPostTags();

  for (const tag of postTags) {
    const tagSlug = slugifyTag(tag);
    const { numPages } = getPostsByTag(tagSlug, 1, POSTS_PER_PAGE);

    for (let i = 1; i <= numPages; i++) {
      postTagRoutes.push(`/blogi/${tagSlug}/sivu/${i}`);
    }
  }

  const blogListPageCount = Math.ceil(posts.length / POSTS_PER_PAGE);
  const blogListRoutes = Array.from(
    { length: blogListPageCount },
    (_, i) => `/blogi/sivu/${i + 1}`
  );

  return [...postRoutes, ...postTagRoutes, ...blogListRoutes];
}

function generate() {
  console.log('🔍 Generating a list of existing internal routes...');
  const staticRoutes = getStaticAppRoutes(appDir).map(({ route }) => route);
  const dynamicRoutes = getDynamicRoutes();

  const safeRoutes = Array.from(new Set([...staticRoutes, ...dynamicRoutes])).sort();

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(safeRoutes, null, 2));

  console.log(`✅ Safe internal routes written to ${outFile}\n`);
}

generate();
