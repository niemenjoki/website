const fs = require('fs');
const path = require('path');

const GUIDE_PATH = path.join('content', 'guides');

const guideSlugs = fs.readdirSync(GUIDE_PATH);

const categoryData = guideSlugs.map((slug) => {
  const metadataRaw = fs.readFileSync(path.join(GUIDE_PATH, slug, 'data.json'), 'utf-8');
  const { category } = JSON.parse(metadataRaw);

  return {
    category,
    slug,
  };
});

const grouped = categoryData
  .sort((a, b) => a.category.pagePosition - b.category.pagePosition)
  .reduce((acc, item) => {
    const name = item.category.name;
    if (!acc[name]) acc[name] = [];
    acc[name].push({
      slug: item.slug,
      pagePosition: item.category.pagePosition,
    });
    return acc;
  }, {});

console.log(grouped);
