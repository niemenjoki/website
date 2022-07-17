const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const getAllPosts = () => {
  const filenames = fs.readdirSync(path.join('posts'));
  const posts = filenames.map((filename) => {
    const filepath = path.join('posts', filename);
    const markdownWithMeta = fs.readFileSync(filepath, 'utf-8');
    const postData = matter(markdownWithMeta);

    return {
      title: postData.data.title,
      date: postData.data.date,
      excerpt: postData.data.excerpt,
      link: 'https://joonasjokinen.fi/blog/' + filename.replace('.md', ''),
    };
  });
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const getXmlItems = (blogPosts) => {
  return blogPosts
    .map((post) => {
      return `<item>
            <title>${post.title}</title>
            <link>${post.link}</link>
            <guid>${post.link}</guid>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
            <description>${post.excerpt}</description>
            <dc:creator>Joonas Jokinen</dc:creator>
        </item>
        `;
    })
    .join('');
};

const getRssXml = (xmlItems, latestPostDate) => {
  return `<?xml version="1.0" ?>
  <rss
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    version="2.0"
  >
    <channel>
        <title><![CDATA[ Joonas Jokinen's blog ]]></title>
        <link>https://joonasjokinen.fi</link>
        <description><![CDATA[ The blog of an engineer with a childlike curiosity focusing mostly on web development and occasionally random interesting facts ]]></description>
        <language>en</language>
        <lastBuildDate>${new Date(latestPostDate).toUTCString()}</lastBuildDate>
        ${xmlItems}
    </channel>
  </rss>`;
};

const postData = getAllPosts();
const xmlItems = getXmlItems(postData);
const rssXml = getRssXml(xmlItems, postData[0].date);

fs.writeFile(path.join('public', 'rss.xml'), rssXml, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('RSS feed written successfully');
  }
});
