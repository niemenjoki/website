import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = path.resolve('public/images');
const MAX_DIMENSION = 1200;
const QUALITY = 65;

const isRaster = (ext) => ['.jpg', '.jpeg', '.png', '.avif'].includes(ext);

let alreadyOptimized = true;

async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!isRaster(ext)) return;

  const outPath = filePath.replace(ext, '.avif');
  const image = sharp(filePath);
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    console.warn(`⚠️ No metadata for ${filePath}`);
    return;
  }

  const isPortrait = metadata.height > metadata.width;
  const longerSide = Math.max(metadata.width, metadata.height);

  const resizeOptions = {};
  if (longerSide > MAX_DIMENSION) {
    if (isPortrait) resizeOptions.height = MAX_DIMENSION;
    else resizeOptions.width = MAX_DIMENSION;
  }

  if (ext === '.avif' && longerSide <= MAX_DIMENSION) {
    return;
  }

  if (fs.existsSync(outPath)) {
    const srcStat = fs.statSync(filePath);
    const outStat = fs.statSync(outPath);
    if (outStat.mtimeMs > srcStat.mtimeMs) {
      return;
    }
  }
  if (alreadyOptimized) {
    console.log('Found unoptimized images. Starting image optimization..');
    alreadyOptimized = false;
  }

  await image.resize(resizeOptions).avif({ quality: QUALITY, effort: 9 }).toFile(outPath);

  const origKB = (fs.statSync(filePath).size / 1024).toFixed(0);
  const newKB = (fs.statSync(outPath).size / 1024).toFixed(0);

  console.log(
    `- ${path.basename(filePath)} → ${path.basename(outPath)} (${origKB}KB → ${newKB}KB)`
  );
}

async function walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) await walk(full);
    else await processImage(full);
  }
}

console.log('🔍 Making sure image files are optimized..');

await walk(ROOT);

if (alreadyOptimized) {
  console.log('✅ Images checked. All images have already been optimized\n');
} else {
  console.log('✅ Image optimization done.\n');
}
