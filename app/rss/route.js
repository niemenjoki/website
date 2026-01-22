import { getAllContent } from '@/lib/content/index.mjs';

import { SITE_URL } from '../../data/vars.mjs';

export const revalidate = 3600;

export async function GET() {
  const rawPosts = getAllContent();

  const posts = rawPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const latestPostDate = posts[0]?.date || 0;

  const xmlItems = posts
    .map(
      (post) => `<item>
        <title><![CDATA[ ${post.title} ]]></title>
        <link>${SITE_URL}/blogi/julkaisu/${post.slug}</link>
        <guid>${SITE_URL}/blogi/julkaisu/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description><![CDATA[ ${post.description} ]]></description>
        <dc:creator>Joonas Niemenjoki</dc:creator>
      </item>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    version="2.0"
  >
    <channel>
      <title><![CDATA[ Joonas Niemenjoki ]]></title>
      <link>${SITE_URL}</link>
      <atom:link href="${SITE_URL}/rss" rel="self" type="application/rss+xml" />
      <description><![CDATA[ Käytännön kokemuksiin perustuvia havaintoja ja vinkkejä rakennusautomaatiosta ja sitä sivuavista aiheista. ]]></description>
      <language>fi</language>
      <lastBuildDate>${new Date(latestPostDate).toUTCString()}</lastBuildDate>
      ${xmlItems}
    </channel>
  </rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
