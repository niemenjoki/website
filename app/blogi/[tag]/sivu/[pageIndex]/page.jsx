import { notFound } from 'next/navigation';

import Advert from '@/components/Advert/Advert';
import Pagination from '@/components/Pagination/Pagination';
import Post from '@/components/PostPreview/PostPreview';
import SafeLink from '@/components/SafeLink/SafeLink';
import SearchPosts from '@/components/SearchPosts/SearchPosts';
import { POSTS_PER_PAGE, SITE_URL } from '@/data/vars.mjs';
import { getAllContent, getAllPostTags, getPostsByTag } from '@/lib/content/index.mjs';

import classes from './TagPage.module.css';
import structuredData from './structuredData.json';

export { default as generateMetadata } from './generateMetadata';

export async function generateStaticParams() {
  const allPosts = getAllContent();
  const groupedPosts = {};

  allPosts.forEach((post) => {
    const tags = post.tags.map((t) => t.trim().toLowerCase().replaceAll(' ', '-'));
    tags.forEach((tag) => {
      if (!groupedPosts[tag]) groupedPosts[tag] = [];
      groupedPosts[tag].push(post.slug);
    });
  });

  const params = [];
  for (const tag of Object.keys(groupedPosts)) {
    const numPages = Math.ceil(groupedPosts[tag].length / POSTS_PER_PAGE);
    for (let i = 1; i <= numPages; i++) {
      params.push({ tag, pageIndex: i.toString() });
    }
  }

  return params;
}

export default async function BlogTagPage({ params }) {
  const { pageIndex, tag } = await params;

  const decodedTag = decodeURIComponent(tag);
  const pageIndexInt = parseInt(pageIndex) || 1;
  const { posts, numPages } = getPostsByTag(decodedTag, pageIndexInt, POSTS_PER_PAGE);
  if (posts.length === 0) {
    notFound();
  }
  const allTags = getAllPostTags();

  const tagDisplay = decodedTag.replaceAll('-', ' ');
  const pagePath = `/blogi/${tag}/sivu/${pageIndexInt}`;
  const pageUrl = `${SITE_URL}${pagePath}`;
  const metadataTitle = `Julkaisut avainsanalla ${tagDisplay} | Niemenjoki blogi`;
  const metadataDescription = `Julkaisut avainsanalla ${tagDisplay}: Blogi käsittelee pääasiassa rakennusautomaatiota, lämpöpumppuja ja tekniikkaa.`;

  const ldJSON = JSON.parse(JSON.stringify(structuredData));
  ldJSON['@graph'][0]['@id'] = `${pageUrl}#webpage`;
  ldJSON['@graph'][0].url = pageUrl;
  ldJSON['@graph'][0].name = metadataTitle;
  ldJSON['@graph'][0].description = metadataDescription;
  ldJSON['@graph'][1]['@id'] = `${pageUrl}#itemlist`;
  ldJSON['@graph'][1]['itemListElement'] = posts.map((post, i) => ({
    '@type': 'ListItem',
    position: (pageIndexInt - 1) * POSTS_PER_PAGE + (i + 1),
    url: `${SITE_URL}/blogi/julkaisu/${post.slug}`,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ldJSON).replace(/</g, '\\u003c'),
        }}
      />
      <h1>Julkaisut avainsanalla "{tagDisplay}"</h1>

      <SearchPosts
        list={posts}
        keys={['title', 'description', 'keywords', 'tags']}
        placeholder="Etsi julkaisun nimellä tai avainsanalla.."
      />

      <div className={classes.Taglist}>
        <SafeLink href="/blogi" className={classes.Tag}>
          Kaikki
        </SafeLink>
        {allTags.map((t) => {
          const isActive =
            t.toLowerCase().replaceAll(' ', '-') ===
            decodedTag.toLowerCase().replaceAll(' ', '-');
          return (
            <SafeLink
              key={t}
              href={`/blogi/${t.toLowerCase().replaceAll(' ', '-')}/sivu/1`}
              className={`${classes.Tag} ${isActive ? classes.ActiveTag : ''}`}
            >
              {t}
            </SafeLink>
          );
        })}
      </div>

      {posts.map((post, i) => (
        <Post key={i} post={post} />
      ))}

      <Pagination
        numPages={numPages}
        currentPage={pageIndexInt}
        basePath={`/blogi/${tag}`}
      />
      <Advert adClient="ca-pub-5560402633923389" adSlot="1051764153" />
    </>
  );
}
