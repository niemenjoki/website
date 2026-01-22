// lib/prebuild/verifyMetadata.mjs
import { getAllContent } from '../content/getAllContent.mjs';

const posts = getAllContent();

let hasError = false;

function fail(message) {
  console.error(`❌ ${message}`);
  hasError = true;
}

function validateLength(str, min, max, field, slug) {
  if (!str || str.length < min || str.length > max) {
    fail(
      `[${slug}] ${field} length invalid (${str?.length || 0} chars, expected ${min}-${max})`
    );
  }
}

function isValidDate(dateString) {
  const d = new Date(dateString);
  return !isNaN(d.getTime());
}

console.log(`🔍 Checking ${posts.length} posts for metadata mistakes...`);

// --- POSTS CHECK ---
for (const post of posts) {
  const { title, description, slug, structuredData, date, tags, keywords } = post;

  // Required fields
  if (!title) fail(`[${slug}] Missing title`);
  if (!description) fail(`[${slug}] Missing description`);
  if (!structuredData) fail(`[${slug}] Missing structuredData`);

  // Date validity
  if (!date || !isValidDate(date)) fail(`[${slug}] Invalid or missing date: ${date}`);

  // Tags and keywords
  if (!tags || tags.length < 1) fail(`[${slug}] Must have at least 1 tag`);
  if (!keywords || keywords.length < 2) fail(`[${slug}] Must have at least 2 keywords`);

  // Lengths
  validateLength(title, 50, 60, 'title', slug);
  validateLength(description, 110, 160, 'description', slug);
}

// --- RESULT ---
if (hasError) {
  console.error('\n❌ Metadata verification failed.\n');
  process.exit(1);
} else {
  console.log('✅ All metadata checks passed.\n');
}
