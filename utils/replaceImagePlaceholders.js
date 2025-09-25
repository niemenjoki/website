const fs = require('fs');
const path = require('path');

const PUBLIC_IMAGES = path.join(__dirname, '../public/images/posts');
// now POSTS_DIR is the parent, with "fi" and "en" inside
const POSTS_DIR = path.join(__dirname, '../posts');
const sizes = [800, 1200];
const DEFAULT_CONTENT_WIDTH = 800;

const colors = {
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
};

function getImages(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  list.forEach((file) => {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      results = results.concat(getImages(fullPath));
    } else if (/\.(png)$/i.test(file.name)) {
      results.push(fullPath);
    }
  });
  return results;
}

function getMarkdownFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  list.forEach((file) => {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      results = results.concat(getMarkdownFiles(fullPath));
    } else if (/\.(md|mdx)$/i.test(file.name)) {
      results.push(fullPath);
    }
  });
  return results;
}

function generatePictureHTML(imgFullPath, alt) {
  const { dir, name } = path.parse(imgFullPath);
  const relativeDir = path.relative(PUBLIC_IMAGES, dir).replace(/\\/g, '/');
  const base = `/images/posts/${relativeDir}/${name}`;
  const sizesAttr = `(max-width: 600px) 100vw, ${DEFAULT_CONTENT_WIDTH}px`;

  return `<picture>
  <source srcset="${sizes
    .map((s) => `${base}-${s}.avif ${s}w`)
    .join(', ')}" type="image/avif">
  <source srcset="${sizes
    .map((s) => `${base}-${s}.webp ${s}w`)
    .join(', ')}" type="image/webp">
  <img src="${base}-800.jpg" srcset="${sizes
    .map((s) => `${base}-${s}.jpg ${s}w`)
    .join(
      ', '
    )}" alt="${alt}" sizes="${sizesAttr}" style="max-width:100%;height:auto;" loading="lazy">
</picture>`;
}

(async () => {
  const images = getImages(PUBLIC_IMAGES);

  // get both fi and en posts
  const mdFiles = getMarkdownFiles(POSTS_DIR);

  let okCount = 0;
  let errorCount = 0;

  for (const file of mdFiles) {
    const filename = path.relative(POSTS_DIR, file);
    let content = fs.readFileSync(file, 'utf8');
    let updated = false;
    let hadError = false;

    const newContent = content.replace(
      /\[\[image:(.+?)\|alt=(.+?)\]\]/g,
      (match, imgFile, altText) => {
        const foundImg = images.find((p) => p.endsWith(imgFile));
        if (!foundImg) {
          console.error(
            colors.red(`ERROR: Image not found: ${imgFile} in ${filename}`)
          );
          process.exitCode = 1;
          hadError = true;
          return match;
        }
        updated = true;
        return generatePictureHTML(foundImg, altText);
      }
    );

    if (updated) {
      fs.writeFileSync(file, newContent, 'utf8');
    }

    if (hadError) {
      errorCount++;
    } else {
      console.log(colors.green(`OK: ${filename}`));
      okCount++;
    }
  }

  console.log('');
  console.log(
    `Checked ${mdFiles.length} posts with ${colors.green(
      okCount + ' OK'
    )} and ${colors.red(errorCount + ' error' + (errorCount === 1 ? '' : 's'))}`
  );
})();
