const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_IMAGES = path.join(__dirname, '../public/images/posts');
const sizes = [800, 1200];
const formats = ['avif', 'webp', 'jpg'];

// Recursively get PNG images
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

(async () => {
  // Generate all image sizes/formats
  const images = getImages(PUBLIC_IMAGES);
  for (const imgPath of images) {
    const { dir, name } = path.parse(imgPath);
    for (const size of sizes) {
      for (const format of formats) {
        const outFile = path.join(dir, `${name}-${size}.${format}`);
        if (!fs.existsSync(outFile)) {
          console.log(`Generating: ${outFile}`);
          await sharp(imgPath).resize(size).toFormat(format).toFile(outFile);
        }
      }
    }
  }
  console.log('Image generation complete.');
})();
