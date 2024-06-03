const fs = require('fs').promises;
const path = require('path');
const extractFrontMatter = require('./extractFrontMatter');

(async () => {
  console.log('Generating sitemap...');
  const languages = ['fi', 'en'];

  let latestPost = new Date(0);
  const finnishTags = [];
  const englishTags = [];
  let blogPosts = [];

  for (const lang of languages) {
    const files = await fs.readdir(path.join('posts', lang));

    for (const file of files) {
      const slug = path.parse(file).name;
      const rawPost = await fs.readFile(
        path.join('posts', lang, file),
        'utf-8'
      );
      const { i18n, language, tags, date } = extractFrontMatter(rawPost).data;

      const dateObj = new Date(date);

      blogPosts.push({
        url: `https://niemenjoki.fi/${
          lang === 'fi' ? 'blogi/julkaisu/' : 'blog/post/'
        }${slug}`,
        i18n,
        lang: language,
        tags: tags.split(','),
        date: dateObj,
      });

      if (dateObj > latestPost) {
        latestPost = dateObj;
      }
      if (language === 'fi') {
        tags.split(',').forEach((tag) => finnishTags.push(tag));
      } else {
        tags.split(',').forEach((tag) => englishTags.push(tag));
      }
    }
  }

  let sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:xhtml="http://www.w3.org/1999/xhtml">
<url>
<loc>https://niemenjoki.fi</loc>
<xhtml:link rel="canonical" hreflang="fi" href="https://niemenjoki.fi"/>
<xhtml:link rel="alternate" hreflang="en" href="https://niemenjoki.fi/en"/>
<xhtml:link rel="alternate" hreflang="fi" href="https://niemenjoki.fi/blogi"/>
<xhtml:link rel="alternate" hreflang="en" href="https://niemenjoki.fi/blog"/>
<xhtml:link rel="alternate" hreflang="fi" href="https://niemenjoki.fi/blogi/sivu/1"/>
<xhtml:link rel="alternate" hreflang="en" href="https://niemenjoki.fi/blog/page/1"/>
<lastmod>${latestPost.toISOString()}</lastmod>
</url>
<url>
<loc>https://niemenjoki.fi/tietoa</loc>
<xhtml:link rel="canonical" hreflang="fi" href="https://niemenjoki.fi/tietoa"/>
<xhtml:link rel="alternate" hreflang="en" href="https://niemenjoki.fi/about"/>
<lastmod>2024-02-29T00:00:00.000Z</lastmod>
</url>
<url>
<loc>https://niemenjoki.fi/tietosuoja</loc>
<xhtml:link rel="canonical" hreflang="fi" href="https://niemenjoki.fi/tietosuoja"/>
<xhtml:link rel="alternate" hreflang="en" href="https://niemenjoki.fi/privacy"/>
<lastmod>2024-02-22T00:00:00.000Z</lastmod>
</url>
<url>
<loc>https://niemenjoki.fi/projektit</loc>
<xhtml:link rel="canonical" hreflang="fi" href="https://niemenjoki.fi/projektit"/>
<xhtml:link rel="alternate" hreflang="en" href="https://niemenjoki.fi/projects"/>
<lastmod>2023-12-29T00:00:00.000Z</lastmod>
</url>
<url>
<loc>https://niemenjoki.fi/projektit/compress-create-react-app</loc>
<xhtml:link rel="canonical" hreflang="fi" href="https://niemenjoki.fi/projektit/compress-create-react-app"/>
<xhtml:link rel="alternate" hreflang="en" href="https://niemenjoki.fi/projects/compress-create-react-app"/>
<lastmod>2023-12-29T00:00:00.000Z</lastmod>
</url>
`;

  [...new Set(englishTags)].forEach((tag) => {
    sitemapXML += '<url>\n';
    sitemapXML += `<loc>https://niemenjoki.fi/blog/${tag.toLowerCase()}/page/1</loc>\n`;
    sitemapXML += `<lastmod>${latestPost.toISOString()}</lastmod>\n`;
    sitemapXML += '</url>\n';
  });

  [...new Set(finnishTags)].forEach((tag) => {
    sitemapXML += '<url>\n';
    sitemapXML += `<loc>https://niemenjoki.fi/blogi/${tag.toLowerCase()}/sivu/1</loc>\n`;
    sitemapXML += `<lastmod>${latestPost.toISOString()}</lastmod>\n`;
    sitemapXML += '</url>\n';
  });

  blogPosts.forEach((post) => {
    sitemapXML += '<url>\n';
    sitemapXML += `<loc>${post.url}</loc>\n`;
    if (post.i18n) {
      const alternateLang = post.lang === 'en' ? 'fi' : 'en';
      sitemapXML += `<xhtml:link rel="alternate" hreflang="${alternateLang}" href="${post.i18n}"/>\n`;
    }
    sitemapXML += `<lastmod>${post.date.toISOString()}</lastmod>\n`;
    sitemapXML += '</url>\n';
  });

  sitemapXML += '</urlset>';

  try {
    await fs.writeFile(path.join('public', 'sitemap.xml'), sitemapXML, {
      flag: 'w',
    });
    const urlCount = (sitemapXML.match(/<loc>/g) || []).length;
    console.log(
      '\x1b[32m',
      `Sitemap sitemap.xml written successfully ${urlCount} listed`,
      '\x1b[0m'
    );
  } catch (e) {
    console.error('\x1b[31m', 'Failed to write sitemap.xml', '\x1b[0m');
    console.error(e);
  }
})();
