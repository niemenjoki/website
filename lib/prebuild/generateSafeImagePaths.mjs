import fs from 'fs';
import path from 'path';

const ROOT = path.resolve('public/images');
const OUTPUT = path.resolve('data/generated/safeImagePaths.json');

const IMAGE_EXTS = ['.avif', '.webp', '.jpg', '.jpeg', '.png', '.svg'];

async function walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const e of entries) {
    const fullPath = path.join(dir, e.name);
    if (e.isDirectory()) {
      const nested = await walk(fullPath);
      files.push(...nested);
    } else {
      const ext = path.extname(e.name).toLowerCase();
      if (IMAGE_EXTS.includes(ext)) {
        const relative = path.relative('public', fullPath).replace(/\\/g, '/');
        files.push('/' + relative);
      }
    }
  }

  return files;
}

async function main() {
  console.log(`🔍 Generating a list of existing image paths...`);
  const images = await walk(ROOT);
  images.sort();

  await fs.promises.mkdir(path.dirname(OUTPUT), { recursive: true });
  await fs.promises.writeFile(OUTPUT, JSON.stringify(images, null, 2), 'utf8');

  console.log(`✅ Safe image paths written to ${OUTPUT}\n`);
}

main().catch((err) => {
  console.error('❌ Error generating safe image paths:', err);
  process.exit(1);
});
