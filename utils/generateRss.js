const fs = require('fs');
const path = require('path');
const extractFrontMatter = require('./extractFrontMatter');

const getAllPosts = (language) => {
  const filenames = fs.readdirSync(path.join('posts', language));
  const posts = filenames.map((filename) => {
    const filepath = path.join('posts', language, filename);
    const markdownWithMeta = fs.readFileSync(filepath, 'utf-8');
    const postData = extractFrontMatter(markdownWithMeta);

    const linkbase = 'https://niemenjoki.fi';
    const pathname = language === 'en' ? '/blog/post/' : '/blogi/julkaisu/';
    const link = `${linkbase}${pathname}${filename.replace('.md', '')}`;

    return {
      title: postData.data.title,
      date: postData.data.date,
      excerpt: postData.data.excerpt,
      link,
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
            <dc:creator>Joonas Niemenjoki</dc:creator>
        </item>
        `;
    })
    .join('');
};

const getRssXml = (xmlItems, latestPostDate, language, filename) => {
  const data = {
    title: {
      fi: 'Joonas Niemenjoen blogi',
      en: "Joonas Niemenjoki's blog",
    },
    link: {
      fi: 'https://niemenjoki.fi',
      en: 'https://niemenjoki.fi/en',
    },
    description: {
      fi: 'Lapsenomaisen uteliaisuuden omaavan insinöörin blogi, joka keskittyy enimmäkseen verkkokehitykseen ja satunnaisiin mielenkiintoisiin faktoihin',
      en: 'The blog of an engineer with a childlike curiosity focusing mostly on web development and occasionally random interesting facts',
    },
  };
  return `<?xml version="1.0" ?>
  <rss
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    version="2.0"
  >
    <channel>
      <title><![CDATA[ ${data.title[language]} ]]></title>
      <link>${data.link[language]}</link>
      <atom:link href="${
        data.link[language]
      }/${filename}" rel="self" type="application/rss+xml" />
      <description><![CDATA[ ${data.description[language]} ]]></description>
      <language>${language}</language>
      <lastBuildDate>${new Date(latestPostDate).toUTCString()}</lastBuildDate>
      ${xmlItems}
  </channel>
  </rss>`;
};

const generateRSSFeed = (language, filename) => {
  const postData = getAllPosts(language);
  const xmlItems = getXmlItems(postData);
  const rssXml = getRssXml(xmlItems, postData[0].date, language, filename);

  fs.writeFile(path.join('public', filename), rssXml, (err) => {
    if (err) {
      console.log(
        '\x1b[31m',
        `Failed to write RSS feed ${filename}`,
        '\x1b[0m'
      );
      console.log(err);
    } else {
      console.log(
        '\x1b[32m',
        `RSS feed ${filename} written successfully`,
        '\x1b[0m'
      );
    }
  });
};

generateRSSFeed('en', 'rss-en.xml');
generateRSSFeed('fi', 'rss-fi.xml');
